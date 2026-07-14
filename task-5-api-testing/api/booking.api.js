import { BaseApi } from "./base.api.js";
import { api } from "../data/endpoints.js";

export class BookingApi extends BaseApi {
  constructor() {
    super("https://restful-booker.herokuapp.com");
  }

  async createBooking(body) {
    return this.request(api.bookingApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async getBooking(bookingId) {
    return this.request(`${api.bookingApi}${bookingId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  }

  async updateBooking(bookingId, token, body) {
    return this.request(`${api.bookingApi}${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cokkie: `token=${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  async deleteBooking(bookingId, token) {
    return this.request(`${api.bookingApi}${bookingId}`, {
      method: "GET",
      headers: { Cokkie: `token=${token}` },
    });
  }
}
