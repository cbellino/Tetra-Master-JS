import * as R from "ramda";

import { Id, Player } from "../../models";
import { PLACE_TILE } from "../board";
import { createReducer } from "../createReducer";
import { RootState } from "../root.reducer";
import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  FOCUS_HAND_TILE,
  SELECT_HAND_TILE,
} from "./players.actions";

export type PlayersState = {
  map: PlayerMap;
  all: Id[];
};

export type PlayerMap = { [key: string]: Player };

// TODO: Move to players.lenses
const playerHandLens = (id: Id) => R.lensPath(["players", "map", id, "hand"]);
const playerFocusedTileLens = (id: Id) =>
  R.lensPath(["players", "map", id, "focusedTileId"]);
const playerSelectedTileLens = (id: Id) =>
  R.lensPath(["players", "map", id, "selectedTileId"]);
const allPlayersLens = R.lensPath(["players", "all"]);
const playerMapLens = (playerId: Id) =>
  R.lensPath(["players", "map", playerId]);

//
// Helpers
//
const addItemsToList = (items: any[]) => (list: any[]) => [...list, ...items];
const addToList = (item: any) => addItemsToList([item]);
const createPlayer = (data: { id: Id; name: string }): Player => ({
  ...{ hand: [], focusedTileId: undefined, selectedTileId: undefined },
  ...data,
});

const addTilesToHand = (payload: { playerId: Id; tileIds: Id[] }) => {
  const { playerId, tileIds } = payload;
  return R.over(playerHandLens(playerId), addItemsToList(tileIds));
};

const addPlayer = ({ player }) => {
  // @ts-ignore
  return R.compose(
    R.over(allPlayersLens, addToList(player.id)),
    R.set(playerMapLens(player.id), createPlayer(player)),
  );
};

const setFocusesTile = ({ playerId, tileId }) => {
  return R.set(playerFocusedTileLens(playerId), tileId);
};

const setSelectedTile = ({ playerId, tileId }) => {
  return R.set(playerSelectedTileLens(playerId), tileId);
};

// FIXME: Replace this crappy code by something robust.
const TMP_removeTileFromHand = ({ playerId, tileId }) => (
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

const defaultState = {
  map: {},
  all: [],
};

export const playersReducer = (rootState: RootState) => (state, action) => {
  const actions = [
    [ADD_TILE_TO_HAND, addTilesToHand],
    [FOCUS_HAND_TILE, setFocusesTile],
    [SELECT_HAND_TILE, setSelectedTile],
    [ADD_PLAYER, addPlayer],
    [PLACE_TILE, TMP_removeTileFromHand],
  ];

  return createReducer("players", defaultState, action, actions, rootState);
};
