import { Button } from "@mui/material"
import { red } from "@mui/material/colors"
import { styled } from "@mui/system"

const CancelButton = styled(Button)`
  color: ${red[500]};
  border-color: ${red[500]};
  &:hover {
    border-color: ${red[500]};
    background-color: ${red[50]};
  }
`

export default CancelButton
