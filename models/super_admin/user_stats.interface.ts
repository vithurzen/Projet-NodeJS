import { Types } from "mongoose";

export interface UserStats {
    userId: Types.ObjectId;
    createdChallenges: number;
    completedChallenges: number;
    totalWorkoutSessions: number;
    totalCaloriesBurned: number; 
    invitationsSent: number;
}