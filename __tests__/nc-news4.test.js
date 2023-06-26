const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/topics.js");

afterAll(() => {
  return db.end;
});

describe("GET /api/articles/:article_id", () => {
  test("The array should return 200 all ok", () => {
    return request(app).get("/api/articles/3").expect(200);
  });
  // test("should return the article object when the author id is provided", () => {
  //   return request(app)
  //     .get("api/articles/3")
  //     .expect(200)
  //     .then(({ body }) => {
  //       const articles = {};
  //     });
  // });
});
