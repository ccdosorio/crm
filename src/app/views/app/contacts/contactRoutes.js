import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";
import AuthService from "../../../services/auth.service";
import { authRoles } from "../../../auth/authRoles";

const ContactList = lazy(() => import("./ContactList"));
const ContactList2 = lazy(() => import("./ContactList2"));
const DetailContact = lazy(() => import("./DetailContact"));
let currRole = "USUARIO";

if (window.localStorage) {
  if (
    window.localStorage.getItem("user") !== undefined &&
    window.localStorage.getItem("user")
  ) {
    const user = AuthService.getCurrentUser();
    if (user.rol === -1) {
      // console.log("ADMINISTRADOR");
      currRole = authRoles.admin;
    } else if (user.rol === 5) {
      // console.log("EJECUTIVO AGENCIAS");
    } else if (user.rol === 7) {
      // console.log("EJECUTIVO DIRECTOS");
    } else if (user.rol === 16) {
      // console.log("EJECUTIVO REGIONALES");
    }
  }
}

const customerRoutes = [
  {
    path: "/contacts/:idcliente",
    exact: true,
    component: () => <PrivateRoute component={ContactList} />,
  },
  {
    path: "/contact-detail/:idcontacto",
    exact: true,
    component: () => <PrivateRoute component={DetailContact} />,
  },
  {
    path: "/contacts-all",
    exact: true,
    component: () => <PrivateRoute component={ContactList2} />,
    auth: currRole,
  },
];

export default customerRoutes;
