import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Formik } from "formik";
import * as yup from "yup";
import { classList } from "@utils";
import { Form } from "react-bootstrap";
import SweetAlert from "sweetalert2-react";
import AuthService from "../../../services/auth.service";
import Select from "react-select";

import swal from "sweetalert";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();
class CustomerAdd extends Component {
  state = {
    show: false,
    msg: "",
    departments: [],
    municipalities: [],
    genero: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefonos: "",
    tipo_persona: "",
    nit: "",
    correo: "",
    fecha_nacimiento: "",
    idgeo_departamento: "",
    idgeo_municipio: "",
    zona: "",
    idejecutivo: 1,
    referencia_ubicacion: "",
    nombre_comercial: "",
    celular: "",
    idforma_pago: "",
    idcliente_tipo: "",
    direccion_facturacion: "",
    direccion_pago: "",
    nombre_factura: "",
    nit_factura: "",
    fecha_factura: "",
    fecha_pago: "",
    exento_iva: "No",
    exento_timbre: "No",
    agente_retenedor: "",
    cuenta_banco: "",
    idbanco: "",
    idtipo_cuenta: "",
    tipo_ingreso: "",
    telefono_contacto: "",
    correo_contacto: "",
    idcontacto_tipo: "",
    nombre_contacto: "",
  };

  componentDidMount() {
    this.getDepartments();
    this.getMunicipalities();
  }

  getDepartments = async () => {
    const res = await Http.get("departments/all/");
    if (res.length > 0) {
      let departments = res.map(({ idgeo_departamento, nombre }) => {
        if (nombre !== null) {
          return {
            label: nombre,
            value: idgeo_departamento,
          };
        } else {
          return false;
        }
      });
      await this.setState({
        departments: departments,
      });
    }
  };

  getMunicipalities = async () => {
    const res = await Http.get("municipalities/all/");
    let municipalities = res.map(({ idgeo_municipio, nombre }) => {
      if (nombre !== null) {
        return {
          label: nombre,
          value: idgeo_municipio,
        };
      } else {
        return false;
      }
    });
    await this.setState({
      municipalities: municipalities,
    });
  };

  handleDepartment = (value) => {
    this.setState({ idgeo_departamento: value.value });
  };

  handleMunicipalities = (value) => {
    this.setState({ idgeo_municipio: value.value });
  };

