import * as R from "ramda";

import { getNext, viewOr } from "../../lib";
import { Id } from "../../models";
import { RootState } from "../root.reducer";
import { getCurrentPlayerId } from "../turn";
import {
  allPlayerIdsLens,
  playerIdAtIndexLens,
  playerLens,
} from "./players.lenses";

export const getAllPlayerIds = viewOr([], allPlayerIdsLens);

// TODO: Find a better way to type this function.
export const getPlayer: any = R.compose(
  R.view,
  playerLens,
);

// TODO: Find a better way to type this function.
export const getPlayerIdAtIndex: any = R.compose(
  R.view,
  playerIdAtIndexLens,
);

// TODO: What if there is no currentPlayerId?
// TODO: Ask rudy / wolfgang why the pointfree version crashes ?
export const getNextPlayerId = rootState => {
  return R.converge(getNext, [getAllPlayerIds, getCurrentPlayerId])(rootState);
};
// export const getNextPlayerId = R.converge(getNext, [
//   getAllPlayerIds,
//   getCurrentPlayerId,
// ]);

export const isCurrentPlayerId = (playerId: Id) => {
  return R.pipe(
    getCurrentPlayerId,
    R.equals(playerId),
  );
};

export const currentPlayerHasTileSelected = (rootState: RootState) => {
  const getCurrentPlayer = R.compose(
    getPlayer,
    getCurrentPlayerId,
  );

  return R.pipe(
    // @ts-ignore
    getCurrentPlayer(rootState),
    R.prop("selectedTileId"),
    R.equals(undefined),
    R.not,
  )(rootState);
};
