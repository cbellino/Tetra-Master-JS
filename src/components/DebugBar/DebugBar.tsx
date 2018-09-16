import * as React from "react";

import { Player } from "../../models";
import "./DebugBar.css";

type DebugBarProps = {
  initialized: boolean;
  currentPlayer?: Player;
};

const DebugBar: React.SFC<DebugBarProps> = ({ initialized, currentPlayer }) => (
  <div className="debug-bar">
    <div>
      Game initialized: <b>{initialized.toString()}</b>
    </div>
    <div />
    <div>
      Current player: <b>{currentPlayer ? currentPlayer.name : "none"}</b>
    </div>
  </div>
);

export const EnhancedDebugBar = DebugBar;
