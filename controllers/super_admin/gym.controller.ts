import {json, Request, Response, Router} from "express";
import {GymService} from "../../services/gym.service";
import {Gym} from "../../models/super_admin";

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
        router.delete("/:id", this.deleteGym.bind(this));
        return router;
    }
}