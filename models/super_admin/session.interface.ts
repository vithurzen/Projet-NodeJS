import { User } from "./user.interface";

export interface Session {
    _id: string;
    expiresAt: Date;
    user: string | User;
}