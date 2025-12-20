import { AuthService } from "../../services/auth.service";
import {json, Request, Response, Router} from "express";
import { UserService } from "../../services/user.service";
import { SessionService } from "../../services/session.service";
import { userConnected } from "./user-connected.middleware";

export class AuthController {
    constructor(public readonly userService: UserService,
                public readonly sessionService: SessionService) {
    }
    
    public async me(req: Request, res: Response) {
        res.json(req.user);
    }

    public async login(req: Request, res: Response) {
        if(!req.body || !req.body.email || !req.body.password) {
            res.status(400).end();
            return;
        }
        const user = await this.userService.findActiveUser(
            req.body.email,
            req.body.password
        );
        if(!user) {
            res.status(401).end();
            return;
        }
        const session = await this.sessionService.createSession({user});
        res.json(session);
    }

    buildRouter(): Router {
        const router = Router();
        router.post("/login", json(), this.login.bind(this));
        router.get("/me", userConnected(this.sessionService), this.me.bind(this));
        return router;
    }   
}