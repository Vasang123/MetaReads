import { storage } from "../../../../firebase.config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firebaseStorage = storage;

export default function useFirebaseStorage() {

    const uploadBookFile = async (file: File, bookId: string) => {
    
        try {
            const bookRef = ref(firebaseStorage, "books/" + bookId);
            const snapshot = await uploadBytes(bookRef, file);
        
            const downloadURL = await getDownloadURL(snapshot.ref);
        
            return downloadURL;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    
    }

    const uploadBookCover = async (file: File, bookId: string) => {
    
        try {
            const bookRef = ref(firebaseStorage, "covers/" + bookId);
            const snapshot = await uploadBytes(bookRef, file);
        
            const downloadURL = await getDownloadURL(snapshot.ref);
        
            return downloadURL;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    
    }

    return { uploadBookFile, uploadBookCover }
}
