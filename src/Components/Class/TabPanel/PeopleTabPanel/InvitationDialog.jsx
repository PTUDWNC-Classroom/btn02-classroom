import React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

import { BasicTextFields } from "../../../Form/FormEmail"

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
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSend}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
