import { BaseApi } from "./base.api";
import { api } from "../data/api";

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

  async getBooking(bookingId) {}

  async updateBooking(body) {}

  async deleteBooking(bokkingId) {}
}
