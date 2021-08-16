import React from "react";
import { lazy } from "react";
import { PrivateRoute } from "../../../PrivateRoute";
import CampaignCategory from "./CampaignCategory";

const Campaign = lazy(() => import("./Campaign"));
const CampaignCreate = lazy(() => import("./CampaignCreate"));
const CampaignRegister = lazy(() => import("./CampaignRegister"));
const CampaignList = lazy(() => import("./CampaignList"));
const CampaignEdit = lazy(() => import("./CampaignEdit"));
const CampaignProjects = lazy(() => import("./CampaignProjects"));
const CampaignFilesList = lazy(() => import("./CampaignFilesList"));
const CampaignSendsMails = lazy(() => import("./CampaignSendsMails"));
const CampaignViewPDF = lazy(() => import("./CampaignViewPDF"));

const campaignRoutes = [
  {
    path: "/campaign",
    exact: true,
    component: () => <PrivateRoute component={Campaign} />,
  },
  {
    path: "/campaign/create",
    exact: true,
    component: () => <PrivateRoute component={CampaignCreate} />,
  },
  {
    path: "/campaign/register/:idcampaign",
    exact: true,
    component: () => <PrivateRoute component={CampaignRegister} />,
  },
  {
    path: "/campaign/list",
    exact: true,
    component: () => <PrivateRoute component={CampaignList} />,
  },
  {
    path: "/campaign/:id/edit",
    exact: true,
    component: () => <PrivateRoute component={CampaignEdit} />,
  },
  {
    path: "/campaign/projects/:id",
    exact: true,
    component: () => <PrivateRoute component={CampaignProjects} />,
  },
  {
    path: "/campaign/files/:idcampaign",
    exact: true,
    component: () => <PrivateRoute component={CampaignFilesList} />,
  },
  {
    path: "/campaign/categories/:idcampaign",
    exact: true,
    component: () => <PrivateRoute component={CampaignCategory} />,
  },
  {
    path: "/campaign/sends/:idcapaing",
    exact: true,
    component: () => <PrivateRoute component={CampaignSendsMails} />,
  },
  {
    path: "/campaign/view-file/:idcampaign",
    exact: true,
    component: () => <PrivateRoute component={CampaignViewPDF} />,
  },
];

export default campaignRoutes;
