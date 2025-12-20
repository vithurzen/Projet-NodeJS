import {Challenge} from "../models/client/challenge.interface";
import {challengeModel} from "../models/client/challenge.model";

export class ChallengeService {
    async createChallenge(challenge: Challenge): Promise<Challenge> {
        return await challengeModel.create(challenge);
    }

    async getChallengeById(id: string): Promise<Challenge> {
        const challenge = await challengeModel.findById(id);
        if (!challenge) throw new Error("Challenge not found");
        return challenge;
    }

    async getAllChallenge(filters: any = {}): Promise<Challenge[]> {
        return challengeModel.find(filters);
    }

    async updateChallenge(id: string, data: Partial<Challenge>): Promise<Challenge> {
        const updated = await challengeModel.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updated) throw new Error("Challenge not found");
        return updated;
    }

    async deleteChallenge(id: string): Promise<void> {
        const deleted = await challengeModel.findByIdAndDelete(id);
        if (!deleted) throw new Error("Challenge not found");
    }
}
