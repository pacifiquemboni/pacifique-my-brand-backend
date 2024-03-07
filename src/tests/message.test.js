const request = require("supertest");
const app = require("../index");
const message = require('../models/messageschema')
jest.mock('../models/messageschema');

describe("POST a message /api/sendmessage", () => {
   test("should have a 400 status and valid error response: message is required", async () => {
    const response = await request(app).post("/api/sendmessage").send({
      
    });
    expect(response.statusCode).toBe(400)
  });
  test("should have a 400 status and valid error response: Enter valid email", async () => {
    const response = await request(app).post("/api/sendmessage").send({
    
      email:'pazzo',
      
    });
    expect(response.statusCode).toBe(400)
  });

  test("should have a 400 status and valid response: message is require", async () => {
    const response = await request(app).post("/api/sendmessage").send({
      names:'pazzo',
      email:'pazzo'
    });
    expect(response.statusCode).toBe(400)
  });
  // test("should have a 200 status and valid response: message sent successfully", async () => {
  //   const response = await request(app).post("/api/sendmessage").send({
  //     names:'pazzo',
  //     email:'pazzo',
  //     message:'sjhasjjjjjdfg'
  //   });
  //   expect(response.statusCode).toBe(400)
  // });
  // test("should have a 200 status and valid response: message sent successfully", async () => {
  //   const response = await request(app).post("/api/sendmessage").send({
  //     names:'pazzo',
  //     email:'pazzo',
  //     message:'sjhasjjjjjdfg'
  //   });
  //   expect(response.statusCode).toBe(200)
  // });
});
