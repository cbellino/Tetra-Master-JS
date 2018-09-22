import { Vector2 } from "../../models";
import { initBoard } from "../board";
import { addPlayer, addTilesToPlayerHand } from "../players";
import { startTurn } from "../turn/turn.actions";

// TODO: Maybe we should move this to store/game ?
export const startGame = () => (dispatch, getState) => {
  dispatch(initBoard(new Vector2(3, 3)));

  // Create player 1 and 2
  dispatch(addPlayer({ id: "1", name: "Player 1", selectedTileId: "1" }));
  dispatch(addPlayer({ id: "2", name: "Player 2", selectedTileId: "12" }));

  // Give random cards to player 1 and 2
  dispatch(addTilesToPlayerHand("1", ["1", "2", "3", "4", "5"]));
  dispatch(addTilesToPlayerHand("2", ["11", "12", "13", "14", "15"]));

  dispatch(startTurn("1"));
};

// TODO: Set game.isOver = true
// TODO: Display the reset button in an overlay
export const finishGame = () => dispatch => {
  // tslint:disable-next-line no-console
  console.log("Game finished, restarting in 2s.");

  setTimeout(() => {
    dispatch(startGame());
  }, 2000);
};
