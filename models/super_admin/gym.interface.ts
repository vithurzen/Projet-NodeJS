import { ObjectId, Types } from "mongoose";

export enum DifficultyLevel {
    beginner = "beginner",
    intermediate = "intermediate",
    advanced = "advanced"
}

export enum Status {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
}

export interface Gym {
    _id: string;
    name: string;
    capacity: number;
    equipments: string[];
    status: Status;
    address: string;
    exerciseTypes: ObjectId[];
    difficultyLevels: DifficultyLevel;
    manager: Types.ObjectId;
}