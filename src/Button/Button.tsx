import { Button } from "@mui/material";
import { IButton } from "../types";
const BtnComponent = (props: IButton) => {
  const { variant, color, size, onClick, fullWidth, name } = props;
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {name}
    </Button>
  );
};
export default BtnComponent;
