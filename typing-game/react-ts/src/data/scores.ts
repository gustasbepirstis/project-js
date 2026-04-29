export type Score = {
    name: string,
    score: number,
    date: number,
}

export function loadScores(difficulty: string): Score[] {
    const raw = localStorage.getItem('scores') ?? '{}';
    const all = JSON.parse(raw);
    return all[difficulty] ?? [];
}

export function saveScore(name: string, score: number, difficulty: string) {
    const raw = localStorage.getItem('scores') ?? '{}';
    const all = JSON.parse(raw);
    const list: Score[] = all[difficulty] ?? [];
    list.push({ name, score, date: Date.now() });
    list.sort((a, b) => b.score - a.score);
    all[difficulty] = list.slice(0, 10);
    localStorage.setItem('scores', JSON.stringify(all));
}
