import React, { Component } from "react";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";

import Http from "../../../libs/Https";

class CustomerListAdmin extends Component {
  state = {
    customerList: [],
    page: 0,
    rowsPerPage: 50,
    numer_records: "",
    allData: [],
    query: "",
  };

  componentDidMount = async () => {
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`customers-manager/all/${page}/${rowsPerPage}`);
    await this.setState({ customerList: res, allData: res });
    const res2 = await Http.get("customer-count/");
    await this.setState({ numer_records: res2[0].cantidad });
  };

  handeViewClick = (idProspect) => {
    this.props.history.push(`/customer/${idProspect}/edit`);
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * 10;
    const res = await Http.get(`customers-manager/all/${page}/${rowsPerPage}`);
    await this.setState({ customerList: res, page });
  };

  handleShowCustomers = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`customers-manager/all/${page}/${rowsPerPage}`);
    await this.setState({ customerList: res, page });
  };

  handleText = (e) => {
    this.setState({ query: e.target.value });
    this.handleSearch(this.state.query);
  };

  handleSearch = (query) => {
    console.log(query);
    const { allData } = this.state;

    const dataFiltered = allData.filter((value) => {
      return value.nombre.toLowerCase().includes(query.toLowerCase());
    });
    this.setState({ customerList: dataFiltered });
  };
  render() {
    let { customerList, numer_records, rowsPerPage, query } = this.state;
    return (
      <div>
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
                      onChange={this.handleShowCustomers}
                      value={rowsPerPage}
                    >
                      {/* <option value={10}>10</option> */}
                      {/* <option value={25}>25</option> */}
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <span>entries</span>
                </div>
                {/* <div className="d-flex align-items-center">
                  <input
                    type="text"
                    value={query}
                    onChange={this.handleText}
                    placeholder="Buscar"
                  />
                </div> */}
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
                {customerList.map((customer, index) => (
                  <tr key={index}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {customer.idcliente}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {customer.nombre || (
                        <p className="text-muted">Sin nombre</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {customer.correo || (
                        <p className="text-muted">Sin correo</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {customer.nit || <p className="text-muted">Sin nit</p>}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {customer.ejecutivo || (
                        <p className="text-muted">Sin ejecutivo</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": customer.estatus === "Cliente",
                          "bg-warning": customer.estatus === "Prospecto",
                          "bg-danger": customer.estatus === "Rechazado",
                        })}
                      >
                        {customer.estatus}
                      </small>
                    </td>
                    <td className="pl-0">
                      <i
                        className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                        onClick={() => this.handeViewClick(customer.idcliente)}
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

export default CustomerListAdmin;
