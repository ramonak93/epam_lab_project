import { BaseApi } from "./base.api";
import { api } from "../data/api";

export class AuthApi extends BaseApi {
  constructor() {
    super("https://restful-booker.herokuapp.com");
  }

  async createToken(credentials) {
    return this.request(api.authApi, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    });
  }
}
