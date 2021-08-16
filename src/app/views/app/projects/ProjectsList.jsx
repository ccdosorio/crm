import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";
import { Loading } from "@gull";
import Http from "../../../libs/Https";

/**
 * Componente para listar los proyectos
 */
class ProjectsList extends Component {
  state = {
    data: [],
    page: 0,
    rowsPerPage: 10,
    numer_records: "",
    hasRecords: true,
  };

  componentDidMount = async () => {
    this.getData();
  };

  getData = async () => {
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`projects/all/${page}/${rowsPerPage}`);
    res.length > 0
      ? await this.setState({ data: res, numer_records: res[0].cantidad })
      : await this.setState({ hasRecords: false });
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * 10;
    const res = await Http.get(`projects/all/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page });
  };

  handleShowProjects = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`projects/all/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page });
  };

  handeViewClick = (id) => {
    this.props.history.push(`/project/${id}/edit`);
  };

  render() {
    let { data, page, rowsPerPage, numer_records, hasRecords } = this.state;
    let msg;

    if (data.length < 1 && hasRecords === true) {
      msg = <Loading></Loading>;
    }

    if (hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No existen proyectos activos! 😟
        </span>
      );
    }

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            {
              name: "Inicio",
              path: "/dashboard/v2",
            },
            { name: "Listado de Proyectos" },
          ]}
        />
        {numer_records > 0 ? (
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
              </div>
            </div>
            <Table style={{ minWidth: 750 }}>
              <thead>
                <tr>
                  <th className="pl-sm-24">Id</th>
                  <th className="px-0">Nombre</th>
                  <th className="px-0">Fecha Inicial</th>
                  <th className="px-0">Fecha Final</th>
                  <th className="px-0">Categoría</th>
                  <th className="px-0">Tipo</th>
                  <th className="px-0">Estatus Proyecto</th>
                  <th className="px-0">Estatus</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => (
                  <tr key={index}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {value.id}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.proyecto || (
                        <p className="text-muted">Sin Nombre</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.pfinicia || (
                        <p className="text-muted">Sin Fecha Inicial</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.pffinal || (
                        <p className="text-muted">Sin Fecha Final</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.categorias || (
                        <p className="text-muted">Sin Categorías</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {value.tipo || <p className="text-muted">Sin Tipo</p>}
                    </td>
                    <td className="pl-0 capitalize">
                      {value.estatus_proyecto || (
                        <p className="text-muted">Sin Estatus</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-danger": value.estatus === "Finalizada",
                          "bg-primary": value.estatus === "En proceso",
                        })}
                      >
                        {value.estatus || (
                          <p className="text-muted">Sin Estatus</p>
                        )}
                      </small>
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": value.estado === "Activo",
                          "bg-warning": value.estado === "Inactivo",
                        })}
                      >
                        {value.estado}
                      </small>
                    </td>
                    <td className="pl-0">
                      <i
                        className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                        onClick={() => this.handeViewClick(value.id)}
                      ></i>
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
        ) : (
          msg
        )}
      </div>
    );
  }
}

export default ProjectsList;
