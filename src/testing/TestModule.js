import PuzzlePage from '../components/Module/Puzzle/PuzzlePage';

const puzzles = [{
fen: 'r4rk1/2pp1p1p/b7/p1b1p3/4P3/PPNP1N1P/1P3Pq1/R2QK2R w KQ - 0 15',
moves: "h1g1 c5f2 e1d2 f2g1"
},{
    fen: "3q2k1/1p3p1p/5bp1/pB1n4/P3P2r/1P2QP2/6PP/3R2K1 w - - 0 34",
    moves: "d1d5 d8d5 e4d5 f6d4 e3d4 h4d4",
}]

export default function TestModule() {

    const puzzleIsFinished = () => {
        console.log('puzzleIsFinished');
    }

    return(
        <>
        <PuzzlePage puzzles={puzzles} theme={'anastasiaMate'} puzzleIsFinished={puzzleIsFinished} isDaily={false}/>
        </>
    )
} 