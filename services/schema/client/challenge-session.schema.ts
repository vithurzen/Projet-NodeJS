import {Schema} from "mongoose";
import {ChallengeSession} from "../../../models/client/challenge-session.interface";

export function getChallengeSessionSchema(): Schema<ChallengeSession> {
    return new Schema<ChallengeSession>({
        challengeId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Challenge"
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        durationMinutes: {
            type: Number,
            required: true
        },
        caloriesBurned: {
            type: Number,
            required: true
        }
    }, {
        versionKey: false,
        collection: "challenge_session",
        timestamps: false
    });
}