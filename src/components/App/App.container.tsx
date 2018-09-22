import { connect } from "react-redux";

import { getGameInitialized, startGame } from "../../store";
import { EnhancedApp } from "./App";

const mapStateToProps = state => ({
  initialized: getGameInitialized(state),
});

const mapDispatchToProps = dispatch => ({
  initGame: () => dispatch(startGame),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedApp);
