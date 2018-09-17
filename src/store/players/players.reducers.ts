import * as R from "ramda";
import { combineReducers } from "redux";

import { Id, Player } from "../../models";
import { PLACE_TILE } from "../board";
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

//
// Lens
//

// entities
const mapItemLens = (id: Id) => R.lensPath(["map", id]);
const allLens = R.lensProp("all");

// player
export const playerHandLens = (id: Id) => R.lensPath([id, "hand"]);
export const playerFocusedTileLens = (id: Id) =>
  R.lensPath([id, "focusedTileId"]);
export const playerSelectedTileLens = (id: Id) =>
  R.lensPath([id, "selectedTileId"]);

//
// Helpers
//
const addItemsToList = (items: any[]) => (list: any[]) => [...list, ...items];
const addToList = (item: any) => addItemsToList([item]);
type PartialPlayer = { id: Id; name: string };
const createPlayer = (data: PartialPlayer): Player => ({
  ...{ hand: [], focusedTileId: undefined, selectedTileId: undefined },
  ...data,
});

const addTilesToHand = (payload: { playerId: Id; tileIds: Id[] }) => {
  const { playerId, tileIds } = payload;
  return R.over(playerHandLens(playerId), addItemsToList(tileIds));
};

const addPlayerReducer = (payload: {
  player: Player;
}): ((players: PlayersState) => PlayersState) => {
  const { player } = payload;
  // @ts-ignore
  return R.compose(
    R.over(allLens, addToList(player.id)),
    R.set(mapItemLens(player.id), createPlayer(player)),
  );
};

const setFocusedTileReducer = (payload: { playerId: Id; tileId: Id }) => {
  const { playerId, tileId } = payload;
  return R.set(playerFocusedTileLens(playerId), tileId);
};

const setSelectedTileReducer = (payload: { playerId: Id; tileId: Id }) => {
  const { playerId, tileId } = payload;
  return R.set(playerSelectedTileLens(playerId), tileId);
};

const mapReducer = (playerMap: PlayerMap = {}, { type, payload }) => {
  switch (type) {
    case ADD_TILE_TO_HAND:
      return addTilesToHand(payload)(playerMap);
    case FOCUS_HAND_TILE:
      return setFocusedTileReducer(payload)(playerMap);
    case SELECT_HAND_TILE:
      return setSelectedTileReducer(payload)(playerMap);
  }
  return playerMap;
};

const allReducer = (playerAll: Id[] = [], action) => {
  return playerAll;
};

// FIXME: Replace this crappy code by something robust.
const tempRemoveTileFromHand = payload => players => {
  const player = players.map[payload.playerId];
  const hand = player.hand.filter(tileId => tileId !== payload.tileId);
  return R.compose(
    R.assocPath(["map", payload.playerId, "hand"], hand),
    R.assocPath(["map", payload.playerId, "selectedTileId"], undefined),
    R.assocPath(["map", payload.playerId, "focusedTileId"], undefined),
  )(players);
};

const crossSliceReducer = (players: PlayersState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return addPlayerReducer(action.payload)(players);
    case PLACE_TILE:
      return tempRemoveTileFromHand(action.payload)(players);
  }
  return players;
};

const combinedReducer = combineReducers({
  map: mapReducer,
  all: allReducer,
});

export const playersReducer = rootState => (state, action) => {
  const intermediateState = combinedReducer(state, action);
  // @ts-ignore: Not sure what is going on here...
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};
