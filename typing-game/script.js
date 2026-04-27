const startButton = document.getElementById("start");
const startButton2 = document.getElementById("submission-try-again");

const difficultySelect = document.getElementById("difficulty");
const timeText = document.getElementById("time");
const scoreText = document.getElementById("score");
const inputField = document.getElementById("inputField");

const currentWordText = document.getElementById("current-word");
const nextWordText = document.getElementById("next-word");
const nextNextWordText = document.getElementById("next-next-word");
const wordPrompts = [currentWordText, nextWordText, nextNextWordText];

const settingsPanel = document.getElementById("settings");
const gamePanel = document.getElementById("game");
const submissionPanel = document.getElementById("stats");

const finalScoreText = document.getElementById("final-score");
const finalCpsText = document.getElementById("final-cps");

const gameplayLeaderboard = document.getElementById("gameplay-leaderboard");
const submissionLeaderboard = document.getElementById("submission-leaderboard");
const submissionButton = document.getElementById("submission-button");
const submissionName = document.getElementById("submission-name");
const submissionDifficulty = document.getElementById("submission-difficulty");

const words = [
    "gullible",
    "thoughtless",
    "bravery",
    "almighty",
    "omniscience",
    "operator",
    "altruistic",
    "menacing",
    "population",
    "refridgerator",
    "triumph",
    "choose",
    "twiddle",
    "nauseous",
    "packaging",
    "twitchy",
    "especially",
    "swagger",
    "pretentious",
    "vicious",
    "murder",
    "speedster",
    "impervious",
    "coalescence",
    "expedition",
    "terrarium"
]

var time = 10;
var totalTimeElapsed = 0;
var score = 0;
var totalCharsSubmitted = 0;

// # ---- ui states

startButton.addEventListener('click', () => {
    console.log("start clicked, difficulty: " + difficultySelect.value);
    StartCountdown();
});

startButton2.addEventListener('click', () => {
    console.log("try again clicked");
    RenderPanel("settings");
});

submissionButton.addEventListener('click', () => {
    console.log("submitting score...");
    SaveScore(submissionName.value, score, difficultySelect.value);
    RenderLeaderboard(submissionLeaderboard, difficultySelect.value);
})

RenderPanel("settings");

function StartCountdown() {
    time = 10;
    UpdateTime(0);
    totalTimeElapsed = 10;
    score = 0;
    totalCharsSubmitted = 0;
    RenderPanel("game");
    wordPrompts[0].innerText = "3";
    wordPrompts[1].innerText = "";
    wordPrompts[2].innerText = "";
    RenderLeaderboard(gameplayLeaderboard, difficultySelect.value);

    timerId = setInterval(() => {
        switch (wordPrompts[0].innerText) {
            case "1":
                StartGame();
                clearInterval(timerId);
                break;
            case "2":
                wordPrompts[0].innerText = "1";
                wordPrompts[1].innerText = "2";
                wordPrompts[2].innerText = "3";
                break;
            case "3":
                wordPrompts[0].innerText = "2";
                wordPrompts[1].innerText = "3"; 
                break;
        }
    }, 1000);
}

function StartGame() {
    inputField.addEventListener("input", handleTyping);
    for (var i = 0; i < 3; i++) {
        wordPrompts[i].innerText = GetRandomUnusedWord();
    }
    timerIdGame = setInterval(() => {
        if (time == 0) {
            EndGame();
            clearInterval(timerIdGame);
        }
        UpdateTime(-1);
    }, 1000);
}

function EndGame() {
    inputField.removeEventListener("input", handleTyping);
    RenderPanel("submit");
    RenderLeaderboard(submissionLeaderboard, difficultySelect.value)
    finalScoreText.innerText = score;
    finalCpsText.innerText = (parseFloat(totalCharsSubmitted) / parseFloat(totalTimeElapsed)).toFixed(1);
    submissionDifficulty.innerText = difficultySelect.value;
    console.log("totalCharsSubmitted " + totalCharsSubmitted);
    console.log("totalTimeElapsed " + totalTimeElapsed);
}


// # -------- random bullshit 

function UpdateTime(change) {
    time += change;
    if (time < 0) time = 0;
    timeText.innerText = time + "s";
}

function IncrementScore() {
    score++;
    scoreText.innerText = score;
    switch(difficultySelect.value) {
        case "easy":
            UpdateTime(4);
            totalTimeElapsed += 4;
            break;
        case "medium":
            UpdateTime(2);
            totalTimeElapsed += 2;
            break;
        case "hard":
            UpdateTime(1);
            totalTimeElapsed += 1;
            break;
    }
}

function GetRandomUnusedWord() {
    const used = new Set();
    for (var i = 0; i < 3; i++) {
        used.add(wordPrompts[i].innerText)
    }
    const unused = words.filter(w => !used.has(w));
    return unused[getRandomInt(0, unused.length - 1)]
}

function CycleWords() {
    wordPrompts[0].innerText = wordPrompts[1].innerText;
    wordPrompts[1].innerText = wordPrompts[2].innerText;
    wordPrompts[2].innerText = GetRandomUnusedWord();
}

function handleTyping(event) {
    const writtenWord = event.target.value;
    if (writtenWord === wordPrompts[0].innerText) {
        totalCharsSubmitted += wordPrompts[0].innerText.length
        event.target.value = "";
        CycleWords();
        IncrementScore();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SaveScore(name, score, difficulty){
    const all = JSON.parse(localStorage.getItem('scores') ?? '{}');
    const list = all[difficulty] ?? [];
    list.push({name, score, date: Date.now() });
    list.sort((a, b) => b.score - a.score);
    all[difficulty] = list.slice(0, 10);
    localStorage.setItem('scores', JSON.stringify(all));
}

function LoadScores(difficulty) {
    const all = JSON.parse(localStorage.getItem('scores') ?? '{}');
    return all[difficulty] ?? [];
}

function RenderLeaderboard(container, difficulty) {
    var scoresRendered = 0;
    const scores = LoadScores(difficulty);
    container.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = '<tr><td>#</td><td>name</td><td>score</td></tr>';

    for (let i = 0; i < scores.length; i++) {
        const row = table.insertRow();
        row.insertCell().textContent = i + 1;
        row.insertCell().textContent = scores[i].name;
        row.insertCell().textContent = scores[i].score;
        scoresRendered++;
    }
    if (scoresRendered != 10) {
        for (let i = scoresRendered; i < 10; i++) {
            const row = table.insertRow();
            row.insertCell().textContent = i + 1;
            row.insertCell().textContent = "#-#-#-#-#-#-#-#-#";
            row.insertCell().textContent = "0";
            scoresRendered++;
        }
    }

    container.appendChild(table);
} 

function RenderPanel(panel) {
    switch (panel) {
        case "settings":
            settingsPanel.hidden = false;
            gamePanel.hidden = true;
            submissionPanel.hidden = true;
            break;
        case "game":
            settingsPanel.hidden = true;
            gamePanel.hidden = false;
            submissionPanel.hidden = true;
            break;
        case "submit":
            settingsPanel.hidden = true;
            gamePanel.hidden = true;
            submissionPanel.hidden = false;
            break;
        case "leaderboard":
            break;
    }
}