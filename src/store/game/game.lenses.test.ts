import * as R from "ramda";

import { gameStatusLens } from "./game.lenses";

describe("gameStatusLens", () => {
  it("should return the value of 'game.status' (false)", () => {
    const rootState = {
      game: {
        status: "IN PROGRESS",
      },
    };

    expect(R.view(gameStatusLens)(rootState)).toBe("IN PROGRESS");
  });
});
