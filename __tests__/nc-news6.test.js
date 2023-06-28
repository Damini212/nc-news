const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/topics.js");

afterAll(() => {
  return db.end;
});

describe("GET /api/articles/:article_id/comments", () => {
  test("The array should return 200 all ok", () => {
    return request(app).get("/api/articles/3/comments").expect(200);
  });
  test("should return 400 if the article_id is a string or a combination of number and string", () => {
    return request(app).get("/api/articles/banana1/comments").expect(400);
  });
  test("should return 404 if the comments is not added", () => {
    return request(app).get("/api/articles/6/nocomments").expect(404);
  });
  test("should return 404 if an invalid id is provided", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .catch(({ body }) => {
        expect(body.message).toBe("Id Not found");
      });
  });
  test("should return an array of comments for the article id provided", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
      });
  });
  test("should return the most recent comment first", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});
