const supertest = require('supertest');
const mongoose = require('mongoose');
const { connect, disconnect } = require('mongoose');
const app = require('../index.js'); // Replace with your Express app
const Blog = require('../models/blogtestschema.js');
const dotenv = require('dotenv')
dotenv.config();

describe('Blog Controller', () => {
  let testBlog;
  let authToken;
  let testBlogId;

  beforeAll(async () => {
    // mongodb://localhost:27017/nodedb
    // Connect to the test database or your actual database
    await connect('process.env.MONGO_URI', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Seed the database with test data
    testBlog = await Blog.create({ title: 'Test Blog 1', content: 'Lorem ipsum dolor sit amet.' });

    // Simulate user authentication and get the authentication token
    const loginRes = await supertest(app)
      .post('/login')
      .send({
        email: 'pacifiquemboni@gmail.com',
        password: 'Paci@123',
      });
    authToken = loginRes.body.token;
    // Seed the database with a test blog
  const testBlognew = await Blog.create({
    title: 'Test Blog',
    author: 'Test Author',
    intro: 'Test Introduction',
    body: 'Test Body',
  });
  testBlogId = testBlognew._id;

  });

  afterAll(async () => {
    // Remove test data from the database and close the connection
    await Blog.deleteMany({});
    await disconnect();
  });

  describe('GET /blogs', () => {
    it('should get all blogs', async () => {
      // Arrange
      const expectedStatus = 200;

      // Act
      const res = await supertest(app).get('/blogs');

      // Assert
      expect(res.status).toBe(expectedStatus);
      expect(res.body.status).toBe('Posted blogs');
      expect(res.body.data).toBeInstanceOf(Array);
      // You can add more specific assertions based on your application requirements
    });
  });
  describe('POST /testBlogs', () => {
    it('should create a new test blog with authentication', async () => {
      // Arrange
      const expectedStatus = 201;  // Corrected status code
      const newTestBlogData = {
        title: 'Test Blog Title',
        intro: 'Test Blog Introduction',
        body: 'Test Blog Body',
      };
  
      // Act
      const res = await supertest(app)
        .post('/postblog')  // Make sure the route is correct
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTestBlogData);
  
      // Log the response body for debugging
      console.log('final body', res.body);
  
      // Assert
      expect(res.status).toBe(expectedStatus);
      expect(res.body).toBeDefined();  // Check if the response body exists
      expect(res.body.status).toBe('Success');
      expect(res.body.data).toBeDefined();
      expect(res.body.data.title).toBe(newTestBlogData.title);
      expect(res.body.data.intro).toBe(newTestBlogData.intro);
      expect(res.body.data.body).toBe(newTestBlogData.body);
      // You can add more specific assertions based on your application requirements
    });
  });
  

  describe('GET /blogs/:id', () => {
    it('should get one blog by ID with authorization', async () => {
      // Arrange
      const expectedStatus = 200;
      const blogId = '65ef17018f2584e6f1eee36c';
  
      // Act
      const res = await supertest(app)
        .get(`/blogs/${blogId}`)
        .set('Authorization', `Bearer ${authToken}`);
  
      // Log the entire response for debugging
      console.log(res.body);
  
      // Assert
      expect(res.status).toBe(expectedStatus);
  
      if (res.body.message === 'blog with that id is deleted') {
        // Adjust assertions for deleted blog
        expect(res.body.message).toBe('blog with that id is deleted');
      } else {
        // Continue with assertions for existing blog
        expect(res.body.status).toBe('Success');
        expect(res.body.data).toBeDefined();
        expect(res.body.data._id).toBe(blogId);
      }
  
      // You can add more specific assertions based on your application requirements
    });
  });
  describe('DELETE /blogs/:id', () => {
    it('should delete one blog by ID with authorization', async () => {
      // Arrange
      const expectedStatus = 200;
      const blogId = '65ef17018f2584e6f1eee36c';
  
      // Act
      const res = await supertest(app)
        .delete(`/blogs/${blogId}`)
        .set('Authorization', `Bearer ${authToken}`);
  
      // Log the entire response for debugging
      console.log(res.body);
  
      // Assert
      expect(res.status).toBe(expectedStatus);
  
       
        // Assertions for an existing blog
        expect(res.body.status).toBe('Success');
        expect(res.body.data).toBeDefined();
        expect(res.body.data._id).toBe(blogId);
     
  
      // You can add more specific assertions based on your application requirements
    });
  });
  
  
  describe('PATCH /blogs/:id', () => {
    it('should update a blog with authentication and proper role', async () => {
      // Arrange
      const expectedStatus = 200;
      const updatedData = {
        title: 'Updated Test Blog Title',
        body: 'Updated Test Blog Body',
      };

      // Act
      const res = await supertest(app)
        .patch(`/blogs/${testBlogId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);

      // Log the response body for debugging
      console.log('final update body', res.body);

      // Assert
      expect(res.status).toBe(expectedStatus);
      expect(res.body.status).toBe('Success');
      expect(res.body.data).toBeDefined();
      expect(res.body.data.title).toBe(updatedData.title);
      expect(res.body.data.body).toBe(updatedData.body);
      // You can add more specific assertions based on your application requirements
    });
  });

  // Add more test cases if needed, such as testing edge cases
});