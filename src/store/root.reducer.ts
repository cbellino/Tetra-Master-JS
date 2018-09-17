import { combineReducers } from "redux";

import { boardReducer, BoardState } from "./board/board.reducers";
import { playersReducer, PlayersState } from "./players";
import { turnReducer, TurnState } from "./turn";

export type RootState = {
  board: BoardState;
  players: PlayersState;
  turn: TurnState;
};

const rootReducer = (rootState, action) =>
  combineReducers({
    board: boardReducer(rootState),
    players: playersReducer(rootState),
    turn: turnReducer(rootState),
  })(rootState, action);

export default rootReducer;
