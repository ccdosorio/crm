import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";

const Prospects = lazy(() => import("./Prospects"));
const ProspectEdit = lazy(() => import("./ProspectEdit"));
const prospectsRoutes = [
  {
    path: "/prospects/list",
    exact: true,
    component: () => <PrivateRoute component={Prospects} />,
  },
  {
    path: "/prospects/:id/edit",
    exact: true,
    component: () => <PrivateRoute component={ProspectEdit} />,
  },
];

export default prospectsRoutes;
