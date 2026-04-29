import { useState } from 'react'
import Settings from './screens/Settings';
import Game from './screens/Game';
import Submit from './screens/Submit';
import './App.css'

type Screen = 
  | "settings"
  | "game"
  | "submit"

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("settings");
  const [difficulty, setDifficulty] = useState('medium');
  const [finalScore, setFinalScore] = useState(0);
  const [finalCharsPerSecond, setFinalCharsPerSecond] = useState("");

  return (
    <>
      { currentScreen == "settings" && 
        <Settings 
          onStart={() => setCurrentScreen("game")}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      }

      { currentScreen == "game" && 
        <Game 
          difficulty={difficulty}
          onGameEnd={(score, charsPerSecond) => {
            setFinalScore(score)
            setFinalCharsPerSecond(charsPerSecond)
            setCurrentScreen("submit");}
          }
        /> 
      }

      { currentScreen == "submit" && 
        <Submit 
          score={finalScore}
          difficulty={difficulty}
          charsPerSecond={finalCharsPerSecond}
          onTryAgain={() => setCurrentScreen("settings")}
        />
      }
    </>
  )
}

export default App