  handleSubmit = async (values) => {
    const response = await Http.post("validate-nit-db", { nit: values.nit });
    const response2 = await Http.post("validate-nit-db", {
      nit: values.nit_factura,
    });

    if (!this.nitIsValid(values.nit)) {
      swal("¡Error!", "Nit inválido", "error");
    } else if (!this.nitIsValid(values.nit_factura)) {
      swal("¡Error!", "Nit de facturación inválido", "error");
    } else if (response.res !== null && values.nit !== "C/F") {
      swal("¡Error!", "El Nit ya existe", "error");
    } else if (response2.res !== null && values.nit_factura !== "C/F") {
      swal("¡Error!", "El Nit de facturación ya existe", "error");
    } else {
      let cel, fecha_nacimiento, forma_pago, fecha_factura, fecha_pago;
      let tipo_ingreso, banco, tipo_cuenta, cliente_tipo, agente_retenedor;
      let departamento, municipio;
      values.celular === "" ? (cel = null) : (cel = values.celular);
      values.fecha_nacimiento === ""
        ? (fecha_nacimiento = null)
        : (fecha_nacimiento = values.fecha_nacimiento);
      values.idforma_pago === ""
        ? (forma_pago = null)
        : (forma_pago = values.idforma_pago);
      values.fecha_factura === ""
        ? (fecha_factura = null)
        : (fecha_factura = values.fecha_factura);
      values.fecha_pago === ""
        ? (fecha_pago = null)
        : (fecha_pago = values.fecha_pago);
      values.tipo_ingreso === ""
        ? (tipo_ingreso = null)
        : (tipo_ingreso = values.tipo_ingreso);
      values.idbanco === "" ? (banco = null) : (banco = values.idbanco);
      values.idtipo_cuenta === ""
        ? (tipo_cuenta = null)
        : (tipo_cuenta = values.idtipo_cuenta);
      values.idcliente_tipo === ""
        ? (cliente_tipo = 1)
        : (cliente_tipo = values.idcliente_tipo);
      values.agente_retenedor === ""
        ? (agente_retenedor = "No")
        : (agente_retenedor = values.agente_retenedor);

      this.state.idgeo_departamento === ""
        ? (departamento = null)
        : (departamento = this.state.idgeo_departamento);

      this.state.idgeo_municipio === ""
        ? (municipio = null)
        : (municipio = this.state.idgeo_municipio);

      let prospect = {
        genero: values.genero,
        nombre: values.nombre,
        apellido: values.apellido,
        direccion: values.direccion,
        telefonos: values.telefonos,
        tipo_persona: values.tipo_persona,
        nit: values.nit,
        correo: values.correo,
        fecha_nacimiento: fecha_nacimiento,
        idgeo_departamento: departamento,
        idgeo_municipio: municipio,
        zona: values.zona,
        idejecutivo: user.idpersona,
        referencia_ubicacion: values.referencia_ubicacion,
        nombre_comercial: values.nombre_comercial,
        celular: cel,
        idforma_pago: forma_pago,
        idcliente_tipo: cliente_tipo,
        direccion_facturacion: values.direccion_facturacion,
        direccion_pago: values.direccion_pago,
        nombre_factura: values.nombre_factura,
        nit_factura: values.nit_factura,
        fecha_factura: fecha_factura,
        fecha_pago: fecha_pago,
        exento_iva: values.exento_iva,
        exento_timbre: values.exento_timbre,
        agente_retenedor: agente_retenedor,
        cuenta_banco: values.cuenta_banco,
        idbanco: banco,
        idtipo_cuenta: tipo_cuenta,
        tipo_ingreso: tipo_ingreso,
        telefono_contacto: values.telefono_contacto,
        correo_contacto: values.correo_contacto,
        idcontacto_tipo: values.idcontacto_tipo,
        nombre_contacto: values.nombre_contacto,
      };

      const res = await Http.post("customer-post", prospect);
      if (res) {
        await this.setState({ show: true, msg: res });
        await this.props.history.push("/prospects/list");
      } else {
        swal("¡Error!", "No se pudo agregar su registro", "error");
      }
    }
  };

  nitIsValid = (nit) => {
    if (!nit) {
      return true;
    }
    if (nit === "C/F") {
      return true;
    }

    var nitRegExp = new RegExp("^[0-9]+(-?[0-9kK])?$");

    if (!nitRegExp.test(nit)) {
      return false;
    }

    nit = nit.replace(/-/, "");
    var lastChar = nit.length - 1;
    var number = nit.substring(0, lastChar);
    var expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

    var factor = number.length + 1;
    var total = 0;

    for (var i = 0; i < number.length; i++) {
      var character = number.substring(i, i + 1);
      var digit = parseInt(character, 10);

      total += digit * factor;
      factor = factor - 1;
    }

    var modulus = (11 - (total % 11)) % 11;
    var computedChecker = modulus === 10 ? "k" : modulus.toString();

    return expectedCheker === computedChecker;
  };

