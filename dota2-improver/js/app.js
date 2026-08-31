// Dota 2 Rank Improver App Controller (Feature-Rich Version)

const ROLE_DATA = {
    pos1: {
        title: "Position 1 — Safe Lane Carry (หัวหอกฟาร์มและปิดสกอร์เกม)",
        overview: "Pos 1 คือผู้เล่นที่รับผิดชอบการเก็บบอร์ดเงินและความเสียหายหลักของทีมในเลทเกม หัวใจสำคัญคือการบริหารเวลาอย่างมีประสิทธิภาพสูงสุด ไม่เดินเสียเวลาเปล่า และเข้าร่วมไฟต์เมื่อมี Item Power Spike พร้อมเท่านั้น",
        phases: [
            {
                name: "🌅 Laning Phase (0-10 นาที): การยึดเลนและการเก็บทอง",
                tips: [
                    "ตั้งเป้าหมายเก็บ Last Hit ให้ได้ 55-65 ตัวขึ้นไปใน 10 นาทีแรก",
                    "รักษาระดับ Creep Equilibrium ไม่โจมตีครีปศัตรูมั่วซั่วเพื่อให้ครีปชนกันใกล้ป้อมฝั่งเรา",
                    "พก Tango / Salve ติดตัวเสมอ เมื่อโดนตอดเลือด ให้กดฟื้นฟูทันทีอย่าเสียดายเงิน",
                    "หากเลนอันตรายหรือออฟเลนศัตรูเลเวล 6 ให้ย้ายไปฟาร์มป่าแคมป์ใกล้บ้านทันที"
                ]
            },
            {
                name: "⚡ Mid Game & Power Spikes (10-25 นาที): การสลับป่าและการดันเลนปลอดภัย",
                tips: [
                    "ออกไอเทมสปีดฟาร์มชิ้นแรกให้ไวที่สุด (Battle Fury / Maelstrom / Yasha) ภายในนาที 12-14",
                    "ดันคลื่นครีปในเลนเซฟเข้าป้อมศัตรูก่อนสลับไปฟาร์มป่า (Push & Farm Cycle)",
                    "หลีกเลี่ยงการเดินไปไฟต์มั่วๆ ที่ไม่มีป้อมหรือวิชั่นสนับสนุน ให้โฟกัสการฟาร์มจนได้ BKB หรือไอเทมหลักชิ้นที่สอง",
                    "มองมินิแมพทุก 5 วินาที หากฮีโร่สายซุ่มของศัตรูหายหน้า ให้ถอยเข้าป่าลึกทันที"
                ]
            },
            {
                name: "🛡️ Late Game & Roshan (25-35 นาที): การร่วมไฟต์และการยึดพื้นที่",
                tips: [
                    "ร่วมไฟต์เมื่อมี Black King Bar (BKB) หรืออัลติเมตพร้อมเท่านั้น",
                    "ยืนตำแหน่งแนวหลังไฟต์ อย่าเป็นตัวเปิดไฟต์คนแรก รอให้ Pos 3/4 เปิด Stun ก่อนค่อย Blink เข้าล้วงตัวคีย์",
                    "หลังชนะไฟต์ ห้ามกลับไปฟาร์มป่า! ให้สั่งทีมตี Roshan หรือดันพังป้อมศัตรูทันที"
                ]
            },
            {
                name: "🏰 End Game Execution (35+ นาที): การดัน High Ground และ Buyback",
                tips: [
                    "เก็บเงินสำรองซื้อเกิด (Buyback) ไว้เสมอในนาทีที่ 30+ ห้ามใช้เงินหมดตัวเด็ดขาด",
                    "ไม่บุกขึ้นบ้านศัตรู (High Ground) โดยไม่มี Aegis of the Immortal หรือครีปดันลึก 2 เลนพร้อมกัน",
                    "โฟกัสตีป้อมหลักและตัวคีย์หลักของศัตรู อย่ายึดติดกับการวิ่งไล่คิลตัวแทงค์ถึก"
                ]
            }
        ],
        metrics: [
            { name: "LH @ 10 mins", target: "60+ ครีป", desc: "เกณฑ์ระบุความสำเร็จการยืนเลนช่วงต้นเกม" },
            { name: "Net Worth @ 20 mins", target: "11,500+ Gold", desc: "เกณฑ์ระบุทิศทางการฟาร์มระดับสากล" },
            { name: "Average GPM", target: "680+ GPM", desc: "ตัวชี้วัดความสามารถการฟาร์มป่าและเคลียร์ครีปดัน" },
            { name: "Tower Damage", target: "4,000+", desc: "ความเสียหายที่ทำต่อสิ่งก่อสร้างศัตรู" },
            { name: "Buyback Availability", target: "100% เลทเกม", desc: "การมีเงินซื้อเกิดสำรองในนาทีที่ 30+" }
        ],
        traps: [
            "ยืนเลนนานเกินไปจนโดนแก๊งตายซ้ำๆ ตอนนาทีที่ 8-10 (เมื่อออฟเลนศัตรูเลเวล 6)",
            "วาปลงมาช่วยไฟต์ฝุ่นตลบที่ไม่มีนัยสำคัญจนเสียจังหวะการฟาร์มทอง",
            "ไม่ยอมซื้อ Black King Bar (BKB) แล้วออกแต่ของดาเมจบริสุทธิ์จนโดน Stun ตายฟรี",
            "วิ่งไปไฟต์คนเดียวในพื้นที่ไร้วิชั่นป่าศัตรู (Dead Lane)",
            "ไม่มีเงิน Buyback ในช่วงเลทเกมทำให้ทีมแพ้ทันที"
        ]
    },
    pos2: {
        title: "Position 2 — Midlane (คุมจังหวะและทำเกมกลางแผนที่)",
        overview: "Pos 2 คือผู้เล่นที่รับผิดชอบการสร้างความได้เปรียบทางเลเวล ดันเลนกลาง คุมรูนแม่น้ำ และเดินแก๊งสร้างจังหวะ (Tempo Player) เพื่อเปิดพื้นที่ให้ Pos 1 ฟาร์มสะดวก",
        phases: [
            {
                name: "🌅 Laning Phase (0-10 นาที): การชิงเลเวลและการคุมรูน",
                tips: [
                    "ฝึกกด Deny ครีปเพื่อตัดเลเวลมิดเลนศัตรู และใช้สกิลดันครีปเข้าป้อมก่อนเวลารูนออก",
                    "ควบคุมการเก็บรูนแม่น้ำทุกๆ 2 นาที (2m/4m/6m/8m) ร่วมกับซัพพอร์ตแบบ 100%",
                    "พกขวด Bottle และ Town Portal Scroll ติดตัวตลอดเวลาเพื่อพร้อมวาร์ปช่วยเลนข้าง",
                    "ชิงทำลายป้อม 1 เลนกลางศัตรูให้ได้ก่อนเพื่อยึดวิชั่นศูนย์กลางแผนที่"
                ]
            },
            {
                name: "⚡ Mid Game & Ganking (10-25 นาที): การเดินแก๊งและการคุม Tempo",
                tips: [
                    "เมื่อได้ไอเทมเคลื่อนที่ไวชิ้นแรก (Blink Dagger / Orchid / Dragon Lance) ให้คอลซัพพอร์ตใช้ Smoke Gank ทันที",
                    "เลือกเป้าหมายแนวหลัง (Pos 4/5 หรือ Glass Cannon) ในไฟต์ก่อนเสมอ",
                    "สร้าง Map Pressure บังคับให้ศัตรูต้องวาร์ปมากันเลนเพื่อดึงตัวศัตรูให้ออกจาก Pos 1 ของเรา"
                ]
            },
            {
                name: "🛡️ Late Game & Positioning (25+ นาที): การทำความเสียหายและการคุมไฟต์",
                tips: [
                    "ดึงจังหวะ Cooldown Spikes ของศัตรูมาสร้างการคิล",
                    "ออกไอเทมกันเวท/กันดิสเอเบิล เช่น BKB / Linken's / Mage Slayer",
                    "ไม่เดินไปตายเสียจังหวะคนเดียวขณะคุมวิชั่นป่าศัตรู"
                ]
            }
        ],
        metrics: [
            { name: "Denies @ 10 mins", target: "10+ ครีป", desc: "การกดยับยั้งเลเวลเลนกลางศัตรู" },
            { name: "River Rune Control", target: "75%+", desc: "สถิติการชิงเก็บรูนแม่น้ำทั้งหมด" },
            { name: "Hero Damage Share", target: "28%+", desc: "ส่วนแบ่งทำดาเมจรวมกับทีม" },
            { name: "Gank Success Rate", target: "70%+", desc: "อัตราความสำเร็จในการเดินคิลเลนข้าง" }
        ],
        traps: [
            "แช่ยืนเลนกลางไม่ไปไหนปล่อยให้มิดเลนศัตรูเดินแก๊งคิลเลนข้างยับเยิน",
            "โดน Solo Kill ในเลนกลางเสียจังหวะ",
            "ปล่อยให้รูนแม่น้ำตกอยู่ในมือมิดเลนศัตรูตลอดเกม",
            "ใช้สกิลใหญ่ใส่ตัวแทงค์ถึกศัตรูแทนที่จะเก็บไว้ใส่ตัวคีย์หลัก"
        ]
    },
    pos3: {
        title: "Position 3 — Offlane (เปิดไฟต์ ค้ำหน้า และแทงค์ทีม)",
        overview: "Pos 3 คือหัวใจของการเปิดไฟต์ (Initiator) และการสร้างความกดดัน (Frontliner) หน้าที่คือการทำลายเลนของ Pos 1 ศัตรู และยึดพื้นที่ป่าศัตรูให้เป็นเขตปลอดภัยของทีมเรา",
        phases: [
            {
                name: "🌅 Laning Phase (0-10 นาที): การกดดันเลนและการทำลายป้อม",
                tips: [
                    "กดดันไม่ให้ Pos 1 ศัตรูเก็บ Last Hit ได้สะดวก และตอดเลือดร่วมกับ Pos 4",
                    "ตัดคลื่นครีป (Creep Skipping) เข้าป้อมศัตรูเมื่อเลนเสียเปรียบ",
                    "พังป้อม 1 ของแครี่ศัตรูให้ได้ก่อนนาทีที่ 12 เพื่อปิดพื้นที่ฟาร์มเลนเซฟของศัตรู"
                ]
            },
            {
                name: "⚡ Mid Game & Initiation (10-25 นาที): การถือไอเทมเปิดไฟต์และการคุมพื้นที่",
                tips: [
                    "ออกไอเทมเปิดไฟต์หลัก Blink Dagger ภายในนาทีที่ 12-14",
                    "ยึด Dead Lane และเปลี่ยนพื้นที่ป่าศัตรูให้เป็นเขตปลอดภัยของทีมเรา",
                    "ออก Aura Items คุ้มกันทีม 5v5 (Pipe of Insight, Crimson Guard, Guardian Greaves)",
                    "เป็นผู้นำสั่งการทีมตี Roshan ครั้งที่ 1 และ 2"
                ]
            },
            {
                name: "🛡️ Late Game & Buyback (25+ นาที): การค้ำไฟต์และการป้องกันบ้าน",
                tips: [
                    "ล่อซื้อสกิลใหญ่ศัตรู ยืนค้ำไฟต์แถวหน้าเพื่อเปิดโอกาสให้ Pos 1/2 ยิงฟรี",
                    "คํานวณ Buyback สวนกลับเมื่อศัตรูบุกขึ้นบ้าน High Ground"
                ]
            }
        ],
        metrics: [
            { name: "Tower 1 Destroy Time", target: "< 12 นาที", desc: "ตัววัดความสำเร็จการยึดพื้นที่เลนของแครี่ศัตรู" },
            { name: "Blink Dagger Timing", target: "< 14 นาที", desc: "เป้าหมายเวลาชิ้นส่วนเปิดไฟต์ยอดนิยม" },
            { name: "Damage Received Share", target: "32%+", desc: "ปริมาณรับดาเมจแทนทีมในไฟต์" },
            { name: "Teamfight Initiation", target: "80%+", desc: "อัตราการเปิดไฟต์สำเร็จให้ทีม" }
        ],
        traps: [
            "ออกของเน้นดาเมจล้วนแต่ไม่มีเกราะ/BKB จนตายใน 2 วินาทีเมื่อเปิดไฟต์",
            "เปิดไฟต์ในจุดที่ไม่มีวิชั่นของทีมหรือแครี่ฝั่งเราอยู่ไกลเกินไป",
            "ฟาร์มทับซ้อนพื้นที่ป่าส่วนปลอดภัยที่ควรเหลือไว้ให้แครี่เล่น",
            "ปล่อยให้แครี่ศัตรูฟาร์มสบายโดยไม่เดินไปกวน"
        ]
    },
    pos4: {
        title: "Position 4 — Soft Support (โรมมิ่ง ปั่นป่วน และ Playmaker)",
        overview: "Pos 4 คือตัวปั่นป่วนเกมนอกเลน (Playmaker) มีหน้าที่ช่วย Pos 3 กดดันเลน เดินแก๊งเลนกลาง ซุ่มตัดวิชั่น และออกไอเทมยูทิลิตี้เปลี่ยนเกม",
        phases: [
            {
                name: "🌅 Laning Phase (0-10 นาที): การกดดันเลนและการเดินแก๊ง",
                tips: [
                    "ช่วย Pos 3 ตอดเลือดศัตรู ซื้อ Sentry Ward ปักบล็อกป่าครีปตัวใหญ่ศัตรู",
                    "ซุ่มวาร์ปไปแก๊งเลนกลางตอนนาทีที่ 4:00 หรือ 6:00 ร่วมกับรูนแม่น้ำ",
                    "เดินเก็บรูน Wisdom นาทีที่ 7:00 และ 14:00 ให้ทีมอย่างแม่นยำ"
                ]
            },
            {
                name: "⚡ Mid Game & Vision Control (10-25 นาที): การซุ่มคิลและการทำลายวิชั่น",
                tips: [
                    "Stack ครีปป่า 2-3 แคมป์ให้ Pos 1 และ Pos 2 ฟาร์มเร่งสปีดเงิน",
                    "ออกไอเทมยูทิลิตี้ช่วยทีม (Force Staff, Eul's, Spirit Vessel, Mage Slayer)",
                    "เดินคุมวิชั่นรอบถ้ำ Roshan ล่วงหน้า 2 นาทีก่อนตี Roshan"
                ]
            },
            {
                name: "🛡️ Late Game & Utility (25+ นาที): การตัดสกิลและการเซฟคอร์",
                tips: [
                    "ซุ่มเกลียดตัดจังหวะการ Blink หรือร่ายสกิลของตัวคอร์ศัตรู",
                    "ออก Glimmer Cape / Solar Crest / Lotus Orb เซฟคอร์ฝั่งเรา"
                ]
            }
        ],
        metrics: [
            { name: "Sentry Wards Bought", target: "14+ ชิ้น", desc: "การขัดขวางสายตาศัตรูและการทำลายวิชั่น" },
            { name: "Kill Participation", target: "55%+", desc: "สถิติมีส่วนร่วมในคะแนนการคิล" },
            { name: "Wisdom Runes Secured", target: "75%+", desc: "สถิติการชิงรูน Wisdom สำเร็จ" },
            { name: "Utility Item Timing", target: "< 18 นาที", desc: "ความไวในการครอบครองไอเทมสนับสนุนหลัก" }
        ],
        traps: [
            "ปล่อยให้ Pos 3 ยืนเลนคนเดียวโดนแครี่และซัพศัตรูกดดันจนเสียเลนกลางคัน",
            "แย่ง Last Hit ครีปของ Pos 3 ในเลน",
            "ออกของเน้นทำดาเมจตัวเอง (เช่น Dagon) แทนที่จะทำของมาสนับสนุนรักษาชีวิตตัวแครี่",
            "เดินแจกฟรีช่วงเลทเกมเพราะประมาทนอกวิชั่น"
        ]
    },
    pos5: {
        title: "Position 5 — Hard Support (ดูแลชีวิตแครี่ คุมวิชั่น และ Shotcaller)",
        overview: "Pos 5 คือกระดูกสันหลังของทีม (Shotcaller & Ward Master) รับผิดชอบการดูแลชีวิต Pos 1 ในช่วง 10 นาทีแรก ปักวิชั่นทั่วแผนที่ และยืนตำแหน่งร่ายสกิลคุมไฟต์จากแนวหลัง",
        phases: [
            {
                name: "🌅 Laning Phase (0-10 นาที): การเซฟแครี่และการดึงครีป",
                tips: [
                    "พก Healing Salve & Tango เติมเลือดให้ Pos 1 ตลอดเวลา ห้ามเสียดายเงิน",
                    "ดึงครีป (Pulling) ครีปป่าตัวเล็กเข้าหาครีปเลนเพื่อดึงระยะคลื่นครีปให้ชนใกล้ป้อมเรา",
                    "โซนซัพพอร์ตและออฟเลนศัตรูให้อยู่นอกระยะตอดเลือด Pos 1"
                ]
            },
            {
                name: "⚡ Mid Game & Map Control (10-25 นาที): การปักวิชั่นและการ Shotcall",
                tips: [
                    "ปัก Observer Wards ป้องกันจุดฟาร์มเซฟของ Pos 1 ให้ร้อยเปอร์เซ็นต์",
                    "ซื้อ Sentry Ward Deward เคลียร์วิชั่นศัตรูรอบถ้ำ Roshan",
                    "สื่อสารทิศทางการบุก คอลเวลาเกิดของรูน และสั่งแผนการ Smoke"
                ]
            },
            {
                name: "🛡️ Late Game & Position (25+ นาที): การยืนซ่อนในทรีไลน์และการ Buyback",
                tips: [
                    "ยืนซ่อนในทรีไลน์ (Tree Line) ปล่อยสกิลคุมไฟต์โดยไม่ให้ศัตรูเห็นตัวก่อน",
                    "สละชีวิตเซฟ Pos 1 หากจำเป็นในการปะทะ",
                    "เก็บเงินสำรองซื้อเกิด (Buyback) เสมอในเลทเกม"
                ]
            }
        ],
        metrics: [
            { name: "Camp Pulled Count", target: "5+ ครั้ง", desc: "สถิติจำนวนการลากดึงเลนช่วง 10 นาทีแรก" },
            { name: "Observer Wards Uptime", target: "90%+", desc: "ระยะเวลาความสมบูรณ์ของจุดหวอดสังเกตการณ์บนแมพ" },
            { name: "Deward Success Count", target: "8+ ชิ้น", desc: "การเคลียร์หวอดศัตรูสำเร็จ" },
            { name: "Deaths Share in Team", target: "< 22%", desc: "พยายามเอาตัวรอดไม่ตายเยอะเกินไปแม้เป็นซัพพอร์ต" }
        ],
        traps: [
            "ขโมย Last Hit ครีปแครี่ หรือตีครีปเลนเล่นจนเสียความสมดุลการชนครีปเลน",
            "ยืนเปิดหน้าให้ศัตรู Blink มาคิลตัวแรกในไฟต์สำคัญ",
            "ไม่พกใบวาร์ป หรือเดินปักหวอดคนเดียวสุ่มเสี่ยงในจุดไม่มีข้อมูลจนโดนฆ่าฟรี",
            "ปัก Ward ที่เดิมซ้ำๆ จนโดน Deward คืนทุน"
        ]
    }
};

const META_HERO_RECOMMENDATIONS = {
    "Pos 1 (Carry)": [
        { name: "Juggernaut", timing: "Battle Fury (นาที 12-14) / Manta", tips: "หมุน Blade Fury หลบสกิล ฟาร์มป่าไว และ Omnislash เก็บตัวคีย์ศัตรูในไฟต์" },
        { name: "Anti-Mage", timing: "Battle Fury (นาที 11-13) / Manta", tips: "ฟาร์มไวสุดขีด Blink ตัดเลน และ Mana Void กวาดล้างศัตรูเมื่อมาน่าต่ำ" },
        { name: "Phantom Assassin", timing: "Desolator (นาที 12-15) / BKB", tips: "ซ่อนวิชั่นด้วย Blur พุ่งจับตัวคีย์แนวหลังศัตรูด้วย Coup de Grace Crit ดาเมจสูง" },
        { name: "Lone Druid", timing: "Radiance (นาที 12-14) / Bear items", tips: "เน้นป้อมเลนดันเกรี้ยวกราด ใช้ร่างหมีรับดาเมจและดันป้อมเร็วเพื่อทำลายพื้นที่ปลอดภัยศัตรู" },
        { name: "Shadow Fiend", timing: "Shadow Blade / BKB (นาที 14-17)", tips: "ฟาร์มไวมากด้วย Razes ชนะไฟต์ต้นเกมด้วย Soul accumulation เสริมกายภาพดาเมจสูงสุด" },
        { name: "Wraith King", timing: "Armlet / Desolator (นาที 12-15)", tips: "มีความทนทานสูง ตายยากด้วยเกิดใหม่ กดดันเลนดีด้วย Skeleton army สแต็คครีปป่าฟาร์มไว" },
        { name: "Spectre", timing: "Radiance (นาที 14-16) / Blademail", tips: "เลทเกมสุดแกร่ง ใช้ Haunt เพื่อกระโดดไปล้วงตัวหลังคีย์ซัพพอร์ตศัตรูทันทีที่มีไฟต์" },
        { name: "Drow Ranger", timing: "Dragon Lance (นาที 10-12) / Pike", tips: "ยืนระยะยิงไกล ปิดกั้นการใช้สกิลด้วย Gust และยิงMarksmanship ทลวงเกราะ" }
    ],
    "Pos 2 (Mid)": [
        { name: "Invoker", timing: "Orchid / Blink Dagger (นาที 13-16)", tips: "คอมโบสกิลยืดหยุ่น Cold Snap + Meteor + Deafening Blast คุมจังหวะไฟต์ยับยั้งตัวหลัก" },
        { name: "Shadow Fiend", timing: "Eul's / Blink Dagger (นาที 11-13)", tips: "บิลด์เวทมนตร์หรือบิลด์กายภาพก็แกร่ง คุมเลนกลางดีเยี่ยม ดักคอมโบ Requiem of Souls" },
        { name: "Keeper of the Light", timing: "Dagon / Boots of Travel (นาที 10-13)", tips: "เคลียร์ครีปดันเลนไวมากด้วย Illuminate เดินแก๊งทั่วแผนที่คุมแมพและยิงดาเมจเวทหนัก" },
        { name: "Ember Spirit", timing: "Mage Slayer / Maelstrom (นาที 12-15)", tips: "คล่องตัวสูง เข้าทำไฟต์ป่วนได้ดีและป้องกันดาเมจเวทมนตร์ด้วย Flame Guard" },
        { name: "Storm Spirit", timing: "Orchid (นาที 13-16) / Bloodstone", tips: "Ball Lightning บินโฉบล้วงคิลตัวหลังแมพ สร้างความหวาดกลัวทั่วทั้งเลน" },
        { name: "Void Spirit", timing: "Eucharist / Aghanim (นาที 14-17)", tips: "พุ่งทะลวงไฟต์ด้วย Astral Step มีโล่ซับดาเมจและดิสรัปต์ศัตรูด้วย Dissimilate" },
        { name: "Puck", timing: "Witch Blade / Blink (นาที 11-14)", tips: "หลบสกิลเทพด้วย Phase Shift เปิดไฟต์ด้วย Dream Coil ล็อคศัตรูให้อยู่กับที่" }
    ],
    "Pos 3 (Offlane)": [
        { name: "Axe", timing: "Blink Dagger (นาที 11-14) / Blademail", tips: "Blink + Call ล็อคศัตรูหลายตัวพร้อมกัน ปิดด้วย Culling Blade Execute ตัวเลือดต่ำ" },
        { name: "Slardar", timing: "Blink Dagger (นาที 10-12) / Echo Sabre", tips: "ลดเกราะศัตรูหนักด้วย Corrosive Haze เดินเกมไวในแม่น้ำ วิ่งไล่ตบเปิดไฟต์" },
        { name: "Doom", timing: "Blink Dagger / BKB (นาที 13-16)", tips: "ใช้สกิล Doom ปิดฮีโร่คีย์หลักของศัตรูในไฟต์ทันที กินครีปป่าเอาบัฟเพิ่มความสามารถยืนเลน" },
        { name: "Beastmaster", timing: "Helm of the Overlord (นาที 12-14)", tips: "คุมสัตว์อัญเชิญดันป้อมและให้วิชั่น ปลดปล่อย Roar สกัดการเคลื่อนที่ของตัวหลักศัตรู" },
        { name: "Centaur Warrunner", timing: "Blink Dagger (นาที 11-13) / Pipe", tips: "แทงค์อึดสูงStampede เร่งความเร็วทีมเข้าบุกหรือถอนตัว Hoof Stump Stun กลุ่ม" },
        { name: "Tidehunter", timing: "Blink Dagger (นาที 12-15) / Ravage", tips: "Ravage อัลติเมทเปิดไฟต์ระดับกวาดล้างทั้งหน้าจอ ยืนค้ำหน้าด้วย Kraken Shell" }
    ],
    "Pos 4 (Soft Support)": [
        { name: "Hoodwink", timing: "Gleipnir (นาที 15-18)", tips: "ปักหวอดและทำดาเมจตอดได้ไกล ล็อคตัวศัตรูด้วย Bushwhack และยิงท่าไม้ตายทะลวงเกราะ" },
        { name: "Pudge", timing: "Blink Dagger / Aether Lens (นาที 12-15)", tips: "ปักหวอดมุมมืด Hook ดึงเป้าหมายศัตรูหลุดตำแหน่ง Dismember ล็อคฆ่าต่อเนื่อง" },
        { name: "Omniknight", timing: "Guardian Greaves (นาที 14-17)", tips: "ฟื้นฟูเลือดค้ำเลน มีสกิลอมตะชั่วคราวช่วยชีวิตตัวคีย์หลักของทีม" },
        { name: "Abaddon", timing: "Holy Locket / Vlad's (นาที 13-16)", tips: "ใช้โล่แก้ดีบัฟและกันดาเมจให้เพื่อนร่วมทีม มีความอึดสูง ตายยากเพราะไม้ตายเกิดใหม่" },
        { name: "Rubick", timing: "Aether Lens / Blink (นาที 14-17)", tips: "ขโมยสกิลไม้ตายศัตรูมาใช้สวนกลับ Telekinesis ยกศัตรูขัดจังหวะไฟต์" },
        { name: "Mirana", timing: "Eul's / Spirit Vessel (นาที 13-16)", tips: "Sacred Arrow ยิงยิง Stun ระยะไกล Moonlight Shadow ซ่อนตัวทั้งทีมเดินแก๊ง" }
    ],
    "Pos 5 (Hard Support)": [
        { name: "Lion", timing: "Blink Dagger / Aether Lens (นาที 14-17)", tips: "Hex + Impale ล็อคศัตรูนานต่อเนื่อง Finger of Death ยิงจู่โจมตัวอ่อนแอดับทันที" },
        { name: "Crystal Maiden", timing: "Glimmer Cape (นาที 15-18) / BKB", tips: "เพิ่มมาน่าทั้งทีมด้วย Arcane Aura รอก็อประยะยืน Freezing Field กวาดล้างไฟต์" },
        { name: "Treant Protector", timing: "Aghanim's Shard / Glimmer (นาที 15-18)", tips: "ฮีลป้อมสร้างเกราะ คุมไฟต์ใหญ่ด้วย Overgrowth และเดินลอบในป่าปักวิชั่นลึก" },
        { name: "Bane", timing: "Glimmer Cape / Aether Lens (นาที 15-18)", tips: "ขัดจังหวะศัตรูหนักด้วย Nightmare และจับล็อค Fiend's Grip ปิดการเล่นศัตรูนาน 5 วินาที" },
        { name: "Witch Doctor", timing: "Glimmer Cape / Aghanim (นาที 14-17)", tips: "Paralyzing Cask เด้ง Stun กลุ่ม Maledict แปะดาเมจสะสม และ Death Ward ยิงล้างไฟต์" },
        { name: "Jakiro", timing: "Eul's / Force Staff (นาที 14-17)", tips: "Ice Path สกัดกั้นทางเดิน Macropyre เผาพื้นที่ไฟต์ ดันป้อมไวด้วย Liquid Fire" }
    ]
};

