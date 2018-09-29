import { shallow } from "enzyme";
import * as React from "react";

import TileCard from "../TileCard";
import { EnhancedBoardCell as Cell } from "./Board.Cell";

const mockCell = { playerId: "1", tileId: "1" };

describe("Board.Cell", () => {
  it("should display a tile with the correct tileId", () => {
    const wrapper = shallow(
      <Cell cell={mockCell} position={{ x: 1, y: 1 }} />,
    ).dive();

    expect(wrapper.find(TileCard)).toHaveLength(1);
    expect(wrapper.find(TileCard).get(0).props.tileId).toBe("1");
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a className of 'board-cell'", () => {
    const wrapper = shallow(
      <Cell cell={mockCell} position={{ x: 1, y: 1 }} />,
    ).dive();

    expect(wrapper.hasClass("board-cell")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a className containing the position", () => {
    const wrapper = shallow(
      <Cell cell={mockCell} position={{ x: 1, y: 1 }} />,
    ).dive();

    expect(wrapper.hasClass("position-1-1")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should react to clicks", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Cell cell={mockCell} position={{ x: 1, y: 1 }} onClick={onClick} />,
    ).dive();

    wrapper.find("div").simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith({ x: 1, y: 1 });
    expect(wrapper).toMatchSnapshot();
  });
});
