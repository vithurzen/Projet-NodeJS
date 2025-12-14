import { Gym } from "../../models/super_admin/gym.interface";
import { GymService } from "../../services/gym.service";
import {json, Request, Response, Router} from "express";

export class GymController {
    readonly gymService: GymService;
    
    constructor(gymService: GymService) {
        this.gymService = gymService;
    }

    async createGym(req: Request, res: Response) {
        const gym = req.body as Gym;
        const newGym = await this.gymService.createGym(gym);
        return res.status(201).json(newGym);
    }

    async getGymById(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const gym = await this.gymService.getGymById(id);
        res.status(200).json(gym);
    }

    async getAllGyms(req: Request, res: Response) {
        const gyms = await this.gymService.getAllGyms();
        res.status(200).json(gyms);
    }

    async updateGym(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const gym = req.body as Gym;
        const updatedGym = await this.gymService.updateGym(id, gym);
        res.status(200).json(updatedGym);
    }

    async approveGym(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const approvedGym = await this.gymService.approveGym(id);
        res.status(200).json(approvedGym);
    }

    async assignExerciseTypesToGym(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const { exerciseTypes } = req.body;
        const updatedGym = await this.gymService.assignExerciseTypesToGym(id, exerciseTypes);
        res.status(200).json(updatedGym);
    }

    async assignDifficultyLevelsToGym(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const { difficultyLevels } = req.body;
        const updatedGym = await this.gymService.assignDifficultyLevelToGym(id, difficultyLevels);
        res.status(200).json(updatedGym);
    }

    async deleteGym(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        await this.gymService.deleteGym(id);
        res.status(204).end();
    }

    buildRouter(): Router {
        const router = Router();
        router.get("/", this.getAllGyms.bind(this));
        router.get("/:id", this.getGymById.bind(this));
        router.post("/", json(),this.createGym.bind(this));
        router.patch("/:id", json(), this.updateGym.bind(this));
        router.patch("/:id/approve", json(), this.approveGym.bind(this));
        router.patch("/:id/exercise-types", json(), this.assignExerciseTypesToGym.bind(this));
        router.patch("/:id/difficulty-levels", json(), this.assignDifficultyLevelsToGym.bind(this));
        router.delete("/:id", this.deleteGym.bind(this));
        return router;
    }
}