  render() {
    const { departments } = this.state;
    const { municipalities } = this.state;
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Agregar Prospecto" },
          ]}
        ></Breadcrumb>
        {this.state.show && (
          <SweetAlert
            show={true}
            title="¡Exitoso!"
            type="success"
            text={this.state.msg}
            confirmButtonText="OK"
            confirmButtonClass=""
            onConfirm={() => this.setState({ show: false })}
          />
        )}
        <div className="row">
          <Formik
            initialValues={this.state}
            validationSchema={basicFormSchema}
            onSubmit={this.handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              return (
                <div className="col-md-12">
                  <form
                    className="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="card mb-6">
                      <div className="card-body">
                        <div className="form-row">
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field": !errors.nombre && touched.nombre,
                              "invalid-field": errors.nombre && touched.nombre,
                            })}
                          >
                            <label htmlFor="nombre">Nombre</label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="nombre"
                              placeholder="Nombre"
                              name="nombre"
                              value={values.nombre}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.nombre}
                            </div>
                          </div>
                          <div
                            // className={classList({
                            //   "col-md-4 mb-3 form-group": true,
                            //   "valid-field":
                            //     touched.apellido && !errors.apellido,
                            //   "invalid-field":
                            //     touched.apellido && errors.apellido,
                            // })}
                            className="col-md-4 mb-3 form-group"
                          >
                            <label htmlFor="apellido">Apellido</label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="apellido"
                              placeholder="Apellido"
                              value={values.apellido}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="apellido"
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.apellido}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field": !errors.genero && touched.genero,
                              "invalid-field": errors.genero && touched.genero,
                            })}
                          >
                            <label htmlFor="nombre">Género</label>
                            <select
                              className="form-control form-control-rounded"
                              name="genero"
                              onChange={handleChange}
                              value={values.genero}
                              required
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </select>
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              Seleccionar genero
                            </div>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="direccion">
                              Dirección Domiciliar/Negocio/Empresa
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="direccion"
                              placeholder="Direccion"
                              value={values.direccion}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="direccion"
                            />
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                touched.telefonos && !errors.telefonos,
                              "invalid-field":
                                touched.telefonos && errors.telefonos,
                            })}
                          >
                            <label htmlFor="telefonos">
                              Teléfono de la empresa/persona
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="telefonos"
                              placeholder="Teléfono"
                              name="telefonos"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.telefonos}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.tipo_persona && touched.tipo_persona,
                              "invalid-field":
                                errors.tipo_persona && touched.tipo_persona,
                            })}
                          >
                            <label htmlFor="tipo_persona">
                              Tipo de Prospecto
                            </label>
                            <select
                              className="form-control form-control-rounded"
                              id="tipo_persona"
                              name="tipo_persona"
                              onChange={handleChange}
                              value={values.tipo_persona}
                              required
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="Individual">Individual</option>
                              <option value="Juridica">Juridica</option>
                            </select>
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              Seleccionar un tipo
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field": touched.nit && !errors.nit,
                              "invalid-field": touched.nit && errors.nit,
                            })}
                          >
                            <label htmlFor="nit">Nit</label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="nit"
                              placeholder="Nit"
                              value={values.nit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="nit"
                              required
                            />
                            {/* <div className="valid-feedback">¡Se ve bien!</div> */}
                            <div className="invalid-feedback">{errors.nit}</div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field": touched.correo && !errors.correo,
                              "invalid-field": touched.correo && errors.correo,
                            })}
                          >
                            <label htmlFor="correo">
                              Correo Electrónica de Empresa
                            </label>
                            <input
                              type="email"
                              className="form-control form-control-rounded"
                              id="correo"
                              placeholder="Correo Electrónico"
                              value={values.correo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="correo"
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.correo}
                            </div>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="fecha_nacimiento">
                              Aniversario
                            </label>
                            <input
                              type="date"
                              placeholder="yyyy-mm-dd"
                              min="1800-01-01"
                              max="2050-12-31"
                              className="form-control form-control-rounded"
                              id="fecha_nacimiento"
                              value={values.fecha_nacimiento}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="fecha_nacimiento"
                            />
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.idgeo_departamento &&
                                touched.idgeo_departamento,
                              "invalid-field":
                                errors.idgeo_departamento &&
                                touched.idgeo_departamento,
                            })}
                          >
                            <label htmlFor="idgeo_departamento">
                              Departamento
                            </label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              defaultValue={values.idgeo_departamento}
                              name="idgeo_departamento"
                              options={departments}
                              onChange={this.handleDepartment}
                            />
                            {/* <div className="valid-feedback">¡Se ve bien!</div> */}
                            <div className="invalid-feedback">
                              {errors.idgeo_departamento}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.idgeo_municipio &&
                                touched.idgeo_municipio,
                              "invalid-field":
                                errors.idgeo_municipio &&
                                touched.idgeo_municipio,
                            })}
                          >
                            <label htmlFor="idgeo_municipio">Municipio</label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              defaultValue={values.idgeo_municipio}
                              name="idgeo_municipio"
                              options={municipalities}
                              onChange={this.handleMunicipalities}
                            />
                            {/* <div className="valid-feedback">¡Se ve bien!</div> */}
                            <div className="invalid-feedback">
                              Seleccionar municipio
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field": !errors.zona && touched.zona,
                              "invalid-field": errors.zona && touched.zona,
                            })}
                          >
                            <label htmlFor="zona">Zona</label>
                            <input
                              type="number"
                              className="form-control form-control-rounded"
                              id="zona"
                              placeholder="Zona"
                              name="zona"
                              value={values.zona}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.zona}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.referencia_ubicacion &&
                                touched.referencia_ubicacion,
                              "invalid-field":
                                errors.referencia_ubicacion &&
                                touched.referencia_ubicacion,
                            })}
                          >
                            <label htmlFor="referencia_ubicacion">
                              Referencia de Ubicación
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="referencia_ubicacion"
                              placeholder="Referencia de ubicación"
                              name="referencia_ubicacion"
                              value={values.referencia_ubicacion}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.referencia_ubicacion}
                            </div>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="nombre_comercial">
                              Nombre Comercial
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="nombre_comercial"
                              placeholder="Nombre Comercial"
                              name="nombre_comercial"
                              value={values.nombre_comercial}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field": !errors.celular && touched.celular,
                              "invalid-field":
                                errors.celular && touched.celular,
                            })}
                          >
                            <label htmlFor="zona">
                              Celular (Recepción de SMS, Whatsapp)
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-rounded"
                              id="celular"
                              placeholder="Celular"
                              name="celular"
                              value={values.celular}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.celular}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="card mb-6">
                      <div className="card-body">
                        <div className="form-row">
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="idforma_pago">Forma de Pago</label>
                            <select
                              className="form-control form-control-rounded"
                              name="idforma_pago"
                              onChange={handleChange}
                              value={values.idforma_pago}
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="1">Transferencia</option>
                              <option value="2">Deposito</option>
                              <option value="3">Cheque</option>
                              <option value="4">Efectivo</option>
                              <option value="5">Tarjeta</option>
                            </select>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="idcliente_tipo">
                              Tipo de cliente
                            </label>
                            <select
                              className="form-control form-control-rounded"
                              name="idcliente_tipo"
                              onChange={handleChange}
                              value={values.idcliente_tipo}
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="1">Directo</option>
                              <option value="2">Agencia de Publicidad</option>
                            </select>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="direccion_facturacion">
                              Dirección de Facturación
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="direccion_facturacion"
                              placeholder="Direccion de facturación"
                              value={values.direccion_facturacion}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="direccion_facturacion"
                            />
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="direccion_pago">
                              Dirección de Pago
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="direccion_pago"
                              placeholder="Direccion de pago"
                              value={values.direccion_pago}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="direccion_pago"
                            />
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.nombre_factura &&
                                touched.nombre_factura,
                              "invalid-field":
                                errors.nombre_factura && touched.nombre_factura,
                            })}
                          >
                            <label htmlFor="nombre_factura">
                              Nombre para Facturar
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="nombre_factura"
                              placeholder="Nombre para facturar"
                              name="nombre_factura"
                              value={values.nombre_factura}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.nombre_factura}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                touched.nit_factura && !errors.nit_factura,
                              "invalid-field":
                                touched.nit_factura && errors.nit_factura,
                            })}
                          >
                            <label htmlFor="nit_factura">
                              Nit para facturar
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="nit_factura"
                              placeholder="Nit para facturar"
                              value={values.nit_factura}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="nit_factura"
                              required
                            />
                            {/* <div className="valid-feedback">¡Se ve bien!</div> */}
                            <div className="invalid-feedback">
                              {errors.nit_factura}
                            </div>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="fecha_factura">
                              Día para Facturar
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-rounded"
                              id="fecha_factura"
                              placeholder="Día para facturar"
                              name="fecha_factura"
                              value={values.fecha_factura}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="fecha_pago">Día de Pago</label>
                            <input
                              type="number"
                              className="form-control form-control-rounded"
                              id="fecha_pago"
                              placeholder="Día de pago"
                              name="fecha_pago"
                              value={values.fecha_pago}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="cuenta_banco">No. de cuenta</label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="cuenta_banco"
                              placeholder="No. de cuenta"
                              value={values.cuenta_banco}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="cuenta_banco"
                            />
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="idbanco">Banco</label>
                            <select
                              className="form-control form-control-rounded"
                              name="idbanco"
                              onChange={handleChange}
                              value={values.idbanco}
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="1">Banco Industrial</option>
                              <option value="2">Banrural</option>
                            </select>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="idtipo_cuenta">
                              Tipo de Cuenta
                            </label>
                            <select
                              className="form-control form-control-rounded"
                              name="idtipo_cuenta"
                              onChange={handleChange}
                              value={values.idtipo_cuenta}
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="1">Monetaria</option>
                              <option value="2">Ahorro</option>
                            </select>
                          </div>
                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="tipo_ingreso">
                              Tipo de Ingreso
                            </label>
                            <select
                              className="form-control form-control-rounded"
                              name="tipo_ingreso"
                              onChange={handleChange}
                              value={values.tipo_ingreso}
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="Agencia">Agencia</option>
                              <option value="Directo">Directo</option>
                            </select>
                          </div>
                          <div className="col-md-2 mb-3 form-group">
                            <label htmlFor="exento_iva">Excento de IVA</label>
                            <fieldset
                              value={values.exento_iva}
                              onChange={handleChange}
                            >
                              <Form.Group>
                                <Form.Check
                                  type="radio"
                                  label="Si"
                                  value="Si"
                                  name="exento_iva"
                                  id="exento_iva"
                                />
                                <Form.Check
                                  type="radio"
                                  label="No"
                                  value="No"
                                  name="exento_iva"
                                  id="exento_iva2"
                                />
                              </Form.Group>
                            </fieldset>
                          </div>
                          <div className="col-md-2 mb-3 form-group">
                            <label htmlFor="exento_iva">
                              Excento de Timbre
                            </label>
                            <fieldset
                              value={values.exento_timbre}
                              onChange={handleChange}
                            >
                              <Form.Group>
                                <Form.Check
                                  type="radio"
                                  label="Si"
                                  value="Si"
                                  name="exento_timbre"
                                  id="exento_timbre"
                                />
                                <Form.Check
                                  type="radio"
                                  label="No"
                                  value="No"
                                  name="exento_timbre"
                                  id="exento_timbre2"
                                />
                              </Form.Group>
                            </fieldset>
                          </div>
                          <div
                            className={classList({
                              "col-md-2 mb-3 form-group": true,
                              "valid-field":
                                touched.agente_retenedor &&
                                !errors.agente_retenedor,
                              "invalid-field":
                                touched.agente_retenedor &&
                                errors.agente_retenedor,
                            })}
                          >
                            <label htmlFor="agente_retenedor">
                              Agente retenedor de IVA
                            </label>
                            <fieldset
                              value={values.agente_retenedor}
                              onChange={handleChange}
                            >
                              <Form.Group>
                                <Form.Check
                                  type="radio"
                                  label="Si"
                                  value="Si"
                                  name="agente_retenedor"
                                  id="agente_retenedor"
                                />
                                <Form.Check
                                  type="radio"
                                  label="No"
                                  value="No"
                                  name="agente_retenedor"
                                  id="agente_retenedor2"
                                />
                              </Form.Group>
                            </fieldset>
                            <div className="invalid-feedback">
                              {errors.agente_retenedor}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="card mb-6">
                      <div className="card-body">
                        <div className="card-title mb-3 form-group">
                          Información de Contacto
                        </div>
                        <div className="form-row">
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.nombre_contacto &&
                                touched.nombre_contacto,
                              "invalid-field":
                                errors.nombre_contacto &&
                                touched.nombre_contacto,
                            })}
                          >
                            <label htmlFor="nombre_contacto">
                              Nombre de Contacto
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="nombre_contacto"
                              placeholder="Nombre de contacto"
                              name="nombre_contacto"
                              value={values.nombre_contacto}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.nombre_contacto}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.telefono_contacto &&
                                touched.telefono_contacto,
                              "invalid-field":
                                errors.telefono_contacto &&
                                touched.telefono_contacto,
                            })}
                          >
                            <label htmlFor="telefono_contacto">
                              Telefono de Contacto
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="telefono_contacto"
                              placeholder="Telefono de contacto"
                              name="telefono_contacto"
                              value={values.telefono_contacto}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.telefono_contacto}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.correo_contacto &&
                                touched.correo_contacto,
                              "invalid-field":
                                errors.correo_contacto &&
                                touched.correo_contacto,
                            })}
                          >
                            <label htmlFor="nombre">
                              Correo Electrónico de Contacto
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-rounded"
                              id="correo_contacto"
                              placeholder="Correo electrónico de contacto"
                              name="correo_contacto"
                              value={values.correo_contacto}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.correo_contacto}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.idcontacto_tipo &&
                                touched.idcontacto_tipo,
                              "invalid-field":
                                errors.idcontacto_tipo &&
                                touched.idcontacto_tipo,
                            })}
                          >
                            <label htmlFor="nombre">Tipo de Contacto</label>
                            <select
                              className="form-control form-control-rounded"
                              name="idcontacto_tipo"
                              onChange={handleChange}
                              value={values.idcontacto_tipo}
                              required
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="1">Facturación Electrónica</option>
                              <option value="2">Comercial</option>
                              <option value="3">Crédito</option>
                            </select>
                            <div className="valid-feedback">¡Se ve bien!</div>
                            <div className="invalid-feedback">
                              {errors.idcontacto_tipo}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button className="btn btn-primary" type="submit">
                          Agregar
                        </button>
                      </div>
                      <br />
                    </div>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }
}

