// Dota 2 Rank Improver Local Storage Manager (Gamified Version)

const STORAGE_KEYS = {
    SETTINGS: 'dota2_improver_settings',
    JOURNAL: 'dota2_improver_journal',
    HERO_POOL: 'dota2_improver_hero_pool',
    DAILY_PROGRESS: 'dota2_improver_daily',
    STATS: 'dota2_improver_stats', // Level and XP
    ACHIEVEMENTS: 'dota2_improver_achievements'
};

const StorageManager = {
    // --- Cookie Helpers (365 days expiration) ---
    setCookie(name, value, days = 365) {
        try {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
        } catch (e) {
            console.log('Cookie write error:', e);
        }
    },

    getCookie(name) {
        try {
            const cname = name + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(cname) == 0) {
                    return c.substring(cname.length, c.length);
                }
            }
        } catch (e) {
            console.log('Cookie read error:', e);
        }
        return "";
    },

    // --- Settings ---
    getSettings() {
        const cookieSteamId = this.getCookie('dota2_steam_id');
        const cookieDotabuff = this.getCookie('dota2_dotabuff');
        const cookieTarget = this.getCookie('dota2_daily_target');

        const defaultSettings = {
            steamId: cookieSteamId || '',
            dotabuffLink: cookieDotabuff || '',
            dailyTarget: cookieTarget ? (parseInt(cookieTarget, 10) || 3) : 3
        };

        const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (!raw) return defaultSettings;
        try {
            const parsed = JSON.parse(raw);
            return {
                steamId: parsed.steamId || cookieSteamId || '',
                dotabuffLink: parsed.dotabuffLink || cookieDotabuff || '',
                dailyTarget: parsed.dailyTarget || (parseInt(cookieTarget, 10) || 3)
            };
        } catch (e) {
            return defaultSettings;
        }
    },

    saveSettings(settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        if (settings.steamId !== undefined) this.setCookie('dota2_steam_id', settings.steamId);
        if (settings.dotabuffLink !== undefined) this.setCookie('dota2_dotabuff', settings.dotabuffLink);
        if (settings.dailyTarget !== undefined) this.setCookie('dota2_daily_target', settings.dailyTarget.toString());
        return true;
    },

    // --- Stats (XP & Levels) ---
    getStats() {
        const defaultStats = {
            level: 1,
            xp: 0,
            requiredXp: 100
        };
        const raw = localStorage.getItem(STORAGE_KEYS.STATS);
        if (!raw) return defaultStats;
        try {
            return { ...defaultStats, ...JSON.parse(raw) };
        } catch (e) {
            return defaultStats;
        }
    },

    saveStats(stats) {
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    },

    gainXp(amount) {
        const stats = this.getStats();
        stats.xp += amount;
        
        let leveledUp = false;
        while (stats.xp >= stats.requiredXp) {
            stats.xp -= stats.requiredXp;
            stats.level += 1;
            stats.requiredXp = Math.floor(stats.requiredXp * 1.5); // Harder each level
            leveledUp = true;
        }
        
        this.saveStats(stats);
        this.checkAchievements();
        return { stats, leveledUp };
    },

    // --- Achievements ---
    getAchievements() {
        const defaultAchievements = [
            { id: 'first_journal', title: 'First Log', desc: 'บันทึกแมตช์แรกใน Journal', icon: 'fa-book', unlocked: false },
            { id: 'daily_target', title: 'Target Hit', desc: 'เล่นซ้อมครบตามเป้าหมายวัน', icon: 'fa-crosshair', unlocked: false },
            { id: 'pool_full', title: 'Hero Specialist', desc: 'มีฮีโร่ในพูลหลักครบ 3 ตัว', icon: 'fa-users-cog', unlocked: false },
            { id: 'level_5', title: 'Experienced Coach', desc: 'เก็บเลเวลโค้ชถึงเลเวล 5', icon: 'fa-trophy', unlocked: false }
        ];
        
        const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
        if (!raw) {
            localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(defaultAchievements));
            return defaultAchievements;
        }
        try {
            const current = JSON.parse(raw);
            // Quick schema sync just in case
            if (current.length !== defaultAchievements.length) {
                return defaultAchievements.map(def => {
                    const match = current.find(c => c.id === def.id);
                    return match ? { ...def, unlocked: match.unlocked } : def;
                });
            }
            return current;
        } catch (e) {
            return defaultAchievements;
        }
    },

    saveAchievements(data) {
        localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(data));
    },

    unlockAchievement(id) {
        const list = this.getAchievements();
        const index = list.findIndex(a => a.id === id);
        if (index !== -1 && !list[index].unlocked) {
            list[index].unlocked = true;
            this.saveAchievements(list);
            this.gainXp(50); // XP Reward for achievement unlock!
            return true;
        }
        return false;
    },

    checkAchievements() {
        // Check conditions
        const entries = this.getJournalEntries();
        if (entries.length >= 1) {
            this.unlockAchievement('first_journal');
        }

        const stats = this.getStats();
        if (stats.level >= 5) {
            this.unlockAchievement('level_5');
        }

        const pool = this.getHeroPool();
        if (pool.length >= 3) {
            this.unlockAchievement('pool_full');
        }

        const progress = this.getDailyProgress();
        const settings = this.getSettings();
        if (progress.completed >= settings.dailyTarget) {
            this.unlockAchievement('daily_target');
        }
    },

    // --- Daily Progress ---
    getDailyProgress() {
        const todayStr = new Date().toDateString();
        const defaultProgress = {
            date: todayStr,
            completed: 0
        };
        
        const raw = localStorage.getItem(STORAGE_KEYS.DAILY_PROGRESS);
        if (!raw) return defaultProgress;
        
        try {
            const data = JSON.parse(raw);
            if (data.date !== todayStr) {
                const resetData = { date: todayStr, completed: 0 };
                this.saveDailyProgress(resetData);
                return resetData;
            }
            return data;
        } catch (e) {
            return defaultProgress;
        }
    },

    saveDailyProgress(data) {
        localStorage.setItem(STORAGE_KEYS.DAILY_PROGRESS, JSON.stringify(data));
        this.checkAchievements();
    },

    addDailyGame() {
        const progress = this.getDailyProgress();
        progress.completed += 1;
        this.saveDailyProgress(progress);
        this.gainXp(15); // +15 XP for playing a match
        return progress;
    },

    resetDailyProgress() {
        const todayStr = new Date().toDateString();
        const resetData = { date: todayStr, completed: 0 };
        this.saveDailyProgress(resetData);
        return resetData;
    },

    // --- Journal ---
    getJournalEntries() {
        const raw = localStorage.getItem(STORAGE_KEYS.JOURNAL);
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch (e) {
            return [];
        }
    },

    saveJournalEntry(entry) {
        const entries = this.getJournalEntries();
        const newEntry = {
            id: entry.id || Date.now().toString(),
            date: entry.date || new Date().toLocaleString('th-TH'),
            hero: entry.hero,
            result: entry.result,
            kda: entry.kda || '0/0/0',
            matchId: entry.matchId || '',
            mistakes: entry.mistakes || [],
            notes: entry.notes || ''
        };
        
        entries.unshift(newEntry);
        localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
        
        // Reward XP for writing a review
        this.gainXp(25);
        this.checkAchievements();
        return newEntry;
    },

    deleteJournalEntry(id) {
        let entries = this.getJournalEntries();
        entries = entries.filter(e => e.id !== id);
        localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
        return true;
    },

    getMistakeCounts() {
        const entries = this.getJournalEntries();
        const counts = {};
        entries.forEach(entry => {
            if (entry.mistakes && Array.isArray(entry.mistakes)) {
                entry.mistakes.forEach(m => {
                    counts[m] = (counts[m] || 0) + 1;
                });
            }
        });
        return counts;
    },

    // --- Hero Pool ---
    getHeroPool() {
        const raw = localStorage.getItem(STORAGE_KEYS.HERO_POOL);
        if (!raw) {
            const defaultPool = [
                { id: '1', name: 'Juggernaut', role: 'Pos 1 (Carry)', timing: 'Battle Fury (นาที 12-14)', tips: 'เน้นฟาร์มเลนใกล้ป่าดึงเลนเซฟ รักษารอบครีปชน หลีกเลี่ยงไฟต์เปลืองตัวจนกว่าจะได้ฟิวรี่' },
                { id: '2', name: 'Phantom Assassin', role: 'Pos 1 (Carry)', timing: 'Desolator (นาที 12-15)', tips: 'ใช้ Blur ช่วยซ่อนวิชั่นป่า เลือกเป้าหมายแนวหลังตัวอ่อนแอในไฟต์ก่อนเสมอ' },
                { id: '3', name: 'Shadow Fiend', role: 'Pos 2 (Mid)', timing: 'Dragon Lance / BKB (นาที 14-17)', tips: 'เก็บ Soul ให้เต็ม คุมเลนกลางดันครีปไว เดินแก๊งพร้อม Blink Dagger' },
                { id: '4', name: 'Invoker', role: 'Pos 2 (Mid)', timing: 'Orchid / Aghanim (นาที 13-16)', tips: 'ฝึก Invoke สกิลคอมโบ Cold Snap + Meteor + Deafening Blast ให้ชิน' },
                { id: '5', name: 'Doom', role: 'Pos 3 (Offlane)', timing: 'Blink Dagger / BKB (นาที 13-16)', tips: 'ใช้ Doom ปิดตัวหลักศัตรู กินครีปป่าเอาบัฟเกราะและรีเจนค้ำไฟต์' },
                { id: '6', name: 'Axe', role: 'Pos 3 (Offlane)', timing: 'Blink Dagger (นาที 11-14)', tips: 'Blink + Call กลางดงศัตรู รอกด Culling Blade Executed ศัตรูเลือดต่ำ' },
                { id: '7', name: 'Hoodwink', role: 'Pos 4 (Soft Support)', timing: 'Gleipnir (นาที 15-18)', tips: "ยิง Bushwhack ล็อคศัตรูติดต้นไม้ Sharpshooter ยิงไกลเจาะตัวคีย์" },
                { id: '8', name: 'Pudge', role: 'Pos 4 (Soft Support)', timing: 'Blink Dagger (นาที 12-15)', tips: 'ปักหวอดซุ่มก่อนโยน Meat Hook Dismember ล็อคตัวศัตรูชะงัก' },
                { id: '9', name: 'Treant Protector', role: 'Pos 5 (Hard Support)', timing: 'Aghanim Shard / Glimmer (นาที 15-18)', tips: ' Living Armor ฮีลป้อมและเพื่อนร่วมทีม Overgrowth เปิดไฟต์ใหญ่' },
                { id: '10', name: 'Lion', role: 'Pos 5 (Hard Support)', timing: 'Blink Dagger / Aether Lens (นาที 14-17)', tips: 'Hex + Impale ล็อคศัตรูนาน ปิดด้วย Finger of Death One-shot ตัวคีย์' }
            ];
            localStorage.setItem(STORAGE_KEYS.HERO_POOL, JSON.stringify(defaultPool));
            return defaultPool;
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            return [];
        }
    },

    saveHeroPoolHero(hero) {
        const pool = this.getHeroPool();
        const newHero = {
            id: Date.now().toString(),
            name: hero.name,
            role: hero.role,
            timing: hero.timing || 'N/A',
            tips: hero.tips || ''
        };
        pool.push(newHero);
        localStorage.setItem(STORAGE_KEYS.HERO_POOL, JSON.stringify(pool));
        
        this.gainXp(10); // +10 XP for expanding hero pool
        this.checkAchievements();
        return newHero;
    },

    deleteHeroPoolHero(id) {
        let pool = this.getHeroPool();
        pool = pool.filter(h => h.id !== id);
        localStorage.setItem(STORAGE_KEYS.HERO_POOL, JSON.stringify(pool));
        return true;
    },

    // --- MMR Tracking & Rank Tiers ---
    getMmrData() {
        const defaultMmr = {
            currentMmr: 2200, // Archon I default
            history: [
                { date: 'Initial', mmr: 2200, change: 0, hero: 'Setup' }
            ]
        };
        const raw = localStorage.getItem('dota2_improver_mmr_data');
        if (!raw) return defaultMmr;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return defaultMmr;
        }
    },

    saveMmrData(data) {
        localStorage.setItem('dota2_improver_mmr_data', JSON.stringify(data));
    },

    updateMmrFromMatch(isWin, heroName) {
        const data = this.getMmrData();
        const change = isWin ? 25 : -25;
        data.currentMmr = Math.max(0, data.currentMmr + change);
        data.history.push({
            date: new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            mmr: data.currentMmr,
            change: change,
            hero: heroName || 'Match'
        });
        if (data.history.length > 25) data.history.shift(); // Keep last 25
        this.saveMmrData(data);
        return data;
    },

    getRankTierInfo(mmr) {
        if (mmr >= 5632) return { tier: 'Immortal', name: 'Immortal 👑', color: '#e5c158', badge: '🛡️ Immortal', min: 5632, nextRank: 'Top Leaderboard 🌟' };
        if (mmr >= 4620) return { tier: 'Divine', name: 'Divine 💎', color: '#c3a1ff', badge: '💎 Divine', min: 4620, nextRank: 'Immortal (5,632+ MMR)' };
        if (mmr >= 3850) return { tier: 'Ancient', name: 'Ancient ⚔️', color: '#4bcffa', badge: '⚔️ Ancient', min: 3850, nextRank: 'Divine (4,620 MMR)' };
        if (mmr >= 3080) return { tier: 'Legend', name: 'Legend 🛡️', color: '#00d2d3', badge: '🛡️ Legend', min: 3080, nextRank: 'Ancient (3,850 MMR)' };
        if (mmr >= 2310) return { tier: 'Archon', name: 'Archon 👑', color: '#ff9f43', badge: '👑 Archon', min: 2310, nextRank: 'Legend (3,080 MMR)' };
        if (mmr >= 1540) return { tier: 'Crusader', name: 'Crusader 🗡️', color: '#2e86de', badge: '🗡️ Crusader', min: 1540, nextRank: 'Archon (2,310 MMR)' };
        if (mmr >= 770)  return { tier: 'Guardian', name: 'Guardian 🛡️', color: '#54a0ff', badge: '🛡️ Guardian', min: 770, nextRank: 'Crusader (1,540 MMR)' };
        return { tier: 'Herald', name: 'Herald 📜', color: '#8395a7', badge: '📜 Herald', min: 0, nextRank: 'Guardian (770 MMR)' };
    }
};
