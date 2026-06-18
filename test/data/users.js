export const users = {
  validUser_1: {
    firstName: "Jane",
    lastName: "Doe",
    email: "customer@practicesoftwaretesting.com",
    password: "welcome01",
    phone: "",
    street: "Test street 98",
    postalCode: "",
    city: "Vienna",
    state: "",
    country: "Austria",
  },

  validUser_2: {
    email: "ccustomer2@practicesoftwaretesting.com",
    password: "welcome01",
    firstName: "Jack",
    lastName: "Howe",
  },

  admin: {
    email: "admin@practicesoftwaretesting.com",
    password: "welcome01",
    firstName: "John",
    lastName: "Doe",
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
