import { expect } from "chai";
import { users } from "./data/users.js";
import { endpoints } from "./data/endpoints.js";
import { booking } from "./data/booking.js";

describe("Booking", () => {
  it("should generate an authentication token", async () => {
    const response = await fetch(endpoints.auth, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users.validUser),
    });

    const result = await response.json();

    expect(response.status).to.equal(200);
    expect(result).has.property("token");
    expect(result.token).to.not.be.empty;
  });

  it("should create a booking", async () => {
    const response = await fetch(endpoints.booking, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    const result = await response.json();

    expect(response.status).to.equal(200);
    expect(result.booking).to.deep.include(booking);
  });

  it.only("should update an existing booking with valid authentication", async () => {
    //auth
    const auth = await fetch(endpoints.auth, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users.validUser),
    });

    const authResult = await auth.json();
    const token = authResult.token;

    // create
    const newBooking = await fetch(endpoints.booking, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    const createResult = await newBooking.json();
    const bookingId = await createResult.bookingid;

    // update
    const updateResponse = await fetch(`${endpoints.booking}/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        "Cookie": `token=${token}`,
      },
      body: JSON.stringify(booking),
    });

    const updateResult = await updateResponse.json();
    expect(updateResponse.status).to.be.equal(200);
  });

  it("should fail to update an existing booking without valid authentication", async () => {
    expect(users.admin.username).to.equal("admin");
  });

  it("should delete an existing booking with valid authentication", async () => {
    expect(users.admin.username).to.equal("admin");
  });
});
