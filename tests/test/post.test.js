const request = require("supertest");
const userFixture = require("../fixtures/users-fixture");
const { createApp } = require("../../app");
const dataSource = require("../../src/models/appDataSource");
const userdata = require("../fixtures/user.data");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("Post /", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    jwt.verify.mockImplementation(() => ({ id: 1 }));
    await userFixture.createUsers([userdata.GsUser, userdata.CuUser]);
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
        id: 1,
        title: "test!",
        updated_at: null,
        user_id: 1,
      },
    ]);
    expect(response.statusCode).toEqual(201);
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
