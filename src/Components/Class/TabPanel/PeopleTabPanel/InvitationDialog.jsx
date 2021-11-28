import React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

import { BasicTextFields } from "../../../Form/FormEmail"
import CancelButton from "../../../Button/CancelButton"

export default function InvitationDialog({
  memberType,
  openPopup,
  itemInput,
  handleSend,
  handleCancel,
  setItemInput,
}) {
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={openPopup} onClose={handleCancel}>
        <DialogTitle>Invite {memberType}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <BasicTextFields
            label="Email address"
            itemInput={itemInput}
            setItemInput={setItemInput}
          />
        </DialogContent>
        <DialogActions style={{ padding: "0 24 16 0" }}>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <Button variant="contained" onClick={handleSend}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
