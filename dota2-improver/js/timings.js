// Dota 2 Rank Improver In-Game Timer and Audio Alerts with Thai TTS & Web Audio Chimes

const TimingEngine = {
    seconds: 0,
    intervalId: null,
    isRunning: false,
    useThaiVoice: true,
    
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

    setTime(targetSeconds) {
        this.seconds = Math.max(0, targetSeconds);
        this.tick();
    },

    adjustTime(deltaSeconds) {
        this.seconds = Math.max(0, this.seconds + deltaSeconds);
        this.tick();
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
        const isNegative = totalSeconds < 0;
        const absSecs = Math.abs(totalSeconds);
        const mins = Math.floor(absSecs / 60);
        const secs = absSecs % 60;
        const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        return isNegative ? `-${formatted}` : formatted;
    },

    getPhaseName(totalSeconds) {
        if (totalSeconds < 0) return "Pre-Game Strategy (เตรียมตัวก่อนแตรเริ่มเกม)";
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

        // 0. Horn Blow at 00:00
        if (totalSeconds === 0) {
            this.speakAlert("แตรเริ่มเกมดังแล้ว! ลุยเลนแรกเริ่ม!", "Game horn sounds! Battle begins!");
        }

        // 1. Bounty (Every 3 minutes, warning at 15s before)
        if (isBountyAlertOn && (totalSeconds + 15) % 180 === 0 && totalSeconds > 0) {
            this.speakAlert("อีก 15 วินาที รูน Bounty จะเกิด!", "Bounty runes spawning in 15 seconds!");
        }

        // 2. Power Runes (Every 2 minutes, warning at 15s before)
        if (isPowerAlertOn && (totalSeconds + 15) % 120 === 0 && totalSeconds > 0) {
            this.speakAlert("อีก 15 วินาที รูนน้ำแม่น้ำจะเกิด!", "River power rune spawning soon!");
        }

        // 3. Wisdom (Every 7 minutes, warning at 30s before)
        if (isWisdomAlertOn && (totalSeconds + 30) % 420 === 0 && totalSeconds > 0) {
            this.speakAlert("อีก 30 วินาที รูน Wisdom เลเวลจะเกิด ซัพพอร์ตเตรียมไปเอา!", "Wisdom runes in 30 seconds. Support head to the side lane!");
        }

        // 4. Stacking (Every minute, warn at second 45)
        if (isStackAlertOn && secs === 45) {
            this.speakAlert("วินาทีที่ 45 เตรียมดึงครีป หรือสแต็กป่า!", "Forty five seconds. Prepare to pull or stack camps!");
        }
    },

    // Play crisp chime ping via Web Audio API before voice
    playChime() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
            osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15); // E6 note
            
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch (e) {
            console.log('Audio Context error:', e);
        }
    },

    speakAlert(thaiText, englishText) {
        // Play chime sound first
        this.playChime();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            const isThai = this.useThaiVoice;
            const textToSpeak = isThai ? thaiText : englishText;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            
            utterance.rate = 1.1;
            utterance.pitch = 1.0;
            
            if (isThai) {
                utterance.lang = 'th-TH';
            } else {
                utterance.lang = 'en-US';
            }

            // Fallback: If Thai voice is requested but not found, try to utter in available voices
            window.speechSynthesis.speak(utterance);
        }
    },

    testAudioAlert() {
        this.playChime();
        setTimeout(() => {
            this.speakAlert(
                "ทดสอบระบบเสียงพากย์ภาษาไทย! อีก 15 วินาที รูนน้ำจะเกิด", 
                "Audio warning system test. Power rune spawning in 15 seconds."
            );
        }, 200);
    }
};
