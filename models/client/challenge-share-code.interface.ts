import {Challenge} from "./challenge.interface";
import {User} from "../super_admin";

export interface ChallengeShareCode {
  _id: string;
  challengeId: string | Challenge;
  code: string;
  createdBy: string | User;
}