import * as R from "ramda";

const rootLens = R.lensProp("game");

const statusLens = R.lensProp("status");

// @ts-ignore
export const gameStatusLens: R.Lens = R.compose(
  rootLens,
  statusLens,
);
