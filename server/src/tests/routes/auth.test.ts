import request from "supertest";
import { app } from "./../../app";
import { describe, test, expect } from "mocha";

describe("POST /api/signup", () => {
  test("creates a user and returns a JWT", async () => {
    const res = await request(app).post("/api/signup").send({
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      password: "secret123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
