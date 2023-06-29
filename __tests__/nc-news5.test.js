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
        expect(articles[0]).toMatchObject({
          article_id: 3,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          author: "icellusedkars",
          comment_count: "2",
          created_at: "2020-11-03T09:12:00.000Z",
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
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
  test("200 should return articles filtered by a topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((article) => {
          expect(article).toHaveProperty("topic", "mitch");
        });
      });
  });
  test("should return  if an invalid query is made", () => {
    return request(app)
      .get("/api/articles?topic=xylophone")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(0);
      });
  });
  test("should sort the articles by title in ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeSortedBy("title");
      });
  });
  test("should sort the articles by title in ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=invalidQuery&order=asc")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});
