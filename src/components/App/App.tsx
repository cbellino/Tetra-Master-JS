import * as React from "react";

import { compose, defaultProps, lifecycle } from "recompose";
import Board from "../Board";
import DebugBar from "../DebugBar";
import { Overlay } from "../Overlay";
import PlayerHand from "../PlayerHand";
import "./App.css";

type AppProps = {
  initialized: boolean;
  gameIsOver: boolean;
  initGame: () => void;
};

const withStartGameOnMount = lifecycle<AppProps, {}>({
  componentDidMount() {
    const { initGame } = this.props;

    initGame();
  },
});

const withDefaultProps = defaultProps({
  initGame: () => {},
});

export const App: React.SFC<AppProps> = ({
  initialized,
  gameIsOver,
  initGame,
}) => (
  <>
    <DebugBar initialized={initialized} />
    {initialized && <Board />}
    {initialized && <PlayerHand playerId="1" />}
    {initialized && <PlayerHand playerId="2" />}
    {gameIsOver && (
      <Overlay onClick={initGame}>
        {/* TODO: Display the winner */}
        <h1>Game over</h1>
      </Overlay>
    )}
  </>
);

export const EnhancedApp = compose(
  withStartGameOnMount,
  withDefaultProps,
)(App);
