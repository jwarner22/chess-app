import React, { useState } from "react";
import moveSoundFile from "../assets/public_sound_standard_Move.mp3";

export const MoveSound = () => {
  return (
    <div>
      <audio src={moveSoundFile} autoPlay />
    </div>
  );
};
