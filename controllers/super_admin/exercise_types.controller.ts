import {json, Request, Response, Router} from "express";
import {ExerciseTypesService} from "../../services/exercise_types.service";
import {ExerciseType} from "../../models/super_admin";

export class ExerciseTypesController {
    readonly exerciseTypesModel: ExerciseTypesService;

    constructor(exerciseTypesModel: ExerciseTypesService) {
        this.exerciseTypesModel = exerciseTypesModel;
    }

    async createExerciseType(req: Request, res: Response) {
        const exerciseTypes = req.body as ExerciseType;
        const newExerciseType = await this.exerciseTypesModel.createExerciseType(exerciseTypes);
        return res.status(201).json(newExerciseType);
    }

    async getExerciseTypeById(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const exerciseType = await this.exerciseTypesModel.getExerciseTypeById(id);
        res.status(200).json(exerciseType);
    }

    async getAllExerciseTypes(req: Request, res: Response) {
        const exerciseTypes = await this.exerciseTypesModel.getAllExerciseTypes();
        res.status(200).json(exerciseTypes);
    }

    async updateExerciseType(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const exerciseType = req.body as ExerciseType;
        const updatedExerciseType = await this.exerciseTypesModel.updateExerciseType(id, exerciseType);
        res.status(200).json(updatedExerciseType);
    }

    async deleteExerciseType(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        await this.exerciseTypesModel.deleteExerciseType(id);
        res.status(204).end();
    }

    buildRouter(): Router {
        const router = Router();
        router.get("/", this.getAllExerciseTypes.bind(this));
        router.get("/:id", this.getExerciseTypeById.bind(this));
        router.post("/", json(),this.createExerciseType.bind(this));
        router.patch("/:id", json(), this.updateExerciseType.bind(this));
        router.delete("/:id", this.deleteExerciseType.bind(this));
        return router;
    }
}