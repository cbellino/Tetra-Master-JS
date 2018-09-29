import { connect } from "react-redux";

import { getBoardGrid, tryToPlaceTile } from "../../store";
import { EnhancedBoard } from "./Board";

const mapStateToProps = state => ({
  grid: getBoardGrid(state),
});

const mapDispatchToProps = dispatch => ({
  onCellClick: position => dispatch(tryToPlaceTile(position)),
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(EnhancedBoard);
