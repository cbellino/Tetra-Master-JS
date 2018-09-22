import * as R from "ramda";

import { viewOr } from "../../lib";
import { Cell, Grid, Selector, Vector2 } from "../../models";
import { RootState } from "../root";
import { boardCellLens, boardGridLens } from "./board.lenses";

export const getBoardGrid: Selector<Grid> = viewOr([], boardGridLens);

export const getBoardCell = (position: Vector2): Selector<Cell> => {
  return R.view(boardCellLens(position));
};

export const canPlaceTileAtPosition = (position: Vector2) => {
  return R.pipe(
    getBoardCell(position),
    R.isEmpty,
  );
};

export const getGameInitialized = (rootState: RootState) => {
  return rootState.board.grid.length > 0;
};

const isCellEmpty = cell => R.isEmpty(cell);
const hasEmptyCell = row => row.some(isCellEmpty);

export const isBoardFull = (rootState: RootState) => {
  return R.compose(
    R.equals(0),
    R.length,
    R.filter(hasEmptyCell),
    R.view(boardGridLens),
  )(rootState);
};

// TODO: Move this to store/game instead for global things like this?
export const checkGameOverConditions = (rootState: RootState): boolean => {
  const conditions = [isBoardFull];

  return conditions.some(condition => condition(rootState));
};
