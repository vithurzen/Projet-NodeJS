import { model } from "mongoose";
import { getChallengeInviteSchema } from "../../services/schema/client/challenge-invite.schema";
import { ChallengeInvite } from "./challenge-invite.interface";

export const challengeInviteModel = model<ChallengeInvite>("challenge-invite", getChallengeInviteSchema());