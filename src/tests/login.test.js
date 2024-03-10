const request = require("supertest");
const app = require("../index");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/signupschema.js')

const testMongoUri = process.env.MONGO_URI;

dotenv.config();
// Mock the testuserschema.js module
jest.mock('../models/testuserschema.js');


describe("Post /api/user", () => {
  
  test("should have a 400 status and valid error response: email is not valid", async () => {
    const response = await request(app).post("/user").send({
      names: "mbonimana",
      email: "pacigmailcom",
      password: "123456",
    });
    expect(response.statusCode).toBe(400);
  });
  test("should have a 400 status and valid error response: password is not valid", async () => {
    const response = await request(app).post("/user").send({
      names: "mbonimana",
      email: "paci@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(400);
  });
  test("should have a 400 status and valid error response: password doesnot match", async () => {
    const response = await request(app).post("/user").send({
      names: "mbonimana",
      email: "paci@gmail.com",
      password: "Paci@123",
      confpass: "123456",
    });
    expect(response.statusCode).toBe(400);
  });
});
describe('Login user', () => {
  beforeAll(async () => {
    // Connect to the test database before running the tests
    await mongoose.connect(testMongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('should authenticate user and return access token', async () => {
    // Perform your test logic here, including database operations

    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'admin@gmail.com',
        password: 'Admin@123', // Use the correct password
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
  });

  afterAll(async () => {
    // Disconnect from the test database after running the tests
    await mongoose.disconnect();
  });
});