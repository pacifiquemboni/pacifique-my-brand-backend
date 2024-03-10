// Import necessary modules and dependencies
const request = require("supertest");
const app = require("../index.js");

jest.mock("../models/blogschema.js");
let accessToken;

beforeAll(async () => {
  // Authenticate and get the access token
  const authResponse = await request(app).post("/login").send({
    email: "admin@gmail.com",
    password: "Admin@123",
  });
  
  console.log("body is=",authResponse.body);
console.log("token is =",authResponse.body.token)
  accessToken = authResponse.body.token;
  
}, 20000);

// Describe block for the BlogController tests
describe("BlogController", () => {
  describe("Get blogs:", () => {
    it("should return 200 trying to get all blogs posted", async () => {
      const response = await request(app).get("/blogs");
      expect(response.status).toBe(200);
    });
    it("should return 4001 trying to get one blog posted", async () => {
      const response = await request(app).get("/blogs/:id");
      expect(response.status).toBe(401);
    });
  });

  describe("Post blog: ", () => {
    it("should create a new blog post with authentication", async () => {
      const response = await request(app)
        .post("/blog")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          title: "New Blog Post",
          author: "paci",
          intro: "introduction",
          body: "body of the blog",
        });
      console.log(response.body);

      expect(response.status).toBe(201);
      // Add more expectations based on your API response
    }, 10000);
    // Test case: Unauthorized access to create a blog post
    it("should return 401 for unauthorized user trying to create a blog post", async () => {
      // Send a request without providing the authorization token
      const response = await request(app).post("/blog").send({
        title: "Test Blog Post",
        content: "This is a test blog post.",
      });

      // Assert that the response status code is 401 (Unauthorized)
      expect(response.status).toBe(401);
    });
    it("should return 401 for unauthorized user trying to create a blog post", async () => {
      // Send a request without providing the authorization token
      const response = await request(app).post("/blog").send({});

      // Assert that the response status code is 401 (Unauthorized)
      expect(response.status).toBe(401);
    });
    // Test case: Unauthorized access to comment on a blog post
    it("should return 401 for unauthorized user trying to comment a blog post", async () => {
      // Send a request without providing the authorization token
      const response = await request(app).post("/blogs/{:id}/comment").send({
        names: "Test Blog Post",
        comment: "This is a test blog post.",
      });

      // Assert that the response status code is 401 (Unauthorized)
      expect(response.status).toBe(401);
    });
  });

  describe("Delete blog:", () => {
    // Test case: Unauthorized access to delete on a blog post
    it("should return 401 for unauthorized user trying to delet a blog post", async () => {
      // Send a request without providing the authorization token
      const response = await request(app).delete("/blogs/:id").send({
        blogId: "132434534657855375",
      });

      // Assert that the response status code is 401 (Unauthorized)
      expect(response.status).toBe(401);
    });
  });

  describe("Update a blog:", () => {
    // Test case: Unauthorized access to udate a blog post
    it("should return 401 for unauthorized user trying to comment a blog post", async () => {
      // Send a request without providing the authorization token
      const response = await request(app).patch("/blogs/:id").send({
        blogId: "132434534657855375",
      });

      // Assert that the response status code is 401 (Unauthorized)
      expect(response.status).toBe(401);
    });
  });
});
