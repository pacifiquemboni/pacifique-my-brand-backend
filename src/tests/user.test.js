const request = require("supertest");
const app = require("../index");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/signupschema.js')

const testMongoUri = process.env.MONGO_URI;
// const app = require('../index');
// const PORT = 3000;
// const server = app(PORT);
dotenv.config();
// Mock the signupschema.js module
jest.mock('../models/signupschema.js');


describe("Post /api/user", () => {
  test("should have a 400 status and valid error response: name is required", async () => {
    const response = await request(app).post("/user").send({
      email: "paci@gmail.com",
      password: "123456",
      confpass: "123456",
      role: "admin",
    });
    expect(response.statusCode).toBe(400);
  });
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
  test("should have a 200 status and valid success response: successfull registered", async () => {
    const response = await request(app).post("/user").send({
      names: "mbonimana",
      email: "paci@gmail.com",
      password: "Paci@123",
      confpass: "Paci@123",
      role: "admin",
    });
    expect(response.statusCode).toBe(200);
  });
});
describe('Update user', ()=>{
  test('should have a 200 status and valid success response: name updated successfully', async()=>{
    const response = (await request(app).patch('/users/:id')).setEncoding({
      names:" paci",
    })
    expect(response.statusCode).toBe(200);
  })
})