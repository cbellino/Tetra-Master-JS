import * as R from "ramda";

import { addItemsToList, addItemToList, createPlayer } from "../../lib";
import { Id, Player } from "../../models";
import { PLACE_TILE } from "../board";
import { createReducer } from "../createReducer";
import { RootState } from "../root";
import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  FOCUS_HAND_TILE,
  SELECT_HAND_TILE,
} from "./players.actions";
import {
  allPlayerIdsLens,
  playerFocusedTileLens,
  playerHandLens,
  playerLens,
  playerSelectedTileLens,
} from "./players.lenses";

export type PlayersState = {
  map: PlayerMap;
  all: Id[];
};
export type PlayerMap = { [key: string]: Player };

const defaultState: PlayersState = {
  map: {},
  all: [],
};

const addTilesToHand = ({ playerId, tileIds }) => {
  return R.over(playerHandLens(playerId), addItemsToList(tileIds));
};

const addPlayer = ({ player }) => {
  // @ts-ignore
  return R.compose(
    R.over(allPlayerIdsLens, addItemToList(player.id)),
    R.set(playerLens(player.id), createPlayer(player)),
  );
};

const setFocusesTile = ({ playerId, tileId }) => {
  return R.set(playerFocusedTileLens(playerId), tileId);
};

const setSelectedTile = ({ playerId, tileId }) => {
  return R.set(playerSelectedTileLens(playerId), tileId);
};

// FIXME: Clean this up @cbellino :(
const SHAME_removeTileFromHand = ({ playerId, tileId }) => (
  rootState: RootState,
) => {
  const player = rootState.players.map[playerId];
  const hand = player.hand.filter(t => t !== tileId);
  return R.compose(
    R.assocPath(["players", "map", playerId, "hand"], hand),
    R.assocPath(["players", "map", playerId, "selectedTileId"], undefined),
    R.assocPath(["players", "map", playerId, "focusedTileId"], undefined),
  )(rootState);
};

export const playersReducer = (rootState: RootState) => (state, action) => {
  const actions = [
    [ADD_TILE_TO_HAND, addTilesToHand],
    [FOCUS_HAND_TILE, setFocusesTile],
    [SELECT_HAND_TILE, setSelectedTile],
    [ADD_PLAYER, addPlayer],
    [PLACE_TILE, SHAME_removeTileFromHand],
  ];

  return createReducer("players", defaultState, action, actions, rootState);
};
