import { Schema } from "mongoose";
import { UserBadge } from "../../../models";

export function getUserBadgeSchema(): Schema<UserBadge> {
    return new Schema<UserBadge>({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        badgeId: {
            type: Schema.Types.ObjectId,
            ref: 'badges',
            required: true,
        },
        awardedAt: {
            type: Date,
            required: true,
        }}, {
        versionKey: false,
        collection: 'user_badges',
        timestamps: {
            updatedAt: 'updatedAt',
        }        
    })
}