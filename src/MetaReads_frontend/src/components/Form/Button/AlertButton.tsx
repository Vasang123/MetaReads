import { Button } from "@mui/material";
import { ButtonProps } from "../../Props/buttonProps";

export default function AlertButton({ onClick, text }: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#dc0130",
        fontWeight: "600",
        color: "white",
        textTransform: "none",
        fontSize: "15px",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
