# KWEB 준회원 과정 면제과제 - backend

node와 express 기반 API 서버입니다.

## 테스트 서버 실행 방법

### DB 서버 설정 방법

1. postgresql 다운로드

2. postgresql 유저 설정: 본 서버 개발 시에는 postgres(슈퍼 유저) 를 사용하였습니다.

3. 새로운 데이터베이스 생성

4. 새로운 데이터베이스에 주어진 dump 파일을 이용해 DB restore

- custom 파일입니다

### 테스트 서버 설정 및 실행 방법

1. 저장소 다운로드
   `$ git clone https://github.com/skeletonk10/kweb-assignment-backend`

2. kweb-assignment-backend 폴더에서 콘솔로 다음 명령어 입력
   `$ npm i`
   `$ npm run dev`

3. src 폴더에 주어진 secret.ts 파일을 DB 설정에 맞게 수정한 후 붙여넣기

4. localhost:8000 주소로 접속 후 실행 확인

5. frontend 서버 실행 후 접속

- 주의: DB 서버 실행이 선행되어야 합니다!
