/// <reference types="Cypress" />

context("Game 1", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  describe("Turn 1 (start)", () => {
    it("select a tile for player 1", () => {
      cy.get(".player-hand.player-1 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 0,0", () => {
      cy.get(".board .board-cell.position-0-0")
        .click()
        .find(".tile-card")
        .should("exist");
    });

    it("select a tile for player 2", () => {
      cy.get(".player-hand.player-2 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 2,2", () => {
      cy.get(".board .board-cell.position-2-2")
        .click()
        .find(".tile-card")
        .should("exist");
    });
  });

  describe("Turn 2", () => {
    it("select a tile for player 1", () => {
      cy.get(".player-hand.player-1 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 1,0", () => {
      cy.get(".board .board-cell.position-1-0")
        .click()
        .find(".tile-card")
        .should("exist");
    });

    it("select a tile for player 2", () => {
      cy.get(".player-hand.player-2 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 1,2", () => {
      cy.get(".board .board-cell.position-1-2")
        .click()
        .find(".tile-card")
        .should("exist");
    });
  });

  describe("Turn 3", () => {
    it("select a tile for player 1", () => {
      cy.get(".player-hand.player-1 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 2,0", () => {
      cy.get(".board .board-cell.position-2-0")
        .click()
        .find(".tile-card")
        .should("exist");
    });

    it("select a tile for player 2", () => {
      cy.get(".player-hand.player-2 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 0,2", () => {
      cy.get(".board .board-cell.position-0-2")
        .click()
        .find(".tile-card")
        .should("exist");
    });
  });

  describe("Turn 4", () => {
    it("select a tile for player 1", () => {
      cy.get(".player-hand.player-1 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 0,1", () => {
      cy.get(".board .board-cell.position-0-1")
        .click()
        .find(".tile-card")
        .should("exist");
    });

    it("select a tile for player 2", () => {
      cy.get(".player-hand.player-2 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 2,1", () => {
      cy.get(".board .board-cell.position-2-1")
        .click()
        .find(".tile-card")
        .should("exist");
    });
  });

  describe("Turn 5 (end)", () => {
    it("select a tile for player 1", () => {
      cy.get(".player-hand.player-1 .tile-card:nth-of-type(1)")
        .click()
        .should("have.class", "selected");
    });

    it("place tile at 1,1", () => {
      cy.get(".board .board-cell.position-1-1")
        .click()
        .find(".tile-card")
        .should("exist");
    });

    it("finish the game", () => {
      cy.get(".overlay h1").should("contain", "Game over");
    });
  });

  describe("Restart game", () => {
    it("restart the game", () => {
      cy.get(".overlay h1").click();

      cy.get(".overlay").should("not.exist");
    });
  });
});
