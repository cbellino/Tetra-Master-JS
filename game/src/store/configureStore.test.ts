import { configureStore } from "./configureStore";
import { GameStatus } from "./game";

describe("configureStore", () => {
  describe("when a initial state is given", () => {
    it("should return a store with the given initial state", () => {
      const store = configureStore({ game: { status: GameStatus.OVER } });

      expect(store.getState().game.status).toEqual(GameStatus.OVER);
    });
  });

  describe("when no initial state is given", () => {
    it("should return a store with the default state", () => {
      const store = configureStore();

      expect(store.getState().game.status).not.toEqual(GameStatus.OVER);
    });
  });
});
