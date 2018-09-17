import { INIT_BOARD, PLACE_TILE } from "./board.actions";
import { boardReducer } from "./board.reducers";

describe("boardReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      const rootState: any = {};

      expect(boardReducer(rootState)(undefined, { type: "" })).toEqual({
        grid: [],
      });
    });
  });

  describe("INIT_BOARD action", () => {
    it("should set the player's hand to ['1', '2', '3']", () => {
      const rootState: any = {};
      const action = {
        type: INIT_BOARD,
        payload: { size: { x: 2, y: 2 } },
      };

      expect(boardReducer(rootState)(undefined, action)).toEqual({
        grid: [[{}, {}], [{}, {}]],
      });
    });
  });

  describe("PLACE_TILE action", () => {
    it("should add the tile to the board's grid", () => {
      const rootState: any = {
        board: {
          grid: [[{}, {}], [{}, {}]],
        },
      };
      const action = {
        type: PLACE_TILE,
        payload: { playerId: "1", tileId: "1", position: { x: 0, y: 0 } },
      };

      expect(boardReducer(rootState)(undefined, action)).toEqual({
        grid: [[{ playerId: "1", tileId: "1" }, {}], [{}, {}]],
      });
    });
  });
});
