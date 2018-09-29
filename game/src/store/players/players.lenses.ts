import * as R from "ramda";

import { Id } from "../../models";

export const playerLens = (id: Id) => R.lensPath(["players", "map", id]);

export const playerIdAtIndexLens = (index: number): R.Lens =>
  R.lensPath(["players", "all", index]);

export const playerHandLens = (id: Id): R.Lens =>
  R.lensPath(["players", "map", id, "hand"]);

export const playerFocusedTileLens = (id: Id): R.Lens =>
  R.lensPath(["players", "map", id, "focusedTileId"]);

export const playerSelectedTileLens = (id: Id): R.Lens =>
  R.lensPath(["players", "map", id, "selectedTileId"]);

export const allPlayerIdsLens = R.lensPath(["players", "all"]);
