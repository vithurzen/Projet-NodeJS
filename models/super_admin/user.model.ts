import { model } from "mongoose";
import { User } from "./user.interface";
import { getUserSchema } from "../../services";

export const userModel = model<User>("user", getUserSchema());