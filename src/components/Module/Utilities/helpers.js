import {Modules} from "../../../data/ModuleData"


export const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export const getMoves = (moves) => {
  let moveCouples = moves.split(" ");
  // let moveArray = [];
  // let move1;
  // let move2;
  // moveCouples.forEach((move) => {
  //   move1 = move.substring(0, 2);
  //   move2 = move.substring(2);
  //   moveArray.push(move1);
  //   moveArray.push(move2);
  // });
  return moveCouples;
};

export const getOpeningMoves = (moves) => {
  let moveCouples = moves.split(" ");
  return moveCouples;
};


export const getModuleTitle = (name) => {
  const module = Modules.find(module => module.type_ref === name)
  return module.headline
}

export function bonusCalc(times) {
  let timesCopy = [...times];
  const currentTime = timesCopy.pop() / 1000; // puzzle completion time in seconds

  const bonus = currentTime < 30 ? 50 : currentTime < 60 ? 25 : currentTime < 120 ? 10 : currentTime < 180 ? 5 : 0;
  return bonus;
}