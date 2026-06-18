export const users = {
  validUser: {
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
  },

  admin: {
    email: "admin@practicesoftwaretesting.com",
    password: "welcome01",
  },

  invalidCredentials: {
    email: "nonexistent@example.com",
    password: "WrongPassword123!",
  },

  lockoutTest: {
    email: "customer3@practicesoftwaretesting.com",
    password: "wrongPassword",
  },
};
