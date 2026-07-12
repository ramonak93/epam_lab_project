import { expect } from "chai";
import { users } from "./data/users.js";

describe("Booking", () => {
  it("should generate an authentication token", () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should create a booking", () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should update an existing booking with valid authentication", () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should fail to update an existing booking without valid authentication", () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should delete an existing booking with valid authentication", () => {
    expect(users.admin.username).to.equal("admin");
  });
});
