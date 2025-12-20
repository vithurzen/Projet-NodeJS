import {Challenge} from "./challenge.interface";
import {User} from "../super_admin";

export interface ChallengeParticipant {
    _id: string;
    challengeId: string | Challenge;
    userId: string | User;
    leftId?: string | null;
}
