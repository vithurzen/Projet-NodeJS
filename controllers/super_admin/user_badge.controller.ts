import {json, Request, Response, Router} from "express";
import { UserBadgeService } from "../../services/user_badge.service";


export class UserBadgeController {
    readonly userBadgeService: UserBadgeService;

    constructor(userBadgeService: UserBadgeService) {
            this.userBadgeService = userBadgeService;
        }

    async assignBadgeToUser(req: Request, res: Response) {
        
        const { userId, badgeId } = req.body;

        if (!userId || !badgeId) {
        return res.status(400).json({
          message: "userId and badgeId are required",
        });
      }

        await this.userBadgeService.assignBadgeToUser(userId, badgeId);
        return res.status(201).json({
                 message: "Badge successfully assigned to user",
         });
    }

     async getUserBadges(req: Request<{ userId: string }>, res: Response) {
      const { userId } = req.params;
    
      const badges = await this.userBadgeService.getUserBadges(userId);
      return res.status(200).json(badges);
    }

    buildRouter(): Router {
        const router = Router();
        router.post("/", json(), this.assignBadgeToUser.bind(this));
        router.get("/:userId", json(), this.getUserBadges.bind(this));
        return router;
    }

   
}