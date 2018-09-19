import * as R from "ramda";

import { getNext } from "../../lib";
import { Id, Player } from "../../models";
import { RootState } from "../root.reducer";
import { getCurrentPlayerId } from "../turn";
import {
  allPlayerIdsLens,
  playerIdAtIndexLens,
  playerLens,
} from "./players.lenses";

export const getAllPlayerIds = (rootState: RootState) => {
  // @ts-ignore
  return R.view<RootState, Id[]>(allPlayerIdsLens, rootState) || [];
};

export const getPlayer = (playerId: Id) => (rootState: RootState) => {
  return (
    // @ts-ignore
    R.view<RootState, Player>(playerLens(playerId), rootState) || undefined
  );
};

export const getPlayerIdAtIndex = (index: number) => (rootState: RootState) => {
  return (
    // @ts-ignore
    R.view<RootState, Id>(playerIdAtIndexLens(index), rootState) || undefined
  );
};

// TODO: What if there is no currentPlayerId?
export const getNextPlayerId = (rootState: RootState): Id | undefined => {
  const currentPlayerId = getCurrentPlayerId(rootState);
  const allPlayersIds = getAllPlayerIds(rootState);

  return getNext(allPlayersIds)(currentPlayerId);
};

export const isCurrentPlayerId = (playerId: Id) => (rootState: RootState) => {
  return getCurrentPlayerId(rootState) === playerId;
};

export const currentPlayerHasTileSelected = (rootState: RootState) => {
  return R.pipe(
    R.compose(
      getPlayer,
      getCurrentPlayerId,
    )(rootState),
    R.prop("selectedTileId"),
    R.equals(undefined),
    R.not,
  )(rootState);
};
