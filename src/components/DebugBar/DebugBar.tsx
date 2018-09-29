import * as React from "react";

import { compose, defaultProps } from "recompose";
import { Dispatch } from "redux";
import { Player } from "../../models";
import "./DebugBar.css";

type DebugBarProps = {
  initialized: boolean;
  currentPlayer?: Player;
  onResetGameClick?: () => void;
  dispatch: Dispatch;
};

type EnhancedDebugBarProps = {
  initialized: boolean;
  currentPlayer: Player;
  onResetGameClick: () => void;
};

const DebugBar: React.SFC<DebugBarProps> = ({
  initialized,
  currentPlayer,
  onResetGameClick,
  dispatch,
}) => (
  <div className="debug-bar">
    <div>
      Game initialized: <b>{initialized.toString()}</b>
    </div>
    <div />
    <button onClick={onResetGameClick}>Reset game</button>
    <button onClick={() => dispatch({ type: "FINISH_GAME" })}>
      Finish game
    </button>
    <div />
    <div>
      Current player: <b>{currentPlayer ? currentPlayer.name : "none"}</b>
    </div>
  </div>
);

const withDefaultProps = defaultProps({
  onResetGameClick: () => {},
});

const enhance = compose<DebugBarProps, EnhancedDebugBarProps>(withDefaultProps);

export const EnhancedDebugBar = enhance(DebugBar);
