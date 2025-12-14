import { model } from "mongoose";
import { getGymSchema } from "../../services/schema/super_admin/gym.schema";
import { Gym } from "./gym.interface";

export const gymModel = model<Gym>("gym", getGymSchema());