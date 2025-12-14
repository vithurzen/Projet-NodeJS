import { Badge } from "../models";
import { badgeModel } from "../models/super_admin/badge.model";

export class BadgeService {
    async createBadge(badge: Badge): Promise<Badge> {
        return await badgeModel.create(badge);
    }

    async getBadgeById(id: string): Promise<Badge> {
        const badge = await badgeModel.findById(id);
        if (!badge) {
            throw new Error("Badge not found");
        }
        return badge;
    }

    async getAllBadges(): Promise<Badge[]> {
        const badges = await badgeModel.find();
        return badges;
    }

    async updateBadge(id: string, badge: Badge): Promise<Badge> {
        const updatedBadge = await badgeModel.findByIdAndUpdate(id, badge);
        if (!updatedBadge) {
            throw new Error("Badge not found");
        }
        return updatedBadge;
    }

    async deleteBadge(id: string): Promise<void> {
        const deletedBadge = await badgeModel.findByIdAndDelete(id); 
        if (!deletedBadge) {
            throw new Error("Badge not found");
        }
    }
}