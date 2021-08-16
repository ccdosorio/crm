import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";
const ProjectsList = lazy(() => import("./ProjectsList"));
const ProjectCreate = lazy(() => import("./ProjectCreate"));
const ProjectEdit = lazy(() => import("./ProjectEdit"));
const ProjectCategory = lazy(() => import("./ProjectCategory"));
const ProjectUploadS3 = lazy(() => import("./ProjectUploadS3"));
const ProjectFilesListS3 = lazy(() => import("./ProjectFilesListS3"));
const ProjectSendsMails = lazy(() => import("./ProjectSendsMails"));

const proyectRoutes = [
  {
    path: "/projects",
    exact: true,
    component: () => <PrivateRoute component={ProjectsList} />,
  },
  {
    path: "/projects/create",
    exact: true,
    component: () => <PrivateRoute component={ProjectCreate} />,
  },
  {
    path: "/project/:id/edit",
    exact: true,
    component: () => <PrivateRoute component={ProjectEdit} />,
  },
  {
    path: "/project/categories/:id",
    exact: true,
    component: () => <PrivateRoute component={ProjectCategory} />,
  },
  {
    path: "/project/upload/:id",
    exact: true,
    component: () => <PrivateRoute component={ProjectUploadS3} />,
  },
  {
    path: "/project/files/:idproject",
    exact: true,
    component: () => <PrivateRoute component={ProjectFilesListS3} />,
  },
  {
    path: "/project/sends/:idproject",
    exact: true,
    component: () => <PrivateRoute component={ProjectSendsMails} />,
  },
];

export default proyectRoutes;
