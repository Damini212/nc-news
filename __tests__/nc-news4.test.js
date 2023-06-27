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
  test("should return 400 if the article_id is a string or a combination of number and string", () => {
    return request(app).get("/api/articles/banana1").expect(400);
  });
  test("should return 404 if article_id is not provided", () => {
    return request(app)
      .get("/api/article")
      .expect(404)
      .catch(({ body }) => {
        expect(body.message).toBe("Bad request");
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
          article_id: 3,
          title: "22 Amazing open source React projects",
          topic: "coding",
          author: "happyamy2016",
          body: "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
          created_at: "2020-02-29T11:12:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?w=700&h=700",
        });
      });
  });
});
