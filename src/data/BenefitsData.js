const midgame = 'midgame';
const checkmates = "checkmate";
const endgames = "endgame";
const openings = "openings";
export const BenefitsData = [{
        id: 0,
        type: 'benefits',
        category: midgame,
        text: "Identify tactics more quickly through repetition training.",
        img: require("../Images/chessClock_red.svg").default,
        pieces: "variable"
    },{
        id: 1,
        type: "benefits",
        category: midgame,
        text: "Improve your calculation skills.",
        img: require("../Images/Abacus_1_.svg").default,
        pieces: "variable"
    },{
        id: 2,
        type: 'benefits',
        category: midgame,
        text: "Identify subtle tactics to capitalize on the position.",
        img: require("../Images/move.svg").default,
        pieces: "variable"
    },{
        id: 3,
        type: 'benefits',
        category: midgame,
        text: "Improve your tactical vision.",
        img: require("../Images/vision_red.svg").default,
        pieces: "variable"
    },{
        id: 4,
        type: "benefits",
        category: midgame,
        text: "Improve your visualization skills.",
        img: require("../Images/magnifying-glass.svg").default,
        pieces: "variable"
    },{
        id: 5,
        type: "benefits",
        category: checkmates,
        text: "Reduced the number of missed wins.",
        img: require("../Images/win_purple.svg").default,
        pieces: "variable"
    },{
        id: 6,
        type: "benefits",
        category: checkmates,
        text: "Finish games when you have the advantage.",
        img: require("../Images/finish_line.svg").default,
        pieces: "variable"
    },{
        id: 7,
        type: "benefits",
        category: checkmates,
        text: "Identify checkmates more quickly through repetition training.",
        img: require("../Images/quick_purple.svg").default,
        pieces: "variable"
    },{
        id: 8,
        type: "benefits",
        category: endgames,
        text: "Identify endgames patterns to secure more wins.",
        img: require("../Images/tactics_green.svg").default,
        pieces: "variable"
    },{
        id: 9,
        type: "benefits",
        category: endgames,
        text: "Decrease time-to-move by improving your intuition.",
        img: require("../Images/third-eye.svg").default,
        pieces: "variable"
    },{
        id: 10,
        type: "benefits",
        category: endgames,
        text: "Improve your visualization skills.",
        img: require("../Images/magnifying-glass-green.svg").default,
        pieces: "variable"
    },{
        id: 11,
        type: "benefits",
        category: "openings",
        text: "Strengthen your opening repertoire.",
        img: require("../Images/Wall.svg").default
    },{
        id: 12,
        type: "benefits",
        category: openings,
        text: "Master opening lines.",
        img: require("../Images/Master.svg").default,
        pieces: "pawn"
    }
    //     id: 13,
    //     type: "benefits",
    //     category: endgames,
    //     text: "Learn to use the rook to secure the advantage.",
    //     img: "",
    //     pieces: "rook"
    // },{
    //     id: 14,
    //     type: "benefits",
    //     category: endgames,
    //     text: "Learn to use the queen to secure the advantage.",
    //     img: "",
    //     pieces: "queen"
    // },{
    //     id: 15,
    //     type: "benefits",
    //     category: endgames,
    //     text: "Learn to use the queen and rook to secure the advantage.",
    //     img: "",
    //     pieces: "queen and rook"
    // }
]