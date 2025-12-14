import { model } from "mongoose";
import { ExerciseType } from "./exercise_types.interface";
import { getExerciseTypesSchema } from "../../services/super_admin/schema/exercise_types.schema";

export const exerciseTypesModel = model<ExerciseType>("exercise_types", getExerciseTypesSchema());