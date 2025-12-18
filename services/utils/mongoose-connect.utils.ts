import { connect, Mongoose } from "mongoose";

export function openMongooseConnection(): Promise<Mongoose> {
    const vars = ["MONGODB_URI", "MONGODB_USER", "MONGODB_PASSWORD", "MONGODB_DATABASE"];
    for (const varName of vars) {
        if (typeof process.env[varName] === 'undefined') {
            throw  new Error('Missing ${varName} env variable');
        }
    }
    return connect(process.env.MONGODB_URI!, {
        auth: {
            username: process.env.MONGODB_USER!,
            password: process.env.MONGODB_PASSWORD!,
        },
        authSource: "admin",
        dbName: process.env.MONGODB_DATABASE!
    });   
}