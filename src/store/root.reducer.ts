import { combineReducers } from "redux";

import { boardReducer, BoardState } from "./board/board.reducers";
import { playersReducer, PlayersState } from "./players";
import { turnReducer, TurnState } from "./turn";

const rootReducer = (rootState, action) =>
  combineReducers({
    board: boardReducer,
    players: playersReducer,
    turn: turnReducer(rootState),
  })(rootState, action);

export type RootState = {
  board: BoardState;
  players: PlayersState;
  turn: TurnState;
};

export default rootReducer;
