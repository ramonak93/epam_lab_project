import { BaseApi } from "./base.api.js";
import { endpoints } from "../data/endpoints.js";

export class BookingApi extends BaseApi {
  constructor() {
    super("https://restful-booker.herokuapp.com");
  }

  async createBooking(body) {
    return this.request(endpoints.bookingApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async getBooking(bookingId) {
    return this.request(`${endpoints.bookingApi}/${bookingId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  }

  async updateBooking(bookingId, token, body) {
    return this.request(`${endpoints.bookingApi}/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  async deleteBooking(bookingId, token) {
    return this.request(`${endpoints.bookingApi}/${bookingId}`, {
      method: "DELETE",
      headers: { Cookie: `token=${token}` },
    });
  }
}