// ============================================================
// HERO BUILDS DATABASE (Patch 7.41e)
// ============================================================
const HERO_BUILDS = {
    "Juggernaut": {
        role: "Pos 1 (Carry)",
        playstyles: [
            {
                name: "🌾 Battle Fury Farm Style",
                winCondition: "Omnislash ล้างทีมศัตรูใน 1 ลำดับ — ยึดตัว BKB ก่อนเข้าไฟต์ใหญ่เสมอ",
                skillBuild: ["Blade Fury (1)", "Healing Ward (1)", "Blade Fury (2)", "Blade Dance (1)", "Blade Fury (3)", "Omnislash (6)", "Blade Fury (4)..."],
                items: {
                    starting: ["Tango", "Quelling Blade", "Slippers of Agility x2", "Circlet"],
                    early: ["Phase Boots", "Magic Wand", "Wraith Band x2"],
                    core: ["Battle Fury (นาที 10-14)", "Manta Style", "BKB"],
                    luxury: ["Butterfly", "Abyssal Blade", "Satanic", "Skadi"],
                    situational: ["Monkey King Bar (vs Evasion)", "Desolator (vs High Armor)"]
                },
                focusSkills: [
                    "Last Hit: เล็งครีปตายถูกจังหวะ 5 LH ต่อนาที",
                    "Blade Fury Dodge: เปิด Blade Fury เพื่อหลบ Stun/Root ให้ชิน",
                    "Omnislash Timing: เซฟ Omni ไว้ใช้แตกทีม อย่าใช้ตอนมีคนเดียว"
                ]
            },
            {
                name: "⚡ Maelstrom Tempo Burst Style",
                winCondition: "ดันเลนไฟต์ไว กระโดดไฟต์ด้วย Swift Blink + Aghanim Shard Spin",
                skillBuild: ["Blade Fury (1)", "Blade Dance (1)", "Blade Fury (2)", "Healing Ward (1)", "Blade Fury (3)", "Omnislash (6)..."],
                items: {
                    starting: ["Tango", "Quelling Blade", "Circlet x2"],
                    early: ["Phase Boots", "Magic Wand", "Orb of Corrosion"],
                    core: ["Maelstrom (นาที 10-12)", "Manta Style", "Aghanim's Shard"],
                    luxury: ["Swift Blink", "Mjollnir", "Eye of Skadi"],
                    situational: ["Diffusal Blade", "BKB"]
                },
                focusSkills: [
                    "Tempo Aggression: เดินแก๊งไฟต์พร้อม Maelstrom ไม่แช่ฟาร์มป่านาน",
                    "Shard Spin: ใช้ Shard Spin เคลียร์ครีปดันเลนและทำดาเมจ AoE"
                ]
            }
        ]
    },
    "Shadow Fiend": {
        role: "Pos 2 (Mid)",
        playstyles: [
            {
                name: "⚔️ Physical Agility Carry",
                winCondition: "สะสม Soul ให้ครบ 36 ก่อนนาที 15 ยิงดาเมจกายภาพใส่เป้าหมายหลักในไฟต์",
                skillBuild: ["Shadow Razes (1-4)", "Necromastery (1)", "Presence (1)", "Requiem of Souls (6)..."],
                items: {
                    starting: ["Tango", "Slippers x2", "Circlet", "Iron Branch"],
                    early: ["Power Treads", "Wraith Band x2", "Magic Wand"],
                    core: ["Dragon Lance (นาที 11-13)", "BKB", "Silver Edge"],
                    luxury: ["Sange and Yasha", "Monkey King Bar", "Eye of Skadi", "Satanic"],
                    situational: ["Satanic", "Hurricane Pike"]
                },
                focusSkills: [
                    "Raze Combo: ฝึก Near/Mid/Far Raze สามตัวติดต่อกันทันที",
                    "Soul Management: อย่าตายเพื่อรักษา Soul count"
                ]
            },
            {
                name: "⚡ Magic Requiem One-Shot",
                winCondition: "Eul's ลอยศัตรูขึ้นฟ้า → Blink เข้าใต้วิถี → Requiem of Souls ดับคู่แข่งทันที 100-0",
                skillBuild: ["Shadow Razes (1-4)", "Necromastery (1-2)", "Requiem of Souls (6)..."],
                items: {
                    starting: ["Tango", "Mantle x2", "Circlet"],
                    early: ["Power Treads", "Null Talisman x2", "Magic Wand"],
                    core: ["Eul's Scepter (นาที 10-12)", "Blink Dagger", "Aghanim's Scepter"],
                    luxury: ["Refresher Orb", "Octarine Core", "Arcane Blink"],
                    situational: ["BKB (vs Disable)", "Etherial Blade"]
                },
                focusSkills: [
                    "Eul Timing: กด Eul ใส่ศัตรู นับ 2.5 วินาที กด Requiem ใต้เท้าศัตรูพอดี",
                    "Aghanim Heal: Requiem ขากลับจะฮีล SF ตามปริมาณดาเมจ"
                ]
            }
        ]
    },
    "Invoker": {
        role: "Pos 2 (Mid)",
        playstyles: [
            {
                name: "⚡ Quas-Wex Roaming & Disruption",
                winCondition: "เดินแก๊งรวดเร็ว ล็อคเป้าหมายด้วย Cold Snap + Tornado + EMP ดูดมาน่าศัตรูหมดแมพ",
                skillBuild: ["Quas (1)", "Wex (1)", "Quas (2)", "Wex (2)", "Quas (3)", "Invoke (6)..."],
                items: {
                    starting: ["Tango", "Circlet", "Iron Branch x2"],
                    early: ["Phase Boots", "Urn of Shadows", "Magic Wand"],
                    core: ["Spirit Vessel (นาที 10-13)", "Orchid Malevolence", "BKB"],
                    luxury: ["Scythe of Vyse", "Witch Blade", "Blink Dagger"],
                    situational: ["Ghost Scepter", "Force Staff"]
                },
                focusSkills: [
                    "EMP Placement: โยน EMP ในทิศทางศัตรูวิ่งหนี",
                    "Cold Snap Proc: ใช้ Urn/Vessel เด้ง Cold Snap รัวๆ"
                ]
            },
            {
                name: "🔥 Quas-Exort Heavy Nuke & Sunstrike",
                winCondition: "Sunstrike ช่วยคิลทั่วแมพ คอมโบ Chaos Meteor + Deafening Blast ล้างไฟต์ใหญ่",
                skillBuild: ["Exort (1)", "Quas (1)", "Exort (2)", "Quas (2)", "Exort (3)", "Invoke (6)..."],
                items: {
                    starting: ["Tango", "Mantle x2", "Circlet"],
                    early: ["Boots of Speed", "Hand of Midas (นาที 8-10)", "Null Talisman"],
                    core: ["Boots of Travel", "Aghanim's Scepter", "Blink Dagger"],
                    luxury: ["Refresher Orb", "Octarine Core", "Shiva's Guard"],
                    situational: ["BKB", "Black Blade"]
                },
                focusSkills: [
                    "Sunstrike Map Watch: ดูแถบเลือดเพื่อนร่วมทีมตลอดเวลา ยิง Sunstrike ช่วย",
                    "Refresher Combo: Meteor + Blast → Refresher → Meteor + Blast"
                ]
            }
        ]
    },
    "Pudge": {
        role: "Pos 4/5",
        playstyles: [
            {
                name: "🛡️ Offlane / Core Tank Style",
                winCondition: "ยึดพื้นที่หน้าไฟต์ด้วย Flesh Heap + Aghanim Rot ดาเมจมหาศาลและตายยากมาก",
                skillBuild: ["Rot (1)", "Meat Hook (1)", "Rot (2)", "Flesh Heap (1)", "Rot (3)", "Dismember (6)..."],
                items: {
                    starting: ["Tango x2", "Ring of Protection", "Iron Branch x2"],
                    early: ["Phase Boots", "Vanguard", "Magic Wand"],
                    core: ["Blink Dagger (นาที 12-14)", "Aghanim's Scepter", "Pipe of Insight"],
                    luxury: ["Heart of Tarrasque", "Shiva's Guard", "Overwhelming Blink"],
                    situational: ["Blade Mail", "Crimson Guard"]
                },
                focusSkills: [
                    "Rot AoE Positioning: เดินแช่ Rot กลางไฟต์เพื่อทำดาเมจและลดฮีลศัตรู",
                    "Flesh Heap Toggle: เปิด Flesh Heap ซับดาเมจเวทหนักก่อนเข้า"
                ]
            },
            {
                name: "⚡ Support Hook & Save Style",
                winCondition: "Hook ตัวเดียวทำให้ทีมกดได้ 5 ต่อ 4 หรือ Hook เซฟเพื่อนที่โดนคอมโบยับ",
                skillBuild: ["Meat Hook (1)", "Rot (1)", "Meat Hook (2)", "Flesh Heap (1)", "Meat Hook (3)", "Dismember (6)..."],
                items: {
                    starting: ["Tango x2", "Clarity x2", "Observer Ward", "Sentry"],
                    early: ["Arcane Boots", "Magic Wand", "Soul Ring"],
                    core: ["Blink Dagger (นาที 13-16)", "Aether Lens", "Force Staff"],
                    luxury: ["Glimmer Cape", "Scythe of Vyse", "Lotus Orb"],
                    situational: ["Ghost Scepter", "Eul's Scepter"]
                },
                focusSkills: [
                    "Hook Save: Hook เพื่อนร่วมทีมที่กำลังโดน Stun หนีออกจากไฟต์",
                    "Vision Hook: ปักหวอดมุมมืดแล้ว Hook จากระยะไกลสุด"
                ]
            }
        ]
    },
    "Shadow Fiend": {
        role: "Pos 2 (Mid)",
        winCondition: "สะสม Soul ให้ครบ 36 ก่อนนาที 15 จากนั้น Requiem of Souls กวาดทีม",
        skillBuild: ["Shadow Razes (ทุก level จนถึง 7)", "Necromastery (1)", "Presence (1)", "Requiem (6)..."],
        items: {
            starting: ["Tango", "Slippers x2", "Mantle"],
            early: ["Power Treads", "Wraith Band x2", "Magic Wand"],
            core: ["Dragon Lance", "BKB", "Silver Edge / Shadow Blade"],
            luxury: ["Sange and Yasha", "Monkey King Bar", "Skadi"],
            situational: ["Eul's (vs Stun — สกิลให้ตัวเอง)", "Black Blade"]
        },
        focusSkills: [
            "Raze Combo: ฝึก Near/Mid/Far Raze สามตัวติดต่อกันทันที",
            "Soul Management: อย่าตายเพื่อรักษา Soul count",
            "Requiem TP Combo: TP เลน → Requiem ลงก็ได้ดาเมจทันที"
        ]
    },
    "Crystal Maiden": {
        role: "Pos 5 (Hard Support)",
        winCondition: "Freezing Field Ultimate ทำดาเมจต่อเนื่องในไฟต์ใหญ่ — ต้องมีทีมคุ้มกัน Ultimate",
        skillBuild: ["Crystal Nova (1)", "Frostbite (1)", "Arcane Aura (1)", "Frostbite (2)", "Crystal Nova (2)", "Freezing Field (6)..."],
        items: {
            starting: ["Tango x2", "Clarity x3", "Observer Ward", "Sentry Ward"],
            early: ["Arcane Boots", "Null Talisman", "Magic Wand"],
            core: ["Glimmer Cape (นาที 15-18)", "Force Staff", "Aether Lens"],
            luxury: ["Aghanim's Scepter", "Octarine Core"],
            situational: ["Blink Dagger (ตำแหน่งวาง Ult)", "Ghost Scepter (vs Physical)"]
        },
        focusSkills: [
            "Ward Placement: ปักวิชั่นให้ครอบคลุม Roshan + ป่าของศัตรู",
            "Freezing Field Positioning: ยืนข้างหลังทีมแล้วค่อยเปิด Ult",
            "Arcane Aura Awareness: ช่วยทีมมาน่า อย่าลืมจับตาสถานะมาน่าเพื่อน"
        ]
    },
    "Lion": {
        role: "Pos 5 (Hard Support)",
        winCondition: "Hex + Impale + Finger of Death One-shot ฮีโร่ Support ศัตรูทันที",
        skillBuild: ["Earth Spike (1)", "Hex (1)", "Earth Spike (2)", "Mana Drain (1)", "Earth Spike (3)", "Finger of Death (6)..."],
        items: {
            starting: ["Tango x2", "Clarity x2", "Observer Ward", "Sentry"],
            early: ["Arcane Boots", "Wind Lace", "Magic Wand"],
            core: ["Aether Lens (นาที 14-17)", "Blink Dagger", "Glimmer Cape"],
            luxury: ["Aghanim's Scepter", "Octarine Core", "Refresher"],
            situational: ["Force Staff (เซฟเพื่อน)", "Scythe of Vyse (ล็อคเพิ่ม)"]
        },
        focusSkills: [
            "CC Chain: Hex → Spike → Finger อย่าข้ามขั้นตอน",
            "Blink Positioning: Blink เข้าหลังทีม แล้ว Hex + Spike ก่อนถอย",
            "Mana Drain: ดูดมาน่าศัตรูก่อนไฟต์เสมอ"
        ]
    },
    "Axe": {
        role: "Pos 3 (Offlane)",
        winCondition: "Blink + Call ล็อคทีมศัตรู 5 คน แล้วทีมกดได้ทันที — Culling Blade Execute ตัวเลือด",
        skillBuild: ["Berserker's Call (1)", "Battle Hunger (1)", "Counter Helix (1)", "Counter Helix (2)", "Berserker's Call (2)", "Culling Blade (6)..."],
        items: {
            starting: ["Tango x2", "Stout Shield", "Ring of Protection"],
            early: ["Vanguard", "Phase Boots", "Magic Wand"],
            core: ["Blink Dagger (นาที 11-14)", "BKB", "Heart of Tarrasque"],
            luxury: ["Blade Mail", "Shiva's Guard", "Aghanim's Shard"],
            situational: ["Crimson Guard (vs Physical spam)", "Pipe (vs Magic burst)"]
        },
        focusSkills: [
            "Call Positioning: Blink ตรงกลางทีมศัตรู ไม่ใช่ข้างๆ",
            "Helix Stacking: ยืนรับตีจากหลายตัวพร้อมกันเพิ่มโอกาส Helix",
            "Culling Blade: ดูเลือดศัตรู Execute ทันทีที่ต่ำกว่า threshold"
        ]
    },
    "Drow Ranger": {
        role: "Pos 1 (Carry)",
        winCondition: "Precision Aura เพิ่มดาเมจทีมทุกคน — ยืนห่างและยิงจากระยะปลอดภัย",
        skillBuild: ["Frost Arrows (1)", "Multishot (1)", "Frost Arrows (2)", "Gust (1)", "Frost Arrows (3)", "Marksmanship (6)..."],
        items: {
            starting: ["Tango", "Slippers x2", "Circlet"],
            early: ["Power Treads", "Wraith Band x2"],
            core: ["Dragon Lance (นาที 10-12)", "Hurricane Pike", "Aghanim's Scepter"],
            luxury: ["Butterfly", "Satanic", "Skadi"],
            situational: ["Silver Edge (vs Passive heavy)", "MKB (vs Evasion)"]
        },
        focusSkills: [
            "Positioning: ยืนห่างจากแนวไฟต์เสมอ ห้ามยืนชิด Melee ศัตรู",
            "Marksmanship Trigger: อยู่ห่างจากเพื่อนร่วมทีม Melee > 400 range",
            "Gust Timing: ใช้ Gust หยุดศัตรูที่วิ่งหนีหรือรับ Blink เข้ามา"
        ]
    },
    "Lone Druid": {
        role: "Pos 1 (Carry)",
        winCondition: "ใช้ Spirit Bear ดันป้อมเร็วในนาที 15-20 ด้วย Entangle + Rabid ขณะตัวหลักฟาร์มป่าต่อ",
        skillBuild: ["Spirit Bear (1)", "Spirit Link (1)", "Savage Roar (1)", "Spirit Link (2)", "Spirit Link (3)", "True Form (6)..."],
        items: {
            starting: ["Tango", "Quelling Blade", "Iron Branch x2"],
            early: ["Phase Boots (Bear)", "Orb of Corrosion (Bear)", "Magic Wand"],
            core: ["Radiance (นาที 12-14)", "Assault Cuirass (Bear)", "Aghanim's Scepter"],
            luxury: ["Skadi", "Butterfly", "Satanic"],
            situational: ["Monkey King Bar (vs Evasion)", "Bloodthorn (vs BKB users)"]
        },
        focusSkills: [
            "Bear Micro: สั่ง Bear ดันป้อมพร้อมกับตัวหลักฟาร์มป่า ต้องทำ 2 อย่างพร้อมกัน",
            "Radiance Timing: ต้องออก Radiance ให้ได้ก่อนนาที 14 หรือเกมอาจสูญเสียความได้เปรียบ",
            "True Form Positioning: เปลี่ยนเป็น True Form ในไฟต์ใหญ่ แต่อย่าเดิน True Form เพราะช้า"
        ]
    },
    "Wraith King": {
        role: "Pos 1 (Carry)",
        winCondition: "ดันป้อมต่อเนื่องด้วย Skeleton + Reincarnation อย่าให้ศัตรูล้อมตายก่อนตบจบเกม",
        skillBuild: ["Wraithfire Blast (1)", "Mortal Strike (1)", "Vampiric Spirit (1)", "Mortal Strike (2)", "Mortal Strike (3)", "Reincarnation (6)..."],
        items: {
            starting: ["Tango", "Quelling Blade", "Circlet x2"],
            early: ["Phase Boots", "Magic Wand", "Armlet of Mordiggian"],
            core: ["Armlet (นาที 9-11)", "Desolator", "BKB"],
            luxury: ["Assault Cuirass", "Abyssal Blade", "Satanic"],
            situational: ["Heaven's Halberd (vs Carry กายภาพ)", "MKB (vs Evasion)"]
        },
        focusSkills: [
            "Armlet Toggle: toggle Armlet ให้ชินเพื่อรักษาเลือดในไฟต์",
            "Skeleton + Push: ใช้ Vampire Spirit → Skeletons ดันป้อมทันทีหลังคิล",
            "Reincarnation Bait: ยืนรับตีให้ศัตรูกด Ult ใช้หมดก่อนแล้วค่อยเกิดกลับมา"
        ]
    },
    "Spectre": {
        role: "Pos 1 (Carry)",
        winCondition: "Haunt กระโดดเข้า Teamfight ทุกจุดพร้อมกัน ล้างซัพ/Core ที่เลือดน้อยทีละตัว",
        skillBuild: ["Spectral Dagger (1)", "Desolate (1)", "Spectral Dagger (2)", "Dispersion (1)", "Spectral Dagger (3)", "Haunt (6)..."],
        items: {
            starting: ["Tango", "Quelling Blade", "Wraith Band"],
            early: ["Power Treads", "Magic Wand", "Wraith Band x2"],
            core: ["Radiance (นาที 14-16)", "Manta Style", "Blade Mail"],
            luxury: ["Heart of Tarrasque", "Butterfly", "Skadi"],
            situational: ["Diffusal Blade (vs Mana-dependent)", "Nullifier (vs Lotus/Linken)"]
        },
        focusSkills: [
            "Radiance Farm: ต้องฟาร์มป่าได้ทุก camp รอบแมพ Burn ครีปพร้อมกัน",
            "Haunt Timing: Haunt เมื่อไฟต์เริ่มแล้ว อย่า Haunt ก่อนหรือศัตรูจะหนีทัน",
            "Dispersion Positioning: ยืนรับตีให้ Dispersion กระจายดาเมจคืนมากที่สุด"
        ]
    },
    "Keeper of the Light": {
        role: "Pos 2 (Mid)",
        winCondition: "Illuminate + Blinding Light ดันเลนและสร้างความได้เปรียบในแมพ เดินแก๊งช่วยทุกเลน",
        skillBuild: ["Illuminate (1)", "Mana Leak (1)", "Illuminate (2)", "Blinding Light (1)", "Illuminate (3)", "Spirit Form (6)..."],
        items: {
            starting: ["Tango", "Clarity x2", "Mantle", "Iron Branch"],
            early: ["Boots of Travel", "Null Talisman", "Wind Lace"],
            core: ["Dagon (นาที 10-13)", "Boots of Travel", "Aghanim's Scepter"],
            luxury: ["Octarine Core", "Refresher Orb", "Aether Lens"],
            situational: ["Force Staff (เซฟตัวเอง)", "Scythe of Vyse"]
        },
        focusSkills: [
            "Illuminate Channel: ชาร์จ Illuminate เต็มก่อนยิง ไม่ยิงทิ้งดาเมจน้อย",
            "Chakra Magic: กดให้เพื่อนก่อนเข้าไฟต์เพื่อเพิ่มมาน่า",
            "BoT Roaming: TP ไปช่วยเลนที่ถูกกดดันทุกครั้ง ไม่นั่งเลน mid นาน"
        ]
    },
    "Ember Spirit": {
        role: "Pos 2 (Mid)",
        winCondition: "Sleight of Fist + Searing Chains ไล่ตบหลายตัวพร้อมกัน ใช้ Remnants หนีหรือจับ",
        skillBuild: ["Searing Chains (1)", "Sleight of Fist (1)", "Searing Chains (2)", "Flame Guard (1)", "Sleight of Fist (2)", "Fire Remnant (6)..."],
        items: {
            starting: ["Tango", "Circlet", "Iron Branch x2"],
            early: ["Phase Boots", "Bottle", "Magic Wand"],
            core: ["Maelstrom (นาที 12-15)", "Mage Slayer", "BKB"],
            luxury: ["Aghanim's Scepter", "Eye of Skadi", "Bloodthorn"],
            situational: ["Linken's Sphere (vs Single target)", "Lotus Orb (vs DoT)"]
        },
        focusSkills: [
            "Remnant Escape: วางไว้หลายจุด ใช้ Remnant หนีเมื่อถูก Gank",
            "Chains + Sleight Combo: Chain ล็อคก่อน แล้ว Sleight ตีเป็น AoE",
            "Flame Guard Management: เปิด Flame Guard เฉพาะในไฟต์ ประหยัดมาน่า"
        ]
    },
    "Doom": {
        role: "Pos 3 (Offlane)",
        winCondition: "Doom Ultimate ปิดฮีโร่คีย์ศัตรู (Carry/Initiator) ทุกไฟต์ใหญ่ ไม่ Doom คนผิดคนเด็ดขาด",
        skillBuild: ["Devour (1)", "Scorched Earth (1)", "Devour (2)", "Infernal Blade (1)", "Devour (3)", "Doom (6)..."],
        items: {
            starting: ["Tango x2", "Stout Shield", "Ring of Health"],
            early: ["Phase Boots", "Magic Wand", "Vanguard"],
            core: ["Blink Dagger (นาที 13-16)", "BKB", "Aghanim's Scepter"],
            luxury: ["Heart of Tarrasque", "Shiva's Guard", "Assault Cuirass"],
            situational: ["Pipe of Insight (vs Magic)", "Crimson Guard (vs Physical)"]
        },
        focusSkills: [
            "Devour Camp Selection: กินครีปป่าที่ให้ Buff ที่ดีที่สุด (Ogre → Armor, Centaur → HP Regen)",
            "Doom Target: กด Doom ตัวที่เป็นภัยสูงสุดต่อทีม ไม่ใช่ตัวที่อยู่ใกล้สุด",
            "Scorched Earth Chase: เปิดเพื่อไล่หรือหนี มีความเร็ว + Regen ช่วย"
        ]
    },
    "Beastmaster": {
        role: "Pos 3 (Offlane)",
        winCondition: "Primal Roar Lock ตัวสำคัญ ใช้สัตว์อัญเชิญดันป้อมพร้อมวิชั่นคุมแมพ",
        skillBuild: ["Wild Axes (1)", "Call of the Wild Hawk (1)", "Call of the Wild Boar (1)", "Inner Beast (1)", "Wild Axes (2)", "Primal Roar (6)..."],
        items: {
            starting: ["Tango x2", "Circlet", "Gauntlets"],
            early: ["Phase Boots", "Magic Wand", "Ring of Basilius"],
            core: ["Helm of the Overlord (นาที 12-14)", "Blink Dagger", "BKB"],
            luxury: ["Assault Cuirass", "Aghanim's Scepter", "Refresher Orb"],
            situational: ["Pipe (vs Magic)", "Orchid (additional silence)"]
        },
        focusSkills: [
            "Hawk Vision: ปักเหยี่ยวไว้จุด Roshan และทางเข้าป่าศัตรูตลอดเวลา",
            "Helm Creep Control: สั่ง Creep ที่ Helm ยึดได้ดันป้อมพร้อมกับทีม",
            "Roar + Blink: Blink เข้า → Roar ล็อค → ทีมรุมตบ อย่า Roar ก่อน Blink"
        ]
    },
    "Slardar": {
        role: "Pos 3 (Offlane)",
        winCondition: "Corrosive Haze ลดเกราะศัตรูทำให้ทีมตีโกง — Sprint + Blink วิ่งไล่ตบทุก Map",
        skillBuild: ["Guardian Sprint (1)", "Slithereen Crush (1)", "Guardian Sprint (2)", "Bash of the Deep (1)", "Slithereen Crush (2)", "Corrosive Haze (6)..."],
        items: {
            starting: ["Tango x2", "Circlet", "Iron Branch x2"],
            early: ["Phase Boots", "Magic Wand", "Echo Sabre"],
            core: ["Blink Dagger (นาที 10-12)", "BKB", "Aghanim's Scepter"],
            luxury: ["Assault Cuirass", "Heart", "Abyssal Blade"],
            situational: ["Skull Basher", "Nullifier (vs Invisible)"]
        },
        focusSkills: [
            "Haze on Carry: ใส่ Corrosive Haze ตัว Carry ศัตรูก่อนเสมอ ลดเกราะให้ทีมตี",
            "Sprint River: ใช้ Sprint ในน้ำเพื่อความเร็วสูงสุด เดินแก๊งเลนได้เร็วมาก",
            "Crush Stun: Crush → Bash → ใส่ Haze → ทีมตี ลำดับนี้สำคัญ"
        ]
    },
    "Hoodwink": {
        role: "Pos 4 (Soft Support)",
        winCondition: "Bushwhack ล็อค + Sharpshooter ยิง Ultimate สังหารตัวสำคัญในไฟต์จากระยะไกล",
        skillBuild: ["Acorn Shot (1)", "Bushwhack (1)", "Acorn Shot (2)", "Decoy (1)", "Acorn Shot (3)", "Sharpshooter (6)..."],
        items: {
            starting: ["Tango", "Clarity x2", "Enchanted Mango", "Sentry Ward"],
            early: ["Arcane Boots", "Magic Wand", "Null Talisman"],
            core: ["Gleipnir (นาที 15-18)", "Aether Lens", "Blink Dagger"],
            luxury: ["Aghanim's Scepter", "Octarine Core", "Refresher"],
            situational: ["Force Staff", "Glimmer Cape (หนีหลัง Ult)"]
        },
        focusSkills: [
            "Bushwhack Tree: โยน Trap ใกล้ต้นไม้เสมอ ถ้าไม่มีต้นไม้ก็ใช้ไม่ได้",
            "Sharpshooter Channel: หาจุดปลอดภัย Channel เต็ม ระวังถูก Interrupt",
            "Decoy Escape: ใช้ Decoy + Acorn ยิงต้นไม้เพื่อหลบหนีหรือเปลี่ยนทิศทาง"
        ]
    },
    "Omniknight": {
        role: "Pos 4 (Soft Support)",
        winCondition: "Repel + Degen Aura ทำให้ Carry ทีมอมตะชั่วคราวและช้าลงศัตรู เซฟ Carry ให้รอดทุกไฟต์",
        skillBuild: ["Purification (1)", "Repel (1)", "Purification (2)", "Degen Aura (1)", "Purification (3)", "Guardian Angel (6)..."],
        items: {
            starting: ["Tango x2", "Clarity x2", "Enchanted Mango", "Ward"],
            early: ["Arcane Boots", "Magic Wand", "Bracer"],
            core: ["Guardian Greaves (นาที 14-17)", "Aghanim's Scepter", "Force Staff"],
            luxury: ["Lotus Orb", "Pipe of Insight", "Shiva's Guard"],
            situational: ["Glimmer Cape", "Aether Lens (เพิ่ม Repel range)"]
        },
        focusSkills: [
            "Repel Timing: กด Repel ให้ Carry ก่อนไฟต์เริ่ม ไม่ใช่ตอนโดน Stun แล้ว",
            "Purification Heal: ยืนชิด Ally เพื่อ AoE Heal ด้วย Purification ให้ได้หลายคน",
            "Guardian Angel: เปิดเมื่อทีมกำลังจะตายรวม ไม่เปิดตอนทีมยังเลือดเต็ม"
        ]
    },
    "Abaddon": {
        role: "Pos 4/5",
        winCondition: "Borrowed Time ทำให้ตายไม่ได้ ใช้ช่วง Borrowed Time เซฟตัวเองและเดินเข้าหาศัตรูเพื่อ Counter",
        skillBuild: ["Mist Coil (1)", "Aphotic Shield (1)", "Mist Coil (2)", "Curse of Avernus (1)", "Mist Coil (3)", "Borrowed Time (6)..."],
        items: {
            starting: ["Tango x2", "Clarity", "Enchanted Mango x2", "Ward"],
            early: ["Arcane Boots", "Magic Wand"],
            core: ["Holy Locket (นาที 13-16)", "Guardian Greaves", "Aghanim's Scepter"],
            luxury: ["Lotus Orb", "Pipe", "Shiva's Guard"],
            situational: ["Force Staff", "Glimmer Cape"]
        },
        focusSkills: [
            "Shield Timing: กด Shield ให้ Ally ก่อนที่ Stun/Nuke จะโดน ไม่ใช่หลังโดนแล้ว",
            "Borrowed Time Manual: กด Manual ตอนเลือดต่ำเพื่อเดินเข้าหาศัตรูหรือเซฟเพื่อน",
            "Curse Slow: ตีศัตรูให้ Curse สแต็คเพื่อทำให้ทีม Carry ตีช้าลง"
        ]
    },
    "Treant Protector": {
        role: "Pos 5 (Hard Support)",
        winCondition: "Overgrowth ล็อคทีมศัตรูทั้งหมด 5 คน ให้ทีมกดได้เต็มๆ — ฮีล/Armor ป้อมทีมตลอดเวลา",
        skillBuild: ["Nature's Grasp (1)", "Leech Seed (1)", "Living Armor (1)", "Living Armor (2)", "Living Armor (3)", "Overgrowth (6)..."],
        items: {
            starting: ["Tango x2", "Clarity x2", "Observer Ward", "Sentry Ward"],
            early: ["Arcane Boots", "Magic Wand", "Wind Lace"],
            core: ["Aghanim's Shard (นาที 15-18)", "Glimmer Cape", "Force Staff"],
            luxury: ["Aghanim's Scepter", "Blink Dagger", "Refresher Orb"],
            situational: ["Pipe (vs Magic)", "Lotus Orb (vs Targeted spells)"]
        },
        focusSkills: [
            "Living Armor: ส่งให้ตัว Low HP ในทีมเสมอ ไม่ว่าจะอยู่ไกลแค่ไหน",
            "Overgrowth Setup: ต้องรอให้ทีมพร้อม Initiate แล้วค่อย Overgrowth ตาม",
            "Eyes in the Forest: ใช้ Passive วางวิชั่นในต้นไม้ทั่วแมพ"
        ]
    },
    "Bane": {
        role: "Pos 5 (Hard Support)",
        winCondition: "Fiend's Grip 5 วินาที = ชัยชนะในไฟต์ — Nightmare + Brain Sap ปิดศัตรูก่อนทีมเข้า",
        skillBuild: ["Brain Sap (1)", "Nightmare (1)", "Brain Sap (2)", "Enfeeble (1)", "Brain Sap (3)", "Fiend's Grip (6)..."],
        items: {
            starting: ["Tango x2", "Clarity x2", "Enchanted Mango x2", "Ward"],
            early: ["Arcane Boots", "Magic Wand", "Tranquil Boots"],
            core: ["Glimmer Cape (นาที 15-18)", "Aether Lens", "Blink Dagger"],
            luxury: ["Aghanim's Scepter", "Force Staff", "Octarine Core"],
            situational: ["Black King Bar ไม่ได้ใช้ (Support)", "Lotus Orb (ส่ง Grip ให้ศัตรูตัวอื่น)"]
        },
        focusSkills: [
            "Fiend's Grip Channel: อย่าถูก Interrupt! ยืนหลังทีมก่อน Grip",
            "Nightmare Ally Save: Nightmare ใส่เพื่อนที่กำลังถูก Grip/Dismember ได้",
            "Blink + Grip: Blink เข้า → Grip ตัวสำคัญ → Glimmer Cape ตัวเองให้อยู่นาน"
        ]
    }
};

const FOCUS_SKILLS_POOL = [
    { skill: "Last Hitting Mastery", desc: "ตั้งเป้า Last Hit ให้ได้ 60+ ครีปใน 10 นาทีแรก ห้ามพลาดครีปมากกว่า 10 ตัว", position: "Pos 1/2" },
    { skill: "Ward Discipline", desc: "ปักหวอดทุกครั้งที่มี Cooldown ครบ เน้นจุด Roshan + ป่าศัตรู + highground", position: "Pos 4/5" },
    { skill: "Positioning Awareness", desc: "ห้ามยืนในจุดที่ศัตรู Blink/Hook ได้ ยืน 2 ก้าวหลัง Creep Wave เสมอ", position: "ทุกตำแหน่ง" },
    { skill: "TP Response", desc: "กดวาปช่วยเลนที่กำลังถูกดันภายใน 5 วินาทีหลังเห็นพินอันตราย", position: "ทุกตำแหน่ง" },
    { skill: "Objective Focus", desc: "หลังคิลทุกครั้ง ให้หันไป Push Tower หรือ Rosh ทันที ห้ามไล่ดาม Respawn", position: "ทุกตำแหน่ง" },
    { skill: "BKB Timing", desc: "กด BKB เมื่อมี Stun Initiation จากศัตรูมากกว่า 1 คน ไม่ใช้มั่ว", position: "Pos 1/2/3" },
    { skill: "Camp Pulling", desc: "ดึงครีปป่าชนเลนทุก 2 นาที (นาที 1:53, 3:53...) เพื่อช่วย Carry ฟาร์มได้เต็มเลน", position: "Pos 4/5" },
    { skill: "Creep Stacking", desc: "สแตกครีปป่าทุก X:53 เพื่อเพิ่มทองและ XP สำหรับตัวฟาร์ม", position: "Pos 3/4" }
];

document.addEventListener('DOMContentLoaded', async () => {
    // Auto-restore IndexedDB backup into localStorage if cleared by OS reboot
    if (typeof IDB !== 'undefined' && IDB.restoreAll) {
        await IDB.restoreAll();
    }

    // Initial UI and components
    initNavigation();
    initSettings();
    initDailyProgram();
    initJournal();
    initHeroPool();
    initTimerUI();
    initLearningCenter();
    initMindsetChecklist();
    initMetaHeroes();
    initAllHeroesExplorer();
    initPatchTierList();
    initCoffeeModal();
    initRankGuide();
    initProSettingsGuide();
    initPatchNotes();
    initMapGuide();
    initWeaknessDetector();
    initHeroMatrix();
    
    fetchHeroList();
    
    // Initial Render
    renderDashboard();
    renderJournalList();
    renderHeroPool();
    renderAchievements();
    renderFocusSkill();
});

