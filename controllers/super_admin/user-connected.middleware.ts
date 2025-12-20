import {Request, RequestHandler} from "express";
import { User } from "../../models";
import { SessionService } from "../../services/session.service";

declare module "express" {
    interface Request {
        user?: User;
    }
}

export function userConnected(sessionService: SessionService): RequestHandler {
    return async (req: Request, res, next) => {
        const authorization = req.headers.authorization;
        if(!authorization) {
            res.status(401).end();
            return;
        }
        // Authorization: Bearer TOKEN
        const parts = authorization.split(" ");
        if(parts.length !== 2 || parts[0] !== "Bearer") {
            res.status(401).end();
            return;
        }
        const token = parts[1];
        const session = await sessionService.getActiveSession(token!);
        if(!session) {
            res.status(401).end();
            return;
        }
        await sessionService.extendsSession(session);
        req.user = session.user as User;
        next();
    }
}