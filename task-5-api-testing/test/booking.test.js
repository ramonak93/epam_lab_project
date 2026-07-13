import { expect } from "chai";
import { httpRequest } from "./helpers/httpRequest.helper.js";
import { createToken } from "./helpers/createToken.js";
import { createBooking } from "./helpers/createBooking.js";
import { updateBooking } from "./helpers/updateBooking.js";
import { deleteBooking } from "./helpers/deleteBooking.js";
import { getBooking } from "./helpers/getBooking.js";
import { users } from "./data/users.js";
import { api } from "./data/api.js";
import { bookingData } from "./data/bookingData.js";

describe("Create features", () => {
  it("should generate an authentication token", async () => {
    const request = await createToken(api.auth, users.validUser);
    const result = await request.json();

    expect(request.status).to.equal(200);
    expect(result).has.property("token");
    expect(result.token).to.not.be.empty;
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
    //get an auth token
    const authRequest = await createToken(api.auth, users.validUser);
    const authResult = await authRequest.json();

    token = authResult.token;
    myHeader = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${token}`,
    };

    //create a booking
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
    //delete
    const deleteRequest = await deleteBooking(
      `${api.booking}/${bookingId}`,
      myHeader,
    );
    expect(deleteRequest.status).to.be.equal(201);

    //get
    const request = await getBooking(`${api.booking}/${bookingId}`);
    const result = await request.text();

    expect(request.status).to.be.equal(404);
    expect(result).to.include("Not Found");
  });
});
