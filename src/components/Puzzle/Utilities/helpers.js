export const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export const getMoves = (moves) => {
  let moveCouples = moves.split(" ");
  console.log('got moves')
  // let moveArray = [];
  // let move1;
  // let move2;
  // console.log({ moveCouples: moveCouples });
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