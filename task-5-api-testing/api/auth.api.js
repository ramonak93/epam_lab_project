import { BaseApi } from "./base.api.js";
import { endpoints } from "../data/endpoints.js";

export class AuthApi extends BaseApi {
  constructor() {
    super("https://restful-booker.herokuapp.com");
  }

  async createToken(credentials) {
    return this.request(endpoints.authApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  }
}
