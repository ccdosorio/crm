import React, { useState } from "react";
import "@date-io/date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import AuthService from "../../../services/auth.service";
import {
  Modal,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import { CirclePicker } from "react-color";
import * as yup from "yup";
import Select, { components } from "react-select";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

// import { useToasts } from "react-toast-notifications";
// import { stubTrue } from "lodash";

const options = ["Option 1", "Option 2"];

let bandera = false;
let bandera_time = false;

const CalendarEventDialog = ({
  open,
  eventActividad,
  handleSubmit,
  Toast,
  handleDeleteEvent,
  closeDialog,
  listEjecutivo,
  listTipoActividad,
  listCliente,
  listResultadoActividad,
  detailActividad,
}) => {
  //console.log("daaaaaCHe",eventActividad)

  const [inputValueTime, setInputValueTime] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [inputValue2, setInputValue2] = React.useState("");
  // const [horaInicio, sethoraInicio] = useState();
  // const [horaFinal, sethoraFinal] = useState();

  // console.log("horaaaaaaaa",eventActividad.hora_inicio_dt)
  const tipoActividadList = listTipoActividad.map((data) => (
    <option key={data.idactividad_tipo} value={data.idactividad_tipo}>
      {data.nombre}
    </option>
  ));

  const resultadoActividadList = listResultadoActividad.map((dataresult) => (
    <option
      key={dataresult.idactividad_resultado}
      value={dataresult.idactividad_resultado}
    >
      {dataresult.nombre}
    </option>
  ));

  const handleTime = (time) => {
    // console.log("asiiiii",time)
    setInputValueTime(time);
  };

  const handleIdEjectivo = (value) => {
    bandera = true;
    setInputValue(value.value);
  };

  const handleIdCliente = (value) => {
    setInputValue2(value.value);
  };

  const handleFormSubmit = (values) => {
    //if(values.fecha_creacion_actividad === undefined)
    const user = AuthService.getCurrentUser();
    let idejecut;
    let titulo;
    let idtipoactividad;
    let idresultado;

    if (inputValue === "" && eventActividad.idejecutivo === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Ejecutivo"
      );
    } else if (bandera === true) {
      idejecut = inputValue;
    } else if (bandera === false && eventActividad.idejecutivo !== null) {
      idejecut = eventActividad.idejecutivo;
    }

    if (values.titulo === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Titulo"
      );
    } else {
      titulo = values.titulo;
    }

    if (values.idactividad_tipo < 1) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Tipo Actividad"
      );
    } else {
      idtipoactividad = values.idactividad_tipo;
    }

    if (values.idactividad_resultado < 1) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Resultado Actividad"
      );
    } else {
      idresultado = values.idactividad_resultado;
    }

    let idclient;
    if (eventActividad.idcliente !== null) {
      idclient = eventActividad.idcliente;
    } else {
      idclient = inputValue2;
    }

    let hora_inicio_dt;
    if (bandera_time === false && eventActividad.hora_inicio_dt !== null) {
      hora_inicio_dt = eventActividad.hora_inicio_dt;
    } else {
      hora_inicio_dt = values.hora_inicio_dt;
    }

    /*if (bandera_time === true) {
      horainicio = inputValueTime;
    } else if(bandera_time === false && eventActividad.hora_inicio_dt !== null) {
      horainicio = eventActividad.hora_inicio_dt;
    }*/

    // console.log("hora inicio",hora_inicio_dt)

    let horafinal;
    if (eventActividad.hora_fin_dt !== null) {
      horafinal = eventActividad.hora_fin_dt;
    } else {
      horafinal = values.hora_fin_dt;
    }

    //console.log("hora final",horafinal)

    if (
      idejecut >= 1 &&
      titulo != null &&
      idtipoactividad >= 1 &&
      idresultado >= 1
    ) {
      let actividad_data = {
        idactividad: values.id,
        titulo: titulo,
        idusuario: values.idusuario,
        fecha_creacion_actividad: values.start,
        contacto: values.contacto,
        propuesta: values.propuesta,
        monto_cotizado: values.monto_cotizado,
        monto_venta: values.monto_venta,
        observacion: values.observacion,
        color_css: values.color,
        idactividad_tipo: idtipoactividad,
        idactividad_resultado: idresultado,
        idejecutivo: idejecut,
        idcliente: idclient,
        hora_inicio: hora_inicio_dt,
        hora_fin: horafinal,
        gasto_reunion: values.gasto_reunion,
        hora_inicio_dt: hora_inicio_dt,
        hora_fin_dt: horafinal,
        usuarioRol: user.nombre,
        estatus_mail: eventActividad.estatus_mail,
      };
      // console.log("update",actividad_data)
      handleSubmit(actividad_data);
    }
  };

  return (
    <Modal
      show={open}
      centered={true}
      size="lg"
      className="d-flex justify-content-center mx-auto"
      style={{ maxWidth: "700px" }}
      onHide={closeDialog}
    >
      <Formik
        enableReinitialize={true}
        initialValues={eventActividad}
        onSubmit={handleFormSubmit}
        validationSchema={eventSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
          setFieldValue,
          setFieldValue2,
        }) => {
          return (
            <Card>
              <Card.Header className="bg-primary text-white d-flex flex-wrap justify-content-between align-items-center">
                <h4 className="m-0 text-white">Cita</h4>
                <i
                  className="i-Close-Window cursor-pointer text-18"
                  onClick={closeDialog}
                ></i>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Form.Row>
                      <FormGroup as={Col}>
                        <FormLabel>Titulo</FormLabel>
                        <FormControl
                          type="text"
                          name="titulo"
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.titulo}
                          isInvalid={errors.titulo && touched.titulo}
                        />
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel>Tipo de Actividad</FormLabel>

                        <select
                          type="text"
                          name="idactividad_tipo"
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.idactividad_tipo}
                          className="form-control mb-1"
                        >
                          <option value="" selected>
                            Seleccione..
                          </option>
                          {tipoActividadList}
                        </select>
                      </FormGroup>

                      <FormGroup as={Col}>
                        <FormLabel>Resultado</FormLabel>
                        <select
                          type="text"
                          name="idactividad_resultado"
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.idactividad_resultado}
                          className="form-control mb-1"
                        >
                          <option value="" selected>
                            Seleccione..
                          </option>
                          {resultadoActividadList}
                        </select>
                      </FormGroup>
                    </Form.Row>

                    <Form.Row>
                      <FormGroup as={Col}>
                        {/* <FormLabel>Ejecutivo</FormLabel>
                        <select className="form-control mb-1 w-100"> 
                            {ejecutivosList}
                        </select>*/}

                        {/* <Autocomplete
                         
                         value={inputValue.i}
                          onChange={(event, newValue) => {
                            setInputValue(newValue);
                          }}
                          name={"idejecutivo"}
                          value={values.idejecutivo}
                          onChange={(event,newValue) => {
                            setInputValue(newValue);
                          }}

                          id="controllable-states-demo"
                          options={listEjecutivo}
                          getOptionLabel={(option) => option.ejecutivo}
                        
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name={"idejecutivo"}
                              label="Ejecutivos"
                              variant="outlined"
                            />
                          )}
                        />
                        
                          onChange={handleIdCategory}
                          defaultValue={valuesCategory}
                        */}
                        <FormLabel>Ejecutivo</FormLabel>
                        <Select
                          className="mb-3 basic-single"
                          classNamePrefix="select"
                          name="idjecutivo"
                          onChange={handleIdEjectivo}
                          onBlur={handleBlur}
                          style={{ width: 200 }}
                          options={listEjecutivo}
                          defaultValue={{
                            label: values.ejecutivo,
                            value: values.idejecutivo,
                          }}
                        ></Select>
                      </FormGroup>
                      <FormGroup as={Col}>
                        {/*<Autocomplete
                          value={values.idcliente}
                          onChange={(event, newValue) => {
                            setInputValue2(newValue);
                          }}
                          id="combo-box-demo"
                          options={listCliente}
                          getOptionLabel={(option) => option.cliente}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Clientes"
                              variant="outlined"
                            />
                          )}
                        />*/}
                        {/*<FormLabel>Cliente</FormLabel>
                        <select className="form-control mb-1 w-100">
                          {clienteList}
                        </select>*/}
                        <FormLabel>Cliente</FormLabel>
                        <Select
                          className="mb-3 basic-single"
                          classNamePrefix="select"
                          name="idcliente"
                          onChange={handleIdCliente}
                          onBlur={handleBlur}
                          style={{ width: 200 }}
                          options={listCliente}
                          defaultValue={{
                            label: values.cliente,
                            value: values.idcliente,
                          }}
                        />
                      </FormGroup>

                      <FormGroup as={Col}>
                        <FormLabel>Gasto Reunión</FormLabel>
                        <FormControl
                          type="text"
                          name="gasto_reunion"
                          className="mb-3"
                          onChange={handleChange}
                          placeholder={"0.00"}
                          onBlur={handleBlur}
                          value={values.gasto_reunion}
                          isInvalid={
                            errors.gasto_reunion && touched.gasto_reunion
                          }
                        />
                      </FormGroup>
                    </Form.Row>

                    <Form.Row>
                      <FormGroup as={Col}>
                        <FormLabel>Contacto</FormLabel>
                        <FormControl
                          type="text"
                          name="contacto"
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contacto}
                          isInvalid={errors.contacto && touched.contacto}
                        />
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel>Propuesta</FormLabel>
                        <FormControl
                          type="text"
                          name="propuesta"
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.propuesta}
                          isInvalid={errors.propuesta && touched.propuesta}
                        />
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel>Monto Cotizado</FormLabel>
                        <FormControl
                          type="text"
                          name="monto_cotizado"
                          className="mb-3"
                          placeholder={"0.00"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.monto_cotizado}
                          isInvalid={
                            errors.monto_cotizado && touched.monto_cotizado
                          }
                        />
                      </FormGroup>

                      <FormGroup as={Col}>
                        <FormLabel>Monto Venta</FormLabel>
                        <FormControl
                          type="text"
                          name="monto_venta"
                          className="mb-3"
                          placeholder={"0.00"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.monto_venta}
                          isInvalid={errors.monto_venta && touched.monto_venta}
                        />
                      </FormGroup>
                    </Form.Row>

                    <Form.Row>
                      <FormGroup as={Col}>
                        <FormLabel>Fecha</FormLabel>
                        <DatePicker
                          className="form-control mb-1"
                          selected={
                            values.start ? new Date(values.start) : new Date()
                          }
                          onChange={(date) => {
                            setFieldValue("start", date);
                          }}
                        />
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel>Hora Inicio</FormLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <TimePicker
                            className="form-control mb-1"
                            value={values.hora_inicio_dt}
                            onChange={(hora_inicio_dt) => {
                              setFieldValue("hora_inicio_dt", hora_inicio_dt);
                              bandera_time = true;

                              // console.log("hora_inicio_dt",hora_inicio_dt,"bandera",bandera_time)
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </FormGroup>

                      <FormGroup as={Col}>
                        <FormLabel>Hora Final</FormLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <TimePicker
                            className="form-control mb-1"
                            value={values.hora_fin_dt}
                            onChange={(hora_fin_dt) => {
                              setFieldValue("hora_fin_dt", hora_fin_dt);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </FormGroup>
                    </Form.Row>

                    <FormLabel>Observaciones</FormLabel>
                    <textarea
                      className="form-control"
                      aria-label="With textarea"
                      name="observacion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.observacion}
                      isInvalid={errors.observacion && touched.observacion}
                    ></textarea>
                  </FormGroup>

                  <br />
                  <br />
                  <br />

                  <p>
                    <label className="checkbox checkbox-primary">
                      <span>Dar color a mi cita</span>
                      <span className="checkmark"></span>
                    </label>
                  </p>
                  <CirclePicker
                    className="w-100 mb-4"
                    color={values.color}
                    onChangeComplete={({ hex }) => setFieldValue("color", hex)}
                  />
                  <div className="d-flex justify-content-between">
                    <Button type="submit" variant="primary">
                      Guardar
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() =>
                        handleDeleteEvent(values.id, values.idusuario)
                      }
                    >
                      <i className="i-Delete-File"> </i>
                      Eliminar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          );
        }}
      </Formik>
      <NotificationContainer />
    </Modal>
  );
};

const eventSchema = yup.object().shape({
  titulo: yup.string().required("El titulo es requerido"),
  /*fecha_creacion_actividad: yup.string().required("Start date is required")*/
});

export default CalendarEventDialog;
