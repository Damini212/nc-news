const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/topics.js");

afterAll(() => {
  return db.end;
});

describe("GET/api/", () => {
  test("should give an error when incorrect path is provided", () => {
    return request(app).get("/ap").expect(404);
  });
  test("should provide the all OK code 200 ", () => {
    return request(app).get("/api/").expect(200);
  });
  test("should respond with the description of all the endpoints", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("description", expect.any(Object));
      });
  });
});
