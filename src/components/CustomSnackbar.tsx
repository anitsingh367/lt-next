import React from "react";
import { Card, Typography, Button, SvgIcon, SvgIconProps } from "@mui/material";
import "../styles/CustomSnackBar.scss";

interface CustomSnackBarProps {
  onClose: (close: boolean) => void;
  message?: string;
  closeMessage?: string;
  icon?: React.ElementType<SvgIconProps>;
  animation?: string;
  iconColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

const CustomSnackBar: React.FC<CustomSnackBarProps> = ({
  onClose,
  message,
  closeMessage,
  icon,
  animation,
  iconColor,
  textColor,
  backgroundColor,
}) => {
  return (
    <Card
      className={animation ? animation : ""}
      sx={{
        width: "15rem",
        height: "20rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        boxShadow: backgroundColor
          ? "none"
          : "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)", // Adjusted here
        backgroundColor: backgroundColor ? backgroundColor : "transparent", // Adjusted here for consistency
      }}
    >
      {icon && (
        <SvgIcon
          component={icon}
          sx={{
            fontSize: 50,
            color: iconColor ? iconColor : "var(--primary-color)",
          }}
        />
      )}
      {message && (
        <Typography
          className={"snackbar-line-clamp"}
          variant="h6"
          sx={{
            textAlign: "center",
            color: textColor ? textColor : "var(--primary-color)",
            textTransform: "uppercase",
          }}
        >
          {message}
        </Typography>
      )}
      <Button
        variant="outlined"
        sx={{
          borderColor: textColor ? textColor : "var(--primary-color)",
          color: textColor ? textColor : "var(--primary-color)",
          "&:hover": {
            borderColor: textColor ? textColor : "var(--primary-color)",
          },
        }}
        onClick={() => {
          onClose(false);
        }}
      >
        {closeMessage ? closeMessage : "Close"}
      </Button>
    </Card>
  );
};

export default CustomSnackBar;
