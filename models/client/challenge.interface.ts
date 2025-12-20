import {Gym, User} from "../super_admin";

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

export enum ChallengeOrigin {
    community = "community",
    gym = "gym",
}

export enum ChallengeApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
}

export interface ChallengeGoals {
    sessionsTarget?: number;
    caloriesTarget?: number;
}

export interface Challenge {
    _id: string;
    creator: string | User;
    // uniquement pour les défis liés à une salle
    gymId?: string | Gym;
    origin: ChallengeOrigin;
    approvalStatus: ChallengeApprovalStatus;
    title: string;
    description: string;
    difficulty: ChallengeDifficulty;
    type: ChallengeType;
    durationMinutes: number;
    exerciseTypes: string[];
    goals: ChallengeGoals;
    visibility: ChallengeVisibility;
}
