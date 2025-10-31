// ================================================
// Firebase Configuration  
// ================================================
const firebaseConfig = {
  apiKey: "AIzaSyB4wsKzG-aH2HmvwLvl6aBx0xBDv7Bbc74",
  authDomain: "road-trip-game-367c4.firebaseapp.com",
  databaseURL: "https://road-trip-game-367c4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "road-trip-game-367c4",
  storageBucket: "road-trip-game-367c4.firebasestorage.app",
  messagingSenderId: "902568353621",
  appId: "1:902568353621:web:db7fff225cd7b3dacf19dc",
  measurementId: "G-RW8WMCFS1W"
};

// ================================================
// ภารกิจทั้งหมด
// ================================================
const missions = [
    { id: 1, title: "🐕 ถ่ายรูปกับหมา", description: "พบเจอหมาและถ่ายรูปด้วย", points: 10 },
    { id: 2, title: "🐱 ถ่ายรูปกับแมว", description: "พบเจอแมวและถ่ายรูปด้วย", points: 15 },
    { id: 3, title: "💰 หาป้าย TrueMoney", description: "ถ่ายรูปกับป้าย TrueMoney Wallet", points: 20 },
    { id: 4, title: "🏪 หาร้าน 7-Eleven", description: "ถ่ายรูปหน้าร้าน 7-Eleven", points: 10 },
    { id: 5, title: "⛽ หาปั๊มน้ำมัน PTT", description: "ถ่ายรูปที่ปั๊ม PTT", points: 15 },
    { id: 6, title: "🌳 ถ่ายรูปกับต้นไม้ใหญ่", description: "หาต้นไม้ใหญ่และถ่ายรูปด้วย", points: 10 },
    { id: 7, title: "🚗 รถสีแดง", description: "ถ่ายรูปกับรถสีแดง", points: 10 },
    { id: 8, title: "🍜 ร้านอาหารริมทาง", description: "หาร้านอาหารและถ่ายรูป", points: 15 },
    { id: 9, title: "🏛️ วัดหรือศาลเจ้า", description: "ถ่ายรูปที่วัดหรือศาลเจ้า", points: 25 },
    { id: 10, title: "🌅 ทิวทัศน์สวยๆ", description: "ถ่ายภาพทิวทัศน์ที่สวยงาม", points: 20 },
    { id: 11, title: "🚜 รถแทรกเตอร์", description: "หายานพาหนะเกษตรและถ่ายรูป", points: 30 },
    { id: 12, title: "🐮 วัว ควาย หรือแพะ", description: "พบสัตว์ในฟาร์มและถ่ายรูป", points: 25 },
    { id: 13, title: "🌾 ทุ่งนา", description: "ถ่ายรูปกับทุ่งนา", points: 15 },
    { id: 14, title: "🏔️ ภูเขา", description: "ถ่ายรูปกับภูเขา", points: 20 },
    { id: 15, title: "📸 รูปหมู่ทีม", description: "ถ่ายรูปหมู่สมาชิกทุกคนในทีม", points: 50 }
];

// ================================================
// Global Variables
// ================================================
let db;
let currentTeamId = null;
let currentUserName = null;
let currentMissionId = null;
let currentGame = null; // 'snapventure' or 'wordguessing'
let currentAdminGame = 'snapventure'; // default admin game

// ================================================
// LocalStorage Keys
// ================================================
const STORAGE_TEAM_ID = 'roadtrip_team_id';
const STORAGE_USER_NAME = 'roadtrip_user_name';
const STORAGE_CURRENT_GAME = 'roadtrip_current_game';

// ================================================
// Game Configuration
// ================================================
const GAME_CONFIG = {
    snapventure: {
        name: 'Snap Venture',
        icon: '📸',
        description: 'ถ่ายรูปตามภารกิจ',
        missionType: 'photo' // only photo missions
    },
    wordguessing: {
        name: 'Word Guessing',
        icon: '💭',
        description: 'ตอบคำถามทายคำ',
        missionType: 'quiz' // only quiz missions
    }
};

// ================================================
// Initialize Default Missions and Settings
// ================================================
function initializeDefaultMissions() {
    // สร้างภารกิจเริ่มต้น
    firebase.database().ref('missions').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            console.log('🎯 สร้างภารกิจเริ่มต้น...');
            const defaultMissions = [
                { id: 1, title: "🐕 ถ่ายรูปกับหมา", description: "พบเจอหมาและถ่ายรูปด้วย", points: 10 },
                { id: 2, title: "🐱 ถ่ายรูปกับแมว", description: "พบเจอแมวและถ่ายรูปด้วย", points: 15 },
                { id: 3, title: "💰 หาป้าย TrueMoney", description: "ถ่ายรูปกับป้าย TrueMoney Wallet", points: 20 },
                { id: 4, title: "🏪 หาร้าน 7-Eleven", description: "ถ่ายรูปหน้าร้าน 7-Eleven", points: 10 },
                { id: 5, title: "⛽ หาปั๊มน้ำมัน PTT", description: "ถ่ายรูปที่ปั๊ม PTT", points: 15 },
                { id: 6, title: "🌳 ถ่ายรูปกับต้นไม้ใหญ่", description: "หาต้นไม้ใหญ่และถ่ายรูปด้วย", points: 10 },
                { id: 7, title: "🚗 รถสีแดง", description: "ถ่ายรูปกับรถสีแดง", points: 10 },
                { id: 8, title: "🍜 ร้านอาหารริมทาง", description: "หาร้านอาหารและถ่ายรูป", points: 15 },
                { id: 9, title: "🏛️ วัดหรือศาลเจ้า", description: "ถ่ายรูปที่วัดหรือศาลเจ้า", points: 25 },
                { id: 10, title: "🌅 ทิวทัศน์สวยๆ", description: "ถ่ายภาพทิวทัศน์ที่สวยงาม", points: 20 },
                { id: 11, title: "🚜 รถแทรกเตอร์", description: "หายานพาหนะเกษตรและถ่ายรูป", points: 30 },
                { id: 12, title: "🐮 วัว ควาย หรือแพะ", description: "พบสัตว์ในฟาร์มและถ่ายรูป", points: 25 },
                { id: 13, title: "🌾 ทุ่งนา", description: "ถ่ายรูปกับทุ่งนา", points: 15 },
                { id: 14, title: "🏔️ ป้ายชื่อจังหวัด", description: "ถ่ายรูปกับป้ายชื่อจังหวัด", points: 30 },
                { id: 15, title: "🦆 เป็ด ห่าน หรือไก่", description: "พบสัตว์ปีกและถ่ายรูป", points: 20 }
            ];
            
            defaultMissions.forEach(mission => {
                firebase.database().ref('missions').push(mission);
            });
            console.log('✅ สร้างภารกิจเริ่มต้นเสร็จสิ้น');
        }
    });
    
    // ตั้งค่าจำนวนสมาชิกเริ่มต้น
    firebase.database().ref('settings/maxMembers').once('value', (snapshot) => {
        if (!snapshot.exists()) {
            firebase.database().ref('settings/maxMembers').set(5);
            console.log('✅ ตั้งค่าจำนวนสมาชิกเริ่มต้น: 5 คน');
        }
    });
}

// ================================================
// Initialize Firebase
// ================================================
function initFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            console.error('❌ Firebase SDK ยังไม่ได้ถูกโหลด');
            return;
        }

        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        console.log('✅ Firebase initialized successfully');
        
        // สร้างภารกิจเริ่มต้นถ้ายังไม่มี
        initializeDefaultMissions();
        
        // ตรวจสอบว่ามี session เดิมหรือไม่
        checkExistingSession();
        
        // 🎯 Check for auto-join parameters after Firebase is ready
        checkAutoJoinParams();
        
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
    }
}

// ================================================
// Check Auto-Join Parameters
// ================================================
async function checkAutoJoinParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const autoCode = urlParams.get('code');
    const autoTeam = urlParams.get('team');
    const autoName = urlParams.get('name');
    
    console.log('🎮 URL Params:', { autoCode, autoTeam, autoName });
    
    // ถ้ามีครบทั้ง code และ name → Auto-join เลย!
    if (autoCode && autoName) {
        console.log('🚀 Auto-joining with:', { code: autoCode, name: autoName });
        
        try {
            // 1. เลือกเกม Word Guessing อัตโนมัติ
            currentGame = 'wordguessing';
            localStorage.setItem(STORAGE_CURRENT_GAME, 'wordguessing');
            console.log('✅ Selected game: Word Guessing');
            
            // 2. ซ่อนหน้า welcome
            const welcomeEl = document.getElementById('welcome');
            if (welcomeEl) {
                welcomeEl.style.display = 'none';
            }
            
            // 3. แสดง loading message
            document.body.insertAdjacentHTML('beforeend', `
                <div id="autoJoinLoading" style="
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    flex-direction: column;
                    gap: 20px;
                ">
                    <div style="font-size: 48px;">🎮</div>
                    <div style="color: white; font-size: 24px; font-weight: bold;">กำลังเข้าเกม...</div>
                    <div style="color: #4ECDC4; font-size: 16px;">รหัส: ${autoCode.toUpperCase()}</div>
                    <div style="color: #4ECDC4; font-size: 16px;">ชื่อ: ${autoName}</div>
                    <div class="loading" style="margin-top: 20px;"></div>
                </div>
            `);
            
            // 4. Auto-join ทีม
            const teamCodeUpper = autoCode.trim().toUpperCase();
            const memberName = autoName.trim();
            const memberKey = sanitizeFirebaseKey(memberName); // แปลงชื่อให้ปลอดภัย
            
            // ลอง join ผ่านห้องที่ Admin สร้างก่อน
            const roomRef = db.ref(`games/wordguessing/rooms/${teamCodeUpper}`);
            const roomSnapshot = await roomRef.once('value');
            
            if (roomSnapshot.exists()) {
                // พบห้องที่ Admin สร้างไว้
                const roomData = roomSnapshot.val();
                
                // ตรวจสอบว่าชื่อซ้ำหรือไม่
                if (roomData.members && roomData.members[memberKey]) {
                    alert('⚠️ ชื่อนี้มีคนใช้แล้วในห้อง!\nกรุณาใช้ชื่ออื่น');
                    document.getElementById('autoJoinLoading').remove();
                    location.reload();
                    return;
                }
                
                // ตรวจสอบจำนวนสมาชิกสูงสุด
                const maxMembers = roomData.maxMembers || 5;
                const currentMemberCount = roomData.members ? Object.keys(roomData.members).length : 0;
                
                if (currentMemberCount >= maxMembers) {
                    alert(`❌ ห้องเต็มแล้ว!\nห้องนี้มีสมาชิกครบ ${maxMembers} คนแล้ว`);
                    document.getElementById('autoJoinLoading').remove();
                    location.reload();
                    return;
                }
                
                // เพิ่มสมาชิกเข้าห้อง (ใช้ memberKey แต่เก็บ name จริง)
                await roomRef.child(`members/${memberKey}`).set({
                    name: memberName, // เก็บชื่อจริง
                    role: 'member',
                    joinedAt: Date.now()
                });
                
                currentTeamId = teamCodeUpper;
                currentUserName = memberName;
                
                // สร้าง team entry
                const teamData = {
                    name: roomData.name,
                    teamCode: teamCodeUpper,
                    game: 'wordguessing',
                    score: 0,
                    createdAt: roomData.createdAt || Date.now(),
                    isRoom: true,
                    members: {},
                    missions: {}
                };
                
                const teamRef = db.ref(`games/wordguessing/teams/${teamCodeUpper}`);
                const teamSnapshot = await teamRef.once('value');
                if (!teamSnapshot.exists()) {
                    await teamRef.set(teamData);
                }
                
                await teamRef.child(`members/${memberKey}`).set({
                    name: memberName, // เก็บชื่อจริง
                    role: 'member',
                    joinedAt: Date.now()
                });
                
                // บันทึก session
                saveSession(teamCodeUpper, memberName);
                
                // ลบ loading
                document.getElementById('autoJoinLoading').remove();
                
                // เข้าสู่หน้าเกม
                document.getElementById('gameBoard').style.display = 'block';
                loadGameBoard();
                
                console.log('✅ Auto-join successful!');
                
            } else {
                // ไม่พบห้อง ลองหาทีมปกติ
                let teamRef = db.ref(`games/wordguessing/teams/${teamCodeUpper}`);
                let snapshot = await teamRef.once('value');
                
                if (!snapshot.exists()) {
                    alert('❌ ไม่พบทีมหรือห้องนี้! กรุณาตรวจสอบรหัสอีกครั้ง');
                    document.getElementById('autoJoinLoading').remove();
                    location.reload();
                    return;
                }
                
                const teamData = snapshot.val();
                
                // ตรวจสอบว่าชื่อซ้ำหรือไม่
                if (teamData.members && teamData.members[memberKey]) {
                    alert('⚠️ ชื่อนี้มีคนใช้แล้วในทีม!\nกรุณาใช้ชื่ออื่น');
                    document.getElementById('autoJoinLoading').remove();
                    location.reload();
                    return;
                }
                
                // เพิ่มสมาชิกเข้าทีม (ใช้ memberKey แต่เก็บ name จริง)
                await teamRef.child(`members/${memberKey}`).set({
                    name: memberName, // เก็บชื่อจริง
                    role: 'member',
                    joinedAt: Date.now()
                });
                
                currentTeamId = teamCodeUpper;
                currentUserName = memberName;
                
                saveSession(teamCodeUpper, memberName);
                
                document.getElementById('autoJoinLoading').remove();
                document.getElementById('gameBoard').style.display = 'block';
                loadGameBoard();
                
                console.log('✅ Auto-join successful!');
            }
            
        } catch (error) {
            console.error('❌ Auto-join error:', error);
            alert('เกิดข้อผิดพลาด: ' + error.message);
            if (document.getElementById('autoJoinLoading')) {
                document.getElementById('autoJoinLoading').remove();
            }
            location.reload();
        }
    } else if (autoCode) {
        // มีแค่ code ไม่มี name → แสดง form ให้กรอกชื่อ
        setTimeout(() => {
            const teamCodeInput = 
                document.getElementById('teamCodeInput') ||
                document.getElementById('teamCode') ||
                document.querySelector('input[name="teamCode"]') ||
                document.querySelector('input[placeholder*="รหัส"]') ||
                document.querySelector('input[placeholder*="code"]') ||
                document.querySelector('input[placeholder*="Code"]');
            
            if (teamCodeInput) {
                teamCodeInput.value = autoCode.toUpperCase();
                teamCodeInput.style.background = '#d4edda';
                teamCodeInput.style.borderColor = '#28a745';
                
                const nameInput = 
                    document.getElementById('memberNameInput') ||
                    document.getElementById('playerName') ||
                    document.getElementById('name') ||
                    document.querySelector('input[placeholder*="ชื่อ"]') ||
                    document.querySelector('input[placeholder*="name"]');
                
                if (nameInput) {
                    nameInput.focus();
                }
            }
        }, 1000);
    }
}

