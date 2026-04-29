import { useState } from "react"
import Leaderboard from "../components/Leaderboard"
import { saveScore } from "../data/scores";

type Props = {
    onTryAgain: () => void,
    score: number,
    charsPerSecond: string,
    difficulty: string
}

function Submit({ score, charsPerSecond, difficulty, onTryAgain }: Props) {
    const [submissionName, setSubmissionName] = useState("");
    const [refresh, setRefresh] = useState(0);

    return(
        <>
        <div className="stats" id="stats">
            <div className="submission">
                <div className="run-stats">
                    <div className="run-stats-details">
                        <span>Score:</span>
                        <span>{score}</span>
                    </div>
                    <div className="run-stats-details">
                        <span>Chars/s:</span>
                        <span>{charsPerSecond}</span>
                    </div>
                </div>
                <span>Difficulty: <b>{difficulty}</b></span>
                <input 
                    type="text" 
                    onChange={(e) => setSubmissionName(e.target.value)}
                />
                <button onClick={() => {
                    refresh == 0 && saveScore(submissionName, score, difficulty)
                    setRefresh(refresh + 1)
                    }
                }>Submit</button>
                <button onClick={() => onTryAgain()}>Try Again</button>
            </div>
            <Leaderboard difficulty={difficulty}/>
        </div>
        </>
    )
}

export default Submit