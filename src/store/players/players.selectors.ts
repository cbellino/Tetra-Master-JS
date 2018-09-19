import * as R from "ramda";

import { getNext, viewOr } from "../../lib";
import { Id, Player } from "../../models";
import { RootState } from "../root.reducer";
import { getCurrentPlayerId } from "../turn";
import {
  allPlayerIdsLens,
  playerIdAtIndexLens,
  playerLens,
} from "./players.lenses";

export const getAllPlayerIds = viewOr<Id[]>([], allPlayerIdsLens);

export const getPlayer = (playerId: Id) => {
  return viewOr<Player>(undefined, playerLens(playerId));
};

export const getPlayerIdAtIndex = (index: number) => {
  return viewOr<Id>(undefined, playerIdAtIndexLens(index));
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
    // @ts-ignore
    R.prop("selectedTileId"),
    R.equals(undefined),
    R.not,
  )(rootState);
};
