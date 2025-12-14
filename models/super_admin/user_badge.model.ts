import { model } from "mongoose";
import { UserBadge } from "./user_badge.interface";
import { getUserBadgeSchema } from "../../services/schema/super_admin/user_badge.schema";

export const userBadgeModel = model<UserBadge>("user_badges", getUserBadgeSchema());