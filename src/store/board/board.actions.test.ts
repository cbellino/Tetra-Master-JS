import { Vector2 } from "../../models";
import {
  INIT_BOARD,
  initBoard,
  PLACE_TILE,
  placeCurrentPlayerTile,
  placeTile,
} from "./board.actions";

describe("initBoard", () => {
  it("should return a ADD_PLAYER action", () => {
    expect(initBoard(new Vector2(3, 3))).toEqual({
      type: INIT_BOARD,
      payload: { size: { x: 3, y: 3 } },
    });
  });
});

describe("placeTile", () => {
  it("should return a ADD_TILE_TO_HAND action", () => {
    expect(placeTile("1", "1", new Vector2(1, 1))).toEqual({
      type: PLACE_TILE,
      payload: { playerId: "1", tileId: "1", position: { x: 1, y: 1 } },
    });
  });
});

describe("placeCurrentPlayerTile", () => {
  it("should return a ADD_TILE_TO_HAND action", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
      players: {
        map: {
          "1": { id: "1", selectedTileId: "1" },
        },
      },
      turn: {
        currentPlayerId: "1",
      },
    });

    await placeCurrentPlayerTile(new Vector2(1, 1))(dispatch, getState);

    expect(dispatch).toBeCalledWith({
      type: PLACE_TILE,
      payload: { playerId: "1", tileId: "1", position: { x: 1, y: 1 } },
    });
    // expect(placeCurrentPlayerTile()).toEqual();
  });
});
