import AuthService from "./services/auth.service";
const user = AuthService.getCurrentUser();

let jsonContact = {
  name: "Contactos",
  description: "Administración de Contactos",
  type: "dropDown",
  icon: "i-Address-Book",
  sub: [
    {
      icon: "i-Business-Mens",
      name: "Consultar",
      path: "/contacts-all",
      type: "link",
    },
  ],
};
export const navigations = [
  {
    name: "Inicio",
    description: "Nuestro Diario",
    type: "dropDown",
    icon: "i-Bar-Chart",
    sub: [
      {
        icon: "i-Home1",
        name: "Inicio",
        path: "/dashboard/v2",
        type: "link",
      },
    ],
  },
  {
    name: "Prospectos",
    description: "Administración de Prospectos",
    type: "dropDown",
    icon: "i-Add-UserStar",
    sub: [
      {
        icon: "i-Add-User",
        name: "Agregar",
        path: "/prospect/add",
        type: "link",
      },
      {
        icon: "i-File-Edit",
        name: "Editar",
        path: "/prospects/list",
        type: "link",
      },
    ],
  },
  {
    name: "Clientes",
    description: "Administración de Clientes",
    type: "dropDown",
    icon: "i-Administrator",
    sub: [
      {
        icon: "i-Business-Mens",
        name: "Consultar",
        path: "/customer/list",
        type: "link",
      },
      {
        icon: "i-Calendar-4",
        name: "Lista Actividad",
        path: "/all/customer/list/actividades",
        type: "link",
      },
    ],
  },
  {
    name: "Agencias",
    description: "Administración de Agencias",
    type: "link",
    icon: "i-Business-ManWoman",
    sub: [
      {
        icon: "i-Business-Mens",
        name: "Consultar",
        path: "/agencies/list",
        type: "link",
      },
    ],
  },
  {
    name: "Mercadeo",
    description: "Administración de Mercadeo",
    type: "dropDown",
    icon: "i-Dollar-Sign",
    sub: [
      {
        name: "Campañas",
        descriptio: "",
        type: "dropDown",
        icon: "i-Gift-Box",
        sub: [
          {
            icon: "i-File-Search",
            name: "Campañas",
            path: "/campaign/list",
            type: "link",
          },
          {
            icon: "i-Add-File",
            name: "Crear Campaña",
            path: "/campaign/create",
            type: "link",
          },
          // {
          //   icon: "i-Email",
          //   name: "Administrar Envíos",
          //   path: "/campaign/sends",
          //   type: "link",
          // },
        ],
      },
      {
        name: "Proyectos",
        descriptio: "",
        type: "dropDown",
        icon: "i-File-TXT",
        sub: [
          {
            icon: "i-File-Pictures",
            name: "Proyectos",
            path: "/projects",
            type: "link",
          },
          {
            icon: "i-Add-File",
            name: "Crear Proyecto",
            path: "/projects/create",
            type: "link",
          },
          // {
          //   icon: "i-Email",
          //   name: "Administrar Envíos",
          //   path: "/",
          //   type: "link",
          // },
        ],
      },
      // {
      //   icon: "i-Mail-Send",
      //   name: "Lanzar Campaña",
      //   path: "/campaign",
      //   type: "link",
      // },
    ],
  },
  // {
  //   name: "Monitoreo",
  //   description: "Administración de Monitoreo",
  //   type: "dropDown",
  //   icon: "i-Monitor-5",
  //   sub: [
  //     {
  //       icon: "i-Monitor-2",
  //       name: "Consultar",
  //       path: "/pages/blank-page",
  //       type: "link",
  //     },
  //   ],
  // },
  {
    name: "Citas",
    description: "Administración de Citas",
    type: "dropDown",
    icon: "i-Calendar-4",
    sub: [
      {
        icon: "i-Calendar",
        name: "Agendar Citas",
        path: "/citas",
        type: "link",
      },
    ],
  },
  // {
  //   name: "Ventas",
  //   description: "Administración de Ventas",
  //   type: "dropDown",
  //   icon: "i-Line-Chart",
  //   sub: [
  //     {
  //       icon: "i-Money-Bag",
  //       name: "Administrar",
  //       path: "/administration",
  //       type: "link",
  //     },
  //   ],
  // },
];
if (window.localStorage) {
  if (
    window.localStorage.getItem("user") !== undefined &&
    window.localStorage.getItem("user")
  ) {
    if (user.rol === -1) {
      navigations.push(jsonContact);
    }
  }
}
