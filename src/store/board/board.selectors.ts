import * as R from "ramda";

import { viewOr } from "../../lib";
import { Cell, Grid, Selector, Vector2 } from "../../models";
import { RootState } from "../root.reducer";
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