// --- Dynamic Hero Steam CDN Images Helper ---
function getHeroImageUrl(localizedName) {
    let clean = localizedName.toLowerCase()
        .replace(/ /g, '_')
        .replace(/-/g, '')
        .replace(/'/g, '');
    
    // Special naming cases on Valve CDN
    if (clean === "io") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/wisp.png";
    if (clean === "underlord") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/abyssal_underlord.png";
    if (clean === "shadow_fiend") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/nevermore.png";
    if (clean === "zeus") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/zuus.png";
    if (clean === "doom") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/doom_bringer.png";
    if (clean === "vengeful_spirit") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/vengefulspirit.png";
    if (clean === "windranger") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/windrunner.png";
    if (clean === "necrophos") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/necrolyte.png";
    if (clean === "wraith_king") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/skeleton_king.png";
    if (clean === "magnus") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/magnataur.png";
    if (clean === "queen_of_pain") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/queenofpain.png";
    if (clean === "treant_protector") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/treant.png";
    if (clean === "lifestealer") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/life_stealer.png";
    if (clean === "clockwerk") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/rattletrap.png";
    if (clean === "outworld_destroyer") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/obsidian_destroyer.png";
    if (clean === "timbersaw") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/shredder.png";
    if (clean === "centaur_warrunner") return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/centaur.png";
    
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${clean}.png`;
}

// --- Navigation Routing ---
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    document.querySelectorAll('.btn-goto-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchTab(target);
        });
    });
}

function switchTab(tabId) {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(i => i.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    const activeNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId);

    if (activeNav && activeContent) {
        activeNav.classList.add('active');
        activeContent.classList.add('active');
    }

    // GA4 Analytics Tab View Tracking
    if (typeof trackGAEvent === 'function') {
        trackGAEvent('tab_view', { tab_id: tabId });
    }

    if (tabId === 'dashboard') {
        renderDashboard();
    } else if (tabId === 'journal') {
        renderJournalList();
    } else if (tabId === 'heroes') {
        renderHeroPool();
    }
}

// --- Mindset Checklist Modal ---
function initMindsetChecklist() {
    const modal = document.getElementById('mindset-modal');
    const openBtn = document.getElementById('btn-open-mindset');
    const closeBtn = document.getElementById('btn-close-mindset');
    const form = document.getElementById('mindset-form');
    const heroSelect = document.getElementById('m-hero-select');
    const tipsBox = document.getElementById('mindset-hero-tips');
    
    openBtn.addEventListener('click', () => {
        // Load hero pool options
        const pool = StorageManager.getHeroPool();
        heroSelect.innerHTML = `<option value="">-- เลือกฮีโร่ที่จะซ้อมเกมนี้ --</option>`;
        pool.forEach(h => {
            heroSelect.innerHTML += `<option value="${h.id}">${h.name} (${h.role})</option>`;
        });
        
        tipsBox.classList.add('hidden-form');
        modal.classList.remove('hidden-form');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden-form');
    });

    heroSelect.addEventListener('change', () => {
        const pool = StorageManager.getHeroPool();
        const selected = pool.find(h => h.id === heroSelect.value);
        if (selected) {
            tipsBox.innerHTML = `<strong>คำแนะนำฮีโร่ (${selected.name}):</strong><br>${selected.tips}<br><br><strong>Timing สำคัญ:</strong> ${selected.timing}`;
            tipsBox.classList.remove('hidden-form');
        } else {
            tipsBox.classList.add('hidden-form');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.add('hidden-form');
        
        // Auto go to live companion and start timing
        switchTab('timings');
        document.getElementById('in-game-timer').textContent = "00:00";
        
        // Start TimingEngine
        TimingEngine.reset();
        const startStopBtn = document.getElementById('btn-timer-start-stop');
        
        const isRunning = TimingEngine.start(
            (formatted) => {
                document.getElementById('in-game-timer').textContent = formatted;
            },
            (adviceList, phaseName) => {
                const container = document.getElementById('coach-advice-container');
                let adviceHtml = `<span class="badge badge-primary coach-phase-badge">${phaseName}</span>`;
                adviceHtml += `<div class="coach-tip-list">`;
                adviceList.forEach(tip => {
                    adviceHtml += `<div class="coach-tip-item"><i class="fa-solid fa-lightbulb gold-text"></i> ${tip}</div>`;
                });
                adviceHtml += `</div>`;
                container.innerHTML = adviceHtml;
            }
        );

        if (isRunning) {
            startStopBtn.className = 'btn btn-primary btn-large';
            startStopBtn.innerHTML = `<i class="fa-solid fa-pause"></i> หยุดตัวนับเวลา`;
        }
        
        // Reward 10 XP for doing mindset review
        StorageManager.gainXp(10);
        renderDashboard();
    });
}

// --- Learning Center ---
function initLearningCenter() {
    const btns = document.querySelectorAll('.role-tab-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const roleKey = btn.getAttribute('data-role');
            renderRoleDetails(roleKey);
        });
    });

    // Default load Pos 1
    renderRoleDetails('pos1');
}

function renderRoleDetails(roleKey) {
    const data = ROLE_DATA[roleKey];
    const container = document.getElementById('role-details-container');
    if (!data || !container) return;
    
    let phasesHtml = '';
    if (data.phases) {
        data.phases.forEach(p => {
            phasesHtml += `
                <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:14px; border-radius:8px; margin-bottom:12px;">
                    <h5 style="margin:0 0 8px; color:var(--cyan); font-size:14px;">${p.name}</h5>
                    <ul class="role-list" style="margin:0; padding-left:18px;">
                        ${p.tips.map(t => `<li style="margin-bottom:4px; font-size:13px;">${t}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    }

    let metricsHtml = '';
    data.metrics.forEach(m => {
        metricsHtml += `
            <div class="metric-card mb-10">
                <div class="metric-card-title">${m.name}: <span class="gold-text">${m.target}</span></div>
                <div class="metric-card-desc">${m.desc}</div>
            </div>
        `;
    });

    let trapsHtml = '';
    data.traps.forEach(t => {
        trapsHtml += `<li style="margin-bottom:6px; color:#ff6b6b; font-size:13px;"><i class="fa-solid fa-xmark crimson-text"></i> ${t}</li>`;
    });

    container.innerHTML = `
        <div class="role-details-wrapper" style="padding:20px;">
            <div class="role-details-title-row" style="margin-bottom:14px;">
                <h2 style="color:#fff; font-size:22px; margin:0;"><i class="fa-solid fa-graduation-cap gold-text"></i> ${data.title}</h2>
                <p style="margin:6px 0 0; color:#c0c9d8; font-size:13px; line-height:1.5;">${data.overview}</p>
            </div>
            
            <div class="role-details-grid" style="display:grid; grid-template-columns: 2fr 1fr; gap:20px;">
                <div class="role-main-column">
                    <div class="role-section-box mb-20">
                        <h4 style="margin-top:0; color:#d4af37;"><i class="fa-solid fa-clock-rotate-left"></i> คู่มือเจาะลึก 4 ช่วงเวลาการเล่น (Timeline Strategy)</h4>
                        ${phasesHtml}
                    </div>
                    
                    <div class="role-section-box">
                        <h4 style="margin-top:0; color:#ff4d55;"><i class="fa-solid fa-triangle-exclamation"></i> 5 ข้อผิดพลาดคลาสสิกของตำแหน่งนี้ (Common Traps & Fixes)</h4>
                        <ul class="role-list" style="list-style:none; padding:0;">
                            ${trapsHtml}
                        </ul>
                    </div>
                </div>
                
                <div class="role-sidebar-column">
                    <h4 style="margin-top:0; color:#00d2d3;"><i class="fa-solid fa-chart-line"></i> 5 ตัวชี้วัดเป้าหมายประจำตำแหน่ง (KPIs)</h4>
                    ${metricsHtml}
                </div>
            </div>
        </div>
    `;
}

// --- Stats, OpenDota API & Image Sync ---
let cachedHeroes = {};

async function fetchHeroList() {
    const cached = localStorage.getItem('dota2_heroes_cache');
    if (cached) {
        cachedHeroes = JSON.parse(cached);
        return;
    }
    
    try {
        const response = await fetch('https://api.opendota.com/api/heroes');
        if (response.ok) {
            const data = await response.json();
            const map = {};
            data.forEach(hero => {
                map[hero.id] = hero.localized_name;
            });
            cachedHeroes = map;
            localStorage.setItem('dota2_heroes_cache', JSON.stringify(map));
        }
    } catch (e) {
        console.error("Failed to load hero list from API", e);
    }
}

// --- Helper: Auto-convert Steam64 ID or Profile URL to 32-bit Account ID ---
function normalizeSteamId(input) {
    if (!input) return '';
    let str = input.toString().trim();
    
    // Extract digits if user pasted full URL (e.g. dotabuff.com/players/70388657)
    const matches = str.match(/\d+/g);
    if (matches) {
        // Find 17-digit Steam64 or 7-10 digit Account ID
        const found64 = matches.find(m => m.length === 17 && m.startsWith('7656119'));
        if (found64) {
            try {
                return (BigInt(found64) - 76561197960265728n).toString();
            } catch (e) {}
        }
        const found32 = matches.find(m => m.length >= 7 && m.length <= 10);
        if (found32) return found32;
        str = matches.join('');
    }

    // Direct Steam64 ID string (17 digits)
    if (str.length === 17 && str.startsWith('7656119')) {
        try {
            return (BigInt(str) - 76561197960265728n).toString();
        } catch (e) {}
    }

    return str;
}

// Helper: Fetch with CORS Proxy Fallback if direct fetch is blocked by AdBlock or Network
async function fetchWithFallback(url) {
    try {
        const res = await fetch(url);
        if (res.ok || res.status === 429) return res;
    } catch (e) {
        console.warn('Direct fetch failed, attempting proxy fallback...', e);
    }
    
    // Fallback via public CORS Proxy
    try {
        const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
        const resProxy = await fetch(proxyUrl);
        if (resProxy.ok) return resProxy;
    } catch (e2) {
        console.warn('Proxy fallback 1 failed, attempting proxy 2...', e2);
    }

    try {
        const proxyUrl2 = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
        return await fetch(proxyUrl2);
    } catch (e3) {
        throw new Error('Network error (Failed to fetch)');
    }
}

async function syncOpenDotaMatches() {
    const rawSettings = StorageManager.getSettings();
    const listBody = document.getElementById('api-matches-list');
    
    if (!rawSettings.steamId) {
        alert('กรุณาไปที่หน้า Settings และตั้งค่า Steam ID ก่อนทำการเชื่อมโยงข้อมูล');
        switchTab('settings');
        return;
    }

    const accountId = normalizeSteamId(rawSettings.steamId);
    if (accountId !== rawSettings.steamId) {
        // Auto-fix settings with normalized 32-bit ID
        rawSettings.steamId = accountId;
        StorageManager.saveSettings(rawSettings);
        const inputEl = document.getElementById('settings-steamid');
        if (inputEl) inputEl.value = accountId;
    }

    listBody.innerHTML = `<tr><td colspan="5" class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> กำลังดึงข้อมูลล่าสุดจาก OpenDota API (ID: ${accountId})...</td></tr>`;
    
    try {
        const response = await fetchWithFallback(`https://api.opendota.com/api/players/${accountId}/matches?limit=20`);
        
        if (response.status === 429) {
            listBody.innerHTML = `<tr><td colspan="5" class="text-center" style="color:#ff9f43;"><i class="fa-solid fa-clock"></i> OpenDota API ติดขีดจำกัดความถี่ (Rate Limit) กรุณารอ 10 วินาทีแล้วกดซิงค์ใหม่</td></tr>`;
            return;
        }

        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const matches = await response.json();
        
        if (!matches || !Array.isArray(matches) || matches.length === 0) {
            listBody.innerHTML = `
                <tr><td colspan="5" class="text-center" style="padding: 20px; color: #ff9f43;">
                    <i class="fa-solid fa-eye-slash fa-2x mb-10"></i><br>
                    <strong>ไม่พบแมตช์สาธารณะสำหรับ Steam ID: ${accountId}</strong><br>
                    <small style="color: #c0c9d8;">กรุณาเปิดระบบ <em>"Expose Public Match Data"</em> ในการตั้งค่าเกม Dota 2 (Settings ➔ Social ➔ Expose Public Match Data)</small><br>
                    <a href="https://www.opendota.com/players/${accountId}" target="_blank" class="btn btn-small btn-secondary mt-10" style="display:inline-block;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> ตรวจสอบโปรไฟล์บน OpenDota
                    </a>
                </td></tr>`;
            return;
        }

        // Calculate matches played today (local time)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayStartUnix = Math.floor(todayStart.getTime() / 1000);
        
        const todayMatches = matches.filter(m => m.start_time >= todayStartUnix);
        const completedToday = todayMatches.length;
        
        // Update daily progress in storage
        const dailyProgress = StorageManager.getDailyProgress();
        dailyProgress.completed = completedToday;
        StorageManager.saveDailyProgress(dailyProgress);
        
        // Render matches list (slice back to 8 to avoid cluttering the table layout)
        renderApiMatches(matches.slice(0, 8));
        
        const badge = document.getElementById('connection-badge');
        if (badge) {
            badge.className = 'badge badge-success';
            badge.textContent = 'Active Player Sync';
        }
        
        fetchPlayerName(accountId);
        fetchCoachAnalysis(accountId);
        renderDashboard(); // Re-render target rings
        
    } catch (e) {
        console.error(e);
        listBody.innerHTML = `
            <tr><td colspan="5" class="text-center text-danger" style="padding:16px;">
                <i class="fa-solid fa-triangle-exclamation"></i> เกิดข้อผิดพลาดในการเชื่อมต่อ OpenDota (${e.message})<br>
                <small style="color:#c0c9d8;">หากใช้งานจากเบราว์เซอร์ที่มี AdBlocker/Brave Shield แนะนำให้ลองปิดหรือเปลี่ยนเบราว์เซอร์ดูครับ</small>
            </td></tr>`;
    }
}

async function fetchPlayerName(rawId) {
    const accountId = normalizeSteamId(rawId);
    if (!accountId) return;
    try {
        const response = await fetchWithFallback(`https://api.opendota.com/api/players/${accountId}`);
        if (response.ok) {
            const data = await response.json();
            if (data.profile) {
                document.getElementById('sidebar-player-name').textContent = data.profile.personaname;
                document.getElementById('sidebar-player-rank').textContent = `Rank Tier: ${data.leaderboard_rank ? 'Rank #' + data.leaderboard_rank : 'Estimated Rank'}`;
                
                if (data.profile.avatar) {
                    const avatarContainer = document.querySelector('.avatar-placeholder');
                    if (avatarContainer) {
                        avatarContainer.innerHTML = `<img src="${data.profile.avatar}" style="width: 100%; height: 100%; border-radius: 50%;">`;
                    }
                }
            }
        }
    } catch(e) {}
}

async function fetchCoachAnalysis(steamId) {
    const content = document.getElementById('coach-analysis-content');
    const badge = document.getElementById('coach-analysis-badge');
    if (!content || !badge) return;
    
    badge.className = 'badge badge-primary';
    badge.textContent = 'Analyzing Stats...';

    try {
        const resRecent = await fetch(`https://api.opendota.com/api/players/${steamId}/recentMatches`);
        const resHeroes = await fetch(`https://api.opendota.com/api/players/${steamId}/heroes`);
        
        if (!resRecent.ok || !resHeroes.ok) throw new Error('Failed to fetch analysis stats');
        
        const recentMatches = await resRecent.json();
        const heroStats = await resHeroes.json();
        
        if (recentMatches.length === 0) {
            content.innerHTML = `<p class="text-secondary text-center">ไม่พบข้อมูลแมตช์ประวัติการเล่นล่าสุดของไอดีนี้</p>`;
            return;
        }

        let totalDeaths = 0;
        let totalKills = 0;
        let totalAssists = 0;
        let wins = 0;
        
        recentMatches.forEach(m => {
            totalDeaths += m.deaths;
            totalKills += m.kills;
            totalAssists += m.assists;
            
            const isWin = (m.player_slot < 128 && m.radiant_win) || (m.player_slot >= 128 && !m.radiant_win);
            if (isWin) wins++;
        });
        
        const avgDeaths = (totalDeaths / recentMatches.length).toFixed(1);
        const avgKills = (totalKills / recentMatches.length).toFixed(1);
        const avgAssists = (totalAssists / recentMatches.length).toFixed(1);
        const winrate = ((wins / recentMatches.length) * 100).toFixed(0);
        
        const playedHeroes = heroStats.filter(h => h.games >= 5);
        playedHeroes.sort((a, b) => b.games - a.games); 
        
        const bestHeroes = [];
        const warnHeroes = [];
        
        playedHeroes.forEach(h => {
            const wr = ((h.win / h.games) * 100);
            const heroName = cachedHeroes[h.hero_id] || `Hero ${h.hero_id}`;
            if (wr >= 54 && bestHeroes.length < 2) {
                bestHeroes.push({ name: heroName, wr: wr.toFixed(0), games: h.games });
            } else if (wr < 47 && warnHeroes.length < 2) {
                warnHeroes.push({ name: heroName, wr: wr.toFixed(0), games: h.games });
            }
        });
        
        let redFlagsHtml = '';
        let greenFlagsHtml = '';
        let suggestionsHtml = '';
        
        if (avgDeaths >= 7.0) {
            redFlagsHtml += `<li class="coach-point-item red-flag">คุณตายเฉลี่ย <strong>${avgDeaths} ตัว/เกม</strong> ในแมตช์ล่าสุด แนะนำให้ระวังเรื่องตำแหน่งยืน (Positioning)</li>`;
        }
        if (winrate < 49) {
            redFlagsHtml += `<li class="coach-point-item red-flag">อัตราการชนะช่วงนี้ค่อนข้างต่ำ (<strong>${winrate}%</strong>) ควรจำกัดการเล่นไม่ให้เกินเป้าหมายวัน</li>`;
        }
        warnHeroes.forEach(h => {
            redFlagsHtml += `<li class="coach-point-item red-flag">ควรเลี่ยง <strong>${h.name}</strong> ชั่วคราว (Winrate ${h.wr}% จาก ${h.games} เกม)</li>`;
        });
        
        if (!redFlagsHtml) {
            redFlagsHtml = `<li class="coach-point-item green-flag">ไม่พบจุดบกพร่องที่ร้ายแรงในขณะนี้ ยอดเยี่ยมมาก!</li>`;
        }
        
        if (avgDeaths < 5.5) {
            greenFlagsHtml += `<li class="coach-point-item green-flag">รักษาชีวิตได้ดีเยี่ยม ตายเฉลี่ยเพียง <strong>${avgDeaths} ตัว/เกม</strong></li>`;
        }
        if (winrate >= 51) {
            greenFlagsHtml += `<li class="coach-point-item green-flag">อัตราการชนะช่วงนี้อยู่ในเกณฑ์ที่ดีมาก (<strong>${winrate}%</strong>)</li>`;
        }
        bestHeroes.forEach(h => {
            greenFlagsHtml += `<li class="coach-point-item green-flag">หยิบตัวถนัด <strong>${h.name}</strong> มาเล่นไต่แรงก์หลัก (Winrate ${h.wr}% จาก ${h.games} แมตช์)</li>`;
        });
        
        if (!greenFlagsHtml) {
            greenFlagsHtml = `<li class="coach-point-item info-flag">ยังไม่มีข้อมูลจุดเด่นที่เด่นชัดซิงค์จากประวัติ</li>`;
        }
        
        suggestionsHtml += `<li class="coach-point-item info-flag">KDA สถิติล่าสุดของคุณคือ <strong>${avgKills} / ${avgDeaths} / ${avgAssists}</strong></li>`;
        if (avgDeaths >= 7.0) {
            suggestionsHtml += `<li class="coach-point-item info-flag">แนวทาง: ก่อนกดเริ่มเกมครั้งหน้า ลองหยิบฮีโร่ที่มีสกิลหลบหนีหรือคุมตำแหน่งได้ง่ายขึ้น</li>`;
        } else {
            suggestionsHtml += `<li class="coach-point-item info-flag">แนวทาง: เล่นตามระบบ Checklist สมาธิ และรักษาระดับการเล่นรอบคอบอย่างต่อเนื่อง</li>`;
        }
        
        content.innerHTML = `
            <div class="coach-analysis-grid">
                <div class="coach-analysis-section">
                    <h4 class="crimson-text"><i class="fa-solid fa-triangle-exclamation"></i> จุดควรระวัง / สิ่งที่ต้องปรับ</h4>
                    <ul class="coach-point-list">${redFlagsHtml}</ul>
                </div>
                <div class="coach-analysis-section">
                    <h4 class="green-text"><i class="fa-solid fa-circle-check"></i> ข้อดี / สิ่งที่ทำได้ดีแล้ว</h4>
                    <ul class="coach-point-list">${greenFlagsHtml}</ul>
                </div>
                <div class="coach-analysis-section">
                    <h4 class="cyan-text"><i class="fa-solid fa-circle-info"></i> แนวทางปฏิบัติในการเล่นถัดไป</h4>
                    <ul class="coach-point-list">${suggestionsHtml}</ul>
                </div>
            </div>
        `;
        
        badge.className = 'badge badge-success';
        badge.textContent = 'Analysis Completed';
        
    } catch (e) {
        console.error(e);
        content.innerHTML = `<p class="text-danger text-center">ขออภัย เกิดข้อผิดพลาดในการโหลดข้อมูลเพื่อวิเคราะห์ โปรดตรวจสอบว่าโปรไฟล์ Steam ของคุณเปิดเป็นสาธารณะหรือไม่</p>`;
        badge.className = 'badge badge-error';
        badge.textContent = 'Analysis Failed';
    }
}

function calculateMatchGrade(m, isWin) {
    const kills = m.kills || 0;
    const deaths = m.deaths || 0;
    const assists = m.assists || 0;
    const kdaRatio = (kills + assists) / Math.max(1, deaths);
    
    let score = 50; // Base score
    if (isWin) score += 20;
    score += Math.min(25, Math.round(kdaRatio * 5));
    if (deaths <= 2) score += 10;
    if (deaths >= 8) score -= 15;
    
    score = Math.min(100, Math.max(25, score));

    let grade = 'B';
    let badgeStyle = 'background: rgba(46,134,222,0.2); border: 1px solid #2e86de; color: #54a0ff; font-weight:700;';
    let title = 'Good Performance';

    if (score >= 88 || (kdaRatio >= 4.5 && isWin)) {
        grade = 'S+';
        badgeStyle = 'background: linear-gradient(135deg, rgba(212,175,55,0.3), rgba(230,126,34,0.4)); border: 2px solid #ffd700; color: #ffd700; font-weight: 900; text-shadow: 0 0 6px rgba(255,215,0,0.6);';
        title = '🏆 MVP / Outstanding Game';
    } else if (score >= 78 || kdaRatio >= 3.2) {
        grade = 'S';
        badgeStyle = 'background: rgba(0,210,211,0.2); border: 1px solid #00d2d3; color: #00d2d3; font-weight: 800;';
        title = '⭐ Excellent Game';
    } else if (score >= 68 || kdaRatio >= 2.2) {
        grade = 'A';
        badgeStyle = 'background: rgba(29,209,161,0.2); border: 1px solid #1dd1a1; color: #1dd1a1; font-weight: 700;';
        title = '👍 Solid Performance';
    } else if (score >= 52 || kdaRatio >= 1.2) {
        grade = 'B';
        badgeStyle = 'background: rgba(84,160,255,0.2); border: 1px solid #54a0ff; color: #54a0ff; font-weight: 600;';
        title = '👌 Decent Match';
    } else {
        grade = 'C';
        badgeStyle = 'background: rgba(255,107,107,0.2); border: 1px solid #ff6b6b; color: #ff6b6b; font-weight: 600;';
        title = '⚠️ Needs Improvement';
    }

    return { grade, score, badgeStyle, title, kdaRatio: kdaRatio.toFixed(2), kills, deaths, assists };
}

function showMatchReviewModal(m, heroName, isWin, gradeInfo) {
    const existing = document.getElementById('ai-match-review-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'ai-match-review-modal';
    modal.className = 'modal-overlay';
    modal.style.zIndex = '3500';

    const kdaRatioNum = parseFloat(gradeInfo.kdaRatio);
    const kills = gradeInfo.kills;
    const deaths = gradeInfo.deaths;
    const assists = gradeInfo.assists;

    // Calculate 4 detailed sub-scores (0-100)
    const farmScore = Math.min(100, Math.max(30, Math.round((kills * 3.5 + assists * 2) / Math.max(1, deaths) * 12 + 45)));
    const survivalScore = Math.max(15, Math.min(100, 100 - (deaths * 9)));
    const fightScore = Math.min(100, Math.max(25, (kills + assists) * 4 + (isWin ? 20 : 5)));
    const objectiveScore = Math.min(100, Math.max(30, isWin ? 85 + Math.round(kdaRatioNum * 2) : 40 + Math.round(kdaRatioNum * 2)));

    // Timeline Coaching Feedback (0-10m, 10-25m, 25+m)
    let earlyGameTip = "";
    let midGameTip = "";
    let lateGameTip = "";

    if (deaths <= 1) {
        earlyGameTip = "🟢 <strong>Laning Phase (0-10m):</strong> คุมเลนได้เนียนกริบ ไม่ตายเลย! ควบคุม Creep Equilibrium ได้ดีเยี่ยม";
    } else if (deaths >= 4) {
        earlyGameTip = "🔴 <strong>Laning Phase (0-10m):</strong> ตายช่วงต้นเกมบ่อยเกินไป (${deaths} ครั้ง) ควรพก Tango/Salve คืนเลน และหลีกเลี่ยงการเทรดเลือดเมื่อไร้ครีปสนับสนุน";
    } else {
        earlyGameTip = "🟡 <strong>Laning Phase (0-10m):</strong> ประสิทธิภาพต้นเกมอยู่ในเกณฑ์มาตรฐาน โฟกัสการ Last Hit และการตอดเลือดศัตรูก่อนถึงเวลารูน";
    }

    if (kills + assists >= 12) {
        midGameTip = "🟢 <strong>Mid Game (10-25m):</strong> สร้าง Impact ในไฟต์สูงมาก (${kills + assists} K/A) เดินเกมพร้อมไอเทมชิ้นแรกได้อย่างเฉียบคม";
    } else if (kills + assists < 5) {
        midGameTip = "🔴 <strong>Mid Game (10-25m):</strong> มีส่วนร่วมกับไฟต์น้อยเกินไป พยายามสื่อสารพก Smoke/TP ช่วยเพื่อนเมื่อได้ Power Spike ไอเทมหลัก";
    } else {
        midGameTip = "🟡 <strong>Mid Game (10-25m):</strong> บาลานซ์การฟาร์มและการร่วมไฟต์ได้ดี ควรคุมพื้นที่ป่าศัตรูหลังชนะไฟต์";
    }

    if (isWin) {
        lateGameTip = "🟢 <strong>Late Game (25+m):</strong> ควบคุมจังหวะปิดเกมและขึ้นบ้านศัตรูได้สำเร็จ การคุม Buyback และการเอา Aegis ปิดเกมทำได้สมบูรณ์";
    } else {
        lateGameTip = "🔴 <strong>Late Game (25+m):</strong> พ่ายแพ้ในช่วงปลายเกม — แนะนำให้เก็บเงินสำรอง Buyback ก่อนเข้าไฟต์ใหญ่ และอย่าพึ่งขึ้น High Ground โดยไม่มี Aegis หรือครีปดันลึก";
    }

    // Award bonus XP for reviewing match
    const xpReward = gradeInfo.grade === 'S+' ? 50 : (gradeInfo.grade === 'S' ? 35 : 20);
    StorageManager.gainXp(xpReward);

    modal.innerHTML = `
        <div class="modal-content card" style="max-width:680px; border:2px solid ${gradeInfo.grade === 'S+' ? '#ffd700' : 'var(--cyan)'}; border-radius:12px; box-shadow: 0 0 35px rgba(0,0,0,0.85); max-height:90vh; overflow-y:auto;">
            <div class="card-header" style="background: linear-gradient(135deg, rgba(0,210,255,0.15), rgba(15,16,21,0.95)); justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:18px;"><i class="fa-solid fa-chart-pie cyan-text"></i> AI Match Performance Deep Review</h3>
                <button class="btn-close" id="btn-close-match-review">&times;</button>
            </div>
            <div class="card-body" style="padding:22px;">
                
                <!-- Grade Summary Badge -->
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:16px; border-radius:10px; margin-bottom:20px; flex-wrap:wrap; gap:16px;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <div style="width:75px; height:75px; border-radius:50%; display:flex; flex-direction:column; justify-content:center; align-items:center; ${gradeInfo.badgeStyle}">
                            <span style="font-size:28px; line-height:1; font-weight:900;">${gradeInfo.grade}</span>
                            <span style="font-size:9px; opacity:0.9;">GRADE</span>
                        </div>
                        <div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <h3 style="margin:0; color:#fff; font-size:20px;">${heroName}</h3>
                                <span class="badge ${isWin ? 'badge-success' : 'badge-error'}" style="font-size:12px;">${isWin ? 'WIN' : 'LOSE'}</span>
                            </div>
                            <p style="margin:4px 0 0; font-size:13px; color:#c0c9d8;">คะแนนประสิทธิภาพ: <strong>${gradeInfo.score} / 100</strong> (${gradeInfo.title})</p>
                            <p style="margin:2px 0 0; font-size:12px; color:#d4af37;">KDA: <strong>${kills} / ${deaths} / ${assists}</strong> (Ratio: ${gradeInfo.kdaRatio})</p>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:11px; color:#8e95a5;">Match ID: ${m.match_id}</span>
                        <div style="margin-top:6px;">
                            <a href="https://www.dotabuff.com/matches/${m.match_id}" target="_blank" class="btn btn-small btn-secondary">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Dotabuff
                            </a>
                        </div>
                    </div>
                </div>

                <!-- 4 Performance Metric Bars -->
                <h4 style="margin:0 0 12px; color:#00d2d3;"><i class="fa-solid fa-sliders"></i> 📊 ดัชนีประเมินความสามารถ 4 ด้าน (Performance Breakdown):</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:20px;">
                    <div style="background:var(--bg-card-hover); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <span>🌾 ประสิทธิภาพการฟาร์ม (Farm)</span>
                            <strong class="cyan-text">${farmScore}%</strong>
                        </div>
                        <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                            <div style="width:${farmScore}%; height:100%; background:var(--cyan);"></div>
                        </div>
                    </div>

                    <div style="background:var(--bg-card-hover); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <span>🛡️ การเอาชีวิตรอด (Survival)</span>
                            <strong class="green-text">${survivalScore}%</strong>
                        </div>
                        <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                            <div style="width:${survivalScore}%; height:100%; background:var(--green);"></div>
                        </div>
                    </div>

                    <div style="background:var(--bg-card-hover); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <span>⚔️ การมีส่วนร่วมไฟต์ (Fight Impact)</span>
                            <strong class="gold-text">${fightScore}%</strong>
                        </div>
                        <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                            <div style="width:${fightScore}%; height:100%; background:var(--gold);"></div>
                        </div>
                    </div>

                    <div style="background:var(--bg-card-hover); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color);">
                        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                            <span>🧠 การคุมวัตถุประสงค์เกม (Objectives)</span>
                            <strong class="crimson-text">${objectiveScore}%</strong>
                        </div>
                        <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                            <div style="width:${objectiveScore}%; height:100%; background:var(--crimson);"></div>
                        </div>
                    </div>
                </div>

                <!-- Timeline Coaching Guidance -->
                <h4 style="margin:0 0 10px; color:#d4af37;"><i class="fa-solid fa-clock-rotate-left"></i> ⏱️ คำแนะนำเจาะลึก 3 ช่วงเวลา (Timeline Coaching):</h4>
                <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px; font-size:12px; text-align:left;">
                    <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:10px 14px; border-radius:6px;">
                        ${earlyGameTip}
                    </div>
                    <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:10px 14px; border-radius:6px;">
                        ${midGameTip}
                    </div>
                    <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:10px 14px; border-radius:6px;">
                        ${lateGameTip}
                    </div>
                </div>

                <div style="background:rgba(212,175,55,0.1); padding:10px; border-radius:6px; border:1px solid rgba(212,175,55,0.3); margin-bottom:16px; font-size:12px; color:#d4af37; text-align:center;">
                    🎉 รับโบนัส <strong>+${xpReward} XP</strong> สำหรับการอ่านวิเคราะห์เจาะลึกกับ AI Coach!
                </div>

                <div style="display:flex; gap:10px; justify-content:center;">
                    <button class="btn btn-primary" id="btn-close-review-modal-inner" style="min-width:140px;">ตกลง (ปิดหน้าต่าง)</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeHandler = () => {
        modal.remove();
        renderDashboard();
    };

    document.getElementById('btn-close-match-review')?.addEventListener('click', closeHandler);
    document.getElementById('btn-close-review-modal-inner')?.addEventListener('click', closeHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeHandler();
    });
}

function renderApiMatches(matches) {
    const listBody = document.getElementById('api-matches-list');
    if (!matches || matches.length === 0) {
        listBody.innerHTML = `<tr><td colspan="5" class="text-center">ไม่พบข้อมูลการเล่นแมตช์สาธารณะ</td></tr>`;
        return;
    }
    
    listBody.innerHTML = '';
    matches.forEach(m => {
        const heroName = cachedHeroes[m.hero_id] || `Hero ID: ${m.hero_id}`;
        const isWin = (m.player_slot < 128 && m.radiant_win) || (m.player_slot >= 128 && !m.radiant_win);
        const resultText = isWin ? '<span class="badge badge-success">Win</span>' : '<span class="badge badge-error">Lose</span>';
        const kda = `${m.kills} / ${m.deaths} / ${m.assists}`;
        const gradeInfo = calculateMatchGrade(m, isWin);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="hero-cell">
                    <div class="hero-mini-avatar" style="background-image: url('${getHeroImageUrl(heroName)}')"></div>
                    <span><strong>${heroName}</strong></span>
                </div>
            </td>
            <td>${resultText}</td>
            <td>${kda}</td>
            <td>
                <button class="btn btn-small btn-secondary btn-review-match" style="padding:4px 10px; border-radius:15px; ${gradeInfo.badgeStyle}">
                    <i class="fa-solid fa-robot"></i> Grade ${gradeInfo.grade}
                </button>
            </td>
            <td>
                <button class="btn btn-small btn-primary btn-fast-log" data-hero="${heroName}" data-result="${isWin?'win':'lose'}" data-kda="${kda}" data-matchid="${m.match_id}">
                    <i class="fa-solid fa-plus"></i> บันทึกข้อผิดพลาด
                </button>
            </td>
            <td>
                <button class="btn btn-small btn-share-match" title="ดาวน์โหลดการ์ดแชร์" style="padding:4px 10px; border-radius:15px; background:linear-gradient(135deg,#a55eea,#8854d0); border:none; color:#fff; cursor:pointer;">
                    <i class="fa-solid fa-camera"></i>
                </button>
            </td>
        `;

        tr.querySelector('.btn-review-match').addEventListener('click', () => {
            showMatchReviewModal(m, heroName, isWin, gradeInfo);
        });

        tr.querySelector('.btn-share-match').addEventListener('click', () => {
            shareMatchCard(m, heroName, isWin, gradeInfo);
        });
        
        listBody.appendChild(tr);
    });

    // Fast log hooks
    document.querySelectorAll('.btn-fast-log').forEach(btn => {
        btn.addEventListener('click', () => {
            const hero = btn.getAttribute('data-hero');
            const result = btn.getAttribute('data-result');
            const kda = btn.getAttribute('data-kda');
            const matchId = btn.getAttribute('data-matchid');
            
            document.getElementById('j-hero').value = hero;
            document.getElementById('j-result').value = result;
            document.getElementById('j-kda').value = kda;
            document.getElementById('j-matchid').value = matchId;
            
            switchTab('journal');
            document.getElementById('journal-form-container').classList.remove('hidden-form');
            document.getElementById('j-notes').focus();
        });
    });
}

// --- Daily Target & Skill Radar Render ---
let mistakeChartObj = null;

function initDailyProgram() {
    const addBtn = document.getElementById('btn-add-game');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            StorageManager.addDailyGame();
            renderDashboard();
        });
    }
    
    const resetBtn = document.getElementById('btn-reset-daily');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if(confirm('ต้องการรีเซ็ตเป้าหมายประจำวันเป็น 0 หรือไม่?')) {
                StorageManager.resetDailyProgress();
                renderDashboard();
            }
        });
    }
}

