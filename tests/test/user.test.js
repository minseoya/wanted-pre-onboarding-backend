const request = require("supertest");
const userFixture = require("../fixtures/users-fixture");
const { createApp } = require("../../app");
const dataSource = require("../../src/models/appDataSource");
const userdata = require("../fixtures/user.data");

describe("Sign up/", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await userFixture.createUsers([userdata.kakaoUser, userdata.naverUser]);
  });

  test("🤬SUCCESS: created user", async () => {
    const response = await request(app).post("/users/signup").send({
      password: "testpassword!",
      email: "test3@kakao.com",
    });

    expect(response.body).toEqual({ message: "SIGNUP_SUCCESS" });
    expect(response.statusCode).toEqual(201);
  });

  test("FAILED: invalid email", async () => {
    const response = await request(app).post("/users/signup").send({
      password: "testpassword!",
      email: "",
    });

    expect(response.body).toEqual({ message: "KEY_ERROR" });
    expect(response.statusCode).toEqual(400);
  });
  test("FAILED: 올바른 이메일 형식이 아닙니다.", async () => {
    const response = await request(app).post("/users/signup").send({
      password: "testpassword!",
      email: "test1kakao.com",
    });

    expect(response.body).toEqual({
      message: "올바른 이메일 형식이 아닙니다.",
    });
    expect(response.statusCode).toEqual(401);
  });

  afterAll(async () => {
    await dataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await dataSource.destroy();
  });
});

describe("Sign In/", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await userFixture.createUsers([userdata.kakaoUser, userdata.naverUser]);
  });

  test("🤬SUCCESS: signin user", async () => {
    const response = await request(app).post("/users/signIn").send({
      password: "testpassword!",
      email: "test1@kakao.com",
    });
    console.log(response.body);
    expect(response.body.token).toEqual("Token");

    expect(response.statusCode).toEqual(200);
  });

  test("FAILED: KEY_ERROR", async () => {
    const response = await request(app).post("/users/signIn").send({
      password: "",
      email: "test4@kakao.com",
    });

    expect(response.body).toEqual({ message: "KEY_ERROR" });
    expect(response.statusCode).toEqual(400);
  });

  test("FAILED: NOT_FOUND_EMAIL", async () => {
    const response = await request(app).post("/users/signIn").send({
      password: "testpassword",
      email: "12@kakao.com",
    });

    expect(response.body).toEqual({ message: "NOT_FOUND_EMAIL" });
    expect(response.statusCode).toEqual(400);
  });

  test("FAILED: KEY_ERROR", async () => {
    const response = await request(app).post("/users/signIn").send({
      password: "",
      email: "",
    });
    expect(response.body).toEqual({ message: "KEY_ERROR" });
    expect(response.statusCode).toEqual(400);
  });
  afterAll(async () => {
    await dataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await dataSource.destroy();
  });
});
