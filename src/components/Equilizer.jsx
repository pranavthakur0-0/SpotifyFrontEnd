import React, { memo } from "react";
import "./Equalizer.css"

const Equalizer = () => {
  return (
    <button className="equalizer">
        <div>
            <span className="eq1"></span>
            <span className="eq2"></span>
            <span className="eq3"></span>
            <span className="eq4"></span>
        </div>
    </button>
  );
};

export default memo(Equalizer);
