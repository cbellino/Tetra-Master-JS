import { Id, Vector2 } from "../../models";
import { currentPlayerHasTileSelected } from "../players";
import { getCurrentPlayer } from "../turn";
import { finishTurn } from "../turn/turn.actions";
import { canPlaceTileAtPosition } from "./board.selectors";

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

export const tryToPlaceTile = (position: Vector2) => (dispatch, getState) => {
  const state = getState();

  const canPlaceTile = canPlaceTileAtPosition(position)(state);
  const hasTileSelected = currentPlayerHasTileSelected(state);

  if (canPlaceTile && hasTileSelected) {
    const player = getCurrentPlayer(state);

    dispatch(placeTile(player.id, player.selectedTileId, position));
    dispatch(finishTurn());
  }
};
