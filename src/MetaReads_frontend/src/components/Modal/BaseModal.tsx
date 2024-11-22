import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";

interface BaseModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({ children, open, handleClose }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "#21242e",
            p: 4,
            borderRadius: 2,
            color: "text.primary",
            outline: "1px solid rgba(128, 128, 128, 0.4)",
          }}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default BaseModal;
