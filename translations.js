// ================================================
// Multi-Language Translation System
// Road Trip 2025 - Bingo Firebase
// ================================================

const translations = {
    th: {
        // Welcome & Navigation
        selectGame: 'เลือกเกม',
        staff: 'สำหรับเจ้าหน้าที่',
        back: '← กลับ',
        createButton: '✨ Create Team',
        startButton: '✨ Start Playing',
        
        // Solo Mode
        pleaseEnterName: 'Please enter your name!',
        pleaseFillAll: 'Please fill in all fields!',
        errorOccurred: 'An error occurred. Please try again.',
        selectGameFirst: 'Please select a game first!',
        teamLeader: 'Team Leader',    back: '← กลับ',
        
        // Game Menu
        selectCreateJoin: 'เลือกสร้างหรือเข้าร่วมทีม',
        createTeam: 'สร้างห้องเพื่อเริ่มเล่นเกม',
        createTeamDesc: 'สำหรับหัวหน้าทีม/คนขับรถ',
        joinTeam: 'เข้าร่วมทีม',
        joinTeamDesc: 'ใส่รหัสทีมที่ได้รับ',
        
        // Create Team Form
        createNewTeam: '🎮 เริ่มเกม',
        startPlaying: '🎮 เริ่มเล่น',
        teamName: 'ชื่อทีม',
        teamNamePlaceholder: 'เช่น รถ 1 - ทีมสายฟ้า',
        leaderName: 'ชื่อของคุณ',
        leaderNamePlaceholder: 'ใส่ชื่อของคุณ',
        createButton: '✨ สร้างทีม',
        startButton: '✨ เริ่มเล่น',
        
        // Solo Mode
        pleaseEnterName: 'กรุณาใส่ชื่อของคุณ!',
        pleaseFillAll: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
        errorOccurred: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        selectGameFirst: 'กรุณาเลือกเกมก่อน!',
        teamLeader: 'หัวหน้าทีม',
        
        // Team Code Display
        teamCreatedSuccess: '🎉 สร้างทีมสำเร็จ!',
        yourTeamCode: 'รหัสทีมของคุณ',
        shareCode: '📱 แชร์รหัสนี้ให้เพื่อนในรถ',
        copyCode: '📋 คัดลอกรหัส',
        startGame: '🚀 เริ่มเกม',
        
        // Join Team Form
        joinExistingTeam: '👥 เข้าร่วมทีม',
        teamCode: 'รหัสทีม (6 หลัก)',
        teamCodePlaceholder: 'ABC123',
        yourName: 'ชื่อของคุณ',
        yourNamePlaceholder: 'ใส่ชื่อของคุณ',
        joinButton: '✓ เข้าร่วม',
        
        // Game Board
        team: 'ทีม',
        score: 'คะแนน',
        members: 'สมาชิก',
        missionsCompleted: 'ภารกิจเสร็จ',
        membersInTeam: '👥 สมาชิกในทีม',
        people: 'คน',
        allMissions: '🎯 ภารกิจทั้งหมด',
        loading: '📦 กำลังโหลดภารกิจ...',
        noMissions: 'ยังไม่มีภารกิจในระบบ',
        viewAll: '👥 ดูทั้งหมด',
        hide: '👥 ซ่อน',
        
        // Mission Status
        completedBy: 'ทำโดย',
        missionRevoked: '🚫 ภารกิจถูกยกเลิก',
        reason: 'เหตุผล',
        failedVerification: 'ไม่ผ่านการตรวจสอบ',
        takePhoto: '📸 ถ่ายรูป',
        answerQuestion: '❓ ตอบคำถาม',
        alreadyCompleted: '✓ สำเร็จแล้ว',
        revoked: '🚫 ถูกยกเลิก',
        
        // Mission Types
        photoMission: '📸 ถ่ายรูป',
        quizMission: '❓ ตอบคำถาม',
        
        // Schedule Messages
        notStartedYet: 'ยังไม่ถึงเวลาทำภารกิจ',
        missionWillStart: 'ภารกิจจะเริ่มในวันที่',
        timeExpired: 'หมดเวลาทำภารกิจแล้ว',
        missionEndedAt: 'ภารกิจสิ้นสุดเมื่อ',
        leaveRoomBtn: '🚪 ออกจากห้องและไปเกมใหม่',
        timeRemaining: 'เหลือเวลา',
        
        // Photo Modal
        takePhotoTitle: 'ถ่ายรูป',
        confirmMission: '✓ ยืนยันภารกิจ',
        takePhotoFirst: 'กรุณาถ่ายรูปก่อน!',
        saving: 'กำลังบันทึก...',
        missionSuccess: '🎉 สำเร็จ!',
        missionCompleted: 'ทำภารกิจสำเร็จ',
        
        // Quiz Modal
        answerQuestionTitle: '❓ ตอบคำถาม',
        yourAnswer: '💭 คำตอบของคุณ:',
        typeAnswer: 'พิมพ์คำตอบ...',
        submitAnswer: '✓ ส่งคำตอบ',
        
        // Team Roles
        leader: 'หัวหน้าทีม',
        member: 'สมาชิก',
        
        // Admin Panel
        adminPanel: '👑 Admin Panel',
        selectGameToManage: 'เลือกเกมที่ต้องการจัดการ',
        teamScores: '🏆 คะแนนทีม',
        checkSubmissions: '📋 ตรวจสอบการส่งงาน',
        manageRooms: '🏠 จัดการห้อง',
        manageMissions: '🎯 จัดการภารกิจ',
        setSchedule: '⏰ ตั้งเวลา',
        
        // Rooms Management
        createNewRoom: '➕ สร้างห้องใหม่',
        roomsDesc: 'สร้างห้องล่วงหน้าสำหรับผู้เล่น Word Guessing เข้าร่วม',
        roomName: 'ชื่อห้อง',
        roomNamePlaceholder: 'เช่น ห้อง A - กลุ่มแรก',
        roomNameHint: '💡 ตั้งชื่อห้องให้เข้าใจง่าย เช่น ห้องตามกลุ่ม หรือตามรอบ',
        maxRoomMembers: 'จำนวนสมาชิกสูงสุด',
        maxMembersHint: '💡 กำหนดจำนวนผู้เล่นสูงสุดที่สามารถเข้าห้องนี้ได้',
        roomCodeHint: '💡 รหัสนี้จะถูกสร้างอัตโนมัติ แจกให้ผู้เล่นเพื่อเข้าห้อง',
        createRoom: '✓ สร้างห้อง',
        pleaseEnterRoomName: 'กรุณาใส่ชื่อห้อง!',
        roomCreatedSuccess: '✅ สร้างห้องสำเร็จ!',
        deleteRoomConfirm: '⚠️ ต้องการลบห้องนี้ใช่หรือไม่?',
        roomDeletedSuccess: '✅ ลบห้องเรียบร้อยแล้ว',
        showingTeamsFor: 'กำลังแสดงทีมของเกม',
        noTeamsYet: 'ยังไม่มีทีมใน',
        viewPhotos: '📸 ดูรูปภาพ',
        viewSubmissions: '📋 ดูการส่งงาน',
        missions: 'ภารกิจ',
        
        // Admin Controls
        teamManagement: '🔧 การจัดการทีม',
        resetAllScores: '🔄 รีเซ็ตคะแนนทั้งหมด',
        deleteAllTeams: '🗑️ ลบทีมทั้งหมด',
        
        // Missions Admin
        addNewMission: '➕ เพิ่มภารกิจใหม่',
        noMissionsInGame: 'ยังไม่มีภารกิจใน',
        clickToAdd: 'กดปุ่ม "➕ เพิ่มภารกิจใหม่" เพื่อเริ่มต้น',
        edit: '✏️ แก้ไข',
        delete: '🗑️ ลบ',
        points: 'คะแนน',
        
        // Mission Form
        addMission: '➕ เพิ่มภารกิจใหม่',
        editMission: '✏️ แก้ไขภารกิจ',
        missionType: 'ประเภทภารกิจ',
        photoMissionType: '📸 ถ่ายรูป (Photo Mission)',
        quizMissionType: '❓ ตอบคำถาม (Quiz Mission)',
        emoji: 'Emoji',
        missionTitleTH: 'ชื่อภารกิจ (ภาษาไทย)',
        missionTitleEN: 'Mission Title (English)',
        missionTitlePlaceholder: 'เช่น ถ่ายรูปกับหมา',
        missionTitlePlaceholderEN: 'e.g. Take a Photo with Dog',
        correctAnswerTH: 'คำตอบ (ภาษาไทย)',
        correctAnswerEN: 'Answer (English)',
        answerPlaceholder: 'พิมพ์คำตอบ (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)',
        answerPlaceholderEN: 'Type answer (case insensitive)',
        answerHint: '💡 ผู้เล่นต้องพิมพ์คำตอบให้ตรงกับนี้ถึงจะได้คะแนน',
        missionPoints: 'คะแนน',
        cancel: 'ยกเลิก',
        save: '✓ บันทึก',
        
        // Schedule Settings
        setMissionSchedule: '⏰ กำหนดเวลาภารกิจ',
        scheduleDesc: 'ตั้งเวลาเริ่มและสิ้นสุดการทำภารกิจ',
        missionStart: '📅 เริ่มทำภารกิจ:',
        missionEnd: '🏁 สิ้นสุดภารกิจ:',
        currentStatus: 'สถานะปัจจุบัน:',
        start: 'เริ่ม:',
        end: 'สิ้นสุด:',
        saveSchedule: '💾 บันทึกเวลา',
        clearSchedule: '🗑️ ลบการตั้งเวลา',
        limitTeamMembers: '👥 จำกัดจำนวนสมาชิกในทีม',
        limitMembersDesc: 'กำหนดจำนวนสมาชิกสูงสุดที่สามารถเข้าร่วมทีมได้',
        maxMembers: 'จำนวนสมาชิกสูงสุด (รวมหัวหน้าทีม):',
        currentMaxMembers: 'จำนวนสมาชิกสูงสุดปัจจุบัน:',
        saveSettings: '💾 บันทึกการตั้งค่า',
        
        // Submissions
        selectTeamToCheck: '📋 เลือกทีมที่ต้องการตรวจสอบ',
        approved: 'อนุมัติแล้ว:',
        revokedLabel: 'ยกเลิกแล้ว:',
        total: 'ทั้งหมด:',
        noSubmissions: '📭 ยังไม่มีทีม',
        submittedBy: 'ส่งโดย:',
        
        // Game Rules
        rulesTitle: '📋 กฎกติกาการเล่น',
        understand: '✓ เข้าใจแล้ว เริ่มเล่นเลย!',
        snapVentureTitle: 'วิธีการเล่น',
        snapVentureGoal: 'กรอกชื่อของคุณ',
        snapVentureGoalDesc: 'กรอกชื่อของคุณตามรูปแบบของบริษัท (เช่น "saruta.cha")',
        howToPlay: 'มีกิจกรรม 2 ช่วง สนุกคูณสอง!',
        snapVentureRule1: 'เข้าเว็บแอป แล้วลงทะเบียนชื่อของคุณให้เรียบร้อย',
        snapVentureRule2: '',
        snapVentureRule3: '',
        snapVentureRule4: '',
        gameRules: 'เกมแบ่งออกเป็น 2 ช่วง',
        snapVentureGameRule1: '🚗 ระหว่างทาง: ถ่ายรูปและเล่นเกมระหว่างเดินทาง',
        snapVentureGameRule2: '🏖️ ระหว่างเดินทางที่รีสอร์ต: ล่าของเจ๋ง ๆ เมื่อถึงที่พัก!',
        snapVentureGameRule3: '',
        snapVentureGameRule4: '',
        missionStep4: 'ทำภารกิจให้ครบ!',
        missionStep4Desc: 'แล้วมาดูกันว่าทำได้กี่ข้อ ปะ ลุยย!!',
        missionStep4Sub1: 'อ่านคำใบ้',
        missionStep4Sub2: 'คิดหาคำตอบ',
        missionStep4Sub3: 'ถ่ายรูปสนุก ๆ เป็นหลักฐาน',
        enjoyAdventure: '🕒 เวลาเล่นเกม: 10:00 - 13:30',
        wordGuessingTitle: '💭 Word Guessing - เกมทายคำ',
        wordGuessingGoal: '🎯 เป้าหมาย:',
        wordGuessingGoalDesc: 'ตอบคำถามให้ถูกต้องให้ได้มากที่สุด!',
        wordGuessingRule1: 'สร้างทีมหรือเข้าร่วมทีมด้วยรหัส 6 หลัก',
        wordGuessingRule2: 'เลือกคำถามและพิมพ์คำตอบ',
        wordGuessingRule3: 'ระบบตรวจคำตอบอัตโนมัติ (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)',
        wordGuessingRule4: 'ทีมที่ได้คะแนนรวมสูงสุดคือผู้ชนะ!',
        wordGuessingGameRule1: 'แต่ละคำถามตอบได้ครั้งเดียวเท่านั้น',
        wordGuessingGameRule2: 'ต้องตอบภายในเวลาที่กำหนด',
        wordGuessingGameRule3: 'ทุกคนในรถสามารถช่วยกันคิดตอบได้',
        wordGuessingGameRule4: 'ไม่ใช้ Google ในการหาคำตอบ (เล่นด้วยความรู้ของทีม!)',
        enjoyThinking: '🧠 ขอให้สนุกกับการใช้สมอง! 🧠',
        
        // Alert Messages
        fillAllFields: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
        selectGameFirst: 'กรุณาเลือกเกมก่อน!',
        codeCopied: '📋 คัดลอกรหัสแล้ว:',
        teamNotFound: '❌ ไม่พบทีมนี้! กรุณาตรวจสอบรหัสอีกครั้ง',
        nameAlreadyUsed: '⚠️ ชื่อนี้มีคนใช้แล้วในทีม!\nกรุณาใช้ชื่ออื่น หรือเพิ่มนามสกุล',
        teamFull: '❌ ทีมเต็มแล้ว!\nทีมนี้มีสมาชิกครบ',
        alreadyPeople: 'คนแล้ว',
        enterAnswer: '❌ กรุณาใส่คำตอบ!',
        wrongAnswer: '❌ คำตอบไม่ถูกต้อง!\nลองใหม่อีกครั้งนะ',
        correct: '🎉 ถูกต้อง!',
        answeredCorrectly: 'ตอบถูก',
        errorOccurred: 'เกิดข้อผิดพลาด:',
        tryAgain: 'กรุณาลองใหม่อีกครั้ง',
        
        // Quiz Submission & Review
        answerSubmittedSuccess: '✅ ส่งคำตอบเรียบร้อยแล้ว!\nรอแอดมินตรวจสอบ',
        answerSubmitted: 'ส่งคำตอบแล้ว',
        yourAnswerIs: 'คำตอบของคุณ',
        correctAnswerIs: 'คำตอบที่ถูกต้อง',
        statusPending: '⏳ รอตรวจสอบ',
        statusAutoApproved: '✅ อนุมัติอัตโนมัติ',
        statusRejected: '❌ ปฏิเสธ',
        approveAnswer: '✅ อนุมัติคำตอบ',
        rejectAnswer: '❌ ปฏิเสธคำตอบ',
        confirmApprove: '✅ ต้องการอนุมัติคำตอบนี้ใช่หรือไม่?\nทีมจะได้รับคะแนน',
        confirmReject: '❌ ต้องการปฏิเสธคำตอบนี้ใช่หรือไม่?',
        approveSuccess: '✅ อนุมัติคำตอบสำเร็จ!\nทีมได้รับคะแนนแล้ว',
        rejectSuccess: '✅ ปฏิเสธคำตอบสำเร็จ!',
        
        // Mission Submission Alerts
        notTimeYet: '❌ ยังไม่ถึงเวลาทำภารกิจ!',
        timeExpiredAlert: '❌ หมดเวลาทำภารกิจแล้ว!',
        takePhotoFirst: '❌ กรุณาถ่ายรูปก่อน!',
        missionNotFound: '❌ ไม่พบภารกิจนี้!',
        teamNotFound: '❌ ไม่พบข้อมูลทีม กรุณาลองใหม่',
        missionSuccessAlert: '🎉 สำเร็จ!',
        missionCompletedBy: 'ทำภารกิจสำเร็จ',
        submissionError: '❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        wantToLeaveRoom: '🚪 ต้องการออกจากห้อง',
        pointsSaved: 'ใช่หรือไม่?\n\n✓ คะแนนที่ทำไว้จะยังคงอยู่\n✓ คุณสามารถกลับมาเล่นเกมอื่นได้',
        leftRoomSuccess: '✅ ออกจากห้องสำเร็จ!\nคุณสามารถเลือกเกมใหม่หรือเข้าร่วมทีมอื่นได้',
        confirmResetScores: '⚠️ ต้องการรีเซ็ตคะแนนทั้งหมดใน',
        resetScoresConfirm: 'ใช่หรือไม่?\n(ภารกิจที่ทำแล้วจะถูกลบ แต่ทีมและสมาชิกยังอยู่)',
        confirmDeleteTeams: '⚠️⚠️⚠️ ต้องการลบทีมทั้งหมดใน',
        deleteTeamsConfirm: 'ใช่หรือไม่?\nการกระทำนี้ไม่สามารถย้อนกลับได้!',
        areYouSure: 'แน่ใจหรือไม่? ข้อมูลทั้งหมดจะหายไป!',
        resetSuccess: '✅ รีเซ็ตคะแนนสำเร็จ!',
        deleteSuccess: '✅ ลบทีมทั้งหมดสำเร็จ!',
        confirmDeleteMission: '⚠️ ต้องการลบภารกิจ',
        deleteMissionConfirm: 'ใช่หรือไม่?\n\n(คะแนนที่ทำไว้แล้วจะยังคงอยู่ในทีม)',
        missionDeleteSuccess: '✅ ลบภารกิจสำเร็จ!',
        confirmClearSchedule: '⚠️ ต้องการลบการตั้งเวลาของ',
        clearScheduleConfirm: 'ใช่หรือไม่?\n(ภารกิจจะสามารถทำได้ตลอดเวลา)',
        scheduleCleared: '✅ ลบการตั้งเวลาสำเร็จ!',
        scheduleSaved: '✅ บันทึกเวลาสำเร็จ!',
        settingsSaved: '✅ บันทึกการตั้งค่าสำเร็จ!',
        missionSaved: '✅ บันทึกภารกิจสำเร็จ!',
        wrongPassword: '❌ รหัสผิด! ไม่สามารถเข้าใช้งานได้',
        fillQuizAnswers: '❌ กรุณาใส่คำตอบทั้งภาษาไทยและภาษาอังกฤษ!',
        pointsRange: '❌ คะแนนต้องอยู่ระหว่าง 5-100',
        editMission: '✏️ แก้ไขภารกิจ',
        
        // Mission Form
        missionTitleTH: 'ชื่อภารกิจ (ภาษาไทย):',
        missionTitleEN: 'ชื่อภารกิจ (ภาษาอังกฤษ):',
        missionTitleTHPlaceholder: 'เช่น ถ่ายรูปกับหมา',
        missionTitleENPlaceholder: 'เช่น Take a photo with a dog',
        correctAnswerTH: '🔑 คำตอบที่ถูกต้อง (ภาษาไทย):',
        correctAnswerEN: '🔑 คำตอบที่ถูกต้อง (ภาษาอังกฤษ):',
        answerTHPlaceholder: 'พิมพ์คำตอบภาษาไทย (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)',
        answerENPlaceholder: 'พิมพ์คำตอบภาษาอังกฤษ (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)',
        answerHintBothLang: '💡 ผู้เล่นสามารถตอบได้ทั้งภาษาไทยหรืออังกฤษ',
        
        // Mission Card
        missionRevoked: 'ภารกิจถูกยกเลิก',
        reason: 'เหตุผล',
        failedCheck: 'ไม่ผ่านการตรวจสอบ',
        completedBy: 'ทำโดย',
        answerQuiz: 'ตอบคำถาม',
        completed: 'สำเร็จแล้ว',
        revoked: 'ถูกยกเลิก',
        notStartedYet: '❌ ยังไม่ถึงเวลาทำภารกิจ!',
        timeExpired: '❌ หมดเวลาทำภารกิจแล้ว!',
    },
    
    en: {
        // Welcome & Navigation
        selectGame: 'Select Game',
        staff: 'For Staff',
        back: '← Back',
        
        // Game Menu
        selectCreateJoin: 'Create or Join a Team',
        createTeam: 'Create New Team',
        createTeamDesc: 'For Team Leader/Driver',
        joinTeam: 'Join Team',
        joinTeamDesc: 'Enter team code',
        
        // Create Team Form
        createNewTeam: '🎮 Create New Team',
        startPlaying: '🎮 Start Playing',
        teamName: 'Team Name',
        teamNamePlaceholder: 'e.g. Car 1 - Lightning Team',
        leaderName: 'Team Leader Name (You)',
        leaderNamePlaceholder: 'Enter your name',
        createButton: '✨ Create Team',
        startButton: '✨ Start Playing',
        
        // Solo Mode
        pleaseEnterName: 'Please enter your name!',
        pleaseFillAll: 'Please fill in all fields!',
        errorOccurred: 'An error occurred. Please try again.',
        selectGameFirst: 'Please select a game first!',
        teamLeader: 'Team Leader',
        
        // Team Code Display
        teamCreatedSuccess: '🎉 Team Created Successfully!',
        yourTeamCode: 'Your Team Code',
        shareCode: '📱 Share this code with your teammates',
        copyCode: '📋 Copy Code',
        startGame: '🚀 Start Game',
        
        // Join Team Form
        joinExistingTeam: '👥 Join Team',
        teamCode: 'Team Code (6 digits)',
        teamCodePlaceholder: 'ABC123',
        yourName: 'Your Name',
        yourNamePlaceholder: 'Enter your name',
        joinButton: '✓ Join',
        
        // Game Board
        team: 'Team',
        score: 'Score',
        members: 'Members',
        missionsCompleted: 'Missions Completed',
        membersInTeam: '👥 Team Members',
        people: 'people',
        allMissions: '🎯 All Missions',
        loading: '📦 Loading missions...',
        noMissions: 'No missions in the system yet',
        viewAll: '👥 View All',
        hide: '👥 Hide',
        
        // Mission Status
        completedBy: 'Completed by',
        missionRevoked: '🚫 Mission Revoked',
        reason: 'Reason',
        failedVerification: 'Failed verification',
        takePhoto: '📸 Take Photo',
        answerQuestion: '❓ Answer',
        alreadyCompleted: '✓ Completed',
        revoked: '🚫 Revoked',
        
        // Mission Types
        photoMission: '📸 Photo',
        quizMission: '❓ Quiz',
        
        // Schedule Messages
        notStartedYet: 'Mission Not Started Yet',
        missionWillStart: 'Mission will start on',
        timeExpired: 'Mission Time Expired',
        missionEndedAt: 'Mission ended at',
        leaveRoomBtn: '🚪 Leave Room and Choose New Game',
        timeRemaining: 'Time Remaining',
        
        // Photo Modal
        takePhotoTitle: 'Take Photo',
        confirmMission: '✓ Confirm Mission',
        takePhotoFirst: 'Please take a photo first!',
        saving: 'Saving...',
        missionSuccess: '🎉 Success!',
        missionCompleted: 'Mission completed',
        
        // Quiz Modal
        answerQuestionTitle: '❓ Answer Question',
        yourAnswer: '💭 Your Answer:',
        typeAnswer: 'Type your answer...',
        submitAnswer: '✓ Submit Answer',
        
        // Team Roles
        leader: 'Leader',
        member: 'Member',
        
        // Admin Panel
        adminPanel: '👑 Admin Panel',
        selectGameToManage: 'Select game to manage',
        teamScores: '🏆 Team Scores',
        checkSubmissions: '📋 Check Submissions',
        manageRooms: '🏠 Manage Rooms',
        manageMissions: '🎯 Manage Missions',
        setSchedule: '⏰ Set Schedule',
        
        // Rooms Management
        createNewRoom: '➕ Create New Room',
        roomsDesc: 'Create rooms in advance for Word Guessing players to join',
        roomName: 'Room Name',
        roomNamePlaceholder: 'e.g. Room A - First Group',
        roomNameHint: '💡 Name the room clearly, such as by group or round',
        maxRoomMembers: 'Maximum Members',
        maxMembersHint: '💡 Set the maximum number of players who can join this room',
        roomCodeHint: '💡 This code will be generated automatically. Share it with players to join',
        createRoom: '✓ Create Room',
        pleaseEnterRoomName: 'Please enter room name!',
        roomCreatedSuccess: '✅ Room created successfully!',
        deleteRoomConfirm: '⚠️ Do you want to delete this room?',
        roomDeletedSuccess: '✅ Room deleted successfully',
        showingTeamsFor: 'Showing teams for game',
        noTeamsYet: 'No teams in',
        viewPhotos: '📸 View Photos',
        viewSubmissions: '📋 View Submissions',
        missions: 'missions',
        
        // Admin Controls
        teamManagement: '🔧 Team Management',
        resetAllScores: '🔄 Reset All Scores',
        deleteAllTeams: '🗑️ Delete All Teams',
        
        // Missions Admin
        addNewMission: '➕ Add New Mission',
        noMissionsInGame: 'No missions in',
        clickToAdd: 'Click "➕ Add New Mission" to start',
        edit: '✏️ Edit',
        delete: '🗑️ Delete',
        points: 'points',
        
        // Mission Form
        addMission: '➕ Add New Mission',
        editMission: '✏️ Edit Mission',
        missionType: 'Mission Type',
        photoMissionType: '📸 Photo Mission',
        quizMissionType: '❓ Quiz Mission',
        emoji: 'Emoji',
        missionTitleTH: 'Mission Title (Thai)',
        missionTitleEN: 'Mission Title (English)',
        missionTitlePlaceholder: 'e.g. Take a Photo with Dog',
        missionTitlePlaceholderEN: 'e.g. Take a Photo with Dog',
        correctAnswerTH: 'Answer (Thai)',
        correctAnswerEN: 'Answer (English)',
        answerPlaceholder: 'Type answer (case insensitive)',
        answerPlaceholderEN: 'Type answer (case insensitive)',
        answerHint: '💡 Players must type the answer correctly to get points',
        missionPoints: 'Points',
        cancel: 'Cancel',
        save: '✓ Save',
        
        // Schedule Settings
        setMissionSchedule: '⏰ Set Mission Schedule',
        scheduleDesc: 'Set start and end time for missions',
        missionStart: '📅 Mission Start:',
        missionEnd: '🏁 Mission End:',
        currentStatus: 'Current Status:',
        start: 'Start:',
        end: 'End:',
        saveSchedule: '💾 Save Schedule',
        clearSchedule: '🗑️ Clear Schedule',
        limitTeamMembers: '👥 Limit Team Members',
        limitMembersDesc: 'Set maximum number of members per team',
        maxMembers: 'Maximum Members (including leader):',
        currentMaxMembers: 'Current Max Members:',
        saveSettings: '💾 Save Settings',
        
        // Submissions
        selectTeamToCheck: '📋 Select Team to Check',
        approved: 'Approved:',
        revokedLabel: 'Revoked:',
        total: 'Total:',
        noSubmissions: '📭 No teams yet',
        submittedBy: 'Submitted by:',
        
        // Game Rules
        rulesTitle: '📋 Game Rules',
        understand: '✓ Got it, Let\'s Play!',
        snapVentureTitle: 'How to Play',
        snapVentureGoal: 'Fill Your Name',
        snapVentureGoalDesc: 'Fill your name as the company format (Ex: "saruta.cha")',
        howToPlay: 'Two parts, double the fun!',
        snapVentureRule1: 'Go to the web app and register your name',
        snapVentureRule2: '',
        snapVentureRule3: '',
        snapVentureRule4: '',
        gameRules: 'The game is divided into two parts',
        snapVentureGameRule1: '🚗 On the Way: Snap and play as you travel',
        snapVentureGameRule2: '🏖️ At the Resort: Hunt for cool stuff when you arrive!',
        snapVentureGameRule3: '',
        snapVentureGameRule4: '',
        missionStep4: 'Complete all tasks!',
        missionStep4Desc: 'Everyone should help complete all tasks!',
        missionStep4Sub1: 'Read the hint',
        missionStep4Sub2: 'Figure it out',
        missionStep4Sub3: 'Take a fun photo to prove it',
        enjoyAdventure: '🕒 Game Time: 10:00 - 13:30',
        wordGuessingTitle: '💭 Word Guessing - Quiz Game',
        wordGuessingGoal: '🎯 Goal:',
        wordGuessingGoalDesc: 'Answer questions correctly to get maximum points!',
        wordGuessingRule1: 'Create or join a team with 6-digit code',
        wordGuessingRule2: 'Select a question and type your answer',
        wordGuessingRule3: 'System checks answers automatically (case insensitive)',
        wordGuessingRule4: 'Team with highest total score wins!',
        wordGuessingGameRule1: 'Each question can only be answered once',
        wordGuessingGameRule2: 'Must answer within time limit',
        wordGuessingGameRule3: 'Everyone in the car can help think',
        wordGuessingGameRule4: 'No using Google to find answers (use team knowledge!)',
        enjoyThinking: '🧠 Enjoy the brain game! 🧠',
        
        // Alert Messages
        fillAllFields: 'Please fill in all fields!',
        selectGameFirst: 'Please select a game first!',
        codeCopied: '📋 Code copied:',
        teamNotFound: '❌ Team not found! Please check the code again',
        nameAlreadyUsed: '⚠️ This name is already used in the team!\nPlease use a different name or add last name',
        teamFull: '❌ Team is full!\nThis team already has',
        alreadyPeople: 'members',
        enterAnswer: '❌ Please enter an answer!',
        wrongAnswer: '❌ Wrong answer!\nTry again',
        correct: '🎉 Correct!',
        answeredCorrectly: 'answered correctly',
        errorOccurred: 'Error:',
        tryAgain: 'Please try again',
        
        // Quiz Submission & Review
        answerSubmittedSuccess: '✅ Answer submitted successfully!\nWaiting for admin review',
        answerSubmitted: 'Answer submitted',
        yourAnswerIs: 'Your answer',
        correctAnswerIs: 'Correct answer',
        statusPending: '⏳ Pending review',
        statusAutoApproved: '✅ Auto-approved',
        statusRejected: '❌ Rejected',
        approveAnswer: '✅ Approve answer',
        rejectAnswer: '❌ Reject answer',
        confirmApprove: '✅ Do you want to approve this answer?\nTeam will receive points',
        confirmReject: '❌ Do you want to reject this answer?',
        approveSuccess: '✅ Answer approved successfully!\nTeam received points',
        rejectSuccess: '✅ Answer rejected successfully!',
        
        // Mission Submission Alerts
        notTimeYet: '❌ Mission time hasn\'t started yet!',
        timeExpiredAlert: '❌ Mission time has expired!',
        takePhotoFirst: '❌ Please take a photo first!',
        missionNotFound: '❌ Mission not found!',
        teamNotFound: '❌ Team data not found. Please try again',
        missionSuccessAlert: '🎉 Success!',
        missionCompletedBy: 'completed the mission',
        submissionError: '❌ An error occurred. Please try again',
        wantToLeaveRoom: '🚪 Do you want to leave room',
        pointsSaved: '?\n\n✓ Your points will be saved\n✓ You can come back and play other games',
        leftRoomSuccess: '✅ Left room successfully!\nYou can now select a new game or join another team',
        confirmResetScores: '⚠️ Do you want to reset all scores in',
        resetScoresConfirm: '?\n(Completed missions will be deleted but teams and members remain)',
        confirmDeleteTeams: '⚠️⚠️⚠️ Do you want to delete all teams in',
        deleteTeamsConfirm: '?\nThis action cannot be undone!',
        areYouSure: 'Are you sure? All data will be lost!',
        resetSuccess: '✅ Scores reset successfully!',
        deleteSuccess: '✅ All teams deleted successfully!',
        confirmDeleteMission: '⚠️ Do you want to delete mission',
        deleteMissionConfirm: '?\n\n(Completed points will remain in teams)',
        missionDeleteSuccess: '✅ Mission deleted successfully!',
        confirmClearSchedule: '⚠️ Do you want to clear schedule for',
        clearScheduleConfirm: '?\n(Missions will be available anytime)',
        scheduleCleared: '✅ Schedule cleared successfully!',
        scheduleSaved: '✅ Schedule saved successfully!',
        settingsSaved: '✅ Settings saved successfully!',
        missionSaved: '✅ Mission saved successfully!',
        wrongPassword: '❌ Wrong password! Access denied',
        fillQuizAnswers: '❌ Please enter answers for both Thai and English!',
        pointsRange: '❌ Points must be between 5-100',
        editMission: '✏️ Edit Mission',
        
        // Mission Form
        missionTitleTH: 'Mission Title (Thai):',
        missionTitleEN: 'Mission Title (English):',
        missionTitleTHPlaceholder: 'e.g. ถ่ายรูปกับหมา',
        missionTitleENPlaceholder: 'e.g. Take a photo with a dog',
        correctAnswerTH: '🔑 Correct Answer (Thai):',
        correctAnswerEN: '🔑 Correct Answer (English):',
        answerTHPlaceholder: 'Type answer in Thai (case insensitive)',
        answerENPlaceholder: 'Type answer in English (case insensitive)',
        answerHintBothLang: '💡 Players can answer in either Thai or English',
        
        // Mission Card
        missionRevoked: 'Mission Revoked',
        reason: 'Reason',
        failedCheck: 'Failed verification',
        completedBy: 'Completed by',
        answerQuiz: 'Answer Quiz',
        completed: 'Completed',
        revoked: 'Revoked',
        notStartedYet: '❌ Missions haven\'t started yet!',
        timeExpired: '❌ Mission time has expired!',
    }
};

