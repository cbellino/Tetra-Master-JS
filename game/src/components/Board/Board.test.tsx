import { shallow } from "enzyme";
import * as React from "react";

import { EnhancedBoard as Board } from "./Board";
import { EnhancedBoardCell } from "./Board.Cell";

const mockGrid = [];
const mockGridWithCells = [
  [{ tileId: "1", playerId: "1" }, { tileId: "1", playerId: "1" }],
  [{ tileId: "1", playerId: "1" }, { tileId: "1", playerId: "1" }],
];

describe("Board", () => {
  describe("when the grid is empty", () => {
    it("should not display any cell", () => {
      const wrapper = shallow(<Board grid={mockGrid} />).dive();

      expect(wrapper.find(EnhancedBoardCell)).toHaveLength(0);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("should have a className containing the player id", () => {
    const wrapper = shallow(<Board grid={mockGridWithCells} />).dive();

    expect(wrapper.find(EnhancedBoardCell)).toHaveLength(4);
    expect(wrapper).toMatchSnapshot();
  });
});
