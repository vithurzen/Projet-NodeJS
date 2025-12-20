import { Request, Response, Router, json } from "express";
import {ChallengeService} from "../../services/challenge.services";
import {Challenge} from "../../models/client/challenge.interface";

export class ChallengeController {
    readonly challengeService: ChallengeService;

    constructor(challengeService: ChallengeService) {
        this.challengeService = challengeService;
    }

    async createChallenge(req: Request, res: Response) {
        const challenge = req.body as Challenge;

        const created = await this.challengeService.createChallenge(challenge);

        return res.status(201).json(created);
    }

    async getChallengeById(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;

        const challenge = await this.challengeService.getChallengeById(id);

        return res.status(200).json(challenge);
    }

    async getAllChallenges(req: Request, res: Response) {
        const filters: any = {};
        if (req.query.difficulty) filters.difficulty = req.query.difficulty;
        if (req.query.type) filters.type = req.query.type;

        if (req.query.duration_min || req.query.duration_max) {
            filters.durationMinutes = {};
            if (req.query.duration_min) filters.durationMinutes.$gte = Number(req.query.duration_min);
            if (req.query.duration_max) filters.durationMinutes.$lte = Number(req.query.duration_max);
        }

        const challenges = await this.challengeService.getAllChallenge(filters);

        return res.status(200).json(challenges);
    }

    async updateChallenge(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;
        const challenge = req.body as Challenge;

        const updated = await this.challengeService.updateChallenge(id, challenge);

        return res.status(200).json(updated);
    }

    async deleteChallenge(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;

        await this.challengeService.deleteChallenge(id);

        return res.status(204).end();
    }

    buildRouter(): Router {
        const router = Router();
        router.get("/", this.getAllChallenges.bind(this));
        router.get("/:id", this.getChallengeById.bind(this));
        router.post("/", json(), this.createChallenge.bind(this));
        router.patch("/:id", json(), this.updateChallenge.bind(this));
        router.delete("/:id", this.deleteChallenge.bind(this));
        return router;
    }
}