// ================================================
// Check Existing Session
// ================================================
async function checkExistingSession() {
    const savedTeamId = localStorage.getItem(STORAGE_TEAM_ID);
    const savedUserName = localStorage.getItem(STORAGE_USER_NAME);
    const savedGame = localStorage.getItem(STORAGE_CURRENT_GAME);
    
    if (savedTeamId && savedUserName && savedGame) {
        // ตรวจสอบว่าทีมยังมีอยู่หรือไม่
        try {
            const teamRef = db.ref(`games/${savedGame}/teams/${savedTeamId}`);
            const snapshot = await teamRef.once('value');
            
            if (snapshot.exists()) {
                currentTeamId = savedTeamId;
                currentUserName = savedUserName;
                currentGame = savedGame;
                
                // กลับไปหน้าเกมอัตโนมัติ
                document.getElementById('welcome').style.display = 'none';
                document.getElementById('gameBoard').style.display = 'block';
                loadGameBoard();
                
                const gameName = GAME_CONFIG[savedGame].name;
                console.log(`✅ กลับเข้าทีม ${gameName}:`, savedTeamId, 'ชื่อ:', savedUserName);
            } else {
                // ทีมถูกลบแล้ว ล้างข้อมูล
                clearSession();
            }
        } catch (error) {
            console.error('Error checking session:', error);
            clearSession();
        }
    }
}

// ================================================
// Save Session
// ================================================
function saveSession(teamId, userName) {
    localStorage.setItem(STORAGE_TEAM_ID, teamId);
    localStorage.setItem(STORAGE_USER_NAME, userName);
    localStorage.setItem(STORAGE_CURRENT_GAME, currentGame);
}

// ================================================
// Clear Session
// ================================================
function clearSession() {
    localStorage.removeItem(STORAGE_TEAM_ID);
    localStorage.removeItem(STORAGE_USER_NAME);
    localStorage.removeItem(STORAGE_CURRENT_GAME);
    currentTeamId = null;
    currentUserName = null;
    currentGame = null;
}

// ================================================
// Generate Team Code
// ================================================
function generateTeamCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// ================================================
// Sanitize Name for Firebase Key
// ================================================
function sanitizeFirebaseKey(name) {
    // Firebase ไม่อนุญาต: . # $ [ ] /
    // แปลง . เป็น _ และลบตัวอักษรที่ไม่อนุญาตออก
    return name
        .replace(/\./g, '_')  // แปลง . เป็น _
        .replace(/[#$\[\]\/]/g, '')  // ลบตัวอักษรที่ไม่อนุญาต
        .trim();
}

// ================================================
// Navigation Functions
// ================================================
// สำหรับ Snapventure (Solo Play)
function showCreateSoloRoom() {
    if (!currentGame) {
        alert(t('selectGameFirst'));
        return;
    }
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('createTeam').style.display = 'block';
    
    // อัพเดต UI ให้เหมาะกับโหมดเดี่ยว
    const header = document.querySelector('#createTeam .header h2');
    if (header) {
        header.innerHTML = `<span data-i18n="startPlaying">🎮 เริ่มเล่น</span>`;
    }
    
    // ซ่อน input ชื่อทีม แสดงแค่ชื่อผู้เล่น
    const teamNameGroup = document.querySelector('#createTeam .form-group:first-child');
    const playerNameLabel = document.querySelector('#createTeam .form-group:nth-child(2) label');
    
    if (teamNameGroup) {
        teamNameGroup.style.display = 'none'; // ซ่อนช่องชื่อทีม
    }
    
    if (playerNameLabel) {
        playerNameLabel.innerHTML = `<span data-i18n="yourName">ชื่อของคุณ</span>`;
    }
    
    const submitBtn = document.querySelector('#createTeam .submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = `<span data-i18n="startButton">✨ เริ่มเล่น</span>`;
    }
    
    updatePageLanguage();
}

// สำหรับ Word Guessing (Team Play)
function showCreateTeam() {
    if (!currentGame) {
        alert(t('selectGameFirst'));
        return;
    }
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('createTeam').style.display = 'block';
    
    // รีเซ็ต UI ให้เป็นแบบทีม
    const header = document.querySelector('#createTeam .header h2');
    if (header) {
        header.innerHTML = `<span data-i18n="createNewTeam">🎮 สร้างห้องเพื่อเริ่มเล่นเกม</span>`;
    }
    
    const teamNameGroup = document.querySelector('#createTeam .form-group:first-child');
    const playerNameLabel = document.querySelector('#createTeam .form-group:nth-child(2) label');
    
    if (teamNameGroup) {
        teamNameGroup.style.display = 'block'; // แสดงช่องชื่อทีม
    }
    
    if (playerNameLabel) {
        playerNameLabel.innerHTML = `<span data-i18n="leaderName">ชื่อหัวหน้าทีม (คุณ)</span>`;
    }
    
    const submitBtn = document.querySelector('#createTeam .submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = `<span data-i18n="createButton">✨ สร้างทีม</span>`;
    }
    
    updatePageLanguage();
}

function showJoinTeam() {
    if (!currentGame) {
        alert(t('selectGameFirst'));
        return;
    }
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('joinTeam').style.display = 'block';
    updatePageLanguage();
}

// ฟังก์ชันสำหรับ Word Guessing - ไปหน้า Join เลย (ไม่ผ่านเมนู)
function showJoinTeamPage() {
    if (!currentGame) {
        alert(t('selectGameFirst'));
        return;
    }
    document.getElementById('joinTeam').style.display = 'block';
    updatePageLanguage();
}

function showPublicScoreboard() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('publicScoreboard').style.display = 'block';
    loadPublicScoreboard();
}

async function showAdmin() {
    const password = prompt('🔐 ใส่รหัส Admin:');
    if (!password) return;
    
    // Hash the password using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Check against Firebase (stored hash) - ใช้ Firebase แบบเก่า
    const adminRef = firebase.database().ref('admin/passwordHash');
    const snapshot = await adminRef.once('value');
    
    if (snapshot.exists() && snapshot.val() === hashHex) {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        currentAdminGame = 'snapventure'; // default
        loadAdminScoreboard();
        loadMissionsAdmin();
        loadScheduleSettings();
    } else {
        alert('❌ รหัสผิด! ไม่สามารถเข้าใช้งานได้');
    }
}

function selectAdminGame(gameType) {
    currentAdminGame = gameType;
    
    // Update active button
    document.querySelectorAll('.game-selector-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.game-selector-btn').classList.add('active');
    
    // Reload current tab data
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const tabName = activeTab.textContent.includes('คะแนน') ? 'scoreboard' :
                       activeTab.textContent.includes('ภารกิจ') ? 'missions' : 'schedule';
        showAdminTab(tabName);
    }
}

function confirmLeaveTeam() {
    if (confirm('⚠️ ต้องการออกจากทีมใช่หรือไม่?\n(คะแนนที่ทำไว้จะยังอยู่)')) {
        backToWelcome();
    }
}

function confirmLeaveRoom() {
    const gameName = GAME_CONFIG[currentGame]?.name || 'เกมนี้';
    if (confirm(`🚪 ต้องการออกจากห้อง ${gameName} ใช่หรือไม่?\n\n✓ คะแนนที่ทำไว้จะยังคงอยู่\n✓ คุณสามารถกลับมาเล่นเกมอื่นได้`)) {
        leaveRoom();
    }
}

function leaveRoom() {
    // Clear session และกลับไปหน้าแรก
    clearSession();
    
    // ซ่อนทุกหน้า
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    
    // แสดงข้อความแจ้งเตือน
    alert(t('leftRoomSuccess'));
}

