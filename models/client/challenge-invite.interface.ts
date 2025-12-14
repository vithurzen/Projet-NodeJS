export enum InviteStatus {
    pending = "pending",
    accepted = "accepted",
    declined = "declined",
}

export interface ChallengeInvite {
    _id: string;
    challengeId: string;
    fromUserId: string;
    toUserId: string;
    status: InviteStatus;
}
