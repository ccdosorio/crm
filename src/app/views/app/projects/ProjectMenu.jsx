import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import UploadIcon from "@material-ui/icons/BackupOutlined";
import FilesIcon from "@material-ui/icons/AttachFileOutlined";
import CategoryIcon from "@material-ui/icons/CategoryOutlined";
import Typography from "@material-ui/core/Typography";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import AuthService from "../../../services/auth.service";

const user = AuthService.getCurrentUser();

const ProjectMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUploadFiles = () => {
    props.history.push(`/project/upload/${props.project}`);
  };

  const handleFiles = () => {
    props.history.push(`/project/files/${props.project}`);
  };

  const handleCategory = () => {
    props.history.push(`/project/categories/${props.project}`);
  };

  const handleMail = () => {
    props.history.push(`/project/sends/${props.project}`);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user.rol === -1 && (
          <MenuItem onClick={handleUploadFiles}>
            <ListItemIcon>
              <UploadIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <Typography variant="inherit">Subir Archivo</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleFiles}>
          <ListItemIcon>
            <FilesIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Ver Archivos</Typography>
        </MenuItem>
        <MenuItem onClick={handleCategory}>
          <ListItemIcon>
            <CategoryIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Ver Categorías</Typography>
        </MenuItem>
        <MenuItem onClick={handleMail}>
          <ListItemIcon>
            <MailOutlineIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Administrar Envíos</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProjectMenu;
