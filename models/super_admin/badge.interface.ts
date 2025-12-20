export interface Badge {
    _id: string;
    name: string;
    description: string;
    rule: BadgeRule;
}

export interface BadgeRule {
    metric: string;
    value: number;
}