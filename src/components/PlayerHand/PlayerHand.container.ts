import { connect } from "react-redux";

import { Id } from "../../models";
import {
  focusHandTile,
  getPlayer,
  isCurrentPlayerId,
  selectHandTile,
} from "../../store";
import { EnhancedPlayerHand, EnhancedPlayerHandProps } from "./PlayerHand";

type OwnProps = {
  playerId: Id;
};
type MergeProps = EnhancedPlayerHandProps & OwnProps;

const mergeProps = (
  stateProps,
  dispatchProps,
  ownProps: OwnProps,
): MergeProps => {
  const { state } = stateProps;
  const { dispatch } = dispatchProps;
  const { playerId } = ownProps;

  const player = getPlayer(playerId)(state);
  const isPlaying = isCurrentPlayerId(player.id)(state);

  return {
    ...ownProps,
    player,
    isPlaying,
    onTileMouseEnter: ({ tileId }) => {
      dispatch(focusHandTile(playerId, tileId));
    },
    onTileMouseLeave: ({ tileId }) => {
      dispatch(focusHandTile(playerId, null));
    },
    onTileClick: ({ tileId }) => {
      dispatch(selectHandTile(playerId, tileId));
    },
  };
};

const enhance = connect(
  state => ({ state }),
  dispatch => ({ dispatch }),
  mergeProps,
);

export default enhance(EnhancedPlayerHand);
