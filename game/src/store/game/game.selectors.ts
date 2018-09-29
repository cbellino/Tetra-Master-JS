import * as R from "ramda";

import { gameStatusLens } from "./game.lenses";
import { GameStatus } from "./game.reducers";

export const getGameStatus = R.view(gameStatusLens);

export const isGameStatus = (status: GameStatus) => {
  return R.compose(
    R.equals(status),
    R.view(gameStatusLens),
  );
};
