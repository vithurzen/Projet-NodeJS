import { config } from "dotenv";
import express from 'express';
import { GymService } from "./services/gym.service";
import { GymController } from "./controllers/super_admin/gym.controller";
import { openMongooseConnection } from "./utils/mongoose-connect.utils";
import { ExerciseTypesService } from "./services/exercise_types.service";
import { ExerciseTypesController } from "./controllers/super_admin/exercise_types.controller";
import { BadgeService } from "./services/badge.service";
import { BadgeController } from "./controllers/super_admin/badge.controller";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/super_admin/user.controller";
import { UserBadgeService } from "./services/user_badge.service";
import { UserBadgeController } from "./controllers/super_admin/user_badge.controller";

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

const badgeService = new BadgeService();
const badgeController = new BadgeController(badgeService);
app.use('/badge', badgeController.buildRouter())

const userService = new UserService();
const userController = new UserController(userService);
app.use('/user', userController.buildRouter())

const userBadgeService = new UserBadgeService();
const userBadgeController = new UserBadgeController(userBadgeService);
app.use('/user-badge', userBadgeController.buildRouter())

app.listen(3000, function() {
    console.log("listening on 3000....")
});

