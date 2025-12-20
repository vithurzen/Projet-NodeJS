import {Request, RequestHandler} from "express";
import { UserRole } from "../../models";

export function minRole(role: UserRole): RequestHandler {
    return async (req: Request, res, next) => {
        if(!req.user) {
            res.status(401).end();
            return;
        }
        const connectedUserRole = req.user.role;
        if(connectedUserRole > role) {
            res.status(403).end();
            return;
        }
        next();
    }
}