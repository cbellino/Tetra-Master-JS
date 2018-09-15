import * as R from "ramda";
import { combineReducers } from "redux";
import { v1 as uuidv1 } from "uuid";

import { Id, Player } from "../../models";
import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  FOCUS_HAND_TILE,
} from "./players.actions";

export type Players = {
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
const playerLens = (id: Id) => R.lensProp(id);
const playerHandLens = (id: Id) => R.lensPath([id, "hand"]);
const playerFocusedTileLens = (id: Id) => R.lensPath([id, "focusedTile"]);

//
// Helpers
//
const addItemsToList = (items: any[]) => (list: any[]) => [...list, ...items];
const addToList = (item: any) => addItemsToList([item]);
const createPlayer = (data: Partial<Player>) => ({
  ...data,
  ...{ hand: [], focusedTile: null },
});

const addTilesToHand = (payload: { playerId: Id; tileIds: Id[] }) => {
  const { playerId, tileIds } = payload;
  return R.over(playerHandLens(playerId), addItemsToList(tileIds));
};

const addPlayerReducer = (payload: {
  player: Player;
}): ((players: Players) => Players) => {
  const { player } = payload;
  return R.compose(
    R.over(allLens, addToList(player.id)),
    R.set(mapItemLens(player.id), createPlayer(player)),
  );
};

const setFocusedTileReducer = (payload: { playerId: Id; tileId: Id }) => {
  const { playerId, tileId } = payload;

  return R.set(playerFocusedTileLens(playerId), tileId);
};

const mapReducer = (playerMap: PlayerMap = {}, { type, payload }) => {
  switch (type) {
    case ADD_TILE_TO_HAND:
      return addTilesToHand(payload)(playerMap);
    case FOCUS_HAND_TILE:
      return setFocusedTileReducer(payload)(playerMap);
  }
  return playerMap;
};

const allReducer = (playerAll: Id[] = [], action) => {
  return playerAll;
};

const crossSliceReducer = (players: Players, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return addPlayerReducer(action.payload)(players);
  }
  return players;
};

const combinedReducer = combineReducers({
  map: mapReducer,
  all: allReducer,
});

export function playersReducer(state, action) {
  const intermediateState = combinedReducer(state, action);
  // @ts-ignore: Not sure what is going on here...
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
}
