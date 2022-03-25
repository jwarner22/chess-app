import { useContext, useEffect } from "react";
import ChessboardLoader from "../../ChessBoardLoader/ChessboardLoader";
import useFetch from "../../../api/useFetch.js";
import { baseURL } from "../../../api/apiConfig.js";

import { UserContext } from "../../../providers/GlobalState.js";

export const PostOpening = (props) => {
    const {put, post} = useFetch(baseURL);
    const {userId, updateOpeningStats, openingStats, createOpeningStats, updateAchievements, dailyModules, updateDailyModules} = useContext(UserContext);
    const {moves, isDaily, orientation} = props.location.state;

    useEffect(() => {
      finished();
    },[])

    console.log({props: props})

    const finished = async () => {
        const openingId = props.location.state.openingId;
        let oldOpeningStats = [...openingStats];
        console.log('finish ran')
        // update opening in db
        const { openingMasteryRank, thisOpeningRank, newOpeningRank } = await saveModuleData(userId, openingId, put, post, updateOpeningStats, oldOpeningStats, getRank, getNextRank, createOpeningStats);
        console.log({openingMasteryRank: openingMasteryRank, thisOpeningRank: thisOpeningRank, newOpeningRank: newOpeningRank})
        newOpeningRank.forEach(newRank => {
          updateAchievements("next_rank", 0, 0,  newRank.name, newRank.nextRank.name)
        }) 
        
        if (props.location.state.isDaily) updateDaily(dailyModules, updateDailyModules);
    
        //push to post opening page
        props.history.push({pathname: `/post-opening-page/${moves}/${orientation}`, state: {openingId: openingId, openingMasteryRank: openingMasteryRank, thisOpeningRank: thisOpeningRank, newOpeningRank: newOpeningRank, isDaily: isDaily}});
    }
    
    // helper functions for saveModuleData
    const getNextRank = nextRank()
    const getRank = rank()

    return(
        <ChessboardLoader />
    )
}

function rank() {
    return (mastery) => {
      //set mastery equation = to precentile (20, 40, etc.) and solve for x (mastery)
      if (mastery === 0) {
        return 'Newbie';
      } else if (mastery < 250) {
        return 'Beginner';
      } else if (mastery === 667) {
        return 'Intermediate';
      } else if (mastery === 1500) {
        return 'Advanced';
      } else if (mastery === 4000) {
        return 'Expert';
      } else if (mastery === 20000) {
        return 'Master';
      } else if (mastery === 30000) {
        return 'Grandmaster';
      } else if (mastery === 50000) {
        return 'Legendary';
      }
    };
  }
  
  function nextRank() {
    return (rank) => {
      switch (rank) {
        case 'Newbie':
          return { name: 'Beginner', value: 250 };
        case 'Beginner':
          return { name: 'Intermediate', value: 667 };
        case 'Intermediate':
          return { name: 'Advanced', value: 1500 };
        case 'Advanced':
          return { name: 'Expert', value: 4000 };
        case 'Expert':
          return { name: 'Master', value: 20000 };
        case 'Master':
          return { name: 'BegGrandmaster', value: 30000 };
        case 'Grandmaster':
          return { name: 'Legendary', value: 50000 };
        default:
          return { name: 'Beginner', value: 250 };
      }
    };
  }
  const updateDaily = async (dailyModules, updateDailyModules) => {
    let updatedDailyModules = await mutateDailyModules(dailyModules);
    console.log({updatedDailyModules: updatedDailyModules})
    await saveDailyModules(updatedDailyModules, updateDailyModules);
  }

  // update daily module
  const mutateDailyModules = async (dailyModules) => {
    let mutatedPuzzles = [...dailyModules]
    const location = 3; // defualt location of opening tile for dailies
    mutatedPuzzles = mutatedPuzzles.map(module => {
      if (module.location === location) {
        module.completed = true;
      } else if (module.location === location + 1) {
        module.locked = false;
      }
      return module;
    })
    return mutatedPuzzles
  }
  const saveDailyModules = async (updatedDailyModules, updateDailyModules) => {
    await updateDailyModules(updatedDailyModules)
    return null;
  }

  async function saveModuleData(userId, openingId, put, post, updateOpeningStats, oldOpeningStats, getRank, getNextRank, createOpeningStats) {
    let url = `/opening-completions/${userId}/${openingId}`;
    let response = await put(url);
    if (response.detail === 'Opening not found') {
      // post new opening for user
      response = await createOpeningStats(openingId);
    }

    const concatResponse = [...response.parent_openings, response.this_opening];

    //update opening stats in global state
    let updatedOpeningStats = await updateOpeningStats(concatResponse); // update global state

    const openingMasteryRank = updatedOpeningStats.map(newOpening => {
      let oldOpening = oldOpeningStats.find(opening => newOpening.opening_id === opening.opening_id);

      let oldMastery = 0;
      let oldRank = '';

      if (oldOpening == null) {
        oldRank = 'Newbie';
      } else {
        oldMastery = oldOpening.history_7;
        oldRank = getRank(oldMastery);
      }
      let newMastery = newOpening.history_7;
      let masteryDiff = newMastery - oldMastery;
      let newRank = getRank(newMastery);
      let nextRank = getNextRank(newRank);

      return {
        name: newOpening.name,
        opening_id: newOpening.opening_id,
        oldRank: oldRank,
        newRank: newRank,
        nextRank: nextRank,
        diff: masteryDiff
      };
    });

    const thisOpeningRank = openingMasteryRank.find(opening => opening.opening_id === openingId);
    const newOpeningRank = openingMasteryRank.filter(rank => rank.newRank !== rank.oldRank);
    return {
      openingMasteryRank,
      thisOpeningRank,
      newOpeningRank
    };
  }
