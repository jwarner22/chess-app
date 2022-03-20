import { getMoves } from '../Utilities/helpers.js';
import { bonusCalc } from "../Utilities/Scoring";

// create a reducer and refactor PuzzlePage to use it
export const puzzlePageReducer = (state, action) => {
  switch (action.type) {

    case 'INITIALIZE': {
      let moves = getMoves(action.payload.moves);
      return { 
        ...state,
        toggleTimer: true,
        correctMoves: moves,
        fen: action.payload.fen,
        ratings: [action.payload.rating]
      }
     }
    // case 'SET_FEN':
    //     return {
    //         ...state,
    //         fen: action.payload
    //     };

    // case "SET_MOVES": {
    //   let moves = getMoves(action.payload);
    //   return {
    //     ...state,
    //     correctMoves: moves
    //   };
    // }

    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload
      };

    case "START_TIMER":
      return {
        ...state,
        startTime: action.payload
      };
    
    case "RESET_TIMER":
      return {
        ...state,
      };

    case "FAIL": {
      let newLives = state.lives;
      if (!state.retry) {
        newLives = state.lives - 1;
      }
      if (newLives < 0) newLives = 0;

      let newTimes = [...state.times, action.payload - state.startTime];
      
      return {
        ...state,
        retryDisable: false,
        retry: false,
        continueDisable: false,
        correct: false,
        lives: newLives,
        outcome: false,
        toggleTimer: false,
        outcomes: [...state.outcomes, false],
        times: newTimes,
        waiting: true
      };
    }

    case "SUCCESS": {

      let newTimes = [...state.times, action.payload - state.startTime];
      let bonus = bonusCalc(newTimes);

      return {
        ...state,
        retryDisable: true,
        continueDisable: false,
        toggleTimer: false,
        correct: true,
        outcome: true,
        outcomes: [...state.outcomes, true],
        times: newTimes,
        currentBonus: bonus,
        bonuses: [...state.bonuses, bonus],
        waiting: true
      };
    }
    case "RESET":
      return {
        ...state,
        retryDisable: true,
        continueDisable: true
        };

    case "NEXT":
      // puzzleData[count+1] should be action.payload
      let correctMoves = getMoves(action.payload.moves);
      return {
        ...state,
        count: state.count + 1,
        retry: false,
        waiting: false,
        retryDisable: true,
        toggleTimer: true,
        boardKey: state.boardKey + 1,
        fen: action.payload.fen,
        ratings: [...state.ratings, action.payload.rating],
        correctMoves: correctMoves,
        currentBonus: 0,
        resetTimer: true
      };

    case "RETRY":
      // puzzleData[state.count] should be the action.payload
      return {
        ...state,
        retry: true,
        waiting: false,
        boardKey: state.boardKey + 1,
        retryDisable: true,
        continueDisable: true,
        ratings: [...state.ratings, action.payload.rating],
        toggleTimer: true,
        currentBonus: 0,
        resetTimer: true
      };

    case "RESET_BONUS":
      return {
        ...state,
        currentBonus: 0
      };

    default:
      return state;
  }
};
