import { model } from "mongoose";
import { Badge } from "./badge.interface";
import { getBadgeSchema } from "../../services";

export const badgeModel = model<Badge>("badges", getBadgeSchema());