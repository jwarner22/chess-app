
// calculates new elo rating
export const calcEloRating = (outcomes, puzzles, playerRating) => {
    // calculates rating difference capped at 400
    const ratingDifference = (puzzleRating, playerRating) => Math.max(Math.min(playerRating-puzzleRating,400),-400); 
    
    // expected outcome, formula: E = 1/1 + 10^((PR-PlayerRating)/400)
    const expected = (playerRating, puzzleRating) => 1/(1+Math.pow(10, ratingDifference(puzzleRating,playerRating))/400);
    
    let puzzleRatings = puzzles.map(puzzle => puzzle.rating); // extracts ratings
    
    let k = 20; // calibration factor, default 20
    
    // calc rating changes
    let ratingChanges = outcomes.map((outcome,index) => {
      
      let playerExpected = expected(playerRating, puzzleRatings[index]);
      let ratingChange = parseInt(k * (!!outcome - playerExpected), 10);
      
      return ratingChange;
    })
  
    // sum rating changes
    let ratingChange = ratingChanges.reduce((accum, current) => accum + current) // sum rating changes
    
    let newRating = playerRating + ratingChange; // apply changes
    
    return newRating;
  }

  // calculates module score
  export const calcScore = (outcomes, puzzles) => {

    let ratings = puzzles.map(puzzle => puzzle.rating); // extracts ratings
    
    const diff_index = rating => (rating - 800)/(2600-800); // calcs difficulty index
    
    // calcs score for each puzzle
    let scores = outcomes.map((outcome, index) => {
      if (outcome === true) {
        let score = 100*diff_index(ratings[index]); // positive for correct
        return score;
      } else {
        let negScore = -(50*diff_index(ratings[index])); // penalty for incorrect
        return negScore;
      }
    })
    let score = parseInt(scores.reduce((accum,current) => accum + current),10); // sums scores
    return score
  }