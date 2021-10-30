


export const AllEndgames = [
    {
        id: 0,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'endgame',
        headline: 'Endgame Shuffle',
        subheading: 'A mixture of all endgame strategies.',
        instructions: 'Confidence in the endgame can be the difference in a close game.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Endgame_shuffle.svg").default 
    }
]

export const Modules = [
    {
        id: 1,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'endgame',
        headline: 'Endgame Shuffle',
        subheading: 'A mixture of all endgame strategies.',
        instructions: 'Confidence in the endgame can be the difference in a close game.',
        description: 'A mixture of all endgame strategies',
        img: require("../../../../Images/Endgame_shuffle.svg").default
    },{
        id: 2, // `eventually use random str as modules will be dynamic for each user and may change over time
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'bishopEndgame',
        headline: 'Bishop Endgame',
        subheading: 'Convert engames with the bishop.',
        instructions: 'Depending on the color of the bishop, it can often guard a promotional square',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        img: require("../../../../Images/Bishop.png").default
    },
    {
        id: 3,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'knightEndgame',
        headline: 'Knight Endgame',
        subheading: 'Practice the endgame with a knight.',
        instructions: `The knight is particularly effective at fork tactics, which can be difficult for one's opponent to spot`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Knight.png").default
    },{
        id: 4,
        category: 'puzzle',
        type: 'endgame',
        headline: 'Pawn Endgame',
        type_ref: 'pawnEndgame',
        subheading: `Capitalize with a pawn.`,
        instructions: 'A pawn can become a huge focal point in the endgame when promotion is in sight.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Pawn.png").default
    },{
        id: 5,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'queenEndgame',
        headline: 'Queen Endgame',
        subheading: 'Practice using the queen in the endgame.',
        instructions: 'The queen is an incredibly powerful piece in the endgame - look for it to traverse large swaths of the board in the endgame.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Checkmate.svg").default
    },{
        id: 6,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'rookEndgame',
        headline: 'Rook Endgame',
        subheading: 'Practice using the rook in the endgame.',
        instructions: 'Look to capitalize on open files and ranks to check the opposing king and track down dangerous pawns.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Rook.png").default
    },{
        id: 7,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'queenRookEndgame',
        headline: 'Queen and Rook Endgame',
        subheading: 'The power couple',
        instructions: 'Look to trap the opposing kingQu with this powerful duo.',
        description: 'Lorem ipsum mah brudda',
        img: require('../../../../Images/queenrook.png').default
    },{
        id: 8,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'zugzwang',
        headline: 'Zugzwang',
        subheading: `A tough road ahead.`,
        instructions: 'Zugzwang is a situation in which one player is at a disadvantage because of their obligation to make a move.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Zugzwang.svg").default
    },
    // },{
    //     id: 9,
    //     category: 'puzzle',
    //     type: 'checkmate',
    //     type_ref: 'anastasiaMate',
    //     headline: `Anastasia's Mate`,
    //     subheading: 'Beautiful checkmates with a rook and knight.',
    //     instructions: `The knight defends the opposing king's flight squares while the rook delivers checkmate in the style of a back rank mate`,
    //     description: 'Lorem ipsum mah brudda',
    //     img: ''
    // },{
    //     id: 10,
    //     category: 'puzzle',
    //     type: 'checkmate',
    //     type_ref: 'arabianMate',
    //     headline: 'Arabian Mate',
    //     subheading: 'One of the oldest checkmate patterns.',
    //     instructions: 'The knight often removes a flight square while the rook delivers checkmate in this classic motif.',
    //     description: 'Lorem ipsum mah brudda',
    //     img: ''
    // },{
        {
        id: 11,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'bodenMate',
        headline: `Boden's Mate`,
        subheading: 'Criss-cross',
        instructions: `This classic bishop mating pattern involves two opposite facing bishops removing the opposing king's flight squares while delivering checkmate`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/BodensMate.svg").default
    },{
        id: 12,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'doubleBishopMate',
        headline: 'Double Bishop Mate',
        subheading: 'One bishop, two bishop, mate.',
        instructions: 'The bishop pair is coveted due to their combined ability to attack all squares. This can leave the opposing king with nowhere to run.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/2bishops.png").default
    },{
        id: 13,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'dovetailMate',
        headline: 'Dovetail Mate',
        subheading: 'Trap the black king.',
        instructions: 'The Queen gives checkmate while the opposing king has no flight squares due to the obstructing pieces at its side.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Dove.svg").default
    },{
        id: 14,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'hookMate',
        headline: 'Hook Mate',
        subheading: 'Watch your back.',
        instructions: `Named after its resemblence to a hook, this checkmate pattern demonstrates the perfect coordination between the rook and knight.`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Hook.svg").default
    },{
        id: 15,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'mate',
        headline: 'Checkmate Shuffle',
        subheading: 'A mixture of checkmate strategies',
        instructions: 'Deliver checkmate any way you can.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Checkmate.svg").default
    },{
        id: 16,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'smotheredMate',
        headline: 'Smothered Mate',
        subheading: `I....can't....breath....`,
        instructions: 'The opposing king can sometimes become trapped by his own pieces. Find the sequence of moves that causes the opposing pieces to trap their own king and deliver a beautiful checkmate.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/SmotheredMate.svg").default
    },{
        id: 17,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'advancedPawn',
        headline: 'Advanced Pawn',
        subheading: `We're almost home free!`,
        instructions: 'Clear the way for an advanced pawn to pave a path to victory. But beware allowing your opponenent to do the same.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/AdvancedPawn.svg").default
    },{
        id: 18,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'attackingF2F7',
        headline: 'Attack f2f7',
        subheading: 'Capitalize on the weakness.',
        instructions: 'The squares F2 and F7 are common sources of weakness in a position. Exploit this weakness by capitalizing on this pressure.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/AttackingF2F7.svg").default
    },{
        id: 19,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'attraction',
        headline: 'Attraction',
        subheading: `You've been bamboozled.`,
        instructions: 'This motif typically involves a sacrifice which lures or decoys an opposing piece to move to a square in which it can be exploited or attacked.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Attraction.svg").default
    },{
        id: 20,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'backRankMate',
        headline: 'Back Rank Mate',
        subheading: 'Watch out behind you!',
        instructions: 'When the king is on the back rank, there is limited room for escape. Look to deliver check when the opposing king has nowhere to go.',
        description: 'Lorem ipsum mah brudda',
        img:require("../../../../Images/BackRankMate.svg").default
    },{
        id: 21,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'capturingDefender',
        headline: 'Capturing Defender',
        subheading: 'Improve your position by weakening your opponents defenses.',
        instructions: 'Often a key piece will stand in defense in the opponents position. Capturing it can open up tactical opportunities...',
        description: 'Lorem ipsum mah brudda',
        img:require("../../../../Images/Capturingdefender.png").default
    },{
        id: 22,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'clearance',
        headline: 'Clearance',
        subheading: `There's a line here, blow it open.`,
        instructions: 'Your own pieces can sometimes get in the way. Move them by any means necessary and you can open up excellent opportunities.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Clearance.svg").default
    },{
        id: 23,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'defensiveMove',
        headline: 'Defensive Move',
        subheading: `You're under attack, protect yourself.`,
        instructions: 'Look to defend your position and king while maintaining or gaining an advantage',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/DefensiveMoves.svg").default
    },{
        id: 24,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'discoveredAttack',
        headline: 'Discovered Attack',
        subheading: 'Surprise!',
        instructions: 'A piece moves - often by giving check - and reveals an attack on an opposing piece which is vulnerable to tactics',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/DiscoveredAttack.svg").default
    },{
        id: 25,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'deflection',
        headline: 'Deflection',
        subheading: 'Cause a distraction.',
        instructions: 'Force a (often defensive) piece away from an important duty and you can reveal previously unseen tactical opportunities.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Deflection.svg").default
    },{
        id: 26,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'doubleCheck',
        headline: 'Double Check',
        subheading: 'Check x2',
        instructions: `When two pieces give check to the opposing king it is forced to move. This is incredibly can yield tremendous opporunities.`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/DoubleCheck.svg").default
    },{
        id: 27,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'exposedKing',
        headline: 'Exposed King',
        subheading: 'The king is vulnerable, capitalize.',
        instructions: 'World Champion Garry Kasparov stated that the most important strategic concept in chess is king safety.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/ExposedKing.svg").default
    },{
        id: 28,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'fork',
        headline: 'Fork',
        subheading: `It's one or the other.`,
        instructions: 'A fork is when a piece attacks two pieces at the same time - meaning one can always be taken.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Fork.svg").default
    },{
        id: 29,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'hangingPiece',
        headline: 'Hanging Piece',
        subheading: 'Find and capture the free material.',
        instructions: 'Generally, all pieces should be well defended at all times. Otherwise, material can often be lost...',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/HangingPiece.svg").default
    },{
        id: 30,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'interference',
        headline: 'Interference',
        subheading: `Disrupt the harmony of the opponent's position`,
        instructions: 'Interference is when the line between an attacked piece and its defender is interupted by sacrificing an interposing piece.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Interference.svg").default
    },{
        id: 31,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'intermezzo',
        headline: 'Intermezzo',
        subheading: `Disrupt your opponents idea by imposing an in-between move.`,
        instructions: 'An intermezzo, or in-between move, is characterized by the disruption of the opponents plan by an unexpected move that poses a severe threat.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Intermezzo.svg").default
    },{
        id: 32,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'kingsideAttack',
        headline: 'Kingside Attack',
        subheading: `Attack the kingside.`,
        instructions: 'Attacking on the kingside is an aggressive plan of action that can lead to decisive results due to pressure on the opposing king.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Kingsideattack2.png").default
    },{
        id: 33,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'pin',
        headline: 'Pin',
        subheading: `I'm pinned!`,
        instructions: 'When standing between an opposing piece and its king, a piece is said to be pinned. It is legally unable to move and therefore vulnerable.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Pin.svg").default
    },{
        id: 34,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'queensideAttack',
        headline: 'Queenside attack',
        subheading: `Attack the queenside`,
        instructions: 'Sometimes the action is away from the center.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Queensideattack.png").default
    },{
        id: 35,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'quietMove',
        headline: 'Quiet Move',
        subheading: `Focus on improving your position.`,
        instructions: 'Many of the most beautful moves in chess are not forcing moves, but rather set the stage for a decisive advantage.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/feather.png").default
    },{
        id: 36,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'sacrifice',
        headline: 'Sacrifice',
        subheading: `RIP`,
        instructions: 'Give up something to gain far more.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Sacrifice.svg").default
    },{
        id: 37,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'skewer',
        headline: 'Skewer',
        subheading: `Line em' up, and knock em' down.`,
        instructions: 'Attack two pieces at once and only one can evade your sight.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Skewer.svg").default
    },{
        id: 38,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'xRayAttack',
        headline: 'X-Ray Attack',
        subheading: `Hiding in plain sight.`,
        instructions: 'Vulnerable pieces need not be in the line of sight to be under attack. An x-ray attack, as the name suggests, exerts its influence through any obstructing material.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/XrayAttack.svg").default
    },{
        id: 39,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'trappedPiece',
        headline: 'Trapped Piece',
        subheading: `There is no escape.`,
        instructions: 'When a valuable piece has few squares left, be on the look out for ways to leave it with none at all.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/TrappedPiece.svg").default
    },

]

