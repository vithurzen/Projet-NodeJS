import { Types } from "mongoose";
import { User } from "./user.interface";

export enum DifficultyLevel {
    beginner = "beginner",
    intermediate = "intermediate",
    advanced = "advanced"
}

export interface TrainingRoom {
    _id: string;
    name: string;
    capacity: number;
    equipments: string[];
    address: string;
    exerciseTypes: string[];
    difficultyLevels: DifficultyLevel;
    manager: Types.ObjectId;
}