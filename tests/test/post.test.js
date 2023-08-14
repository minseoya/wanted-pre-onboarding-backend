const request = require("supertest");
const userFixture = require("../fixtures/users-fixture");
const { createApp } = require("../../app");
const dataSource = require("../../src/models/appDataSource");
const userdata = require("../fixtures/user.data");
const jwt = require("jsonwebtoken");
const postFixture = require("../fixtures/posts-fixture");

jest.mock("jsonwebtoken");

describe("Post /", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    jwt.verify.mockImplementation(() => ({ id: 1 }));
    await userFixture.createUsers([userdata.GsUser, userdata.CuUser]);
    await postFixture.createPost([userdata.CuPost, userdata.GsPost]);
  });

  test("🤬SUCCESS: created post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("authorization", "token")
      .send({
        title: "test!",
        content: "testing content",
      });

    delete response.body[0].created_at;
    expect(response.body).toEqual([
      {
        content: "testing content",
        id: 3,
        title: "test!",
        updated_at: null,
        user_id: 1,
      },
    ]);
    expect(response.statusCode).toEqual(201);
  });

  // test("🤬SUCCESS: get post Lists", async () => {
  //   const response = await request(app)
  //     .get("/posts")
  //     .set("authorization", "token");

  //   delete response.body[0].created_at;
  //   expect(response.body).toEqual([
  //     {
  //       content: "testing content",
  //       id: 1,
  //       title: "test!",
  //       updated_at: null,
  //       user_id: 1,
  //     },
  //   ]);
  //   expect(response.statusCode).toEqual(200);
  // });

  test("🤬SUCCESS: get postId", async () => {
    const response = await request(app)
      .get("/posts/3")
      .set("authorization", "token");

    delete response.body[0].created_at;
    expect(response.body).toEqual([
      {
        content: "testing content",
        id: 3,
        title: "test!",
        updated_at: null,
        user_id: 1,
      },
    ]);
    expect(response.statusCode).toEqual(200);
  });

  test("🤬SUCCESS: update post", async () => {
    jwt.verify.mockReturnValueOnce({ id: 2 });
    const response = await request(app)
      .patch("/posts")
      .set("authorization", "token")
      .send({ postId: 1, title: "hi", content: "hi" });

    delete response.body[0].created_at;
    delete response.body[0].updated_at;

    expect(response.body).toEqual([
      {
        content: "hi",
        id: 1,
        title: "hi",
        user_id: 2,
      },
    ]);
    expect(response.statusCode).toEqual(201);
  });

  test("실패~: 작성한 유저가아닌 다른유저가 update post", async () => {
    jwt.verify.mockReturnValueOnce({ id: 1 });

    const response = await request(app)
      .patch("/posts")
      .set("authorization", "token")
      .send({ postId: 1, title: "hi", content: "hi" });

    expect(response.body).toEqual({ message: "UnauthorizedException" });
    expect(response.statusCode).toEqual(401);
  });

  test("실패: 작성한 유저가아닌 다른 유저가 delete post", async () => {
    const response = await request(app)
      .delete("/posts/1")
      .set("authorization", "token");

    expect(response.body).toEqual({ message: "UnauthorizedException" });
    expect(response.statusCode).toEqual(401);
  });

  test("🤬SUCCESS: delete post", async () => {
    const response = await request(app)
      .delete("/posts/2")
      .set("authorization", "token");

    expect(response.statusCode).toEqual(204);
  });

  afterAll(async () => {
    await dataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`TRUNCATE posts`);
    await dataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dataSource.query(`ALTER TABLE posts AUTO_INCREMENT = 1`);
    await dataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await dataSource.destroy();
  });
});
