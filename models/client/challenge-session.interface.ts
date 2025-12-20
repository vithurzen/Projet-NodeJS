import {User} from "../super_admin";
import {Challenge} from "./challenge.interface";

export interface ChallengeSession {
    _id: string;
    challengeId: string | Challenge;
    userId: string | User;
    durationMinutes: number;
    caloriesBurned: number;
}