import * as R from "ramda";

import { Id } from "../../models";
import { getNextPlayerId } from "../players";
import { RootState } from "../root.reducer";
import { FINISH_TURN, START_TURN } from "./turn.actions";

export type TurnState = {
  currentPlayerId?: Id;
};

const currentPlayerIdLens = R.lensProp("currentPlayerId");

const setCurrentPlayerId = (
  turnState: TurnState,
  payload: { playerId: Id },
) => {
  const { playerId } = payload;
  return R.set(currentPlayerIdLens, playerId, turnState);
};

const setCurrentPlayerIdToNextPlayer = (
  turnState: TurnState,
  rootState: RootState,
) => {
  return R.set(currentPlayerIdLens, getNextPlayerId(rootState), turnState);
};

export const turnReducer = (rootState: RootState) => (
  turnState: TurnState = { currentPlayerId: undefined },
  action,
) => {
  switch (action.type) {
    case START_TURN:
      return setCurrentPlayerId(turnState, action.payload);
    case FINISH_TURN:
      return setCurrentPlayerIdToNextPlayer(turnState, rootState);
  }
  return turnState;
};
