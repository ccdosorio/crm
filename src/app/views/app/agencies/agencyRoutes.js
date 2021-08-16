import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";

const Agencies = lazy(() => import("./Agencies"));
const AgencyEdit = lazy(() => import("./AgencyEdit"));

const agenciesRoutes = [
  {
    path: "/agencies/list",
    exact: true,
    component: () => <PrivateRoute component={Agencies} />,
  },
  {
    path: "/agency/:idcliente/edit",
    exact: true,
    component: () => <PrivateRoute component={AgencyEdit} />,
  },
];

export default agenciesRoutes;
