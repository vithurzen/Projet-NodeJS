import {Schema} from "mongoose";
import {ChallengeInvite, InviteStatus} from "../../../models/client/challenge-invite.interface";

export function getChallengeInviteSchema(): Schema<ChallengeInvite> {
    return new Schema<ChallengeInvite>({
        challengeId: {
            type: String,
            required: true
        },
        fromUserId: {
            type: String,
            required: true
        },
        toUserId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: Object.values(InviteStatus),
            required: true
        }
    }, {
        versionKey: false,
        collection: "challenge_invite",
        timestamps: {
            createdAt: false,
            updatedAt: true
        }
    });
}
