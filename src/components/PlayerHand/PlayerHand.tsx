import * as React from "react";

import { compose, defaultProps } from "recompose";
import { Id, Player } from "../../models";
import TileCard from "../TileCard";
import "./PlayerHand.css";

export type TileEventFn = (params: { tileId: Id }) => void;
type PlayerHandProps = {
  player: Player;
  onTileMouseEnter: TileEventFn;
  onTileMouseLeave: TileEventFn;
  onTileClick: TileEventFn;
};
type EnhancedPlayerHandProps = {
  player: Player;
  onTileMouseEnter?: TileEventFn;
  onTileMouseLeave?: TileEventFn;
  onTileClick?: TileEventFn;
};

const handleTileMouseEvent = (tileId: Id, onEvent: TileEventFn) => () => {
  onEvent({ tileId });
};

const PlayerHand: React.SFC<PlayerHandProps> = ({
  player,
  onTileMouseEnter,
  onTileMouseLeave,
  onTileClick,
}) => (
  <div className={`player-hand player-${player.id}`}>
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

const withDefaultProps = defaultProps({
  onTileMouseEnter: () => {},
  onTileMouseLeave: () => {},
  onTileClick: () => {},
});

const enhance = compose<PlayerHandProps, EnhancedPlayerHandProps>(
  withDefaultProps,
);

export const EnhancedPlayerHand = enhance(PlayerHand);
