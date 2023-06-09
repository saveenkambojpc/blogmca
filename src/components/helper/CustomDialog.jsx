import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CustomDialog({
  open,
  handleClose,
  title,
  dialogContent,
  dialogAction,
  maxWidth = "md",
}) {
  return (
    <div>
      <Dialog
        open={open}
        maxWidth={maxWidth}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>{dialogAction}</DialogActions>
      </Dialog>
    </div>
  );
}