// ================================================
// Game Rules Functions
// ================================================
function showGameRules(gameType) {
    const rulesContent = document.getElementById('rulesContent');
    
    if (gameType === 'snapventure') {
        rulesContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); padding: 25px; border-radius: 20px; margin-bottom: 25px; text-align: center; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);">
                <h3 style="color: white; margin: 0; font-size: 1.5rem; font-weight: 700;">🎯 ${t('snapVentureTitle')}</h3>
            </div>
            
            <div style="background: white; padding: 24px; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); position: relative; overflow: hidden;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #667EEA 0%, #764BA2 100%);"></div>
                <div style="display: flex; align-items: start; gap: 12px;">
                    <div style="background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                        <span style="font-size: 1.3rem;">1️⃣</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: #667EEA; margin: 0 0 10px 0; font-size: 1.15rem; font-weight: 700;">
                            ${t('snapVentureGoal')}
                        </h4>
                        <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 0.95rem;">
                            ${t('snapVentureGoalDesc')}
                        </p>
                    </div>
                </div>
            </div>
            
            <div style="background: white; padding: 24px; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); position: relative; overflow: hidden;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #4ECDC4 0%, #44B3AA 100%);"></div>
                <div style="display: flex; align-items: start; gap: 12px;">
                    <div style="background: linear-gradient(135deg, #4ECDC4 0%, #44B3AA 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);">
                        <span style="font-size: 1.3rem;">2️⃣</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: #4ECDC4; margin: 0 0 10px 0; font-size: 1.15rem; font-weight: 700;">
                            ${t('howToPlay')}
                        </h4>
                        <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 0.95rem;">
                            ${t('snapVentureRule1')}
                        </p>
                    </div>
                </div>
            </div>
            
            <div style="background: white; padding: 24px; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); position: relative; overflow: hidden;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #FF6B6B 0%, #EE5A5A 100%);"></div>
                <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 16px;">
                    <div style="background: linear-gradient(135deg, #FF6B6B 0%, #EE5A5A 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);">
                        <span style="font-size: 1.3rem;">3️⃣</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: #FF6B6B; margin: 0; font-size: 1.15rem; font-weight: 700;">
                            ${t('gameRules')}
                        </h4>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-left: 52px;">
                    <div style="background: #F8FAFC; padding: 14px 16px; border-radius: 12px; border: 1px solid #E2E8F0;">
                        <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 0.95rem;">
                            ${t('snapVentureGameRule1')}
                        </p>
                    </div>
                    <div style="background: #F8FAFC; padding: 14px 16px; border-radius: 12px; border: 1px solid #E2E8F0;">
                        <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 0.95rem;">
                            ${t('snapVentureGameRule2')}
                        </p>
                    </div>
                </div>
            </div>
            
            <div style="background: white; padding: 24px; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); position: relative; overflow: hidden;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #FFA502 0%, #FF8C00 100%);"></div>
                <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 16px;">
                    <div style="background: linear-gradient(135deg, #FFA502 0%, #FF8C00 100%); width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(255, 165, 2, 0.3);">
                        <span style="font-size: 1.3rem;">4️⃣</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: #FFA502; margin: 0 0 10px 0; font-size: 1.15rem; font-weight: 700;">
                            ${t('missionStep4')}
                        </h4>
                        <p style="margin: 0 0 16px 0; color: #475569; line-height: 1.7; font-size: 0.95rem;">
                            ${t('missionStep4Desc')}
                        </p>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 10px; border: 1px solid #E2E8F0;">
                            <span style="font-size: 1.3rem;">📖</span>
                            <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 0.95rem; flex: 1;">${t('missionStep4Sub1')}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 10px; border: 1px solid #E2E8F0;">
                            <span style="font-size: 1.3rem;">💭</span>
                            <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 0.95rem; flex: 1;">${t('missionStep4Sub2')}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 10px; border: 1px solid #E2E8F0;">
                            <span style="font-size: 1.3rem;">📸</span>
                            <p style="margin: 0; color: #475569; line-height: 1.7; font-size: 0.95rem; flex: 1;">${t('missionStep4Sub3')}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding: 20px 24px; background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); color: white; border-radius: 16px; font-weight: 700; font-size: 1.05rem; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);">
                ${t('enjoyAdventure')}
            </div>
        `;
    } else if (gameType === 'wordguessing') {
        rulesContent.innerHTML = `
            <h4>${t('wordGuessingTitle')}</h4>
            <p><strong>${t('goal')}</strong> ${t('wordGuessingGoalDesc')}</p>
            
            <h4>${t('howToPlay')}</h4>
            <ul>
                <li><span class="rule-emoji">👥</span> ${t('wordGuessingRule1')}</li>
                <li><span class="rule-emoji">❓</span> ${t('wordGuessingRule2')}</li>
                <li><span class="rule-emoji">✅</span> ${t('wordGuessingRule3')}</li>
                <li><span class="rule-emoji">🏆</span> ${t('wordGuessingRule4')}</li>
            </ul>
            
            <h4>${t('gameRules')}</h4>
            <ul>
                <li><span class="rule-emoji">📵</span> ${t('wordGuessingGameRule1')}</li>
                <li><span class="rule-emoji">⏰</span> ${t('wordGuessingGameRule2')}</li>
                <li><span class="rule-emoji">🚗</span> ${t('wordGuessingGameRule3')}</li>
                <li><span class="rule-emoji">🤝</span> ${t('wordGuessingGameRule4')}</li>
            </ul>
            
            <p style="text-align: center; margin-top: 20px; color: #4ECDC4; font-weight: bold;">
                ${t('enjoyThinking')}
            </p>
        `;
    }
    
    document.getElementById('rulesModal').style.display = 'block';
}

function acceptRules() {
    document.getElementById('rulesModal').style.display = 'none';
    
    // ถ้าเป็น Snapventure = ไปหน้าสร้างห้อง Solo
    // ถ้าเป็น Word Guessing = ไปหน้า Join Team เลย (เพราะ Admin สร้างห้องให้)
    if (currentGame === 'snapventure') {
        // แสดงหน้าสร้างห้อง Solo
        showCreateSoloRoom();
    } else if (currentGame === 'wordguessing') {
        // Word Guessing - ไปหน้า Join Team เลย (ไม่มีปุ่มสร้างทีม)
        showJoinTeamPage();
    } else {
        // เกมอื่นๆ - แสดงเมนูเกม (สร้าง/เข้าร่วมทีม)
        document.getElementById('gameMenu').style.display = 'block';
        updatePageLanguage();
    }
}

function selectGame(gameType) {
    console.log('🎮 selectGame called with:', gameType);
    
    try {
        currentGame = gameType;
        localStorage.setItem(STORAGE_CURRENT_GAME, gameType);
        
        // Update game menu title and description
        const config = GAME_CONFIG[gameType];
        if (!config) {
            console.error('❌ Game config not found for:', gameType);
            return;
        }
        
        // Hide welcome
        const welcomeEl = document.getElementById('welcome');
        if (welcomeEl) {
            welcomeEl.style.display = 'none';
        }
        
        // Snapventure = Solo Play (ไปหน้าสร้างห้องเลย)
        // Word Guessing = Team Play (ไปหน้าเมนูเกม)
        if (gameType === 'snapventure') {
            // แสดง rules ก่อน แล้วจะไปหน้าสร้างห้อง Solo
            showGameRules(gameType);
        } else {
            // Word Guessing - แสดงเมนูเกม (สร้าง/เข้าร่วมทีม)
            const gameMenuHeader = document.getElementById('gameMenuHeader');
            
            if (gameMenuHeader) {
                if (gameType === 'wordguessing') {
                    // ใช้รูป banner สำหรับ Word Guessing
                    gameMenuHeader.className = 'header header-with-banner';
                    gameMenuHeader.innerHTML = `
                        <button class="back-btn" onclick="backToWelcome()"><span data-i18n="back">← กลับ</span></button>
                        <img src="wordguessing-btn.png" alt="Word Guessing" class="header-banner" style="margin-top: 10px;">
                    `;
                } else {
                    // ใช้ text ปกติสำหรับเกมอื่นๆ
                    gameMenuHeader.className = 'header';
                    gameMenuHeader.innerHTML = `
                        <button class="back-btn" onclick="backToWelcome()"><span data-i18n="back">← กลับ</span></button>
                        <h1 id="gameMenuTitle">${config.icon} ${config.name}</h1>
                        <p class="subtitle" id="gameMenuDesc">${config.description}</p>
                    `;
                }
                
                // Update language after creating new HTML
                updatePageLanguage();
            }
            
            // Show rules popup first
            showGameRules(gameType);
        }
        
        console.log('✅ selectGame completed');
    } catch (error) {
        console.error('❌ Error in selectGame:', error);
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
}

function backToWelcome() {
    // ซ่อนทุกหน้า
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('createTeam').style.display = 'none';
    document.getElementById('joinTeam').style.display = 'none';
    document.getElementById('teamCodeDisplay').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('publicScoreboard').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
    
    // แสดงหน้าแรก
    document.getElementById('welcome').style.display = 'block';
    
    // Clear session
    clearSession();
    currentGame = null;
    localStorage.removeItem(STORAGE_CURRENT_GAME);
    
    // Update language after navigation
    updatePageLanguage();
}

// ================================================
// Validate Name Format
// ================================================
function validateNameFormat(name) {
    // รูปแบบ: ชื่อ.นามสกุล3ตัว (เช่น Warapon.lea)
    const namePattern = /^[A-Za-z]+\.[A-Za-z]{3}$/;
    return namePattern.test(name);
}

// ================================================
// Create Team / Solo Room
// ================================================
async function createTeam() {
    const leaderName = document.getElementById('leaderNameInput').value.trim();
    
    if (!currentGame) {
        alert(t('selectGameFirst'));
        return;
    }
    
    // ถ้าเป็น Snapventure (Solo) = ไม่ต้องใส่ชื่อทีม
    // ถ้าเป็น Word Guessing (Team) = ต้องใส่ชื่อทีมด้วย
    if (currentGame === 'snapventure') {
        // Solo Mode - เช็คแค่ชื่อผู้เล่น
        if (!leaderName) {
            alert(t('pleaseEnterName'));
            return;
        }
        
        // Validate name format
        if (!validateNameFormat(leaderName)) {
            alert('❌ รูปแบบชื่อไม่ถูกต้อง!\n\nกรุณาใส่ชื่อในรูปแบบ: ชื่อ.นามสกุล3ตัว\nตัวอย่าง: Warapon.lea');
            return;
        }
        
        try {
            // ใช้ timestamp เป็น ID (ไม่ต้องแสดงรหัส)
            const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            currentTeamId = playerId;
            currentUserName = leaderName;
            
            // แปลงชื่อให้ปลอดภัยสำหรับ Firebase key
            const memberKey = sanitizeFirebaseKey(leaderName);
            
            const playerData = {
                name: leaderName,  // ชื่อผู้เล่น (เก็บชื่อจริง)
                playerName: leaderName,
                teamCode: playerId,
                game: currentGame,
                score: 0,
                createdAt: Date.now(),
                isSolo: true,  // ระบุว่าเป็นโหมดเดี่ยว
                members: {
                    [memberKey]: {  // ใช้ key ที่ปลอดภัย
                        name: leaderName,  // แต่เก็บชื่อจริง
                        role: 'player',
                        joinedAt: Date.now()
                    }
                },
                missions: {}
            };
            
            // Save to game-specific path (ยังใช้โครงสร้างเดิมเพื่อความเข้ากันได้)
            await db.ref(`games/${currentGame}/teams/${playerId}`).set(playerData);
            
            // บันทึก session
            saveSession(playerId, leaderName);
            
            // ไปหน้าเกมเลย (ไม่ต้องแสดงรหัส)
            document.getElementById('createTeam').style.display = 'none';
            document.getElementById('gameBoard').style.display = 'block';
            loadGameBoard();
            
        } catch (error) {
            console.error('Error creating solo room:', error);
            alert(t('errorOccurred'));
        }
        
    } else {
        // Team Mode (Word Guessing) - ต้องมีชื่อทีมด้วย
        const teamName = document.getElementById('teamNameInput').value.trim();
        
        if (!teamName || !leaderName) {
            alert(t('pleaseFillAll'));
            return;
        }
        
        // Validate name format
        if (!validateNameFormat(leaderName)) {
            alert('❌ รูปแบบชื่อไม่ถูกต้อง!\n\nกรุณาใส่ชื่อในรูปแบบ: ชื่อ.นามสกุล3ตัว\nตัวอย่าง: Warapon.lea');
            return;
        }
        
        try {
            const teamCode = generateTeamCode();
            currentTeamId = teamCode;
            currentUserName = leaderName;
            
            // แปลงชื่อให้ปลอดภัยสำหรับ Firebase key
            const memberKey = sanitizeFirebaseKey(leaderName);
            
            const teamData = {
                name: teamName,
                teamCode: teamCode,
                game: currentGame,
                score: 0,
                createdAt: Date.now(),
                isSolo: false,  // ระบุว่าเป็นโหมดทีม
                members: {
                    [memberKey]: {  // ใช้ key ที่ปลอดภัย
                        name: leaderName,  // แต่เก็บชื่อจริง
                        role: 'leader',
                        joinedAt: Date.now()
                    }
                },
                missions: {}
            };
            
            // Save to game-specific path
            await db.ref(`games/${currentGame}/teams/${teamCode}`).set(teamData);
            
            // บันทึก session
            saveSession(teamCode, leaderName);
            
            // แสดงรหัสทีม
            document.getElementById('createTeam').style.display = 'none';
            document.getElementById('teamCodeDisplay').style.display = 'block';
            document.getElementById('displayTeamCode').textContent = teamCode;
            
        } catch (error) {
            console.error('Error creating team:', error);
            alert(t('errorOccurred'));
        }
    }
}

// ================================================
// Copy Team Code
// ================================================
function copyTeamCode() {
    const code = document.getElementById('displayTeamCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('📋 คัดลอกรหัสแล้ว: ' + code);
    });
}

function copyCurrentTeamCode() {
    if (currentTeamId) {
        navigator.clipboard.writeText(currentTeamId).then(() => {
            alert('📋 คัดลอกรหัสแล้ว: ' + currentTeamId);
        });
    }
}

// ================================================
// Start Game
// ================================================
function startGame() {
    document.getElementById('teamCodeDisplay').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    loadGameBoard();
}

// ================================================
// Join Team
// ================================================
async function joinTeamWithCode() {
    const teamCode = document.getElementById('teamCodeInput').value.trim().toUpperCase();
    const memberName = document.getElementById('memberNameInput').value.trim();
    
    if (!teamCode || !memberName) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน!');
        return;
    }
    
    if (teamCode.length !== 6) {
        alert('รหัสทีมต้องมี 6 หลัก!');
        return;
    }
    
    // Validate name format
    if (!validateNameFormat(memberName)) {
        alert('❌ รูปแบบชื่อไม่ถูกต้อง!\n\nกรุณาใส่ชื่อในรูปแบบ: ชื่อ.นามสกุล3ตัว\nตัวอย่าง: Warapon.lea');
        return;
    }
    
    if (!currentGame) {
        alert(t('selectGameFirst'));
        return;
    }
    
    // 🎯 AUTO-FILL CODE FROM URL PARAMETER
    // This code will be triggered when page loads with ?code=XXX parameter
    
    try {
        const memberKey = sanitizeFirebaseKey(memberName); // แปลงชื่อให้ปลอดภัย
        
        // ลอง join ผ่านห้องที่ Admin สร้างก่อน (สำหรับ Word Guessing)
        if (currentGame === 'wordguessing') {
            const roomRef = db.ref(`games/wordguessing/rooms/${teamCode}`);
            const roomSnapshot = await roomRef.once('value');
            
            if (roomSnapshot.exists()) {
                // พบห้องที่ Admin สร้างไว้
                const roomData = roomSnapshot.val();
                
                // ตรวจสอบว่าชื่อซ้ำหรือไม่
                if (roomData.members && roomData.members[memberKey]) {
                    alert('⚠️ ชื่อนี้มีคนใช้แล้วในห้อง!\nกรุณาใช้ชื่ออื่น หรือเพิ่มนามสกุล');
                    return;
                }
                
                // ตรวจสอบจำนวนสมาชิกสูงสุด
                const maxMembers = roomData.maxMembers || 5;
                const currentMemberCount = roomData.members ? Object.keys(roomData.members).length : 0;
                
                if (currentMemberCount >= maxMembers) {
                    alert(`❌ ห้องเต็มแล้ว!\nห้องนี้มีสมาชิกครบ ${maxMembers} คนแล้ว`);
                    return;
                }
                
                // เพิ่มสมาชิกเข้าห้อง (ใช้ memberKey แต่เก็บ name จริง)
                await roomRef.child(`members/${memberKey}`).set({
                    name: memberName, // เก็บชื่อจริง
                    role: 'member',
                    joinedAt: Date.now()
                });
                
                currentTeamId = teamCode; // ใช้ roomCode เป็น teamId
                currentUserName = memberName;
                
                // สร้าง team entry ให้ห้องนี้ด้วย (เพื่อ compatibility กับระบบเดิม)
                const teamData = {
                    name: roomData.name,
                    teamCode: teamCode,
                    game: currentGame,
                    score: 0,
                    createdAt: roomData.createdAt || Date.now(),
                    isRoom: true, // ระบุว่าเป็นห้องที่ Admin สร้าง
                    members: {},
                    missions: {}
                };
                
                // ถ้ายังไม่มี team entry ให้สร้าง
                const teamRef = db.ref(`games/${currentGame}/teams/${teamCode}`);
                const teamSnapshot = await teamRef.once('value');
                if (!teamSnapshot.exists()) {
                    await teamRef.set(teamData);
                }
                
                // เพิ่มสมาชิกใน team entry ด้วย (ใช้ memberKey แต่เก็บ name จริง)
                await teamRef.child(`members/${memberKey}`).set({
                    name: memberName, // เก็บชื่อจริง
                    role: 'member',
                    joinedAt: Date.now()
                });
                
                // บันทึก session
                saveSession(teamCode, memberName);
                
                // เข้าสู่หน้าเกม
                document.getElementById('joinTeam').style.display = 'none';
                document.getElementById('gameBoard').style.display = 'block';
                loadGameBoard();
                
                return; // สำเร็จแล้ว ออกจากฟังก์ชัน
            }
        }
        
        // ถ้าไม่พบห้อง หรือไม่ใช่ Word Guessing ให้ลองหาทีมปกติ
        let teamRef = db.ref(`games/${currentGame}/teams/${teamCode}`);
        let snapshot = await teamRef.once('value');
        
        if (!snapshot.exists()) {
            alert('❌ ไม่พบทีมหรือห้องนี้! กรุณาตรวจสอบรหัสอีกครั้ง');
            return;
        }
        
        const teamData = snapshot.val();
        
        // ตรวจสอบว่าชื่อซ้ำหรือไม่
        if (teamData.members && teamData.members[memberKey]) {
            alert('⚠️ ชื่อนี้มีคนใช้แล้วในทีม!\nกรุณาใช้ชื่ออื่น หรือเพิ่มนามสกุล');
            return;
        }
        
        // ตรวจสอบจำนวนสมาชิกสูงสุด
        const settingsSnapshot = await firebase.database().ref(`games/${currentGame}/settings/maxMembers`).once('value');
        const maxMembers = settingsSnapshot.val() || 5;
        const currentMemberCount = teamData.members ? Object.keys(teamData.members).length : 0;
        
        if (currentMemberCount >= maxMembers) {
            alert(`❌ ทีมเต็มแล้ว!\nทีมนี้มีสมาชิกครบ ${maxMembers} คนแล้ว`);
            return;
        }
        
        // เพิ่มสมาชิกเข้าทีม (ใช้ memberKey แต่เก็บ name จริง)
        await teamRef.child(`members/${memberKey}`).set({
            name: memberName, // เก็บชื่อจริง
            role: 'member',
            joinedAt: Date.now()
        });
        
        currentTeamId = teamCode;
        currentUserName = memberName;
        
        // บันทึก session
        saveSession(teamCode, memberName);
        
        // เข้าสู่หน้าเกม
        document.getElementById('joinTeam').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        loadGameBoard();
        
    } catch (error) {
        console.error('Error joining team:', error);
        alert(t('errorOccurred'));
    }
}

// ================================================
// Load Game Board
// ================================================
function loadGameBoard() {
    if (!currentGame) return;
    
    const teamRef = db.ref(`games/${currentGame}/teams/${currentTeamId}`);
    
    // Listen to team data
    teamRef.on('value', snapshot => {
        const teamData = snapshot.val();
        if (!teamData) return;
        
        // ถ้าเป็น Snapventure (Solo) = แสดงชื่อผู้เล่น
        // ถ้าเป็น Word Guessing (Team) = แสดงชื่อทีม
        const isSolo = teamData.isSolo || currentGame === 'snapventure';
        
        if (isSolo) {
            // Solo Mode - แสดงชื่อผู้เล่น
            document.getElementById('teamName').textContent = teamData.playerName || teamData.name || currentUserName;
        } else {
            // Team Mode - แสดงชื่อทีม
            document.getElementById('teamName').textContent = teamData.name || teamData.teamName || 'ทีม';
        }
        
        document.getElementById('teamScore').textContent = teamData.score || 0;
        
        // ซ่อน/แสดงส่วนสมาชิกตามโหมด
        const membersSection = document.querySelector('.members-section');
        if (isSolo) {
            // Solo Mode - ซ่อนส่วนรายชื่อสมาชิกและปุ่มคัดลอกรหัส
            if (membersSection) {
                membersSection.style.display = 'none';
            }
        } else {
            // Team Mode - แสดงส่วนรายชื่อสมาชิกและปุ่มคัดลอกรหัส
            if (membersSection) {
                membersSection.style.display = 'block';
            }
            
            // Update members
            const members = teamData.members || {};
            const membersList = document.getElementById('membersList');
            const memberCount = Object.keys(members).length;
            document.getElementById('memberCount').textContent = memberCount;
            
            membersList.innerHTML = '';
            
            const membersArray = Object.values(members);
            const SHOW_LIMIT = 5 ; // แสดงแค่ 5 คนแรก
            
            // สร้าง container สำหรับสมาชิกที่แสดง
            const visibleContainer = document.createElement('div');
            visibleContainer.id = 'visibleMembers';
            
            // สร้าง container สำหรับสมาชิกที่ซ่อน
            const hiddenContainer = document.createElement('div');
            hiddenContainer.id = 'hiddenMembers';
            hiddenContainer.style.display = 'none';
            
            membersArray.forEach((member, index) => {
                const tag = document.createElement('div');
                tag.className = `member-tag ${member.role === 'leader' ? 'leader' : ''}`;
                
                const avatar = document.createElement('div');
                avatar.className = 'member-avatar';
                avatar.textContent = member.role === 'leader' ? '👑' : '👤';
                
                const info = document.createElement('div');
                info.className = 'member-info';
                
                const name = document.createElement('div');
                name.className = 'member-name';
                name.textContent = member.name;
                
                const role = document.createElement('div');
                role.className = 'member-role';
                role.textContent = member.role === 'leader' ? t('teamLeader') : t('member');
                
                info.appendChild(name);
                info.appendChild(role);
                tag.appendChild(avatar);
                tag.appendChild(info);
                
                // ถ้าเป็น 5 คนแรก ให้แสดง ถ้าเกินให้ซ่อน
                if (index < SHOW_LIMIT) {
                    visibleContainer.appendChild(tag);
                } else {
                    hiddenContainer.appendChild(tag);
                }
            });
            
            membersList.appendChild(visibleContainer);
            membersList.appendChild(hiddenContainer);
            
            // ถ้ามีสมาชิกเกิน SHOW_LIMIT ให้แสดงปุ่ม "ดูทั้งหมด"
            if (memberCount > SHOW_LIMIT) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'toggle-members-btn';
                toggleBtn.innerHTML = `👥 ดูทั้งหมด (${memberCount} คน)`;
                toggleBtn.onclick = () => {
                    const isHidden = hiddenContainer.style.display === 'none';
                    hiddenContainer.style.display = isHidden ? 'block' : 'none';
                    toggleBtn.innerHTML = isHidden 
                        ? `👥 ซ่อน` 
                        : `👥 ดูทั้งหมด (${memberCount} คน)`;
                };
                membersList.appendChild(toggleBtn);
            }
        }
        
        // Load missions
        loadMissions(teamData.missions || {});
        
        // Update completed missions count
        updateCompletedMissionsCount(teamData.missions || {});
    });
}

// ================================================
// Update Completed Missions Count
// ================================================
function updateCompletedMissionsCount(completedMissions) {
    if (!currentGame) return;
    
    // นับภารกิจที่เสร็จแล้ว (completed = true และไม่ถูก revoke)
    const completedCount = Object.values(completedMissions).filter(mission => 
        mission.completed && !mission.revoked
    ).length;
    
    // ดึงจำนวนภารกิจทั้งหมดจาก Firebase
    firebase.database().ref(`games/${currentGame}/missions`).once('value', (snapshot) => {
        const missionsData = snapshot.val();
        const totalMissions = missionsData ? Object.keys(missionsData).length : 0;
        
        // อัพเดทการแสดงผล
        const completedMissionsElement = document.getElementById('completedMissions');
        if (completedMissionsElement) {
            completedMissionsElement.textContent = `${completedCount}/${totalMissions}`;
        }
    });
}

// ================================================
// Load Missions (from Firebase)
// ================================================
function loadMissions(completedMissions) {
    const container = document.querySelector('.missions-container');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดภารกิจ...</p>';
    
    if (!currentGame) {
        container.innerHTML = '<p class="empty-state">กรุณาเลือกเกมก่อน</p>';
        return;
    }
    
    // เช็คเวลาก่อน
    firebase.database().ref(`games/${currentGame}/schedule`).once('value', (scheduleSnapshot) => {
        const schedule = scheduleSnapshot.val();
        const now = Date.now();
        
        // ถ้ามี schedule และยังไม่ถึงเวลาเริ่ม
        if (schedule && schedule.start && now < schedule.start) {
            container.innerHTML = `
                <div class="schedule-message not-started">
                    <div class="schedule-icon">⏳</div>
                    <h3>ยังไม่ถึงเวลาทำภารกิจ</h3>
                    <p>ภารกิจจะเริ่มในวันที่</p>
                    <p class="schedule-time">${formatDateTime(schedule.start)}</p>
                </div>
            `;
            return;
        }
        
        // ถ้ามี schedule และหมดเวลาแล้ว
        if (schedule && schedule.end && now > schedule.end) {
            container.innerHTML = `
                <div class="schedule-message ended">
                    <div class="schedule-icon">🏁</div>
                    <h3>หมดเวลาทำภารกิจแล้ว</h3>
                    <p>ภารกิจสิ้นสุดเมื่อ</p>
                    <p class="schedule-time">${formatDateTime(schedule.end)}</p>
                    <button class="leave-room-btn" onclick="leaveRoom()">
                        🚪 ออกจากห้องและไปเกมใหม่
                    </button>
                </div>
            `;
            return;
        }
        
        // โหลดภารกิจปกติ (อยู่ในช่วงเวลาหรือไม่มี schedule)
        if (!currentGame) return;
        
        // Start countdown timer if schedule exists
        if (schedule && schedule.start && schedule.end) {
            startCountdownTimer(schedule.start, schedule.end);
        }
        
        firebase.database().ref(`games/${currentGame}/missions`).once('value', (snapshot) => {
            container.innerHTML = '';
            
            const missionsData = snapshot.val();
            if (!missionsData) {
                container.innerHTML = '<p class="empty-state">ยังไม่มีภารกิจในระบบ</p>';
                return;
            }
            
            // แปลงเป็น array และเรียงตาม id
            const missionsArray = Object.entries(missionsData)
                .map(([key, value]) => ({ key, ...value }))
                .sort((a, b) => a.id - b.id);
            
            missionsArray.forEach(mission => {
                const missionData = completedMissions[mission.id];
                const isCompleted = missionData && missionData.completed;
                const isRevoked = missionData && missionData.revoked;
                const isAttempted = missionData && missionData.attempted && !isCompleted; // ตอบแล้วแต่ยังไม่ approved
                const completedBy = missionData ? missionData.completedBy : null;
                const revokedReason = missionData ? missionData.revokedReason : null;
                const card = createMissionCard(mission, isCompleted, isRevoked, completedBy, revokedReason, isAttempted);
                container.appendChild(card);
            });
        });
    });
}

function createMissionCard(mission, isCompleted, isRevoked, completedBy, revokedReason, isAttempted) {
    const card = document.createElement('div');
    card.className = `mission-card ${isCompleted ? 'completed' : ''} ${isRevoked ? 'revoked' : ''} ${isAttempted ? 'attempted' : ''}`;
    
    const missionType = mission.type || 'photo';
    
    // Get mission title in current language
    const missionTitle = (currentLanguage === 'en' && mission.title_en) ? mission.title_en : (mission.title_th || mission.title);
    
    // Show different messages based on status
    let statusText = '';
    if (isRevoked) {
        statusText = `
            <div style="background: #FFF5F5; border: 2px solid #FF6B6B; border-radius: 8px; padding: 10px; margin-top: 10px;">
                <div style="font-size: 0.9rem; color: #FF6B6B; font-weight: bold; margin-bottom: 5px;">
                    🚫 ${t('missionRevoked')}
                </div>
                <div style="font-size: 0.85rem; color: #C0392B;">
                    ${t('reason')}: ${revokedReason || t('failedCheck')}
                </div>
            </div>
        `;
    } else if (completedBy) {
        // แสดงข้อความเดียวกัน ไม่ว่าจะถูก (completed) หรือผิด (attempted) 
        // เพื่อไม่ให้ผู้เล่นรู้ว่าตอบถูกหรือผิด
        statusText = `<div style="font-size: 0.85rem; color: #00D2A0; margin-top: 5px;">✓ ${t('completedBy')} ${completedBy}</div>`;
    }
    
    // ไอคอนและข้อความปุ่มตามประเภท
    const buttonIcon = missionType === 'quiz' ? '❓' : '📸';
    const buttonText = missionType === 'quiz' ? t('answerQuiz') : t('takePhoto');
    const clickFunction = missionType === 'quiz' ? `openQuizModal(${mission.id})` : `openPhotoModal(${mission.id})`;
    
    // แสดงประเภทภารกิจ
    const typeBadge = missionType === 'quiz' 
        ? `<span class="mission-type-badge quiz">❓ ${t('answerQuiz')}</span>`
        : `<span class="mission-type-badge photo">📸 ${t('takePhoto')}</span>`;
    
    // Button state - แสดงปุ่มเดียวกันทั้งถูกและผิด
    let buttonHTML = '';
    if (isRevoked) {
        buttonHTML = `
            <button class="mission-btn revoked" disabled>
                🚫 ${t('revoked')}
            </button>
        `;
    } else if (isCompleted || isAttempted) {
        // ถูก (completed) หรือผิด (attempted) = แสดงปุ่มเหมือนกัน (สีเขียว)
        buttonHTML = `
            <button class="mission-btn completed" disabled>
                ✓ ${t('completed')}
            </button>
        `;
    } else {
        buttonHTML = `
            <button class="mission-btn" onclick="${clickFunction}">
                ${buttonIcon} ${buttonText}
            </button>
        `;
    }
    
    card.innerHTML = `
        <div class="mission-header">
            <div class="mission-title">${missionTitle}</div>
        </div>
        ${typeBadge}
        ${statusText}
        ${buttonHTML}
    `;
    
    return card;
}

// ================================================
// Photo Modal
// ================================================
function openPhotoModal(missionId) {
    currentMissionId = missionId;
    
    if (!currentGame) return;
    
    // ดึงข้อมูลภารกิจจาก Firebase (เหมือน Quiz Modal)
    firebase.database().ref(`games/${currentGame}/missions`).once('value', (snapshot) => {
        const missionsData = snapshot.val();
        const missionEntry = Object.entries(missionsData || {}).find(([key, value]) => value.id === missionId);
        
        if (missionEntry) {
            const mission = missionEntry[1];
            // Get mission title in current language
            const missionTitle = (currentLanguage === 'en' && mission.title_en) ? mission.title_en : (mission.title_th || mission.title);
            document.getElementById('modalTitle').textContent = missionTitle;
        } else {
            // Fallback: ถ้าหาไม่เจอใน Firebase ใช้จาก missions array
            const mission = missions.find(m => m.id === missionId);
            if (mission) {
                const missionTitle = (currentLanguage === 'en' && mission.title_en) ? mission.title_en : (mission.title_th || mission.title);
                document.getElementById('modalTitle').textContent = missionTitle;
            }
        }
    });
    
    document.getElementById('photoPreview').innerHTML = '';
    document.getElementById('photoInput').value = '';
    document.getElementById('photoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('photoModal').style.display = 'none';
    currentMissionId = null;
}

// ================================================
// Quiz Modal
// ================================================
function openQuizModal(missionId) {
    currentMissionId = missionId;
    
    if (!currentGame) return;
    
    // ดึงข้อมูลภารกิจจาก Firebase
    firebase.database().ref(`games/${currentGame}/missions`).once('value', (snapshot) => {
        const missionsData = snapshot.val();
        const missionEntry = Object.entries(missionsData).find(([key, value]) => value.id === missionId);
        
        if (missionEntry) {
            const mission = missionEntry[1];
            // Get mission title in current language
            const missionTitle = (currentLanguage === 'en' && mission.title_en) ? mission.title_en : (mission.title_th || mission.title);
            document.getElementById('quizModalTitle').textContent = missionTitle;
            document.getElementById('quizAnswerInput').value = '';
            document.getElementById('quizModal').style.display = 'block';
        }
    });
}

function closeQuizModal() {
    document.getElementById('quizModal').style.display = 'none';
    currentMissionId = null;
}

// ================================================
// Countdown Timer
// ================================================
let countdownInterval = null;

function startCountdownTimer(startTime, endTime) {
    const timerElement = document.getElementById('countdownTimer');
    
    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    function updateTimer() {
        const now = Date.now();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            // หมดเวลา
            timerElement.style.display = 'none';
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            // Reload missions to show ended message
            location.reload();
            return;
        }
        
        // คำนวณเวลาที่เหลือ
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // แสดงเวลา
        let timeText = '';
        if (days > 0) {
            timeText = `${days} วัน ${hours} ชั่วโมง`;
        } else if (hours > 0) {
            timeText = `${hours} ชม. ${minutes} นาที`;
        } else if (minutes > 0) {
            timeText = `${minutes} นาที ${seconds} วินาที`;
        } else {
            timeText = `${seconds} วินาที`;
        }
        
        // เช็คว่าใกล้หมดเวลาไหม (เหลือน้อยกว่า 1 ชั่วโมง)
        const isWarning = timeLeft < (60 * 60 * 1000);
        
        timerElement.className = `countdown-timer ${isWarning ? 'warning' : ''}`;
        timerElement.innerHTML = `
            <span class="timer-icon">${isWarning ? '⚠️' : '⏰'}</span>
            <span class="timer-text">เหลือเวลา: ${timeText}</span>
        `;
        timerElement.style.display = 'flex';
    }
    
    // Update ทันที
    updateTimer();
    
    // Update ทุกวินาที
    countdownInterval = setInterval(updateTimer, 1000);
}

async function submitQuizAnswer() {
    if (!currentGame) return;
    
    // เช็คเวลาก่อนส่ง
    const scheduleSnapshot = await firebase.database().ref(`games/${currentGame}/schedule`).once('value');
    const schedule = scheduleSnapshot.val();
    const now = Date.now();
    
    if (schedule) {
        if (now < schedule.start) {
            alert(t('notStartedYet'));
            closeQuizModal();
            return;
        }
        if (now > schedule.end) {
            alert(t('timeExpired'));
            closeQuizModal();
            return;
        }
    }
    
    const userAnswer = document.getElementById('quizAnswerInput').value.trim();
    
    if (!userAnswer) {
        alert(t('enterAnswer'));
        return;
    }
    
    try {
        // ดึงข้อมูลภารกิจจาก Firebase
        const missionsSnapshot = await firebase.database().ref(`games/${currentGame}/missions`).once('value');
        const missionsData = missionsSnapshot.val();
        const missionEntry = Object.entries(missionsData).find(([key, value]) => value.id === currentMissionId);
        
        if (!missionEntry) {
            alert(t('missionNotFound'));
            return;
        }
        
        const [missionKey, mission] = missionEntry;
        
        // Check both language answers (backward compatible)
        const correctAnswer_th = mission.answer_th || mission.answer || '';
        const correctAnswer_en = mission.answer_en || '';
        
        // เช็คคำตอบ (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่ และช่องว่าง) เพื่อตัดสินว่าจะ auto-approve หรือ pending
        const userAnswerLower = userAnswer.toLowerCase().trim();
        const isCorrect_th = userAnswerLower === correctAnswer_th.toLowerCase().trim();
        const isCorrect_en = correctAnswer_en && userAnswerLower === correctAnswer_en.toLowerCase().trim();
        const isCorrect = isCorrect_th || isCorrect_en;
        
        // ดึงข้อมูลทีม
        const teamRef = firebase.database().ref(`games/${currentGame}/teams/${currentTeamId}`);
        const snapshot = await teamRef.once('value');
        const teamData = snapshot.val();
        
        if (!teamData) {
            alert(t('teamNotFound'));
            return;
        }
        
        const timestamp = Date.now();
        let submissionStatus = 'pending';
        let shouldAwardPoints = false;
        
        // ถ้าคำตอบถูก: auto-approve และให้คะแนนทันที
        if (isCorrect) {
            submissionStatus = 'approved';
            shouldAwardPoints = true;
            
            // Update mission as completed
            await teamRef.child(`missions/${currentMissionId}`).set({
                completed: true,
                completedBy: currentUserName,
                answer: userAnswer,
                timestamp: timestamp
            });
            
            // Update score immediately
            const newScore = (teamData.score || 0) + mission.points;
            await teamRef.child('score').set(newScore);
        } else {
            // คำตอบไม่ตรง: ล็อคภารกิจ (ห้ามตอบซ้ำ), รอ admin ตรวจ
            await teamRef.child(`missions/${currentMissionId}`).set({
                completed: false,
                attempted: true,  // ป้องกันตอบซ้ำ
                completedBy: currentUserName,
                answer: userAnswer,
                timestamp: timestamp,
                status: 'pending'
            });
        }
        
        // Save submission record for admin review
        const submissionRef = firebase.database().ref(`games/${currentGame}/submissions`).push();
        await submissionRef.set({
            teamId: currentTeamId,
            teamName: teamData.name || 'Unknown Team',
            missionId: currentMissionId,
            missionTitle: mission.title || 'Unknown Mission',
            missionPoints: mission.points || 0,
            missionType: 'quiz',
            submittedBy: currentUserName || 'Unknown',
            userAnswer: userAnswer,
            correctAnswer_th: correctAnswer_th,
            correctAnswer_en: correctAnswer_en,
            timestamp: timestamp,
            status: submissionStatus
        });
        
        closeQuizModal();
        
        // แสดงข้อความสำเร็จ (ไม่บอกว่าถูกหรือผิด)
        alert(t('answerSubmittedSuccess'));
        loadGameBoard();
        
    } catch (error) {
        console.error('Error:', error);
        alert(`${t('errorOccurred')} ${error.message}`);
    }
}

// ================================================
// Photo Input Handler
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    // ================================================
    // Event Delegation for All Buttons
    // ================================================
    
    // Use event delegation on document body
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-game], [data-admin-game], [data-tab], #adminMenuBtn');
        
        if (!target) return;
        
        // Game selection (Snap Venture, Word Guessing)
        if (target.dataset.game) {
            e.preventDefault();
            selectGame(target.dataset.game);
        }
        
        // Admin menu button
        if (target.id === 'adminMenuBtn') {
            e.preventDefault();
            showAdmin();
        }
        
        // Admin game selector
        if (target.dataset.adminGame) {
            e.preventDefault();
            selectAdminGame(target.dataset.adminGame);
        }
        
        // Admin tabs
        if (target.dataset.tab) {
            e.preventDefault();
            showAdminTab(target.dataset.tab);
        }
    });
    
    // ================================================
    // Photo Input Preview
    // ================================================
    const photoInput = document.getElementById('photoInput');
    
    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const preview = document.getElementById('photoPreview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // ================================================
    // Name Format Validation with Visual Feedback
    // ================================================
    const nameInputs = [
        document.getElementById('leaderNameInput'),
        document.getElementById('memberNameInput')
    ];
    
    nameInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                const isValid = validateNameFormat(value);
                
                if (value.length > 0) {
                    if (isValid) {
                        e.target.style.borderColor = '#28a745';
                        e.target.style.background = '#d4edda';
                    } else {
                        e.target.style.borderColor = '#dc3545';
                        e.target.style.background = '#f8d7da';
                    }
                } else {
                    e.target.style.borderColor = '';
                    e.target.style.background = '';
                }
            });
        }
    });
    
    // Initialize Firebase
    initFirebase();
});

// ================================================
// Submit Mission
// ================================================
async function submitMission() {
    if (!currentGame) return;
    
    // เช็คเวลาก่อนส่ง
    const scheduleSnapshot = await firebase.database().ref(`games/${currentGame}/schedule`).once('value');
    const schedule = scheduleSnapshot.val();
    const now = Date.now();
    
    if (schedule) {
        if (now < schedule.start) {
            alert(t('notTimeYet'));
            closeModal();
            return;
        }
        if (now > schedule.end) {
            alert(t('timeExpiredAlert'));
            closeModal();
            return;
        }
    }
    
    const photoInput = document.getElementById('photoInput');
    const file = photoInput.files[0];
    
    if (!file) {
        alert(t('takePhotoFirst'));
        return;
    }
    
    // Get mission from Firebase
    const missionsSnapshot = await firebase.database().ref(`games/${currentGame}/missions`).once('value');
    const missionsData = missionsSnapshot.val();
    const missionEntry = Object.entries(missionsData).find(([key, value]) => value.id === currentMissionId);
    const mission = missionEntry ? missionEntry[1] : null;
    
    if (!mission) {
        alert(t('missionNotFound'));
        return;
    }
    
    try {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = '<div class="loading"></div> กำลังบันทึก...';
        submitBtn.disabled = true;
        
        // แปลงรูปเป็น Base64
        const reader = new FileReader();
        reader.onload = async (e) => {
            const photoBase64 = e.target.result;
            
            const teamRef = db.ref(`games/${currentGame}/teams/${currentTeamId}`);
            const snapshot = await teamRef.once('value');
            const teamData = snapshot.val();
            
            if (!teamData) {
                alert(t('teamNotFound'));
                return;
            }
            
            const timestamp = Date.now();
            
            // Update mission in team
            await teamRef.child(`missions/${currentMissionId}`).set({
                completed: true,
                completedBy: currentUserName,
                photoBase64: photoBase64,
                timestamp: timestamp
            });
            
            // Update score (immediate points)
            const newScore = (teamData.score || 0) + mission.points;
            await teamRef.child('score').set(newScore);
            
            // Save submission record for admin review
            const submissionRef = db.ref(`games/${currentGame}/submissions`).push();
            await submissionRef.set({
                teamId: currentTeamId,
                teamName: teamData.name || 'Unknown Team',
                missionId: currentMissionId,
                missionTitle: mission.title || 'Unknown Mission',
                missionPoints: mission.points || 0,
                missionType: 'photo',
                submittedBy: currentUserName || 'Unknown',
                photoBase64: photoBase64,
                timestamp: timestamp,
                status: 'approved' // default status
            });
            
            closeModal();
            alert(`${t('missionSuccessAlert')} ${currentUserName} ${t('missionCompletedBy')}`);
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error('Error submitting mission:', error);
        alert(t('submissionError'));
    }
}

// ================================================
// Calculate Average Completion Time (Tiebreaker)
// ================================================
function calculateAverageCompletionTime(missions) {
    if (!missions) return Infinity; // ทีมที่ไม่มีภารกิจจะอยู่ท้ายสุด
    
    const completedMissions = Object.values(missions).filter(m => m.completed && m.timestamp);
    
    if (completedMissions.length === 0) return Infinity;
    
    // หาเวลาแรกสุดที่เริ่มทำ (timestamp ที่เก่าที่สุด)
    const timestamps = completedMissions.map(m => m.timestamp);
    const firstTime = Math.min(...timestamps);
    const lastTime = Math.max(...timestamps);
    
    // คำนวณเวลาที่ใช้ทั้งหมด (มิลลิวินาที)
    const totalTime = lastTime - firstTime;
    
    // ถ้าทำเสร็จเพียงภารกิจเดียว ให้ใช้เวลาที่ทำภารกิจนั้น
    if (completedMissions.length === 1) {
        return timestamps[0];
    }
    
    // คืนค่าเวลาเฉลี่ยต่อภารกิจ
    return totalTime / completedMissions.length;
}

// ================================================
// Public Scoreboard
// ================================================
function loadPublicScoreboard() {
    const container = document.getElementById('publicScoresContainer');
    
    // Real-time listener
    db.ref('teams').on('value', snapshot => {
        const teams = [];
        snapshot.forEach(childSnapshot => {
            const team = childSnapshot.val();
            const avgTime = calculateAverageCompletionTime(team.missions);
            teams.push({
                code: childSnapshot.key,
                name: team.teamName,
                score: team.score || 0,
                members: team.members ? Object.keys(team.members).length : 0,
                missions: team.missions ? Object.keys(team.missions).length : 0,
                avgCompletionTime: avgTime
            });
        });
        
        // Sort by score (descending), then by average time (ascending - faster is better)
        teams.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score; // คะแนนสูงกว่าชนะ
            }
            // คะแนนเท่ากัน -> ใช้เวลาเฉลี่ยน้อยกว่าชนะ
            return a.avgCompletionTime - b.avgCompletionTime;
        });
        
        // Display
        container.innerHTML = '';
        teams.forEach((team, index) => {
            const card = createScoreCard(team, index + 1);
            container.appendChild(card);
        });
        
        if (teams.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72; padding: 40px;">ยังไม่มีทีมเข้าร่วม</p>';
        }
    });
}

// ================================================
// Admin Scoreboard
// ================================================
function loadAdminScoreboard() {
    const container = document.getElementById('adminScoresContainer');
    const gameName = GAME_CONFIG[currentAdminGame].name;
    const gameIcon = GAME_CONFIG[currentAdminGame].icon;
    const isSolo = currentAdminGame === 'snapventure';
    
    // Update game display
    if (isSolo) {
        document.getElementById('currentGameDisplay').innerHTML = `${gameIcon} กำลังแสดงผู้เล่นของเกม <strong>${gameName}</strong>`;
    } else {
        document.getElementById('currentGameDisplay').innerHTML = `${gameIcon} กำลังแสดงทีมของเกม <strong>${gameName}</strong>`;
    }
    
    db.ref(`games/${currentAdminGame}/teams`).on('value', snapshot => {
        const teams = [];
        snapshot.forEach(childSnapshot => {
            const team = childSnapshot.val();
            const avgTime = calculateAverageCompletionTime(team.missions);
            
            // สำหรับ Solo Mode ใช้ชื่อผู้เล่น, สำหรับ Team Mode ใช้ชื่อทีม
            const displayName = isSolo 
                ? (team.playerName || team.name || 'Unknown Player')
                : (team.name || team.teamName || 'Unknown Team');
            
            teams.push({
                code: childSnapshot.key,
                name: displayName,
                score: team.score || 0,
                members: team.members ? Object.keys(team.members).length : 0,
                missions: team.missions ? Object.keys(team.missions).length : 0,
                membersList: team.members || {},
                avgCompletionTime: avgTime,
                isSolo: isSolo
            });
        });
        
        // Sort by score (descending), then by average time (ascending)
        teams.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.avgCompletionTime - b.avgCompletionTime;
        });
        
        container.innerHTML = '';
        teams.forEach((team, index) => {
            const card = createAdminScoreCard(team, index + 1, currentAdminGame);
            container.appendChild(card);
        });
        
        if (teams.length === 0) {
            const entityName = isSolo ? 'ผู้เล่น' : 'ทีม';
            container.innerHTML = `<p style="text-align: center; color: #636E72; padding: 40px;">ยังไม่มี${entityName}ใน ${gameName}</p>`;
        }
    });
}

function createScoreCard(team, rank) {
    const card = document.createElement('div');
    card.className = `score-card ${rank === 1 ? 'first' : ''}`;
    
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
    
    card.innerHTML = `
        <div class="team-info">
            <div class="team-detail">
                <div class="rank">#${rank}</div>
                <div class="team-name">${medal} ${team.name}</div>
            </div>
            <div class="team-members-count">👥 ${team.members} คน</div>
            <div class="team-missions-count">✓ ${team.missions}/${missions.length} ภารกิจ</div>
        </div>
        <div class="team-score">${team.score}</div>
    `;
    
    return card;
}

function createAdminScoreCard(team, rank, gameType) {
    const card = document.createElement('div');
    card.className = `score-card ${rank === 1 ? 'first' : ''}`;
    
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
    
    // ตรวจสอบว่าเป็นโหมดเดี่ยวหรือทีม
    const isSolo = team.isSolo || gameType === 'snapventure';
    
    // สร้างรายชื่อสมาชิก (เฉพาะโหมดทีม)
    const membersHTML = !isSolo ? Object.values(team.membersList)
        .map(m => {
            const icon = m.role === 'leader' ? '👑' : '👤';
            const roleClass = m.role === 'leader' ? 'leader' : 'member';
            return `<span class="admin-member-badge ${roleClass}">${icon} ${m.name}</span>`;
        })
        .join('') : '';
    
    // HTML สำหรับโหมดเดี่ยว vs โหมดทีม  
    const detailsHTML = isSolo ? `
        <div class="team-missions-count">✓ ${team.missions} ภารกิจ</div>
    ` : `
        <div class="team-code">รหัสทีม: <strong>${team.code}</strong></div>
        <div class="admin-members-list">
            <div class="admin-members-label">👥 สมาชิก ${team.members} คน:</div>
            <div class="admin-members-tags">${membersHTML}</div>
        </div>
        <div class="team-missions-count">✓ ${team.missions} ภารกิจ</div>
    `;
    
    card.innerHTML = `
        <div class="team-info">
            <div class="team-detail">
                <div class="rank">#${rank}</div>
                <div class="team-name">${medal} ${team.name}</div>
            </div>
            ${detailsHTML}
            <div style="margin-top: 10px; display: flex; gap: 10px;">
                <button class="view-photo-btn" onclick="event.stopPropagation(); showTeamPhotos({code: '${team.code}', name: '${team.name}'}, '${gameType}')" style="flex: 1;">
                    📸 ดูรูปภาพ
                </button>
                <button class="view-photo-btn" onclick="event.stopPropagation(); showTeamSubmissions('${team.code}', '${team.name}')" style="flex: 1;">
                    📋 ดูการส่งงาน
                </button>
            </div>
        </div>
        <div class="team-score">${team.score}</div>
    `;
    
    return card;
}

// ================================================
// Show Team Photos
// ================================================
async function showTeamPhotos(team, gameType) {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('teamPhotosPanel').style.display = 'block';
    document.getElementById('photoPanelTeamName').textContent = `📸 ${team.name}`;
    
    const container = document.getElementById('photoMissionsContainer');
    container.innerHTML = '<p style="text-align: center; color: #636E72;">กำลังโหลด...</p>';
    
    try {
        const teamRef = db.ref(`games/${gameType}/teams/${team.code}`);
        const snapshot = await teamRef.once('value');
        const teamData = snapshot.val();
        const completedMissions = teamData.missions || {};
        
        // Get missions for this game
        const missionsSnapshot = await db.ref(`games/${gameType}/missions`).once('value');
        const missionsData = missionsSnapshot.val();
        const gameMissions = missionsData ? Object.values(missionsData) : [];
        
        container.innerHTML = '';
        
        gameMissions.forEach(mission => {
            const missionData = completedMissions[mission.id];
            const card = createPhotoCard(mission, missionData, team.name);
            container.appendChild(card);
        });
        
        if (Object.keys(completedMissions).length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #636E72; padding: 40px;">ทีมนี้ยังไม่ได้ทำภารกิจใดๆ</p>';
        }
        
    } catch (error) {
        console.error('Error loading photos:', error);
        container.innerHTML = '<p style="text-align: center; color: #FF6B6B;">เกิดข้อผิดพลาดในการโหลดรูปภาพ</p>';
    }
}

function createPhotoCard(mission, missionData, teamName) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    
    if (missionData && missionData.completed) {
        const timestamp = new Date(missionData.timestamp);
        const dateStr = timestamp.toLocaleString('th-TH');
        
        card.innerHTML = `
            <div class="photo-card-header">
                <div class="photo-mission-title">${mission.title}</div>
                <div class="photo-points">+${mission.points}</div>
            </div>
            <div class="photo-info">
                <div>✓ ทำโดย: <strong>${missionData.completedBy}</strong></div>
                <div>🕐 ${dateStr}</div>
            </div>
            <div class="photo-image-container">
                <img src="${missionData.photoBase64}" alt="${mission.title}" 
                     onclick="openPhotoLightbox('${missionData.photoBase64}', '${mission.title}', '${teamName}', '${missionData.completedBy}')">
            </div>
        `;
    } else {
        card.className = 'photo-card incomplete';
        card.innerHTML = `
            <div class="photo-card-header">
                <div class="photo-mission-title">${mission.title}</div>
                <div class="photo-points">+${mission.points}</div>
            </div>
            <div class="photo-status">❌ ยังไม่ได้ทำ</div>
        `;
    }
    
    return card;
}

function backToAdminPanel() {
    document.getElementById('teamPhotosPanel').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
}

// ================================================
// Photo Lightbox
// ================================================
function openPhotoLightbox(photoSrc, missionTitle, teamName, completedBy) {
    const lightbox = document.createElement('div');
    lightbox.className = 'photo-lightbox';
    lightbox.onclick = () => document.body.removeChild(lightbox);
    
    lightbox.innerHTML = `
        <div class="lightbox-content" onclick="event.stopPropagation()">
            <span class="lightbox-close" onclick="this.parentElement.parentElement.remove()">×</span>
            <h3>${missionTitle}</h3>
            <p style="color: #636E72; margin: 10px 0;">ทีม: ${teamName} | ทำโดย: ${completedBy}</p>
            <img src="${photoSrc}" alt="${missionTitle}">
        </div>
    `;
    
    document.body.appendChild(lightbox);
}

// ================================================
// Admin Functions
// ================================================
function resetAllScores() {
    const gameName = GAME_CONFIG[currentAdminGame].name;
    if (!confirm(`⚠️ ต้องการรีเซ็ตคะแนนทั้งหมดใน ${gameName} ใช่หรือไม่?\n(ภารกิจที่ทำแล้วจะถูกลบ แต่ทีมและสมาชิกยังอยู่)`)) {
        return;
    }
    
    db.ref(`games/${currentAdminGame}/teams`).once('value', snapshot => {
        const updates = {};
        snapshot.forEach(childSnapshot => {
            const teamCode = childSnapshot.key;
            updates[`games/${currentAdminGame}/teams/${teamCode}/score`] = 0;
            updates[`games/${currentAdminGame}/teams/${teamCode}/missions`] = null;
        });
        
        db.ref().update(updates).then(() => {
            alert(t('resetSuccess'));
        });
    });
}

function deleteAllTeams() {
    const gameName = GAME_CONFIG[currentAdminGame].name;
    if (!confirm(`${t('confirmDeleteTeams')} ${gameName} ${t('deleteTeamsConfirm')}`)) {
        return;
    }
    
    if (!confirm(t('areYouSure'))) {
        return;
    }
    
    db.ref(`games/${currentAdminGame}/teams`).remove().then(() => {
        alert(t('deleteSuccess'));
    });
}

// ================================================
// Admin Tab Management
// ================================================
function showAdminTab(tabName) {
    // ซ่อนแท็บทั้งหมด
    document.getElementById('adminScoreboardTab').style.display = 'none';
    document.getElementById('adminSubmissionsTab').style.display = 'none';
    document.getElementById('adminRoomsTab').style.display = 'none';
    document.getElementById('adminMissionsTab').style.display = 'none';
    document.getElementById('adminScheduleTab').style.display = 'none';
    
    // ลบ active จากปุ่มทั้งหมด
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // แสดงแท็บที่เลือก
    if (tabName === 'scoreboard') {
        document.getElementById('adminScoreboardTab').style.display = 'block';
        tabs[0].classList.add('active');
        loadAdminScoreboard();
    } else if (tabName === 'submissions') {
        document.getElementById('adminSubmissionsTab').style.display = 'block';
        tabs[1].classList.add('active');
        loadSubmissions();
    } else if (tabName === 'rooms') {
        document.getElementById('adminRoomsTab').style.display = 'block';
        tabs[2].classList.add('active');
        loadRoomsAdmin();
    } else if (tabName === 'missions') {
        document.getElementById('adminMissionsTab').style.display = 'block';
        tabs[3].classList.add('active');
        loadMissionsAdmin();
    } else if (tabName === 'schedule') {
        document.getElementById('adminScheduleTab').style.display = 'block';
        tabs[4].classList.add('active');
        loadScheduleSettings();
    }
}

// ================================================
// Rooms Management (Admin)
// ================================================
function loadRoomsAdmin() {
    const container = document.getElementById('roomsAdminContainer');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดห้อง...</p>';
    
    // โหลดเฉพาะห้อง Word Guessing
    firebase.database().ref(`games/wordguessing/rooms`).on('value', (snapshot) => {
        container.innerHTML = '';
        
        const roomsData = snapshot.val();
        if (!roomsData || Object.keys(roomsData).length === 0) {
            container.innerHTML = `
                <p class="empty-state">
                    ยังไม่มีห้องที่สร้างไว้<br>
                    กดปุ่ม "➕ สร้างห้องใหม่" เพื่อสร้างห้องสำหรับผู้เล่น
                </p>`;
            return;
        }
        
        // แปลงเป็น array
        const roomsArray = Object.entries(roomsData).map(([key, value]) => ({ 
            roomId: key, 
            ...value 
        }));
        
        // เรียงตามเวลาสร้าง (ใหม่สุดก่อน)
        roomsArray.sort((a, b) => b.createdAt - a.createdAt);
        
        roomsArray.forEach(room => {
            const memberCount = room.members ? Object.keys(room.members).length : 0;
            const maxMembers = room.maxMembers || 5;
            const isFull = memberCount >= maxMembers;
            
            const card = document.createElement('div');
            card.className = 'room-admin-card';
            card.innerHTML = `
                <div class="room-header">
                    <div class="room-title">
                        <h4>🏠 ${room.name}</h4>
                        ${isFull ? '<span class="room-full-badge">🔒 เต็มแล้ว</span>' : '<span class="room-available-badge">✓ ว่าง</span>'}
                    </div>
                    <div class="room-code-display">
                        <span class="room-code-label">รหัสห้อง:</span>
                        <span class="room-code-value">${room.code}</span>
                        <button class="copy-small-btn" onclick="copyRoomCode('${room.code}')">📋</button>
                    </div>
                </div>
                
                <div class="room-stats">
                    <div class="room-stat-item">
                        <span class="stat-icon">👥</span>
                        <span>${memberCount}/${maxMembers} คน</span>
                    </div>
                    <div class="room-stat-item">
                        <span class="stat-icon">📅</span>
                        <span>${formatDateTimeShort(room.createdAt)}</span>
                    </div>
                </div>
                
                ${memberCount > 0 ? `
                    <div class="room-members-preview">
                        <strong>สมาชิก:</strong>
                        <div class="members-tags-small">
                            ${Object.values(room.members || {}).map(m => `
                                <span class="member-tag-small">${m.name}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : '<p style="color: #95A5A6; font-size: 0.85rem; margin: 10px 0;">ยังไม่มีสมาชิกเข้าห้อง</p>'}
                
                <div class="room-actions">
                    <button class="btn-delete-small" onclick="deleteRoom('${room.roomId}', '${room.name}')">
                        🗑️ ลบห้อง
                    </button>
                </div>
            `;
            
            container.appendChild(card);
        });
    });
}

function showCreateRoomForm() {
    // สร้างรหัสห้องใหม่
    const roomCode = generateTeamCode();
    document.getElementById('roomCodePreview').value = roomCode;
    document.getElementById('roomNameInput').value = '';
    document.getElementById('roomMaxMembers').value = 5;
    
    document.getElementById('roomFormModal').style.display = 'flex';
}

function closeRoomForm() {
    document.getElementById('roomFormModal').style.display = 'none';
}

async function saveRoom() {
    const roomName = document.getElementById('roomNameInput').value.trim();
    const roomCode = document.getElementById('roomCodePreview').value.trim();
    const maxMembers = parseInt(document.getElementById('roomMaxMembers').value) || 5;
    
    if (!roomName) {
        alert(t('pleaseEnterRoomName') || 'กรุณาใส่ชื่อห้อง!');
        return;
    }
    
    if (!roomCode) {
        alert('เกิดข้อผิดพลาดในการสร้างรหัสห้อง กรุณาลองใหม่');
        return;
    }
    
    try {
        const roomData = {
            name: roomName,
            code: roomCode,
            maxMembers: maxMembers,
            createdAt: Date.now(),
            createdBy: 'admin',
            members: {},
            game: 'wordguessing'
        };
        
        // บันทึกลง Firebase
        await firebase.database().ref(`games/wordguessing/rooms/${roomCode}`).set(roomData);
        
        closeRoomForm();
        alert(t('roomCreatedSuccess') || `✅ สร้างห้อง "${roomName}" สำเร็จ!\n\nรหัสห้อง: ${roomCode}\n\nแจกรหัสนี้ให้ผู้เล่นเพื่อเข้าร่วมห้อง`);
        loadRoomsAdmin();
        
    } catch (error) {
        console.error('Error creating room:', error);
        alert(t('errorOccurred') || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
}

function copyRoomCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert(`📋 คัดลอกรหัสห้องแล้ว: ${code}`);
    });
}

function copyRoomCodePreview() {
    const code = document.getElementById('roomCodePreview').value;
    navigator.clipboard.writeText(code).then(() => {
        alert(`📋 คัดลอกรหัสห้องแล้ว: ${code}`);
    });
}

async function deleteRoom(roomId, roomName) {
    if (!confirm(`⚠️ ต้องการลบห้อง "${roomName}" ใช่หรือไม่?\n\nการลบห้องจะลบข้อมูลทั้งหมดรวมถึงสมาชิกในห้องด้วย`)) {
        return;
    }
    
    try {
        await firebase.database().ref(`games/wordguessing/rooms/${roomId}`).remove();
        alert(`✅ ลบห้อง "${roomName}" เรียบร้อยแล้ว`);
        loadRoomsAdmin();
    } catch (error) {
        console.error('Error deleting room:', error);
        alert('เกิดข้อผิดพลาดในการลบห้อง');
    }
}

function formatDateTimeShort(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
}

// ================================================
// Load Missions for Admin Management
// ================================================
function loadMissionsAdmin() {
    const container = document.getElementById('missionsAdminContainer');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดภารกิจ...</p>';
    
    const gameName = GAME_CONFIG[currentAdminGame].name;
    
    firebase.database().ref(`games/${currentAdminGame}/missions`).once('value', (snapshot) => {
        container.innerHTML = '';
        
        const missionsData = snapshot.val();
        if (!missionsData || Object.keys(missionsData).length === 0) {
            container.innerHTML = `<p class="empty-state">ยังไม่มีภารกิจใน ${gameName}<br>กดปุ่ม "➕ เพิ่มภารกิจใหม่" เพื่อเริ่มต้น</p>`;
            return;
        }
        
        // แปลงเป็น array และเรียงตาม id
        const missionsArray = Object.entries(missionsData)
            .map(([key, value]) => ({ key, ...value }))
            .sort((a, b) => a.id - b.id);
        
        missionsArray.forEach(mission => {
            const missionType = mission.type || 'photo';
            const typeBadge = missionType === 'quiz' 
                ? '<span class="admin-type-badge quiz">❓ Quiz</span>' 
                : '<span class="admin-type-badge photo">📸 Photo</span>';
            
            const card = document.createElement('div');
            card.className = 'mission-admin-card';
            card.innerHTML = `
                <div class="mission-admin-info">
                    <div class="mission-admin-emoji">${mission.title.split(' ')[0]}</div>
                    <div class="mission-admin-details">
                        ${typeBadge}
                        <div class="mission-admin-title">${mission.title}</div>
                        <div class="mission-admin-points">🏆 ${mission.points} คะแนน</div>
                    </div>
                </div>
                <div class="mission-admin-actions">
                    <button class="edit-btn-small" onclick="editMission('${mission.key}')">✏️ แก้ไข</button>
                    <button class="delete-btn-small" onclick="deleteMission('${mission.key}', '${mission.title}')">🗑️ ลบ</button>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// ================================================
