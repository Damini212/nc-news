const request = require("supertest");
const app = require("../app.js");
const endpoints = require("../endpoints.json");

describe("GET/api/", () => {
  test("should provide the all OK code 200 ", () => {
    return request(app).get("/api/").expect(200);
  });
  test("should respond with the description of all the endpoints", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({ description: endpoints });
      });
  });
});
