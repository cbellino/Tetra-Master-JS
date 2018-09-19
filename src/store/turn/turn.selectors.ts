import * as R from "ramda";

import { Id } from "../../models";
import { getPlayer } from "../players";
import { RootState } from "../root.reducer";
import { turnCurrentPlayerIdLens } from "./turn.lenses";

export const getCurrentPlayerId = R.view<RootState, Id>(
  turnCurrentPlayerIdLens,
);

export const getCurrentPlayer = (rootState: RootState) => {
  return getPlayer(getCurrentPlayerId(rootState))(rootState);
};
