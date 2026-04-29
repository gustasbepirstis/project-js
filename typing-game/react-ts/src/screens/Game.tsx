import { useEffect, useState } from "react";
import { getRandomUnusedWord } from "../data/words";
import TypingInput from "../components/TypingInput";
import WordSlots from "../components/WordSlots";
import Leaderboard from "../components/Leaderboard";

type Props = {
    onGameEnd: (finalScore: number, finalCharsPerSecond: string) => void,
    difficulty: string,
}

// countdown -> playing -> gameover
function Game({ difficulty, onGameEnd }: Props) {
    const [phase, setPhase] = useState<'countdown' | 'playing'>('countdown');
    const [countdown, setCountdown] = useState(3);
    const [time, setTime] = useState(10);
    const [slots, setSlots] = useState<[string, string, string]>(['', '', '']);
    const [score, setScore] = useState(0);
    const [totalChars, setTotalChars] = useState(0);
    const [totalTime, setTotalTime] = useState(time);

    // start countdown timer
    useEffect(() => {
        if (phase !== 'countdown') return;
        const id = setInterval(() => {
            setCountdown(c => c - 1)
        }, 1000);
        
        return () => { 
            clearInterval(id);
        }
    }, [phase]);

    // transition to playing
    useEffect(() => {
        if (phase === 'countdown' && countdown <= 0) {
            setPhase('playing'); 
            setSlots([getRandomUnusedWord(['']), getRandomUnusedWord(['']), getRandomUnusedWord([''])]);
        }
    }, [phase, countdown]);

    // start playing timer
    useEffect(() => {
        if (phase !== 'playing') return;
        const id = setInterval(() => setTime(t => t - 1), 1000);

        return () => {
            clearInterval(id);
        }
    }, [phase]);

    // end the game
    useEffect(() => {
        if (phase === 'playing' && time <= 0) onGameEnd(score, (totalChars / totalTime).toFixed(1));
    }, [phase, time, onGameEnd]);


    function onMatch() {
        setTotalChars(totalChars + slots[0].length);
        setSlots([slots[1], slots[2], getRandomUnusedWord([slots[1], slots[2]])]);
        setScore(score + 1);
        setTime(time + timeIncrease(difficulty));
        setTotalTime(totalTime + timeIncrease(difficulty));
    }

    function timeIncrease(difficulty: string) {
        switch (difficulty) {
            case "easy": return 3;
            case "medium": return 2;
            case "hard": return 1;
            default: return 0;
        }
    }

    return(
        <>
        <div className="game">
            <div className="score-box">
                <span>Time Left: {time}</span>
                <span>Score: <span id="score">{score}</span></span>
            </div>

            <div className="game-box">
                {phase === 'countdown'
                    ? <div className="countdown">{countdown}</div>
                    : <WordSlots slots={slots} />
                }
                <TypingInput onMatch={() => onMatch()} currentWord={slots[0]}/>
            </div>

            <Leaderboard difficulty={difficulty}/>
        </div>
        </>
    )
}

export default Game