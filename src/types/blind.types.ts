export interface Level {
    smallBlind: number;
    bigBlind: number;
    duration: number;
    isBreak?: boolean;
}


export interface BlindPreset {
    id: string;
    name: string;
    levels: Level[];
}
