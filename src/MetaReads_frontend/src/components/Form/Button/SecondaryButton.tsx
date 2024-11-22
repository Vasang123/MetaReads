import { Button } from "@mui/material";
import { ButtonProps } from "../../Props/buttonProps";

export default function SecondaryButton({ onClick, text } : ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#494e5a",
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
