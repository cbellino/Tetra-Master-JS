import { PLACE_TILE } from "../board";
import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  FOCUS_HAND_TILE,
  SELECT_HAND_TILE,
} from "./players.actions";
import { playersReducer } from "./players.reducers";

jest.mock("uuid", () => ({ v1: jest.fn().mockReturnValue("1") }));

describe("playersReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      const rootState: any = {};

      expect(playersReducer(rootState)(undefined, { type: "" })).toEqual({
        map: {},
        all: [],
      });
    });
  });

  describe("ADD_TILE_TO_HAND action", () => {
    it("should set the player's hand to ['1', '2', '3']", () => {
      const rootState: any = {
        players: {
          map: { "1": { hand: ["1", "2"] } },
          all: [],
        },
      };
      const action = {
        type: ADD_TILE_TO_HAND,
        payload: { playerId: "1", tileIds: ["3"] },
      };

      expect(playersReducer(rootState)(undefined, action)).toEqual({
        map: { "1": { hand: ["1", "2", "3"] } },
        all: [],
      });
    });
  });

  describe("ADD_PLAYER action", () => {
    it("should add 'Player 1'", () => {
      const rootState: any = {
        players: {
          map: {},
          all: [],
        },
      };
      const action = {
        type: ADD_PLAYER,
        payload: {
          player: {
            id: "1",
            name: "Player 1",
            focusedTileId: "1",
            selectedTileId: "1",
          },
        },
      };

      expect(playersReducer(rootState)(undefined, action)).toEqual({
        map: {
          "1": {
            id: "1",
            name: "Player 1",
            hand: [],
            focusedTileId: "1",
            selectedTileId: "1",
          },
        },
        all: ["1"],
      });
    });
  });

  describe("FOCUS_HAND_TILE action", () => {
    it("should set '1' in focusedTileId", () => {
      const rootState: any = {
        players: {
          map: { "1": {} },
        },
      };
      const action = {
        type: FOCUS_HAND_TILE,
        payload: { playerId: "1", tileId: "1" },
      };

      expect(playersReducer(rootState)(undefined, action)).toEqual({
        map: { "1": { focusedTileId: "1" } },
      });
    });

    it("should set null in focusedTileId", () => {
      const rootState: any = {};
      const state: any = {
        map: { "1": {} },
      };
      const action = {
        type: FOCUS_HAND_TILE,
        payload: { playerId: "1", tileId: null },
      };

      expect(playersReducer(rootState)(state, action)).toEqual({
        map: { "1": { focusedTileId: null } },
      });
    });
  });

  describe("SELECT_HAND_TILE action", () => {
    it("should set '1' in selectedTileId", () => {
      const rootState: any = {
        players: {
          map: { "1": {} },
        },
      };
      const action = {
        type: SELECT_HAND_TILE,
        payload: { playerId: "1", tileId: "1" },
      };

      expect(playersReducer(rootState)(undefined, action)).toEqual({
        map: { "1": { selectedTileId: "1" } },
      });
    });
  });

  it("should set null in selectedTileId", () => {
    const rootState: any = {
      players: {
        map: { "1": {} },
      },
    };
    const action = {
      type: SELECT_HAND_TILE,
      payload: { playerId: "1", tileId: null },
    };

    expect(playersReducer(rootState)(undefined, action)).toEqual({
      map: { "1": { selectedTileId: null } },
    });
  });

  describe("PLACE_TILE action", () => {
    it("should remove the tile from the players's hand", () => {
      const rootState: any = {
        players: {
          map: {
            "1": { hand: ["1"], selectedTileId: "1", focusedTileId: "1" },
          },
        },
      };
      const action = {
        type: PLACE_TILE,
        payload: { playerId: "1", tileId: "1", position: { x: 0, y: 0 } },
      };

      const result = playersReducer(rootState)(undefined, action);

      expect(result).toEqual({
        map: {
          "1": {
            hand: [],
            selectedTileId: undefined,
            focusedTileId: undefined,
          },
        },
      });
    });
  });
});
