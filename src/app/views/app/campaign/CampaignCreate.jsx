import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Breadcrumb } from "@gull";
import { Formik } from "formik";
import { classList } from "@utils";
import * as yup from "yup";
import swal from "sweetalert2";
import AuthService from "../../../services/auth.service";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();
class CampaignCreate extends Component {
  state = {
    name: "",
    start_date: "",
    final_date: "",
    description: "",
    expected_income: 0.0,
    budgeted_cost: 0.0,
    real_cost: 0.0,
    number_shipping: 0,
    manager: "",
    idcampaign_type: "",
    idcampaign_status: "",
  };

  handleSubmit = async (values) => {
    const res = await Http.post("campaign/create", values);
    await swal.fire({
      title: "¡Exitoso!",
      text: res,
      icon: "success",
      timer: 1500,
    });
    await this.props.history.push("/campaign/list");
  };

  render() {
    return (
      <div>
        <Breadcrumb routeSegments={[{ name: "Crear Campaña" }]}></Breadcrumb>
        {user.rol === -1 ? (
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
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
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="name">Nombre</label>
                            <input
                              id="name"
                              name="name"
                              className="form-control form-control-rounded"
                              placeholder="Ingresa el nombre de la campaña"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            {errors.name && touched.name && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.name}
                              </div>
                            )}
                          </div>

                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="start_date">Fecha Inicio</label>
                            <input
                              type="date"
                              placeholder="yyyy-mm-dd"
                              min="1800-01-01"
                              max="2050-12-31"
                              className="form-control form-control-rounded"
                              id="start_date"
                              value={values.start_date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="start_date"
                            />
                            {errors.start_date && touched.start_date && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.start_date}
                              </div>
                            )}
                          </div>

                          <div className="col-md-4 mb-3 form-group">
                            <label htmlFor="final_date">Fecha Final</label>
                            <input
                              type="date"
                              placeholder="yyyy-mm-dd"
                              min="1800-01-01"
                              max="2050-12-31"
                              className="form-control form-control-rounded"
                              id="final_date"
                              value={values.final_date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="final_date"
                            />
                            {errors.final_date && touched.final_date && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.final_date}
                              </div>
                            )}
                          </div>
                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.idcampaign_type &&
                                touched.idcampaign_type,
                              "invalid-field":
                                errors.idcampaign_type &&
                                touched.idcampaign_type,
                            })}
                          >
                            <label htmlFor="idcampaign_type">
                              Tipo de Campaña
                            </label>
                            <select
                              className="form-control form-control-rounded"
                              name="idcampaign_type"
                              onChange={handleChange}
                              value={values.idcampaign_type}
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="1">Conferencia</option>
                              <option value="2">Correo Directo</option>
                              <option value="3">Correo Electronico</option>
                              <option value="4">Comercio telefonico</option>
                              <option value="5">Relaciones Publicas</option>
                            </select>
                            <div className="text-danger mt-1 ml-2">
                              {errors.idcampaign_type}
                            </div>
                          </div>

                          <div className="col-md-8 form-group mb-3">
                            <label htmlFor="description">Descripción</label>
                            <input
                              id="description"
                              name="description"
                              className="form-control form-control-rounded"
                              placeholder="Ingresa una descripción"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />
                            {errors.lastName && touched.lastName && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.lastName}
                              </div>
                            )}
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="expected_income">
                              Ingresos esperados
                            </label>
                            <input
                              name="expected_income"
                              id="expected_income"
                              className="form-control form-control-rounded"
                              placeholder="Ingresos esperados"
                              type="expected_income"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.expected_income}
                            />
                            {errors.email && touched.email && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.email}
                              </div>
                            )}
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="budgeted_cost">
                              Costo Presupuestado
                            </label>
                            <input
                              className="form-control form-control-rounded"
                              id="budgeted_cost"
                              name="budgeted_cost"
                              placeholder="Costo Presupuestado"
                              type="text"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.budgeted_cost}
                            />
                            {errors.phone && touched.phone && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.phone}
                              </div>
                            )}
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="real_cost">Costo Real</label>
                            <input
                              className="form-control form-control-rounded"
                              id="real_cost"
                              name="real_cost"
                              placeholder="Costo Real"
                              type="number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.real_cost}
                            />
                            {errors.cardNumber && touched.cardNumber && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.cardNumber}
                              </div>
                            )}
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="number_shipping">
                              Número de Envíos
                            </label>
                            <input
                              className="form-control form-control-rounded"
                              id="number_shipping"
                              name="number_shipping"
                              placeholder="Número de Envíos"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.number_shipping}
                            />
                          </div>
                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="manager">Encargado</label>
                            <input
                              className="form-control form-control-rounded"
                              id="manager"
                              name="manager"
                              placeholder="Encargado"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              values={values.manager}
                            />
                            {errors.manager && touched.manager && (
                              <div className="text-danger mt-1 ml-2">
                                {errors.manager}
                              </div>
                            )}
                          </div>

                          <div
                            className={classList({
                              "col-md-4 mb-3 form-group": true,
                              "valid-field":
                                !errors.idcampaign_status &&
                                touched.idcampaign_status,
                              "invalid-field":
                                errors.idcampaign_status &&
                                touched.idcampaign_status,
                            })}
                          >
                            <label htmlFor="idcampaign_status">Estatus</label>
                            <select
                              id="idcampaign_status"
                              className="form-control form-control-rounded"
                              name="idcampaign_status"
                              value={values.idcampaign_status}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="1">Propuesta</option>
                              <option value="2">Interna</option>
                              <option value="3">Presentada</option>
                              <option value="4">Aprobada</option>
                            </select>
                            {errors.idcampaign_status &&
                              touched.idcampaign_status && (
                                <div className="text-danger mt-1 ml-2">
                                  {errors.idcampaign_status}
                                </div>
                              )}
                          </div>
                          <div className="col-md-12">
                            <Button type="submit">Agregar</Button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted">No tienes acceso a esta información ☹️</p>
        )}
      </div>
    );
  }
}

const basicFormSchema = yup.object().shape({
  name: yup.string().required("Este campo es requerido"),
  start_date: yup.string().required("Este campo es requerido"),
  final_date: yup.string().required("Este campo es requerido"),
  idcampaign_type: yup.number().required("Seleccionar tipo"),
  idcampaign_status: yup.number().required("Seleccionar estatus"),
  manager: yup.string().required("Este campo es requerido"),
});

export default CampaignCreate;
