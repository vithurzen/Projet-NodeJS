import {json, Request, Response, Router} from "express";
import {ChallengeShareCodeService, SessionService} from "../services/mongo";
import {userConnected} from "./user-connected.middleware";
import {minRole} from "./min-role.middlaware";
import {UserRole} from "../models";

function generateCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export class ChallengeShareCodeController {

    constructor(public readonly challengeShareCodeService: ChallengeShareCodeService,
                public readonly sessionService: SessionService) {
    }

    async share(req: Request<{ challengeId: string }>, res: Response) {
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

        const code = generateCode();

        const created = await this.challengeShareCodeService.create({
            challengeId: req.params.challengeId,
            code: code,
            createdBy: userId
        });

        res.json(created);
    }

    async joinByCode(req: Request, res: Response) {
        if(!req.body
            || !req.body.code) {
            res.status(400).end();
            return;
        }

        const shareCode =
            await this.challengeShareCodeService.findByCode(req.body.code);

        if(shareCode === null) {
            res.status(404).end();
            return;
        }

        res.json(shareCode);
    }

    buildRouter(): Router {
        const router = Router();

        router.post("/challenges/:challengeId/share",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            json(),
            this.share.bind(this));

        router.post("/challenges/join-by-code",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            json(),
            this.joinByCode.bind(this));

        return router;
    }
}
