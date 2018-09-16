import { shallow } from "enzyme";
import * as React from "react";

import TileCard from "../TileCard";
import { EnhancedPlayerHand as PlayerHand } from "./PlayerHand";

const mockPlayer = { id: "1", name: "Player 1", hand: [] };
const mockPlayerWithHand = { id: "1", name: "Player 1", hand: ["1", "2"] };

describe("PlayerHand", () => {
  it("should display the player name ('Player 1')", () => {
    const wrapper = shallow(<PlayerHand player={mockPlayer} />).dive();

    expect(wrapper.find(".player-name").contains("Player 1")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a className containing the player id", () => {
    const wrapper = shallow(<PlayerHand player={mockPlayer} />).dive();

    expect(wrapper.hasClass("player-1")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  describe("when the player is playing", () => {
    it("should have a className of 'is-playing'", () => {
      const wrapper = shallow(
        <PlayerHand player={mockPlayer} isPlaying />,
      ).dive();

      expect(wrapper.hasClass("is-playing")).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when the player has no tile in hand", () => {
    it("should display 0 tile", () => {
      const wrapper = shallow(<PlayerHand player={mockPlayer} />).dive();

      expect(wrapper.find(TileCard)).toHaveLength(0);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when the player has 2 tiles in hand", () => {
    it("should display 2 tiles", () => {
      const wrapper = shallow(
        <PlayerHand player={mockPlayerWithHand} />,
      ).dive();

      expect(wrapper.find(TileCard)).toHaveLength(2);
      expect(wrapper).toMatchSnapshot();
    });

    it("should react to mouse events", () => {
      const onTileMouseEnter = jest.fn();
      const onTileMouseLeave = jest.fn();
      const onTileClick = jest.fn();
      const wrapper = shallow(
        <PlayerHand
          player={mockPlayerWithHand}
          onTileMouseEnter={onTileMouseEnter}
          onTileMouseLeave={onTileMouseLeave}
          onTileClick={onTileClick}
        />,
      ).dive();

      const firstTileCard = wrapper.find(TileCard).first();
      firstTileCard.simulate("click");
      expect(onTileClick).toHaveBeenCalledTimes(1);
      expect(onTileClick).toHaveBeenCalledWith({ tileId: "1" });

      firstTileCard.simulate("mouseEnter");
      expect(onTileMouseEnter).toHaveBeenCalledTimes(1);
      expect(onTileMouseEnter).toHaveBeenCalledWith({ tileId: "1" });

      firstTileCard.simulate("mouseLeave");
      expect(onTileMouseLeave).toHaveBeenCalledTimes(1);
      expect(onTileMouseLeave).toHaveBeenCalledWith({ tileId: "1" });

      expect(wrapper).toMatchSnapshot();
    });
  });
});
