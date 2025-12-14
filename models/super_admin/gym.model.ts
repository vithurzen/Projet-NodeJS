import { model } from "mongoose";
import { getGymSchema } from "../../services/super_admin/schema/gym.schema";
import { Gym } from "./gym.interface";

export const gymModel = model<Gym>("gym", getGymSchema());