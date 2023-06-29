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

describe("GET /api/articles/:article_id", () => {
  test("The array should return 200 all ok", () => {
    return request(app).get("/api/articles/3").expect(200);
  });
  test("should return 400 if the article_id is a string or a combination of number and string", () => {
    return request(app).get("/api/articles/banana1").expect(400);
  });
  test("should return 404 if article_id is not provided", () => {
    return request(app)
      .get("/api/article")
      .expect(404)
      .catch(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
  test("should return 400 if an invalid id is provided", () => {
    return request(app).get("/api/articles/99").expect(400);
  });

  test("should return the article object when the article id is provided", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toMatchObject({
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          votes: 0,
        });
      });
  });
});
