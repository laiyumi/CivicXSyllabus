import { mount } from "@cypress/react";
import { DeleteAccountButton } from "@/app/components/DeleteAccountButton";
import { SessionProvider, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import axios from "axios";

describe("DeleteAccountButton Component", () => {
  // beforeEach(() => {
  //   cy.task("createTestUser"); // create a test user
  //   cy.login();
  // });
  // it("should allow the user to delete their account", () => {
  //   cy.visit("/user/profile");
  //   cy.getByData("delete-account-button").should("be.visible");
  // });
  // it("should ask for confirmation before deleting the account", () => {
  //   cy.visit("/user/profile");
  //   cy.getByData("delete-account-button").click();
  //   cy.get("dialog").should("be.visible");
  // });
  // it("should delete the account when the user confirms", () => {
  //   cy.visit("/user/profile");
  //   cy.getByData("delete-account-button").click();
  //   cy.get("dialog").should("be.visible");
  //   cy.getByData("confirm-delete-button").click();
  //   cy.get("dialog").should("contain.text", "Your account has been deleted.");
  //   // check if the user is redirected to the homepage after 3 seconds
  //   cy.url().should("eq", "http://localhost:3000/");
  // });
});
