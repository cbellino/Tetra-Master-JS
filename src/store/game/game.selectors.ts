import * as R from "ramda";

import { gameStatusLens } from "./game.lenses";

export const getGameStatus = R.view(gameStatusLens);
