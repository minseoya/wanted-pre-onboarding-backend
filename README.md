<br></br>

# 김민서

## 1.

- npm install
- dbmate up

## 2. 해당 프로젝트를 실행하기위해서는 : `nodemon server.js`

## 3. API 요구 사항

회원가입외에 모든 엔드포인트는 token이 필요합니다 header에 Authorization:'token'을 담아서 보내주세요

- **과제 1. 사용자 회원가입 엔드포인트**

  - 'POST' : localhost:3000/users/signup
  - Req :

  ```JSON
  {BODY : {
    "email":"12@gmail.com",
    "password":"12345678"
  } }
  ```

- **과제 2. 사용자 로그인 엔드포인트**

  - 'POST' : localhost:3000/users/signIn
  - Req :
    ```JSON
    {BODY : {
    "email":"12@gmail.com",
    "password":"12345678"
    }}
    ```

- Res : {token:'ex token'}

- **과제 3. 새로운 게시글을 생성하는 엔드포인트**

  - 'POST' : localhost:3000/posts
  - Req :

  ```JSON
  {BODY{
    "title":"wanted",
    "content":"wrap"
    }}
  ```

  - Res :

  ```JSON
  {
    "message": "SIGNUP_SUCCESS",
    "post": [
    {
    "id": 19,
    "title": "wanted",
    "content": "wrap",
    "user_id": 4,
    "created_at": "2023-08-06 16:34:43",
    "updated_at": null
    }
    ]
    }
  ```

- **과제 4. 게시글 목록을 조회하는 엔드포인트**

  - 'GET' : localhost:3000/posts?offset=1
    offset 1부터 시작 한번에 10개씩

  - Res :

  ```JSON
  [
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

  ```

- **과제 5. 특정 게시글을 조회하는 엔드포인트**

  - 'GET' : localhost:3000/posts/:postId
  - Res :

    ```JSON
    {
    "id": 2,
    "title": "안녕~",
    content": "첫번째 포스트!",
    "user_id": 3,
    "created_at": "2023-08-05 22:58:01",
    "updated_at": null
    }
    ```

- **과제 6. 특정 게시글을 수정하는 엔드포인트**

  - 'PATCH' : localhost:3000/posts
  - Req :

    ```JSON
    {
    "id": 17,
    "title": "goood",
    "content": "exp",
    "user_id": 3,
    "created_at": "2023-08-06 15:17:11",
    "updated_at": "2023-08-06 15:19:38"
    }

    ```

- Req : 본인이 작성한 게시글이 아닐경우

  ```JSON
  {
  "message": "UnauthorizedException"
  }

  ```

- **과제 7. 특정 게시글을 삭제하는 엔드포인트**
  - 'DELETE' : localhost:3000/posts/:postId
  - Req : 본인이 작성한 게시글이 아닐경우
    ```JSON
    {
    "message": "UnauthorizedException"
    }
    ```
  - Req : 204

```

```

```

```
