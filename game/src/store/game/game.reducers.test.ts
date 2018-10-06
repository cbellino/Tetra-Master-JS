import { FINISH_GAME, START_GAME } from "./game.actions";
import { gameReducer, GameStatus } from "./game.reducers";

describe("gameReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      const rootState: any = {};

      expect(gameReducer(rootState)(undefined, { type: "" })).toEqual({
        status: GameStatus.IDLE,
      });
    });
  });

  describe("START_GAME action", () => {
    it("should set currentPlayerId to '1'", () => {
      const rootState: any = {};
      const action = { type: START_GAME };

      expect(gameReducer(rootState)(undefined, action)).toEqual({
        status: GameStatus.IN_PROGRESS,
      });
    });
  });

  describe("FINISH_GAME action", () => {
    it("should set currentPlayerId to '1'", () => {
      const rootState: any = {};
      const action = { type: FINISH_GAME };

      expect(gameReducer(rootState)(undefined, action)).toEqual({
        status: GameStatus.OVER,
      });
    });
  });
});