function renderDashboard() {
    const settings = StorageManager.getSettings();
    const progress = StorageManager.getDailyProgress();
    const stats = StorageManager.getStats();
    
    // Update Sidebar Level Widget
    document.getElementById('sidebar-level').textContent = stats.level;
    document.getElementById('sidebar-xp-ratio').textContent = `${stats.xp}/${stats.requiredXp} XP`;
    const xpPercent = Math.min((stats.xp / stats.requiredXp) * 100, 100);
    document.getElementById('sidebar-xp-bar').style.width = `${xpPercent}%`;
    
    // Progress Ring rendering
    document.getElementById('completed-games').textContent = progress.completed;
    document.getElementById('target-games').textContent = settings.dailyTarget;
    
    const circle = document.getElementById('daily-progress-circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    
    const percentage = Math.min((progress.completed / settings.dailyTarget) * 100, 100);
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    const title = document.getElementById('program-status-title');
    const desc = document.getElementById('program-status-desc');
    if (progress.completed === 0) {
        title.textContent = "ยังไม่ได้เริ่มซ้อมวันนี้";
        desc.textContent = `เป้าหมายวันนี้คือเล่นให้ครบ ${settings.dailyTarget} เกมอย่างประณีตและรอบคอบ`;
    } else if (progress.completed < settings.dailyTarget) {
        title.textContent = `กำลังฝึกซ้อมอยู่ (${progress.completed}/${settings.dailyTarget})`;
        desc.textContent = "เยี่ยม! เล่นแมตช์ต่อไปอย่างระมัดระวัง เพื่อป้องกันการเล่นผิดพลาด";
    } else {
        title.textContent = "ครบตามโปรแกรมเป้าหมายแล้ว!";
        desc.textContent = "คุณทำเป้าหมายสำเร็จแล้ว ควรหลีกเลี่ยงการสุ่มหาห้องเพิ่มเพื่อป้องกันความเหนื่อยล้าสะสม";
    }
    
    renderRadarChart();
    renderMmrTracker();
    initDraftCounterHelper();
    renderAchievements();
}

function renderRadarChart() {
    const counts = StorageManager.getMistakeCounts();
    const rawLabels = ['Positioning', 'Map Awareness', 'Item Build', 'Mechanics/Skills', 'Farming Patterns', 'Tilt/Decision'];
    
    // Map mistakes count to data, default 0
    const data = rawLabels.map(l => counts[l] || 0);
    const sum = data.reduce((a, b) => a + b, 0);
    
    const chartCanvas = document.getElementById('mistakeChart');
    const noDataMsg = document.getElementById('no-chart-data');
    
    if (sum === 0) {
        chartCanvas.style.display = 'none';
        noDataMsg.style.display = 'block';
        return;
    }
    
    chartCanvas.style.display = 'block';
    noDataMsg.style.display = 'none';
    
    if (mistakeChartObj) {
        mistakeChartObj.destroy();
    }
    
    mistakeChartObj = new Chart(chartCanvas, {
        type: 'radar',
        data: {
            labels: ['การยืนตำแหน่ง', 'การดูมินิแมพ', 'ออกไอเทมแก้ทาง', 'ปุ่มสกิล/แมคคานิค', 'ประสิทธิภาพฟาร์ม', 'สติ/การควบคุมตัว'],
            datasets: [{
                label: 'ปริมาณข้อผิดพลาดสะสม',
                data: data,
                backgroundColor: 'rgba(200, 35, 44, 0.25)',
                borderColor: '#c8232c',
                pointBackgroundColor: '#d99f38',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    pointLabels: {
                        color: '#8e95a5',
                        font: { family: 'Inter', size: 10 }
                    },
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// --- Achievements ---
function renderAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container) return;
    
    const list = StorageManager.getAchievements();
    container.innerHTML = '';
    
    list.forEach(a => {
        const div = document.createElement('div');
        div.className = `achievement-badge ${a.unlocked ? 'unlocked' : ''}`;
        div.setAttribute('title', `${a.desc} ${a.unlocked ? '(Unlocked)' : '(Locked)'}`);
        div.innerHTML = `
            <div class="badge-icon">
                <i class="fa-solid ${a.icon}"></i>
            </div>
            <span class="badge-title">${a.title}</span>
        `;
        container.appendChild(div);
    });
}

// --- Journal Events ---
function initJournal() {
    const formContainer = document.getElementById('journal-form-container');
    const form = document.getElementById('journal-form');
    
    const newBtn = document.getElementById('btn-new-journal-entry');
    if (newBtn && form && formContainer) {
        newBtn.addEventListener('click', () => {
            form.reset();
            formContainer.classList.toggle('hidden-form');
        });
    }
    
    const closeBtn = document.getElementById('btn-close-journal-form');
    if (closeBtn && formContainer) {
        closeBtn.addEventListener('click', () => {
            formContainer.classList.add('hidden-form');
        });
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkedList = document.querySelectorAll('input[name="mistakes"]:checked');
        const mistakes = Array.from(checkedList).map(cb => cb.value);
        
        const entry = {
            hero: document.getElementById('j-hero').value,
            result: document.getElementById('j-result').value,
            kda: document.getElementById('j-kda').value,
            matchId: document.getElementById('j-matchid').value,
            mistakes: mistakes,
            notes: document.getElementById('j-notes').value
        };
        
        StorageManager.saveJournalEntry(entry);
        StorageManager.updateMmrFromMatch(entry.result === 'win', entry.hero);
        
        // Increment daily played game count too
        StorageManager.addDailyGame();
        
        formContainer.classList.add('hidden-form');
        form.reset();
        
        renderJournalList();
        renderDashboard();
        });
    }
}

function renderJournalList() {
    const container = document.getElementById('journal-entries-container');
    const entries = StorageManager.getJournalEntries();
    
    if (entries.length === 0) {
        container.innerHTML = `
            <div class="card text-center p-30">
                <i class="fa-solid fa-folder-open" style="font-size: 32px; color: var(--text-secondary); margin-bottom: 10px;"></i>
                <p>ยังไม่มีประวัติการบันทึกแมตช์</p>
                <small class="text-secondary">ใช้ระบบเช็คบันทึกเพื่อประเมินความคืบหน้าของตนเอง</small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    entries.forEach(e => {
        const badgesHtml = e.mistakes.map(m => `<span class="badge badge-error">${m}</span>`).join(' ');
        const resultBadge = e.result === 'win' ? '<span class="badge badge-success">WIN</span>' : '<span class="badge badge-error">LOSE</span>';
        
        const card = document.createElement('div');
        card.className = 'journal-entry-card';
        card.innerHTML = `
            <div class="journal-entry-header">
                <div class="journal-entry-meta">
                    <span class="journal-entry-hero">${e.hero}</span>
                    ${resultBadge}
                    <span class="journal-entry-kda">KDA: ${e.kda}</span>
                </div>
                <div class="journal-entry-meta">
                    <span class="journal-entry-date">${e.date}</span>
                </div>
            </div>
            <div class="journal-entry-body">
                <div class="journal-entry-mistakes">
                    ${badgesHtml}
                </div>
                ${e.notes ? `<div class="journal-entry-notes">${e.notes}</div>` : ''}
            </div>
            <div class="journal-entry-actions">
                ${e.matchId ? `<a href="https://www.dotabuff.com/matches/${e.matchId}" target="_blank" class="btn btn-small btn-secondary mr-10"><i class="fa-solid fa-share"></i> Dotabuff</a>` : ''}
                <button class="btn btn-small btn-secondary btn-delete-journal" data-id="${e.id}">
                    <i class="fa-solid fa-trash"></i> ลบประวัติ
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    document.querySelectorAll('.btn-delete-journal').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('ยืนยันลบประวัติการวิเคราะห์เกมนี้ใช่หรือไม่?')) {
                StorageManager.deleteJournalEntry(id);
                renderJournalList();
                renderDashboard();
            }
        });
    });
}

// --- Hero Pool Options ---
function initHeroPool() {
    const formContainer = document.getElementById('hero-form-container');
    const form = document.getElementById('hero-form');
    
    const addBtn = document.getElementById('btn-add-pool-hero');
    if (addBtn && form && formContainer) {
        addBtn.addEventListener('click', () => {
            form.reset();
            formContainer.classList.toggle('hidden-form');
        });
    }
    
    const closeBtn = document.getElementById('btn-close-hero-form');
    if (closeBtn && formContainer) {
        closeBtn.addEventListener('click', () => {
            formContainer.classList.add('hidden-form');
        });
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const hero = {
                name: document.getElementById('h-name').value,
                role: document.getElementById('h-role').value,
                timing: document.getElementById('h-item-timing').value,
                tips: document.getElementById('h-tips').value
            };
            
            StorageManager.saveHeroPoolHero(hero);
            if (formContainer) formContainer.classList.add('hidden-form');
            form.reset();
            
            renderHeroPool();
            renderDashboard(); // Update level / XP
        });
    }
}

function renderHeroPool() {
    const container = document.getElementById('pool-heroes-container');
    const pool = StorageManager.getHeroPool();
    
    if (pool.length === 0) {
        container.innerHTML = `<div class="card card-span-3 text-center p-30"><p>ไม่มีฮีโร่ในพูลหลักในขณะนี้</p></div>`;
        return;
    }
    
    // List of known meta hero names for glowing aura
    const metaNames = ["Lone Druid", "Shadow Fiend", "Wraith King", "Spectre", "Keeper of the Light", "Ember Spirit", "Doom", "Beastmaster", "Slardar", "Hoodwink", "Omniknight", "Abaddon", "Treant Protector", "Bane", "Juggernaut", "Anti-Mage", "Phantom Assassin", "Pudge", "Invoker", "Axe", "Lion", "Crystal Maiden", "Storm Spirit", "Void Spirit", "Puck", "Drow Ranger"];

    container.innerHTML = '';
    pool.forEach(h => {
        const isMeta = metaNames.some(m => m.toLowerCase() === h.name.toLowerCase());
        const card = document.createElement('div');
        card.className = `hero-card ${isMeta ? 'meta-glow-card' : ''}`;
        card.innerHTML = `
            <div class="hero-card-img-banner" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url('${getHeroImageUrl(h.name)}')"></div>
            <div class="hero-card-header">
                <span class="hero-card-name">${h.name}</span>
                <button class="hero-card-delete" data-id="${h.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="hero-card-role">${h.role}</div>
            <div class="hero-card-timing"><i class="fa-solid fa-clock gold-text"></i> Timing: ${h.timing || '-'}</div>
            <div class="hero-card-tips">${h.tips || ''}</div>
            <div class="hero-card-actions" style="margin-top:10px; display:flex; gap:6px;">
                <button class="btn btn-small btn-primary btn-view-build" data-hero="${h.name}"><i class="fa-solid fa-scroll"></i> ดู Build Guide</button>
                <button class="btn btn-small btn-secondary btn-set-focus" data-hero="${h.name}"><i class="fa-solid fa-bullseye"></i> ตั้งเป้าวันนี้</button>
            </div>
        `;
        container.appendChild(card);
    });
    
    document.querySelectorAll('.hero-card-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('คุณแน่ใจหรือไม่ที่จะลบฮีโร่นี้ออกจากพูล?')) {
                StorageManager.deleteHeroPoolHero(id);
                renderHeroPool();
                renderDashboard();
            }
        });
    });

    document.querySelectorAll('.btn-view-build').forEach(btn => {
        btn.addEventListener('click', () => {
            const heroName = btn.getAttribute('data-hero');
            showHeroBuildModal(heroName);
        });
    });

    document.querySelectorAll('.btn-set-focus').forEach(btn => {
        btn.addEventListener('click', () => {
            const heroName = btn.getAttribute('data-hero');
            setFocusSkillForHero(heroName);
        });
    });
}

// --- Item Build Modal & Hero Explorer ---
let cachedItemConstants = null;
let cachedHeroesFullList = null;

async function getItemConstants() {
    if (cachedItemConstants) return cachedItemConstants;
    const stored = localStorage.getItem('dota2_items_cache');
    if (stored) { cachedItemConstants = JSON.parse(stored); return cachedItemConstants; }
    try {
        const r = await fetch('https://api.opendota.com/api/constants/items');
        if (r.ok) {
            cachedItemConstants = await r.json();
            localStorage.setItem('dota2_items_cache', JSON.stringify(cachedItemConstants));
        }
    } catch(e) { console.warn('Could not fetch item constants', e); }
    return cachedItemConstants || {};
}

async function getHeroesFullList() {
    if (cachedHeroesFullList) return cachedHeroesFullList;
    const stored = localStorage.getItem('dota2_heroes_full_cache');
    if (stored) { cachedHeroesFullList = JSON.parse(stored); return cachedHeroesFullList; }
    try {
        const r = await fetch('https://api.opendota.com/api/heroes');
        if (r.ok) {
            const data = await r.json();
            cachedHeroesFullList = data;
            localStorage.setItem('dota2_heroes_full_cache', JSON.stringify(data));
        }
    } catch(e) { console.warn('Could not fetch heroes list', e); }
    return cachedHeroesFullList || [];
}

function getItemImageUrl(itemKey) {
    if (!itemKey) return '';
    const cleanKey = itemKey.replace(/^item_/, '');
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${cleanKey}.png`;
}

function getIconForItemName(name, itemConsts) {
    if (!name) return '';
    const clean = name.replace(/\(.*?\)/g, '').trim().toLowerCase();

    if (itemConsts) {
        for (let key in itemConsts) {
            const item = itemConsts[key];
            if (item && item.dname && item.dname.toLowerCase() === clean) {
                return getItemImageUrl(key);
            }
        }
    }

    const aliases = {
        'tango': 'tango',
        'quelling blade': 'quelling_blade',
        'slippers of agility': 'slippers',
        'slippers': 'slippers',
        'circlet': 'circlet',
        'mantle': 'mantle',
        'gauntlets': 'gauntlets',
        'iron branch': 'branches',
        'phase boots': 'phase_boots',
        'power treads': 'power_treads',
        'arcane boots': 'arcane_boots',
        'tranquil boots': 'tranquil_boots',
        'boots of travel': 'travel_boots',
        'boots of speed': 'boots',
        'magic wand': 'magic_wand',
        'wraith band': 'wraith_band',
        'bracer': 'bracer',
        'null talisman': 'null_talisman',
        'battle fury': 'bfury',
        'manta style': 'manta',
        'manta': 'manta',
        'bkb': 'black_king_bar',
        'black king bar': 'black_king_bar',
        'butterfly': 'butterfly',
        'abyssal blade': 'abyssal_blade',
        'satanic': 'satanic',
        'skadi': 'skadi',
        'eye of skadi': 'skadi',
        'desolator': 'desolator',
        'armlet': 'armlet',
        'armlet of mordiggian': 'armlet',
        'radiance': 'radiance',
        'blade mail': 'blade_mail',
        'heart': 'heart',
        'heart of tarrasque': 'heart',
        'shiva\'s guard': 'shivas_guard',
        'shivas guard': 'shivas_guard',
        'blink dagger': 'blink',
        'blink': 'blink',
        'aether lens': 'aether_lens',
        'aghanims scepter': 'ultimate_scepter',
        'aghanim\'s scepter': 'ultimate_scepter',
        'aghanims shard': 'aghanims_shard',
        'aghanim\'s shard': 'aghanims_shard',
        'shard': 'aghanims_shard',
        'scythe of vyse': 'sheepstick',
        'hex': 'sheepstick',
        'eul\'s': 'cyclone',
        'eul\'s scepter': 'cyclone',
        'euls': 'cyclone',
        'dagon': 'dagon',
        'force staff': 'force_staff',
        'glimmer cape': 'glimmer_cape',
        'holy locket': 'holy_locket',
        'guardian greaves': 'guardian_greaves',
        'pipe': 'pipe',
        'pipe of insight': 'pipe',
        'crimson guard': 'crimson_guard',
        'helm of the overlord': 'helm_of_the_overlord',
        'gleipnir': 'gleipnir',
        'dragon lance': 'dragon_lance',
        'hurricane pike': 'hurricane_pike',
        'monkey king bar': 'monkey_king_bar',
        'mkb': 'monkey_king_bar',
        'nullifier': 'nullifier',
        'silver edge': 'silver_edge',
        'shadow blade': 'invis_sword',
        'maelstrom': 'maelstrom',
        'mjollnir': 'mjollnir',
        'mage slayer': 'mage_slayer',
        'vanguard': 'vanguard',
        'soul ring': 'soul_ring',
        'clarity': 'clarity',
        'observer ward': 'ward_observer',
        'sentry ward': 'ward_sentry',
        'sentry': 'ward_sentry'
    };

    const key = aliases[clean] || clean.replace(/ /g, '_').replace(/'/g, '');
    return getItemImageUrl(key);
}

function renderItemListWithIcons(itemsArray, itemConsts) {
    if (!itemsArray || !Array.isArray(itemsArray)) return '';
    return itemsArray.map(itemStr => {
        const cleanName = itemStr.replace(/\(.*?\)/g, '').trim();
        const matchNote = itemStr.match(/\(.*?\)/);
        const note = matchNote ? matchNote[0] : '';
        const imgUrl = getIconForItemName(cleanName, itemConsts);

        return `
            <span class="build-item-with-img" title="${cleanName}">
                ${imgUrl ? `<img src="${imgUrl}" alt="${cleanName}" onerror="this.style.display='none'" class="item-icon-img">` : ''}
                <span class="item-name-text">${cleanName}</span>
                ${note ? `<span class="item-timing-badge">${note}</span>` : ''}
            </span>`;
    }).join('');
}

async function fetchLiveItemBuild(heroName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<div style="color:#8e95a5; padding:10px 0;"><i class="fa-solid fa-spinner fa-spin"></i> กำลังดึงข้อมูล Item Popularity จาก OpenDota (Dotabuff Backend)...</div>`;

    try {
        const heroesList = await getHeroesFullList();
        const heroObj = heroesList.find(h =>
            h.localized_name.toLowerCase() === heroName.toLowerCase()
        );
        if (!heroObj) {
            container.innerHTML = `<p style="color:#8e95a5;">ไม่พบข้อมูลฮีโร่ "${heroName}" ใน OpenDota</p>`;
            return;
        }

        const [popRes, itemConsts] = await Promise.all([
            fetch(`https://api.opendota.com/api/heroes/${heroObj.id}/itemPopularity`),
            getItemConstants()
        ]);

        if (!popRes.ok) throw new Error('itemPopularity fetch failed');
        const pop = await popRes.json();

        // Build reverse ID map helper
        const getItemById = (itemId) => {
            const numId = parseInt(itemId);
            for (let key in itemConsts) {
                if (itemConsts[key] && itemConsts[key].id === numId) {
                    return { key, ...itemConsts[key] };
                }
            }
            return null;
        };

        const windows = [
            { key: 'start_game_items',  label: '🛒 Starting (0-3 นาที)',  cls: 'label-start' },
            { key: 'early_game_items',  label: '⚡ Early Game (3-10 นาที)', cls: 'label-early' },
            { key: 'mid_game_items',    label: '⚔️ Mid Game (10-18 นาที)', cls: 'label-core' },
            { key: 'late_game_items',   label: '💎 Late Game (18+ นาที)',  cls: 'label-luxury' }
        ];

        let html = '<div class="build-guide">';
        let hasData = false;

        windows.forEach(w => {
            const bucket = pop[w.key];
            if (!bucket || Object.keys(bucket).length === 0) return;

            const sorted = Object.entries(bucket)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);

            const itemsHtml = sorted.map(([itemId, count]) => {
                const itemObj = getItemById(itemId);
                const itemKey = itemObj ? itemObj.key : itemId;
                const displayName = itemObj ? itemObj.dname : `Item #${itemId}`;
                const imgUrl = getItemImageUrl(itemKey);

                return `
                    <span class="build-item-live" title="${displayName} (ซื้อ ${count.toLocaleString()} ครั้ง)">
                        <img src="${imgUrl}" alt="${displayName}"
                             onerror="this.style.display='none'"
                             style="width:28px;height:20px;object-fit:cover;border-radius:3px;vertical-align:middle;margin-right:4px;">
                        <span>${displayName}</span>
                        <span class="live-count">${count >= 1000 ? (count/1000).toFixed(1) + 'k' : count}</span>
                    </span>`;
            }).join('');

            if (itemsHtml) {
                hasData = true;
                html += `
                    <div class="build-row">
                        <span class="build-label ${w.cls}">${w.label}</span>
                        <div class="build-items" style="flex-wrap:wrap;">${itemsHtml}</div>
                    </div>`;
            }
        });

        html += '</div>';

        if (!hasData) {
            container.innerHTML = `<p style="color:#8e95a5;">ไม่มีข้อมูล Item Popularity สำหรับฮีโร่นี้</p>`;
        } else {
            container.innerHTML = html;
        }

    } catch(e) {
        console.error(e);
        container.innerHTML = `<p style="color:#ff4d55;"><i class="fa-solid fa-triangle-exclamation"></i> ดึงข้อมูล Live ไม่สำเร็จ — ตรวจสอบการเชื่อมต่ออินเตอร์เน็ต</p>`;
    }
}

function generateDefaultHeroBuild(heroName) {
    return {
        role: "Flexible Role / Meta Pick",
        playstyles: [{
            name: "⚔️ Main Ranked Build (Level 1-25 Skill Progression)",
            winCondition: `ฟาร์มไอเทมหลัก คุมเลน และใช้สกิลในจังหวะไฟต์ใหญ่ของ ${heroName} ให้เกิดประโยชน์สูงสุด`,
            skillBuild: [
                "Lv 1: สกิล Q (หลัก)",
                "Lv 2: สกิล W (ช่วยคุมเลน)",
                "Lv 3: สกิล Q (เน้นดาเมจ)",
                "Lv 4: สกิล E (พาสซีฟ)",
                "Lv 5: สกิล Q (เน้นกดดัน)",
                "Lv 6: สกิล R (อัลติเมต 💥)",
                "Lv 7: สกิล Q (Max 4)",
                "Lv 8: สกิล W (Lv 2)",
                "Lv 9: สกิล W (Lv 3)",
                "Lv 10: 🌟 Talent (+HP / Attack Speed)",
                "Lv 11: สกิล W (Max 4)",
                "Lv 12: สกิล R (อัลติเมต Lv 2)",
                "Lv 13: สกิล E (Lv 2)",
                "Lv 14: สกิล E (Lv 3)",
                "Lv 15: 🌟 Talent (+Cooldown / Damage)",
                "Lv 16: สกิล E (Max 4)",
                "Lv 18: สกิล R (อัลติเมต Max 3)",
                "Lv 20: 🌟 Talent (+Special Skill Upgrade)",
                "Lv 25: 🌟 Talent (+Cap Upgrade / Game Changer 💥)"
            ],
            items: {
                starting: ["Tango", "Quelling Blade", "Circlet", "Iron Branch x2"],
                early: ["Power Treads", "Magic Wand", "Wraith Band"],
                core: ["Core Item #1 (นาที 12-15)", "BKB (Black King Bar)", "Aghanim's Shard"],
                luxury: ["Aghanim's Scepter", "Eye of Skadi", "Satanic", "Blink Dagger"],
                situational: ["Linken's Sphere (vs Target Spell)", "Nullifier (vs Save Item)"]
            },
            focusSkills: [
                `การคุมเลน 10 นาทีแรกด้วย ${heroName}`,
                "การจัดตำแหน่งในไฟต์ใหญ่ไม่ให้โดนจับตายก่อน",
                "การซื้อเกิด (Buyback) เมื่อถึงช่วง Late Game"
            ]
        }]
    };
}

async function showHeroBuildModal(heroName) {
    const buildData = HERO_BUILDS[heroName];
    const itemConsts = await getItemConstants();

    const existing = document.getElementById('hero-build-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'hero-build-modal';
    modal.className = 'modal-overlay';
    modal.style.zIndex = '3000';

    let playstyles = [];
    if (buildData) {
        if (buildData.playstyles && Array.isArray(buildData.playstyles)) {
            playstyles = buildData.playstyles;
        } else {
            playstyles = [{
                name: "Main Meta Build",
                role: buildData.role,
                winCondition: buildData.winCondition,
                skillBuild: buildData.skillBuild,
                items: buildData.items,
                focusSkills: buildData.focusSkills
            }];
        }
    } else {
        const fallback = generateDefaultHeroBuild(heroName);
        playstyles = fallback.playstyles;
    }

    const renderBuildContent = (build) => {
        if (!build) return '';
        const itemRow = (label, itemsArr, cls) => `
            <div class="build-row mb-10">
                <span class="build-label ${cls}">${label}</span>
                <div class="build-items" style="flex-wrap:wrap;">${renderItemListWithIcons(itemsArr, itemConsts)}</div>
            </div>`;

        return `
            <!-- Win Condition -->
            <div class="coach-tip-box mb-20" style="background:rgba(212,175,55,0.12); border-left:3px solid #d4af37; padding:12px 16px; border-radius:6px;">
                <strong><i class="fa-solid fa-trophy gold-text"></i> Win Condition (${build.name || 'Meta'}):</strong>
                <p style="margin:6px 0 0;">${build.winCondition}</p>
            </div>

            <!-- Counters & Synergies Info -->
            <div class="grid-layout mb-20" style="grid-template-columns: 1fr 1fr; gap:12px;">
                <div style="background:rgba(200,35,44,0.08); border-left:3px solid var(--crimson); padding:10px 14px; border-radius:6px;">
                    <strong class="crimson-text" style="font-size:13px;"><i class="fa-solid fa-skull"></i> ชนะทาง / แพ้ทาง (Counters):</strong>
                    <p style="margin:4px 0 0; font-size:11px; color:#c0c9d8;">
                        ${DRAFT_COUNTER_DATABASE[heroName] ? DRAFT_COUNTER_DATABASE[heroName].advice : 'ระวังตัว Stun ระยะไกล และตัวมี BKB'}
                    </p>
                </div>
                <div style="background:rgba(0,210,255,0.08); border-left:3px solid var(--cyan); padding:10px 14px; border-radius:6px;">
                    <strong class="cyan-text" style="font-size:13px;"><i class="fa-solid fa-handshake"></i> ตัวเข้าขาดีเยี่ยม (Synergies):</strong>
                    <p style="margin:4px 0 0; font-size:11px; color:#c0c9d8;">
                        เล่นคู่กับตัวมี Stun แบบ AoE หรือตัวช่วยล้างดีบัฟให้ทีม
                    </p>
                </div>
            </div>

            <!-- Static Item Build with Icons -->
            <h4><i class="fa-solid fa-sword crimson-text"></i> Item Build Guide (${build.name || 'Recommended'})</h4>
            <div class="build-guide mb-20">
                ${itemRow('🛒 Starting', build.items.starting, 'label-start')}
                ${itemRow('⚡ Early', build.items.early, 'label-early')}
                ${itemRow('⚔️ Core', build.items.core, 'label-core')}
                ${itemRow('💎 Luxury', build.items.luxury, 'label-luxury')}
                ${build.items.situational ? itemRow('🔄 Situational', build.items.situational, 'label-situational') : ''}
            </div>

            <!-- Skill Build -->
            <h4><i class="fa-solid fa-wand-sparkles gold-text"></i> Skill Build Order</h4>
            <div class="skill-build-strip mb-20">${build.skillBuild.map((s, i) => `<span class="skill-step"><strong>Lv${i+1}:</strong> ${s}</span>`).join('')}</div>

            <!-- Focus Skills -->
            <h4><i class="fa-solid fa-fire crimson-text"></i> สกิลที่ควรฝึกเมื่อเล่นฮีโร่นี้</h4>
            <ul class="focus-tips-list">${build.focusSkills.map(f => `<li class="focus-tip"><i class="fa-solid fa-crosshairs crimson-text"></i> ${f}</li>`).join('')}</ul>
        `;
    };

    let playstyleTabsHtml = '';
    if (playstyles.length > 1) {
        playstyleTabsHtml = `
            <div class="playstyle-tab-container">
                <span style="font-size:12px; color:#8e95a5; align-self:center; margin-right:4px;">สไตล์การเล่น:</span>
                ${playstyles.map((ps, idx) => `
                    <button class="playstyle-tab-btn ${idx === 0 ? 'active' : ''}" data-style-idx="${idx}">
                        ${ps.name}
                    </button>
                `).join('')}
            </div>`;
    }

    modal.innerHTML = `
        <div class="modal-content card" style="max-width:860px; max-height:92vh; overflow-y:auto;">
            <div class="card-header" style="background-image: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.88)), url('${getHeroImageUrl(heroName)}'); background-size:cover; background-position:top center; min-height:80px;">
                <div>
                    <h2 style="margin:0; font-size:24px;">${heroName}</h2>
                    ${buildData ? `<span class="badge badge-primary">${buildData.role || 'Dota 2 Hero'}</span>` : ''}
                    <span class="badge badge-gold" style="margin-left:6px;"><i class="fa-solid fa-circle" style="color:#ff4444;font-size:8px;"></i> Live Dotabuff Data</span>
                </div>
                <button class="btn-close" id="btn-close-build-modal">&times;</button>
            </div>
            <div class="card-body">

                ${playstyleTabsHtml}

                <div id="static-build-view">
                    ${playstyles.length > 0 ? renderBuildContent(playstyles[0]) : ''}
                </div>

                <!-- LIVE Item Popularity from OpenDota (Dotabuff Data) -->
                <div style="margin-top:20px;">
                    <h4 style="margin-bottom:8px;">
                        <i class="fa-solid fa-database" style="color:#ff4444;"></i>
                        Dotabuff / OpenDota Live Ranked Item Popularity
                        <span style="font-size:11px; color:#8e95a5; font-weight:400; margin-left:8px;">สถิติการเลือกซื้อไอเทมใน High MMR Ranked</span>
                    </h4>
                    <div id="live-build-container">
                        <!-- filled by JS -->
                    </div>
                </div>

                <hr style="border-color:rgba(255,255,255,0.07); margin:16px 0;">

                <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;">
                    <a href="https://www.dotabuff.com/heroes/${heroName.toLowerCase().replace(/ /g,'-')}/items" target="_blank" class="btn btn-secondary">
                        <i class="fa-solid fa-chart-bar"></i> ดู Items ใน Dotabuff
                    </a>
                    <a href="https://www.opendota.com/heroes/${heroName.toLowerCase().replace(/ /g,'-')}" target="_blank" class="btn btn-secondary">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> OpenDota
                    </a>
                    ${buildData ? `<button class="btn btn-primary btn-set-focus-from-modal" data-hero="${heroName}"><i class="fa-solid fa-bullseye"></i> ตั้งเป้าฮีโร่นี้วันนี้</button>` : ''}
                </div>
            </div>
        </div>`;

    document.body.appendChild(modal);

    document.getElementById('btn-close-build-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    const focusBtn = modal.querySelector('.btn-set-focus-from-modal');
    if (focusBtn) focusBtn.addEventListener('click', () => { setFocusSkillForHero(heroName); modal.remove(); });

    // Handle Playstyle tab switching
    modal.querySelectorAll('.playstyle-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            modal.querySelectorAll('.playstyle-tab-btn').forEach(b => b.classList.remove('active'));
            tabBtn.classList.add('active');
            const idx = parseInt(tabBtn.getAttribute('data-style-idx'));
            if (playstyles[idx]) {
                document.getElementById('static-build-view').innerHTML = renderBuildContent(playstyles[idx]);
            }
        });
    });

    // Fetch live data after modal is shown
    fetchLiveItemBuild(heroName, 'live-build-container');
}

// --- All Heroes Build Explorer Component ---
function initAllHeroesExplorer() {
    const modal = document.getElementById('all-heroes-modal');
    const openBtn = document.getElementById('btn-open-all-heroes');
    const closeBtn = document.getElementById('btn-close-all-heroes');

    // Modal elements
    const searchInput = document.getElementById('hero-explorer-search');
    const attrGroup = document.getElementById('attr-filter-group');
    const grid = document.getElementById('all-heroes-grid');

    // Tab Page elements
    const tabSearchInput = document.getElementById('tab-explorer-search');
    const tabAttrGroup = document.getElementById('tab-attr-filter-group');
    const tabGrid = document.getElementById('tab-heroes-grid');

    let allHeroes = [];
    let currentAttr = 'all';
    let currentSearch = '';

    async function ensureHeroesLoaded() {
        if (allHeroes.length === 0) {
            if (grid) grid.innerHTML = `<div class="text-center p-30 card-span-3" style="color:#8e95a5;"><i class="fa-solid fa-spinner fa-spin"></i> กำลังโหลดรายชื่อฮีโร่ทั้งหมด 124+ ตัวจาก OpenDota...</div>`;
            if (tabGrid) tabGrid.innerHTML = `<div class="text-center p-30 card-span-3" style="color:#8e95a5;"><i class="fa-solid fa-spinner fa-spin"></i> กำลังโหลดรายชื่อฮีโร่ทั้งหมด 124+ ตัวจาก OpenDota...</div>`;

            allHeroes = await getHeroesFullList();
            allHeroes.sort((a, b) => a.localized_name.localeCompare(b.localized_name));
        }
        renderExplorerGrid();
    }

    // Modal events
    if (openBtn && modal) {
        openBtn.addEventListener('click', async () => {
            modal.classList.remove('hidden-form');
            await ensureHeroesLoaded();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.add('hidden-form'));
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden-form');
        });
    }

    // Tab switch listener (when clicking sidebar 'Hero Explorer (124+)')
    const explorerTabNav = document.querySelector('.nav-item[data-tab="explorer"]');
    if (explorerTabNav) {
        explorerTabNav.addEventListener('click', async () => {
            await ensureHeroesLoaded();
        });
    }

    // Auto load tab grid on page init if user land on tab
    ensureHeroesLoaded();

    // Event listeners for searches
    [searchInput, tabSearchInput].forEach(input => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            renderExplorerGrid();
        });
    });

    // Event listeners for attr filters
    [attrGroup, tabAttrGroup].forEach(group => {
        if (!group) return;
        group.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                [attrGroup, tabAttrGroup].forEach(g => {
                    if (g) g.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                });
                btn.classList.add('active');
                currentAttr = btn.getAttribute('data-attr');
                renderExplorerGrid();
            });
        });
    });

    function renderExplorerGrid() {
        if (!allHeroes || allHeroes.length === 0) return;

        const filtered = allHeroes.filter(h => {
            const matchesSearch = !currentSearch || h.localized_name.toLowerCase().includes(currentSearch);
            let matchesAttr = true;
            if (currentAttr === 'str') matchesAttr = (h.primary_attr === 'str');
            else if (currentAttr === 'agi') matchesAttr = (h.primary_attr === 'agi');
            else if (currentAttr === 'int') matchesAttr = (h.primary_attr === 'int');
            else if (currentAttr === 'all_attr') matchesAttr = (h.primary_attr === 'all');
            return matchesSearch && matchesAttr;
        });

        const renderTarget = (targetGrid) => {
            if (!targetGrid) return;

            if (filtered.length === 0) {
                targetGrid.innerHTML = `<div class="text-center p-30 card-span-3" style="color:#8e95a5;">ไม่พบฮีโร่ที่ตรงกับคำค้นหา "${currentSearch}"</div>`;
                return;
            }

            targetGrid.innerHTML = filtered.map(h => {
                let attrBadge = '';
                if (h.primary_attr === 'str') attrBadge = '<span class="attr-tag str">🔴 STR</span>';
                else if (h.primary_attr === 'agi') attrBadge = '<span class="attr-tag agi">🟢 AGI</span>';
                else if (h.primary_attr === 'int') attrBadge = '<span class="attr-tag int">🔵 INT</span>';
                else attrBadge = '<span class="attr-tag uni">🟣 UNI</span>';

                const imgUrl = getHeroImageUrl(h.localized_name);

                return `
                    <div class="explorer-hero-card" data-hero-name="${h.localized_name}">
                        <div class="explorer-hero-img" style="background-image: url('${imgUrl}')"></div>
                        <div class="explorer-hero-info">
                            <div class="explorer-hero-name">${h.localized_name}</div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                                ${attrBadge}
                                <button class="btn btn-small btn-primary btn-add-explorer-hero" data-name="${h.localized_name}" title="เพิ่มเข้าพูลซ้อมหลัก" style="padding:2px 6px; font-size:10px;">
                                    <i class="fa-solid fa-plus"></i> Pool
                                </button>
                            </div>
                        </div>
                    </div>`;
            }).join('');

            targetGrid.querySelectorAll('.explorer-hero-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-add-explorer-hero')) return;
                    const heroName = card.getAttribute('data-hero-name');
                    showHeroBuildModal(heroName);
                });
            });

            targetGrid.querySelectorAll('.btn-add-explorer-hero').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const heroName = btn.getAttribute('data-name');
                    const buildData = HERO_BUILDS[heroName];
                    const role = buildData ? buildData.role : 'Flex Role';

                    const currentPool = StorageManager.getHeroPool();
                    const exists = currentPool.some(h => h.name.toLowerCase() === heroName.toLowerCase());

                    if (exists) {
                        alert(`มี ${heroName} อยู่ในพูลของคุณแล้ว!`);
                        return;
                    }

                    StorageManager.saveHeroPoolHero({
                        name: heroName,
                        role: role,
                        timing: buildData ? (buildData.items ? buildData.items.core[0] : 'Core items') : 'Key items',
                        tips: buildData ? buildData.winCondition : 'เล่นตามแผนการไฟต์หลัก'
                    });

                    alert(`✅ เพิ่ม ${heroName} ลงในพูลซ้อมหลักของคุณเรียบร้อยแล้ว!`);
                    renderHeroPool();
                    renderDashboard();
                });
            });
        };

        renderTarget(grid);
        renderTarget(tabGrid);
    }
}



// --- Focus Skill of the Day ---
function setFocusSkillForHero(heroName) {
    const build = HERO_BUILDS[heroName];
    let focusSkill, focusDesc;

    if (build && build.focusSkills.length > 0) {
        const idx = new Date().getDate() % build.focusSkills.length;
        const raw = build.focusSkills[idx];
        const parts = raw.split(':');
        focusSkill = parts[0].trim();
        focusDesc = parts.slice(1).join(':').trim();
    } else {
        const idx = new Date().getDate() % FOCUS_SKILLS_POOL.length;
        focusSkill = FOCUS_SKILLS_POOL[idx].skill;
        focusDesc = FOCUS_SKILLS_POOL[idx].desc;
    }

    localStorage.setItem('dota2_focus_skill', JSON.stringify({ hero: heroName, skill: focusSkill, desc: focusDesc, date: new Date().toLocaleDateString('th-TH') }));
    renderFocusSkill();
    alert(`✅ ตั้งเป้าฝึก: "${focusSkill}" กับ ${heroName} วันนี้แล้ว!\n\n${focusDesc}`);
}

