import * as R from "ramda";

import { Grid, Vector2 } from "../../models";
import { createReducer } from "../createReducer";
import { RootState } from "../root";
import { INIT_BOARD, PLACE_TILE } from "./board.actions";
import { boardCellLens, boardGridLens } from "./board.lenses";

export type BoardState = { grid: Grid };

const defaultState: BoardState = {
  grid: [],
};

const createGrid = (size: Vector2) => {
  return Array(size.x)
    .fill({})
    .map(() => Array(size.y).fill({}));
};

const initBoard = ({ size }) => R.set(boardGridLens, createGrid(size));

const placeTile = ({ position, playerId, tileId }) => {
  return R.set(boardCellLens(position), { playerId, tileId });
};

export const boardReducer = (rootState: RootState) => (state, action) => {
  const actions = [
    [INIT_BOARD, initBoard],
    [PLACE_TILE, placeTile],
    // [PLACE_TILE, placeTile],
  ];

  return createReducer("board", defaultState, action, actions, rootState);
};
