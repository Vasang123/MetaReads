import { SubscriptionModel } from "./model";

export interface User {
    id: string;
    username: string;
    money: number;
    image: string;
    subscription: SubscriptionModel | null | undefined;
}