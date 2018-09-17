import * as R from "ramda";

import { Grid, Vector2 } from "../../models";
import { createReducer } from "../createReducer";
import { INIT_BOARD, PLACE_TILE } from "./board.actions";
import { boardCellLens, boardGridLens } from "./board.lenses";

export type BoardState = { grid: Grid };

const createGrid = (size: Vector2) => {
  return Array(size.x)
    .fill({})
    .map(() => Array(size.y).fill({}));
};

const initBoard = ({ size }) => R.set(boardGridLens, createGrid(size));

const placeTile = ({ position, playerId, tileId }) => {
  return R.set(boardCellLens(position), { playerId, tileId });
};

const defaultState: BoardState = {
  grid: [],
};
// TODO: This is really concise but i'm not 100% sure this is a good thing.
export const boardReducer = rootState => (state = defaultState, action) => {
  const actions = [
    [INIT_BOARD, initBoard],
    [PLACE_TILE, placeTile],
    // [PLACE_TILE, placeTile],
  ];

  return createReducer("board", state, action, actions, rootState);
};
