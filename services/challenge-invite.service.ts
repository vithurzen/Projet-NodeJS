import {Model, Mongoose} from "mongoose";
import {getChallengeInviteSchema} from "./schema/client/challenge-invite.schema";
import {ChallengeInvite, InviteStatus} from "../models/client/challenge-invite.interface";


export type CreateChallengeInviteDTO =
    Omit<ChallengeInvite, "_id" | "status">;

export class ChallengeInviteService {

    public readonly challengeInviteModel: Model<ChallengeInvite>;

    constructor(public readonly mongoose: Mongoose) {
        this.challengeInviteModel =
            mongoose.model("ChallengeInvite", getChallengeInviteSchema());
    }

    createInvite(dto: CreateChallengeInviteDTO): Promise<ChallengeInvite> {
        return this.challengeInviteModel.create({
            ...dto,
            status: InviteStatus.pending
        });
    }

    findMyInvites(userId: string): Promise<ChallengeInvite[]> {
        return this.challengeInviteModel.find({
            toUserId: userId,
            status: InviteStatus.pending
        });
    }

    acceptInvite(inviteId: string): Promise<ChallengeInvite | null> {
        return this.challengeInviteModel.findOneAndUpdate(
            { _id: inviteId, status: InviteStatus.pending },
            { status: InviteStatus.accepted },
            { new: true }
        );
    }

    declineInvite(inviteId: string): Promise<ChallengeInvite | null> {
        return this.challengeInviteModel.findOneAndUpdate(
            { _id: inviteId, status: InviteStatus.pending },
            { status: InviteStatus.declined },
            { new: true }
        );
    }
}
