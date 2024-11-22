import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";


export const useUserById = () => {
    async function getUserById(internetIdentityId: Principal) {
        const getUserById = await MetaReads_backend.get_user(internetIdentityId);
        return getUserById;
        // try {
        // } catch (error: any) {
        //     return undefined;
        // }
    }

    return { getUserById }
}