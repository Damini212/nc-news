const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/topics.js");

afterAll(() => {
  return db.end;
});

describe("/api/articles", () => {
  test("200 message to send all OK", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test;
  test("200 should return an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(Array.isArray(articles)).toBe(true);
      });
  });
  test("200 should return an array of articles with comment count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles[0]).toEqual({
          article_id: 34,
          article_img_url:
            "https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700",
          author: "grumpy19",
          comment_count: "11",
          created_at: "2020-11-22T11:13:00.000Z",
          title: "The Notorious MSG’s Unlikely Formula For Success",
          topic: "cooking",
          votes: 0,
        });
      });
  });
  test("200 should returng the sorted dates in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("200 should return a array without the body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((article) => {
          expect(article).not.toHaveProperty("body");
        });
      });
  });
});
