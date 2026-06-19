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
    email: "customer2@practicesoftwaretesting.com",
    password: "welcome01",
    firstName: "Jack",
    lastName: "Howe",
  },

  validUser_3: {
    email: "customer3@practicesoftwaretesting.com",
    password: "pass123",
    firstName: "Bob",
    lastName: "Smith",
  },

  passwordChange: {
    newPassword: "LabasVakaras99!!",
    wrongCurrentPassword: "invalidPassword2!",
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
