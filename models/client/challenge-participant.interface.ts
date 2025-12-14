export interface ChallengeParticipant {
    _id: string;
    challengeId: string;
    userId: string;
    joinedAt: Date;
    leftAt?: Date | null; // null/undefined si encore participant
}