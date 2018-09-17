import { connect } from "react-redux";

import {
  canPlaceTileAtPosition,
  currentPlayerHasTileSelected,
  getBoardGrid,
  placeCurrentPlayerTile,
} from "../../store";
import { finishTurn } from "../../store/turn/turn.actions";
import { EnhancedBoard } from "./Board";

const mapStateToProps = state => ({
  grid: getBoardGrid(state),
});

// TODO: Test me.
const tryToPlaceTile = (dispatch, getState) => position => {
  const canPlaceTile = canPlaceTileAtPosition(position)(getState());
  const hasTileSelected = currentPlayerHasTileSelected(getState());

  if (canPlaceTile && hasTileSelected) {
    dispatch(placeCurrentPlayerTile(position));
    dispatch(finishTurn());
  }
};

const mapDispatchToProps = dispatch => ({
  onCellClick: dispatch(tryToPlaceTile),
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(EnhancedBoard);
