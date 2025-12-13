import { Schema } from "mongoose";
import { UserBadge } from "../../../models/super_admin/user_badge.interface";

export function getUserBadgeSchema(): Schema<UserBadge> {
    return new Schema<UserBadge>({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        badgeId: {
            type: Schema.Types.ObjectId,
            ref: 'badge',
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