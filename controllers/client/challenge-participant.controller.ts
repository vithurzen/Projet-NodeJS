import {Request, Response, Router} from "express";
import {ChallengeParticipantService, SessionService} from "../services/mongo";
import {userConnected} from "./user-connected.middleware";
import {minRole} from "./min-role.middlaware";
import {UserRole} from "../models";

export class ChallengeParticipantController {

    constructor(public readonly challengeParticipantService: ChallengeParticipantService,
                public readonly sessionService: SessionService) {
    }

    async join(req: Request<{ challengeId: string }>, res: Response) {
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

        const existing =
            await this.challengeParticipantService.isParticipant(
                req.params.challengeId,
                userId
            );

        if(existing !== null) {
            res.status(409).end();
            return;
        }

        const participant =
            await this.challengeParticipantService.join({
                challengeId: req.params.challengeId,
                userId: userId
            });

        res.json(participant);
    }

    async leave(req: Request<{ challengeId: string }>, res: Response) {
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

        const participant =
            await this.challengeParticipantService.leave(
                req.params.challengeId,
                userId
            );

        if(participant === null) {
            res.status(404).end();
            return;
        }

        res.json(participant);
    }

    buildRouter(): Router {
        const router = Router();

        router.post("/challenges/:challengeId/join",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            this.join.bind(this));

        router.post("/challenges/:challengeId/leave",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            this.leave.bind(this));

        return router;
    }
}
