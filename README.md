<br></br>

## 3. API 요구 사항

게시판을 관리하는 RESTful API를 개발해 주세요. 이때, 다음의 기능을 구현해야 합니다. 데이터베이스의 테이블 설계는 지원자분의 판단에 맡겨져 있습니다. 요구사항을 충족시키는 데 필요하다고 생각되는 구조로 자유롭게 설계해 주세요.

- **과제 1. 사용자 회원가입 엔드포인트**

  - 'POST' : localhost:3000/users/signup
  - Req : BODY : {
    "email":"12@gmail.com",
    "password":"12345678"

}

- **과제 2. 사용자 로그인 엔드포인트**

  - 'POST' : localhost:3000/users/signIn
  - Req : BODY : {
    "email":"12@gmail.com",
    "password":"12345678"

}

- Res : {token:'ex token'}

- **과제 3. 새로운 게시글을 생성하는 엔드포인트**

  - 'POST' : localhost:3000/posts
  - Req : BODY{
    "title":"wanted",
    "content":"wrap"
    }

- Res : {
  "message": "SIGNUP_SUCCESS",
  "post": {
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 14,
  "info": "",
  "serverStatus": 2,
  "warningStatus": 0,
  "changedRows": 0
  }
  }

- **과제 4. 게시글 목록을 조회하는 엔드포인트**

  - 'GET' : localhost:3000/posts?offset=1
    offset 1부터 시작 한번에 10개씩

  - Res :[
    {
    "id": 5,
    "title": "very~",
    "content": "vert",
    "user_id": 3,
    "created_at": "2023-08-06 12:36:22",
    "updated_at": null
    },
    {
    "id": 6,
    "title": "show~",
    "content": "whow",
    "user_id": 3,
    "created_at": "2023-08-06 12:36:32",
    "updated_at": null
    },
    -------------생략 ---------------
    ]

- **과제 5. 특정 게시글을 조회하는 엔드포인트**

  - 'GET' : localhost:3000/posts/:postId
  - Res :
    [
    {
    "id": 2,
    "title": "안녕~",
    content": "첫번째 포스트!",
    "user_id": 3,
    "created_at": "2023-08-05 22:58:01",
    "updated_at": null
    }
    ]

- **과제 6. 특정 게시글을 수정하는 엔드포인트**

  - 게시글의 ID와 수정 내용을 받아 해당 게시글을 수정하는 엔드포인트를 구현해 주세요.
  - 게시글을 수정할 수 있는 사용자는 게시글 작성자만이어야 합니다.

- **과제 7. 특정 게시글을 삭제하는 엔드포인트**
  - 'DELETE' : localhost:3000/posts/:postId
