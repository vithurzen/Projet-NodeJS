import {Model, Mongoose, Types} from "mongoose";
import {ChallengeParticipant} from "../models/client/challenge-participant.interface";
import {getChallengeParticipantSchema} from "./schema/client/challenge-participant.schema";


export type CreateChallengeParticipantDTO = Omit<ChallengeParticipant, "_id" | "leftId">;

export class ChallengeParticipantService {

    public readonly challengeParticipantModel: Model<ChallengeParticipant>;

    constructor(public readonly mongoose: Mongoose) {
        this.challengeParticipantModel =
            mongoose.model("ChallengeParticipant", getChallengeParticipantSchema());
    }

    join(dto: CreateChallengeParticipantDTO): Promise<ChallengeParticipant> {
        return this.challengeParticipantModel.create({
            ...dto,
            leftId: null
        });
    }

    leave(challengeId: string, userId: string): Promise<ChallengeParticipant | null> {
        return this.challengeParticipantModel.findOneAndUpdate({
            challengeId: challengeId,
            userId: userId,
            leftId: null
        }, {
            leftId: new Types.ObjectId()
        }, {
            new: true
        });
    }

    isParticipant(challengeId: string, userId: string): Promise<ChallengeParticipant | null> {
        return this.challengeParticipantModel.findOne({
            challengeId: challengeId,
            userId: userId,
            leftId: null
        });
    }

    findParticipants(challengeId: string): Promise<ChallengeParticipant[]> {
        return this.challengeParticipantModel.find({
            challengeId: challengeId,
            leftId: null
        });
    }

    findLeavers(challengeId: string): Promise<ChallengeParticipant[]> {
        return this.challengeParticipantModel.find({
            challengeId: challengeId,
            leftId: { $ne: null }
        });
    }
}
