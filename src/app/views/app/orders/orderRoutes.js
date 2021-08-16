import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";

const OrderList = lazy(() => import("./OrderList"));
const Order2List = lazy(() => import("./Order2List"));
const OrderDetail = lazy(() => import("./OrderDetail"));

const orderRoutes = [
  {
    path: "/orders/:idcliente",
    exact: true,
    component: () => <PrivateRoute component={OrderList} />,
  },
  {
    path: "/orders-agency/:idcliente",
    exact: true,
    component: () => <PrivateRoute component={Order2List} />,
  },
  {
    path: "/order-detail/:idorden",
    exact: true,
    component: () => <PrivateRoute component={OrderDetail} />,
  },
];

export default orderRoutes;
