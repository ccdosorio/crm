import React, { Component } from "react";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";

import Http from "../../../libs/Https";

class ProspectListAdmin extends Component {
  state = {
    prospectList: [],
    page: 0,
    rowsPerPage: 10,
    numer_records: "",
  };

  componentDidMount = async () => {
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`prospects-manager/all/${page}/${rowsPerPage}`);
    await this.setState({ prospectList: res });
    const res2 = await Http.get("prospect-count/");
    await this.setState({ numer_records: res2[0].cantidad });
  };

  handeViewClick = (idProspect) => {
    this.props.history.push(`/prospects/${idProspect}/edit`);
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * 10;
    const res = await Http.get(`prospects-manager/all/${page}/${rowsPerPage}`);
    await this.setState({ prospectList: res, page });
  };

  handleShowProspects = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`prospects-manager/all/${page}/${rowsPerPage}`);
    await this.setState({ prospectList: res, page });
  };

  render() {
    let { prospectList, numer_records, rowsPerPage } = this.state;
    return (
      <div>
        {prospectList.length < 1 ? (
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
                      onChange={this.handleShowProspects}
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
                {prospectList.map((prospect, index) => (
                  <tr key={index}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {prospect.idcliente}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {prospect.nombre || (
                        <p className="text-muted">Sin nombre</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {prospect.correo || (
                        <p className="text-muted">Sin correo</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {prospect.nit || <p className="text-muted">Sin nit</p>}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {prospect.ejecutivo || (
                        <p className="text-muted">Sin ejecutivo</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": prospect.estatus === "Cliente",
                          "bg-warning": prospect.estatus === "Prospecto",
                          "bg-danger": prospect.estatus === "Rechazado",
                        })}
                      >
                        {prospect.estatus}
                      </small>
                    </td>
                    <td className="pl-0">
                      <i
                        className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                        onClick={() => this.handeViewClick(prospect.idcliente)}
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

export default ProspectListAdmin;
