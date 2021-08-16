import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";

const PautaList = lazy(() => import("./PautaList"));
const PautaDetail = lazy(() => import("./PautaDetail"));

const pautaRoutes = [
    {
        path: "/pautas/:idorden",
        exact: true,
        component: () => <PrivateRoute component={PautaList} />,
    },
    {
        path: "/pauta/detail/:idpauta",
        exact: true,
        component: () => <PrivateRoute component={PautaDetail} />,
    },
]

export default pautaRoutes;