<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green">
  <img src="https://img.shields.io/badge/node.js-24.16.0-brightgreen">
  <img src="https://img.shields.io/badge/version-v1.0.0-blue">
</p>

<h1 align="center">
🐕 Jjing Study
</h1>

<p align="center">
    <img src="https://github.com/user-attachments/assets/8fb4614d-20e0-413a-85e9-abfb17e51525" width="49%">
    <img src="https://github.com/user-attachments/assets/e155505f-bfe6-4091-a7c8-a10aa43d7277" width="49%">
</p>

<p align="center">
    <strong>Node.js + discord.js + googleapis</strong>
</p>

<p align="center">
  <a href="https://github.com/obabo0801/Jjing-Study/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/Download-ZIP-blue?style=for-the-badge" alt="Download ZIP">
  </a>
</p>

```bash
git@github.com:obabo0801/Jjing-Study.git
```

---

## 📌 소개
Jjing Study 는 Discord Bot과 Google Sheets를  
CLI 으로 제어할 수 있는 개인 프로젝트입니다.

.env 환경 변수와 Config 설정을 통해 여러 서비스를  
관리할 수 있으며 다국어(i18n)도 지원합니다.

---

## ✨ 기능
### 🎮 Discord
- 슬래시 명령어
- 메시지 명령어
- 버튼 이벤트
- 셀렉트 메뉴
- 모달 처리
- 자동완성 지원
- 다중 관리
### 📊 Google
- Sheets API 연동
- 서비스 계정인증
- 다중 계정 지원
### 🛠 CIL
- 명령어 자동 로드
- 핸들러 구조 분리
- config 설정 관리
- 로그 저장 기능
- 시간 관련 유틸
- Base64 변환 유틸

---

## 🛠 개발 환경
- Node.js (ESM)
- discord.js 14.26.4
- dotenv 17.4.2
- googleapis 173.0.0

---

## 🚀 설치
```bash
npm install
```

---

## 🪟 실행
```bash
npm start
```

또는

```bash
start.bat
```

---

## 🔐 .env

`.env`는 공개하지 마세요.

`config.json`에서 값 대신 환경변수 이름을 적어두면  
`.env` 값을 불러와 사용할 수 있습니다.

```env
JJING_TOKEN="YOUR_TOKEN"
JJING_CLIENT_ID="YOUR_CLIENT_ID"
JJING_GUILD_ID="YOUR_GUILD_ID"
GOOGLE_FUND_ID="YOUR_ID"
GOOGLE_PRIVATE_KEY="YOUR_KEY"
GOOGLE_PRIVATE_EMAIL="YOUR_EMAIL"
```

---

## ⚙️ 설정
- config.json
### ⭐ 기본
🔹 `discord-start` 시작    
🔹 `google-start` 시작    
    🔸 -1 로드 없이 진행    
    🔸 0 전체 불러오기    
    🔸 [1] 1번 불러오기    
🔹 `language` 언어    
    🔸 en 영어
    🔸 ko 한국어
### 🤖 디스코드
🔹 `1` 번호    
🔹 `name` 봇 이름
🔹 `path` 폴더 경로    
🔹 `delay` 시간
🔹 `count` 횟수    
🔹 `token` `.env` 봇 토큰    
    🔸 `"token"`: `"JJING_TOKEN"`    
    
🔹 `status` 봇 상태    
    🟢 `online` 온라인
    🟡 `idle` 자리 비움    
    🔴 `dnd` 방해 금지
    ⚫ `invisible` 오프라인    
    
🔹 `clientId` [클라이언트 ID](https://discord.com/developers/applications)    
    🔸 `"clientId"`: `"JJING_CLIENT_ID"`    

🔹 `guildId` [길드 ID](https://support-dev.discord.com/hc/ko/articles/360028717192)    
    🔸 `"guildId"`: `"JJING_GUILD_ID"`    

### 📊 구글
🔹 `name` 시트 이름    
🔹 `sheetId` [구글 시트 ID](https://docs.google.com/spreadsheets/create)    
    🔸 `"sheetId"`: `"GOOGLE_FUND_ID"`    

🔹 `key` [서비스 계정 키](https://docs.cloud.google.com/iam/docs/service-accounts-create)    
    🔸 `"key"`: `"GOOGLE_PRIVATE_KEY"`    

🔹 `email` [서비스 계정 이메일](https://docs.cloud.google.com/iam/docs/service-account-types)    
    🔸 `"email"`: `"GOOGLE_PRIVATE_EMAIL"`    

---

## ⌨️ CLI 명령어
- `[1] read` 읽기
- `[2] write` 쓰기
- `[3] append` 추가
- `[4] start` 시작
- `[5] restart` 재시작
- `[6] stop` 중지
- `[7] status` 상태
- `[8] refresh` 새로고침
- `[9] clear` 정리
- `[10] reboot` 재실행
- `[11] exit` 종료

---

## 💬 사용 예시


### 서비스 선택 메뉴 표시
```bash
start
```
```bash
4
```

### 1번 서비스 전체 시작
```bash
start 1
```
```bash
4 1
```

### 1번 서비스의 1번 항목 시작
```bash
start 1 1
```
```bash
4 1 1
```

### 전체 서비스 시작
```bash
start 0
```
```bash
4 0
```

---

## 📬 문의
기타 문의는 아래 연락처로 부탁드립니다.

- **이메일** [obabo0801@gmail.com](mailto:obabo0801@gmail.com)
- **디스코드** `unjongjjing`