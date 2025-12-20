import {Schema} from "mongoose";
import {ChallengeShareCode} from "../../../models/client/challenge-share-code.interface";

export function getChallengeShareCodeSchema(): Schema<ChallengeShareCode> {
    return new Schema<ChallengeShareCode>({
        challengeId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Challenge"
        },
        code: {
            type: String,
            required: true,
            unique: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }, {
        versionKey: false,
        collection: "challenge_share_code",
        timestamps: false
    });
}
