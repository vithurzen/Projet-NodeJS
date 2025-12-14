import { ExerciseType } from "../models/super_admin/exercise_types.interface";
import { exerciseTypesModel } from "../models/super_admin/exercise_types.model";

export class ExerciseTypesService {
    async createExerciseType(exerciseType: ExerciseType): Promise<ExerciseType> {
        return await exerciseTypesModel.create(exerciseType);
    }

    async getExerciseTypeById(id: string): Promise<ExerciseType> {
        const exerciseType = await exerciseTypesModel.findById(id);

        if (!exerciseType) {
            throw new Error("Exercise Type not found");
        }

        return exerciseType;
    }

    async getAllExerciseTypes(): Promise<ExerciseType[]> {
        const exerciseTypes  = await exerciseTypesModel.find();
        return exerciseTypes;
    }

    async updateExerciseType(id: string, exerciseType: ExerciseType): Promise<ExerciseType> {
        const updatedExerciseType = await exerciseTypesModel.findByIdAndUpdate(id, exerciseType);
        if (!updatedExerciseType) {
            throw new Error("Exercise Type not found");
        }
        return updatedExerciseType;
    }

    async deleteExerciseType(id: string): Promise<void> {
        const deletedExerciseType = await exerciseTypesModel.findByIdAndDelete(id);
        if (!deletedExerciseType) {
            throw new Error("Exercise Type not found");
        }
    }
}