import {Model, Mongoose} from "mongoose";
import {ChallengeShareCode} from "../models/client/challenge-share-code.interface";
import {getChallengeShareCodeSchema} from "./schema/client/challenge-share-code.schema";

export type CreateChallengeShareCodeDTO =
    Omit<ChallengeShareCode, "_id">;

export class ChallengeShareCodeService {

    public readonly challengeShareCodeModel: Model<ChallengeShareCode>;

    constructor(public readonly mongoose: Mongoose) {
        this.challengeShareCodeModel =
            mongoose.model("ChallengeShareCode", getChallengeShareCodeSchema());
    }

    create(dto: CreateChallengeShareCodeDTO): Promise<ChallengeShareCode> {
        return this.challengeShareCodeModel.create(dto);
    }

    findByCode(code: string): Promise<ChallengeShareCode | null> {
        return this.challengeShareCodeModel.findOne({
            code: code
        });
    }

    findByChallengeId(challengeId: string): Promise<ChallengeShareCode | null> {
        return this.challengeShareCodeModel.findOne({
            challengeId: challengeId
        });
    }
}