function renderFocusSkill() {
    const stored = localStorage.getItem('dota2_focus_skill');
    const el = document.getElementById('focus-skill-widget');
    if (!el) return;

    if (!stored) {
        el.innerHTML = `<p class="text-secondary"><i class="fa-solid fa-circle-info"></i> ยังไม่ได้ตั้งเป้าทักษะวันนี้ — ไปที่ Hero Pool และกด "ตั้งเป้าวันนี้"</p>`;
        return;
    }

    const data = JSON.parse(stored);
    el.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <div class="hero-mini-avatar" style="background-image:url('${getHeroImageUrl(data.hero)}'); flex-shrink:0;"></div>
            <div>
                <div style="font-size:12px; color:#8e95a5;">🎯 Focus ประจำวัน (${data.date})</div>
                <div style="font-size:16px; font-weight:700; color:#d4af37;">${data.skill}</div>
                <div style="font-size:12px; color:#c0c9d8; margin-top:4px;">${data.hero} — ${data.desc}</div>
            </div>
        </div>`;
}



// --- Settings ---
function initSettings() {
    const settings = StorageManager.getSettings();
    
    const steamEl = document.getElementById('settings-steamid');
    const dotaEl = document.getElementById('settings-dotabuff');
    const targetEl = document.getElementById('settings-daily-target');
    const ga4El = document.getElementById('settings-ga4-id');

    if (steamEl) steamEl.value = settings.steamId || '';
    if (dotaEl) dotaEl.value = settings.dotabuffLink || '';
    if (targetEl) targetEl.value = settings.dailyTarget || 3;
    if (ga4El) ga4El.value = settings.ga4Id || '';
    
    if (settings.steamId) {
        fetchPlayerName(settings.steamId);
        const badge = document.getElementById('connection-badge');
        if (badge) {
            badge.className = 'badge badge-success';
            badge.textContent = 'Active Player Sync';
        }
    }

    // Auto-save on input typing (Real-time Cookie & LocalStorage sync)
    const autoSaveHandler = () => {
        const currentSettings = {
            steamId: steamEl ? steamEl.value.trim() : '',
            dotabuffLink: dotaEl ? dotaEl.value.trim() : '',
            dailyTarget: targetEl ? (parseInt(targetEl.value, 10) || 3) : 3,
            ga4Id: ga4El ? ga4El.value.trim() : ''
        };
        StorageManager.saveSettings(currentSettings);
    };

    if (steamEl) steamEl.addEventListener('input', autoSaveHandler);
    if (dotaEl) dotaEl.addEventListener('input', autoSaveHandler);
    if (targetEl) targetEl.addEventListener('input', autoSaveHandler);
    if (ga4El) ga4El.addEventListener('input', autoSaveHandler);
    
    const form = document.getElementById('settings-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newSettings = {
                steamId: steamEl ? steamEl.value.trim() : '',
                dotabuffLink: dotaEl ? dotaEl.value.trim() : '',
                dailyTarget: targetEl ? (parseInt(targetEl.value) || 3) : 3,
                ga4Id: ga4El ? ga4El.value.trim() : ''
            };
            
            StorageManager.saveSettings(newSettings);
            if (typeof trackGAEvent === 'function') {
                trackGAEvent('settings_saved', { has_steam_id: !!newSettings.steamId });
            }
            
            if (newSettings.steamId) {
                fetchPlayerName(newSettings.steamId);
                syncOpenDotaMatches();
            } else {
                const nameEl = document.getElementById('sidebar-player-name');
                const rankEl = document.getElementById('sidebar-player-rank');
                if (nameEl) nameEl.textContent = "Guest Player";
                if (rankEl) rankEl.textContent = "Unlinked Steam ID";
                const ph = document.querySelector('.avatar-placeholder');
                if (ph) ph.innerHTML = `<i class="fa-solid fa-user-ninja"></i>`;
                const badge = document.getElementById('connection-badge');
                if (badge) {
                    badge.className = 'badge badge-error';
                    badge.textContent = 'Not Syncing';
                }
            }
            
            alert('✅ บันทึกข้อมูลเรียบร้อย! ข้อมูลถูกบันทึกทั้ง LocalStorage, Cookies และ IndexedDB');
            switchTab('dashboard');
        });
    }
    
    const syncBtn = document.getElementById('btn-sync-opendota');
    if (syncBtn) syncBtn.addEventListener('click', syncOpenDotaMatches);

    // Export Backup JSON
    const exportBtn = document.getElementById('btn-export-backup');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            StorageManager.exportAllBackup();
        });
    }

    // Import Backup JSON
    const importInput = document.getElementById('input-import-backup');
    if (importInput) {
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (event) => {
                const success = await StorageManager.importAllBackup(event.target.result);
                if (success) {
                    alert('✅ กู้คืนข้อมูลจากไฟล์เรียบร้อยแล้ว!');
                    window.location.reload();
                } else {
                    alert('❌ ไม่สามารถอ่านไฟล์สำรองข้อมูลได้ กรุณาตรวจสอบไฟล์อีกครั้ง');
                }
            };
            reader.readAsText(file);
        });
    }
}

// --- Interactive Game Trainer ---
function initTimerUI() {
    const startStopBtn = document.getElementById('btn-timer-start-stop');
    const pregameBtn = document.getElementById('btn-timer-pregame');
    const resetBtn = document.getElementById('btn-timer-reset');
    const display = document.getElementById('in-game-timer');
    const testAudioBtn = document.getElementById('btn-test-audio');
    const langThCheckbox = document.getElementById('alert-lang-th');
    const syncInput = document.getElementById('timer-sync-input');
    const syncSubmitBtn = document.getElementById('btn-timer-sync-submit');
    
    // Toggle Thai / English speech
    if (langThCheckbox) {
        langThCheckbox.addEventListener('change', (e) => {
            TimingEngine.useThaiVoice = e.target.checked;
        });
    }

    // Audio Test Button
    if (testAudioBtn) {
        testAudioBtn.addEventListener('click', () => {
            TimingEngine.testAudioAlert();
        });
    }

    // Helper to parse "3:45" or "12" into total seconds
    const parseTimeToSeconds = (str) => {
        if (!str) return null;
        const trimmed = str.trim();
        if (trimmed.includes(':')) {
            const parts = trimmed.split(':');
            const m = parseInt(parts[0], 10) || 0;
            const s = parseInt(parts[1], 10) || 0;
            return m * 60 + s;
        }
        const num = parseFloat(trimmed);
        if (!isNaN(num)) return Math.round(num * 60);
        return null;
    };

    // Direct Minute Sync Submit Handler
    const handleDirectSync = () => {
        if (!syncInput) return;
        const totalSecs = parseTimeToSeconds(syncInput.value);
        if (totalSecs !== null) {
            TimingEngine.setTime(totalSecs);
            if (!TimingEngine.isRunning && startStopBtn) {
                startStopBtn.click(); // Auto-start if not already running!
            }
            syncInput.value = '';
        } else {
            alert('กรุณาพิมพ์เวลาในเกมให้ถูกต้อง เช่น 3:45 หรือ 12');
        }
    };

    if (syncSubmitBtn) syncSubmitBtn.addEventListener('click', handleDirectSync);
    if (syncInput) {
        syncInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleDirectSync();
            }
        });
    }

    // Start Pre-Game (-01:00) Button
    if (pregameBtn) {
        pregameBtn.addEventListener('click', () => {
            TimingEngine.setTime(-60);
            if (!TimingEngine.isRunning && startStopBtn) {
                startStopBtn.click();
            }
        });
    }

    // Quick Time Adjustment Buttons (+10s, -10s, +30s, -30s)
    document.querySelectorAll('.btn-adjust-time').forEach(btn => {
        btn.addEventListener('click', () => {
            const secs = parseInt(btn.getAttribute('data-seconds'), 10) || 0;
            TimingEngine.adjustTime(secs);
        });
    });

    // Preset Time Set Buttons (00:00, 02:00, 07:00, etc.)
    document.querySelectorAll('.btn-set-time').forEach(btn => {
        btn.addEventListener('click', () => {
            const secs = parseInt(btn.getAttribute('data-seconds'), 10) || 0;
            TimingEngine.setTime(secs);
        });
    });

    // Toggle Start / Stop
    if (startStopBtn) {
        startStopBtn.addEventListener('click', () => {
            const isRunning = TimingEngine.start(
                (formatted) => {
                    if (display) display.textContent = formatted;
                },
                (adviceList, phaseName) => {
                    const container = document.getElementById('coach-advice-container');
                    if (!container) return;
                    let adviceHtml = `<span class="badge badge-primary coach-phase-badge">${phaseName}</span>`;
                    adviceHtml += `<div class="coach-tip-list">`;
                    adviceList.forEach(tip => {
                        adviceHtml += `<div class="coach-tip-item"><i class="fa-solid fa-lightbulb gold-text"></i> ${tip}</div>`;
                    });
                    adviceHtml += `</div>`;
                    container.innerHTML = adviceHtml;
                }
            );
            
            if (isRunning) {
                startStopBtn.className = 'btn btn-primary btn-large';
                startStopBtn.innerHTML = `<i class="fa-solid fa-pause"></i> หยุดตัวนับเวลา`;
            } else {
                TimingEngine.stop();
                startStopBtn.className = 'btn btn-success btn-large';
                startStopBtn.innerHTML = `<i class="fa-solid fa-play"></i> เริ่มตัวเตือนเวลากลยุทธ์`;
            }
        });
    }
    
    // Reset Button
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            TimingEngine.reset();
            if (display) display.textContent = "00:00";
            if (startStopBtn) {
                startStopBtn.className = 'btn btn-success btn-large';
                startStopBtn.innerHTML = `<i class="fa-solid fa-play"></i> เริ่มตัวเตือนเวลากลยุทธ์`;
            }
        });
    }

    // Keyboard Hotkeys (Active when not typing in text inputs)
    window.addEventListener('keydown', (e) => {
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab || activeTab.id !== 'timings') return; // Only activate in Live Companion tab
        
        const tagName = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') return;

        if (e.code === 'Space') {
            e.preventDefault();
            if (startStopBtn) startStopBtn.click();
        } else if (e.code === 'ArrowRight') {
            e.preventDefault();
            TimingEngine.adjustTime(10);
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            TimingEngine.adjustTime(-10);
        } else if (e.code === 'KeyR') {
            e.preventDefault();
            if (resetBtn) resetBtn.click();
        }
    });
}

// --- Meta Hero Recommendations ---
function initMetaHeroes() {
    const selectorButtons = document.querySelectorAll('.meta-role-btn');
    selectorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const role = btn.getAttribute('data-meta-role');
            renderMetaHeroes(role);
        });
    });
    
    // Default load Pos 1
    renderMetaHeroes('Pos 1 (Carry)');
}

function renderMetaHeroes(role) {
    const container = document.getElementById('meta-heroes-container');
    if (!container) return;
    
    const list = META_HERO_RECOMMENDATIONS[role] || [];
    container.innerHTML = '';
    
    list.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card meta-glow-card';
        card.innerHTML = `
            <div class="hero-card-img-banner" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url('${getHeroImageUrl(hero.name)}')"></div>
            <div class="hero-card-header">
                <span class="hero-card-name">${hero.name}</span>
                <div style="display:flex; gap:4px;">
                    <button class="btn btn-small btn-secondary btn-view-meta-build" data-name="${hero.name}" title="ดู Build Guide">
                        <i class="fa-solid fa-scroll"></i>
                    </button>
                    <button class="btn btn-small btn-primary btn-add-meta-hero" data-name="${hero.name}" data-role="${role}" data-timing="${hero.timing}" data-tips="${hero.tips}">
                        <i class="fa-solid fa-plus"></i> เพิ่มเข้าพูล
                    </button>
                </div>
            </div>
            <div class="hero-card-role">${role}</div>
            <div class="hero-card-timing"><i class="fa-solid fa-clock gold-text"></i> Timing: ${hero.timing}</div>
            <div class="hero-card-tips">${hero.tips}</div>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll('.btn-view-meta-build').forEach(btn => {
        btn.addEventListener('click', () => {
            const heroName = btn.getAttribute('data-name');
            showHeroBuildModal(heroName);
        });
    });
    
    // Bind click events
    container.querySelectorAll('.btn-add-meta-hero').forEach(btn => {
        btn.addEventListener('click', () => {
            const newHero = {
                name: btn.getAttribute('data-name'),
                role: btn.getAttribute('data-role'),
                timing: btn.getAttribute('data-timing'),
                tips: btn.getAttribute('data-tips')
            };
            
            // Avoid duplicates
            const currentPool = StorageManager.getHeroPool();
            const exists = currentPool.some(h => h.name.toLowerCase() === newHero.name.toLowerCase() && h.role === newHero.role);
            
            if (exists) {
                alert(`มี ${newHero.name} อยู่ในพูลตำแหน่ง ${newHero.role} ของคุณแล้ว!`);
                return;
            }
            
            StorageManager.saveHeroPoolHero(newHero);
            alert(`เพิ่ม ${newHero.name} ลงในพูลซ้อมหลักของคุณเรียบร้อย! สามารถเลือกซ้อมได้เลยในการเช็คลิสต์ก่อนหาห้อง`);
            
            renderHeroPool();
            renderDashboard();
        });
    });
}

// --- MMR Rank Tracker Chart & Draft Counter Helper ---
const DRAFT_COUNTER_DATABASE = {
    "Phantom Assassin": {
        counterItems: ["Monkey King Bar (MKB)", "Solar Crest", "Blade Mail", "Ghost Scepter"],
        counterHeroes: ["Slardar", "Razor", "Lion", "Axe", "Tinker"],
        advice: "PA มี Evasion หลบกายภาพสูงมาก ออก MKB ยิงทะลวง Blur และใช้ Ghost Scepter หนีเมื่อ PA Blink ชาร์จใส่"
    },
    "Anti-Mage": {
        counterItems: ["Orchid Malevolence", "Scythe of Vyse (Hex)", "Diffusal Blade", "Disruptor Glimpse"],
        counterHeroes: ["Disruptor", "Legion Commander", "Slardar", "Meepo", "Bloodseeker"],
        advice: "AM ชนะทางตัวมาน่าเยอะ แต่แพ้การ Silence และ Hex แบบ instant ล็อคตัวก่อน Blink หนี"
    },
    "Shadow Fiend": {
        counterItems: ["Eul's Scepter", "Blink Dagger", "Blade Mail", "Pipe of Insight"],
        counterHeroes: ["Storm Spirit", "Clockwerk", "Pudge", "Spirit Breaker"],
        advice: "SF ตัวบางและไม่มีสกิลหนี ใช้ตัวโฉบจากระยะไกลเข้าประชิด หรือใช้ Blade Mail สะท้อน Requiem"
    },
    "Juggernaut": {
        counterItems: ["Ghost Scepter", "Eul's Scepter", "Blink Dagger", "Wind Waker"],
        counterHeroes: ["Axe", "Slardar", "Omniknight", "Outworld Destroyer"],
        advice: "เมื่อ Jugg กด Omnislash ให้กด Ghost Scepter หรือ Eul's ยกตัวเองขึ้นฟ้าทันที Omnislash จะไร้ผล"
    },
    "Necrophos": {
        counterItems: ["Nullifier", "Diffusal Blade", "Pipe of Insight", "Mage Slayer"],
        counterHeroes: ["Ancient Apparition", "Doom", "Drow Ranger", "Viper"],
        advice: "Necrophos พึ่งพา Ghost Shroud และการฮีลหนัก — กด Nullifier ลบ Ghost Shroud ออกจากตัวศัตรูทันที"
    },
    "Bristleback": {
        counterItems: ["Silver Edge", "Spirit Vessel", "Solar Crest", "Hex"],
        counterHeroes: ["Viper", "Legion Commander", "Slardar", "Necrophos"],
        advice: "Bristleback ลดดาเมจจากด้านหลัง ให้ใช้ Silver Edge โจมตีเปิด Break Passive ทันที"
    },
    "Storm Spirit": {
        counterItems: ["Orchid Malevolence", "Scythe of Vyse", "Rod of Atos", "BKB"],
        counterHeroes: ["Disruptor", "Silencer", "Doom", "Anti-Mage", "Night Stalker"],
        advice: "Storm บินหนีได้ตลอดเวลา ต้องใช้ Instant Silence/Stun หรือ Hex จับก่อนเปิด Ball Lightning"
    },
    "Slardar": {
        counterItems: ["Lotus Orb", "Eul's Scepter", "Heaven's Halberd", "Force Staff"],
        counterHeroes: ["Troll Warlord", "Razor", "Underlord", "Viper"],
        advice: "Corrosive Haze ลดเกราะหนัก — ใช้ Lotus Orb หรือ Eul's ลบ Haze ออกจากตัว หรือ Halberd ตัดการตี"
    },
    "Sniper": {
        counterItems: ["Blink Dagger", "Shadow Blade", "Force Staff", "Blade Mail"],
        counterHeroes: ["Storm Spirit", "Clockwerk", "Spectre", "Spirit Breaker", "Pudge"],
        advice: "Sniper ยิงไกลแต่เคลื่อนที่ช้าและตัวบาง — ใช้ Blink/Invis อ้อมเข้าประชิดแนวหลังทันที"
    },
    "Invoker": {
        counterItems: ["Black King Bar (BKB)", "Pipe of Insight", "Orchid Malevolence", "Mage Slayer"],
        counterHeroes: ["Pugna", "Night Stalker", "Anti-Mage", "Doom"],
        advice: "Invoker ทำดาเมจเวทหนักเป็นคอมโบ — BKB และ Pipe จะทำให้สกิลคอมโบทั้งหมดแทบไร้ผล"
    }
};

let mmrChartObj = null;

function renderMmrTracker() {
    const data = StorageManager.getMmrData();
    const info = StorageManager.getRankTierInfo(data.currentMmr);

    const numEl = document.getElementById('current-mmr-num');
    const tierEl = document.getElementById('current-rank-tier');
    if (numEl) numEl.textContent = data.currentMmr.toLocaleString();
    if (tierEl) {
        tierEl.textContent = info.name;
        tierEl.style.color = info.color;
    }

    const canvas = document.getElementById('mmr-chart');
    if (!canvas) return;

    const labels = data.history.map(h => h.date);
    const mmrValues = data.history.map(h => h.mmr);

    if (mmrChartObj) {
        mmrChartObj.destroy();
    }

    mmrChartObj = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'MMR Progression',
                data: mmrValues,
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#ff4d55',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { ticks: { color: '#8e95a5', font: { size: 10 } }, grid: { display: false } },
                y: { ticks: { color: '#8e95a5', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

function initDraftCounterHelper() {
    const select = document.getElementById('draft-enemy-select');
    const resultBox = document.getElementById('draft-counter-result');
    const manualBtn = document.getElementById('btn-update-mmr-manual');
    const manualInput = document.getElementById('manual-mmr-input');

    if (manualBtn && manualInput) {
        manualBtn.onclick = () => {
            const val = parseInt(manualInput.value);
            if (!val || val < 0) return alert('กรุณาใส่ตัวเลข MMR ที่ถูกต้อง');
            const data = StorageManager.getMmrData();
            data.currentMmr = val;
            data.history.push({
                date: new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }),
                mmr: val,
                change: 0,
                hero: 'Manual'
            });
            StorageManager.saveMmrData(data);
            manualInput.value = '';
            renderMmrTracker();
            alert(`✅ อัปเดต MMR เป็น ${val.toLocaleString()} เรียบร้อย!`);
        };
    }

    if (!select || !resultBox) return;

    const heroKeys = Object.keys(DRAFT_COUNTER_DATABASE);
    select.innerHTML = `<option value="">-- เลือกฮีโร่ศัตรูที่ต้องการ Counter --</option>` +
        heroKeys.map(k => `<option value="${k}">${k}</option>`).join('');

    select.onchange = () => {
        const selected = select.value;
        const info = DRAFT_COUNTER_DATABASE[selected];
        if (!info) {
            resultBox.innerHTML = `<p style="color:#8e95a5; text-align:center;"><i class="fa-solid fa-crosshairs"></i> เลือกฮีโร่ศัตรูเพื่อดูคำแนะนำการออกไอเทมแก้ทาง</p>`;
            return;
        }

        const itemsHtml = info.counterItems.map(i => {
            const imgUrl = getIconForItemName(i, cachedItemConstants);
            return `
                <span class="build-item-with-img" style="margin:2px;">
                    ${imgUrl ? `<img src="${imgUrl}" class="item-icon-img">` : ''}
                    <span>${i}</span>
                </span>`;
        }).join(' ');

        const heroesHtml = info.counterHeroes.map(h => `
            <span class="badge badge-primary" style="margin:2px;">
                <img src="${getHeroImageUrl(h)}" style="width:16px;height:12px;object-fit:cover;vertical-align:middle;margin-right:4px;border-radius:2px;">
                ${h}
            </span>`).join(' ');

        resultBox.innerHTML = `
            <div style="background:rgba(200,35,44,0.08); border-left:3px solid var(--crimson); padding:10px; border-radius:6px; margin-bottom:10px;">
                <strong class="crimson-text">🛡️ ไอเทมแนะนำแก้ทาง (${selected}):</strong>
                <div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:4px;">${itemsHtml}</div>
            </div>
            <div style="background:rgba(0,210,255,0.08); border-left:3px solid var(--cyan); padding:10px; border-radius:6px; margin-bottom:10px;">
                <strong class="cyan-text">⚔️ ฮีโร่ที่ Counter ศัตรูตัวนี้ได้ดี:</strong>
                <div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:4px;">${heroesHtml}</div>
            </div>
            <p style="color:#c0c9d8; font-size:11px; margin:0;"><i class="fa-solid fa-lightbulb gold-text"></i> <strong>คำแนะนำกลยุทธ์:</strong> ${info.advice}</p>
        `;
    };
}

// --- Meta Tier List Component (Patch 7.41e) ---
const PATCH_TIERLIST_DATABASE = {
    "Pos 1 (Carry)": {
        S: [
            { name: "Juggernaut", winrate: "54.2%", winCondition: "Omnislash One-shot ตัวคีย์ + Blade Fury Dodge สกิลเซฟตัว" },
            { name: "Lone Druid", winrate: "55.1%", winCondition: "พฤติกรรมดันป้อมทำลายเลนเร็ว หมีรับดาเมจและดัน 15 นาที" },
            { name: "Shadow Fiend", winrate: "53.8%", winCondition: "ฟาร์มเร็วสะสม Soul ยิงกายภาพหนัก ปิดฉากเกมกลาง" }
        ],
        A: [
            { name: "Anti-Mage", winrate: "51.4%", winCondition: "ฟาร์มไว Blink หนีวิชั่น Mana Void แตกแมพ" },
            { name: "Phantom Assassin", winrate: "52.0%", winCondition: "Coup de Grace Crit ล้วงคิลแนวหลัง" },
            { name: "Spectre", winrate: "51.8%", winCondition: "Haunt ล้วงตัวหลังเลทเกม" }
        ],
        B: [
            { name: "Wraith King", winrate: "49.8%", winCondition: "เกิดใหม่ค้ำไฟต์ ดันครีปสแตก" },
            { name: "Drow Ranger", winrate: "50.1%", winCondition: "ยืนระยะยิงไกล Gust ปิดสกิล" }
        ]
    },
    "Pos 2 (Mid)": {
        S: [
            { name: "Invoker", winrate: "54.5%", winCondition: "Cold Snap + EMP + Meteor คอมโบทำลายไฟต์" },
            { name: "Shadow Fiend", winrate: "54.0%", winCondition: "คุมเลนกลางดีเยี่ยม ดัก Requiem One-Shot" },
            { name: "Keeper of the Light", winrate: "53.6%", winCondition: "Illuminate เคลียร์ครีปไว เดินแก๊งคุมแมพ" }
        ],
        A: [
            { name: "Ember Spirit", winrate: "52.3%", winCondition: "คล่องตัวสูง Mage Slayer กันเวท" },
            { name: "Storm Spirit", winrate: "51.9%", winCondition: "Ball Lightning บินโฉบล้วงตัวหลัง" },
            { name: "Puck", winrate: "51.5%", winCondition: "Dream Coil ล็อคหมู่ Phase Shift หลบสกิล" }
        ],
        B: [
            { name: "Void Spirit", winrate: "50.2%", winCondition: "Astral Step พุ่งดิสรัปต์ไฟต์" }
        ]
    },
    "Pos 3 (Offlane)": {
        S: [
            { name: "Axe", winrate: "54.8%", winCondition: "Blink + Call ล็อคกลุ่ม Executed ด้วย Culling Blade" },
            { name: "Slardar", winrate: "53.9%", winCondition: "Corrosive Haze ลดเกราะหนัก วิ่งตบในน้ำ" },
            { name: "Doom", winrate: "53.2%", winCondition: "Doom ปิดตัวหลักศัตรู กินครีปเอาบัฟเกราะ" }
        ],
        A: [
            { name: "Beastmaster", winrate: "52.1%", winCondition: "สัตว์อัญเชิญดันป้อม Roar สกัดตัวคีย์" },
            { name: "Centaur Warrunner", winrate: "51.7%", winCondition: "Stampede เร่งความเร็วทีม Hoof Stun" }
        ],
        B: [
            { name: "Tidehunter", winrate: "50.4%", winCondition: "Ravage เปิดไฟต์กวาดล้างทั้งจอ" }
        ]
    },
    "Pos 4 (Soft Support)": {
        S: [
            { name: "Hoodwink", winrate: "53.7%", winCondition: "Bushwhack ล็อคติดไม้ Sharpshooter ยิงไกลเจาะตัวคีย์" },
            { name: "Pudge", winrate: "53.1%", winCondition: "Hook มุมมืดเปิด 5v4 Dismember ล็อคฆ่า" }
        ],
        A: [
            { name: "Omniknight", winrate: "52.4%", winCondition: "Repel ค้ำ Carry อมตะ ฮีล Purification" },
            { name: "Rubick", winrate: "51.6%", winCondition: "ขโมยสกิลไม้ตายศัตรูสวนกลับ" }
        ],
        B: [
            { name: "Mirana", winrate: "49.9%", winCondition: "Arrow ยิงระยะไกล Invis ทั้งทีม" }
        ]
    },
    "Pos 5 (Hard Support)": {
        S: [
            { name: "Lion", winrate: "54.1%", winCondition: "Hex + Impale ล็อคนาน Finger of Death จู่โจมดับคีย์" },
            { name: "Crystal Maiden", winrate: "53.5%", winCondition: "Arcane Aura เพิ่มมาน่าทีม Freezing Field กวาดไฟต์" }
        ],
        A: [
            { name: "Treant Protector", winrate: "52.2%", winCondition: "ฮีลป้อม Overgrowth คุมไฟต์ใหญ่" },
            { name: "Witch Doctor", winrate: "52.0%", winCondition: "Paralyzing Cask เด้ง Stun Death Ward ยิงล้างไฟต์" }
        ],
        B: [
            { name: "Bane", winrate: "50.3%", winCondition: "Fiend's Grip จับล็อคนาน 5 วิ" }
        ]
    }
};

// ============================================================
// PATCH NOTES & META CHANGELOG (BUFFS & NERFS)
// ============================================================
const PATCH_NOTES_DATABASE = {
    patchVersion: "7.41e",
    buffs: [
        { hero: "Juggernaut", detail: "ความเสียหาย Blade Fury เพิ่มขึ้นจาก 90/115/140/165 เป็น 100/125/150/175 ต่อวินาที, คูลดาวน์ Omnislash ลดลง 10 วินาทีทุกระดับ" },
        { hero: "Shadow Fiend", detail: "ความเร็วในการโจมตีเพิ่มขึ้น +5 Base Attack Speed, รัศมี Requiem of Souls กว้างขึ้น +50" },
        { hero: "Viper", detail: "ความเสียหายต่อวินาทีของ Poison Attack เพิ่มขึ้น +4, ดาเมจ Nethertoxin เพิ่มขึ้น 10%" },
        { hero: "Hoodwink", detail: "ระยะยิง Sharpshooter ไกลขึ้น +100, Bushwhack รัศมีกว้างขึ้น +25" },
        { hero: "Abaddon", detail: "ระยะฮีล/ดาเมจ Mist Coil เพิ่มขึ้น +50, ความเร็วเคลื่อนที่ Aphotic Shield เพิ่มขึ้น +15" },
        { hero: "Centaur Warrunner", detail: "เกราะพื้นฐานเพิ่มขึ้น +1, ดาเมจ Hoof Stump เพิ่มขึ้น 20 ทุกระดับ" }
    ],
    nerfs: [
        { hero: "Lone Druid", detail: "พลังชีวิตของ Spirit Bear ลดลง -100 ทุกระดับ, คูลดาวน์ True Form เพิ่มขึ้น +15 วินาที" },
        { hero: "Meepo", detail: "ลดสแตทสเตตัสจาก Divid We Stand ลง 5%, สกิล Dig คูลดาวน์เพิ่มขึ้น +4 วินาที" },
        { hero: "Tinker", detail: "ระยะ Mana Cost สกิล Defense Matrix เพิ่มขึ้น 15 Mana, Rearm ใช้เวลาหมุนเพิ่มขึ้น 0.15 วินาที" },
        { hero: "Nature's Prophet", detail: "ดาเมจจาก Sprout ลดลง 10, คูลดาวน์ Teleportation เลเวล 1 เพิ่มขึ้น +5 วินาที" },
        { hero: "Pangolier", detail: "ระยะเวลา Stun ของ Rolling Thunder ลดลง 0.1 วินาที, Swashbuckle ดาเมจลดลง 5 ต่อครั้ง" }
    ],
    items: [
        { name: "Solar Crest", detail: "ราคาใบสั่งซื้อเพิ่มขึ้น +150 Gold, บัฟเกราะลดลงเหลือ +6 (เดิม +7)" },
        { name: "Mage Slayer", detail: "ลดดาเมจเวทลงเหลือ 35% (เดิม 40%), ดาเมจต่อวินาทีเพิ่มขึ้นเป็น 25" },
        { name: "Gleipnir", detail: "ระยะล็อคขาในพื้นที่ลดลงเหลือ 1.8 วินาที (เดิม 2.0 วินาที)" },
        { name: "Wisdom Rune", detail: "เพิ่มโบนัส EXP พิเศษให้ทีมที่มีเลเวลต่ำสุด +15% เพื่อลดช่องว่างการเสียเปรียบ" }
    ]
};

function initPatchNotes() {
    const buffsContainer = document.getElementById('patchnotes-buffs-container');
    const nerfsContainer = document.getElementById('patchnotes-nerfs-container');
    const itemsContainer = document.getElementById('patchnotes-items-container');

    if (!buffsContainer || !nerfsContainer || !itemsContainer) return;

    buffsContainer.innerHTML = PATCH_NOTES_DATABASE.buffs.map(b => `
        <div style="background:var(--bg-card-hover); border:1px solid rgba(29,209,161,0.2); padding:12px 14px; border-radius:8px; margin-bottom:10px; display:flex; align-items:flex-start; gap:12px;">
            <img src="${getHeroImageUrl(b.hero)}" style="width:44px; height:32px; object-fit:cover; border-radius:4px; border:1px solid #1dd1a1;">
            <div>
                <strong style="color:#1dd1a1; font-size:14px;">🟢 ${b.hero}</strong>
                <p style="margin:4px 0 0; font-size:12px; color:#c0c9d8; line-height:1.5;">${b.detail}</p>
            </div>
        </div>
    `).join('');

    nerfsContainer.innerHTML = PATCH_NOTES_DATABASE.nerfs.map(n => `
        <div style="background:var(--bg-card-hover); border:1px solid rgba(200,35,44,0.2); padding:12px 14px; border-radius:8px; margin-bottom:10px; display:flex; align-items:flex-start; gap:12px;">
            <img src="${getHeroImageUrl(n.hero)}" style="width:44px; height:32px; object-fit:cover; border-radius:4px; border:1px solid #c8232c;">
            <div>
                <strong style="color:#ff6b6b; font-size:14px;">🔴 ${n.hero}</strong>
                <p style="margin:4px 0 0; font-size:12px; color:#c0c9d8; line-height:1.5;">${n.detail}</p>
            </div>
        </div>
    `).join('');

    itemsContainer.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">
            ${PATCH_NOTES_DATABASE.items.map(i => {
                const imgUrl = getIconForItemName(i.name, cachedItemConstants);
                return `
                    <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:12px 14px; border-radius:8px; display:flex; align-items:flex-start; gap:12px;">
                        ${imgUrl ? `<img src="${imgUrl}" style="width:36px; height:36px; border-radius:6px; object-fit:cover; border:1px solid #d4af37;">` : `<i class="fa-solid fa-cube gold-text" style="font-size:24px;"></i>`}
                        <div>
                            <strong style="color:#d4af37; font-size:13px;">💎 ${i.name}</strong>
                            <p style="margin:4px 0 0; font-size:12px; color:#c0c9d8; line-height:1.5;">${i.detail}</p>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

async function syncLiveMetaFromApi() {
    const syncBtn = document.getElementById('btn-sync-live-meta');
    if (syncBtn) {
        syncBtn.disabled = true;
        syncBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังเชื่อมต่อ OpenDota Live Meta...`;
    }

    try {
        const response = await fetch('https://api.opendota.com/api/heroStats');
        if (!response.ok) throw new Error('API fetch failed');
        
        const heroStats = await response.json();
        
        heroStats.forEach(h => {
            const heroName = h.localized_name;
            const proPick = h.pro_pick || 0;
            const proWin = h.pro_win || 0;
            const pubPick = (h['8_pick'] || 0) + (h['7_pick'] || 0) + (h['6_pick'] || 0);
            const pubWin = (h['8_win'] || 0) + (h['7_win'] || 0) + (h['6_win'] || 0);

            const totalPick = proPick + pubPick;
            const totalWin = proWin + pubWin;

            if (heroName && totalPick > 50) {
                const wr = ((totalWin / totalPick) * 100).toFixed(1);
                for (const role in PATCH_TIERLIST_DATABASE) {
                    for (const tier in PATCH_TIERLIST_DATABASE[role]) {
                        PATCH_TIERLIST_DATABASE[role][tier].forEach(item => {
                            if (item.name.toLowerCase() === heroName.toLowerCase()) {
                                item.winrate = `${wr}%`;
                            }
                        });
                    }
                }
            }
        });

        alert('✅ อัปเดตสถิติ Winrate และอันดับเมต้าจาก OpenDota Live API เรียบร้อยแล้ว!');
        const activeRoleBtn = document.querySelector('#tierlist-role-group button.active');
        const role = activeRoleBtn ? activeRoleBtn.getAttribute('data-tier-role') : 'Pos 1 (Carry)';
        const tierlistNav = document.querySelector('.nav-item[data-tab="tierlist"]');
        if (tierlistNav) tierlistNav.click();

    } catch (e) {
        console.error(e);
        alert('⚠️ เกิดข้อผิดพลาดในการเชื่อมต่อ API อัปเดตเมต้าสด ระบบจะใช้อันดับตามแพตช์ 7.41e สำรอง');
    } finally {
        if (syncBtn) {
            syncBtn.disabled = false;
            syncBtn.innerHTML = `<i class="fa-solid fa-rotate"></i> 🔄 อัปเดตเมต้า & Winrate สดอัตโนมัติ`;
        }
    }
}

function initPatchTierList() {
    const roleBtns = document.querySelectorAll('#tierlist-role-group button');
    const container = document.getElementById('tierlist-content-container');
    const liveSyncBtn = document.getElementById('btn-sync-live-meta');

    if (liveSyncBtn) {
        liveSyncBtn.addEventListener('click', syncLiveMetaFromApi);
    }

    if (!container) return;

    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const role = btn.getAttribute('data-tier-role');
            renderTierList(role);
        });
    });

    const tierNavTab = document.querySelector('.nav-item[data-tab="tierlist"]');
    if (tierNavTab) {
        tierNavTab.addEventListener('click', () => renderTierList('Pos 1 (Carry)'));
    }

    renderTierList('Pos 1 (Carry)');

    function renderTierList(role) {
        const data = PATCH_TIERLIST_DATABASE[role] || {};

        const renderTierRow = (tierLabel, heroes, badgeColor, cls) => {
            if (!heroes || heroes.length === 0) return '';

            const cardsHtml = heroes.map(h => `
                <div class="hero-card ${cls === 'tier-s' ? 'meta-glow-card' : ''}" style="margin:0;">
                    <div class="hero-card-img-banner" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url('${getHeroImageUrl(h.name)}')"></div>
                    <div class="hero-card-header">
                        <span class="hero-card-name">${h.name}</span>
                        <span class="badge" style="background:${badgeColor}; color:#fff; font-size:10px; font-weight:700;">Winrate ${h.winrate}</span>
                    </div>
                    <div class="hero-card-tips" style="margin-top:6px; font-size:11px;">${h.winCondition}</div>
                    <div style="display:flex; gap:6px; margin-top:10px;">
                        <button class="btn btn-small btn-primary btn-view-tier-build" data-name="${h.name}" style="flex:1;">
                            <i class="fa-solid fa-scroll"></i> ดู Build
                        </button>
                        <button class="btn btn-small btn-secondary btn-add-tier-pool" data-name="${h.name}" data-role="${role}" title="เพิ่มเข้าพูล">
                            <i class="fa-solid fa-plus"></i> Pool
                        </button>
                    </div>
                </div>`).join('');

            return `
                <div class="card mb-20">
                    <div class="card-header" style="border-bottom:1px solid rgba(255,255,255,0.06); padding:12px 16px;">
                        <h3 style="margin:0; color:${badgeColor}; font-size:16px;">${tierLabel}</h3>
                    </div>
                    <div class="card-body">
                        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:14px;">
                            ${cardsHtml}
                        </div>
                    </div>
                </div>`;
        };

        container.innerHTML = `
            ${renderTierRow('🔥 S-TIER (Overpowered / Top Priority)', data.S, '#ff4d55', 'tier-s')}
            ${renderTierRow('💎 A-TIER (Strong & Reliable Core Picks)', data.A, '#00d2ff', 'tier-a')}
            ${renderTierRow('🛡️ B-TIER (Situational & Counter Picks)', data.B, '#d4af37', 'tier-b')}
        `;

        container.querySelectorAll('.btn-view-tier-build').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                showHeroBuildModal(name);
            });
        });

        container.querySelectorAll('.btn-add-tier-pool').forEach(btn => {
            btn.addEventListener('click', () => {
                const heroName = btn.getAttribute('data-name');
                const heroRole = btn.getAttribute('data-role');
                const buildData = HERO_BUILDS[heroName];

                const currentPool = StorageManager.getHeroPool();
                const exists = currentPool.some(h => h.name.toLowerCase() === heroName.toLowerCase());

                if (exists) {
                    alert(`มี ${heroName} อยู่ในพูลของคุณแล้ว!`);
                    return;
                }

                StorageManager.saveHeroPoolHero({
                    name: heroName,
                    role: heroRole,
                    timing: buildData ? (buildData.items ? buildData.items.core[0] : 'Core items') : 'Key items',
                    tips: buildData ? buildData.winCondition : 'เล่นตามแผนการไฟต์หลัก'
                });

                alert(`✅ เพิ่ม ${heroName} ลงในพูลซ้อมหลักของคุณเรียบร้อยแล้ว!`);
                renderHeroPool();
                renderDashboard();
            });
        });
    }
}

