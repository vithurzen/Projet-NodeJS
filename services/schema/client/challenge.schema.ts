import { Schema } from "mongoose";
import {
    Challenge,
    ChallengeApprovalStatus,
    ChallengeDifficulty,
    ChallengeOrigin, ChallengeType, ChallengeVisibility
} from "../../../models/client/challenge.interface";

export function getChallengeSchema(): Schema<Challenge> {
    return new Schema<Challenge>(
        {
            creator: {
                type: Schema.Types.ObjectId as any,
                ref: "user",
                required: true,
            },

            gymId: {
                type: Schema.Types.ObjectId as any,
                ref: "gym",
                required: false,
            },

            origin: {
                type: String,
                enum: Object.values(ChallengeOrigin),
                default: ChallengeOrigin.community,
                required: true,
            },

            approvalStatus: {
                type: String,
                enum: Object.values(ChallengeApprovalStatus),
                default: ChallengeApprovalStatus.approved,
                required: true,
            },

            title: {
                type: String,
                required: true
            },

            description: {
                type: String,
                required: true
            },

            difficulty: {
                type: String,
                enum: Object.values(ChallengeDifficulty),
                required: true,
            },

            type: {
                type: String,
                enum: Object.values(ChallengeType),
                required: true,
            },

            durationMinutes: {
                type: Number,
                required: true
            },

            exerciseTypes: [{
                type: Schema.Types.ObjectId,
                ref: "exercise_types",
                required: true,
            }],

            goals: {
                type: Object
            },

            visibility: {
                type: String,
                enum: Object.values(ChallengeVisibility),
                default: ChallengeVisibility.public,
            },
        },
        {
            versionKey: false,
            collection: "challenges",
            timestamps: {
                createdAt: true,
                updatedAt: true },
        }
    );
}
