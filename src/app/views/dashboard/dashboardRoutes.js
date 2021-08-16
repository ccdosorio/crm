import React from "react";
import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";
import { PrivateRoute } from "../../PrivateRoute";

const Dashboard1 = lazy(() =>
    import ("./dashboard1/Dashboard1"));

const Dashboard2 = lazy(() =>
    import ("./dashboard2/Dashboard2"));

const dashboardRoutes = [{
        path: "/dashboard/v1",
        component: Dashboard1,
        auth: authRoles.admin,
    },
    {
        path: "/dashboard/v2",
        exact: true,
        component: () => < PrivateRoute component = { Dashboard2 }
        />,
    },
];

export default dashboardRoutes;