export interface ModalFormProps {
    handleClose: () => void;
    onSubmit: (name: string) => void;
    selectedItem?: { name: string };
    buttonContent: string;
}