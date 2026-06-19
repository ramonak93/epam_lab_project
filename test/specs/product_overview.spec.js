/*
 * UC-1 Sign in Validation (Positive andNegative Testing)
 * Practicing EXPECT, SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect, should, assert } from "chai";
import { HomePage, ProductDetailPage } from "../pageobjects";
import { clearBrowserState, waitForRedirect } from "../helpers";
import { users, routes, MAX_ATTEMPTS } from "../data";

should();

describe("product overview", async () => {
  it("should navigate to product detail when product card is clicked", async () => {});
  it("search for a product by name", async () => {});
  it("navigate between pages of products", async () => {});
});
