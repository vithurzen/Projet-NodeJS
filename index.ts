import { config } from "dotenv";
import express from 'express';
import { GymService } from "./services/super_admin/gym.service";
import { GymController } from "./controllers/super_admin/gym.controller";
import { openMongooseConnection } from "./utils/mongoose-connect.utils";

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

app.listen(3000, function() {
    console.log("listening on 3000....")
});

