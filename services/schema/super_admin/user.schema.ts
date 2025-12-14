import { Schema } from "mongoose";
import { User, UserRole } from "../../../models";

export function getUserSchema(): Schema<User> {
    return new Schema<User>({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        telephone: {
            type: String,
            required: false,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.user
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },}, {
            versionKey: false,
            collection: 'user',
            timestamps: {
                updatedAt: 'updatedAt',
            }
        }
)
}