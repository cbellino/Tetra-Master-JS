import { Vector2 } from "../../models";
import {
  canPlaceTileAtPosition,
  getBoardCell,
  getBoardGrid,
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
