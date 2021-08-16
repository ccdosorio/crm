import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ContactsIcon from "@material-ui/icons/ContactPhoneTwoTone";
// import InvoiceIcon from "@material-ui/icons/DescriptionTwoTone";
import OrderIcon from "@material-ui/icons/DescriptionTwoTone";
// import BrandIcon from "@material-ui/icons/FeaturedPlayListTwoTone";
// import PaymentIcon from "@material-ui/icons/PaymentTwoTone";
// import VisitIcon from "@material-ui/icons/GroupTwoTone";
import CategoryIcon from "@material-ui/icons/CategoryTwoTone";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

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

  const handleContacts = () => {
    props.history.push(`/contacts/${props.client}`);
  };

  const handleOrders = () => {
    props.history.push(`/orders/${props.client}`);
  };

  const handleCategories = () => {
    props.history.push(`/categories/get/${props.client}`);
  };

  const handleActivities = () => {
    props.history.push(`/customer/actividad/${props.client}`);
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
        <MenuItem onClick={handleContacts}>
          <ListItemIcon>
            <ContactsIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Contactos</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <InvoiceIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Facturas</Typography>
        </MenuItem> */}
        <MenuItem onClick={handleOrders}>
          <ListItemIcon>
            <OrderIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Órdenes</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BrandIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Marcas</Typography>
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Pagos</Typography>
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <VisitIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Visitas</Typography>
        </MenuItem> */}
        <MenuItem onClick={handleCategories}>
          <ListItemIcon>
            <CategoryIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Categorías</Typography>
        </MenuItem>

        <MenuItem onClick={handleActivities}>
          <ListItemIcon>
            <PermContactCalendarIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Actividades</Typography>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <ProposalIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Propuestas</Typography>
          Debe existir sub menú Propuestas abiertas, cerradas, rechazadas, crear propuesta
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
