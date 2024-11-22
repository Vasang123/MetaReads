import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import LibraryForm from "../../Form/Layout/LibraryForm";
import BaseModal from "../BaseModal";
import { useCreateLibrary } from "../../Hook/Data/Library/useCreateLibrary";
import { FormModalProps } from "../../Props/modalProps";
import SecondaryButton from "../../Form/Button/SecondaryButton";
import PrimaryButton from "../../Form/Button/PrimaryButton";
import { Title } from "../../Utility/TitleUtility";

export default function CreateLibraryModal({ open, handleClose, fetchData }: FormModalProps) {
    const { createLibrary, error } = useCreateLibrary();
    const loadingToastId = useRef(null);


    const handleCreate = async (name: string) => {
        // @ts-ignores
        loadingToastId.current = ToastLoading("Loading..");
        try {
            const success = await createLibrary(name);
            if (success) {
                ToastSuccess("Library Created Successfully");
                fetchData();
                handleClose()
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
        <BaseModal open={open} handleClose={handleClose}>
            <div className="flex flex-col gap-10">
                {/* <Title text="Add New Library" /> */}
                <div className="flex gap-4 flex-col">
                    <div className="flex gap-2">
                        Enter Library name
                        <div className="flex gap-1">
                            (
                            <div className="text-red-500">Required</div>
                            )
                        </div>
                    </div>
                    <LibraryForm
                        buttonContent={"Create"}
                        handleClose={handleClose}
                        onSubmit={handleCreate} />
                </div>

            </div>
        </BaseModal >
    );
}
