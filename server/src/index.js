const { ApolloServer, gql } = require("apollo-server-cloud-functions");

import { getPlayers, getTiles, getTileInstances } from "./api";

const typeDefs = gql`
  type Player {
    id: String
    name: String
    hand: [String]
    focusedTileId: String
    selectedTileId: String
  }

  type Tile {
    id: String
    name: String
  }

  type TileInstance {
    id: String
    tileId: String
    tile: Tile
  }

  type Query {
    players: [Player]
    tiles: [Tile]
    tileInstances: [TileInstance]
  }
`;

const resolvers = {
  Query: {
    players: getPlayers,
    tiles: getTiles,
    tileInstances: getTileInstances,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

export const api = server.createHandler();
