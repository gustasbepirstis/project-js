import { useState } from "react";

type Props = {
    currentWord: string,
    onMatch: () => void,
}

function TypingInput({ currentWord, onMatch }: Props) {
    const [value, setValue] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const typed = event.target.value;
        if (typed == currentWord) {
            setValue("");
            onMatch();
        }
        else {
            setValue(typed);
        }

        
    }

    return (
        <input
            type="text"
            autoComplete="off"
            value={value}
            onChange={handleChange}
        />
    )
}

export default TypingInput
