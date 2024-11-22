
export interface FormModalProps {
    open: boolean;
    handleClose: () => void;
    fetchData: () => void;
    selectedItem?: any
}