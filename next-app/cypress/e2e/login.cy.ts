describe("login", () => {
  beforeEach(() => {
    cy.visit("/auth/signin");
  });

  context("sign in by Google account", () => {
    it("allows users to login with google account", () => {
      cy.getByData("google-login-button").should("exist");
      cy.getByData("google-login-button").click();
    });
  });

  context("sign in by email and password", () => {
    it("redirects to homepage after login successfully", () => {
      cy.getByData("email-input").type("test@gmail.com");
      cy.getByData("password-input").type("123456Ab!");
      cy.getByData("signin-button").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    it("displays error messages when user sign in with empty email or/and password", () => {
      cy.getByData("signin-button").click();
      cy.getByData("email-input")
        .parent()
        .contains("Please enter a valid email address")
        .should("be.visible");
      cy.getByData("password-input")
        .parent()
        .parent()
        .contains("Password must be at least 6 characters")
        .should("be.visible");
    });

    it("displays an error message when the email is invalid", () => {
      cy.getByData("email-input").type("invalid-email");
      cy.getByData("password-input").type("123456Ab!");
      cy.getByData("signin-button").click();
      cy.getByData("email-input")
        .parent()
        .contains("Please enter a valid email address")
        .should("be.visible");
    });

    it("displays an error message when the password is too short", () => {
      cy.getByData("email-input").type("test@gmail.com");
      cy.getByData("password-input").type("12345");
      cy.getByData("signin-button").click();
      cy.getByData("password-input")
        .parent()
        .parent()
        .contains("Password must be at least 6 characters")
        .should("be.visible");
    });

    it("displays an alert when the email or password is wrong", () => {
      cy.getByData("email-input").type("test@gmail.com");
      cy.getByData("password-input").type("123456Ab!wrong");
      cy.getByData("signin-button").click();
      cy.getByData("error-alert")
        .contains("Invalid email or password")
        .should("be.visible");
    });
  });
});
