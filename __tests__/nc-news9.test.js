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

describe("DELETE /api/comments/:comment_id", () => {
  test("should return 204 status", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("should return an empty object after the comment has been deleted", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then((body) => {
        expect(body.rows).toBeFalsy;
      });
  });
  test("should return 400 when the comment id is a string", () => {
    return request(app)
      .delete("/api/comments/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
  test("should return 400 when the comment id is a not a valid number", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});
