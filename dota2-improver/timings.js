// Dota 2 Rank Improver In-Game Timer and Audio Alerts

const TimingEngine = {
    seconds: 0,
    intervalId: null,
    isRunning: false,
    
    // Callbacks
    onTick: null, // fn(formattedTime, seconds)
    onAdviceUpdate: null, // fn(adviceTextList, currentPhaseText)

    start(onTickCallback, onAdviceUpdateCallback) {
        if (this.isRunning) {
            this.stop();
            return false;
        }
        
        this.onTick = onTickCallback;
        this.onAdviceUpdate = onAdviceUpdateCallback;
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.seconds++;
            this.tick();
        }, 1000);
        
        // Initial tick
        this.tick();
        return true;
    },

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    },

    reset() {
        this.stop();
        this.seconds = 0;
        if (this.onTick) {
            this.onTick(this.formatTime(0), 0);
        }
        if (this.onAdviceUpdate) {
            this.onAdviceUpdate(this.getAdvice(0), "Game hasn't started");
        }
    },

    tick() {
        const formatted = this.formatTime(this.seconds);
        if (this.onTick) {
            this.onTick(formatted, this.seconds);
        }
        if (this.onAdviceUpdate) {
            this.onAdviceUpdate(this.getAdvice(this.seconds), this.getPhaseName(this.seconds));
        }
        this.checkAlerts(this.seconds);
    },

    formatTime(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    getPhaseName(totalSeconds) {
        const minutes = totalSeconds / 60;
        if (minutes < 10) return "Laning Phase (เลนแรกเริ่ม)";
        if (minutes < 20) return "Mid-Game Movements (ตั้งเกมกลาง)";
        return "Late Game / Objectives (ทำเป้าหมายชัยชนะ)";
    },

    getAdvice(totalSeconds) {
        const minutes = totalSeconds / 60;
        
        // 0-10 Minutes: Laning Phase Advice
        if (minutes < 10) {
            return [
                "เน้นเก็บ Last Hit ครีปทุกตัวในเลน พยายามอย่าดึงเลนสูงเกินไป",
                "ซัพพอร์ต: พยายามช่วยสกัด (Deny) ครีป และลากครีปป่า (Pull) เพื่อดึงตำแหน่งการเดินครีปของทีม",
                "รูน Bounty จะเกิดทุก 3:00 นาที และ Power Runes ในแม่น้ำจะเกิดครั้งแรกตอนนาทีที่ 2:00",
                "มิดเลน: เตรียมพร้อมซื้อวาร์ดมาคุมเลนและดึงรูนแม่น้ำตอนนาทีที่ 6:00 (สำคัญมากสำหรับการคุมเลน)"
            ];
        }
        // 10-20 Minutes: Mid Game Movement Advice
        else if (minutes < 20) {
            return [
                "แครี่: สลับไปฟาร์มป่าเมื่อเลนอันตรายเกินไป ดันเลนเซฟ (Safe Lanes) เพื่อคุมครีปดัน",
                "ออฟเลนและซัพพอร์ต: เดินแก๊งและสร้างพื้นที่ฟาร์ม (Create Space) พยายามทำลายป้อม 1 ของศัตรูให้เร็วที่สุด",
                "รูน XP (Wisdom Rune) จะเกิดนาทีที่ 14:00 ให้เดินไปชิงเพื่อความห่างเลเวลซัพพอร์ตของทีม",
                "ปักหวอดรุก (Offensive Wards) ในป่าศัตรูเพื่อตามล่าจุดฟาร์มของแครี่ศัตรู"
            ];
        }
        // 20+ Minutes: Late Game & Roshan Priority
        else {
            return [
                "บอสแก้ว Tormentor เกิดแล้ว! ชวนคนในทีมไปช่วยกันรุมตีเพื่อสุ่มรับ Shard ฟรี",
                "ควบคุมแผนที่บริเวณถ้ำ Roshan และคอยเช็คเวลาเกิดของ Roshan เสมอเพื่อเอา Aegis",
                "ห้ามตายฟรีเด็ดขาด! ตรวจสอบเงินของตัวเองว่าพอซื้อเกิด (Ready for Buyback) หรือไม่เสมอก่อนเข้าปะทะใหญ่",
                "ก่อนขึ้นตีป้อมสาม (High Ground) ต้องทำการคุมครีปดันให้ลึก และหาจังหวะเก็บตัวแก๊งศัตรูก่อนปะทะ"
            ];
        }
    },

    checkAlerts(totalSeconds) {
        const secs = totalSeconds % 60;
        
        const isBountyAlertOn = document.getElementById('alert-bounty')?.checked;
        const isPowerAlertOn = document.getElementById('alert-power')?.checked;
        const isWisdomAlertOn = document.getElementById('alert-wisdom')?.checked;
        const isStackAlertOn = document.getElementById('alert-stack')?.checked;

        // 1. Bounty (Every 3 minutes, warning at 15s before)
        if (isBountyAlertOn && (totalSeconds + 15) % 180 === 0 && totalSeconds > 0) {
            this.speakAlert("Bounty runes spawning in 15 seconds!");
        }

        // 2. Power Runes (Every 2 minutes, warning at 15s before)
        if (isPowerAlertOn && (totalSeconds + 15) % 120 === 0 && totalSeconds > 0) {
            this.speakAlert("River power rune spawning soon!");
        }

        // 3. Wisdom (Every 7 minutes, warning at 30s before)
        if (isWisdomAlertOn && (totalSeconds + 30) % 420 === 0 && totalSeconds > 0) {
            this.speakAlert("Wisdom runes in 30 seconds. Support head to the side lane!");
        }

        // 4. Stacking (Every minute, warn at second 45)
        if (isStackAlertOn && secs === 45) {
            this.speakAlert("Forty five seconds. Prepare to pull or stack camps!");
        }
    },

    speakAlert(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.15;
            utterance.pitch = 1.0;
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }
};
