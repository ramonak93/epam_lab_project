import { expect } from "chai";
import { data } from "./data/data.js";

describe("Booking", () => {
  it.only("should generate an authentication token", async () => {
    const response = await fetch(data.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.validUser),
    });

    const body = await response.json();
    expect(response.status).to.equal(200);
  });

  it("should create a booking", async () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should update an existing booking with valid authentication", async () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should fail to update an existing booking without valid authentication", async () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should delete an existing booking with valid authentication", async () => {
    expect(users.admin.username).to.equal("admin");
  });
});
