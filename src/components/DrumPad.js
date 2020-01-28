import React, { useState } from "react";

const DrumPad = props => {
  const { keyCode, keyTrigger, id, url } = props.drum;
  const [loading, setLoading] = useState(false);

  const removeLoading = e => {
    if (e.propertyName !== "transform") return;
    setLoading(false);
  };

  return (
    <button
      className={loading ? "drum-pad playing" : "drum-pad"}
      data-key={keyCode}
      id={keyCode}
      onClick={e => {
        props.click(e);
        setLoading(!loading);
      }}
      onTransitionEnd={removeLoading}
    >
      {keyTrigger}
      <audio
        src={url}
        data-key={keyCode}
        data-id={keyTrigger}
        data-title={id}
        id={keyTrigger}
        className="clip"
      />
    </button>
  );
};

export default DrumPad;
