


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
        img: require("../../../../../Images/Endgame_shuffle.svg").default 
    }
]

export const Modules = [
    {
        id: 1,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'endgame',
        headline: 'Endgame Shuffle',
        subheading: "Endgame Tactics",
        instructions: 'Confidence in the endgame can be the difference in a close game.',
        description: 'A mixture of all endgame strategies',
        img: require("../../../../../Images/Endgame_shuffle.svg").default
    },{
        id: 64, // `eventually use random str as modules will be dynamic for each user and may change over time
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'bishopEndgame',
        headline: 'Bishop Endgame',
        subheading: "Endgame Tactics",
        instructions: 'Depending on the color of the bishop, it can often guard a promotional square',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        img: require("../../../../../Images/Bishop.png").default
    },
    {
        id: 3,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'knightEndgame',
        headline: 'Knight Endgame',
        subheading: "Endgame Tactics",
        instructions: `The knight is particularly effective at fork tactics, which can be difficult for one's opponent to spot`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Knight.png").default
    },{
        id: 4,
        category: 'puzzle',
        type: 'endgame',
        headline: 'Pawn Endgame',
        type_ref: 'pawnEndgame',
        subheading: "Endgame Tactics",
        instructions: 'A pawn can become a huge focal point in the endgame when promotion is in sight.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Pawn.png").default
    },{
        id: 5,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'queenEndgame',
        headline: 'Queen Endgame',
        subheading: "Endgame Tactics",
        instructions: 'The queen is an incredibly powerful piece in the endgame - look for it to traverse large swaths of the board in the endgame.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Checkmate.svg").default
    },{
        id: 6,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'rookEndgame',
        headline: 'Rook Endgame',
        subheading: "Endgame Tactics",
        instructions: 'Look to capitalize on open files and ranks to check the opposing king and track down dangerous pawns.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Rook.png").default
    },{
        id: 7,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'queenRookEndgame',
        headline: 'Queen and Rook Endgame',
        subheading: "Endgame Tactics",
        instructions: 'Look to trap the opposing kingQu with this powerful duo.',
        description: 'Lorem ipsum mah brudda',
        img: require('../../../../../Images/queenrook.png').default
    },{
        id: 8,
        category: 'puzzle',
        type: 'endgame',
        type_ref: 'zugzwang',
        headline: 'Zugzwang',
        subheading: "Endgame Tactics",
        instructions: 'Zugzwang is a situation in which one player is at a disadvantage because of their obligation to make a move.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Zugzwang.svg").default
    },
    {
        id: 9,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'bodenMate',
        headline: `Boden's Mate`,
        subheading: "Checkmates",
        instructions: `This classic bishop mating pattern involves two opposite facing bishops removing the opposing king's flight squares while delivering checkmate`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/BodensMate.svg").default
    },{
        id: 10,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'doubleBishopMate',
        headline: 'Double Bishop Mate',
        subheading: "Checkmates",
        instructions: 'The bishop pair is coveted due to their combined ability to attack all squares. This can leave the opposing king with nowhere to run.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/2bishops.png").default
    },{
        id: 11,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'dovetailMate',
        headline: 'Dovetail Mate',
        subheading: "Checkmates",
        instructions: 'The Queen gives checkmate while the opposing king has no flight squares due to the obstructing pieces at its side.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Dove.svg").default
    },{
        id: 12,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'hookMate',
        headline: 'Hook Mate',
        subheading: "Checkmates",
        instructions: `Named after its resemblence to a hook, this checkmate pattern demonstrates the perfect coordination between the rook and knight.`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Hook.svg").default
    },{
        id: 13,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'mate',
        headline: 'Checkmate Shuffle',
        subheading: "Checkmates",
        instructions: 'Deliver checkmate any way you can.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Checkmate.svg").default
    },{
        id: 14,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'smotheredMate',
        headline: 'Smothered Mate',
        subheading: "Checkmates",
        instructions: 'The opposing king can sometimes become trapped by his own pieces. Find the sequence of moves that causes the opposing pieces to trap their own king and deliver a beautiful checkmate.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/SmotheredMate.svg").default
    },{
        id: 15,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'attackingF2F7',
        headline: 'Attack f2f7',
        subheading: "Midgame Tactics",
        instructions: 'The squares F2 and F7 are common sources of weakness in a position. Exploit this weakness by capitalizing on this pressure.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/AttackingF2F7.svg").default
    },{
        id: 16,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'attraction',
        headline: 'Attraction',
        subheading: "Midgame Tactics",
        instructions: 'This motif typically involves a sacrifice which lures or decoys an opposing piece to move to a square in which it can be exploited or attacked.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Attraction.svg").default
    },{
        id: 17,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'backRankMate',
        headline: 'Back Rank Mate',
        subheading: "Checkmates",
        instructions: 'When the king is on the back rank, there is limited room for escape. Look to deliver check when the opposing king has nowhere to go.',
        description: 'Lorem ipsum mah brudda',
        img:require("../../../../../Images/BackRankMate.svg").default
    },{
        id: 18,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'capturingDefender',
        headline: 'Capturing Defender',
        subheading: "Midgame Tactics",
        instructions: 'Often a key piece will stand in defense in the opponents position. Capturing it can open up tactical opportunities...',
        description: 'Lorem ipsum mah brudda',
        img:require("../../../../../Images/Capturingdefender.png").default
    },{
        id: 19,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'clearance',
        headline: 'Clearance',
        subheading: "Midgame Tactics",
        instructions: 'Your own pieces can sometimes get in the way. Move them by any means necessary and you can open up excellent opportunities.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Clearance.svg").default
    },{
        id: 20,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'defensiveMove',
        headline: 'Defensive Move',
        subheading: "Midgame Tactics",
        instructions: 'Look to defend your position and king while maintaining or gaining an advantage',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/DefensiveMoves.svg").default
    },{
        id: 21,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'discoveredAttack',
        headline: 'Discovered Attack',
        subheading: "Midgame Tactics",
        instructions: 'A piece moves - often by giving check - and reveals an attack on an opposing piece which is vulnerable to tactics',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/DiscoveredAttack.svg").default
    },{
        id: 22,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'deflection',
        headline: 'Deflection',
        subheading: "Midgame Tactics",
        instructions: 'Force a (often defensive) piece away from an important duty and you can reveal previously unseen tactical opportunities.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Deflection.svg").default
    },{
        id: 23,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'doubleCheck',
        headline: 'Double Check',
        subheading: "Midgame Tactics",
        instructions: `When two pieces give check to the opposing king it is forced to move. This is incredibly can yield tremendous opporunities.`,
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/DoubleCheck.svg").default
    },{
        id: 24,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'exposedKing',
        headline: 'Exposed King',
        subheading: "Midgame Tactics",
        instructions: 'World Champion Garry Kasparov stated that the most important strategic concept in chess is king safety.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/ExposedKing.svg").default
    },{
        id: 25,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'fork',
        headline: 'Fork',
        subheading: "Midgame Tactics",
        instructions: 'A fork is when a piece attacks two pieces at the same time - meaning one can always be taken.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Fork.svg").default
    },{
        id: 26,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'hangingPiece',
        headline: 'Hanging Piece',
        subheading: "Midgame Tactics",
        instructions: 'Generally, all pieces should be well defended at all times. Otherwise, material can often be lost...',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/HangingPiece.svg").default
    },{
        id: 27,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'interference',
        headline: 'Interference',
        subheading: "Midgame Tactics",
        instructions: 'Interference is when the line between an attacked piece and its defender is interrupted by sacrificing an interposing piece.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Interference.svg").default
    },{
        id: 28,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'intermezzo',
        headline: 'Intermezzo',
        subheading: "Midgame Tactics",
        instructions: 'An intermezzo, or in-between move, is characterized by the disruption of the opponents plan by an unexpected move that poses a severe threat.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Intermezzo.svg").default
    },{
        id: 29,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'kingsideAttack',
        headline: 'Kingside Attack',
        subheading: "Midgame Tactics",
        instructions: 'Attacking on the kingside is an aggressive plan of action that can lead to decisive results due to pressure on the opposing king.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Kingsideattack2.png").default
    },{
        id: 30,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'pin',
        headline: 'Pin',
        subheading: "Midgame Tactics",
        instructions: 'When standing between an opposing piece and its king, a piece is said to be pinned. It is legally unable to move and therefore vulnerable.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Pin.svg").default
    },{
        id: 31,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'queensideAttack',
        headline: 'Queenside Attack',
        subheading: "Midgame Tactics",
        instructions: 'Sometimes the action is away from the center.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Queensideattack.png").default
    },{
        id: 32,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'quietMove',
        headline: 'Quiet Move',
        subheading: "Midgame Tactics",
        instructions: 'Many of the most beautful moves in chess are not forcing moves, but rather set the stage for a decisive advantage.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/feather.png").default
    },{
        id: 33,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'sacrifice',
        headline: 'Sacrifice',
        subheading: "Midgame Tactics",
        instructions: 'Give up something to gain far more.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Sacrifice.svg").default
    },{
        id: 34,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'skewer',
        headline: 'Skewer',
        subheading: "Midgame Tactics",
        instructions: 'Attack two pieces at once and only one can evade your sight.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Skewer.svg").default
    },{
        id: 35,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'xRayAttack',
        headline: 'X-Ray Attack',
        subheading: "Midgame Tactics",
        instructions: 'Vulnerable pieces need not be in the line of sight to be under attack. An x-ray attack, as the name suggests, exerts its influence through any obstructing material.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/XrayAttack.svg").default
    },{
        id: 36,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'trappedPiece',
        headline: 'Trapped Piece',
        subheading: "Midgame Tactics",
        instructions: 'When a valuable piece has few squares left, be on the look out for ways to leave it with none at all.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/TrappedPiece.svg").default
    },
    {
        id: 37,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'promotion',
        headline: 'Promotion',
        subheading: "Midgame Tactics",
        instructions: 'Push a pawn over the edge to seal your opponents fate.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Promotion.svg").default
    },{
        id: 38,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'advancedPawn',
        headline: 'Advanced Pawn',
        subheading: "Midgame Tactics",
        instructions: 'Clear the way for an advanced pawn to pave a path to victory. But beware allowing your opponenent to do the same.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/AdvancedPawn.svg").default
    },{
        id: 39,
        headline: "Ruy Lopez",
        subheading: "E4 Openings",
        type_ref: 'ruyLopez',
        category: "opening",
        pawn: "e4",
        moves: "e2e4 e7e5 g1f3 b8c6 f1b5",
        img: require("../../../../../Images/open-book.svg").default

      },{
        id: 40,
        category: "opening",
        headline: "Closed Spanish",
        subheading: "E4 Openings",
        type_ref: 'closedSpanish',
        pawn: "e4",
        moves: "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 d7d6 c2c3 e8g8 h2h3",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 41,
        category: "opening",
        headline: "Open Spanish",
        subheading: "E4 Openings",
        type_ref: 'openSpanish',
       pawn: "e4",
        moves: "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f6e4 d2d4",
        img: require("../../../../../Images/open-book.svg").default 
      },{
        id: 42,
        category: "opening",
        headline: "Marshall Attack",
        subheading: "E4 Openings",
        type_ref: 'marshallAttack',
        pawn: "e4",
        moves: "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 e8g8 c2c3 d7d5 e4d5",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 43,
        category: "opening",
        headline: "Berlin Defense",
        subheading: "E4 Openings",
        type_ref: 'berlinDefense',
        pawn: "e4",
        moves: "e2e4 e7e5 g1f3 b8c6 f1b5 g8f6 e1g1",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 44,
        category: "opening",
        headline: "Giuoco Piano",
        subheading: "E4 Openings",
        type_ref: 'giuocoPiano',
        pawn: "e4",
        moves: "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6 d2d4",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 45,
        category: "opening",
        headline: "Fried Liver Attack",
        subheading: "E4 Openings",
        type_ref: 'friedLiverAttack',
        pawn: "e4",
        moves: "e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 f3g5 d7d5 e4d5 f6d5 g5f7 e8f7 d1f3",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 46,
        category: "opening",
        headline: "Philidor Defense",
        subheading: "E4 Openings",
        pawn: "e4",
        moves: "e2e4 e7e5 g1f3 d7d6 d2d4 c8g4 d4e5 g4f3 d1f3 d6e5 f1c4",
        img: require("../../../../../Images/open-book.svg").default
    
      },{
        id: 47,
        category: "opening",
        headline: "English: King's Pawn",
        subheading: "C4 Openings",
        type_ref: 'englishKingsPawn',
        pawn: "c4",
        moves: "c2c4 e7e5 g2g3 g8f6 f1g2 d7d5 c4d5 f6d5 b1c3",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 51,
        category: "opening",
        headline: "English: Anglo-Indian",
        subheading: "C4 Openings",
        type_ref: 'englishAngloIndian',
        pawn: "c4",
        moves: "c2c4 g8f6 d2d4 g7g6 b1c3 f8g7 e2e4 d7d6 g1f3",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 52,
        category: "opening",
        headline: "English: 2.Nc3",
        subheading: "C4 Openings",
        type_ref: 'english2Nc3',
        pawn: "c4",
        moves: "c2c4 e7e5 b1c3 g8f6 g1f3 b8c6 g2g3 d7d5 c4d5 f6d5",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 53,
        category: "opening",
        headline: "Queen's Gambit Declined",
        subheading: "D4 Openings",
        type_ref: 'queensGambitDeclined',
        pawn: "d4",
        moves: "d2d4 d7d5 c2c4 e7e6 b1c3 c7c6 g1f3",
        img: require("../../../../../Images/open-book.svg").default
      },{
        id: 54,
        category: "opening",
        headline: "Queen's Gambit Accepted",
        subheading: "D4 Openings",
        type_ref: 'queensGambitAccepted',
        pawn: "d4",
        moves: "d2d4 d7d5 c2c4 d5c4 e2e4 e7e5 g1f3 e5d4 f1c4 b8c6 e1g1",
        img: require("../../../../../Images/open-book.svg").default
      }, {
        id: 55,
        category: "opening",
        headline: "Scandinavian",
        subheading: "D4 Openings",
        type_ref: 'scandinavian',
        pawn: "d4",
        moves: "e2e4 d7d5 e4d5 g8f6 d2d4 f6d5 g1f3 g7g6 c2c4 d5b6 b1c3",
        img: require("../../../../../Images/open-book.svg").default
      },{
          id: 56,
          category: "opening",
          headline: "Closed Sicilian",
          subheading: "E4 Openings",
          type_ref: 'closedSicilian',
          pawn: "e4",
          moves: "e2e4 c7c5 g1f3 d7d6 f1b5 b8c6 e1g1",
          img: require("../../../../../Images/open-book.svg").default
      },{
          id: 57,
          category: "opening",
          headline: "Open Sicilian",
            subheading: "E4 Openings",
            pawn: "e4",
            moves: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 c1e3 e7e5 d4b3 c8e6 f2f3",
            img: require("../../../../../Images/open-book.svg").default
      },{
            id: 58,
            category: "opening",
            headline: "Petrov's Defense",
            subheading: "E4 Openings",
            type_ref: 'petrovDefense',
            pawn: "e4",
            moves: "e2e4 e7e5 g1f3 g8f6 f3e5 d7d6 e5f3 f6e4 d2d4 d6d5 f1d3 b8c6 e1g1",
            img: require("../../../../../Images/open-book.svg").default
      }, {
            id: 59,
            category: "opening",
            headline: "French Defense: Winawer Variation",
            subheading: "E4 Openings",
            type_ref: 'frenchDefenseWinawer',
            pawn: "e4",
            moves: "e2e4 e7e6 d2d4 d7d5 b1c3 f8b4 e4e5 c7c5 a2a3 b4c3 b2c3 g8e7 d1g4",
            img: require("../../../../../Images/open-book.svg").default
      },{
            id: 60,
            category: "opening",
            headline: "French Defense: Classical Variation",
            subheading: "E4 Openings",
            type_ref: 'frenchDefenseClassical',
            pawn: "e4",
            moves: "e2e4 e7e6 d2d4 d7d5 b1c3 g8f6 e4e5 f6d7 f2f4 c7c5 g1f3 b8c6 c1e3",
            img: require("../../../../../Images/open-book.svg").default
      }, {
            id: 61,
            category: "opening",
            headline: "Caro-Kann Defense",
            subheading: "E4 Openings",
            type_ref: 'caroKannDefense',
            pawn: "e4",
            moves: "e2e4 c7c6 d2d4 d7d5 e4e5 c8f5 g1f3 e7e6 f1e2 b8d7 e1g1",
            img: require("../../../../../Images/open-book.svg").default
      }, {
          id: 62,
          category: "opening",
          headline: "Queen's Indian Defense",
            subheading: "D4 Openings",
            type_ref: 'queensIndian',
          pawn: "d4",
          moves: "d2d4 g8f6 c2c4 e7e6 g1f3 b7b6",
            img: require("../../../../../Images/open-book.svg").default
      }, {
          id: 63,
          category: "opening",
          headline: "King's Indian Defense",
            subheading: "D4 Openings",
            type_ref: 'kingsIndian',
          pawn: "d4",
          moves: "d2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 g1f3 e8g8 f1e2 e2e5 e1g1",
            img: require("../../../../../Images/open-book.svg").default
    },{
        id: 2, // `eventually use random str as modules will be dynamic for each user and may change over time
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'mix',
        headline: 'Healthy Mix',
        subheading: "Pattern Recognition",
        instructions: 'A healthy mix of puzzles from all categories and themes.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        img: require("../../../../../Images/Books.svg").default
    }
]

