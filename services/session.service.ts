import {Model, Mongoose, Types} from "mongoose";
import { Session } from "../models/super_admin/session.interface";
import { getSessionSchema } from "./schema/super_admin/session.schema";

const kSessionDuration = 604_800_000; // 1 week in millis
export type CreateSessionDTO = Omit<Session, "_id" | "expiresAt">;

export class SessionService {

    public readonly sessionModel: Model<Session>

    constructor(public readonly mongoose: Mongoose) {
        this.sessionModel = mongoose.model("Session", getSessionSchema());
    }

    async getActiveSession(id: string): Promise<Session | null> {
        if(!Types.ObjectId.isValid(id)) {
            return null;
        }
        return this.sessionModel.findOne({
            _id: id,
            expiresAt: {$gte: new Date()}
        }).populate("user");
    }

    createSession(dto: CreateSessionDTO): Promise<Session> {
        return this.sessionModel.create({
            ...dto,
            expiresAt: new Date(Date.now() + kSessionDuration)
        });
    }

    async extendsSession(session: Session): Promise<void> {
        await this.sessionModel.updateOne(
            {_id: session._id},
            {expiresAt: new Date(Date.now() + kSessionDuration)});
    }

    async removeAllOutdatedSessions(): Promise<void> {
        await this.sessionModel.deleteMany({expiresAt: {$lt: new Date()}});
    }
}
