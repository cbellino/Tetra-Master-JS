import { connect } from "react-redux";

import { getBoardGrid, placeCurrentPlayerTile } from "../../store";
import { finishTurn } from "../../store/turn/turn.actions";
import { Board } from "./Board";

const mapStateToProps = state => ({
  grid: getBoardGrid(state),
});

const handleCellClick = dispatch => position => {
  dispatch(placeCurrentPlayerTile(position));
  dispatch(finishTurn());
};

const mapDispatchToProps = dispatch => ({
  onCellClick: handleCellClick(dispatch),
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(Board);
