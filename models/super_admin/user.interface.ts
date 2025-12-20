import { Types } from "mongoose";

export enum UserRole {
  superAdmin = "superAdmin",
  admin = "admin",
  user = "user",
}

export interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone?: string;
    dateOfBirth: Date;
    role: UserRole;
    isActive: boolean;
}