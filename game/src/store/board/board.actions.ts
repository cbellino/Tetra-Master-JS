import { Id, Vector2 } from "../../models";
import { finishGame } from "../game";
import { currentPlayerHasTileSelected } from "../players";
import { getCurrentPlayer } from "../turn";
import { finishTurn } from "../turn/turn.actions";
import {
  canPlaceTileAtPosition,
  checkGameOverConditions,
} from "./board.selectors";

export const INIT_BOARD = "INIT_BOARD";
export const PLACE_TILE = "PLACE_TILE";

export type InitBoardPayload = { size: Vector2 };
export type PlaceTilePayload = { playerId: Id; tileId: Id; position: Vector2 };

export const initBoard = (size: Vector2) => ({
  type: INIT_BOARD,
  payload: { size },
});

export const placeTile = (
  playerId: Id,
  tileId: Id | undefined,
  position: Vector2,
) => ({
  type: PLACE_TILE,
  payload: { playerId, tileId, position },
});

const finishTurnOrGame = (dispatch, state) => {
  const isGameFinished = checkGameOverConditions(state);

  if (isGameFinished) {
    dispatch(finishGame());
  } else {
    dispatch(finishTurn());
  }
};

const canPlaceTile = (position: Vector2, state) => {
  return (
    canPlaceTileAtPosition(position)(state) &&
    currentPlayerHasTileSelected(state)
  );
};

export const tryToPlaceTile = (position: Vector2) => (dispatch, getState) => {
  if (canPlaceTile(position, getState())) {
    const player = getCurrentPlayer(getState());
    dispatch(placeTile(player.id, player.selectedTileId, position));
  }

  finishTurnOrGame(dispatch, getState());
};
