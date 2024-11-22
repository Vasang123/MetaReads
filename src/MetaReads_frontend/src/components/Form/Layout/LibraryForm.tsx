import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
import { ModalFormProps } from "../../Props/formProps";
import { ToastError } from "../Notifications/ErrorNotification";

export default function LibraryForm({
    handleClose,
    onSubmit,
    selectedItem,
    buttonContent,
}: ModalFormProps) {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
        }
    }, [selectedItem]);
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = async () => {
        if (!name || name.trim() === "") {
            ToastError("Library name can't be empty");
        } else {
            onSubmit(name);
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={name}
                onChange={handleNameChange}

                className="bg-transparent text-white text-base outline-none border-b-2 border-white w-full"
                autoFocus
            />
            <div className="flex w-full justify-center gap-3 ">
                <SecondaryButton text={"Cancel"} onClick={handleClose} />
                <PrimaryButton text={buttonContent} onClick={handleSubmit} />
            </div>
        </div>
    )
}