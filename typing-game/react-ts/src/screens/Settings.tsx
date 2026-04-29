type Props = {
    onStart: () => void,
    setDifficulty: (d: string) => void,
    difficulty: string,
}

function Settings({ onStart, setDifficulty, difficulty }: Props) {
    return (
        <>
        <div className="settings" id="settings">
            <label>Type Fast</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button onClick={() => onStart()}>Start</button>
        </div>
        </>
    )
}

export default Settings