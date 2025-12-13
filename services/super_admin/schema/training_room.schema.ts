import { Schema } from "mongoose";
import { DifficultyLevel, TrainingRoom } from "../../../models/super_admin/training_room.interface";

export function getTrainingRoomSchema(): Schema<TrainingRoom> {
    return new Schema<TrainingRoom>({
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
        collection: 'training_rooms',
        timestamps: {
            updatedAt: 'updatedAt',
        }
    })
}