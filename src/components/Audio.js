import React, { useState } from "react";

const Audio = props => {
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(true);

  play = () => {
    audio.play();
  };

  let audio = <audio {...props} />;
  return audio;
};

export default Audio;