// variations/not included
const excludedOPenings = [{
    id: 64,
    headline: "English: King's Pawn 2",
    pawn: "c4",
    moves: "c2c4 e7e5 g2g3 b8c6 f1g2 f8c5 b1c3 g8f6 e2e3"
  },{
    id: 49,
    headline: "English: King's Pawn 3",
    pawn: "c4",
    moves: "c2c4 e7e5 g2g3 f7f5 b1c3 g8f6 d2d3"
  },{
    id: 50,
    headline: "English: King's Pawn 4",
    pawn: "c4",
    moves: "c2c4 e7e5 g2g3 g8f6 f1g2 c7c6 d2d4 e5d4 d1d4"
  },{
    id: 55,
    headline: "English: 2.Nc3 2",
    pawn: "c4",
    moves: "c2c4 e7e5 b1c3 g8f6 g1f3 b8c6 e2e3 f1b4 d1c2 d7d6"
  },{
    id: 52,
    headline: "English: Anglo-Indian 2",
    pawn: "c4",
    moves: "c2c4 g8f6 d2d4 e7e6 b1c3 f8b4 e2e3 e8g8 c1d2"
  },{
    id: 53,
    headline: "Scandinavian: Mieses Variaton",
    pawn: "e4",
    moves: "e2e4 d7d5 e4d5 d8d5 b1c3 d2d4 g8f6 g1f3 c7c6 f1c4"
  },{
    id: 53,
    category: "opening",
    headline: "English: Anglo-Indian 3",
    type_ref: 'englishAngloIndian3',
    pawn: "c4",
    moves: "c2c4 g8f6 d2d4 e7e6 b1c3 f8b4 d1c2 e8g8 a2a3 "
  }]

