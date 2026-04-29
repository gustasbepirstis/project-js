import { loadScores } from "../data/scores";

type Props = {
    difficulty: string,
}

function Leaderboard({ difficulty }: Props) {
    const scores = loadScores(difficulty);

    const rows = [];
    for (let i = 0; i < 10; i++) {
        if (i < scores.length) {
            rows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{scores[i].name}</td>
                    <td>{scores[i].score}</td>
                </tr>
            );
        } else {
            rows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>#-#-#-#-#-#-#-#-#</td>
                    <td>0</td>
                </tr>
            );
        }
    }

    return (
        <div className="leaderboard-box">
            <table className="leaderboard">
                <tbody>
                    <tr><td>#</td><td>name</td><td>score</td></tr>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
