import {Schema} from "mongoose";
import {ChallengeParticipant} from "../../../models/client/challenge-participant.interface";

export function getChallengeParticipantSchema(): Schema<ChallengeParticipant> {
    return new Schema<ChallengeParticipant>({
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
        leftId: {
            type: Schema.Types.ObjectId,
            required: false,
            default: null
        }
    }, {
        versionKey: false,
        collection: "challenge_participant",
        timestamps: false
    });
}