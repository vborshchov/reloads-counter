import React, { useState } from "react";
import "./style.scss";

const Tooltip = ({ message, position, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTooltip = () => {
    setIsVisible(false);
  };

  const showTooltip = () => {
    setIsVisible(true);
  };

  return (
    <span className="tooltip" onMouseLeave={hideTooltip}>
      {isVisible && (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className="tooltip-message">{message}</div>
        </div>
      )}
      <span className="tooltip-trigger" onMouseOver={showTooltip}>
        {children}
      </span>
    </span>
  );
};

export default Tooltip;