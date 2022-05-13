describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Dimitri Yabkevich",
      username: "dyabkevich",
      password: "elfdal12",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it.only("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("dyabkevich");
    cy.get("#password").type("wrong");
    cy.get("button-login").click();

    cy.contains("wrong credentials");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, Florida International University, 2022"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("dyabkevich");
    cy.get("#password").type("elfdal12");
    cy.get("#button-login").click();

    cy.contains("Dimitri Yabkevich logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("dyabkevich");
      cy.get("input:last").type("elfdal12");
      cy.get("#button-login").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("input").type("another note cypress");
        cy.contains("save").click();
      });

      it("it can be made important", function () {
        cy.contains("another note cypress").contains("make important").click();
        cy.contains("another note cypress").contains("make not important");
      });
    });
  });
});
