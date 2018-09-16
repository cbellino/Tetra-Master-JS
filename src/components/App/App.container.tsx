import { connect } from "react-redux";

import { Vector2 } from "../../models";
import {
  addPlayer,
  addTilesToPlayerHand,
  getAllPlayerIds,
  initBoard,
} from "../../store";
import { startTurn } from "../../store/turn/turn.actions";
import { EnhancedApp } from "./App";

// TODO: Store a specific boolean in the store for this.
// TODO: Move to the store
const isInitialized = state => {
  return state.board.grid.length > 0;
};

const debugModeInitGame = () => (dispatch, getState) => {
  dispatch(initBoard(new Vector2(3, 3)));

  // Create player 1 and 2
  dispatch(addPlayer({ id: "1", name: "Player 1", selectedTileId: "1" }));
  dispatch(addPlayer({ id: "2", name: "Player 2", selectedTileId: "6" }));

  // Give random cards to player 1 and 2
  const allPlayerIds = getAllPlayerIds(getState());
  dispatch(addTilesToPlayerHand(allPlayerIds[0], ["1", "2", "3"]));
  dispatch(addTilesToPlayerHand(allPlayerIds[1], ["4", "5", "6"]));

  dispatch(startTurn("1"));
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { state } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    initialized: isInitialized(state),
    initGame: () => dispatch(debugModeInitGame()),
  };
}

const enhance = connect(
  state => ({ state }),
  dispatch => ({ dispatch }),
  mergeProps,
);

export default enhance(EnhancedApp);
