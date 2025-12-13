import { Types } from "mongoose";

export interface UserBadge {
    _id: string;
    userId: Types.ObjectId;
    badgeId: Types.ObjectId;
    awardedAt: Date;
}