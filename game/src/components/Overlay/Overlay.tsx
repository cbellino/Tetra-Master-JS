import * as React from "react";
import { compose, defaultProps } from "recompose";

import "./Overlay.css";

type OverlayProps = {
  onClick: () => void;
};

type EnhancedOverlayProps = {
  onClick?: () => void;
};

export const Overlay: React.SFC<OverlayProps> = ({ onClick, children }) => (
  <div className="overlay" onClick={onClick} role="button">
    {children}
  </div>
);

const withDefaultProps = defaultProps({
  onClick: () => {},
});

const enhance = compose<OverlayProps, EnhancedOverlayProps>(withDefaultProps);

export const EnhancedOverlay = enhance(Overlay);
