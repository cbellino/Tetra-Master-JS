import classnames from "classnames";
import * as React from "react";
import { compose, defaultProps } from "recompose";

import { Id, Player } from "../../models";
import TileCard from "../TileCard";
import "./PlayerHand.css";

export type TileEventFn = (params: { tileId: Id }) => void;
export type EnhancedPlayerHandProps = {
  player: Player;
  isPlaying?: boolean;
  onTileMouseEnter?: TileEventFn;
  onTileMouseLeave?: TileEventFn;
  onTileClick?: TileEventFn;
};
type PlayerHandProps = {
  player: Player;
  isPlaying: boolean;
  onTileMouseEnter: TileEventFn;
  onTileMouseLeave: TileEventFn;
  onTileClick: TileEventFn;
};

const handleTileMouseEvent = (tileId: Id, onEvent: TileEventFn) => () => {
  onEvent({ tileId });
};

const PlayerHand: React.SFC<PlayerHandProps> = ({
  player,
  isPlaying,
  onTileMouseEnter,
  onTileMouseLeave,
  onTileClick,
}) => {
  const className = classnames("player-hand", `player-${player.id}`, {
    "is-playing": isPlaying,
  });

  return (
    <div className={className}>
      <h2 className="player-name">{player.name}</h2>
      {player.hand.map((tileId, index) => (
        <TileCard
          key={index}
          tileId={tileId}
          playerId={player.id}
          focused={tileId === player.focusedTileId}
          selected={tileId === player.selectedTileId}
          onMouseEnter={handleTileMouseEvent(tileId, onTileMouseEnter)}
          onMouseLeave={handleTileMouseEvent(tileId, onTileMouseLeave)}
          onClick={handleTileMouseEvent(tileId, onTileClick)}
        />
      ))}
    </div>
  );
};

const withDefaultProps = defaultProps({
  isPlaying: false,
  onTileMouseEnter: () => {},
  onTileMouseLeave: () => {},
  onTileClick: () => {},
});

const enhance = compose<PlayerHandProps, EnhancedPlayerHandProps>(
  withDefaultProps,
);

export const EnhancedPlayerHand = enhance(PlayerHand);
