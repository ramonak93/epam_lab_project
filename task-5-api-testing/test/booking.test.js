import { expect } from "chai";
import { httpRequest } from "./helpers/httpRequest.helper.js";
import { users } from "./data/users.js";
import { api } from "./data/api.js";
import { bookingData } from "./data/bookingData.js";

describe("Booking", () => {
  it("should generate an authentication token", async () => {
    const { request, response } = await httpRequest(
      api.auth,
      "POST",
      undefined,
      users.validUser,
    );

    expect(request.status).to.equal(200);
    expect(response).has.property("token");
    expect(response.token).to.not.be.empty;
  });

  it("should create a booking", async () => {
    const { request, response } = await httpRequest(
      api.booking,
      "POST",
      undefined,
      bookingData.original,
    );

    expect(request.status).to.equal(200);
    expect(response.booking).to.deep.include(bookingData.original);
  });

  it("should update an existing booking with valid authentication", async () => {
    //auth
    const { request: authRequest, response: authResponse } = await httpRequest(
      api.auth,
      "POST",
      undefined,
      users.validUser,
    );
    const token = authResponse.token;

    //create
    const myHeader = {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    };

    const { request: createRequest, response: createResponse } =
      await httpRequest(api.booking, "POST", myHeader, bookingData.original);
    const bookingId = await createResponse.bookingid;

    //update
    const { request: updateRequest, response: updateResponse } =
      await httpRequest(
        `${api.booking}/${bookingId}`,
        "PUT",
        myHeader,
        bookingData.updated,
      );

    expect(updateRequest.status).to.be.equal(200);
    expect(updateResponse).to.deep.include(bookingData.updated);
  });

  it("should fail to update an existing booking without valid authentication", async () => {});

  it("should delete an existing booking with valid authentication", async () => {});
});
