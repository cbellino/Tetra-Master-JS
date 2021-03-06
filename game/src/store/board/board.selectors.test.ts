import { Vector2 } from "../../models";
import {
  canPlaceTileAtPosition,
  checkGameOverConditions,
  getBoardCell,
  getBoardGrid,
  getGameInitialized,
  isBoardFull,
} from "./board.selectors";

describe("getBoardGrid", () => {
  it("should return the grid", () => {
    const rootState: any = {
      board: {
        grid: [[{}, {}], [{}, {}]],
      },
    };

    expect(getBoardGrid(rootState)).toEqual([[{}, {}], [{}, {}]]);
  });

  it("should return []", () => {
    const rootState: any = {
      board: {},
    };

    expect(getBoardGrid(rootState)).toEqual([]);
  });
});

describe("getBoardCell", () => {
  it("should return the cell", () => {
    const rootState: any = {
      board: {
        grid: [[{ tileId: "1", playerId: "1" }, {}], [{}, {}]],
      },
    };

    expect(getBoardCell(new Vector2(0, 0))(rootState)).toEqual({
      tileId: "1",
      playerId: "1",
    });
  });
});

describe("canPlaceTileAtPosition", () => {
  describe("when the cell is empty", () => {
    it("should return true", () => {
      const rootState: any = {
        board: {
          grid: [[{}, {}], [{}, {}]],
        },
      };

      expect(canPlaceTileAtPosition({ x: 0, y: 0 })(rootState)).toBe(true);
    });
  });

  describe("when the cell is occupied", () => {
    it("should return true", () => {
      const rootState: any = {
        board: {
          grid: [[{ tileId: "1", playerId: "1" }, {}], [{}, {}]],
        },
      };

      expect(canPlaceTileAtPosition({ x: 0, y: 0 })(rootState)).toBe(false);
    });
  });
});

describe("getGameInitialized", () => {
  describe("when board.grid contains at least one cell", () => {
    it("should return true", () => {
      const rootState: any = {
        board: {
          grid: [[{}, {}], [{}, {}]],
        },
      };

      expect(getGameInitialized(rootState)).toBe(true);
    });
  });

  describe("when board.grid contains no cell", () => {
    it("should return false", () => {
      const rootState: any = {
        board: {
          grid: [],
        },
      };

      expect(getGameInitialized(rootState)).toBe(false);
    });
  });
});

describe("isBoardFull", () => {
  describe("when all cells in the board are occupied", () => {
    it("should return true", () => {
      const rootState: any = {
        board: {
          grid: [
            [{ tileId: "1" }, { tileId: "1" }],
            [{ tileId: "1" }, { tileId: "1" }],
          ],
        },
      };

      expect(isBoardFull(rootState)).toBe(true);
    });
  });

  describe("when at least one cell in the board is empty", () => {
    it("should return false", () => {
      const rootState: any = {
        board: {
          grid: [[{ tileId: "1" }, {}], [{ tileId: "1" }, { tileId: "1" }]],
        },
      };

      expect(isBoardFull(rootState)).toBe(false);
    });
  });
});

describe("checkGameOverConditions", () => {
  describe("when no conditions are met", () => {
    it("should return false", () => {
      const rootState: any = {
        board: {
          grid: [[{}, {}], [{}, {}]],
        },
      };

      expect(checkGameOverConditions(rootState)).toBeFalsy();
    });
  });

  describe("when at least one condition is met", () => {
    it("should return true", () => {
      const rootState: any = {
        board: {
          grid: [
            [{ tileId: "1" }, { tileId: "1" }],
            [{ tileId: "1" }, { tileId: "1" }],
          ],
        },
      };

      expect(checkGameOverConditions(rootState)).toBeTruthy();
    });
  });
});
