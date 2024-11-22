import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";


export const useSubscriptionByUser = async () => {
    async function getSubscriptionByUser(userId: string) {
        try {
            const getSubscriptionByUser =
                await MetaReads_backend.get_subscription_by_user(Principal.fromText(userId));
            if ('Ok' in getSubscriptionByUser) {
                console.log(getSubscriptionByUser.Ok)
            }
            return getSubscriptionByUser;
        } catch (error: any) {
            return error.message;
        }
    }

    return { getSubscriptionByUser }
}