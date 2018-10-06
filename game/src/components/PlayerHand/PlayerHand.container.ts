import { connect } from "react-redux";

import { Id } from "../../models";
import {
  focusHandTile,
  getPlayer,
  isCurrentPlayerId,
  selectHandTile,
} from "../../store";
import { EnhancedPlayerHand } from "./PlayerHand";

type OwnProps = {
  playerId: Id;
};

const mapStateToProp = (state, ownProps: OwnProps) => {
  return {
    player: getPlayer(ownProps.playerId)(state),
    isPlaying: isCurrentPlayerId(ownProps.playerId)(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps: OwnProps) => ({
  onTileMouseEnter: ({ tileId }) => {
    dispatch(focusHandTile(ownProps.playerId, tileId));
  },
  onTileMouseLeave: ({ tileId }) => {
    dispatch(focusHandTile(ownProps.playerId, null));
  },
  onTileClick: ({ tileId }) => {
    dispatch(selectHandTile(ownProps.playerId, tileId));
  },
});

const enhance = connect(
  mapStateToProp,
  mapDispatchToProps,
);

export default enhance(EnhancedPlayerHand);
