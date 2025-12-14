import { model } from "mongoose";
import { ExerciseType } from "./exercise_types.interface";
import { getExerciseTypesSchema } from "../../services/schema/super_admin/exercise_types.schema";

export const exerciseTypesModel = model<ExerciseType>("exercise_types", getExerciseTypesSchema());