import { connect } from "react-redux";

import { debugModeInitGame, getGameInitialized } from "../../store";
import { EnhancedApp } from "./App";

const mapStateToProps = state => ({
  initialized: getGameInitialized(state),
});

const mapDispatchToProps = dispatch => ({
  initGame: () => dispatch(debugModeInitGame),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedApp);
