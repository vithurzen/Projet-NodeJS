import { Types } from "mongoose";
import { userBadgeModel } from "../models/super_admin/user_badge.model";
import { UserBadge } from "../models/super_admin/user_badge.interface";

export class UserBadgeService {
    async assignBadgeToUser(userId: string, badgeId: string): Promise<void> {
    
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }
    if (!Types.ObjectId.isValid(badgeId)) {
      throw new Error("Invalid badgeId");
    }

    const alreadyHasBadge = await userBadgeModel.exists({
      userId: new Types.ObjectId(userId),
      badgeId: new Types.ObjectId(badgeId),
    });

    if (alreadyHasBadge) {
      return;
    }

    const userBadge = {
      userId: new Types.ObjectId(userId),
      badgeId: new Types.ObjectId(badgeId),
      awardedAt: new Date(),
    };

    await userBadgeModel.create(userBadge);
    }

    async getUserBadges(userId: string): Promise<UserBadge[]> {
        const userBadges = await userBadgeModel.find({userId});
        return userBadges;
    }
}