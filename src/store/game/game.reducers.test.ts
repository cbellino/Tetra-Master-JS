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
});
