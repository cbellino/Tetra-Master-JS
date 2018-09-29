import { combineReducers } from "redux";

import { boardReducer, BoardState } from "../board/board.reducers";
import { gameReducer, GameState } from "../game/game.reducers";
import { playersReducer, PlayersState } from "../players";
import { turnReducer, TurnState } from "../turn";

export type RootState = {
  board: BoardState;
  players: PlayersState;
  turn: TurnState;
  game: GameState;
};

export const rootReducer = (rootState, action) => {
  return combineReducers({
    board: boardReducer(rootState),
    players: playersReducer(rootState),
    turn: turnReducer(rootState),
    game: gameReducer(rootState),
  })(rootState, action);
};
