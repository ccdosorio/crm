import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";

const CustomerAdd = lazy(() => import("./CustomerAdd"));
const Customers = lazy(() => import("./Customers"));
const CustomersActividad = lazy(() => import("./CustomerListActividad"));
const CustomerListActividadId = lazy(() => import("./CustomerListActividadId"));
const CustomerEdit = lazy(() => import("./CustomerEdit"));
const CustomerRList = lazy(() => import("./CustomerRelationshipList"));
const CategoryList = lazy(() => import("./CategoryList"));
const AppCalendar = lazy(() => import("../calendar/AppCalendar"));

const customerRoutes = [
  {
    path: "/customer/list",
    exact: true,
    component: () => <PrivateRoute component={Customers} />,
  },
  {
    path: "/all/customer/list/actividades",
    exact: true,
    component: () => <PrivateRoute component={CustomersActividad} />,
  },
  {
    path: "/customer/actividad/:idcliente",
    exact: true,
    component: () => <PrivateRoute component={CustomerListActividadId} />,
  },
  {
    path: "/prospect/add",
    exact: true,
    component: () => <PrivateRoute component={CustomerAdd} />,
  },
  {
    path: "/customer/:id/edit",
    exact: true,
    component: () => <PrivateRoute component={CustomerEdit} />,
  },
  {
    path: "/customer-r/get/:idcliente",
    exact: true,
    component: () => <PrivateRoute component={CustomerRList} />,
  },
  {
    path: "/categories/get/:idcliente",
    exact: true,
    component: () => <PrivateRoute component={CategoryList} />,
  },
  {
    path: "/citas/edit/:idactividad",
    exact: true,
    component: () => <PrivateRoute component={AppCalendar} />,
  },
];

export default customerRoutes;
