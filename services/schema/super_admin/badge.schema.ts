import { Schema } from "mongoose";
import {Badge} from "../../../models/super_admin";

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
            metric: { type: String, required: true },
            value: { type: Number, required: true },
        }
    }, {
        versionKey: false,
        collection: 'badges',
        timestamps: {
            updatedAt: 'updatedAt', 
        }
    });
}