// --- Buy Me a Coffee Modal ---
function initCoffeeModal() {
    const openBtn = document.getElementById('btn-open-coffee-modal');
    const closeBtn = document.getElementById('btn-close-coffee-modal');
    const modal = document.getElementById('coffee-modal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.remove('hidden-form');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden-form');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden-form');
        });
    }
}

// ============================================================
// RANK ROADMAP & MMR MASTERY DATABASE
// ============================================================
const RANK_ROADMAP_DATABASE = {
    "Herald": {
        name: "Herald (0 - 760 MMR)",
        badge: "🟤 Herald",
        goal: "ฝึกฝนการควบคุมยูนิตและ Last Hit ครีปพื้นฐาน ไม่แจกฟรี และเลือกฮีโร่ใกล้มือ 1-2 ตัว",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "เน้นเก็บ Last Hit ครีปเลนให้ได้มากกว่า 45 ตัวใน 10 นาทีแรก",
                    "เมื่อเลนอันตรายหรือป้อมแตก ให้ย้ายไปฟาร์มป่าใกล้บ้านทันที",
                    "ออกไอเทมสปีดฟาร์มชิ้นแรกก่อนเสมอ (เช่น Battle Fury / Maelstrom / Yasha)"
                ],
                traps: [
                    "วิ่งออกไปบวกไฟต์มั่วๆ ตั้งแต่นาทีที่ 5 โดยไม่มีไอเทมหลัก",
                    "ไม่ยอมพก Tango คืนเลนตอนเลือดต่ำ"
                ],
                heroes: ["Sven", "Wraith King", "Juggernaut", "Sniper"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "ฝึกกด Deny ครีปเพื่อตัดเลเวลมิดเลนฝั่งตรงข้าม",
                    "คุมการเก็บรูนนาทีที่ 6:00 เพื่อนำมาแก๊งเลนข้าง",
                    "ออกขวด Bottle และพก Town Portal Scroll ตลอดเวลา"
                ],
                traps: [
                    "ยืนแช่เลนกลางไม่ไปไหนแม้เพื่อนเลนข้างโดนกดดันหนัก",
                    "โดน Stun ใต้ป้อมศัตรูตายฟรี"
                ],
                heroes: ["Viper", "Dragon Knight", "Sniper", "Zeus"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "เลือกตัวแทงค์ถึกทนเปิดไฟต์ หรือตัว Stun วงกว้าง",
                    "กดดันไม่ให้ Pos 1 ศัตรูเก็บ Last Hit ได้สะดวก",
                    "ออกไอเทมถึกทนค้ำไฟต์ เช่น Vanguard, Pipe, Blade Mail"
                ],
                traps: [
                    "ออกไอเทมดาเมจบริสุทธิ์โดยไม่มีเกราะและ BKB",
                    "ยืนดันเลนลึกคนเดียวจนโดนซุ่มยิงตาย"
                ],
                heroes: ["Axe", "Centaur Warrunner", "Bristleback", "Tidehunter"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "ช่วย Pos 3 ตอดเลือดศัตรูในเลนออฟเลน",
                    "ซื้อ Sentry Ward มาปักบล็อกป่าครีปตัวใหญ่ศัตรู",
                    "เดินเก็บรูน Wisdom นาทีที่ 7:00 และ 14:00 ให้ทีม"
                ],
                traps: [
                    "แย่ง Last Hit ครีปของ Pos 3 ในเลน",
                    "ไม่ยอมซื้อ Ward ช่วยทีม"
                ],
                heroes: ["Bounty Hunter", "Ogre Magi", "Hoodwink", "Jakiro"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "ซื้อ Observer & Sentry Wards ปักคุมวิชั่นให้ Pos 1 ฟาร์มปลอดภัย",
                    "ดึงครีป (Pulling) ครีปป่าตัวเล็กเข้าหาครีปเลนเพื่อดึงระยะคลื่นครีป",
                    "พก Healing Salve & Tango เติมเลือดให้แครี่ตลอดเวลา"
                ],
                traps: [
                    "เดินไปโดนศัตรู Stun ตายฟรีนอกวิชั่น",
                    "ปล่อยให้แครี่โดนรุม 2v1 โดยไม่ช่วยโซนศัตรู"
                ],
                heroes: ["Crystal Maiden", "Witch Doctor", "Lion", "Shadow Shaman"]
            }
        },
        mindset: "โฟกัสที่การเก็บบอร์ดเงินและการไม่ตาย เลนชนะง่ายๆ ด้วยการเก็บ Last Hit มากกว่าศัตรู"
    },
    "Guardian": {
        name: "Guardian (770 - 1,530 MMR)",
        badge: "⚪ Guardian",
        goal: "เข้าใจหน้าที่ของสายอาชีพ (Positions 1-5) และรู้จักเวลาเกิดของรูนและบอสในแผนที่",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "ดันคลื่นครีปในเลนเซฟเข้าป้อมศัตรูก่อนสลับไปฟาร์มป่า",
                    "มองมินิแมพทุก 5 วินาที หากฮีโร่ศัตรูหายหน้า ให้ย้ายไปฟาร์มป่าลึก",
                    "ออกไอเทมกันดิสเอเบิล Black King Bar (BKB) ชิ้นที่ 2 หรือ 3 เสมอ"
                ],
                traps: [
                    "ฟาร์มป่าลึกคนเดียวขณะที่ป้อม 3 ฝั่งเรากำลังโดนตี",
                    "ซื้อไอเทมดาเมจล้วนโดยไม่ซื้อ BKB"
                ],
                heroes: ["Juggernaut", "Phantom Assassin", "Sven", "Luna"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "ดันคลื่นครีปเลนกลางให้ไวทุกนาทีเลขคูณ 2 เพื่อไปเก็บรูน",
                    "วาร์ปช่วยเลนข้างทันทีเมื่อศัตรูดันลึกใต้ป้อมเรา",
                    "ออกไอเทมเคลื่อนที่ไว Blink Dagger หรือ Dragon Lance"
                ],
                traps: [
                    "ไม่สื่อสารเมื่อมิดเลนศัตรูเดินหายไปแก๊งเลนอื่น",
                    "ใช้สกิลอัลติเมตใส่ครีป"
                ],
                heroes: ["Shadow Fiend", "Queen of Pain", "Storm Spirit", "Puck"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "พังป้อม 1 ของแครี่ศัตรูให้ได้ก่อนนาทีที่ 12",
                    "คุมพื้นที่ป่าฝั่งศัตรูเพื่อจำกัดพื้นที่ฟาร์มของแครี่ศัตรู",
                    "เป็นตัวเปิดไฟต์หลัก ชี้เป้าหมายให้ทีม"
                ],
                traps: [
                    "ปล่อยให้แครี่ศัตรูฟาร์มสบายโดยไม่เดินไปกวน",
                    "ไม่ซื้อ Blink Dagger สำหรับฮีโร่ตัวเปิด"
                ],
                heroes: ["Axe", "Slardar", "Mars", "Centaur Warrunner"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "ซุ่มวาร์ปไปแก๊งเลนกลางตอนนาทีที่ 4:00 หรือ 6:00",
                    "ปัก Dust / Sentry วาร์ดล่วงหน้าเมื่อสู้กับฮีโร่ล่องหน",
                    "ออกไอเทมช่วยทีม ยูทิลิตี้ เช่น Force Staff หรือ Eul's"
                ],
                traps: [
                    "ยืนนิ่งหลัง Pos 3 โดยไม่ตอดเลือดศัตรู",
                    "เดินแจกฟรีช่วงกลางเกม"
                ],
                heroes: ["Rubick", "Tusk", "Earthshaker", "Mirana"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "ปักวิชั่น Guarding Wards คุมถ้ำ Roshan และเนินสูง",
                    "ยืนตำแหน่งแนวหลังไฟต์เพื่อปล่อยสกิล Stun / ฮีลช่วยทีม",
                    "สละชีวิตเซฟ Pos 1 หากจำเป็นในการปะทะ"
                ],
                traps: [
                    "เดินไปเดินมาโดยไม่มีวัตถุประสงค์",
                    "ปัก Ward ที่เดิมซ้ำๆ จนโดน Deward"
                ],
                heroes: ["Jakiro", "Lich", "Oracle", "Disruptor"]
            }
        },
        mindset: "การสร้างความได้เปรียบเกิดจากการคุมพื้นที่ป้อมและรูน ไม่ใช่การเดินไล่คิลคนเดียว"
    },
    "Crusader": {
        name: "Crusader (1,540 - 2,300 MMR)",
        badge: "🟤 Crusader",
        goal: "การอ่านมินิแมพ (Map Awareness) และการออกไอเทมแก้ทาง (Counter Items)",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "คุม Dead Lane: รู้จักหลีกเลี่ยงเลนอันตรายและดันเฉพาะเลนปลอดภัย",
                    "ออกไอเทมแก้ทางทันที เช่น MKB (แก้ Evasion), Vessel/Skadi (แก้ Regen)",
                    "ร่วมไฟต์เมื่อมีอัลติเมตหรือ BKB พร้อมเท่านั้น"
                ],
                traps: [
                    "ออกไอเทมตามบิลด์เดิมเหมือนกันทุกเกมโดยไม่ดูฮีโร่ศัตรู",
                    "ไฟต์ชนะแล้ววิ่งกลับไปฟาร์มป่าแทนที่จะขึ้นดันป้อม"
                ],
                heroes: ["Phantom Assassin", "Anti-Mage", "Slark", "Ursa"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "สร้าง Map Pressure บังคับให้ศัตรูต้องวาร์ปมากันเลน",
                    "สื่อสารใช้ Smoke of Deceit ร่วมกับซัพพอร์ตเพื่อซุ่มคิลตัวคีย์",
                    "คํานวณ Power Spike ของไอเทมชิ้นแรกแล้วเดินเกมทันที"
                ],
                traps: [
                    "โดน Solo Kill ในเลนกลาง",
                    "ไม่พกคบเพลิง Dust เมื่อศัตรูพก Shadow Blade"
                ],
                heroes: ["Invoker", "Ember Spirit", "Void Spirit", "Templar Assassin"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "ตัดคลื่นครีป (Creep Skipping) เมื่อเลนเสียเปรียบ",
                    "ออก Pipe of Insight / Crimson Guard คุ้มกันทีมในไฟต์ใหญ่",
                    "คุมพื้นที่ถ้ำ Roshan ก่อนเวลาเกิด"
                ],
                traps: [
                    "เปิดไฟต์ในจุดที่ไม่มีวิชั่นของทีม",
                    "ซื้อของดาเมจล้วนแต่ตายใน 2 วินาที"
                ],
                heroes: ["Beastmaster", "Brewmaster", "Viper", "Doom"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "Stack ครีปป่า 2-3 แคมป์ให้ Pos 1 และ Pos 2 ฟาร์ม",
                    "ออกไอเทมแก้ทางเวท Mage Slayer / Spirit Vessel",
                    "คุมวิชั่นเนินสูง High Ground"
                ],
                traps: [
                    "แช่ฟาร์มเอาของตัวเองจนไม่เดินเกมกับทีม",
                    "ซื้อของเลทเกมช้าเกินไป"
                ],
                heroes: ["Hoodwink", "Clockwerk", "Nyx Assassin", "Pugna"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "สื่อสารคอลเวลาเกิดของรูน Wisdom (7m/14m/21m)",
                    "ออก Glimmer Cape / Solar Crest ช่วยคอร์ในไฟต์",
                    "ซื้อ Sentry Ward เคลียร์วิชั่นศัตรูรอบถ้ำ Roshan"
                ],
                traps: [
                    "ยืนใกล้คอร์เกินไปจนโดนสกิลหมู่ตายคู่",
                    "เก็บเงินไม่ซื้อเกิด (Buyback)"
                ],
                heroes: ["Treant Protector", "Shadow Demon", "AA (Ancient Apparition)", "Dazzle"]
            }
        },
        mindset: "ชัยชนะในระดับ Crusader เกิดจากการคุมมินิแมพและการปิดเกมเมื่อชนะไฟต์"
    },
    "Archon": {
        name: "Archon (2,310 - 3,070 MMR)",
        badge: "👑 Archon",
        goal: "การคุมจังหวะไฟต์ (Fight Positioning) และการดึงแผนที่ (Split Push & Space Creation)",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "บริหารเงิน Buyback: เก็บเงินสำรองซื้อเกิดไว้เสมอในนาทีที่ 30+",
                    "ยืนตำแหน่งแนวหลัง รอตัว Stun ศัตรูเปิดก่อนค่อย Blink เข้าตาม",
                    "คุมการดันคลื่นครีป 2 เลนพร้อมกันก่อนขึ้นดันป้อม 3"
                ],
                traps: [
                    "วิ่งไปไฟต์ตามเพื่อนในจุดที่ไม่มีวิชั่น (Bad Fights)",
                    "ตายฟรีเลทเกมเพราะไม่มีเงิน Buyback"
                ],
                heroes: ["Anti-Mage", "Morphling", "Faceless Void", "Sven"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "Shotcall จังหวะบุกป่าศัตรูเมื่อศัตรูเสียสกิลใหญ่",
                    "เลือกเป้าหมายแนวหลัง (Pos 4/5 หรือ Glass Cannon) ในไฟต์ก่อนเสมอ",
                    "ดึงจังหวะ Split Push เมื่อทีมเสียเปรียบ"
                ],
                traps: [
                    "ใช้สกิลใหญ่ใส่ตัวแทงค์ถึกศัตรูแทนที่จะเก็บไว้ใส่ตัวคีย์",
                    "หัวร้อนตามเกมศัตรู"
                ],
                heroes: ["Invoker", "Storm Spirit", "Puck", "Kunkka"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "เป็นผู้นำสั่ง Smoke Gank ยึดพื้นที่ป่าศัตรู",
                    "คํานวณ Buyback สวนกลับเมื่อศัตรูบุกขึ้นบ้าน",
                    "ออก Blink + BKB/Lotus Orb เปิดไฟต์แบบไม่ตายฟรี"
                ],
                traps: [
                    "เปิดไฟต์ขณะที่แครี่ฝั่งเรายังอยู่ไกล",
                    "ไม่ยอมสื่อสารกับซัพพอร์ต"
                ],
                heroes: ["Centaur Warrunner", "Legion Commander", "Slardar", "Axe"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "ควบคุมวิชั่นล่วงหน้า 1 นาทีก่อนไฟต์ Roshan",
                    "ออก Force Staff / Eul's ตัดคอมโบสกิลศัตรู",
                    "ดึงจังหวะให้ศัตรูเสียสกิลฟรี"
                ],
                traps: [
                    "แจกฟรีให้แครี่ศัตรูฟาร์มง่าย",
                    "ไม่พก Dust คืนเลน"
                ],
                heroes: ["Rubick", "Grimstroke", "Earth Spirit", "Mirana"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "ยืนซ่อนในทรีไลน์ (Tree Line) ปล่อยสกิลคุมไฟต์โดยไม่ให้ศัตรูเห็นตัว",
                    "ซื้อ Aghanim Shard ช่วยเพิ่มยูทิลิตี้คุมเกม",
                    "บริหาร Sentry เคลียร์วิชั่นศัตรูแบบ 100%"
                ],
                traps: [
                    "ยืนเปิดหน้าให้ศัตรู Blink มาคิลตัวแรก",
                    "ไม่ยอมเก็บเงิน Buyback เลทเกม"
                ],
                heroes: ["Bane", "Disruptor", "Witch Doctor", "Warlock"]
            }
        },
        mindset: "เล่นตามจังหวะวิชั่นและคุมบอร์ดเกม ห้ามเข้าปะทะหากไม่เห็นตัวคีย์หลักของศัตรูบนแมพ"
    },
    "Legend": {
        name: "Legend (3,080 - 3,840 MMR)",
        badge: "💎 Legend",
        goal: "การอ่านเกมล่วงหน้า (Draft Synergies & Smoke Gank Execution)",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "เล่นตาม Item Power Spikes (เช่น ได้ BKB ปุ๊บ ต้องสั่งคอลทีมเดินไฟต์ทันที)",
                    "การฟาร์มแบบ Triangle Pattern สลับดันคลื่นครีปอย่างปลอดภัย",
                    "การตัดสินใจระหว่างการลุยไฟต์กับการแยกดันบ้าน (Rat Doto)"
                ],
                traps: [
                    "ฟาร์มเพลินหลังได้ Item Power Spike จนเสียโอกาสดันเกม",
                    "ประมาทขึ้น High Ground โดยไม่มี Aegis"
                ],
                heroes: ["Morphling", "Terrorblade", "Naga Siren", "Faceless Void"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "ควบคุม Rune Timings 2m/4m/6m/8m ร่วมกับซัพพอร์ตแบบ 100%",
                    "การดึงจังหวะ Cooldown Spikes ของศัตรูมาสร้างการคิล",
                    "เลือกฮีโร่ที่มี Synergy กับออฟเลนและแครี่"
                ],
                traps: [
                    "ตายเสียจังหวะขณะคุมวิชั่นป่าศัตรู",
                    "ไม่ปรับการออกไอเทมตามสถานการณ์"
                ],
                heroes: ["Puck", "Ember Spirit", "Void Spirit", "Tinker"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "ยึด Dead Lane และเปลี่ยนพื้นที่ป่าศัตรูให้เป็นเขตปลอดภัยของทีมเรา",
                    "ออก Aura Items คุ้มกันทีม 5v5 (Pipe, Crimson, Greaves)",
                    "Shotcall การตี Roshan ครั้งที่ 1 และ 2"
                ],
                traps: [
                    "เข้าไฟต์คนเดียวโดยเพื่อนร่วมทีมไม่พร้อมตาม",
                    "ซื้อของคอร์แต่ไม่ทำหน้าที่แทงค์"
                ],
                heroes: ["Doom", "Beastmaster", "Lycan", "Dawnbreaker"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "เดินคุมวิชั่นรอบถ้ำ Roshan ล่วงหน้า 2 นาที",
                    "ซุ่มเกลียดตัดจังหวะการ Blink ของคอร์ศัตรู",
                    "บริหารเงินซื้อ Sentry Deward คืนทุน"
                ],
                traps: [
                    "ไม่สื่อสารแผนการ Smoke เดินเกมให้ทีมทราบ",
                    "ปล่อยให้ศัตรูซุ่มปัก Ward ฟรี"
                ],
                heroes: ["Batrider", "Tusk", "Nyx Assassin", "Shadow Demon"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "อ่านการเดินของมิดและซัพพอร์ตศัตรูจากมินิแมพใน 3 วินาที",
                    "การวาง Position ในทรีไลน์เพื่อร่ายสกิลใหญ่ไม่ให้โดนขัด",
                    "การคํานวณ Buyback สวนกลับบุกบ้าน"
                ],
                traps: [
                    "โดนจับตัวแรกในไฟต์สำคัญ",
                    "ไม่สื่อสารสั่งเพื่อนถอย"
                ],
                heroes: ["Oracle", "Chen", "Shadow Shaman", "Ancient Apparition"]
            }
        },
        mindset: "การตัดสินใจในระดับ Legend ต้องเกิดจากการคาดการณ์ล่วงหน้า 1-2 นาที"
    },
    "Ancient": {
        name: "Ancient (3,850 - 4,610 MMR)",
        badge: "🛡️ Ancient",
        goal: "การคุมทรัพยากรระดับสูง (Wave Management & Power Spikes)",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "การอ่าน Wave Equilibrium และดันเลนลึกเพื่อบีบให้ศัตรูวาร์ปมากันแล้วตามไปรุมไฟต์ 5v4",
                    "การบริหารพื้นที่และเวลามืออาชีพ ไร้การเดินเสียเวลาเปล่า",
                    "การโฟกัสตัวคีย์หลักในไฟต์ใหญ่แบบไม่เสียสมาธิ"
                ],
                traps: [
                    "โดนดักซุ่มคิลขณะแยกดันเลนลึกโดยไม่มีวิชั่น",
                    "ใช้ BKB เร็วเกินไปในไฟต์"
                ],
                heroes: ["Templar Assassin", "Sven", "Lifestealer", "Medusa"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "การคุมจังหวะ Solo Kills และการตัดพื้นที่ฟาร์มแครี่ศัตรู 100%",
                    "การสร้าง Space และการหลบสกิลสำคัญด้วยปฏิกิริยารวดเร็ว",
                    "การเป็นมิดเลนตัวคุมจังหวะไฟต์หลัก"
                ],
                traps: [
                    "ประมาทโดน Stun คอมโบตายโดยไม่ได้ใช้ BKB",
                    "สื่อสารกับทีมไม่ชัดเจน"
                ],
                heroes: ["Storm Spirit", "Invoker", "Pangolier", "Kunkka"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "การกดดันครีปเลนจนแครี่ศัตรูต้องเข้าป่าตั้งแต่นาทีที่ 6",
                    "การคุมไฟต์ Roshan เอา Aegis ขึ้น High Ground แบบ 100% Winrate Pattern",
                    "การคํานวณ Buyback Counter Push"
                ],
                traps: [
                    "หลุดตำแหน่งไฟต์เปิดโอกาสให้ศัตรูพลิกเกม",
                    "ไม่ยอมออกไอเทมแก้ทาง"
                ],
                heroes: ["Beastmaster", "Enigma", "Tidehunter", "Mars"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "การสร้างความได้เปรียบ 2v1 ในเลนและเดินคุมวิชั่นรวดเร็ว",
                    "การใช้ Skill Cancelling ตัดจังหวะการวาร์ปและ Blink ศัตรู",
                    "การเป็นตัวคอล Smoke Gank ประจำทีม"
                ],
                traps: [
                    "ตายฟรีจากการเดินปักวิชั่นคนเดียวลึกเกินไป",
                    "แจกโกลด์ให้ศัตรูช่วงเลทเกม"
                ],
                heroes: ["Earth Spirit", "Mirana", "Rubick", "Hoodwink"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "การควบคุม Map Vision ระดับท็อป ปัก Ward ในจุดที่ศัตรูคาดไม่ถึง",
                    "การร่ายสกิลเซฟคอร์ในเสี้ยววินาที (Save Execution)",
                    "การบริหารโกลด์ซื้อไอเทมซัพพอร์ตครบชุด"
                ],
                traps: [
                    "ยืนหลุดตำแหน่งให้ศัตรูจับได้เป็นตัวแรก",
                    "สื่อสารเชิงลบเมื่อทีมเสียเปรียบ"
                ],
                heroes: ["Grimstroke", "Shadow Demon", "Disruptor", "Jakiro"]
            }
        },
        mindset: "ใช้ประโยชน์จาก Power Spike และวิชั่นเพื่อบังคับให้ศัตรูต้องเล่นในพื้นที่เสียเปรียบ"
    },
    "Divine": {
        name: "Divine (4,620 - 5,419 MMR)",
        badge: "⚔️ Divine",
        goal: "การเล่นแบบไร้ข้อผิดพลาด (Minimizing Execution Errors & Macro Control)",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "การเล่นระดับไร้ข้อผิดพลาด (Zero Execution Error) ในการ Last Hit และเข้าไฟต์",
                    "การคํานวณ Buyback สวนกลับ High Ground 100%",
                    "การอ่านวิชั่นศัตรูจากพฤติกรรมฮีโร่บนมินิแมพ"
                ],
                traps: ["ประมาทศัตรูช่วงเลทเกมจนโดนสวนกลับ"],
                heroes: ["Morphling", "Lone Druid", "Anti-Mage", "Ursa"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "การคุมเลนและดึงข้อได้เปรียบระดับสูงใน Pick Phase",
                    "การเปิดจังหวะไฟต์ทำลายรูปขบวนศัตรู",
                    "ความแม่นยำในการกดสกิลระดับเฟรม"
                ],
                traps: ["ไม่ปรับแผนเมื่อโดนแก้ทางไอเทม"],
                heroes: ["Meepo", "Tinker", "Invoker", "Ember Spirit"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "การควบคุมแมพ 100% ขังศัตรูไว้แต่ในบ้าน",
                    "การสร้างความกดดันเลนไร้ขีดจำกัด",
                    "การทำลายจังหวะไฟต์ศัตรู"
                ],
                traps: ["เข้าไฟต์เสียจังหวะ"],
                heroes: ["Doom", "Beastmaster", "Centaur Warrunner", "Dark Seer"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "การเป็น Playmaker คุมเกมระดับโลก",
                    "การ Deward อ่านวิชั่นศัตรู 100%",
                    "การช่วยเหลือทุกเลนใน 5 นาทีแรก"
                ],
                traps: ["เดินแจกฟรีช่วงเลทเกม"],
                heroes: ["Batrider", "Earth Spirit", "Tusk", "Nyx Assassin"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "การเป็น Shotcaller หลักของทีม",
                    "การเซฟคอร์จากการโดน One-shot",
                    "การควบคุมจิตใจและสมาธิของทีม"
                ],
                traps: ["ขาดสมาธิในไฟต์สำคัญ"],
                heroes: ["Oracle", "Chen", "Shadow Demon", "Bane"]
            }
        },
        mindset: "รักษาระดับสมาธิและความต่อเนื่อง ไร้ข้อผิดพลาดในการกดปุ่มและอ่านแผนที่"
    },
    "Immortal": {
        name: "Immortal (5,420+ MMR)",
        badge: "🌟 Immortal Top Leaderboard",
        goal: "การเป็นผู้นำทีม อ่านแมตช์การแข่งขันระดับมืออาชีพ และปรับตัวตามแพตช์ทันที",
        roles: {
            "Pos 1 (Carry)": {
                skills: [
                    "ระดับการเล่น Pro Player Level: คุมแมพ คุมจังหวะไฟต์ และปิดเกมไร้ที่ติ",
                    "การสื่อสารสั่งการทีมยึดพื้นที่แมพ 100%",
                    "ความคงเส้นคงวาและจิตใจระดับ Peak Strength"
                ],
                traps: ["ยึดติดกับความคิดตัวเองโดยไม่ฟังทีม"],
                heroes: ["Morphling", "Kez", "Slark", "Juggernaut"]
            },
            "Pos 2 (Mid)": {
                skills: [
                    "การสร้างความได้เปรียบเลนกลางและการคอลไฟต์ชี้ขาด",
                    "การอ่านการเคลื่อนไหวศัตรูล่วงหน้า 3 นาที"
                ],
                traps: ["หัวร้อนกับเพื่อนร่วมทีม"],
                heroes: ["Pangolier", "Puck", "Storm Spirit", "Invoker"]
            },
            "Pos 3 (Offlane)": {
                skills: [
                    "การเป็นออฟเลนยึดแมพและคุมถ้ำ Roshan แบบ 100% Perfection",
                    "การเป็นแทงค์และตัวเปิดไฟต์ระดับท็อป"
                ],
                traps: ["เข้าไฟต์โดยไร้วิชั่น"],
                heroes: ["Beastmaster", "Doom", "Spirit Breaker", "Mars"]
            },
            "Pos 4 (Soft Support)": {
                skills: [
                    "การคุมจังหวะ Smoke Gank และ Deward ทั่วแผนที่",
                    "การปั่นป่วนเลนศัตรูตั้งแต่นาทีแรก"
                ],
                traps: ["ประมาทนอกป้อม"],
                heroes: ["Nature's Prophet", "Tusk", "Hoodwink", "Rubick"]
            },
            "Pos 5 (Hard Support)": {
                skills: [
                    "การเป็น Captain Shotcaller สั่งแผนบุก-ถอย-ตี Roshan",
                    "การคุมวิชั่นและตำแหน่งปลอดภัยในไฟต์ใหญ่"
                ],
                traps: ["สื่อสารไม่ชัดเจน"],
                heroes: ["Chen", "Enchantress", "Grimstroke", "Disruptor"]
            }
        },
        mindset: "ท็อปของตารางตักตวงทุกความผิดพลาดของศัตรูมาเปลี่ยนเป็นชัยชนะ"
    }
};

