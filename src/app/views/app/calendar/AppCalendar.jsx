import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import swal from "sweetalert2";
import esLocale from "@fullcalendar/core/locales/es";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import { AsyncStorage } from "AsyncStorage";
import AuthService from "../../../services/auth.service";
import Tour from "reactour";
// import { format } from "date-fns";
// import moment from "moment";

import {
  getAllExecutive,
  getAllCustomer,
  getAllExecutiveId,
  getAllCustomerId,
  getAllActivity_type,
  getAllActivity_result,
  getAllActividad,
  addActividad,
  updateActividad,
  getIdactividad,
  deleteActividad,
} from "./CalendarService";

import shortid from "shortid";
import CalendarEventDialog from "./CalendarEventDialog";
// import { dataSeries } from "app/views/charts/apex/dataSeries";
const key = "response_signin";

class AppCalendar extends Component {
  calendarComponentRef = React.createRef();
  externalEventRef = React.createRef();

  state = {
    banderaTourCita: localStorage.getItem("banderaCita"),
    isTourOpen: false,
    steps: [
      {
        selector: "#add-cita",
        content: "Añade una cita a tu tablero, luego arrastrala a tu día",
      },
      {
        selector: "#calendar",
        content: "Tu cita se mostrara en el día seleccionado",
      },
    ],
    banderaActividad: false,
    datecurrent: "",
    contacto: "",
    AddDatos: {},
    response_signin: {},
    idusuario2: "",
    eventDialogOpen: false,
    calendarEvents: [],
    array_ejecutivos: [],
    array_tipo_actividad: [],
    array_resultado_actividad: [],
    array_clientes: [],
    list_object_ejecutivos: {},
    detail_actividad: {},
    Actividad_new: {},
    eventActividad: {},
    newEventInput: "",
    deleteEventOnDrop: true,
    externalEvents: [],
  };

