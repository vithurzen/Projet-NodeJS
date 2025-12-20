import { config } from "dotenv";
import express from 'express';
import {GymService} from "./services/gym.service";
import {ExerciseTypesController, GymController} from "./controllers/super_admin";
import {ExerciseTypesService} from "./services/exercise_types.service";
import {ChallengeService} from "./services/challenge.services";
import {ChallengeController} from "./controllers/client";
import {openMongooseConnection} from "./utils/mongoose-connect.utils";

config();

async function main() {
    const conn = await openMongooseConnection();
    console.log(conn);
}

main().catch(console.error);

const app = express();

const gymService = new GymService();
const gymController = new GymController(gymService);
app.use('/gym', gymController.buildRouter())

const exerciseTypeService = new ExerciseTypesService();
const exerciseTypeController = new ExerciseTypesController(exerciseTypeService);
app.use('/exercise_type', exerciseTypeController.buildRouter())

const challengeService = new ChallengeService();
const challengeController = new ChallengeController(challengeService);
app.use('/challenge', challengeController.buildRouter())

app.listen(4000, function() {
    console.log("listening on 4000....")
});