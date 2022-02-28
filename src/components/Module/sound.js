import React from "react";
import moveSoundFile from "../../assets/public_sound_standard_Move.mp3";


export const MoveSound = (props) => {
  //const type = props.type;
  // add conditional to generalize

  return (
    <div>
      <audio src={moveSoundFile} autoPlay />
    </div>
  );
};
