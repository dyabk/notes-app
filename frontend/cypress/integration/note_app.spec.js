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

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("dyabkevich");
    cy.get("#password").type("wrong");
    cy.get("#button-login").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Dimitri Yabkevich logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "dyabkevich", password: "elfdal12" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.contains("another note cypress").contains("make important").click();
        cy.contains("another note cypress").contains("make not important");
      });
    });
  });
});
