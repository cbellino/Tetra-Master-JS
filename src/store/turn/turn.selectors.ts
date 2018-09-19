import * as R from "ramda";

import { getPlayer } from "../players";
import { RootState } from "../root.reducer";
import { turnCurrentPlayerIdLens } from "./turn.lenses";

export const getCurrentPlayerId = R.view(turnCurrentPlayerIdLens);

export const getCurrentPlayer = (rootState: RootState) => {
  // @ts-ignore
  return getPlayer(getCurrentPlayerId(rootState))(rootState);
};