  toggleWeekends = () => {
    this.setState({
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };

  toggleTour = () => {
    this.setState({ isTourOpen: !this.state.isTourOpen });
    localStorage.setItem("banderaCita", "true");
  };

  handleDateClick = (arg) => {
    this.setState({
      eventDialogOpen: true,
      eventActividad: {
        title: "",
        titulo: "",
        contacto: "",
        idusuario: "",
        start: arg.date,
        fecha_creacion_actividad: arg.date,
        allDay: arg.allDay,
        classNames: ["text-white"],
        banderaActividad: this.state.banderaActividad,
      },
    });
  };

  handleEventDrop = (data) => {
    let {
      event: {
        id,
        start,
        end,
        title,
        allDay,
        classNames,
        backgroundColor,
        extendedProps,
        titulo,
        fecha_creacion_actividad,
        contacto,
        idusuario,
        propuesta,
        monto_cotizado,
        monto_venta,
        observacion,
      },
    } = data;
  };

  handleExternalEventDrop = (event) => {
    let {
      date: start,
      allDay,
      idusario,
      date: fecha_creacion_actividad,
      draggedEl: {
        innerText: titulo,
        innerText: title,
        classList: { value: classNames },
      },
    } = event;

    let id_usuario = this.state.response_signin.idusuario;

    // forma el json para guardar
    this.handleEventDialogSubmit({
      start,
      title,
      allDay,
      idusuario: id_usuario,
      fecha_creacion_actividad,
      titulo,
      classNames: classNames.concat(" text-white"),
      color_css: "#0146bb",
      banderaActividad: this.state.banderaActividad,
    });

    let { externalEvents = [], deleteEventOnDrop } = this.state;

    if (!deleteEventOnDrop) return;

    this.setState({
      externalEvents: externalEvents.filter((item) => !item.title.match(title)),
    });
  };

  handleDeleteEvent = async (idactividad, idusuario) => {
    //calendarRoutes.jsconsole.log("eliminar id-->",id)

    let eventList = [];
    let id = {
      idactividad: parseInt(idactividad),
    };
    const user = AuthService.getCurrentUser();
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify(id),
    };

    deleteActividad(request)
      .then((res) => res.json())
      .then((res) => {
        swal.fire({
          title: "ID : " + idactividad,
          text: res,
          type: "success",
          icon: "success",
          timer: 2000,
        });

        getAllActividad(idusuario)
          .then((res) => res.json())
          .then((res) => {
            eventList = res;
            //this.refreshFullCalendar(eventList);
            /* if( this.props.match.params.idactividad>0){
              this.refreshFullCalendar(eventList,true);
            }else{
            }*/
            this.refreshFullCalendar(eventList, false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleEventDialog = () => {
    this.setState({ eventDialogOpen: !this.state.eventDialogOpen });
  };

  redirectSendgrid = async (idActividad) => {
   // console.log("hola entra aca 2");
    getIdactividad(idActividad)
      .then((res) => res.json())
      .then((res) => {
        //console.log("resss", res);
        this.setState({
          eventDialogOpen: true,
          eventActividad: {
            id: res[0].idactividad,
            title: res[0].titulo,
            start: res[0].fecha_creacion_actividad,
            allDay: res[0].fecha_creacion_actividad,
            classNames: ["text-white"],
            color: res[0].color_css,
            titulo: res[0].titulo,
            fecha_creacion_actividad: res[0].fecha_creacion_actividad,
            contacto: res[0].contacto,
            idusuario: this.state.response_signin.idusuario,
            propuesta: res[0].propuesta,
            monto_cotizado: res[0].monto_cotizado,
            monto_venta: res[0].monto_venta,
            observacion: res[0].observacion,
            idactividad_tipo: res[0].idactividad_tipo,
            idactividad_resultado: res[0].idactividad_resultado,
            idejecutivo: res[0].idejecutivo,
            idcliente: res[0].idcliente,
            ejecutivo: res[0].nombre,
            cliente: res[0].cliente,
            hora_inicio: res[0].hora_inicio,
            hora_fin: res[0].hora_fin,
            gasto_reunion: res[0].gasto_reunion,
            hora_inicio_dt: res[0].hora_inicio_dt,
            hora_fin_dt: res[0].hora_fin_dt,
            estatus_mail:res[0].estatus_mail,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleEventDialogSubmit = async (eventActividad) => {
    const user = AuthService.getCurrentUser();
   // console.log("AAAAAAA", user);
    let eventList = [];
    if (eventActividad.idactividad) {
      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: user.token,
        },
        body: JSON.stringify(eventActividad),
      };

      updateActividad(request)
        .then((res) => res.json())
        .then((res) => {
         // console.log("respuesta lamda-->",res)
          swal.fire({
            title: "ID : " + eventActividad.idactividad,
            text: res,
            type: "success",
            icon: "success",
            timer: 2000,
          });
          getAllActividad(eventActividad.idusuario)
            .then((res) => res.json())
            .then((res) => {
              eventList = res;
              /*if( this.props.match.params.idactividad>0){
                console.log("vaaa entrar aca")
                this.refreshFullCalendar(eventList,true);
              }*/

              this.refreshFullCalendar(eventList, false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: user.token,
        },
        body: JSON.stringify(eventActividad),
      };

      addActividad(request)
        .then((res) => res.json())
        .then((res) => {
          swal.fire({
            title: "Creada",
            text: res,
            type: "success",
            icon: "success",
            timer: 2000,
          });
          getAllActividad(eventActividad.idusuario)
            .then((res) => res.json())
            .then((res) => {
              eventList = res;
              /*if( this.props.match.params.idactividad>0){
                  this.refreshFullCalendar(eventList,true);
                }else{
                }*/
              this.refreshFullCalendar(eventList, false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      //eventList = data;
    }
    //this.refreshFullCalendar(eventList);
  };

  handleEventClick = (data) => {
    let {
      event: {
        id,
        start,
        title,
        allDay,
        classNames,
        backgroundColor,
        extendedProps,
        titulo,
        fecha_creacion_actividad,
        contacto,
        idusuario,
        propuesta,
        monto_cotizado,
        monto_venta,
        observacion,
        banderaActividad,
      },
    } = data;
   // console.log("hola entra aca 1");
    this.props.history.push(`/citas/edit/${data.event._def.publicId}`);

    getIdactividad(data.event._def.publicId)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          eventDialogOpen: true,
          eventActividad: {
            id,
            title,
            start,
            allDay,
            classNames,
            color: res[0].color_css,
            titulo: title,
            fecha_creacion_actividad,
            contacto: res[0].contacto,
            idusuario: this.state.response_signin.idusuario,
            propuesta: res[0].propuesta,
            monto_cotizado: res[0].monto_cotizado,
            monto_venta: res[0].monto_venta,
            observacion: res[0].observacion,
            idactividad_tipo: res[0].idactividad_tipo,
            idactividad_resultado: res[0].idactividad_resultado,
            idejecutivo: res[0].idejecutivo,
            idcliente: res[0].idcliente,
            ejecutivo: res[0].nombre,
            cliente: res[0].cliente,
            hora_inicio: res[0].hora_inicio,
            hora_fin: res[0].hora_fin,
            gasto_reunion: res[0].gasto_reunion,
            hora_inicio_dt: res[0].hora_inicio_dt,
            hora_fin_dt: res[0].hora_fin_dt,
            estatus_mail:res[0].estatus_mail,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    let title = event.target.value;
    let titulo = event.target.value;

    if (event.key === "Enter") {
      title = title.trim();
      if (title !== "") {
        this.setState({
          externalEvents: [...this.state.externalEvents, { title }],
          newEventInput: "",
        });
      }
    } else {
      this.setState({ newEventInput: title });
    }
  };

  refreshFullCalendar = (eventList = [], bandera) => {
    //eventList.forEach(element => console.log("lista->",element));
    this.setState({
      calendarEvents: eventList.map((e) => ({
        titulo: e.titulo,
        idusuario: e.idusario,
        fecha_creacion_actividad: e.fecha_creacion_actividad,
        start: e.fecha_creacion_actividad,
        end: e.end,
        contacto: e.contacto,
        title: e.titulo,
        id: e.idactividad,
        classNames: ["text-white"],
        color: e.color_css,
        allDay: e.fecha_creacion_actividad,
      })),

      eventDialogOpen: bandera,
    });
  };

  componentDidMount() {

    if (this.state.banderaTourCita == "false") {
      this.toggleTour();
    } else {
      this.setState({ isTourOpen: false });
    }

    if (this.props.match.params.idactividad > 0) {
      this.redirectSendgrid(this.props.match.params.idactividad);
    }

    AsyncStorage.getItem(key)
      .then((response) => {
        this.setState({ response_signin: JSON.parse(response) });

        let idusuario = this.state.response_signin.idusuario;
        let rol = this.state.response_signin.rol;
        this.setState({ idusuario2: idusuario });

        // 5=ejecutivo agencias, 7=directos, 16 regionales, -1 Administrator
        if (rol == -1) {
          getAllActividad(idusuario)
            .then((res) => res.json())
            .then((res) => {
              if (this.state) this.setState({ calendarEvents: res });

              if (this.state.calendarEvents != "") {
                if (this.props.match.params.idactividad > 0) {
                  this.refreshFullCalendar(this.state.calendarEvents, true);
                } else {
                  this.refreshFullCalendar(this.state.calendarEvents, false);
                }
              } else {
                swal.fire({
                  title: "Información!",
                  text: "No tienes Ninguna Cita",
                  type: "success",
                  showConfirmButton: false,
                  icon: "info",
                  timer: 3000,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });

          getAllExecutive()
            .then((res) => res.json())
            .then((res) => {
              let array_ejecutivo = res.map(({ idejecutivo, ejecutivo }) => {
                if (ejecutivo !== null) {
                  return {
                    value: idejecutivo,
                    label: ejecutivo,
                  };
                } else {
                  return false;
                }
              });
              this.setState({
                array_ejecutivos: array_ejecutivo,
              });
            })
            .catch((error) => {
              console.log(error);
            });

          getAllCustomer()
            .then((res) => res.json())
            .then((res) => {
              //if (this.state) this.setState({ array_clientes: res });
              let array_cliente = res.map(({ idcliente, cliente }) => {
                if (cliente !== null) {
                  return {
                    value: idcliente,
                    label: cliente,
                  };
                } else {
                  return false;
                }
              });
              this.setState({
                array_clientes: array_cliente,
              });
            })
            .catch((error) => {
              console.log(error);
            });

          getAllActivity_type()
            .then((res) => res.json())
            .then((res) => {
              if (this.state) this.setState({ array_tipo_actividad: res });
            })
            .catch((error) => {
              console.log(error);
            });

          getAllActivity_result()
            .then((res) => res.json())
            .then((res) => {
              if (this.state) this.setState({ array_resultado_actividad: res });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          getAllActividad(idusuario)
            .then((res) => res.json())
            .then((res) => {
              if (this.state) this.setState({ calendarEvents: res });

              if (this.state.calendarEvents != "") {
                if (this.props.match.params.idactividad > 0) {
                  this.refreshFullCalendar(this.state.calendarEvents, true);
                } else {
                  this.refreshFullCalendar(this.state.calendarEvents, false);
                }
              } else {
                swal.fire({
                  title: "Información!",
                  text: "No tienes Ninguna Cita",
                  type: "success",
                  showConfirmButton: false,
                  icon: "info",
                  timer: 3000,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
          getAllExecutiveId(idusuario)
            .then((res) => res.json())
            .then((res) => {
              //if (this.state) this.setState({ array_ejecutivos: res });

              let array_ejecutivo = res.map(({ idejecutivo, ejecutivo }) => {
                if (ejecutivo !== null) {
                  return {
                    value: idejecutivo,
                    label: ejecutivo,
                  };
                } else {
                  return false;
                }
              });
              this.setState({
                array_ejecutivos: array_ejecutivo,
              });
            })
            .catch((error) => {
              console.log(error);
            });

          getAllCustomerId(idusuario)
            .then((res) => res.json())
            .then((res) => {
              //if (this.state) this.setState({ array_clientes: res });

              let array_cliente = res.map(({ idcliente, cliente }) => {
                if (cliente !== null) {
                  return {
                    value: idcliente,
                    label: cliente,
                  };
                } else {
                  return false;
                }
              });
              this.setState({
                array_clientes: array_cliente,
              });
            })
            .catch((error) => {
              console.log(error);
            });

          getAllActivity_type()
            .then((res) => res.json())
            .then((res) => {
              if (this.state) this.setState({ array_tipo_actividad: res });
            })
            .catch((error) => {
              console.log(error);
            });

          getAllActivity_result()
            .then((res) => res.json())
            .then((res) => {
              if (this.state) this.setState({ array_resultado_actividad: res });
            })
            .catch((error) => {
              console.log(error);
            });

         // console.log("hola entra aca 23");
        }
      })
      .catch((errr) => console.log("err: ", errr));

    let draggableEl = this.externalEventRef.current;
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.innerText;
        let id = shortid.generate();
        let classNames = eventEl.classList.value + " text-white";
        return { title, id, classNames, create: false };
      },
    });
  }

  render() {
    let {
      calendarEvents,
      calendarWeekends,
      eventDialogOpen,
      eventActividad,
      newEventInput,
      deleteEventOnDrop,
      externalEvents = [],
      steps,
      isTourOpen,
    } = this.state;

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Citas" },
          ]}
        ></Breadcrumb>

        <div className="row">
          <div className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <div className="create_event_wrap">
                  <div className="form-group">
                    <label htmlFor="newEvent"> Crear nueva Cita</label>
                    <input
                      id="add-cita"
                      type="text"
                      name="newEvent"
                      className="form-control"
                      placeholder="Ingrese el titulo de la cita"
                      value={newEventInput}
                      onChange={this.handleChange}
                      onKeyUp={this.handleChange}
                    />
                  </div>

                  <ul
                    className="list-group"
                    id="external-events"
                    ref={this.externalEventRef}
                  >
                    {externalEvents.map((event, ind) => (
                      <li
                        key={ind}
                        style={{ backgroundColor: "#f5f5f5", color: "#000000" }}
                        className="list-group-item  fc-event"
                      >
                        {event.title}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <label className="checkbox checkbox-primary">
                      <input
                        type="checkbox"
                        name="agree"
                        value={deleteEventOnDrop}
                        checked={deleteEventOnDrop}
                        onChange={(e) =>
                          this.setState({ deleteEventOnDrop: e.target.checked })
                        }
                      />
                    </label>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card mb-4 o-hidden" id="calendar">
              <div className="card-body">
                <FullCalendar
                  defaultView="dayGridMonth"
                  header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,listWeek",
                  }}
                  locale={esLocale}
                  themeSystem="bootstrap"
                  displayEventTime={false}
                  droppable={true}
                  eventLimit={true}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  ref={this.calendarComponentRef}
                  weekends={calendarWeekends}
                  events={calendarEvents}
                  dateClick={this.handleDateClick}
                  eventClick={this.handleEventClick}
                  drop={this.handleExternalEventDrop}
                />
              </div>
            </div>
          </div>
        </div>
        <CalendarEventDialog
          open={eventDialogOpen}
          closeDialog={this.toggleEventDialog}
          handleSubmit={this.handleEventDialogSubmit}
          eventActividad={eventActividad}
          detailActividad={this.state.detail_actividad}
          handleDeleteEvent={this.handleDeleteEvent}
          listEjecutivo={this.state.array_ejecutivos}
          listTipoActividad={this.state.array_tipo_actividad}
          listCliente={this.state.array_clientes}
          listResultadoActividad={this.state.array_resultado_actividad}
        ></CalendarEventDialog>

        <Tour
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={this.toggleTour}
          rounded={8}
          className="react-tour"
          accentColor="#1565c0"
          // prevButton={<Button size="sm">prev</Button>}
          // nextButton={<Button size="sm">next</Button>}
        />
      </div>
    );
  }
}

export default AppCalendar;
