import { config } from "dotenv";
import express from 'express';

config();

const app = express();

app.listen(3000, function() {
    console.log("listening on 3000....")
});