import { expect } from "chai";

//prettier-ignore
// import {createToken, createBooking, updateBooking, deleteBooking, getBooking} from "./helpers/index.js";
import { BookingApi } from "../api/booking.api.js";
import { AuthApi } from "../api/auth.api.js";
import { users } from "../data/users.js";
import { api } from "../data/endpoints.js";
import { bookingData } from "../data/bookingData.js";

const bookingApi = new BookingApi();
const authApi = new AuthApi();

describe("Create features", () => {
  it.only("should generate an authentication token", async () => {
    const response = await authApi.createToken(users.validUser);
    const parsedResponse = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(parsedResponse).has.property("token");
    expect(parsedResponse.token).to.not.be.empty;
  });

  it("should create a booking", async () => {
    const request = await createBooking(api.booking, bookingData.original);
    const result = await request.json();

    expect(request.status).to.equal(200);
    expect(result.booking).to.deep.include(bookingData.original);
  });
});

describe("Update and delete features", () => {
  let token;
  let bookingId;
  let myHeader;

  beforeEach(async () => {
    const authRequest = await createToken(api.auth, users.validUser);
    const authResult = await authRequest.json();

    token = authResult.token;
    myHeader = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${token}`,
    };

    const createRequest = await createBooking(
      api.booking,
      bookingData.original,
      myHeader,
    );
    const createResult = await createRequest.json();
    bookingId = await createResult.bookingid;
  });

  it("should update an existing booking with valid authentication", async () => {
    const request = await updateBooking(
      `${api.booking}/${bookingId}`,
      bookingData.updated,
      myHeader,
    );
    const result = await request.json();

    expect(request.status).to.be.equal(200);
    expect(result).to.deep.include(bookingData.updated);
  });

  it("should fail to update an existing booking without valid authentication", async () => {
    const request = await updateBooking(
      `${api.booking}/${bookingId}`,
      bookingData.updated,
      { "Content-Type": "application/json", Accept: "application/json" },
    );
    const result = await request.text();

    expect(request.status).to.not.be.equal(200);
    expect(result).to.include("Forbidden");
  });

  it("should delete an existing booking with valid authentication", async () => {
    const deleteRequest = await deleteBooking(
      `${api.booking}/${bookingId}`,
      myHeader,
    );
    expect(deleteRequest.status).to.be.equal(201);

    const request = await getBooking(`${api.booking}/${bookingId}`);
    const result = await request.text();

    expect(request.status).to.be.equal(404);
    expect(result).to.include("Not Found");
  });
});
