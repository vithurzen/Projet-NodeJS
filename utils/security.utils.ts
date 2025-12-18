import {createHash} from "node:crypto";

export function sha256(text: string, salt?: string): string {
    if(salt) {
        text += salt;
    }
    return createHash("sha256")
        .update(text)
        .digest("hex");
}