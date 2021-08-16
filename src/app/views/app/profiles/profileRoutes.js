

import { lazy } from "react";

const Profiles = lazy(() => import("./Profiles"));

const profileRoutes = [
  {
    path: "/perfil",
    component: Profiles
  },
];

export default profileRoutes;
