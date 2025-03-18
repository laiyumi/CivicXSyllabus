import React from "react";
import Accordion from "./Accordion";
import { mount } from "@cypress/react";
import "../globals.css";

describe("Accordion Component", () => {
  const mockData = {
    category: "Technology",
    title: "AI in Healthcare",
    subtitle: "How AI is transforming medicine",
    description: [
      "AI is being used to diagnose diseases more accurately.",
      "Machine learning helps in personalized treatments.",
    ],
    selectedResources: [
      {
        name: "AI Research Paper",
        summary: "A detailed study on AI in medicine.",
      },
      {
        name: "Healthcare AI Podcast",
        summary: "Discussion on AI applications in healthcare.",
      },
    ],
  };

  beforeEach(() => {
    mount(<Accordion data={mockData} />);
  });

  it("should display the correct title", () => {
    cy.contains("AI in Healthcare").should("be.visible");
  });

  it("should toggle accordion content when clicked", () => {
    // Initially, content should be hidden
    cy.get("button[aria-expanded='false']").should("exist");

    // Click to expand
    cy.getByData("accordion-header").click();
    cy.get("button[aria-expanded='true']").should("exist");

    // Click again to collapse
    cy.getByData("accordion-header").click();
    cy.get("button[aria-expanded='false']").should("exist");
  });

  it("should display the correct subtitle and description when expanded", () => {
    cy.contains("AI in Healthcare").click();
    cy.contains("How AI is transforming medicine").should("be.visible");
    cy.contains(
      "AI is being used to diagnose diseases more accurately."
    ).should("be.visible");
    cy.contains("Machine learning helps in personalized treatments.").should(
      "be.visible"
    );
  });

  it("should display selected resources", () => {
    cy.contains("AI in Healthcare").click();
    cy.contains("AI Research Paper").should("be.visible");
    cy.contains("Healthcare AI Podcast").should("be.visible");
  });

  it("should navigate to category page when 'View More' is clicked", () => {
    cy.contains("AI in Healthcare").click();
    cy.contains("View More in Technology").should(
      "have.attr",
      "href",
      "/resources?category=Technology"
    );
  });
});
