import { players, tiles, tileInstances } from "./data";

const withTile = tiles => item => {
  return {
    ...item,
    tile: tiles.find(tile => tile.id === item.tileId),
  };
};

const findById = id => item => item.id === id;

export const getTiles = () => {
  return Promise.resolve(tiles);
};

export const getTileInstances = () => {
  const list = tileInstances.map(withTile(tiles));
  return Promise.resolve(list);
};

export const getPlayers = () => {
  return Promise.resolve(players);
};
