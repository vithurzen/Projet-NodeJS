import {json, Request, Response, Router} from "express";
import {ChallengeSessionService, SessionService} from "../services/mongo";
import {userConnected} from "./user-connected.middleware";
import {minRole} from "./min-role.middlaware";
import {UserRole} from "../models";

export class ChallengeSessionController {

    constructor(public readonly challengeSessionService: ChallengeSessionService,
                public readonly sessionService: SessionService) {
    }

    async create(req: Request<{ challengeId: string }>, res: Response) {
        if(!req.params
            || !req.params.challengeId
            || !req.body
            || req.body.durationMinutes === undefined
            || req.body.caloriesBurned === undefined) {
            res.status(400).end();
            return;
        }

        const userId = (req as any).user?.id;
        if(!userId) {
            res.status(401).end();
            return;
        }

        const session =
            await this.challengeSessionService.createSession({
                challengeId: req.params.challengeId,
                userId: userId,
                durationMinutes: req.body.durationMinutes,
                caloriesBurned: req.body.caloriesBurned
            });

        res.json(session);
    }

    async getMine(req: Request<{ challengeId: string }>, res: Response) {
        if(!req.params
            || !req.params.challengeId) {
            res.status(400).end();
            return;
        }

        const userId = (req as any).user?.id;
        if(!userId) {
            res.status(401).end();
            return;
        }

        const sessions =
            await this.challengeSessionService.findMySessions(
                req.params.challengeId,
                userId
            );

        res.json(sessions);
    }

    buildRouter(): Router {
        const router = Router();

        router.post("/challenges/:challengeId/sessions",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            json(),
            this.create.bind(this));

        router.get("/challenges/:challengeId/sessions/me",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            this.getMine.bind(this));

        return router;
    }
}
