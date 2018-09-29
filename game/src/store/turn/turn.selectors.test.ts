import { getCurrentPlayer, getCurrentPlayerId } from "./turn.selectors";

describe("getCurrentPlayer", () => {
  describe("when there is a current player ('1')", () => {
    it("should return { id: '1', typeId: '1' }", () => {
      const rootState: any = {
        turn: {
          currentPlayerId: "1",
        },
        players: {
          map: {
            "1": { id: "1", name: "Player 1" },
          },
        },
      };
      expect(getCurrentPlayer(rootState)).toEqual({
        id: "1",
        name: "Player 1",
      });
    });
  });

  describe("when there is no current player", () => {
    it("should return undefined", () => {
      const rootState: any = {
        turn: {
          currentPlayerId: undefined,
        },
      };
      expect(getCurrentPlayer(rootState)).toBeUndefined();
    });
  });

  describe("when the player doesn't exist", () => {
    it("should return undefined", () => {
      const rootState: any = {
        turn: {
          currentPlayerId: "2",
        },
        players: {
          map: {
            "1": { id: "1", name: "Player 1" },
          },
        },
      };
      expect(getCurrentPlayer(rootState)).toBeUndefined();
    });
  });
});

describe("getCurrentPlayerId", () => {
  it("should return '1'", () => {
    const rootState: any = {
      turn: {
        currentPlayerId: "1",
      },
    };
    expect(getCurrentPlayerId(rootState)).toBe("1");
  });
});
