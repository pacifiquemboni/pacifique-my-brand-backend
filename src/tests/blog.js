const request = require("supertest");
const app = require("../index");
const BlogController = require("../controllers/blogcontroller");
// const app = require("../index");
// const PORT = 3001;
// const server = app(PORT);

const blog = require("../models/blogschema");
const { post } = require("../routes/blogroutes");

jest.mock("../models/blogschema.js");

describe("POST a blog /api/blog", () => {
  test("should have a 400 status and a valid error response: Title, Introduction, Body and image are required", async () => {
    const response = await request(app).post("/blog").send({});
    expect(response.statusCode).toBe(400);
  });

  test("Should have a 400 status and a valid error response: Image is required", async () => {
    const response = await request(app).post("/blog").send({
      title: "hello",
      author: "paccy",
      intro: "this is introduction",
      body: "this is the body of my blog",
    });
    expect(response.statusCode).toBe(400);
  });
  // test("Should have a 200 status: blog posted successfully", async () => {
  //   const imagePath = "./uploads/Group77.png";
  //   const response = await request(app)
  //     .post("/api/blog")
  //     .field("title",  "hello")
  //     .field("author", "paccy")
  //     .field("intro", "this is introduction")
  //     .field("body", "this is the body of my blog")
  //     .attach("blogImage", imagePath); // Make sure to use the correct field name

  //   expect(response.statusCode).toBe(200);
  // });
});
describe("GET all blogs /api/blogs", () => {
  test("should have a 200 status and valid response:posted blogs", async () => {
    const response = await request(app).get("/blogs");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST a comment /api//blogs/:id/comment", () => {
  test("should have a 401 status and valid response : unauthorized access", async () => {
    const response = await request(app)
      .post("/blogs/:id/comment")
      .send({
        blogId: "002343253464576534gd",
      });
    expect(response.statusCode).toBe(401);
  });
});
describe("commentOnBlog", () => {
  test("should return 400 for missing blogId", async () => {
    const response = await request(app)
      .post("/blogs/:id/comment")
      .send({
        names: "John Doe",
        comment: "Great blog!",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("blogId does not exist");
  });

  // Add more tests for different scenarios related to commentOnBlog
});