// Toggle Mission Type Fields
// ================================================
function toggleMissionTypeFields() {
    const missionType = document.getElementById('missionType').value;
    const answerFieldsContainer = document.getElementById('answerFieldsContainer');
    
    if (missionType === 'quiz') {
        answerFieldsContainer.style.display = 'block';
    } else {
        answerFieldsContainer.style.display = 'none';
    }
}

// ================================================
// Show Add Mission Form
// ================================================
function showAddMissionForm() {
    document.getElementById('missionFormTitle').textContent = t('addNewMission');
    document.getElementById('missionType').value = 'photo';
    document.getElementById('missionEmoji').value = '';
    document.getElementById('missionTitle_th').value = '';
    document.getElementById('missionTitle_en').value = '';
    document.getElementById('missionAnswer_th').value = '';
    document.getElementById('missionAnswer_en').value = '';
    document.getElementById('missionPoints').value = '10';
    document.getElementById('editMissionId').value = '';
    toggleMissionTypeFields();
    document.getElementById('missionFormModal').style.display = 'block';
}

// ================================================
// Edit Mission
// ================================================
function editMission(missionKey) {
    firebase.database().ref(`games/${currentAdminGame}/missions/${missionKey}`).once('value', (snapshot) => {
        const mission = snapshot.val();
        if (!mission) return;
        
        // Check if bilingual or legacy format
        let emoji, titleWithoutEmoji_th, titleWithoutEmoji_en;
        
        if (mission.title_th) {
            // New bilingual format
            const titleParts_th = mission.title_th.split(' ');
            emoji = titleParts_th[0];
            titleWithoutEmoji_th = titleParts_th.slice(1).join(' ');
            
            const titleParts_en = (mission.title_en || '').split(' ');
            titleWithoutEmoji_en = titleParts_en.slice(1).join(' ') || '';
        } else {
            // Legacy format - use title for both languages
            const titleParts = mission.title.split(' ');
            emoji = titleParts[0];
            titleWithoutEmoji_th = titleParts.slice(1).join(' ');
            titleWithoutEmoji_en = '';
        }
        
        document.getElementById('missionFormTitle').textContent = t('editMission');
        document.getElementById('missionType').value = mission.type || 'photo';
        document.getElementById('missionEmoji').value = emoji;
        document.getElementById('missionTitle_th').value = titleWithoutEmoji_th;
        document.getElementById('missionTitle_en').value = titleWithoutEmoji_en;
        document.getElementById('missionAnswer_th').value = mission.answer_th || mission.answer || '';
        document.getElementById('missionAnswer_en').value = mission.answer_en || '';
        document.getElementById('missionPoints').value = mission.points;
        document.getElementById('editMissionId').value = missionKey;
        toggleMissionTypeFields();
        document.getElementById('missionFormModal').style.display = 'block';
    });
}

