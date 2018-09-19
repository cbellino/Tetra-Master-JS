import * as R from "ramda";

import { Id } from "../../models";
import { createReducer } from "../createReducer";
import { getNextPlayerId } from "../players";
import { RootState } from "../root.reducer";
import { FINISH_TURN, START_TURN } from "./turn.actions";
import { turnCurrentPlayerIdLens } from "./turn.lenses";

export type TurnState = {
  currentPlayerId?: Id;
};

const defaultState: TurnState = {
  currentPlayerId: undefined,
};

const setCurrentPlayerId = (payload: { playerId: Id }) => {
  const { playerId } = payload;
  return R.set(turnCurrentPlayerIdLens, playerId);
};

const setCurrentPlayerIdToNextPlayer = () => (rootState: RootState) => {
  return R.set(
    turnCurrentPlayerIdLens,
    getNextPlayerId(rootState),
    rootState.turn,
  );
};

export const turnReducer = (rootState: RootState) => (state, action) => {
  const actions = [
    [START_TURN, setCurrentPlayerId],
    [FINISH_TURN, setCurrentPlayerIdToNextPlayer],
  ];

  return createReducer("turn", defaultState, action, actions, rootState);
};