function initRankGuide() {
    const selectorContainer = document.getElementById('rankguide-tier-selector');
    const contentContainer = document.getElementById('rankguide-content-container');
    const currentTierHeader = document.getElementById('rankguide-current-tier');
    const currentDescHeader = document.getElementById('rankguide-current-desc');
    const roleBtns = document.querySelectorAll('#rankguide-role-selector button');

    if (!selectorContainer || !contentContainer) return;

    const mmrData = StorageManager.getMmrData();
    const currentMmr = mmrData.currentMmr || 2200;
    const currentRankInfo = StorageManager.getRankTierInfo(currentMmr);

    const displayName = currentRankInfo.name || `${currentRankInfo.tier || 'Archon'} 👑`;
    const nextRankText = currentRankInfo.nextRank || 'Rank Up!';

    if (currentTierHeader) currentTierHeader.textContent = `${displayName} (${currentMmr.toLocaleString()} MMR)`;
    if (currentDescHeader) currentDescHeader.textContent = `เป้าหมายถัดไป: ${nextRankText}`;

    const ranks = Object.keys(RANK_ROADMAP_DATABASE);
    let selectedRank = currentRankInfo.tier ? currentRankInfo.tier.split(' ')[0] : 'Archon';
    if (!RANK_ROADMAP_DATABASE[selectedRank]) selectedRank = "Archon";
    let selectedRole = "Pos 1 (Carry)";

    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedRole = btn.getAttribute('data-roadmap-role');
            renderRankDetails(selectedRank, selectedRole);
        });
    });

    const renderSelectorButtons = () => {
        selectorContainer.innerHTML = '';
        ranks.forEach(r => {
            const data = RANK_ROADMAP_DATABASE[r];
            const btn = document.createElement('button');
            const isCurrent = r === selectedRank;
            btn.className = `btn btn-small ${isCurrent ? 'btn-primary' : 'btn-secondary'}`;
            btn.style.fontWeight = '600';
            btn.innerHTML = `${data.badge}`;
            btn.addEventListener('click', () => {
                selectedRank = r;
                renderSelectorButtons();
                renderRankDetails(r, selectedRole);
            });
            selectorContainer.appendChild(btn);
        });
    };

    const renderRankDetails = (rankKey, roleKey) => {
        const data = RANK_ROADMAP_DATABASE[rankKey];
        if (!data) return;

        const roleData = (data.roles && data.roles[roleKey]) ? data.roles[roleKey] : {
            skills: data.skills || [],
            traps: data.traps || [],
            heroes: data.heroes || []
        };

        contentContainer.innerHTML = `
            <div class="grid-layout mb-20">
                <div class="card card-span-2">
                    <div class="card-header" style="background:rgba(212,175,55,0.08); border-bottom:1px solid rgba(212,175,55,0.2); justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                        <h3 style="margin:0;"><i class="fa-solid fa-bullseye gold-text"></i> ${data.name} — ${roleKey} Roadmap</h3>
                        <span class="badge badge-primary" style="font-size:12px;"><i class="fa-solid fa-user-ninja"></i> ${roleKey}</span>
                    </div>
                    <div class="card-body" style="padding:20px;">
                        <div style="background:rgba(0,210,255,0.06); border-left:3px solid var(--cyan); padding:12px 16px; border-radius:6px; margin-bottom:16px;">
                            <strong class="cyan-text"><i class="fa-solid fa-flag"></i> เป้าหมายหลักประจำแร้งก์:</strong>
                            <p style="margin:4px 0 0; color:#fff; font-size:14px;">${data.goal}</p>
                        </div>

                        <h4 style="margin-bottom:10px;"><i class="fa-solid fa-check-double green-text"></i> 3 ทักษะของ ${roleKey} ที่ต้อง Master ในแร้งก์นี้:</h4>
                        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px;">
                            ${roleData.skills.map(s => `
                                <div style="background:var(--bg-card-hover); padding:10px 14px; border-radius:6px; border:1px solid var(--border-color); font-size:13px; display:flex; align-items:center; gap:10px;">
                                    <i class="fa-solid fa-circle-check green-text"></i>
                                    <span>${s}</span>
                                </div>
                            `).join('')}
                        </div>

                        <h4 style="margin-bottom:10px;"><i class="fa-solid fa-triangle-exclamation crimson-text"></i> ข้อผิดพลาดคลาสสิกของ ${roleKey} ที่ทำให้ติดหล่ม:</h4>
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            ${roleData.traps.map(t => `
                                <div style="background:rgba(200,35,44,0.06); padding:10px 14px; border-radius:6px; border-left:2px solid var(--crimson); font-size:13px; display:flex; align-items:center; gap:10px;">
                                    <i class="fa-solid fa-xmark crimson-text"></i>
                                    <span>${t}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3><i class="fa-solid fa-crown gold-text"></i> ฮีโร่ ${roleKey} แนะนำพาไต่ ${rankKey}</h3>
                    </div>
                    <div class="card-body" style="padding:18px;">
                        <p style="font-size:12px; color:#8e95a5; margin-top:0; margin-bottom:12px;">ฮีโร่ตำแหน่ง ${roleKey} ที่ได้เปรียบและพาขึ้นแร้งก์ง่ายที่สุด:</p>
                        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
                            ${roleData.heroes.map(h => `
                                <button class="btn btn-small btn-secondary btn-view-build" data-hero="${h}" style="border-color:rgba(212,175,55,0.4); color:#d4af37;">
                                    <i class="fa-solid fa-scroll"></i> ${h}
                                </button>
                            `).join('')}
                        </div>

                        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:14px; border-radius:8px;">
                            <strong style="color:#d4af37; font-size:13px;"><i class="fa-solid fa-brain"></i> Mindset ประจำแร้งก์:</strong>
                            <p style="margin:6px 0 0; font-size:12px; color:#c0c9d8; line-height:1.5;">${data.mindset}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contentContainer.querySelectorAll('.btn-view-build').forEach(btn => {
            btn.addEventListener('click', () => {
                const heroName = btn.getAttribute('data-hero');
                showHeroBuildModal(heroName);
            });
        });
    };

    renderSelectorButtons();
    renderRankDetails(selectedRank, selectedRole);
}

// ============================================================
// PRO PLAYER SETTINGS & HOTKEY OPTIMIZATION GUIDE
// ============================================================
function initProSettingsGuide() {
    const btn = document.getElementById('btn-open-settings-guide');
    if (btn) {
        btn.addEventListener('click', () => {
            showProSettingsModal();
        });
    }
}

function showProSettingsModal() {
    const existing = document.getElementById('pro-settings-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'pro-settings-modal';
    modal.className = 'modal-overlay';
    modal.style.zIndex = '3200';

    modal.innerHTML = `
        <div class="modal-content card" style="max-width:820px; max-height:90vh; overflow-y:auto; border:2px solid var(--cyan);">
            <div class="card-header" style="background: linear-gradient(135deg, rgba(0,210,255,0.15), rgba(15,16,21,0.95)); justify-content:space-between; align-items:center;">
                <div>
                    <h2 style="margin:0; font-size:22px;"><i class="fa-solid fa-gamepad cyan-text"></i> Pro Player In-Game Settings & Hotkey Optimization Guide</h2>
                    <p class="subtitle" style="margin-top:2px;">คู่มือตั้งค่าตัวเลือกและปุ่มกดในเกม Dota 2 ที่ Pro Player แร้งก์ท็อปใช้เพื่อกดสกิลเร็วขึ้น 0.3 วินาที</p>
                </div>
                <button class="btn-close" id="btn-close-pro-settings">&times;</button>
            </div>
            <div class="card-body" style="padding:24px;">

                <div class="grid-layout mb-20" style="grid-template-columns: 1fr 1fr; gap:16px;">
                    <!-- 1. Quick Cast -->
                    <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:16px; border-radius:8px; border-top:3px solid #00d2d3;">
                        <h4 style="margin-top:0; color:#00d2d3;"><i class="fa-solid fa-bolt"></i> 1. การตั้งค่า Quick Cast (กดสกิลไว 0.3 วิ)</h4>
                        <p style="font-size:12px; color:#c0c9d8; line-height:1.5;">
                            ปกติกดสกิลต้องคลิกเลือกเป้าหมาย 2 ครั้ง (กดปุ่มสกิล ➔ คลิกเมาส์) แต่ถ้าเปิด <strong>Quick Cast On Key Down</strong> สกิลจะพุ่งใส่ตำแหน่งเมาส์ทันทีใน 1 เฟรม!
                        </p>
                        <div style="font-size:11px; background:rgba(0,0,0,0.3); padding:8px; border-radius:5px; color:#8e95a5;">
                            ⚙️ <strong>วิธีตั้งค่าในเกม:</strong> SETTINGS ➔ HOTKEYS ➔ ติ๊ก <code>Enable Quickcast</code> ➔ ตั้งค่าปุ่มสกิล Q/W/E/R เป็น Quickcast
                        </div>
                    </div>

                    <!-- 2. Smart Double Tap Self Cast -->
                    <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:16px; border-radius:8px; border-top:3px solid #ff9f43;">
                        <h4 style="margin-top:0; color:#ff9f43;"><i class="fa-solid fa-hand-holding-hand"></i> 2. Smart Double-Tap Self Cast</h4>
                        <p style="font-size:12px; color:#c0c9d8; line-height:1.5;">
                            ช่วยให้ร่ายสกิลหรือไอเทมใส่ตัวเองได้ทันทีใน 0.1 วินาที โดยไม่ต้องเลื่อนเมาส์กลับมาที่ตัวฮีโร่ (เช่น Force Staff ผลักตัวเอง, Eul's ลอยตัวเอง, Salve ฮีลตัวเอง)
                        </p>
                        <div style="font-size:11px; background:rgba(0,0,0,0.3); padding:8px; border-radius:5px; color:#8e95a5;">
                            ⚙️ <strong>วิธีตั้งค่าในเกม:</strong> SETTINGS ➔ OPTIONS ➔ ติ๊ก <code>Smart Double-Tap</code> (กด Alt + ปุ่มไอเทม)
                        </div>
                    </div>

                    <!-- 3. Minimap Size & High Contrast -->
                    <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:16px; border-radius:8px; border-top:3px solid #1dd1a1;">
                        <h4 style="margin-top:0; color:#1dd1a1;"><i class="fa-solid fa-map-location-dot"></i> 3. Minimap Size +130% & Icons</h4>
                        <p style="font-size:12px; color:#c0c9d8; line-height:1.5;">
                            ขยายขนาดไอคอนบนมินิแมพให้ใหญ่ขึ้น 130% และเปลี่ยนจุดสีเป็นรูปไอคอนหน้าฮีโร่ ช่วยให้อ่านแมพและมองเห็นศัตรูเดินแก๊งได้ง่ายขึ้น 2 เท่า!
                        </p>
                        <div style="font-size:11px; background:rgba(0,0,0,0.3); padding:8px; border-radius:5px; color:#8e95a5;">
                            ⚙️ <strong>วิธีตั้งค่าในเกม:</strong> SETTINGS ➔ OPTIONS ➔ Minimap Icon Size = <code>130%</code> และเปลี่ยนเป็น <code>Hero Icons</code>
                        </div>
                    </div>

                    <!-- 4. Camera Speed & Select Hero -->
                    <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:16px; border-radius:8px; border-top:3px solid #c3a1ff;">
                        <h4 style="margin-top:0; color:#c3a1ff;"><i class="fa-solid fa-camera"></i> 4. Camera Speed & Spacebar Center</h4>
                        <p style="font-size:12px; color:#c0c9d8; line-height:1.5;">
                            ตั้งค่าความเร็วกล้องเลื่อนแมพ (5000-6000) ไม่ให้ไหลหนืด และตั้งค่าปุ่ม Spacebar ให้ดึงมุมกล้องกลับมาศูนย์กลางตัวฮีโร่ทันทีเมื่อกด
                        </p>
                        <div style="font-size:11px; background:rgba(0,0,0,0.3); padding:8px; border-radius:5px; color:#8e95a5;">
                            ⚙️ <strong>วิธีตั้งค่าในเกม:</strong> SETTINGS ➔ HOTKEYS ➔ Select Hero = <code>Spacebar</code>
                        </div>
                    </div>
                </div>

                <!-- Interactive Checklist & XP Reward -->
                <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.3); padding:18px; border-radius:10px;">
                    <h4 style="margin:0 0 10px; color:#d4af37;"><i class="fa-solid fa-square-check"></i> เช็คลิสต์ปรับการตั้งค่าในเกมเพื่อรับ +50 XP โบนัส:</h4>
                    <div style="display:flex; flex-direction:column; gap:8px; font-size:13px;" id="pro-settings-checklist-group">
                        <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                            <input type="checkbox" class="pro-setting-chk">
                            <span>เปิดใช้งาน <strong>Quick Cast</strong> สำหรับสกิลหลักในเกมเรียบร้อยแล้ว</span>
                        </label>
                        <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                            <input type="checkbox" class="pro-setting-chk">
                            <span>ปรับขนาดมินิแมพเป็น <strong>130%</strong> และแสดงรูปหน้าฮีโร่เรียบร้อยแล้ว</span>
                        </label>
                        <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                            <input type="checkbox" class="pro-setting-chk">
                            <span>ตั้งค่าปุ่ม <strong>Spacebar</strong> เพื่อดึงมุมกล้องกลับหาฮีโร่เรียบร้อยแล้ว</span>
                        </label>
                    </div>
                    <div style="margin-top:14px; text-align:right;">
                        <button class="btn btn-primary" id="btn-claim-settings-xp" disabled style="opacity:0.5;"><i class="fa-solid fa-gift"></i> รับโบนัส +50 XP โค้ช</button>
                    </div>
                </div>

            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = document.getElementById('btn-close-pro-settings');
    const claimBtn = document.getElementById('btn-claim-settings-xp');
    const checkboxes = modal.querySelectorAll('.pro-setting-chk');

    const updateClaimState = () => {
        const allChecked = Array.from(checkboxes).every(c => c.checked);
        if (claimBtn) {
            claimBtn.disabled = !allChecked;
            claimBtn.style.opacity = allChecked ? '1' : '0.5';
        }
    };

    checkboxes.forEach(c => c.addEventListener('change', updateClaimState));

    claimBtn?.addEventListener('click', () => {
        StorageManager.gainXp(50);
        alert('🎉 ยอดเยี่ยมมาก! รับโบนัส +50 XP จากการปรับตั้งค่าเกมสไตล์ Pro Player เรียบร้อยแล้ว!');
        modal.remove();
        renderDashboard();
    });

    closeBtn?.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ============================================================
// MAP LEARNING & WARDING PLAYBOOK MODULE
// ============================================================
function initMapGuide() {
    const container = document.getElementById('mapguide-container');
    if (!container) return;

    container.innerHTML = `
        <!-- Official Real Dota 2 Map Visualizer -->
        <div class="card mb-20" style="border-top: 4px solid var(--green);">
            <div class="card-header" style="background:linear-gradient(135deg, rgba(46,204,113,0.1), rgba(15,16,21,0.95)); justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                    <h3 style="margin:0;"><i class="fa-solid fa-map-location-dot green-text"></i> แผนที่จริง Dota 2 Patch Overview (4K Tactical Map)</h3>
                    <p class="subtitle" style="margin-top:2px;">แผนที่จริงแสดงตำแหน่ง Base, River, Roshan Pits, Twin Gates, Lotus Pools และจุดยุทธศาสตร์หลัก</p>
                </div>
            </div>
            <div class="card-body" style="padding:20px; text-align:center; background:rgba(0,0,0,0.4);">
                <div style="position:relative; display:inline-block; border-radius:12px; overflow:hidden; border:2px solid rgba(46,204,113,0.3); box-shadow:0 12px 40px rgba(0,0,0,0.8); max-width:100%;">
                    <img src="assets/dota2_map_real.png" alt="Dota 2 Official Real Map In-Game" style="width:100%; max-width:820px; height:auto; display:block; margin:0 auto; border-radius:8px;">
                </div>
                <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-top:14px; font-size:12px; color:#c0c9d8;">
                    <span><i class="fa-solid fa-square green-text"></i> <strong>Radiant Base:</strong> ฐานฝั่งซ้ายล่าง</span>
                    <span><i class="fa-solid fa-square crimson-text"></i> <strong>Dire Base:</strong> ฐานฝั่งขวาบน</span>
                    <span><i class="fa-solid fa-water cyan-text"></i> <strong>River:</strong> แม่น้ำตัดกลางแผนที่</span>
                    <span><i class="fa-solid fa-circle-dot purple-text"></i> <strong>Twin Gates:</strong> ประตูวาร์ปมุมแผนที่</span>
                </div>
            </div>
        </div>

        <div class="grid-layout mb-20" style="grid-template-columns: 2fr 1fr; gap:20px; align-items:start;">
            
            <!-- Left Main Column: Map Zones & Warding Playbook -->
            <div style="display:flex; flex-direction:column; gap:20px;">
                
                <!-- 1. Map Zones & Dead Lane Control -->
                <div class="card">
                    <div class="card-header" style="background:rgba(200,35,44,0.08); border-bottom:1px solid rgba(200,35,44,0.2);">
                        <h3 style="margin:0;"><i class="fa-solid fa-skull-crossbones crimson-text"></i> 1. ยุทธศาสตร์คุมพื้นที่ & การอ่าน Dead Lane (Dead Lane Strategy)</h3>
                    </div>
                    <div class="card-body" style="padding:20px;">
                        <p style="font-size:13px; color:#c0c9d8; margin-top:0; margin-bottom:16px; line-height:1.6;">
                            <strong>"Dead Lane (เลนอันตราย/เลนตาย)"</strong> คือโซนที่มีอัตราการโดนซุ่มยิงสูงที่สุดใน Dota 2 มักเป็นเลนออฟเลนศัตรู หรือเลนที่ป้อม 1 ฝั่งเราพังไปแล้ว ศัตรูสามารถพก Smoke วาร์ปมาดักซุ่มฆ่าได้ใน 3 วินาที!
                        </p>

                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
                            <!-- Dead Lane Box -->
                            <div style="background:rgba(200,35,44,0.08); border-left:4px solid var(--crimson); padding:14px; border-radius:6px;">
                                <strong class="crimson-text" style="font-size:14px;"><i class="fa-solid fa-triangle-exclamation"></i> 🔴 Dead Lane (เลนอันตราย)</strong>
                                <ul style="margin:8px 0 0; padding-left:18px; font-size:12px; color:#ddd; line-height:1.5;">
                                    <li><strong>กฎเหล็ก Pos 1:</strong> ห้ามฟาร์มใน Dead Lane เด็ดขาดหากไม่มี BKB หรือวิชั่น!</li>
                                    <li><strong>ทางแก้:</strong> ให้ Pos 3/4 ไปดันคลื่นครีปใน Dead Lane เพื่อดึงตัวศัตรูมากันเลน</li>
                                </ul>
                            </div>

                            <!-- Triangle Zone Box -->
                            <div style="background:rgba(212,175,55,0.08); border-left:4px solid var(--gold); padding:14px; border-radius:6px;">
                                <strong class="gold-text" style="font-size:14px;"><i class="fa-solid fa-gem"></i> 🟡 Triangle Zone (สามเหลี่ยมทองคำ)</strong>
                                <ul style="margin:8px 0 0; padding-left:18px; font-size:12px; color:#ddd; line-height:1.5;">
                                    <li>ป่าเล็ก + เนินสูงใกล้ป้อม 2 + ถ้ำ Roshan</li>
                                    <li><strong>โซนฟาร์มปลอดภัยที่สุด:</strong> มีป้อม 2 และเนินสูงคอยคุ้มกัน ปลอดภัยจากซุ่มแก๊ง 90%</li>
                                </ul>
                            </div>
                        </div>

                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                            <!-- Safe Zone -->
                            <div style="background:rgba(46,204,113,0.08); border-left:4px solid var(--green); padding:14px; border-radius:6px;">
                                <strong class="green-text" style="font-size:14px;"><i class="fa-solid fa-shield-halved"></i> 🟢 Safe Farm Zone (ป่าใกล้บ้าน)</strong>
                                <p style="margin:6px 0 0; font-size:12px; color:#bbb; line-height:1.5;">
                                    ป่าหลักหลังป้อม 1-2 เหมาะสำหรับการฟาร์มของ Pos 1 & 2 ช่วงนาที 0-15 ก่อนป้อมพัง
                                </p>
                            </div>

                            <!-- Objective Pit Zone -->
                            <div style="background:rgba(0,210,255,0.08); border-left:4px solid var(--cyan); padding:14px; border-radius:6px;">
                                <strong class="cyan-text" style="font-size:14px;"><i class="fa-solid fa-dragon"></i> 🔵 Roshan & Objective Pit</strong>
                                <p style="margin:6px 0 0; font-size:12px; color:#bbb; line-height:1.5;">
                                    พื้นที่คุมบอส Roshan ชิง Aegis ก่อนขึ้นดัน High Ground ในนาทีที่ 20+ และ 30+
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Vision & Warding Playbook -->
                <div class="card">
                    <div class="card-header" style="background:rgba(0,210,255,0.08); border-bottom:1px solid rgba(0,210,255,0.2);">
                        <h3 style="margin:0;"><i class="fa-solid fa-eye cyan-text"></i> 2. คู่มือจุดปัก Observer & Sentry Ward (Vision Control)</h3>
                    </div>
                    <div class="card-body" style="padding:20px;">
                        <p style="font-size:13px; color:#c0c9d8; margin-top:0; margin-bottom:16px;">
                            การปัก Ward ที่มีประสิทธิภาพไม่ได้ขึ้นกับจำนวน แต่ขึ้นอยู่กับ <strong>วัตถุประสงค์ (Purpose)</strong> ในช่วงเวลานั้นของเกม:
                        </p>

                        <div style="display:flex; flex-direction:column; gap:10px;">
                            <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:12px 16px; border-radius:8px;">
                                <strong style="color:#00d2d3; font-size:13px;"><i class="fa-solid fa-mountain"></i> High Ground Cliff Wards (เนินสูง 360 องศา):</strong>
                                <p style="margin:4px 0 0; font-size:12px; color:#bbb;">
                                    จุดปักยอดนิยมบนเนินหินป่าศัตรู ให้วิชั่นกว้างที่สุด แต่มักโดน Sentry Deward ได้ง่าย <u>วิธีใช้:</u> ปักเฉพาะตอนคอล Smoke เข้าไปไฟต์ป่าศัตรู
                                </p>
                            </div>

                            <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:12px 16px; border-radius:8px;">
                                <strong style="color:#2ecc71; font-size:13px;"><i class="fa-solid fa-shield"></i> Defensive Lane Wards (ปักป้องกันซัพพอร์ต):</strong>
                                <p style="margin:4px 0 0; font-size:12px; color:#bbb;">
                                    ปักไว้ตรงทางเชื่อมระหว่างแม่น้ำกับป่าฝั่งเรา ช่วยให้ Pos 1 มองเห็นมิดหรือซัพศัตรูเดิน Smoke มาแก๊งล่วงหน้า 5 วินาที
                                </p>
                            </div>

                            <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:12px 16px; border-radius:8px;">
                                <strong style="color:#d4af37; font-size:13px;"><i class="fa-solid fa-dragon"></i> Roshan Pit Outpost Wards (ปักคุมถ้ำ Roshan):</strong>
                                <p style="margin:4px 0 0; font-size:12px; color:#bbb;">
                                    ปักขอบต้นไม้หรือเนินหินใกล้ออตโพสต์ถ้ำ Roshan คุมวิชั่น 2 นาทีก่อนตี Roshan เช็คศัตรูแอบลักลอบเข้ามา
                                </p>
                            </div>

                            <div style="background:var(--bg-card-hover); border:1px solid var(--border-color); padding:12px 16px; border-radius:8px;">
                                <strong style="color:#ff9f43; font-size:13px;"><i class="fa-solid fa-book"></i> Wisdom Rune Cliff Wards (ปักซุ่มรูน Wisdom):</strong>
                                <p style="margin:4px 0 0; font-size:12px; color:#bbb;">
                                    ปักคุมเนินรูน Wisdom ฝั่งศัตรูในนาทีที่ 6:45 และ 13:45 เพื่อให้ Pos 4 สตีลรูน Wisdom ของศัตรูได้ปลอดภัย
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Right Sidebar Column: Camp Timings Cheatsheet -->
            <div class="card" style="position:sticky; top:20px;">
                <div class="card-header" style="background:rgba(212,175,55,0.08); border-bottom:1px solid rgba(212,175,55,0.2);">
                    <h3 style="margin:0;"><i class="fa-solid fa-clock gold-text"></i> ตารางเวลา Map Timings</h3>
                </div>
                <div class="card-body" style="padding:16px;">
                    <p style="font-size:12px; color:#8e95a5; margin-top:0; margin-bottom:12px;">เวลาสำคัญในเกมที่ต้องจำขึ้นใจ:</p>

                    <div style="display:flex; flex-direction:column; gap:10px; font-size:12px;">
                        <div style="background:var(--bg-card-hover); padding:10px; border-radius:6px; border-left:3px solid var(--cyan);">
                            <strong style="color:#00d2d3;">🌾 Small Camp Pull:</strong>
                            <div style="color:#fff; margin-top:2px;">นาที <code>xx:15</code> และ <code>xx:45</code></div>
                            <small style="color:#8e95a5;">ดึงครีปป่าเล็กเข้าหาครีปเลน</small>
                        </div>

                        <div style="background:var(--bg-card-hover); padding:10px; border-radius:6px; border-left:3px solid var(--gold);">
                            <strong style="color:#d4af37;">📦 Large Camp Stack:</strong>
                            <div style="color:#fff; margin-top:2px;">นาที <code>xx:53</code> - <code>xx:55</code></div>
                            <small style="color:#8e95a5;">ตีครีปแล้ววิ่งออกนอกบล็อก 1,200R</small>
                        </div>

                        <div style="background:var(--bg-card-hover); padding:10px; border-radius:6px; border-left:3px solid var(--purple);">
                            <strong style="color:#a55eea;">🔮 Wisdom Rune Spawn:</strong>
                            <div style="color:#fff; margin-top:2px;">ทุกๆ 7 นาที (<code>07:00</code>, <code>14:00</code>...)</div>
                            <small style="color:#8e95a5;">แจก XP ทั้งทีม</small>
                        </div>

                        <div style="background:var(--bg-card-hover); padding:10px; border-radius:6px; border-left:3px solid var(--green);">
                            <strong style="color:#2ecc71;">🌸 Lotus Pool Healing:</strong>
                            <div style="color:#fff; margin-top:2px;">ทุกๆ 3 นาที (<code>03:00</code>, <code>06:00</code>...)</div>
                            <small style="color:#8e95a5;">เก็บดอกบัวเพิ่ม HP/Mana</small>
                        </div>

                        <div style="background:var(--bg-card-hover); padding:10px; border-radius:6px; border-left:3px solid var(--crimson);">
                            <strong style="color:#ff4d55;">👹 Tormentor Spawn:</strong>
                            <div style="color:#fff; margin-top:2px;">นาทีที่ <code>20:00</code> (เกิดใหม่ทุก 10m)</div>
                            <small style="color:#8e95a5;">แจก Aghanim Shard ฟรี</small>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}

// ============================================================
// 🤖 AI Personal Weakness Detector
// ============================================================

const ROLE_BENCHMARKS = {
    Core: { // Pos 1 Safe Carry
        Herald:   { gpm: 420, xpm: 450, kda: 2.2, lh10: 40, hdmg: 350, tdmg: 1500, deaths: 8.0 },
        Guardian: { gpm: 470, xpm: 500, kda: 2.6, lh10: 50, hdmg: 400, tdmg: 2200, deaths: 7.5 },
        Crusader: { gpm: 520, xpm: 550, kda: 3.0, lh10: 60, hdmg: 450, tdmg: 3000, deaths: 7.0 },
        Archon:   { gpm: 570, xpm: 600, kda: 3.4, lh10: 68, hdmg: 500, tdmg: 3800, deaths: 6.5 },
        Legend:   { gpm: 620, xpm: 650, kda: 3.8, lh10: 75, hdmg: 550, tdmg: 4500, deaths: 6.0 },
        Ancient:  { gpm: 660, xpm: 700, kda: 4.2, lh10: 82, hdmg: 600, tdmg: 5200, deaths: 5.5 },
        Divine:   { gpm: 710, xpm: 750, kda: 4.6, lh10: 88, hdmg: 660, tdmg: 6000, deaths: 5.0 },
        Immortal: { gpm: 770, xpm: 800, kda: 5.2, lh10: 95, hdmg: 750, tdmg: 7500, deaths: 4.5 }
    },
    Mid: { // Pos 2 Midlaner
        Herald:   { gpm: 400, xpm: 460, kda: 2.4, lh10: 35, hdmg: 400, tdmg: 1200, deaths: 8.5 },
        Guardian: { gpm: 450, xpm: 520, kda: 2.8, lh10: 45, hdmg: 480, tdmg: 1800, deaths: 8.0 },
        Crusader: { gpm: 500, xpm: 580, kda: 3.2, lh10: 55, hdmg: 550, tdmg: 2400, deaths: 7.2 },
        Archon:   { gpm: 550, xpm: 640, kda: 3.6, lh10: 62, hdmg: 620, tdmg: 3000, deaths: 6.5 },
        Legend:   { gpm: 600, xpm: 700, kda: 4.0, lh10: 70, hdmg: 690, tdmg: 3600, deaths: 6.0 },
        Ancient:  { gpm: 640, xpm: 750, kda: 4.4, lh10: 76, hdmg: 750, tdmg: 4200, deaths: 5.5 },
        Divine:   { gpm: 690, xpm: 800, kda: 4.8, lh10: 82, hdmg: 820, tdmg: 5000, deaths: 5.0 },
        Immortal: { gpm: 750, xpm: 860, kda: 5.4, lh10: 90, hdmg: 900, tdmg: 6000, deaths: 4.5 }
    },
    Offlane: { // Pos 3 Tank / Initiator
        Herald:   { gpm: 340, xpm: 390, kda: 2.0, lh10: 25, hdmg: 320, tdmg: 900,  deaths: 9.0 },
        Guardian: { gpm: 380, xpm: 430, kda: 2.4, lh10: 33, hdmg: 380, tdmg: 1300, deaths: 8.5 },
        Crusader: { gpm: 420, xpm: 480, kda: 2.8, lh10: 42, hdmg: 440, tdmg: 1800, deaths: 7.8 },
        Archon:   { gpm: 470, xpm: 530, kda: 3.1, lh10: 50, hdmg: 500, tdmg: 2200, deaths: 7.2 },
        Legend:   { gpm: 510, xpm: 580, kda: 3.4, lh10: 58, hdmg: 560, tdmg: 2700, deaths: 6.6 },
        Ancient:  { gpm: 550, xpm: 620, kda: 3.8, lh10: 64, hdmg: 620, tdmg: 3200, deaths: 6.0 },
        Divine:   { gpm: 590, xpm: 670, kda: 4.2, lh10: 70, hdmg: 680, tdmg: 3800, deaths: 5.5 },
        Immortal: { gpm: 640, xpm: 720, kda: 4.8, lh10: 76, hdmg: 750, tdmg: 4500, deaths: 5.0 }
    },
    Support: { // Pos 4 & 5 Hard/Soft Support
        Herald:   { gpm: 260, xpm: 320, kda: 1.8, lh10: 8,  hdmg: 220, tdmg: 300,  deaths: 9.5 },
        Guardian: { gpm: 290, xpm: 360, kda: 2.1, lh10: 10, hdmg: 260, tdmg: 450,  deaths: 9.0 },
        Crusader: { gpm: 320, xpm: 400, kda: 2.4, lh10: 12, hdmg: 300, tdmg: 600,  deaths: 8.2 },
        Archon:   { gpm: 350, xpm: 440, kda: 2.7, lh10: 15, hdmg: 350, tdmg: 800,  deaths: 7.6 },
        Legend:   { gpm: 380, xpm: 480, kda: 3.0, lh10: 18, hdmg: 400, tdmg: 1000, deaths: 7.0 },
        Ancient:  { gpm: 410, xpm: 520, kda: 3.3, lh10: 20, hdmg: 450, tdmg: 1200, deaths: 6.5 },
        Divine:   { gpm: 440, xpm: 560, kda: 3.7, lh10: 22, hdmg: 500, tdmg: 1500, deaths: 6.0 },
        Immortal: { gpm: 480, xpm: 600, kda: 4.2, lh10: 25, hdmg: 560, tdmg: 1800, deaths: 5.2 }
    }
};

const WEAKNESS_TIPS = {
    gpm: { label: '💰 GPM (ทองต่อนาที)', weakness: 'ฟาร์มช้ากว่าค่าเฉลี่ยแร้งก์ในโรลนี้', tips: ['ฝึกเคลียร์ครีปเลนแล้วสลับฟาร์มป่า (Push & Farm Cycle)','ซื้อไอเทมสปีดฟาร์มก่อนเช่น Battle Fury / Maelstrom / Radiance','อย่าเดินไปมาเปล่าๆ ทุกวินาทีต้องฟาร์ม'] },
    xpm: { label: '⚡ XPM (ประสบการณ์ต่อนาที)', weakness: 'เก็บเลเวลช้า', tips: ['อย่ายืนเลนเดียวกับ Carry ถ้าเป็นซัพพอร์ต','เก็บรูน Wisdom ทุก 7 นาที','Stack ครีปป่าให้ Carry แล้วขอแชร์ XP'] },
    kda: { label: '⚔️ KDA (Kill/Death/Assist)', weakness: 'ตายบ่อยเกินหรือมีส่วนร่วมน้อย', tips: ['มองมินิแมพทุก 5 วินาที','อย่าไฟต์ในพื้นที่ไม่มี Ward/Vision','รอให้ทีมรวมตัวก่อนค่อยเข้าไฟต์'] },
    lh: { label: '🎯 Last Hit / 10 นาที', weakness: 'เก็บครีปได้น้อยกว่าค่าเฉลี่ยโรลนี้', tips: ['ฝึก Last Hit ในโหมด Demo Hero วันละ 10 นาที','ตั้งเป้า 60+ ตัวใน 10 นาทีแรกสำหรับ Core','เรียนรู้จังหวะ Creep Aggro Trick ดึงครีปเข้าหาตัว'] },
    hdmg: { label: '🗡️ Hero Damage / นาที', weakness: 'สร้างความเสียหายต่อศัตรูน้อย', tips: ['เลือก Target ตัวอ่อนแนวหลัง (Pos 4/5) ก่อน','ใช้ BKB เข้าไฟต์ตียาวๆ แทนโดนสตันตายไว','หาจังหวะเปิดไฟต์ที่ทีมพร้อม ไม่ใช่ตีเดี่ยว'] },
    tdmg: { label: '🏰 Tower Damage', weakness: 'ดันป้อมน้อยไป ไม่กดจบเกม', tips: ['ชนะไฟต์แล้วต้องดันป้อม/ตี Roshan ทันที','อย่ากลับไปฟาร์มป่าหลังชนะทีมไฟต์','เลือกฮีโร่ที่ตีป้อมไวเช่น Lycan, Lone Druid, Shadow Shaman'] },
    survival: { label: '💀 อัตราการตาย', weakness: 'ตายบ่อยเกินไป เสียเวลาและเงิน', tips: ['ซื้อ BKB เร็วขึ้น อย่ารอจนเลทเกม','TP Scroll ติดตัว 2 อันเสมอ','ถอยเมื่อเห็นฮีโร่ศัตรูหายจากแมพ 2+ ตัว'] }
};

// Helper: Classify player's role in a match based on OpenDota data
function detectMatchRole(match) {
    const lh10 = (match.last_hits || 0) / Math.max(1, (match.duration / 600));
    const gpm = match.gold_per_min || 0;
    const lane = match.lane_role || match.lane || 0;

    if (lane === 2) return 'Mid'; // Mid Lane
    if (gpm < 420 && lh10 < 28) return 'Support'; // Support (Pos 4/5)
    if (lane === 3 || (gpm < 520 && lh10 < 50)) return 'Offlane'; // Offlane (Pos 3)
    return 'Core'; // Carry (Pos 1)
}

function initWeaknessDetector() {
    const container = document.getElementById('analyzer-container');
    if (!container) return;

    container.innerHTML = `
        <div class="card mb-20" style="border-top: 4px solid #a55eea;">
            <div class="card-header" style="background:linear-gradient(135deg, rgba(165,94,234,0.12), rgba(15,16,21,0.95)); justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                    <h3 style="margin:0;"><i class="fa-solid fa-robot" style="color:#a55eea;"></i> AI Role-Aware Weakness Analyzer</h3>
                    <p class="subtitle" style="margin-top:2px;">วิเคราะห์จุดอ่อนเจาะลึก 20 แมตช์ล่าสุด **ตาม Role (Pos 1-5)** ของแต่ละเกมอย่างเที่ยงตรง</p>
                </div>
                <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
                    <div class="btn-group" id="analyzer-role-filter">
                        <button class="btn btn-small btn-secondary active" data-role="all">🌟 ทุก Role</button>
                        <button class="btn btn-small btn-secondary" data-role="Core">⚔️ Pos 1 Carry</button>
                        <button class="btn btn-small btn-secondary" data-role="Mid">⚡ Pos 2 Mid</button>
                        <button class="btn btn-small btn-secondary" data-role="Offlane">🛡️ Pos 3 Offlane</button>
                        <button class="btn btn-small btn-secondary" data-role="Support">👁️ Pos 4/5 Support</button>
                    </div>
                    <button class="btn btn-primary" id="btn-run-analysis" style="background:linear-gradient(135deg,#a55eea,#8854d0); white-space:nowrap; font-weight:700;">
                        <i class="fa-solid fa-magnifying-glass-chart"></i> วิเคราะห์จุดอ่อน
                    </button>
                </div>
            </div>
        </div>
        <div id="weakness-results"></div>
    `;

    let activeRoleFilter = 'all';

    document.querySelectorAll('#analyzer-role-filter .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#analyzer-role-filter .btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeRoleFilter = btn.getAttribute('data-role');
            const settings = StorageManager.getSettings();
            if (settings.steamId) runWeaknessAnalysis(settings.steamId, activeRoleFilter);
        });
    });

    document.getElementById('btn-run-analysis')?.addEventListener('click', () => {
        const settings = StorageManager.getSettings();
        if (!settings.steamId) {
            alert('⚠️ กรุณาใส่ Steam ID ในหน้า Config Settings ก่อนครับ');
            switchTab('settings');
            return;
        }
        runWeaknessAnalysis(settings.steamId, activeRoleFilter);
    });
}

