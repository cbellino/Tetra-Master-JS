import * as React from "react";

import { compose, defaultProps } from "recompose";
import { Grid, Vector2 } from "../../models";
import { EnhancedBoardCell } from "./Board.Cell";
import "./Board.css";

type EnhancedBoardProps = {
  grid: Grid;
  onCellClick?: (position: Vector2) => void;
};
type BoardProps = {
  grid: Grid;
  onCellClick: (position: Vector2) => void;
};

const Board: React.SFC<BoardProps> = ({ grid, onCellClick }) => (
  <div className="board">
    <div className="grid">
      {grid.map((row, x) =>
        row.map((cell, y) => (
          <EnhancedBoardCell
            key={`${x}-${y}`}
            cell={cell}
            position={new Vector2(x, y)}
            onClick={onCellClick}
          />
        )),
      )}
    </div>
  </div>
);

const withDefaultProps = defaultProps({
  onCellClick: () => {},
});

const enhance = compose<BoardProps, EnhancedBoardProps>(withDefaultProps);

export const EnhancedBoard = enhance(Board);