// ================================================
// Save Mission (Add or Update)
// ================================================
function saveMission() {
    const missionType = document.getElementById('missionType').value;
    const emoji = document.getElementById('missionEmoji').value.trim();
    const title_th = document.getElementById('missionTitle_th').value.trim();
    const title_en = document.getElementById('missionTitle_en').value.trim();
    const answer_th = document.getElementById('missionAnswer_th').value.trim();
    const answer_en = document.getElementById('missionAnswer_en').value.trim();
    const points = parseInt(document.getElementById('missionPoints').value);
    const editMissionId = document.getElementById('editMissionId').value;
    
    // Validation
    if (!emoji || !title_th || !title_en || !points) {
        alert(t('fillAllFields'));
        return;
    }
    
    if (missionType === 'quiz' && (!answer_th || !answer_en)) {
        alert(t('fillQuizAnswers'));
        return;
    }
    
    if (points < 5 || points > 100) {
        alert(t('pointsRange'));
        return;
    }
    
    const fullTitle_th = `${emoji} ${title_th}`;
    const fullTitle_en = `${emoji} ${title_en}`;
    
    const missionData = {
        title_th: fullTitle_th,
        title_en: fullTitle_en,
        // Keep legacy title field for backward compatibility
        title: fullTitle_th,
        description: title_th,
        points: points,
        type: missionType
    };
    
    // เพิ่มคำตอบสำหรับ Quiz
    if (missionType === 'quiz') {
        missionData.answer_th = answer_th;
        missionData.answer_en = answer_en;
        // Keep legacy answer field for backward compatibility
        missionData.answer = answer_th;
    }
    
    if (editMissionId) {
        // แก้ไขภารกิจเดิม
        firebase.database().ref(`games/${currentAdminGame}/missions/${editMissionId}`).update(missionData)
            .then(() => {
                alert(t('missionSaved'));
                closeMissionForm();
                loadMissionsAdmin();
            }).catch((error) => {
                alert(`${t('errorOccurred')} ${error.message}`);
            });
    } else {
        // เพิ่มภารกิจใหม่
        firebase.database().ref(`games/${currentAdminGame}/missions`).once('value', (snapshot) => {
            const missionsData = snapshot.val() || {};
            const maxId = Object.values(missionsData).reduce((max, m) => Math.max(max, m.id || 0), 0);
            const newId = maxId + 1;
            
            missionData.id = newId;
            
            const newMissionRef = firebase.database().ref(`games/${currentAdminGame}/missions`).push();
            newMissionRef.set(missionData)
                .then(() => {
                    alert(t('missionSaved'));
                    closeMissionForm();
                    loadMissionsAdmin();
                }).catch((error) => {
                    alert(`${t('errorOccurred')} ${error.message}`);
                });
        });
    }
}

