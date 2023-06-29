const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/users", () => {
  test("200 should return an okay message", () => {
    return request(app).get("/api/users").expect(200);
  });
  test("the resulting array should have the same properties as the users table", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  test("the resulting array should have the same length as the users table", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(4);
      });
  });
  test("The array should return the 404 error if an incorrect request is made", () => {
    return request(app).get("/api/user").expect(404);
  });
});
