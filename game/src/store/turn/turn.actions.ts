import { Id } from "../../models";

export const START_TURN = "START_TURN";
export const FINISH_TURN = "FINISH_TURN";

export const startTurn = (playerId: Id) => ({
  type: START_TURN,
  payload: {
    playerId,
  },
});

export const finishTurn = () => ({
  type: FINISH_TURN,
});
