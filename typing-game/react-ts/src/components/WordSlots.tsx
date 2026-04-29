type Props = {
    slots: [string, string, string],
}

function WordSlots({ slots }: Props) {
    return (
        <>
        <div className="game-box">
            <span className="next-word">{slots[2]}</span>
            <span className="next-word">{slots[1]}</span>
            <span className="current-word">{slots[0]}</span>
        </div>
        </>
    )
}

export default WordSlots
