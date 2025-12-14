import { model } from "mongoose";
import { getChallengeSchema } from "../../services/schema/client/challenge.schema";
import { Challenge } from "./challenge.interface";

export const challengeModel = model<Challenge>("challenge", getChallengeSchema());