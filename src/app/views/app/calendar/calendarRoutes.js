import { lazy } from "react";

const AppCalendar = lazy(() => import("./AppCalendar"));
const CalendarEventDialog = lazy(() => import("./CalendarEventDialog"));

const calendarRoutes = [
  {
    path: "/citas",
    component: AppCalendar
  },
  {
    path: "/citas/edit/:idactividad",
    exact: true,
    component:  AppCalendar 
  },
];

export default calendarRoutes;
