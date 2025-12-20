import {json, Request, Response, Router} from "express";
import {userConnected} from "./user-connected.middleware";
import {minRole} from "./min-role.middlaware";
import {UserRole} from "../models";
import {ChallengeInviteService} from "../../services/challenge-invite.service";

export class ChallengeInviteController {

    constructor(public readonly challengeInviteService: ChallengeInviteService,
                public readonly sessionService: SessionService) {
    }

    async createInvite(req: Request<{ challengeId: string }>, res: Response) {
        if(!req.params
            || !req.params.challengeId
            || !req.body
            || !req.body.toUserId) {
            res.status(400).end();
            return;
        }

        const fromUserId = (req as any).user?.id;
        if(!fromUserId) {
            res.status(401).end();
            return;
        }

        const invite = await this.challengeInviteService.createInvite({
            challengeId: req.params.challengeId,
            fromUserId: fromUserId,
            toUserId: req.body.toUserId
        });

        res.json(invite);
    }

    async getMyInvites(req: Request, res: Response) {
        const userId = (req as any).user?.id;
        if(!userId) {
            res.status(401).end();
            return;
        }

        const invites = await this.challengeInviteService.findMyInvites(userId);
        res.json(invites);
    }

    async accept(req: Request<{ inviteId: string }>, res: Response) {
        if(!req.params || !req.params.inviteId) {
            res.status(400).end();
            return;
        }

        const userId = (req as any).user?.id;
        if(!userId) {
            res.status(401).end();
            return;
        }

        const invite = await this.challengeInviteService.acceptInvite(req.params.inviteId);
        if(invite === null) {
            res.status(404).end();
            return;
        }

        res.json(invite);
    }

    async decline(req: Request<{ inviteId: string }>, res: Response) {
        if(!req.params || !req.params.inviteId) {
            res.status(400).end();
            return;
        }

        const userId = (req as any).user?.id;
        if(!userId) {
            res.status(401).end();
            return;
        }

        const invite = await this.challengeInviteService.declineInvite(req.params.inviteId);
        if(invite === null) {
            res.status(404).end();
            return;
        }

        res.json(invite);
    }

    buildRouter(): Router {
        const router = Router();

        router.post("/challenges/:challengeId/invites",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            json(),
            this.createInvite.bind(this));

        router.get("/me/invites",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            this.getMyInvites.bind(this));

        router.post("/invites/:inviteId/accept",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            json(),
            this.accept.bind(this));

        router.post("/invites/:inviteId/decline",
            userConnected(this.sessionService),
            minRole(UserRole.customer),
            json(),
            this.decline.bind(this));

        return router;
    }
}