// ================================================
// Delete Mission
// ================================================
function deleteMission(missionKey, missionTitle) {
    if (!confirm(`${t('confirmDeleteMission')} "${missionTitle}" ${t('deleteMissionConfirm')}`)) {
        return;
    }
    
    firebase.database().ref(`games/${currentAdminGame}/missions/${missionKey}`).remove()
        .then(() => {
            alert(t('missionDeleteSuccess'));
            loadMissionsAdmin();
        })
        .catch((error) => {
            alert(`${t('errorOccurred')} ${error.message}`);
        });
}

// ================================================
// Close Mission Form Modal
// ================================================
function closeMissionForm() {
    document.getElementById('missionFormModal').style.display = 'none';
}

// ================================================
// Schedule Management
// ================================================
function loadScheduleSettings() {
    // โหลดการตั้งเวลา
    firebase.database().ref(`games/${currentAdminGame}/schedule`).once('value', (snapshot) => {
        const schedule = snapshot.val();
        
        if (schedule && schedule.start && schedule.end) {
            // แปลง timestamp เป็น datetime-local format
            document.getElementById('scheduleStart').value = new Date(schedule.start).toISOString().slice(0, 16);
            document.getElementById('scheduleEnd').value = new Date(schedule.end).toISOString().slice(0, 16);
            
            updateScheduleDisplay(schedule);
        } else {
            document.getElementById('scheduleStatus').textContent = 'ไม่มีการจำกัดเวลา';
            document.getElementById('displayStart').textContent = '-';
            document.getElementById('displayEnd').textContent = '-';
        }
    });
    
    // โหลดการตั้งค่าจำนวนสมาชิก
    firebase.database().ref(`games/${currentAdminGame}/settings/maxMembers`).once('value', (snapshot) => {
        const maxMembers = snapshot.val() || 5;
        document.getElementById('maxMembersInput').value = maxMembers;
        document.getElementById('displayMaxMembers').textContent = maxMembers;
    });
}

