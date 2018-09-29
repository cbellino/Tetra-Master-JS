import { connect } from "react-redux";

import {
  GameStatus,
  getGameInitialized,
  isGameStatus,
  restartGame,
} from "../../store";
import { EnhancedApp } from "./App";

const mapStateToProps = state => ({
  initialized: getGameInitialized(state),
  gameIsOver: isGameStatus(GameStatus.OVER)(state),
});

const mapDispatchToProps = dispatch => ({
  initGame: () => dispatch(restartGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedApp);
