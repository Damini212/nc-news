const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/topics.js");

afterAll(() => {
  return db.end;
});

describe("GET /api/topics", () => {
  test("The array should return the 404 error if an incorrect request is made", () => {
    return request(app).get("/api/topic").expect(404);
  });
  test("should return an okay message", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("the resulting array should have the same length as the topics table", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toHaveLength(3);
      });
  });
  test("The array should have the correct object properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        topics.forEach((topics) => {
          expect(topics).toHaveProperty("slug", expect.any(String));
          expect(topics).toHaveProperty("description", expect.any(String));
        });
      });
  });
});
