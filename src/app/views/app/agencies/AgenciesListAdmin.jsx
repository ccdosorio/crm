import React, { Component } from "react";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import { Loading } from "@gull";
import ReactPaginate from "react-paginate";
import Http from "../../../libs/Https";

class AgenciesListAdmin extends Component {
  state = {
    agencyList: [],
    page: 0,
    rowsPerPage: 10,
    numer_records: "",
  };

  componentDidMount = async () => {
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`agencies-admin/all/${page}/${rowsPerPage}`);
    await this.setState({ agencyList: res });
    const res2 = await Http.get("admin-agencies/count");
    await this.setState({ numer_records: res2[0].cantidad });
  };

  handeViewClick = (id) => {
    this.props.history.push(`/agency/${id}/edit`);
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * 10;
    const res = await Http.get(`agencies-admin/all/${page}/${rowsPerPage}`);
    await this.setState({ agencyList: res, page });
  };

  handleShowCustomers = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`agencies-admin/all/${page}/${rowsPerPage}`);
    await this.setState({ agencyList: res, page });
  };

  render() {
    let { agencyList, numer_records, rowsPerPage } = this.state;
    return (
      <div>
        {agencyList.length < 1 ? (
          <Loading></Loading>
        ) : (
          <Card elevation={6} className="w-100 overflow-auto">
            <div className="row px-4 mt-3">
              <div className="col-sm-12 col-md-6 mb-2">
                <div className="d-flex align-items-center">
                  <span className="mr-1">Show</span>
                  <div className="mr-1">
                    <select
                      className="form-control"
                      onChange={this.handleShowCustomers}
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
                  <th className="px-0">Correo</th>
                  <th className="px-0">Nit</th>
                  <th className="px-0">Ejecutivo</th>
                  <th className="px-0">Estatus</th>
                  <th className="px-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agencyList.map((agency, index) => (
                  <tr key={index}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {agency.idcliente}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {agency.nombre || (
                        <p className="text-muted">Sin nombre</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {agency.correo || (
                        <p className="text-muted">Sin correo</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {agency.nit || <p className="text-muted">Sin nit</p>}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {agency.ejecutivo || (
                        <p className="text-muted">Sin ejecutivo</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": agency.estatus === "Cliente",
                          "bg-warning": agency.estatus === "Prospecto",
                          "bg-danger": agency.estatus === "Rechazado",
                        })}
                      >
                        {agency.estatus}
                      </small>
                    </td>
                    <td className="pl-0">
                      <i
                        className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                        onClick={() => this.handeViewClick(agency.idcliente)}
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
        )}
      </div>
    );
  }
}

export default AgenciesListAdmin;
