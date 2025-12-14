import { Schema } from "mongoose";
import { UserStats } from "../../../models/super_admin/user_stats.interface";

export function getUserStatsSchema(): Schema<UserStats> {
    return new Schema<UserStats>({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        createdChallenges: {
            type: Number,
            default: 0,
        },
        completedChallenges: {
            type: Number,
            default: 0,
        },
        totalWorkoutSessions: {
            type: Number,  
            default: 0,
        },
        totalCaloriesBurned: {
            type: Number,
            default: 0,
        },
        invitationsSent: {
            type: Number,
            default: 0,
        }
    }, {
        versionKey: false,
        collection: 'user_stats',
        timestamps: {
            updatedAt: 'updatedAt',
        }
    })
}