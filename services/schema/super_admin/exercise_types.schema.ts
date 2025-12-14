import { Schema } from "mongoose";
import {ExerciseType} from "../../../models/super_admin";

export function getExerciseTypesSchema(): Schema<ExerciseType> {
    return new Schema<ExerciseType>({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        targetMuscle: {
            type: [String],
            required: true,
        }
    }, {
        versionKey: false,
        collection: 'exercise_types',
        timestamps: {
            updatedAt: 'updatedAt',
        }
    })
}