function updateScheduleDisplay(schedule) {
    const now = Date.now();
    const start = schedule.start;
    const end = schedule.end;
    
    let status = '';
    let statusColor = '';
    
    if (now < start) {
        status = '⏳ ยังไม่เริ่ม';
        statusColor = '#FFA502';
    } else if (now >= start && now <= end) {
        status = '✅ กำลังดำเนินการ';
        statusColor = '#4ECDC4';
    } else {
        status = '❌ สิ้นสุดแล้ว';
        statusColor = '#FF6B6B';
    }
    
    const statusElement = document.getElementById('scheduleStatus');
    statusElement.textContent = status;
    statusElement.style.color = statusColor;
    statusElement.style.fontWeight = 'bold';
    
    document.getElementById('displayStart').textContent = formatDateTime(start);
    document.getElementById('displayEnd').textContent = formatDateTime(end);
}

function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} เวลา ${hours}:${minutes} น.`;
}

function saveSchedule() {
    const startValue = document.getElementById('scheduleStart').value;
    const endValue = document.getElementById('scheduleEnd').value;
    
    if (!startValue || !endValue) {
        alert('❌ กรุณาเลือกเวลาเริ่มและสิ้นสุด');
        return;
    }
    
    const startTime = new Date(startValue).getTime();
    const endTime = new Date(endValue).getTime();
    
    if (startTime >= endTime) {
        alert('❌ เวลาเริ่มต้องน้อยกว่าเวลาสิ้นสุด');
        return;
    }
    
    const gameName = GAME_CONFIG[currentAdminGame].name;
    firebase.database().ref(`games/${currentAdminGame}/schedule`).set({
        start: startTime,
        end: endTime
    }).then(() => {
        alert(`✅ บันทึกเวลาสำหรับ ${gameName} สำเร็จ!`);
        loadScheduleSettings();
    }).catch((error) => {
        alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    });
}

function clearSchedule() {
    const gameName = GAME_CONFIG[currentAdminGame].name;
    if (!confirm(`⚠️ ต้องการลบการตั้งเวลาของ ${gameName} ใช่หรือไม่?\n(ภารกิจจะสามารถทำได้ตลอดเวลา)`)) {
        return;
    }
    
    firebase.database().ref(`games/${currentAdminGame}/schedule`).remove()
        .then(() => {
            alert('✅ ลบการตั้งเวลาสำเร็จ!');
            document.getElementById('scheduleStart').value = '';
            document.getElementById('scheduleEnd').value = '';
            loadScheduleSettings();
        })
        .catch((error) => {
            alert('❌ เกิดข้อผิดพลาด: ' + error.message);
        });
}

// ================================================
// Max Members Management
// ================================================
function saveMaxMembers() {
    const maxMembers = parseInt(document.getElementById('maxMembersInput').value);
    
    if (!maxMembers || maxMembers < 2 || maxMembers > 20) {
        alert('❌ กรุณาใส่จำนวนสมาชิกระหว่าง 2-20 คน');
        return;
    }
    
    const gameName = GAME_CONFIG[currentAdminGame].name;
    firebase.database().ref(`games/${currentAdminGame}/settings/maxMembers`).set(maxMembers)
        .then(() => {
            alert(`✅ บันทึกสำเร็จ! ${gameName} จำกัดจำนวนสมาชิกสูงสุด ${maxMembers} คน`);
            document.getElementById('displayMaxMembers').textContent = maxMembers;
        })
        .catch((error) => {
            alert('❌ เกิดข้อผิดพลาด: ' + error.message);
        });
}

// ================================================
// Close modal when clicking outside
// ================================================
window.onclick = function(event) {
    const photoModal = document.getElementById('photoModal');
    const quizModal = document.getElementById('quizModal');
    const missionFormModal = document.getElementById('missionFormModal');
    
    if (event.target === photoModal) {
        closeModal();
    }
    if (event.target === quizModal) {
        closeQuizModal();
    }
    if (event.target === missionFormModal) {
        closeMissionForm();
    }
};

// ================================================
// Submissions Review (Admin)
// ================================================
let currentTeamForSubmissions = null;

async function loadSubmissions() {
    // Show team list view
    document.getElementById('submissionsTeamListView').style.display = 'block';
    document.getElementById('submissionsDetailView').style.display = 'none';
    
    const container = document.getElementById('submissionsTeamList');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดข้อมูล...</p>';
    
    try {
        // Load teams and submissions
        const teamsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/teams`).once('value');
        const submissionsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/submissions`).once('value');
        
        const teamsData = teamsSnapshot.val();
        const submissionsData = submissionsSnapshot.val();
        
        if (!teamsData) {
            container.innerHTML = '<div class="empty-submissions">📭 ยังไม่มีทีม</div>';
            updateSubmissionStats(0, 0, 0);
            return;
        }
        
        // Calculate stats per team
        const teamStats = {};
        
        if (submissionsData) {
            Object.values(submissionsData).forEach(submission => {
                if (!teamStats[submission.teamId]) {
                    teamStats[submission.teamId] = {
                        total: 0,
                        approved: 0,
                        revoked: 0
                    };
                }
                teamStats[submission.teamId].total++;
                if (submission.status === 'approved') {
                    teamStats[submission.teamId].approved++;
                } else if (submission.status === 'revoked') {
                    teamStats[submission.teamId].revoked++;
                }
            });
        }
        
        // Calculate overall stats
        const allSubmissions = submissionsData ? Object.values(submissionsData) : [];
        const approvedCount = allSubmissions.filter(s => s.status === 'approved').length;
        const revokedCount = allSubmissions.filter(s => s.status === 'revoked').length;
        updateSubmissionStats(approvedCount, revokedCount, allSubmissions.length);
        
        // Display team cards
        container.innerHTML = '';
        
        Object.entries(teamsData).forEach(([teamId, team]) => {
            const stats = teamStats[teamId] || { total: 0, approved: 0, revoked: 0 };
            const card = createTeamSubmissionCard(teamId, team, stats);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading submissions:', error);
        container.innerHTML = '<div class="empty-submissions">❌ เกิดข้อผิดพลาดในการโหลดข้อมูล</div>';
    }
}

function createTeamSubmissionCard(teamId, team, stats) {
    const card = document.createElement('div');
    card.className = 'team-submission-card';
    card.onclick = () => showTeamSubmissionsDetail(teamId, team.name || team.teamName || 'Unknown Team');
    
    card.innerHTML = `
        <div class="team-submission-header">
            <div class="team-submission-icon">🚗</div>
            <div class="team-submission-info">
                <div class="team-submission-name">${team.name || team.teamName || 'Unknown Team'}</div>
                <div class="team-submission-code">รหัส: ${teamId}</div>
            </div>
        </div>
        <div class="team-submission-stats">
            <div class="team-stat">
                <span class="team-stat-value">${stats.total}</span>
                <span class="team-stat-label">ส่งทั้งหมด</span>
            </div>
            <div class="team-stat">
                <span class="team-stat-value">${stats.approved}</span>
                <span class="team-stat-label">อนุมัติ</span>
            </div>
            <div class="team-stat revoked">
                <span class="team-stat-value">${stats.revoked}</span>
                <span class="team-stat-label">ยกเลิก</span>
            </div>
            <div class="team-stat score">
                <span class="team-stat-value">${team.score || 0}</span>
                <span class="team-stat-label">คะแนน</span>
            </div>
        </div>
    `;
    
    return card;
}

async function showTeamSubmissionsDetail(teamId, teamName) {
    currentTeamForSubmissions = teamId;
    
    // Hide team list, show detail view
    document.getElementById('submissionsTeamListView').style.display = 'none';
    document.getElementById('submissionsDetailView').style.display = 'block';
    
    // Update title
    document.getElementById('submissionsDetailTitle').textContent = `📋 รายการส่งงาน: ${teamName}`;
    
    // Load submissions for this team
    await loadTeamSubmissionsDetail();
    
    // Populate mission filter
    await populateSubmissionFilters();
}

function backToTeamList() {
    currentTeamForSubmissions = null;
    document.getElementById('submissionsTeamListView').style.display = 'block';
    document.getElementById('submissionsDetailView').style.display = 'none';
}

async function loadTeamSubmissionsDetail() {
    if (!currentTeamForSubmissions) return;
    
    const container = document.getElementById('submissionsDetailContainer');
    container.innerHTML = '<p class="loading">📦 กำลังโหลดข้อมูล...</p>';
    
    const filterMission = document.getElementById('filterMission').value;
    const filterStatus = document.getElementById('filterStatus').value;
    
    try {
        const submissionsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/submissions`).once('value');
        const submissionsData = submissionsSnapshot.val();
        
        if (!submissionsData) {
            container.innerHTML = '<div class="empty-submissions">📭 ยังไม่มีการส่งงาน</div>';
            return;
        }
        
        // Filter by team and other criteria
        let submissionsArray = Object.entries(submissionsData)
            .map(([key, value]) => ({ key, ...value }))
            .filter(s => s.teamId === currentTeamForSubmissions)
            .sort((a, b) => b.timestamp - a.timestamp);
        
        // Apply filters
        if (filterMission !== 'all') {
            submissionsArray = submissionsArray.filter(s => s.missionId == filterMission);
        }
        if (filterStatus !== 'all') {
            submissionsArray = submissionsArray.filter(s => s.status === filterStatus);
        }
        
        // Display submissions
        container.innerHTML = '';
        if (submissionsArray.length === 0) {
            container.innerHTML = '<div class="empty-submissions">🔍 ไม่พบข้อมูลตามเงื่อนไขที่เลือก</div>';
            return;
        }
        
        submissionsArray.forEach(submission => {
            const card = createSubmissionCard(submission);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading team submissions:', error);
        container.innerHTML = '<div class="empty-submissions">❌ เกิดข้อผิดพลาดในการโหลดข้อมูล</div>';
    }
}

