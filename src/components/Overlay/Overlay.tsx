import * as React from "react";

import "./Overlay.css";

type OverlayProps = {
  onClick: () => void;
};

export const Overlay: React.SFC<OverlayProps> = ({ onClick, children }) => (
  <div className="overlay" onClick={onClick} role="button">
    {children}
  </div>
);
