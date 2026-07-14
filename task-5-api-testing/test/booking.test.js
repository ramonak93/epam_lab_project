import { expect } from "chai";

import { BookingApi } from "../api/booking.api.js";
import { AuthApi } from "../api/auth.api.js";
import { users } from "../data/users.js";
import { api } from "../data/endpoints.js";
import { bookingData } from "../data/bookingData.js";

const bookingApi = new BookingApi();
const authApi = new AuthApi();

describe("Create features", () => {
  it("should generate an authentication token", async () => {
    const response = await authApi.createToken(users.validUser);
    const parsedResponse = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(parsedResponse).has.property("token");
    expect(parsedResponse.token).to.not.be.empty;
  });

  it("should create a booking", async () => {
    const response = await bookingApi.createBooking(bookingData.original);
    const parsedResponse = await response.json();

    expect(response.status).to.equal(200);
    expect(parsedResponse.booking).to.deep.include(bookingData.original);
  });
});

describe("Update and delete features", () => {
  let token;
  let bookingId;

  beforeEach(async () => {
    const authResponse = await authApi.createToken(users.validUser);
    const authParsedResponse = await authResponse.json();
    token = authParsedResponse.token;

    const createResponse = await bookingApi.createBooking(bookingData.original);
    const createParsedResponse = await createResponse.json();
    bookingId = await createParsedResponse.bookingid;
  });

  it("should update an existing booking with valid authentication", async () => {
    const response = await bookingApi.updateBooking(
      bookingId,
      token,
      bookingData.updated,
    );
    const parsedResponse = await response.json();

    expect(response.status).to.be.equal(200);
    expect(parsedResponse).to.deep.include(bookingData.updated);
  });

  it("should fail to update an existing booking without valid authentication", async () => {
    const response = await bookingApi.updateBooking(
      bookingId,
      "",
      bookingData.updated,
    );
    const parsedResponse = await response.text();

    expect(response.status).to.not.be.equal(200);
    expect(parsedResponse).to.include("Forbidden");
  });

  it("should delete an existing booking with valid authentication", async () => {
    const deleteResponse = await bookingApi.deleteBooking(bookingId, token);
    expect(deleteResponse.status).to.be.equal(201);

    const getResponse = await bookingApi.getBooking(bookingId);
    const getParsedResponse = await getResponse.text();

    expect(getResponse.status).to.be.equal(404);
    expect(getParsedResponse).to.include("Not Found");
  });
});