// Current language
let currentLanguage = localStorage.getItem('gameLanguage');

// Get translation
function t(key) {
    return translations[currentLanguage][key] || translations.th[key] || key;
}

// Switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('gameLanguage', lang);
    updatePageLanguage();
}

// Select language and start (called from modal)
function selectLanguageAndStart(lang) {
    switchLanguage(lang);
    document.getElementById('languageSelectionModal').style.display = 'none';
    updateCurrentLanguageButton();
    console.log('✅ Language selected:', lang);
}

// Show language modal (สำหรับเปลี่ยนภาษาภายหลัง)
function showLanguageModal() {
    document.getElementById('languageSelectionModal').style.display = 'block';
}

// Update current language button text
function updateCurrentLanguageButton() {
    const btnText = document.getElementById('currentLanguageText');
    if (btnText) {
        if (currentLanguage === 'th') {
            btnText.textContent = 'ภาษาไทย';
        } else if (currentLanguage === 'en') {
            btnText.textContent = 'English';
        }
    }
}

// Check if language is already selected
function checkLanguageSelection() {
    const savedLanguage = localStorage.getItem('gameLanguage');
    
    if (!savedLanguage) {
        // ยังไม่เคยเลือกภาษา → แสดง popup
        document.getElementById('languageSelectionModal').style.display = 'block';
        return false;
    } else {
        // เคยเลือกแล้ว → ใช้ภาษาที่เลือกไว้
        currentLanguage = savedLanguage;
        updatePageLanguage();
        updateCurrentLanguageButton();
        return true;
    }
}