function createSubmissionCard(submission) {
    const card = document.createElement('div');
    card.className = `submission-card ${submission.status === 'revoked' ? 'revoked' : ''}`;
    
    // Status badge for different statuses
    let statusBadge = '';
    if (submission.status === 'revoked') {
        statusBadge = `<span class="submission-status revoked" data-i18n="statusRejected">❌ ปฏิเสธ</span>`;
    } else if (submission.status === 'pending') {
        statusBadge = `<span class="submission-status pending" data-i18n="statusPending">⏳ รอตรวจสอบ</span>`;
    } else if (submission.status === 'approved') {
        const approvedLabel = submission.missionType === 'quiz' && submission.userAnswer 
            ? t('statusAutoApproved') 
            : t('approved');
        statusBadge = `<span class="submission-status approved">✅ ${approvedLabel}</span>`;
    }
    
    const timeStr = new Date(submission.timestamp).toLocaleString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let contentHTML = '';
    if (submission.missionType === 'photo') {
        contentHTML = `
            <div class="submission-content">
                <img src="${submission.photoBase64}" alt="Photo" class="submission-photo" onclick="showLightbox('${submission.photoBase64}')">
            </div>
        `;
    } else if (submission.missionType === 'quiz') {
        // แสดงคำตอบของผู้เล่นและคำตอบที่ถูกต้อง
        const correctAnswer_th = submission.correctAnswer_th || submission.correctAnswer || '-';
        const correctAnswer_en = submission.correctAnswer_en || '-';
        
        contentHTML = `
            <div class="submission-content quiz-submission">
                <div class="quiz-answer-row">
                    <div class="submission-answer-label" data-i18n="yourAnswerIs">💭 คำตอบของคุณ:</div>
                    <div class="submission-answer user-answer">${submission.userAnswer}</div>
                </div>
                <div class="quiz-answer-row" style="margin-top: 10px;">
                    <div class="submission-answer-label" data-i18n="correctAnswerIs">✓ คำตอบที่ถูกต้อง:</div>
                    <div class="submission-answer correct-answer">
                        <div>🇹🇭 ${correctAnswer_th}</div>
                        ${correctAnswer_en !== '-' ? `<div>🇬🇧 ${correctAnswer_en}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    const isRevoked = submission.status === 'revoked';
    const isPending = submission.status === 'pending';
    
    // Show revoked reason if exists
    let revokedReasonHTML = '';
    if (isRevoked && submission.revokedReason) {
        revokedReasonHTML = `
            <div class="revoked-reason">
                <strong>🚫 <span data-i18n="reason">เหตุผลที่ยกเลิก:</span></strong> ${submission.revokedReason}
            </div>
        `;
    }
    
    // Action buttons - แสดงต่างกันตาม status และ missionType
    let actionsHTML = '';
    if (submission.missionType === 'quiz' && isPending) {
        // Quiz pending: แสดงปุ่ม Approve/Reject
        actionsHTML = `
            <div class="submission-actions quiz-actions">
                <button class="approve-btn" onclick="approveQuizSubmission('${submission.key}', '${submission.teamId}', ${submission.missionId}, ${submission.missionPoints})" data-i18n="approveAnswer">
                    ✅ อนุมัติคำตอบ
                </button>
                <button class="reject-btn" onclick="rejectQuizSubmission('${submission.key}')" data-i18n="rejectAnswer">
                    ❌ ปฏิเสธคำตอบ
                </button>
            </div>
        `;
    } else if (!isRevoked && submission.status === 'approved') {
        // Approved: แสดงปุ่มยกเลิก
        actionsHTML = `
            <div class="submission-actions">
                <button class="revoke-btn" onclick="revokeSubmission('${submission.key}', '${submission.teamId}', ${submission.missionId}, ${submission.missionPoints})">
                    ❌ ยกเลิกและตัดคะแนน
                </button>
            </div>
        `;
    } else if (isRevoked) {
        // Already revoked
        actionsHTML = `
            <div class="submission-actions">
                <button class="revoke-btn" disabled>
                    ❌ ยกเลิกแล้ว
                </button>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="submission-header">
            <div class="submission-info">
                <div class="submission-team">🚗 ${submission.teamName}</div>
                <div class="submission-mission">${submission.missionTitle}</div>
                <div class="submission-meta">
                    👤 <span data-i18n="submittedBy">ส่งโดย:</span> ${submission.submittedBy} | 🕐 ${timeStr}
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end;">
                <div class="submission-points">+${submission.missionPoints}</div>
                ${statusBadge}
            </div>
        </div>
        ${revokedReasonHTML}
        ${contentHTML}
        ${actionsHTML}
    `;
    
    // Update translations for dynamic content
    updatePageLanguage();
    
    return card;
}

// ================================================
// Quiz Submission Approval/Rejection Functions
// ================================================

async function approveQuizSubmission(submissionKey, teamId, missionId, points) {
    const confirmed = confirm(t('confirmApprove') + `\n\n+${points} ${t('points')}`);
    if (!confirmed) return;
    
    try {
        // Update submission status to approved
        await firebase.database().ref(`games/${currentAdminGame}/submissions/${submissionKey}`).update({
            status: 'approved',
            approvedAt: Date.now()
        });
        
        // Mark mission as completed
        const submissionSnapshot = await firebase.database().ref(`games/${currentAdminGame}/submissions/${submissionKey}`).once('value');
        const submission = submissionSnapshot.val();
        
        await firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}/missions/${missionId}`).set({
            completed: true,
            attempted: false, // ไม่ใช่ pending แล้ว
            completedBy: submission.submittedBy,
            answer: submission.userAnswer,
            timestamp: submission.timestamp
        });
        
        // Award points retroactively
        const teamRef = firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}`);
        const teamSnapshot = await teamRef.once('value');
        const teamData = teamSnapshot.val();
        
        if (teamData) {
            const newScore = (teamData.score || 0) + points;
            await teamRef.child('score').set(newScore);
        }
        
        alert(t('approveSuccess'));
        loadTeamSubmissionsDetail(); // Reload list
        
    } catch (error) {
        console.error('Error approving quiz submission:', error);
        alert(`${t('errorOccurred')} ${error.message}`);
    }
}

async function rejectQuizSubmission(submissionKey) {
    const reason = prompt(t('confirmReject') + '\n\n' + t('reason') + ':');
    
    if (reason === null) return; // User cancelled
    
    try {
        // Update submission status to rejected
        await firebase.database().ref(`games/${currentAdminGame}/submissions/${submissionKey}`).update({
            status: 'revoked',
            revokedAt: Date.now(),
            revokedReason: reason.trim() || 'คำตอบไม่ถูกต้อง / Wrong answer'
        });
        
        alert(t('rejectSuccess'));
        loadTeamSubmissionsDetail(); // Reload list
        
    } catch (error) {
        console.error('Error rejecting quiz submission:', error);
        alert(`${t('errorOccurred')} ${error.message}`);
    }
}

// ================================================
// Revoke Submission (for already approved missions)
// ================================================

async function revokeSubmission(submissionKey, teamId, missionId, points) {
    // Ask for reason
    const reason = prompt(
        `⚠️ ยกเลิกภารกิจนี้?\n\n` +
        `กรุณาระบุเหตุผล (เช่น ส่งรูปผิด, ตอบผิด):\n\n` +
        `หมายเหตุ:\n` +
        `- จะตัดคะแนน ${points} คะแนน\n` +
        `- ทีมนี้จะไม่สามารถทำภารกิจนี้ใหม่ได้`
    );
    
    if (!reason || reason.trim() === '') {
        alert('❌ กรุณาระบุเหตุผลในการยกเลิก');
        return;
    }
    
    try {
        // Update submission status with reason
        await firebase.database().ref(`games/${currentAdminGame}/submissions/${submissionKey}`).update({
            status: 'revoked',
            revokedAt: Date.now(),
            revokedReason: reason.trim()
        });
        
        // Mark mission as revoked (NOT remove - keep it locked)
        await firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}/missions/${missionId}`).update({
            completed: false,
            revoked: true,
            revokedReason: reason.trim(),
            revokedAt: Date.now()
        });
        
        // Deduct points
        const teamSnapshot = await firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}`).once('value');
        const teamData = teamSnapshot.val();
        const newScore = Math.max(0, (teamData.score || 0) - points);
        await firebase.database().ref(`games/${currentAdminGame}/teams/${teamId}/score`).set(newScore);
        
        alert(`✅ ยกเลิกภารกิจสำเร็จ!\n\n✂️ ตัดคะแนน: -${points}\n🚫 เหตุผล: ${reason}\n⚠️ ทีมนี้ไม่สามารถทำภารกิจนี้ใหม่ได้`);
        
        // Reload current view
        if (currentTeamForSubmissions) {
            loadTeamSubmissionsDetail();
        } else {
            loadSubmissions();
        }
        
    } catch (error) {
        console.error('Error revoking submission:', error);
        alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    }
}

function updateSubmissionStats(approved, revoked, total) {
    document.getElementById('approvedCount').textContent = approved;
    document.getElementById('revokedCount').textContent = revoked;
    document.getElementById('totalSubmissions').textContent = total;
}

async function populateSubmissionFilters() {
    try {
        // Populate mission filter (only available in detail view)
        const missionsSnapshot = await firebase.database().ref(`games/${currentAdminGame}/missions`).once('value');
        const missionsData = missionsSnapshot.val();
        
        const missionFilter = document.getElementById('filterMission');
        if (missionFilter) {
            missionFilter.innerHTML = '<option value="all">ทุกภารกิจ</option>';
            
            if (missionsData) {
                Object.values(missionsData)
                    .sort((a, b) => a.id - b.id)
                    .forEach(mission => {
                        const option = document.createElement('option');
                        option.value = mission.id;
                        option.textContent = mission.title;
                        missionFilter.appendChild(option);
                    });
            }
        }
        
    } catch (error) {
        console.error('Error populating filters:', error);
    }
}

// ================================================
// Show Team Submissions (from Scoreboard)
// ================================================
async function showTeamSubmissions(teamId, teamName) {
    // Switch to submissions tab
    showAdminTab('submissions');
    
    // Wait for tab to load
    setTimeout(async () => {
        // Go directly to team detail view
        await showTeamSubmissionsDetail(teamId, teamName);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
}
