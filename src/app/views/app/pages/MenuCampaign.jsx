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

export default function MenuCampaing(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProyectos = () => {
    props.history.push(`/campaign/projects/${props.campaign}`);
  };

  const handleDocumentos = () => {
    props.history.push(`/orders/${props.campaign}`);
  };

  const handleClientes = () => {
    props.history.push(`/categories/get/${props.campaign}`);
  };

  const handleCorreos = () => {
    props.history.push(`/categories/get/${props.campaign}`);
  };

  const handleUploadFiles = () => {
    props.history.push(`/campaign/register/${props.campaign}`);
  };

  const handleFiles = () => {
    props.history.push(`/campaign/files/${props.campaign}`);
  };

  const handleCategory = () => {
    props.history.push(`/campaign/categories/${props.campaign}`);
  };

  const handleMail = () => {
    props.history.push(`/campaign/sends/${props.campaign}`);
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
        <MenuItem onClick={handleProyectos}>
          <ListItemIcon>
            <CropOriginalIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Proyectos</Typography>
        </MenuItem>
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
        {/* <MenuItem onClick={handleDocumentos}>
                    <ListItemIcon>
                        <AttachFileIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="inherit">Documentos</Typography>
                </MenuItem> */}
        {/* <MenuItem onClick={handleClientes}>
                    <ListItemIcon>
                        <PeopleIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="inherit">Clientes por Categoria</Typography>
                </MenuItem> */}
        {/* <MenuItem onClick={handleCorreos}>
                    <ListItemIcon>
                        <PaymenEmailIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="inherit">Correos Enviados</Typography>
                </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
