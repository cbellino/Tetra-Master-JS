import * as R from "ramda";
import { createSelector } from "reselect";

import { getNext } from "../../lib";
import { Id, Player } from "../../models";
import { RootState } from "../root.reducer";
import { getRootState } from "../root.selectors";
import { getCurrentPlayerId } from "../turn";

const playersLens = R.lensPath(["players"]);
const allLens = R.lensPath(["all"]);
const mapLens = R.lensPath(["map"]);

const allPlayerIdsLens = R.compose(
  playersLens,
  allLens,
);
const playerIdAtIndexLens = (index: number) =>
  R.compose(
    playersLens,
    allLens,
    R.lensIndex(index),
  );
const playerLens = (playerId: Id) =>
  R.compose(
    playersLens,
    mapLens,
    R.lensProp(playerId),
  );

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

export const getPlayerAtIndex = (index: number) =>
  createSelector(
    [getRootState, getPlayerIdAtIndex(index)],
    (rootState, playerId) => getPlayer(playerId)(rootState),
  );

export const getPlayerIdAtIndex = (index: number) => (rootState: RootState) => {
  return (
    // @ts-ignore
    R.view<RootState, Id>(playerIdAtIndexLens(index), rootState) || undefined
  );
};

// TODO: What if there is no currentPlayerId?
export const getNextPlayerId = (rootState: RootState) => {
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
