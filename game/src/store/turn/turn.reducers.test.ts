import { FINISH_TURN, START_TURN } from "./turn.actions";
import { turnReducer } from "./turn.reducers";

describe("turnReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      const rootState: any = {};
      const turnState: any = {};

      expect(turnReducer(rootState)(turnState, { type: "" })).toEqual({
        currentPlayerId: undefined,
      });
    });
  });

  describe("START_TURN action", () => {
    it("should set currentPlayerId to '1'", () => {
      const rootState: any = {};
      const turnState: any = {};
      const action = {
        type: START_TURN,
        payload: { playerId: "1" },
      };

      expect(turnReducer(rootState)(turnState, action)).toEqual({
        currentPlayerId: "1",
      });
    });
  });

  describe("FINISH_TURN action", () => {
    it("should set currentPlayerId to '2'", () => {
      const rootState: any = {
        players: {
          map: {
            "1": { id: "1", name: "Player 1" },
            "2": { id: "2", name: "Player 2" },
          },
          all: ["1", "2"],
        },
        turn: {
          currentPlayerId: "1",
        },
      };
      const action = { type: FINISH_TURN };

      expect(turnReducer(rootState)(undefined, action)).toEqual({
        currentPlayerId: "2",
      });
    });

    it("should set currentPlayerId to '1'", () => {
      const rootState: any = {
        players: {
          map: {
            "1": { id: "1", name: "Player 1" },
            "2": { id: "2", name: "Player 2" },
          },
          all: ["1", "2"],
        },
        turn: {
          currentPlayerId: "2",
        },
      };
      const turnState: any = {};
      const action = { type: FINISH_TURN };

      expect(turnReducer(rootState)(turnState, action)).toEqual({
        currentPlayerId: "1",
      });
    });
  });
});
