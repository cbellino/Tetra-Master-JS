import { createMockStore } from "../../lib";
import { Vector2 } from "../../models";
// import { finishGame } from "../root";
import { finishTurn } from "../turn/turn.actions";
import {
  INIT_BOARD,
  initBoard,
  PLACE_TILE,
  placeTile,
  tryToPlaceTile,
} from "./board.actions";

jest.mock("../root");

describe("initBoard", () => {
  it("should return a ADD_PLAYER action", () => {
    expect(initBoard(new Vector2(3, 3))).toEqual({
      type: INIT_BOARD,
      payload: { size: { x: 3, y: 3 } },
    });
  });
});

describe("placeTile", () => {
  it("should return a ADD_TILE_TO_HAND action", () => {
    expect(placeTile("1", "1", new Vector2(1, 1))).toEqual({
      type: PLACE_TILE,
      payload: { playerId: "1", tileId: "1", position: { x: 1, y: 1 } },
    });
  });
});

describe("tryToPlaceTile", () => {
  describe("when the tile can be placed at the position", () => {
    it("should place the tile and finish the turn", () => {
      const store = createMockStore({
        board: {
          grid: [[{}, {}], [{}, {}]],
        },
        players: {
          map: {
            "1": { id: "1", selectedTileId: "1" },
          },
        },
        turn: {
          currentPlayerId: "1",
        },
      });

      store.dispatch(tryToPlaceTile({ x: 0, y: 0 }));

      const actions = store.getActions();
      expect(actions[0]).toEqual(placeTile("1", "1", { x: 0, y: 0 }));
      expect(actions[1]).toEqual(finishTurn());
    });
  });

  describe("when the tile can't be placed at the position", () => {
    it("should do nothing", () => {
      const store = createMockStore({
        board: {
          grid: [[{ tileId: "1" }, {}], [{}, {}]],
        },
        players: {
          map: {
            "1": { id: "1", selectedTileId: "1" },
          },
        },
        turn: {
          currentPlayerId: "1",
        },
      });

      store.dispatch(tryToPlaceTile({ x: 0, y: 0 }));

      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });
  });

  describe("when player has not tile selected", () => {
    it("should do nothing", () => {
      const store = createMockStore({
        board: {
          grid: [[{}, {}], [{}, {}]],
        },
        players: {
          map: {
            "1": { id: "1", selectedTileId: undefined },
          },
        },
        turn: {
          currentPlayerId: "1",
        },
      });

      store.dispatch(tryToPlaceTile({ x: 0, y: 0 }));

      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });
  });

  describe("when the placed tile triggers the board full game over condition", () => {
    it("should place the tile and finish the game", () => {
      const initialState = {
        board: {
          grid: [[{}, { tileId: "1" }], [{ tileId: "1" }, { tileId: "1" }]],
        },
        players: {
          map: {
            "1": { id: "1", selectedTileId: "1" },
          },
        },
        turn: {
          currentPlayerId: "1",
        },
      };
      const store = createMockStore(initialState);

      store.dispatch(tryToPlaceTile({ x: 0, y: 0 }));

      const actions = store.getActions();
      expect(actions[0]).toEqual(placeTile("1", "1", { x: 0, y: 0 }));
      // TODO: Not sure how to test this.
      // expect(finishGame).toHaveBeenCalledWith();
    });
  });
});
