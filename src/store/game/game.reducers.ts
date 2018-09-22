import * as R from "ramda";

import { createReducer } from "../createReducer";
import { RootState } from "../root";
import { FINISH_GAME, START_GAME } from "./game.actions";
import { gameStatusLens } from "./game.lenses";

export enum GameStatus {
  IDLE,
  IN_PROGRESS,
  PAUSED,
  OVER,
}

export type GameState = {
  status: GameStatus;
};

const defaultState: GameState = {
  status: GameStatus.IDLE,
};

const setStatus = ({ status }) => () => {
  return R.set(gameStatusLens, status);
};

export const gameReducer = (rootState: RootState) => (state, action) => {
  const actions = [
    [FINISH_GAME, setStatus({ status: GameStatus.OVER })],
    [START_GAME, setStatus({ status: GameStatus.IN_PROGRESS })],
  ];

  return createReducer("game", defaultState, action, actions, rootState);
};
