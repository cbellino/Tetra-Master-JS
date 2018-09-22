import { connect } from "react-redux";

import { getCurrentPlayer, startGame } from "../../store";
import { EnhancedDebugBar } from "./DebugBar";

const mapStateToProps = state => ({
  currentPlayer: getCurrentPlayer(state),
});

const mapDispatchToProps = dispatch => ({
  onResetGameClick: () => dispatch(startGame),
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(EnhancedDebugBar);
