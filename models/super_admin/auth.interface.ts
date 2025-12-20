import { UserRole } from "./user.interface";

export interface SignupDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone: string;
    dateOfBirth: Date;
    role: UserRole;
}

export interface LoginDto {
    email: string;
    password: string;
}