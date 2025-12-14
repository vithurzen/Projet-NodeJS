import { Badge } from "../../models";
import {json, Request, Response, Router} from "express";
import { BadgeService } from "../../services/badge.service";


export class BadgeController {
    readonly badgeService: BadgeService;

    constructor(badgeService: BadgeService) {
        this.badgeService = badgeService;
    }

    async createBadge(req: Request, res: Response) {
        const badge = req.body as Badge;
        const newBadge = await this.badgeService.createBadge(badge);
        return res.status(201).json(newBadge);
    }

    async getBadgeById(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const badge = await this.badgeService.getBadgeById(id);
        res.status(200).json(badge);
    }

    async getAllBadges(req: Request, res: Response) {
        const badges = await this.badgeService.getAllBadges();
        res.status(200).json(badges);
    }

    async updateBadge(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const badge = req.body as Badge;
        const updatedBadge = await this.badgeService.updateBadge(id, badge);
        res.status(200).json(updatedBadge);
    }

    async deleteBadge(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        await this.badgeService.deleteBadge(id);
        res.status(204).end();
    }

    buildRouter(): Router {
        const router = Router();
        router.get("/", this.getAllBadges.bind(this));
        router.get("/:id", this.getBadgeById.bind(this));
        router.post("/", json(),this.createBadge.bind(this));
        router.patch("/:id", json(), this.updateBadge.bind(this));
        router.delete("/:id", this.deleteBadge.bind(this));
        return router;
    }


}