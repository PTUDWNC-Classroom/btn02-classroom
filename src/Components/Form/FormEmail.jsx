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

export function BasicTextFields({ itemInput, setItemInput }) {
  return (
    <div>
      <div>
        <TextField
          required
          //error={errorEmail}
          fullWidth
          id="value"
          label="Value"
          name="value"
          autoComplete="value"
          onChange={(e) => setItemInput(e.target.value)}
          //helperText={errorEmail? 'Nhập email sai format!' : ' '}
        />
      </div>
    </div>
  )
}
