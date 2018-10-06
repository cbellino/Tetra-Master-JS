import { FINISH_TURN, finishTurn, START_TURN, startTurn } from "./turn.actions";

describe("startTurn", () => {
  it("should return a START_TURN action", () => {
    expect(startTurn("1")).toEqual({
      type: START_TURN,
      payload: { playerId: "1" },
    });
  });
});

describe("finishTurn", () => {
  it("should return a FINISH_TURN action", () => {
    expect(finishTurn()).toEqual({
      type: FINISH_TURN,
    });
  });
});