async function runWeaknessAnalysis(steamId, roleFilter = 'all') {
    const resultsDiv = document.getElementById('weakness-results');
    if (!resultsDiv) return;

    resultsDiv.innerHTML = `
        <div class="card mb-20"><div class="card-body" style="padding:40px; text-align:center;">
            <i class="fa-solid fa-spinner fa-spin fa-2x" style="color:#a55eea;"></i>
            <p style="margin-top:12px; color:#c0c9d8;">กำลังดึงและวิเคราะห์สถิติตาม Role (${roleFilter})...</p>
        </div></div>
    `;

    try {
        const accountId = normalizeSteamId(steamId);
        const res = await fetchWithFallback('https://api.opendota.com/api/players/' + accountId + '/recentMatches');
        if (!res.ok) throw new Error('ไม่สามารถเชื่อมต่อ OpenDota API');
        const rawMatches = await res.json();
        if (!rawMatches || !Array.isArray(rawMatches) || rawMatches.length === 0) {
            resultsDiv.innerHTML = '<div class="card"><div class="card-body" style="padding:20px;">❌ ไม่พบข้อมูลแมตช์ กรุณาตรวจสอบ Steam ID หรือเปิดโปรไฟล์เป็น Public</div></div>';
            return;
        }

        // Attach detected role to each match
        const matchesWithRole = rawMatches.filter(m => m.duration > 600).map(m => ({
            ...m,
            detectedRole: detectMatchRole(m)
        }));

        // Filter by role if requested
        const valid = roleFilter === 'all' 
            ? matchesWithRole 
            : matchesWithRole.filter(m => m.detectedRole === roleFilter);

        if (valid.length === 0) {
            resultsDiv.innerHTML = `<div class="card"><div class="card-body" style="padding:30px; text-align:center; color:#ff9f43;"><i class="fa-solid fa-filter fa-2x mb-10"></i><br>ไม่พบแมตช์ที่เป็นโรล <strong>${roleFilter}</strong> ใน 20 แมตช์ล่าสุด กรุณาเลือก "ทุก Role" ครับ</div></div>`;
            return;
        }

        const n = valid.length;
        const mmrData = StorageManager.getMmrData();
        const rankInfo = StorageManager.getRankTierInfo(mmrData.currentMmr);

        // Aggregate stats and role-weighted benchmarks
        let totK=0,totD=0,totA=0,totGPM=0,totXPM=0,totLH=0,totHD=0,totTD=0,totDur=0,wins=0;
        let benchGPM=0, benchXPM=0, benchKDA=0, benchLH10=0, benchHD=0, benchTD=0, benchDeaths=0;

        valid.forEach(m => {
            totK += m.kills||0; totD += m.deaths||0; totA += m.assists||0;
            totGPM += m.gold_per_min||0; totXPM += m.xp_per_min||0;
            totLH += m.last_hits||0; totHD += m.hero_damage||0; totTD += m.tower_damage||0;
            totDur += m.duration||0;
            const rad = m.player_slot < 128;
            if ((rad && m.radiant_win) || (!rad && !m.radiant_win)) wins++;

            // Accumulate Role-Specific Benchmark for this exact match!
            const rBench = (ROLE_BENCHMARKS[m.detectedRole] && ROLE_BENCHMARKS[m.detectedRole][rankInfo.tier]) 
                ? ROLE_BENCHMARKS[m.detectedRole][rankInfo.tier] 
                : ROLE_BENCHMARKS.Core.Archon;

            benchGPM += rBench.gpm;
            benchXPM += rBench.xpm;
            benchKDA += rBench.kda;
            benchLH10 += rBench.lh10;
            benchHD += rBench.hdmg;
            benchTD += rBench.tdmg;
            benchDeaths += rBench.deaths;
        });

        // Averaged player stats vs Averaged role benchmarks
        const avgD = Math.max(totD/n, 0.1);
        const avgDur = totDur/n;
        const stats = {
            gpm: totGPM/n, xpm: totXPM/n,
            kda: (totK/n + totA/n) / avgD,
            lh10: (totLH/n) / (avgDur/600),
            hdmg: (totHD/n) / (avgDur/60),
            tdmg: totTD/n, deaths: totD/n,
            winRate: ((wins/n)*100).toFixed(1), matchCount: n
        };

        const bench = {
            gpm: Math.round(benchGPM/n),
            xpm: Math.round(benchXPM/n),
            kda: parseFloat((benchKDA/n).toFixed(2)),
            lh10: Math.round(benchLH10/n),
            hdmg: Math.round(benchHD/n),
            tdmg: Math.round(benchTD/n),
            deaths: parseFloat((benchDeaths/n).toFixed(1))
        };

        const scores = {
            gpm: Math.min(120, (stats.gpm/bench.gpm)*100),
            xpm: Math.min(120, (stats.xpm/bench.xpm)*100),
            kda: Math.min(120, (stats.kda/bench.kda)*100),
            lh: Math.min(120, (stats.lh10/bench.lh10)*100),
            hdmg: Math.min(120, (stats.hdmg/bench.hdmg)*100),
            tdmg: Math.min(120, (stats.tdmg/bench.tdmg)*100),
            survival: Math.min(120, (bench.deaths/Math.max(stats.deaths,0.5))*100)
        };

        const weakKeys = Object.keys(scores).filter(k => scores[k] < 80);
        const strongKeys = Object.keys(scores).filter(k => scores[k] >= 110);
        const overallScore = Math.round(Object.values(scores).reduce((a,b)=>a+b,0) / 7);
        const grade = overallScore >= 110 ? 'S' : overallScore >= 95 ? 'A' : overallScore >= 80 ? 'B' : overallScore >= 65 ? 'C' : 'D';
        const gradeColor = grade==='S'?'#d4af37':grade==='A'?'#2ecc71':grade==='B'?'#4bcffa':grade==='C'?'#ff9f43':'#ff4d55';

        // Count role breakdown
        const roleCounts = {};
        valid.forEach(m => roleCounts[m.detectedRole] = (roleCounts[m.detectedRole] || 0) + 1);
        const roleBreakdownStr = Object.entries(roleCounts).map(([r, c]) => `${r}: ${c}m`).join(' | ');

        // Find best hero (highest win rate among heroes with ≥2 matches in rawMatches)
        const heroStats = {};
        rawMatches.forEach(m => {
            const hName = cachedHeroes[m.hero_id] || `Hero ${m.hero_id}`;
            if (!heroStats[hName]) heroStats[hName] = { wins: 0, games: 0 };
            heroStats[hName].games++;
            const rad = m.player_slot < 128;
            if ((rad && m.radiant_win) || (!rad && !m.radiant_win)) heroStats[hName].wins++;
        });
        const bestHeroEntry = Object.entries(heroStats)
            .filter(([, v]) => v.games >= 1)
            .sort((a, b) => (b[1].wins / b[1].games) - (a[1].wins / a[1].games))[0];
        const bestHeroName = bestHeroEntry ? bestHeroEntry[0] : 'Unknown';
        const bestHeroWins = bestHeroEntry ? bestHeroEntry[1].wins : 0;
        const bestHeroGames = bestHeroEntry ? bestHeroEntry[1].games : 0;
        const bestHeroWR = bestHeroGames > 0 ? Math.round((bestHeroWins / bestHeroGames) * 100) : 0;

        // Store weakness share data globally for share button
        window.__weaknessShareData = {
            grade, gradeColor, overallScore,
            winRate: stats.winRate, matchCount: stats.matchCount,
            rankName: rankInfo.name,
            bestHeroName, bestHeroWR, bestHeroGames,
            scores
        };

        resultsDiv.innerHTML = `
            <div class="grid-layout mb-20" style="grid-template-columns: 1fr 1fr; gap:20px; align-items:start;">
                <!-- Radar Chart -->
                <div class="card" style="border-top:4px solid #a55eea;">
                    <div class="card-header"><h3 style="margin:0;"><i class="fa-solid fa-chart-radar" style="color:#a55eea;"></i> Radar Chart (ปรับตาม Role & แร้งก์ ${rankInfo.name})</h3></div>
                    <div class="card-body" style="padding:20px; text-align:center;">
                        <canvas id="weakness-radar-chart" width="380" height="380"></canvas>
                    </div>
                </div>

                <!-- Overall Score + Stats Summary -->
                <div style="display:flex; flex-direction:column; gap:16px;">
                    <div class="card" style="border-top:4px solid ${gradeColor};">
                        <div class="card-body" style="padding:20px; text-align:center;">
                            <div style="font-size:56px; font-weight:800; color:${gradeColor}; text-shadow:0 0 20px ${gradeColor}44; font-family:Rajdhani,sans-serif;">${grade}</div>
                            <div style="font-size:14px; color:#c0c9d8;">Overall Role Performance: <strong style="color:#fff;">${overallScore}%</strong></div>
                            <div style="display:flex; justify-content:center; gap:16px; margin-top:10px; font-size:12px; flex-wrap:wrap;">
                                <span style="color:#2ecc71;"><i class="fa-solid fa-arrow-trend-up"></i> Win Rate: <strong>${stats.winRate}%</strong></span>
                                <span style="color:#c0c9d8;">แมตช์ที่วิเคราะห์: <strong>${stats.matchCount}</strong></span>
                            </div>
                            <div style="margin-top:8px; font-size:11px; color:#8e95a5;">สัดส่วน Role: ${roleBreakdownStr}</div>
                            <button id="btn-share-weakness-card" style="margin-top:14px; width:100%; padding:10px; border-radius:8px; background:linear-gradient(135deg,#a55eea,#8854d0); border:none; color:#fff; font-weight:700; font-size:13px; cursor:pointer; letter-spacing:0.5px;">
                                <i class="fa-solid fa-camera"></i> ดาวน์โหลดการ์ดแชร์ Facebook 📸
                            </button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header"><h3 style="margin:0;"><i class="fa-solid fa-chart-bar cyan-text"></i> สถิติของคุณ vs ค่าเป้าหมาย Role (${rankInfo.tier})</h3></div>
                        <div class="card-body" style="padding:16px;">
                            ${renderStatRow('💰 GPM', stats.gpm.toFixed(0), bench.gpm, scores.gpm)}
                            ${renderStatRow('⚡ XPM', stats.xpm.toFixed(0), bench.xpm, scores.xpm)}
                            ${renderStatRow('⚔️ KDA', stats.kda.toFixed(2), bench.kda, scores.kda)}
                            ${renderStatRow('🎯 LH/10m', stats.lh10.toFixed(0), bench.lh10, scores.lh)}
                            ${renderStatRow('🗡️ HD/min', stats.hdmg.toFixed(0), bench.hdmg, scores.hdmg)}
                            ${renderStatRow('🏰 TowerDmg', stats.tdmg.toFixed(0), bench.tdmg, scores.tdmg)}
                            ${renderStatRow('💀 Deaths', stats.deaths.toFixed(1), bench.deaths, scores.survival, true)}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Weaknesses -->
            ${weakKeys.length > 0 ? `
            <div class="card mb-20" style="border-top:4px solid #ff4d55;">
                <div class="card-header"><h3 style="margin:0;"><i class="fa-solid fa-triangle-exclamation" style="color:#ff4d55;"></i> จุดอ่อนที่ต้องแก้ไขสำหรับ Role นี้ (${weakKeys.length} ด้าน)</h3></div>
                <div class="card-body" style="padding:20px;">
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px,1fr)); gap:16px;">
                        ${weakKeys.map(k => {
                            const info = WEAKNESS_TIPS[k === 'lh' ? 'lh' : k];
                            if (!info) return '';
                            return '<div style="background:rgba(255,77,85,0.08); border:1px solid rgba(255,77,85,0.2); border-radius:10px; padding:16px;">' +
                                '<div style="font-weight:700; color:#ff4d55; margin-bottom:6px;">' + info.label + ' <span style="background:rgba(255,77,85,0.2); padding:2px 8px; border-radius:12px; font-size:12px;">' + Math.round(scores[k]) + '%</span></div>' +
                                '<div style="color:#ffa0a4; font-size:13px; margin-bottom:8px;">' + info.weakness + '</div>' +
                                '<ul style="margin:0; padding-left:18px; font-size:12px; color:#c0c9d8;">' + info.tips.map(t => '<li style="margin-bottom:4px;">' + t + '</li>').join('') + '</ul></div>';
                        }).join('')}
                    </div>
                </div>
            </div>` : ''}

            <!-- Strengths -->
            ${strongKeys.length > 0 ? `
            <div class="card mb-20" style="border-top:4px solid #2ecc71;">
                <div class="card-header"><h3 style="margin:0;"><i class="fa-solid fa-medal" style="color:#2ecc71;"></i> จุดแข็งของคุณใน Role นี้ (${strongKeys.length} ด้าน)</h3></div>
                <div class="card-body" style="padding:20px;">
                    <div style="display:flex; gap:12px; flex-wrap:wrap;">
                        ${strongKeys.map(k => {
                            const info = WEAKNESS_TIPS[k === 'lh' ? 'lh' : k];
                            if (!info) return '';
                            return '<div style="background:rgba(46,204,113,0.1); border:1px solid rgba(46,204,113,0.25); border-radius:20px; padding:8px 16px; font-size:13px; color:#2ecc71; font-weight:600;">' + info.label + ' <span style="color:#fff;">' + Math.round(scores[k]) + '%</span> 🔥</div>';
                        }).join('')}
                    </div>
                </div>
            </div>` : ''}
        `;

        // Render Radar Chart
        const ctx = document.getElementById('weakness-radar-chart');
        if (ctx) {
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['GPM', 'XPM', 'KDA', 'Last Hit', 'Hero Dmg', 'Tower Dmg', 'Survival'],
                    datasets: [
                        {
                            label: 'คุณ (' + roleFilter + ')',
                            data: [scores.gpm, scores.xpm, scores.kda, scores.lh, scores.hdmg, scores.tdmg, scores.survival],
                            borderColor: '#a55eea', backgroundColor: 'rgba(165,94,234,0.15)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#a55eea'
                        },
                        {
                            label: 'ค่าเฉลี่ย Role ' + rankInfo.tier,
                            data: [100,100,100,100,100,100,100],
                            borderColor: '#ff9f43', backgroundColor: 'rgba(255,159,67,0.06)', borderWidth: 2, borderDash: [6,3], pointRadius: 3, pointBackgroundColor: '#ff9f43'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: { r: { beginAtZero: true, max: 130, grid: { color: 'rgba(255,255,255,0.08)' }, angleLines: { color: 'rgba(255,255,255,0.08)' }, pointLabels: { color: '#c0c9d8', font: { size: 12 } }, ticks: { display: false } } },
                    plugins: { legend: { labels: { color: '#c0c9d8', font: { size: 12 } } } }
                }
            });
        }

        // Wire share button
        document.getElementById('btn-share-weakness-card')?.addEventListener('click', () => {
            shareWeaknessCard();
        });

    } catch(e) {
        resultsDiv.innerHTML = '<div class="card"><div class="card-body" style="padding:20px;">❌ เกิดข้อผิดพลาด: ' + e.message + '</div></div>';
    }
}

function renderStatRow(label, value, benchmark, score, invertColor) {
    const color = score >= 100 ? '#2ecc71' : score >= 80 ? '#ff9f43' : '#ff4d55';
    const barW = Math.min(100, score);
    return '<div style="display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05);">' +
        '<div style="width:100px; font-size:13px; color:#c0c9d8; flex-shrink:0;">' + label + '</div>' +
        '<div style="flex:1; background:rgba(255,255,255,0.06); border-radius:4px; height:18px; overflow:hidden; position:relative;">' +
            '<div style="width:' + barW + '%; height:100%; background:' + color + '; border-radius:4px; transition:width 0.8s;"></div>' +
        '</div>' +
        '<div style="width:80px; text-align:right; font-size:13px;"><strong style="color:' + color + ';">' + value + '</strong><span style="color:#8e95a5;"> / ' + benchmark + '</span></div>' +
    '</div>';
}

// ============================================================
// 🔥 Hero Synergy & Counter Matrix
// ============================================================

function initHeroMatrix() {
    const container = document.getElementById('heromatrix-container');
    if (!container) return;

    container.innerHTML = `
        <div class="card mb-20" style="border-top: 4px solid var(--crimson);">
            <div class="card-header" style="background:linear-gradient(135deg, rgba(255,77,85,0.1), rgba(15,16,21,0.95)); justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                    <h3 style="margin:0;"><i class="fa-solid fa-crosshairs crimson-text"></i> เลือกฮีโร่เพื่อดู Matchup</h3>
                    <p class="subtitle" style="margin-top:2px;">คลิกฮีโร่ที่ต้องการ → ระบบจะดึง Win Rate ปะทะฮีโร่ทุกตัวจาก OpenDota (ข้อมูลจริง)</p>
                </div>
                <div style="position:relative; min-width:260px;">
                    <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:12px; top:11px; color:#8e95a5;"></i>
                    <input type="text" id="matrix-hero-search" placeholder="พิมพ์ชื่อฮีโร่... (เช่น Invoker, PA, Lion)" style="width:100%; padding:8px 12px 8px 36px; background:rgba(255,255,255,0.06); border:1px solid var(--border-color); border-radius:6px; color:#fff; font-size:13px;">
                </div>
            </div>
            <div class="card-body" style="padding:16px; max-height:340px; overflow-y:auto;">
                <div id="matrix-hero-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(105px, 1fr)); gap:8px;">
                    <div style="text-align:center; padding:20px; color:#8e95a5; grid-column: 1/-1;"><i class="fa-solid fa-spinner fa-spin"></i> กำลังโหลดรายชื่อฮีโร่...</div>
                </div>
            </div>
        </div>
        <div id="matrix-results"></div>
    `;

    // Load hero list
    loadMatrixHeroGrid();

    // Search filter
    document.getElementById('matrix-hero-search')?.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.matrix-hero-card').forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            card.style.display = name.includes(q) ? '' : 'none';
        });
    });
}

async function loadMatrixHeroGrid() {
    const grid = document.getElementById('matrix-hero-grid');
    if (!grid) return;

    try {
        const res = await fetch('https://api.opendota.com/api/heroes');
        const heroes = await res.json();
        if (!heroes || !Array.isArray(heroes)) throw new Error('No heroes');

        heroes.sort((a,b) => a.localized_name.localeCompare(b.localized_name));
        grid.innerHTML = heroes.map(h => {
            const imgUrl = getHeroImageUrl(h.localized_name);
            return '<div class="matrix-hero-card" data-id="' + h.id + '" data-name="' + h.localized_name + '" ' +
                'style="text-align:center; padding:8px 4px; background:rgba(255,255,255,0.04); border:1px solid transparent; border-radius:8px; cursor:pointer; transition:all 0.2s;" ' +
                'onmouseover="this.style.borderColor=\'rgba(255,77,85,0.5)\'; this.style.background=\'rgba(255,77,85,0.08)\';" ' +
                'onmouseout="this.style.borderColor=\'transparent\'; this.style.background=\'rgba(255,255,255,0.04)\';">' +
                '<img src="' + imgUrl + '" alt="' + h.localized_name + '" style="width:48px; height:27px; border-radius:4px; object-fit:cover; display:block; margin:0 auto 4px;" onerror="this.style.display=\'none\'">' +
                '<div style="font-size:11px; color:#c0c9d8; line-height:1.2; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' + h.localized_name + '</div></div>';
        }).join('');

        // Click handler for each hero card
        grid.querySelectorAll('.matrix-hero-card').forEach(card => {
            card.addEventListener('click', () => {
                const heroId = card.getAttribute('data-id');
                const heroName = card.getAttribute('data-name');
                // Highlight selected
                grid.querySelectorAll('.matrix-hero-card').forEach(c => { c.style.borderColor='transparent'; c.style.background='rgba(255,255,255,0.04)'; });
                card.style.borderColor = '#ff4d55';
                card.style.background = 'rgba(255,77,85,0.15)';
                showHeroMatchups(heroId, heroName);
            });
        });
    } catch(e) {
        grid.innerHTML = '<div style="padding:20px; color:#ff4d55; grid-column:1/-1;">❌ ไม่สามารถโหลดรายชื่อฮีโร่ได้</div>';
    }
}

async function showHeroMatchups(heroId, heroName) {
    const resultsDiv = document.getElementById('matrix-results');
    if (!resultsDiv) return;

    resultsDiv.innerHTML = '<div class="card mb-20"><div class="card-body" style="padding:30px; text-align:center;"><i class="fa-solid fa-spinner fa-spin fa-2x crimson-text"></i><p style="margin-top:10px; color:#c0c9d8;">กำลังดึงข้อมูล Matchup ของ ' + heroName + '...</p></div></div>';

    try {
        const res = await fetch('https://api.opendota.com/api/heroes/' + heroId + '/matchups');
        const matchups = await res.json();
        if (!matchups || !Array.isArray(matchups)) throw new Error('No data');

        // Need hero names map
        const heroRes = await fetch('https://api.opendota.com/api/heroes');
        const allHeroes = await heroRes.json();
        const heroMap = {};
        allHeroes.forEach(h => { heroMap[h.id] = h.localized_name; });

        // Calculate advantage % and sort
        const processed = matchups
            .filter(m => m.games_played >= 50)
            .map(m => ({
                heroId: m.hero_id,
                name: heroMap[m.hero_id] || 'Unknown',
                games: m.games_played,
                wins: m.wins,
                winRate: ((m.wins / m.games_played) * 100).toFixed(1),
                advantage: ((m.wins / m.games_played) * 100 - 50).toFixed(1)
            }));

        const counters = processed.filter(m => parseFloat(m.advantage) < -1).sort((a,b) => parseFloat(a.advantage) - parseFloat(b.advantage));
        const goodAgainst = processed.filter(m => parseFloat(m.advantage) > 1).sort((a,b) => parseFloat(b.advantage) - parseFloat(a.advantage));

        const heroImg = getHeroImageUrl(heroName);

        resultsDiv.innerHTML = `
            <div class="card mb-20" style="border-top:4px solid var(--crimson);">
                <div class="card-header" style="justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${heroImg}" alt="${heroName}" style="width:64px; height:36px; border-radius:6px; object-fit:cover;" onerror="this.style.display='none'">
                        <div>
                            <h3 style="margin:0;">${heroName} — Matchup Analysis</h3>
                            <p class="subtitle" style="margin-top:2px;">ข้อมูลจาก OpenDota (แมตช์ขั้นต่ำ 50 เกม)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid-layout mb-20" style="grid-template-columns: 1fr 1fr; gap:20px; align-items:start;">
                <!-- Countered By (ตัวที่แพ้) -->
                <div class="card" style="border-top:3px solid #ff4d55;">
                    <div class="card-header"><h3 style="margin:0; font-size:15px;"><i class="fa-solid fa-skull-crossbones" style="color:#ff4d55;"></i> ฮีโร่ที่ Counter ${heroName} (แพ้ง่าย) — ${counters.length} ตัว</h3></div>
                    <div class="card-body" style="padding:12px; max-height:500px; overflow-y:auto;">
                        ${counters.slice(0, 25).map((m, i) => renderMatchupBar(m, i, 'bad')).join('')}
                        ${counters.length === 0 ? '<div style="padding:12px; color:#8e95a5; text-align:center;">ไม่พบข้อมูล Counter ที่ชัดเจน</div>' : ''}
                    </div>
                </div>

                <!-- Good Against (ตัวที่ชนะ) -->
                <div class="card" style="border-top:3px solid #2ecc71;">
                    <div class="card-header"><h3 style="margin:0; font-size:15px;"><i class="fa-solid fa-trophy" style="color:#2ecc71;"></i> ฮีโร่ที่ ${heroName} Counter ได้ (ชนะง่าย) — ${goodAgainst.length} ตัว</h3></div>
                    <div class="card-body" style="padding:12px; max-height:500px; overflow-y:auto;">
                        ${goodAgainst.slice(0, 25).map((m, i) => renderMatchupBar(m, i, 'good')).join('')}
                        ${goodAgainst.length === 0 ? '<div style="padding:12px; color:#8e95a5; text-align:center;">ไม่พบข้อมูล Synergy ที่ชัดเจน</div>' : ''}
                    </div>
                </div>
            </div>
        `;

    } catch(e) {
        resultsDiv.innerHTML = '<div class="card"><div class="card-body" style="padding:20px;">❌ เกิดข้อผิดพลาด: ' + e.message + '</div></div>';
    }
}

function renderMatchupBar(m, index, type) {
    const color = type === 'good' ? '#2ecc71' : '#ff4d55';
    const bgColor = type === 'good' ? 'rgba(46,204,113,0.08)' : 'rgba(255,77,85,0.08)';
    const barW = Math.min(100, Math.abs(parseFloat(m.advantage)) * 4);
    const imgUrl = getHeroImageUrl(m.name);
    const advSign = parseFloat(m.advantage) > 0 ? '+' : '';

    return '<div style="display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:6px; background:' + bgColor + '; margin-bottom:4px;">' +
        '<div style="width:18px; font-size:11px; color:#8e95a5; text-align:right; flex-shrink:0;">' + (index+1) + '</div>' +
        '<img src="' + imgUrl + '" style="width:36px; height:20px; border-radius:3px; object-fit:cover; flex-shrink:0;" onerror="this.style.display=\'none\'">' +
        '<div style="flex:1; min-width:0;">' +
            '<div style="font-size:12px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + m.name + '</div>' +
            '<div style="height:6px; background:rgba(255,255,255,0.06); border-radius:3px; margin-top:3px; overflow:hidden;">' +
                '<div style="width:' + barW + '%; height:100%; background:' + color + '; border-radius:3px;"></div>' +
            '</div>' +
        '</div>' +
        '<div style="width:60px; text-align:right; flex-shrink:0; font-size:12px;">' +
            '<div style="color:' + color + '; font-weight:700;">' + m.winRate + '%</div>' +
            '<div style="color:#8e95a5; font-size:10px;">' + advSign + m.advantage + '%</div>' +
        '</div>' +
    '</div>';
}

// ============================================================
// 📸 Social Share Card Functions (html2canvas)
// ============================================================

async function triggerCardDownload(elementId, filename) {
    const el = document.getElementById(elementId);
    if (!el) { alert('เกิดข้อผิดพลาด: ไม่พบเทมเพลตการ์ด'); return; }

    const container = document.getElementById('share-templates-container');
    const origStyle = container.style.cssText;
    container.style.cssText = 'position:fixed; left:0; top:0; z-index:99999; visibility:visible; pointer-events:none;';

    try {
        const canvas = await html2canvas(el, {
            scale: 1, useCORS: true, allowTaint: true,
            backgroundColor: null, width: 1200, height: 630, logging: false
        });
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/jpeg', 0.92);
        link.click();
    } catch(e) {
        alert('ไม่สามารถสร้างรูปภาพได้: ' + e.message);
    } finally {
        container.style.cssText = origStyle;
    }
}

function drawShareRadar(canvasId, scores) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const labels = ['GPM', 'XPM', 'KDA', 'LH', 'HeroDmg', 'Tower', 'Survival'];
    const vals = [scores.gpm, scores.xpm, scores.kda, scores.lh, scores.hdmg, scores.tdmg, scores.survival];
    const n = labels.length;
    const R = Math.min(cx, cy) - 24;

    ctx.clearRect(0, 0, w, h);

    [100, 75, 50, 25].forEach(pct => {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            const r = (pct / 120) * R;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const lx = cx + (R + 18) * Math.cos(angle);
        const ly = cy + (R + 18) * Math.sin(angle);
        ctx.fillStyle = '#c0c9d8';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], lx, ly);
    }

    ctx.beginPath();
    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        const r = (Math.min(vals[i], 120) / 120) * R;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(165,94,234,0.25)';
    ctx.fill();
    ctx.strokeStyle = '#a55eea';
    ctx.lineWidth = 2.5;
    ctx.stroke();
}

async function shareWeaknessCard() {
    const data = window.__weaknessShareData;
    if (!data) { alert('กรุณาวิเคราะห์จุดอ่อนก่อนครับ'); return; }

    document.getElementById('share-weakness-grade').textContent = data.grade;
    document.getElementById('share-weakness-grade').style.color = data.gradeColor;
    document.getElementById('share-weakness-score').textContent = 'Overall Score: ' + data.overallScore + '%';
    document.getElementById('share-weakness-winrate').innerHTML = '<i class="fa-solid fa-arrow-trend-up"></i> Win Rate: <strong>' + data.winRate + '%</strong> (' + data.matchCount + ' Games)';
    document.getElementById('share-weakness-rank').textContent = 'RANK: ' + data.rankName.toUpperCase();
    document.getElementById('share-weakness-hero-name').textContent = data.bestHeroName;
    document.getElementById('share-weakness-hero-stats').textContent = 'Win Rate: ' + data.bestHeroWR + '% (' + data.bestHeroGames + ' Games)';
    document.getElementById('share-weakness-hero-avatar').style.backgroundImage = "url('" + getHeroImageUrl(data.bestHeroName) + "')";

    drawShareRadar('share-radar-canvas', data.scores);
    await new Promise(function(r) { setTimeout(r, 300); });
    await triggerCardDownload('template-weakness-card', 'Dota2_AI_Weakness_' + data.grade + '_Grade.jpg');
}

function calculateMatchPerformance(m) {
    const role = detectMatchRole(m);
    const mmrData = StorageManager.getMmrData();
    const rankInfo = StorageManager.getRankTierInfo(mmrData.currentMmr);
    const rBench = (ROLE_BENCHMARKS[role] && ROLE_BENCHMARKS[role][rankInfo.tier])
        ? ROLE_BENCHMARKS[role][rankInfo.tier]
        : ROLE_BENCHMARKS.Core.Archon;

    const farming = Math.min(100, Math.round(((m.gold_per_min || 0) / rBench.gpm) * 100));
    const fighting = Math.min(100, Math.round((((m.kills || 0) + (m.assists || 0)) / Math.max(m.deaths || 1, 1)) / rBench.kda * 100));
    const pushing = Math.min(100, Math.round(((m.tower_damage || 0) / Math.max(rBench.tdmg, 1)) * 100));
    const survival = Math.min(100, Math.round((rBench.deaths / Math.max(m.deaths || 0.5, 0.5)) * 100));

    return { farming: farming, fighting: fighting, pushing: pushing, survival: survival, role: role };
}

async function shareMatchCard(m, heroName, isWin, gradeInfo) {
    const perf = calculateMatchPerformance(m);

    var roleLabels = { Core: 'CORE (POS 1)', Mid: 'MID (POS 2)', Offlane: 'OFFLANE (POS 3)', Support: 'SUPPORT (POS 4/5)' };
    document.getElementById('share-match-hero-role').textContent = 'ROLE: ' + (roleLabels[perf.role] || perf.role);
    document.getElementById('share-match-result').textContent = isWin ? 'VICTORY' : 'DEFEAT';
    document.getElementById('share-match-result').style.color = isWin ? '#2ecc71' : '#ff4d55';
    document.getElementById('share-match-hero-name').textContent = heroName;
    document.getElementById('share-match-kda').textContent = 'K/D/A: ' + m.kills + ' / ' + m.deaths + ' / ' + m.assists;
    document.getElementById('share-match-details').innerHTML =
        'GPM: ' + (m.gold_per_min || '—') + ' | XPM: ' + (m.xp_per_min || '—') + '<br>Last Hits: ' + (m.last_hits || '—') + ' | Hero Damage: ' + (m.hero_damage || 0).toLocaleString();
    document.getElementById('share-match-grade').textContent = gradeInfo.grade;
    document.getElementById('share-match-grade').style.color = isWin ? '#2ecc71' : '#ff9f43';

    var avgPerf = Math.round((perf.farming + perf.fighting + perf.pushing + perf.survival) / 4);
    document.getElementById('share-match-score').textContent = 'Match Score: ' + avgPerf + '%';

    document.getElementById('template-match-card').style.borderColor = isWin ? '#2ecc71' : '#ff4d55';
    document.getElementById('share-match-hero-avatar').style.backgroundImage = "url('" + getHeroImageUrl(heroName) + "')";
    document.getElementById('share-match-hero-avatar').style.borderColor = isWin ? '#2ecc71' : '#ff4d55';

    ['farming', 'fighting', 'pushing', 'survival'].forEach(function(key) {
        var val = perf[key];
        document.getElementById('share-bar-' + key).style.width = val + '%';
        document.getElementById('share-bar-' + key + '-val').textContent = val + '%';
    });

    await new Promise(function(r) { setTimeout(r, 200); });
    await triggerCardDownload('template-match-card', 'Dota2_' + heroName.replace(/ /g, '_') + '_' + gradeInfo.grade + 'Grade.jpg');
}

