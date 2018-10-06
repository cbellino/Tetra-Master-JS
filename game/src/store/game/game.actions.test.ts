import { createMockStore } from "../../lib";
import { Vector2 } from "../../models";
import { initBoard } from "../board";
import { addPlayer, addTilesToPlayerHand } from "../players";
import { startTurn } from "../turn/turn.actions";
import {
  FINISH_GAME,
  finishGame,
  restartGame,
  START_GAME,
  startGame,
} from "./game.actions";

describe("restartGame", () => {
  it("should reset the board, players and start a new turn", () => {
    const store = createMockStore({
      board: {
        grid: [[{}, {}], [{}, {}]],
      },
      players: {
        map: {
          "1": { id: "1", selectedTileId: undefined },
        },
      },
      turn: {
        currentPlayerId: "1",
      },
    });

    store.dispatch(restartGame());

    const actions = store.getActions();

    expect(actions[0]).toEqual(initBoard(new Vector2(3, 3)));
    expect(actions[1]).toEqual(
      addPlayer({ id: "1", name: "Player 1", selectedTileId: "1" }),
    );
    expect(actions[2]).toEqual(
      addPlayer({ id: "2", name: "Player 2", selectedTileId: "12" }),
    );
    expect(actions[3]).toEqual(
      addTilesToPlayerHand("1", ["1", "2", "3", "4", "5"]),
    );
    expect(actions[4]).toEqual(
      addTilesToPlayerHand("2", ["11", "12", "13", "14", "15"]),
    );
    expect(actions[5]).toEqual(startTurn("1"));
  });
});

describe("finishGame", () => {
  it("should return a FINISH_ACTION action", () => {
    expect(finishGame()).toEqual({ type: FINISH_GAME });
  });
});

describe("startGame", () => {
  it("should return a START_ACTION action", () => {
    expect(startGame()).toEqual({ type: START_GAME });
  });
});
