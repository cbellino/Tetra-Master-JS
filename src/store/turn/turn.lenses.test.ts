import * as R from "ramda";

import { turnCurrentPlayerIdLens } from "./turn.lenses";

describe("boardGridLens", () => {
  it("should return the value of 'turn.currentPlayerId' ('1')", () => {
    const rootState = {
      turn: {
        currentPlayerId: "1",
      },
    };

    expect(R.view(turnCurrentPlayerIdLens)(rootState)).toEqual("1");
  });
});
