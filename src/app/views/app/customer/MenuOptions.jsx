import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PautaIcon from "@material-ui/icons/AssignmentTwoTone";
// import PdfIcon from "@material-ui/icons/PictureAsPdfTwoTone";
import Typography from "@material-ui/core/Typography";
import { Button } from "react-bootstrap";

export default function MenuOptions(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePautas = () => {
    props.history.push(`/pautas/${props.order}`);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handlePautas}>
          <ListItemIcon>
            <PautaIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Pautas</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PdfIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">PDF</Typography>
        </MenuItem> */}
      </Menu>
    </div>
  );
}
