import { Button } from "@mui/material";
import { ButtonProps } from "../../Props/buttonProps";

export default function OutlinedButton({ onClick, text, color, outlineColor }: ButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        fontWeight: 400,
        color: color ? color : "black",
        textTransform: "none",
        fontSize: "15px",
        outline: "1px solid white",
        outlineColor: outlineColor,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
