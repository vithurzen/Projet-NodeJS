import {Model, Mongoose} from "mongoose";
import {ChallengeSession} from "../models/client/challenge-session.interface";
import {getChallengeSessionSchema} from "./schema/client/challenge-session.schema";


export type CreateChallengeSessionDTO =
    Omit<ChallengeSession, "_id">;

export class ChallengeSessionService {

    public readonly challengeSessionModel: Model<ChallengeSession>;

    constructor(public readonly mongoose: Mongoose) {
        this.challengeSessionModel =
            mongoose.model("ChallengeSession", getChallengeSessionSchema());
    }

    createSession(dto: CreateChallengeSessionDTO): Promise<ChallengeSession> {
        return this.challengeSessionModel.create(dto);
    }

    findMySessions(challengeId: string, userId: string): Promise<ChallengeSession[]> {
        return this.challengeSessionModel.find({
            challengeId: challengeId,
            userId: userId
        });
    }
}