const basicFormSchema = yup.object().shape({
  nombre: yup.string().required("Se requiere el nombre"),
  // apellido: yup.string().required("Se requiere el apellido"),
  genero: yup.string().required("Seleccionar genero"),
  telefonos: yup.string().required("Se requiere teléfono"),
  tipo_persona: yup.string().required("Seleccionar un tipo"),
  nit: yup.string().required("Se requiere el nit"),
  correo: yup
    .string()
    .email("Formato inválido")
    .required("Se requiere el correo"),
  // idgeo_departamento: yup
  //   .number()
  //   .test("card-validator", "invalid", (value) => (value !== 0 ? true : false))
  //   .required("Seleccionar departamento"),
  // idgeo_municipio: yup
  //   .number()
  //   .test("card-validator", "invalid", (value) => (value !== 0 ? true : false))
  //   .required("Seleccionar municipio"),
  zona: yup.number().required("Se requiere zona"),
  referencia_ubicacion: yup.string().required("Se requiere la referencia"),
  celular: yup.string().min(8, "Formato inválido"),
  nombre_factura: yup.string().required("Se requiere el nombre"),
  nit_factura: yup.string().required("Se requiere el nit"),
  agente_retenedor: yup.string().required("Campo requerido"),
  telefono_contacto: yup.string().required("Se requiere el teléfono"),
  correo_contacto: yup
    .string()
    .email("Formato inválido")
    .required("Se requiere el correo"),
  nombre_contacto: yup.string().required("Se requiere el nombre"),
  idcontacto_tipo: yup
    .number()
    .test("card-validator", "invalid", (value) => (value !== 0 ? true : false))
    .required("Seleccionar tipo"),
});

export default CustomerAdd;
