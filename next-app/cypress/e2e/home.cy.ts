describe("homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Hero section", () => {
    it("the h1 contains the correct text", () => {
      cy.getByData("hero-heading").contains("Your Roadmap to Civic Innovation");
    });

    it("the seach button on the homepage exists", () => {
      cy.get("button").contains("Search").should("exist");
    });

    it("allow users to search in the search bar", () => {
      cy.getByData("search-input").type("data");
      cy.getByData("search-button").click();
      cy.url().should("include", "/resources?search=data");
    });

    it("display all resources if users press search without typing in the search field", () => {
      cy.getByData("search-button").click();
      cy.url().should("include", "/resources");
    });

    it("display no resource when users search for a non-existent resource", () => {
      cy.getByData("search-input").type("non-existent-resource");
      cy.getByData("search-button").click();
      cy.getByData("not-found-message").should("exist");
    });
  });

  context("Header", () => {
    it("site logo exist", () => {
      cy.getByData("site-logo").should("exist");
    });

    it("horizontal menu exist on large screens", () => {
      cy.getByData("horizontal-menu").should("exist");
    });

    it("display four submenu items under 'How to Use' on large screens", () => {
      cy.viewport(1280, 800);
      cy.getByData("how-to-use-link-large-screen").click();
      cy.contains("Use Cases").should("exist");
      cy.contains("Civic 101").should("exist");
      cy.contains("Build Partnerships").should("exist");
      cy.contains("Get to Work").should("exist");
    });

    it("display three submenu items under 'About' on large screens", () => {
      cy.viewport(1280, 800);
      cy.getByData("about-link-large-screen").click();
      cy.contains("About Us").should("exist");
      cy.contains("Our Team").should("exist");
      cy.contains("Who We Serve").should("exist");
    });

    it("hamburger menu exist on small screens", () => {
      cy.viewport(375, 667);
      cy.getByData("hamburger-menu").should("exist");
    });

    it("display all submenu items under under hamburger icon on small screens", () => {
      cy.viewport(375, 667);
      cy.getByData("hamburger-menu").click();
      cy.contains("Use Cases").should("exist");
      cy.contains("Civic 101").should("exist");
      cy.contains("Build Partnerships").should("exist");
      cy.contains("Get to Work").should("exist");
      cy.contains("About Us").should("exist");
      cy.contains("Our Team").should("exist");
      cy.contains("Who We Serve").should("exist");
    });

    it("navigate users to the resource page", () => {
      cy.getByData("resources-link").should("exist");
      cy.getByData("search-button").click();
      cy.url().should("include", "/resources");
    });

    it("navigate users to the 'Add a Resource' page", () => {
      cy.getByData("add-a-resource-link").click();
      cy.url().should("include", "/add-a-resource");
    });

    it("should switch to dark mode when clicking the toggle button", () => {
      // Ensure the initial theme is NOT dark mode
      cy.document().then((doc) => {
        expect(doc.documentElement.getAttribute("data-theme")).not.to.equal(
          "night"
        );
      });

      // Click the theme toggle button
      cy.getByData("toggle-theme-button").click();

      // Verify that the theme has changed to "night" (dark mode)
      cy.document().should((doc) => {
        expect(doc.documentElement.getAttribute("data-theme")).to.equal(
          "night"
        );
      });

      // Refresh the page to test persistence
      cy.reload();

      // Ensure theme is still "night" after reload
      cy.document().should((doc) => {
        expect(doc.documentElement.getAttribute("data-theme")).to.equal(
          "night"
        );
      });
    });

    it("should show the Login button when unauthenticated", () => {
      // Mock session status as "unauthenticated"
      cy.intercept("GET", "/auth/session", {
        statusCode: 200,
        body: { status: "unauthenticated" },
      });

      cy.get("button").contains("Login").should("be.visible");
    });

    it("should redirect to the login page when clicking the Login button", () => {
      cy.intercept("GET", "/auth/session", {
        statusCode: 200,
        body: { status: "unauthenticated" },
      });

      cy.get("button").contains("Login").click();
      cy.url().should("include", "/auth/signin");
    });

    it("should show a loading indicator when session is loading", () => {
      // Mock session status as "loading"
      cy.intercept("GET", "/auth/session", {
        statusCode: 200,
        body: { status: "loading" },
      });

      cy.get(".loading-dots").should("be.visible");
    });
  });
});
