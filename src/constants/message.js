export const MESSAGES = {
    
    STATUS: {
        ONLINE: '🟢 온라인',
        IDLE: '🟡 자리 비움',
        DND: '🔴 방해 금지',
        INVISIBLE: '⚫ 오프라인',
        UNKNOWN: '❓ 알 수 없음'
    },

    LOGIN: {
        SUCCESS: '🎮 Discord 로그인 완료',
        FAIL: '🎮 Discord 로그인 실패',

        TOKEN_UNDEFINED: '🚫 Token 이 설정되지 않았습니다!',
        TOKEN_INVALID: '🚫 유효하지 않은 Token 입니다!',
        DISALLOWED_INTENTS: '🚫 Gateway Intents 권한이 없습니다!',

        RETRY_COUNT: (n, r, m) => `⏰ ${n}초 후 재시도 (${r}/${m})`,
        RETRY_LIMIT: '🚫 재시도 횟수가 초과했습니다!',
    },

    GUILD: {
        SUCCESS: '🏠 Guild 등록 완료',
        FAIL: '🏠 Guild 등록 실패',

        GUILD_UNDEFINED: '🚫 Guild ID 가 설정되지 않았습니다!',
        GUILD_INVALID: '🚫 유효하지 않은 Guild ID 입니다!',
    },

    COMMAND: {
        SUCCESS: '🌏 Commands 등록 완료',
        FAIL: '🌏 Commands 등록 실패',

        CLIENT_UNDEFINED: '🚫 Client ID 가 설정되지 않았습니다!',
        CLIENT_INVALID: '🚫 유효하지 않은 Client ID 입니다!',

        MISSING_ACCESS: '🚫 액세스할 수 있는 권한이 없습니다!',
    },

    ERROR: {
        BODY_INVALID: '🚫 잘못된 요청 형식입니다!',
    },
}