
// calculates new elo rating
export const calcEloRating = (outcomes, puzzles, playerRating, completed) => {

  let k = Math.max(10, 800/(completed*10)); // calibration factor. Adjusts based on number of puzzles/modules completed. in the future this should be based on exact number of puzzles
  let maxDiff = 400; // max rating change

  // calculates rating difference capped at 400
    const ratingDifference = (puzzleRating, playerRating) => Math.max(Math.min(playerRating-puzzleRating,maxDiff),-maxDiff); 
    
    // expected outcome, formula: E = 1/1 + 10^((PR-PlayerRating)/400)
    const expected = (playerRating, puzzleRating) => 1/(1+Math.pow(10, ratingDifference(puzzleRating,playerRating))/maxDiff);
    
    let puzzleRatings = puzzles.map(puzzle => puzzle.rating); // extracts ratings
    
    //let k = 20; // calibration factor, default 20
    
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
  export const calcScore = (outcomes, puzzles, times) => {

    let ratings = puzzles.map(puzzle => puzzle.rating); // extracts ratings
    
    const diff_index = rating => (rating - 600)/(2600-600); // calcs difficulty index

    let target_time = 60000; // target time in ms
    const time_factor = time => Math.max((1-0.5*Math.sqrt(time/target_time)), 0)

    // calcs score for each puzzle
    let scores = outcomes.map((outcome, index) => {
      if (outcome === true) {
        let score = 100*(time_factor(times[index])+0.25)*diff_index(ratings[index]); // positive for correct
        return score;
      } else {
        let negScore = -(50*(1-time_factor(times[index]))*diff_index(ratings[index])); // penalty for incorrect
        return negScore;
      }
    })
    let score = parseInt(scores.reduce((accum,current) => accum + current),10); // sums scores
    return score
  }