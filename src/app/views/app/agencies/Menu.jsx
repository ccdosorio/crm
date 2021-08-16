import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ClientIcon from "@material-ui/icons/PeopleAlt";
// import InvoiceIcon from "@material-ui/icons/DescriptionTwoTone";
import OrderIcon from "@material-ui/icons/DescriptionTwoTone";
// import ProposalIcon from "@material-ui/icons/PostAdd";
import Typography from "@material-ui/core/Typography";

export default function MenuOptions(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrders = () => {
    props.history.push(`/orders-agency/${props.agency}`);
  };

  const handleCustomersR = () => {
    props.history.push(`/customer-r/get/${props.agency}`);
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
        <MenuItem onClick={handleOrders}>
          <ListItemIcon>
            <OrderIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Órdenes</Typography>
        </MenuItem>
        <MenuItem onClick={handleCustomersR}>
          <ListItemIcon>
            <ClientIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Clientes Relacionados</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <InvoiceIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Facturas</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ProposalIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Propuestas</Typography>
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
