import { useRef, useState, useEffect } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import LibraryForm from "../../Form/Layout/LibraryForm";
import BaseModal from "../BaseModal";
import { useCreateLibrary } from "../../Hook/Data/Library/useCreateLibrary";
import { FormModalProps } from "../../Props/modalProps";
import { Title } from "../../Utility/TitleUtility";
import { useAddBookLibrary } from "../../Hook/Data/Library/useAddBookLibrary";
import { BookModel, LibraryModel } from "../../Props/model";
import SubscribeButton from "../../Form/Button/SubscribeButton";
import { FaCheckCircle } from "react-icons/fa";
import PrimaryButton from "../../Form/Button/PrimaryButton";

interface LibraryModalProps extends FormModalProps {
    bookId: string
}

interface SelectedLibrary {
    id: string;
    name: string;
}

export default function AddLibraryModal({ open, handleClose, fetchData, selectedItem, bookId }: LibraryModalProps) {
    const { addBook, error } = useAddBookLibrary();
    const [selectedLibraries, setSelectedLibraries] = useState<SelectedLibrary[]>([]); // Track selected libraries with ID and name
    const loadingToastId = useRef(null);

    const handleAdd = async () => {
        if (selectedLibraries.length === 0) {
            ToastError("Please select at least one library.");
            return;
        }

        // @ts-ignore
        loadingToastId.current = ToastLoading("Loading..");
        try {
            const results = await Promise.all(
                selectedLibraries.map(library => addBook(library.id, bookId))
            );

            const errorMessagesSet = new Set<string>();

            results.forEach(response => {
                if (response?.Err) {
                    errorMessagesSet.add(response.Err.NotFound?.message || "Unknown error");
                }
            });

            if (errorMessagesSet.size > 0) {
                ToastError(Array.from(errorMessagesSet).join(", "));
            } else {
                ToastSuccess("Books Added to Library");
                fetchData();
                handleClose();
            }
        } finally {
            if (loadingToastId.current) {
                toast.dismiss(loadingToastId.current);
                loadingToastId.current = null;
            }
        }
    };

    const toggleSelection = (library: LibraryModel) => {
        setSelectedLibraries(prevSelected => {
            const updatedSelection = [...prevSelected];
            const index = updatedSelection.findIndex(item => item.id === library.id.toString());
            if (index > -1) {
                updatedSelection.splice(index, 1); // Remove if already selected
            } else {
                updatedSelection.push({ id: library.id.toString(), name: library.name }); // Add new selection
            }
            return updatedSelection;
        });
    };

    useEffect(() => {
        if (!open) {
            setSelectedLibraries([]); // Reset selection on close
        }
    }, [open]);

    return (
        <BaseModal open={open} handleClose={handleClose}>
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-center">Add To Library</h2>

                <div className="flex flex-col gap-2">
                    {selectedItem?.map((library: LibraryModel) => (
                        <div
                            key={library.id.toString()}
                            onClick={() => toggleSelection(library)}
                            className={`cursor-pointer py-3 px-4 border-gray-500 rounded-md bg-black flex justify-between`}
                        >
                            {library.name}
                            <FaCheckCircle
                                size={23}
                                className={`${selectedLibraries.some(item => item.id === library.id.toString())
                                    ? 'text-green-500'
                                    : 'text-gray-300'
                                    }`}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <PrimaryButton text={"Done"} onClick={handleAdd} color="black" />
                </div>
            </div>
        </BaseModal>
    );
}
