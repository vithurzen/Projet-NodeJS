import { Gym, gymModel } from "../models";

export class GymService {
    async createGym(gym: Gym): Promise<Gym> {
        return await gymModel.create(gym);
    }

    async getGymById(id: string): Promise<Gym> {
        const gym = await gymModel.findById(id);

        if (!gym) {
            throw new Error("Gym not found");
        }

        return gym;
    }
    
    async getAllGyms(): Promise<Gym[]> {
        const gyms  = await gymModel.find();
        return gyms;
    }

    async updateGym(id: string, gym: Gym): Promise<Gym> {
        const updateGym = await gymModel.findByIdAndUpdate(id, gym);

        if (!updateGym) {
            throw new Error("Gym not found");
        }

        return updateGym;
    }

    async approveGym(id: string): Promise<Gym> {
        const updatedGym = await gymModel.findByIdAndUpdate(
        id,
        { status: "approved" },
        { new: true }
        );

        if (!updatedGym) {
            throw new Error("Gym not found");
        }

        return updatedGym;
    }

    async assignExerciseTypesToGym(id: string, exerciseTypeIds: string[]): Promise<Gym> {
        const updatedGym = await gymModel.findByIdAndUpdate(
        id,
        { exerciseTypes: exerciseTypeIds },
        { new: true }
        );

        if (!updatedGym) {
            throw new Error("Gym not found");
        }

        return updatedGym;
    }

    async assignDifficultyLevelToGym(id: string, difficultyLevel: string): Promise<Gym> {
        const updatedGym = await gymModel.findByIdAndUpdate(
        id,
        { difficultyLevels: difficultyLevel },
        { new: true }
        );

        if (!updatedGym) {
            throw new Error("Gym not found");
        }

        return updatedGym;
    }

    async deleteGym(id: string): Promise<void> {
        const deleteGym = await gymModel.findByIdAndDelete(id);

        if (!deleteGym) {
            throw new Error("Gym not found");
        }
    }
}