// Update all text on page
function updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.placeholder !== undefined) {
                element.placeholder = translation;
            }
        } else {
            element.textContent = translation;
        }
    });
    
    // Update placeholders separately
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Reload game board if active
    if (typeof currentTeamId !== 'undefined' && currentTeamId && typeof currentGame !== 'undefined' && currentGame) {
        const teamRef = firebase.database().ref(`games/${currentGame}/teams/${currentTeamId}`);
        teamRef.once('value', snapshot => {
            const teamData = snapshot.val();
            if (teamData && typeof loadMissions === 'function') {
                loadMissions(teamData.missions || {});
            }
        });
    }
    
    // Reload admin panel if open
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel && adminPanel.style.display === 'block' && typeof loadMissionsAdmin === 'function') {
        loadMissionsAdmin();
    }
}

// Initialize language on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // เช็คว่าเคยเลือกภาษาหรือยัง
        const hasSelectedLanguage = checkLanguageSelection();
        
        // ถ้าเคยเลือกแล้ว → อัพเดทข้อความตามภาษานั้น
        if (hasSelectedLanguage) {
            updatePageLanguage();
        }
        // ถ้ายังไม่เคย → popup จะแสดงอัตโนมัติจากฟังก์ชัน checkLanguageSelection()
    });
}
