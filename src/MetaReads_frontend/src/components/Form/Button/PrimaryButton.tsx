import { Button } from "@mui/material";
import { ButtonProps } from "../../Props/buttonProps";

export default function PrimaryButton({ onClick, text, color }: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#EFAF21",
        fontWeight: 600,
        color: color ? color : "black",
        textTransform: "none",
        fontSize: "15px",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
