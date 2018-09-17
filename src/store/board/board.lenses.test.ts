import * as R from "ramda";

import { boardCellLens, boardGridLens } from "./board.lenses";

describe("boardGridLens", () => {
  it("should return the value of 'board.grid' (['1'])", () => {
    const state = { board: { grid: [] } };

    // @ts-ignore
    expect(R.view(boardGridLens)(state)).toEqual([]);
  });
});

describe("boardGridLens", () => {
  it("should return the value of 'board.grid.1.1' ('2')", () => {
    const state = { board: { grid: [["1", "1"], ["1", "2"]] } };

    const result = R.view(boardCellLens({ x: 1, y: 1 }))(state);

    expect(result).toEqual("2");
  });
});
