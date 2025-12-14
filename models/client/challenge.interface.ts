export enum ChallengeDifficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

export enum ChallengeType {
    cardio = "cardio",
    strength = "strength",
    hiit = "hiit",
    endurance = "endurance",
    mobility = "mobility",
}

export enum ChallengeVisibility {
    public = "public",
    private = "private",
}

export interface Challenge {
    _id: string;
    creator: string;
    title: string;
    description: string;
    difficulty: ChallengeDifficulty;
    type: ChallengeType;
    durationMinutes: number;
    exerciseTypes: string[];
    goals: {
        sessionsTarget?: number;
        caloriesTarget?: number;
    };
    visibility: ChallengeVisibility;
}