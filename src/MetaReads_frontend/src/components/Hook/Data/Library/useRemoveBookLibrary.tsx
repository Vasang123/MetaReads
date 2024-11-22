import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { getCookie } from "../../../Utility/IdentityUtility";

export const useRemoveBookLibrary = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);

    const removeBook = async (library_id: string, book_id: string, name?: string) => {
        setLoading(true);
        setError(null);
        const identityCookie = getCookie('identity');
        if (identityCookie) {
            const user_id: Principal = Principal.fromText(identityCookie);
            const bookId: Principal = Principal.fromText(book_id);
            const libraryId: Principal = Principal.fromText(library_id);
            try {
                const response: any = await MetaReads_backend.remove_book_in_library({
                    id: [libraryId],
                    user_id: user_id,
                    name: [],
                    book_id: [bookId]
                });
                if (response.Err) {
                    console.error(response.Err.NotFound.message);

                    return response;
                } else {
                    console.log("Book Removed from library:", response);
                    return true;
                }
            } catch (err: any) {
                setError(err);
                return false;
            } finally {
                setLoading(false);
            }
        } else {
            console.error('Identity cookie not found.');
        }
    };

    return { removeBook, loading, error };
};