const excludedModules = [
    {
        id: 37,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'promotion',
        headline: 'Promotion',
        subheading: `I deserve a promotion.`,
        instructions: 'Push a pawn over the edge to seal your opponents fate.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Promotion.svg").default
    }
    ,{
        id: 23,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'coercion',
        headline: 'Coercion',
        subheading: `Force one of your opponent's pieces into a vulnerable position.`,
        instructions: 'A coercion tactic is the act of forcing your opponent to move a piece, often the king, to a location in whihch it is vulnerable to tactics.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Coercion.svg").default
    },{
        id: 41,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'simplification',
        headline: 'Simplification',
        subheading: `"If winning, clarify; if losing, complicate."`,
        instructions: 'It is good practice to trade pieces when you hold the advantage. Simplifying in this way opens a clearer path to victory.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Simplification.svg").default
    },{
        id: 43,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'underPromotion',
        headline: 'Under Promotion',
        subheading: `A queen may not be the best choice.`,
        instructions: 'In rare and exciting situtations, a Queen is less favorable than other pieces for sealing the game.',
        description: 'Lorem ipsum mah brudda',
        img: ''
    },{
        id: 27,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'enPassant',
        headline: 'En Passant',
        subheading: `Cature the pawn in passing.`,
        instructions: 'En passant is the unique rule that allows a pawn to capture annother pawn as it passes...',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/EnPassant.svg").default
    },{
        id: 33,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'overloading',
        headline: 'Overloading',
        subheading: `Your opponent can only do so many things at once.`,
        instructions: 'When an opposing defensive piece has too much responsibility, look to add even more pressure. This can have explosive effects...',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../Images/Overloading.svg").default
    },{
        id: 39,
        category: 'puzzle',
        type: 'earlygame',
        type_ref: 'castling',
        headline: 'Castling',
        subheading: `Protect the king!`,
        instructions: 'Castling is typically used to acheive king safety. In rare cases, it can also be used in the offensive.',
        description: 'Lorem ipsum mah brudda',
        img: ''
    }
]

/*
    {
        id: 3, // `eventually use random str as modules will be dynamic for each user and may change over time
        category: 'opening',
        type: 'C50',
        headline: 'Italian Game',
        subheading: 'Issa me. Mario.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        img: ""
    }
*/