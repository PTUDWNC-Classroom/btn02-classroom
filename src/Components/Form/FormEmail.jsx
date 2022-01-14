import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material"

export default function formEmailForget({
  openPopup,
  handleSubmit,
  handleCancel,
}) {
  return (
    <Dialog open={openPopup}>
      <DialogContent>
        <Typography>
          <b>Information of class</b>
        </Typography>
        <form>
          <BasicTextFields />
          <Button type="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function BasicTextFields({ label, itemInput, setItemInput, errorEmail, message, type  }) {
  console.log(itemInput)
  return (
    <div>
      <div>
        <TextField
          required
          error={errorEmail}
          fullWidth
          id="value"
          label={label}
          name="value"
          autoComplete="value"
          onChange={(e) => setItemInput(e.target.value)}
          //helperText={errorEmail? 'Nhập email sai format!' : ' '}
          autoFocus
          margin="dense"
          helperText={errorEmail ? message : " "}
          type = {type}
        />
      </div>
    </div>
  )
}
