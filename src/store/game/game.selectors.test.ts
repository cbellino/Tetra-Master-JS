import { GameStatus } from "./game.reducers";
import { getGameStatus } from "./game.selectors";

describe("getGameStatus", () => {
  it("should return '1'", () => {
    const rootState: any = {
      game: {
        status: GameStatus.IDLE,
      },
    };
    expect(getGameStatus(rootState)).toBe(GameStatus.IDLE);
  });
});
