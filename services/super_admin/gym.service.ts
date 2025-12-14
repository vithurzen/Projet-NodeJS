import { Gym } from "../../models/super_admin/gym.interface";
import { gymModel } from "../../models/super_admin/gym.model";

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

    async deleteGym(id: string): Promise<void> {
        const deleteGym = await gymModel.findByIdAndDelete(id);

        if (!deleteGym) {
            throw new Error("Gym not found");
        }
    }
}