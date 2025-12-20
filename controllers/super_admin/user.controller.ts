import { User } from "../../models";
import { UserService } from "../../services/user.service";
import {json, Request, Response, Router} from "express";


export class UserController {
    readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async create(req: Request, res: Response) {
        if(!req.body
            || !req.body.email
            || !req.body.password) {
            res.status(400).end();
            return;
    }

        const signupDto = req.body;

        const user = await this.userService.createUser(signupDto);
        res.json(user);
    }

    async getUserById(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const user = await this.userService.getUserById(id);
        res.status(200).json(user);
    }

    async getAllUsers(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.status(200).json(users);
    }

    async updateUser(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const user = req.body as User;
        const updatedUser = await this.userService.updateUser(id, user);
        res.status(200).json(updatedUser);
    }

    async deactivate(req: Request<{ id: string }>, res: Response) {
        const updated = await this.userService.deactivateUser(req.params.id);
        return res.status(200).json({ message: "User deactivated", data: updated });
    }

    async activate(req: Request<{ id: string }>, res: Response) {
      const updated = await this.userService.activateUser(req.params.id);
      return res.status(200).json({ message: "User activated", data: updated });
     }

    async deleteUser(req: Request<{ id: string }>, res: Response) { 
        const id = req.params.id;
        await this.userService.deleteUser(id);
        res.status(204).end();
    }

    buildRouter(): Router {
        const router = Router();
        router.post("/", json(), this.create.bind(this))
        router.get("/", this.getAllUsers.bind(this));
        router.get("/:id", this.getUserById.bind(this));
        router.patch("/:id", json(), this.updateUser.bind(this));
        router.patch("/:id/deactivate", this.deactivate.bind(this));
        router.patch("/:id/activate", this.activate.bind(this));
        router.delete("/:id", this.deleteUser.bind(this));
        return router;
    }
}