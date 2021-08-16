import React from "react";
import { Redirect } from "react-router-dom";
import dashboardRoutes from "./views/dashboard/dashboardRoutes";
import uiKitsRoutes from "./views/ui-kits/uiKitsRoutes";
import formsRoutes from "./views/forms/formsRoutes";
import sessionsRoutes from "./views/sessions/sessionsRoutes";
import AuthGuard from "./auth/AuthGuard";
import widgetsRoute from "./views/widgets/widgetsRoute";
import chartsRoute from "./views/charts/chartsRoute";
import dataTableRoute from "./views/dataTable/dataTableRoute";
import extraKitsRoutes from "./views/extra-kits/extraKitsRoutes";
import pagesRoutes from "./views/pages/pagesRoutes";
import iconsRoutes from "./views/icons/iconsRoutes";
import invoiceRoutes from "./views/app/invoice/invoiceRoutes";
import inboxRoutes from "./views/app/inbox/inboxRoutes";
import chatRoutes from "./views/app/chat/chatRoutes";
import calendarRoutes from "./views/app/calendar/calendarRoutes";
import taskManagerRoutes from "./views/app/task-manager/taskManagerRoutes";
import ecommerceRoutes from "./views/app/ecommerce/ecommerceRoutes";
import contactRoutes from "./views/app/contact/contactRoutes";
import customerRoutes from "./views/app/customer/customerRoutes";
import prospectsRoutes from "./views/app/prospects/prospectsRoutes";
import contactsRoutes from "./views/app/contacts/contactRoutes";
import orderRoutes from "./views/app/orders/orderRoutes";
import pautaRoutes from "./views/app/pauta/pautaRoutes";
import profileRoutes from "./views/app/profiles/profileRoutes";
import agenciesRoutes from "./views/app/agencies/agencyRoutes";
import campaignRoutes from "./views/app/campaign/campaignRoutes";
import projectRoutes from "./views/app/projects/projectRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/session/signin" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...sessionsRoutes,
  {
    path: "/",
    component: AuthGuard,
    routes: [
      ...dashboardRoutes,
      ...uiKitsRoutes,
      ...formsRoutes,
      ...widgetsRoute,
      ...chartsRoute,
      ...dataTableRoute,
      ...extraKitsRoutes,
      ...pagesRoutes,
      ...iconsRoutes,
      ...invoiceRoutes,
      ...inboxRoutes,
      ...chatRoutes,
      ...taskManagerRoutes,
      ...customerRoutes,
      ...prospectsRoutes,
      ...orderRoutes,
      ...contactsRoutes,
      ...pautaRoutes,
      ...profileRoutes,
      ...agenciesRoutes,
      ...campaignRoutes,
      ...projectRoutes,
      ...calendarRoutes,
      ...ecommerceRoutes,
      ...contactRoutes,
      ...redirectRoute,
      ...errorRoute,
    ],
  },
];

export default routes;
