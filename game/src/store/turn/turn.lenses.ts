import * as R from "ramda";

const turnRootLens = R.lensProp("turn");

const currentPlayerIdLens = R.lensProp("currentPlayerId");

// @ts-ignore
export const turnCurrentPlayerIdLens: R.Lens = R.compose(
  turnRootLens,
  currentPlayerIdLens,
);
