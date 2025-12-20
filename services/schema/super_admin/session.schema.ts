import {Schema, Types} from "mongoose";
import { Session } from "../../../models/super_admin/session.interface";

export function getSessionSchema(): Schema<Session> {
    return new Schema<Session>({
        expiresAt: {
            type: Date,
            required: true
        },
        user: {
            type: Types.ObjectId,
            ref: "user",
            required: true
        }
    }, {
        versionKey: false,
        collection: "session",
        timestamps: {
            createdAt: false,
            updatedAt: true
        }
    });
}