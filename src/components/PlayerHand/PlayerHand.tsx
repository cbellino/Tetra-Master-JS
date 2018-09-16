import * as React from "react";

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

const handleTileMouseEvent = (tileId: Id, onEvent: TileEventFn) => () => {
  onEvent({ tileId });
};

export const PlayerHand = ({
  player,
  onTileMouseEnter,
  onTileMouseLeave,
  onTileClick,
}: PlayerHandProps) => (
  <div className={`player-hand player-${player.id}`}>
    <h2>{player.name}</h2>
    {player.hand.length > 0 &&
      player.hand.map((tileId, index) => (
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
