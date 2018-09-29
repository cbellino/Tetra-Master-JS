import { GameStatus } from "./game.reducers";
import { getGameStatus, isGameStatus } from "./game.selectors";

describe("getGameStatus", () => {
  it("should return the current game status ('IDLE')", () => {
    const rootState: any = {
      game: {
        status: GameStatus.IDLE,
      },
    };
    expect(getGameStatus(rootState)).toBe(GameStatus.IDLE);
  });
});

describe("isGameStatus", () => {
  describe("when the given status matches the current game status", () => {
    it("should return true", () => {
      const rootState: any = {
        game: {
          status: GameStatus.IN_PROGRESS,
        },
      };
      expect(isGameStatus(GameStatus.IN_PROGRESS)(rootState)).toBe(true);
    });
  });

  describe("when the given status doesn't match the current game status", () => {
    it("should return false", () => {
      const rootState: any = {
        game: {
          status: GameStatus.IN_PROGRESS,
        },
      };
      expect(isGameStatus(GameStatus.IDLE)(rootState)).toBe(false);
    });
  });
});