const excludedModules = [{
    id: 64, // `eventually use random str as modules will be dynamic for each user and may change over time
    category: 'puzzle',
    type: 'endgame',
    type_ref: 'bishopEndgame',
    headline: 'Bishop Endgame',
    subheading: "Pattern Recognition",
    instructions: 'Depending on the color of the bishop, it can often guard a promotional square',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    img: require("../../../../../Images/Bishop.png").default
},{
        id: 65,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'coercion',
        headline: 'Coercion',
        subheading: "Pattern Recognition",
        instructions: 'A coercion tactic is the act of forcing your opponent to move a piece, often the king, to a location in whihch it is vulnerable to tactics.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Coercion.svg").default
    },{
        id: 66,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'simplification',
        headline: 'Simplification',
        subheading: "Pattern Recognition",
        instructions: 'It is good practice to trade pieces when you hold the advantage. Simplifying in this way opens a clearer path to victory.',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Simplification.svg").default
    },{
        id: 67,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'enPassant',
        headline: 'En Passant',
        subheading: "Pattern Recognition",
        instructions: 'En passant is the unique rule that allows a pawn to capture annother pawn as it passes...',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/EnPassant.svg").default
    },{
        id: 68,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'overloading',
        headline: 'Overloading',
        subheading: "Pattern Recognition",
        instructions: 'When an opposing defensive piece has too much responsibility, look to add even more pressure. This can have explosive effects...',
        description: 'Lorem ipsum mah brudda',
        img: require("../../../../../Images/Overloading.svg").default
    },{
        id: 69,
        category: 'puzzle',
        type: 'earlygame',
        type_ref: 'castling',
        headline: 'Castling',
        subheading: "Pattern Recognition",
        instructions: 'Castling is typically used to acheive king safety. In rare cases, it can also be used in the offensive.',
        description: 'Lorem ipsum mah brudda',
        img: ''
    },{
        id: 70,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'anastasiaMate',
        headline: `Anastasia's Mate`,
        subheading: "Pattern Recognition",
        instructions: `The knight defends the opposing king's flight squares while the rook delivers checkmate in the style of a back rank mate`,
        description: 'Lorem ipsum mah brudda',
        img: ''
    },{
        id: 71,
        category: 'puzzle',
        type: 'checkmate',
        type_ref: 'arabianMate',
        headline: 'Arabian Mate',
        subheading: "Pattern Recognition",
        instructions: 'The knight often removes a flight square while the rook delivers checkmate in this classic motif.',
        description: 'Lorem ipsum mah brudda',
        img: ''
    },{
        id:72,
        category: 'puzzle',
        type: 'midgame',
        type_ref: 'underPromotion',
        headline: 'Under Promotion',
        subheading: "Pattern Recognition",
        instructions: 'In rare and exciting situtations, a Queen is less favorable than other pieces for sealing the game.',
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
