import { useRef, useState } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import { useUpdateLibrary } from "../../Hook/Data/Library/useUpdateLibrary";
import { LibraryModel } from "../../Props/model";

interface UpdateLibraryProps {
    selectedItem: LibraryModel;
    handleCloseUpdate: (name: string) => void;
}
export default function UpdateLibrary({ selectedItem, handleCloseUpdate }: UpdateLibraryProps) {
    const { updateLibrary, error } = useUpdateLibrary();
    const loadingToastId = useRef(null);
    const [editedName, setEditedName] = useState<string>(selectedItem.name);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleUpdate(editedName);
        }
    };

    const handleUpdate = async (name: string) => {
        // @ts-ignore
        loadingToastId.current = ToastLoading("Loading..");
        try {
            const success = await updateLibrary(selectedItem.id, name);
            if (success) {
                ToastSuccess("Library Updated Successfully");
                handleCloseUpdate(name);
            } else {
                ToastError(error);
            }
        } finally {
            if (loadingToastId.current) {
                toast.dismiss(loadingToastId.current);
                loadingToastId.current = null;
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-white text-base outline-none border-b-2 border-white w-full"
                autoFocus
            />
        </div>
    );
}
