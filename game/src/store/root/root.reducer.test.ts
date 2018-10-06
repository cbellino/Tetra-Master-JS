import { rootReducer } from "./root.reducers";

describe("rootReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      const rootState: any = {};

      expect(rootReducer(rootState, { type: "" })).toEqual({
        board: expect.any(Object),
        players: expect.any(Object),
        turn: expect.any(Object),
        game: expect.any(Object),
      });
    });
  });
});
