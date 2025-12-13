import { Schema } from "mongoose";
import { Badge } from "../../../models/super_admin/badge.interface";

export function getBadgeSchema(): Schema<Badge> {
    return new Schema<Badge>({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rule: {
            type: String,
            required: true,
        }
    }, {
        versionKey: false,
        collection: 'badges',
        timestamps: {
            updatedAt: 'updatedAt', 
        }
    });
}