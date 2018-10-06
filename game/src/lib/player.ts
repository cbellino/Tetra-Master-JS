import { Id, Player } from "../models";

// TODO: Add unit tests.
export const createPlayer = (data: { id: Id; name: string }): Player => ({
  ...{ hand: [], focusedTileId: undefined, selectedTileId: undefined },
  ...data,
});
