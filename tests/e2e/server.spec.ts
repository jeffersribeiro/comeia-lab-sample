import request from "supertest";
import { app } from "@data/config";

describe("Server", () => {
  it("POST /tasks should response with 200", async () => {
    const response = await request(app).post("api/v1/task").send({
      description: "task 30",
    });
    expect(response.statusCode).toBe(200);
  });
});
