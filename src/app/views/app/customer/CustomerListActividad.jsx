import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";
import AuthService from "../../../services/auth.service";
import CustomerService from "./customerService";
class CustomerListActividad extends Component {
  state = {
    customerList: [],
    page: 0,
    rowsPerPage: 10,
    numer_records: "",
    idcliente: -1,
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    CustomerService.getActivityCliente(
      this.state.idcliente,
      user.idusuario,
      this.state.page,
      this.state.rowsPerPage
    )
      .then((res) => res.json())
      .then((res) =>
        this.setState({ customerList: res, numer_records: res[0].cantidad })
      );
  }

  handeViewClick = (idactividad) => {
    console.log("citas", idactividad);
    this.props.history.push(`/citas/edit/${idactividad}`);
  };

  handlePageClick = (data) => {
    console.log("resss", data);
    let { rowsPerPage } = this.state;
    let page = data.selected * 10;
    const user = AuthService.getCurrentUser();
    CustomerService.getActivityCliente(
      this.state.idcliente,
      user.idusuario,
      page,
      rowsPerPage
    )
      .then((res) => res.json())
      .then((res) => this.setState({ customerList: res, page }));
  };

  handleShowProjects = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const user = AuthService.getCurrentUser();
    CustomerService.getActivityCliente(
      this.state.idcliente,
      user.idusuario,
      page,
      rowsPerPage
    )
      .then((res) => res.json())
      .then((res) => this.setState({ customerList: res, page }));
  };

  render() {
    let { customerList, numer_records, rowsPerPage } = this.state;
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "inicio", path: "/dashboard/v2" },
            { name: "Listado Actividad" },
          ]}
        />

        {customerList.length < 1 ? (
          <div className="spinner-bubble spinner-bubble-primary m-5"></div>
        ) : (
          <Card elevation={6} className="w-100 overflow-auto">
            <div className="row px-4 mt-3">
              <div className="col-sm-12 col-md-6 mb-2">
                <div className="d-flex align-items-center">
                  <span className="mr-1">Show</span>
                  <div className="mr-1">
                    <select
                      className="form-control"
                      onChange={this.handleShowProjects}
                      value={rowsPerPage}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <span>entries</span>
                </div>
                {/* <div>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary"
                    table="table-to-campaing"
                    filename="Campañas"
                    sheet="Campañas"
                    buttonText="Descarga Excel"
                  />
                </div> */}
              </div>
            </div>
            <Table style={{ minWidth: 750 }} id="table-to-campaing">
              <thead>
                <tr>
                  <th className="pl-sm-24">Título</th>
                  <th className="px-0">Tipo Actividad</th>
                  <th className="px-0">Resultado</th>
                  <th className="px-0">Contacto</th>
                  <th className="px-0">Fecha/Creación</th>
                  <th className="px-0">Hora/Inicio</th>
                  <th className="px-0">Hora/Fin</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer, index) => (
                  <tr key={index}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {customer.titulo || (
                        <p className="text-muted">Sin Titulo</p>
                      )}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {customer.n_tipo_actividad || (
                        <p className="text-muted">Sin Tipo Actividad</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {customer.n_actividad_resultado || (
                        <p className="text-muted">Sin Resultado</p>
                      )}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {customer.contacto || (
                        <p className="text-muted">Sin Contacto</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {customer.fecha_creacion_actividad || (
                        <p className="text-muted">Sin Fecha Creacion</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {customer.hora_inicio || (
                        <p className="text-muted">Sin Hora Inicio</p>
                      )}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {customer.hora_fin || (
                        <p className="text-muted">Sin Hora Fin</p>
                      )}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": customer.estado === "Activo",
                          "bg-warning": customer.estado === "Inactivo",
                        })}
                      >
                        {customer.estado}
                      </small>
                    </td>
                    <td className="pl-0">
                      {customer.estado === "Inactivo" || (
                        <i
                          className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                          onClick={() =>
                            this.handeViewClick(customer.idactividad)
                          }
                        ></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="px-3 pb-3 mt-3 d-flex flex-row justify-content-end">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(numer_records / rowsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default CustomerListActividad;
