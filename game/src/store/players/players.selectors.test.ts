import {
  currentPlayerHasTileSelected,
  getAllPlayerIds,
  getNextPlayerId,
  getPlayer,
  getPlayerIdAtIndex,
  isCurrentPlayerId,
} from "./players.selectors";

describe("getAllPlayersIds", () => {
  it("should return ['1', '2']", () => {
    const rootState: any = {
      players: { all: ["1", "2"] },
    };

    expect(getAllPlayerIds(rootState)).toEqual(["1", "2"]);
  });

  it("should return []", () => {
    const rootState: any = {
      players: {},
    };

    expect(getAllPlayerIds(rootState)).toEqual([]);
  });
});

describe("getAllPlayerIds", () => {
  it("should return ['1', '2']", () => {
    const rootState: any = {
      players: {
        all: ["1", "2"],
      },
    };

    expect(getAllPlayerIds(rootState)).toEqual(["1", "2"]);
  });

  it("should return []", () => {
    const rootState: any = {
      players: {},
    };

    expect(getAllPlayerIds(rootState)).toEqual([]);
  });
});

describe("getPlayer", () => {
  it("should return { name: 'Player 1' }", () => {
    const rootState: any = {
      players: {
        map: { "1": { name: "Player 1" } },
        all: ["1", "2"],
      },
    };

    expect(getPlayer("1")(rootState)).toEqual({ name: "Player 1" });
  });

  it("should return undefined", () => {
    const rootState: any = {
      players: {
        map: {},
        all: ["1", "2"],
      },
    };

    expect(getPlayer("1")(rootState)).toBeUndefined();
  });
});

describe("getPlayerIdAtIndex", () => {
  it("should return '1'", () => {
    const rootState: any = {
      players: {
        map: { "1": { hand: ["1", "2"] } },
        all: ["1", "2"],
      },
    };

    expect(getPlayerIdAtIndex(0)(rootState)).toEqual("1");
  });

  it("should return undefined", () => {
    const rootState: any = {
      players: {
        map: { "1": {} },
        all: ["1", "2"],
      },
    };

    expect(getPlayerIdAtIndex(2)(rootState)).toBeUndefined();
  });
});

describe("isCurrentPlayerId", () => {
  describe("when the id matches the current player", () => {
    it("should return true", () => {
      const rootState: any = {
        turn: {
          currentPlayerId: "1",
        },
      };

      expect(isCurrentPlayerId("1")(rootState)).toBeTruthy();
    });
  });

  describe("when the id matches current player", () => {
    it("should return false", () => {
      const rootState: any = {
        turn: {
          currentPlayerId: undefined,
        },
      };

      expect(isCurrentPlayerId("1")(rootState)).toBeFalsy();
    });
  });
});

describe("currentPlayerHasTileSelected", () => {
  describe("when the player has no selectedTileId", () => {
    it("should return false", () => {
      const rootState: any = {
        players: {
          map: {
            "1": { selectedTileId: undefined },
          },
        },
        turn: {
          currentPlayerId: "1",
        },
      };

      expect(currentPlayerHasTileSelected(rootState)).toBeFalsy();
    });
  });

  describe("when the player has a selectedTileId", () => {
    it("should return true", () => {
      const rootState: any = {
        players: {
          map: {
            "1": { selectedTileId: "1" },
          },
        },
        turn: {
          currentPlayerId: "1",
        },
      };

      expect(currentPlayerHasTileSelected(rootState)).toBeTruthy();
    });
  });
});

describe("getNextPlayerId", () => {
  describe("when the player isn't the last one", () => {
    it("should return the next one ('2')", () => {
      const rootState: any = {
        players: {
          all: ["1", "2"],
        },
        turn: {
          currentPlayerId: "1",
        },
      };

      expect(getNextPlayerId(rootState)).toBe("2");
    });
  });

  describe("when the player is the last one", () => {
    it("should return the first one ('1')", () => {
      const rootState: any = {
        players: {
          all: ["1", "2"],
        },
        turn: {
          currentPlayerId: "2",
        },
      };

      expect(getNextPlayerId(rootState)).toBe("1");
    });
  });
});
