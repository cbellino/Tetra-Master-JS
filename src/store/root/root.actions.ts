import { Vector2 } from "../../models";
import { initBoard } from "../board";
import { addPlayer, addTilesToPlayerHand, getAllPlayerIds } from "../players";
import { startTurn } from "../turn/turn.actions";

// TODO: Add unit tests
export const startGame = (dispatch, getState) => {
  dispatch(initBoard(new Vector2(3, 3)));

  // Create player 1 and 2
  dispatch(addPlayer({ id: "1", name: "Player 1", selectedTileId: "1" }));
  dispatch(addPlayer({ id: "2", name: "Player 2", selectedTileId: "12" }));

  // Give random cards to player 1 and 2
  const allPlayerIds = getAllPlayerIds(getState());
  dispatch(addTilesToPlayerHand(allPlayerIds[0], ["1", "2", "3", "4", "5"]));
  dispatch(
    addTilesToPlayerHand(allPlayerIds[1], ["11", "12", "13", "14", "15"]),
  );

  dispatch(startTurn("1"));
};
