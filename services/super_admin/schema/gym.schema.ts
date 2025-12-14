import { Schema } from "mongoose";
import { DifficultyLevel, Gym} from "../../../models/super_admin/gym.interface";

export function getGymSchema(): Schema<Gym> {
    return new Schema<Gym>({
        name: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true, 
        },
        equipments: {
            type: [String],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        exerciseTypes: {
            type: [String],
            required: true,
        },
        difficultyLevels: {
            type: String,
            enum: Object.values(DifficultyLevel)
        },
        manager: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        }
    }, {
        versionKey: false,
        collection: 'gym',
        timestamps: {
            updatedAt: 'updatedAt',
        }
    })
}