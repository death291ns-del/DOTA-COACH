// Dota 2 Rank Improver App Controller (Feature-Rich Version)

const ROLE_DATA = {
    pos1: {
        title: "Position 1 - Carry (ฟาร์มและปิดสกอร์เกม)",
        duties: [
            "Laning: โฟกัสเก็บ Last Hit ให้ได้ 50-60 ตัวใน 10 นาทีแรก และตอดเลือดศัตรูเมื่อเข้าทำดาเมจได้",
            "Mid-Game: หลีกเลี่ยงไฟต์สุ่มเสี่ยง เน้นลากครีปดันเลนปลอดภัย (Split push) และเข้าป่าเพื่อรักษาระดับ Gold Per Minute (GPM)",
            "Late-Game: ยืนแนวหลังรอตำแหน่งทีมเปิดไฟต์ ใช้ดาเมจกายภาพบุกทำลายคีย์เป้าหมายและสิ่งก่อสร้างหลักเพื่อชนะเกม"
        ],
        metrics: [
            { name: "LH @ 10 mins", target: "55+ ครีป", desc: "เกณฑ์ระบุความสำเร็จการยืนเลนช่วงต้นเกม" },
            { name: "Net Worth @ 20 mins", target: "11,000+ Gold", desc: "เกณฑ์ระบุทิศทางการฟาร์มระดับสากล" },
            { name: "Average GPM", target: "650+ GPM", desc: "ตัวชี้วัดความสามารถการฟาร์มป่าและเคลียร์ครีปดัน" }
        ],
        traps: [
            "ยืนเลนนานเกินไปจนโดนแก๊งตายซ้ำๆ ตอนนาทีที่ 8-10 (เมื่อออฟเลนศัตรูเลเวล 6)",
            "วาปลงมาช่วยไฟต์ฝุ่นตลบที่ไม่มีนัยสำคัญจนเสียจังหวะการฟาร์มทอง",
            "ไม่ยอมพกวาป หรือไม่ยอมดันเลนเพื่อสร้างช่องว่างการฟาร์ม (Dead Lane)"
        ]
    },
    pos2: {
        title: "Position 2 - Midlane (คุมจังหวะและทำเกม)",
        duties: [
            "Laning: ชิงความได้เปรียบเลเวล 6 ยืนคุมเลนกลางและบล็อกขัดขวางการฟาร์มของคู่ต่อสู้",
            "Mid-Game: คุมรูนแม่น้ำทุกๆ 2 นาที เดินแก๊งช่วยเหลือเลนอื่นเมื่อสุ่มได้รูนที่ได้เปรียบ (เช่น Invisibility, Haste)",
            "Late-Game: ดึงทักษะสกิลสลับตำแหน่งสร้างจังหวะรุกรับ และปั่นป่วนแถวหลังฝ่ายตรงข้าม"
        ],
        metrics: [
            { name: "Denies @ 10 mins", target: "10+ ครีป", desc: "การกดยับยั้งเลเวลเลนกลางศัตรู" },
            { name: "River Rune Control", target: "70%+", desc: "สถิติการชิงเก็บรูนแม่น้ำทั้งหมด" },
            { name: "Hero Damage Share", target: "25%+", desc: "ส่วนแบ่งทำดาเมจรวมกับทีม" }
        ],
        traps: [
            "ลืมกดยังเลนกลางหรือถอนตัวไปแก๊งเลนอื่นโดยปล่อยให้ป้อมเลนกลางโดนดันแตกไว",
            "ปล่อยให้รูนแม่น้ำตกอยู่ในมือเลนกลางฝั่งตรงข้ามจนเลนกลางศัตรูคุมแผนที่ได้ทั้งหมด"
        ]
    },
    pos3: {
        title: "Position 3 - Offlane (เปิดไฟต์และแทงค์ทีม)",
        duties: [
            "Laning: กดดันกดพลังแครี่ศัตรูให้ฟาร์มลำบากที่สุด ชิงทำลายป้อม 1 ศัตรูเพื่อยึดป่าเลนล่าง/บน",
            "Mid-Game: ถือไอเทมสร้างจังหวะ (Aura, Blink Dagger) เดินคุมไฟต์แถวหน้าและดึงความสนใจจากตัวหลักทีม",
            "Late-Game: ล่อซื้อสกิลศัตรู ยืนค้ำไฟต์เพื่อคุ้มกันแนวหลังของทีม"
        ],
        metrics: [
            { name: "Tower 1 Destroy Time", target: "< 12 นาที", desc: "ตัววัดความสำเร็จการยึดพื้นที่เลนของแครี่ศัตรู" },
            { name: "Blink Dagger Timing", target: "< 15 นาที", desc: "เป้าหมายเวลาชิ้นส่วนเปิดไฟต์ยอดนิยม" },
            { name: "Damage Received Share", target: "30%+", desc: "ปริมาณรับดาเมจแทนทีมในไฟต์" }
        ],
        traps: [
            "เล่นกล้าๆ กลัวๆ ไม่ออกของสำหรับค้ำไฟต์หรือเปิดไฟต์ ดึงเวลาฟาร์มของแครี่ตัวเอง",
            "ฟาร์มทับซ้อนพื้นที่ป่าส่วนปลอดภัยที่ควรเหลือไว้ให้แครี่เล่น"
        ]
    },
    pos4: {
        title: "Position 4 - Soft Support (โรมมิ่งและสร้างความปั่นป่วน)",
        duties: [
            "Laning: ตอดกวนแครี่ศัตรู ดึงครีปเล็กมาชน ดึงรูน Bounty และเตรียมวาปช่วยเลนกลาง",
            "Mid-Game: เดินคุมเลนร่วมกับโรมมิ่งช่วยเลนกลาง ทำลายหวอดศัตรู (De-ward)",
            "Late-Game: ออกไอเทมคุ้มกัน (Force Staff, Glimmer) หรือไอเทมยึดไฟต์เพื่อเปลี่ยนเกม"
        ],
        metrics: [
            { name: "Sentry Wards Bought", target: "12+ ชิ้น", desc: "การขัดขวางสายตาศัตรูและการทำลายวิชั่น" },
            { name: "Kill Participation", target: "50%+", desc: "สถิติมีส่วนร่วมในคะแนนการคิล" },
            { name: "Save Items Timing", target: "1-2 ชิ้น @ 22 นาที", desc: "ความไวในการครอบครองไอเทมสนับสนุนหลัก" }
        ],
        traps: [
            "ปล่อยให้ Pos 3 ยืนเลนคนเดียวโดนแครี่และซัพศัตรูกดดันจนเสียเลนกลางคัน",
            "ออกของเน้นทำดาเมจตัวเอง (เช่น Dagon) แทนที่จะทำของมาสนับสนุนรักษาชีวิตตัวแครี่"
        ]
    },
    pos5: {
        title: "Position 5 - Hard Support (ดูแลชีวิตแครี่และคุมแผนที่)",
        duties: [
            "Laning: แย่งชิงพื้นที่คุมป่า ลากครีปดึงเลนเซฟให้คงที่ ซื้อยาฟื้นฟูเลือดส่งให้แครี่สม่ำเสมอ",
            "Mid-Game: รักษาพื้นที่ปลอดภัย ปักหวอดป้องกันจุดฟาร์มแครี่ คอยเดินประคองข้างหลังเพื่อแก้ทางซุ่มโจมตี",
            "Late-Game: สื่อสารทิศทางการบุก ยืนหลบขอบเขตไฟต์ คอยกดเซฟเพื่อนและควบคุมสกิลสกัดศัตรู"
        ],
        metrics: [
            { name: "Camp Pulled Count", target: "4+ ครั้ง", desc: "สถิติจำนวนการลากดึงเลนช่วง 10 นาทีแรก" },
            { name: "Observer Wards Uptime", target: "85%+", desc: "ระยะเวลาความสมบูรณ์ของจุดหวอดสังเกตการณ์บนแมพ" },
            { name: "Deaths Share in Team", target: "< 25%", desc: "พยายามเอาตัวรอดไม่ตายเยอะเกินไปแม้เป็นซัพพอร์ต" }
        ],
        traps: [
            "ขโมย Last Hit ครีปแครี่ หรือตีครีปเลนเล่นจนเสียความสมดุลการชนครีปเลน",
            "ไม่พกใบวาร์ป หรือเดินปักหวอดคนเดียวสุ่มเสี่ยงในจุดไม่มีข้อมูลจนโดนฆ่าฟรี"
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

document.addEventListener('DOMContentLoaded', () => {
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
    
    let dutiesHtml = '';
    data.duties.forEach(d => {
        dutiesHtml += `<li>${d}</li>`;
    });

    let metricsHtml = '';
    data.metrics.forEach(m => {
        metricsHtml += `
            <div class="metric-card">
                <div class="metric-card-title">${m.name}: <span class="gold-text">${m.target}</span></div>
                <div class="metric-card-desc">${m.desc}</div>
            </div>
        `;
    });

    let trapsHtml = '';
    data.traps.forEach(t => {
        trapsHtml += `<li>${t}</li>`;
    });

    container.innerHTML = `
        <div class="role-details-wrapper">
            <div class="role-details-title-row">
                <h2>${data.title}</h2>
            </div>
            
            <div class="role-details-grid">
                <div class="role-main-column">
                    <div class="role-section-box">
                        <h4><i class="fa-solid fa-star"></i> หน้าที่หลักและขั้นตอนการเอาชนะ (Core Objectives)</h4>
                        <ul class="role-list">
                            ${dutiesHtml}
                        </ul>
                    </div>
                    
                    <div class="role-section-box">
                        <h4><i class="fa-solid fa-triangle-exclamation"></i> ข้อผิดพลาดหลักที่ขัดขวางการขึ้นแรงก์ (Common Traps)</h4>
                        <ul class="role-list">
                            ${trapsHtml}
                        </ul>
                    </div>
                </div>
                
                <div class="role-sidebar-column">
                    <h4><i class="fa-solid fa-chart-line"></i> ตัวชี้วัดเป้าหมาย (KPI)</h4>
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

async function syncOpenDotaMatches() {
    const settings = StorageManager.getSettings();
    const listBody = document.getElementById('api-matches-list');
    
    if (!settings.steamId) {
        alert('กรุณาไปที่หน้า Settings และตั้งค่า Steam ID ก่อนทำการเชื่อมโยงข้อมูล');
        switchTab('settings');
        return;
    }
    
    listBody.innerHTML = `<tr><td colspan="5" class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> กำลังดึงข้อมูลล่าสุดจาก OpenDota API...</td></tr>`;
    
    try {
        const response = await fetch(`https://api.opendota.com/api/players/${settings.steamId}/matches?limit=20`);
        if (!response.ok) throw new Error('API request failed');
        
        const matches = await response.json();
        
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
        badge.className = 'badge badge-success';
        badge.textContent = 'Active Player Sync';
        
        fetchPlayerName(settings.steamId);
        fetchCoachAnalysis(settings.steamId);
        renderDashboard(); // Re-render target rings
        
    } catch (e) {
        console.error(e);
        listBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">เกิดข้อผิดพลาดในการดึงข้อมูล โปรดตรวจสอบ Steam ID หรือลองใหม่อีกครั้ง</td></tr>`;
    }
}

async function fetchPlayerName(steamId) {
    try {
        const response = await fetch(`https://api.opendota.com/api/players/${steamId}`);
        if (response.ok) {
            const data = await response.json();
            if (data.profile) {
                document.getElementById('sidebar-player-name').textContent = data.profile.personaname;
                document.getElementById('sidebar-player-rank').textContent = `Rank Tier: ${data.leaderboard_rank ? 'Rank #' + data.leaderboard_rank : 'Estimated Rank'}`;
                
                if (data.profile.avatar) {
                    const avatarContainer = document.querySelector('.avatar-placeholder');
                    avatarContainer.innerHTML = `<img src="${data.profile.avatar}" style="width: 100%; height: 100%; border-radius: 50%;">`;
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
                <a href="https://www.dotabuff.com/matches/${m.match_id}" target="_blank" class="btn btn-small btn-secondary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Dotabuff
                </a>
            </td>
            <td>
                <button class="btn btn-small btn-primary btn-fast-log" data-hero="${heroName}" data-result="${isWin?'win':'lose'}" data-kda="${kda}" data-matchid="${m.match_id}">
                    <i class="fa-solid fa-plus"></i> บันทึกข้อผิดพลาด
                </button>
            </td>
        `;
        
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

    if (steamEl) steamEl.value = settings.steamId || '';
    if (dotaEl) dotaEl.value = settings.dotabuffLink || '';
    if (targetEl) targetEl.value = settings.dailyTarget || 3;
    
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
            dailyTarget: targetEl ? (parseInt(targetEl.value, 10) || 3) : 3
        };
        StorageManager.saveSettings(currentSettings);
    };

    if (steamEl) steamEl.addEventListener('input', autoSaveHandler);
    if (dotaEl) dotaEl.addEventListener('input', autoSaveHandler);
    if (targetEl) targetEl.addEventListener('input', autoSaveHandler);
    
    const form = document.getElementById('settings-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newSettings = {
                steamId: steamEl ? steamEl.value.trim() : '',
                dotabuffLink: dotaEl ? dotaEl.value.trim() : '',
                dailyTarget: targetEl ? (parseInt(targetEl.value) || 3) : 3
            };
            
            StorageManager.saveSettings(newSettings);
            
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
            
            alert('✅ บันทึกข้อมูลและคุกกี้ (Cookies) เรียบร้อยแล้ว! ระบบจะจำข้อมูลของคุณตลอดไป');
            switchTab('dashboard');
        });
    }
    
    const syncBtn = document.getElementById('btn-sync-opendota');
    if (syncBtn) syncBtn.addEventListener('click', syncOpenDotaMatches);
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

function initPatchTierList() {
    const roleBtns = document.querySelectorAll('#tierlist-role-group button');
    const container = document.getElementById('tierlist-content-container');

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

