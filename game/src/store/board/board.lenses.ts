import * as R from "ramda";
import { Vector2 } from "../../models";

const boardLens = R.lensProp("board");

const gridLens = R.lensProp("grid");

const cellLens = (position: Vector2) => R.lensPath([position.x, position.y]);

// @ts-ignore
export const boardGridLens: R.Lens = R.compose(
  boardLens,
  gridLens,
);

export const boardCellLens = (position: Vector2): R.Lens => {
  // @ts-ignore
  return R.compose(
    boardLens,
    gridLens,
    cellLens(position),
  );
};
