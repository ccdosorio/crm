import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Table, Card } from "react-bootstrap";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";
import { Loading } from "@gull";

import Http from "../../../libs/Https";

class CampaignList extends Component {
  state = {
    campaignList: [],
    allData: [],
    page: 0,
    rowsPerPage: 10,
    numer_records: "",
    query: "",
    isMatch: true,
    hasRecords: true,
  };

  componentDidMount = async () => {
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`campaings/all/${page}/${rowsPerPage}`);
    res.length < 0 && (await this.setState({ hasRecords: false }));
    await this.setState({
      campaignList: res,
      allData: res,
      numer_records: res[0].cantidad,
    });
  };

  handeViewClick = (idCampaign) => {
    this.props.history.push(`/campaign/${idCampaign}/edit`);
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * 10;
    const res = await Http.get(`campaings/all/${page}/${rowsPerPage}`);
    await this.setState({ campaignList: res, page });
  };

  handleShowProjects = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`campaings/all/${page}/${rowsPerPage}`);
    await this.setState({ campaignList: res, page });
  };

  handleText = async (e) => {
    await this.setState({ query: e.target.value });
    await this.handleSearch(this.state.query);
  };

  handleSearch = (query) => {
    const { allData } = this.state;
    const dataFiltered = allData.filter((value) => {
      return value.categorias.toLowerCase().includes(query.toLowerCase());
    });
    if (dataFiltered.length === 0) {
      this.setState({ isMatch: false });
    } else if (dataFiltered.length >= 1) {
      this.setState({ isMatch: true });
    }
    this.setState({ campaignList: dataFiltered });
  };

  render() {
    let {
      campaignList,
      numer_records,
      rowsPerPage,
      query,
      isMatch,
      hasRecords,
    } = this.state;
    let msg;

    if (campaignList.length < 1 && hasRecords === true && isMatch === true) {
      msg = <Loading></Loading>;
    } else if (hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No existen campañas! 😟
        </span>
      );
    }
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Listado de Campañas" },
          ]}
        />
        <div className="mb-12">
          <div className="form-row">
            <div className="col-md-4 form-group mb-4">
              <span className="link-icon d-md-none">
                <i className="icon-regular ml-0 mr-3 i-Left"></i>
              </span>
              <div className="form-group m-0 flex-grow-1">
                <input
                  type="text"
                  className="form-control form-control-rounded"
                  placeholder="Buscar campañas por categoría"
                  value={query}
                  onChange={this.handleText}
                />
              </div>
            </div>
          </div>
        </div>
        {isMatch === false && (
          <span role="img" className="text-muted" aria-label="sad">
            ¡No se encontraron coicidencias! 😟
          </span>
        )}
        {campaignList.length > 0 ? (
          <Card elevation={6} className="w-100 overflow-auto">
            <div className="row px-4 mt-3">
              <div className="col-sm-4 col-md-6 mb-2">
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
            <Table style={{ minWidth: 750 }} id="table-to-campaing">
              <thead>
                <tr>
                  <th className="pl-sm-24">Id</th>
                  <th className="px-0">Campaña</th>
                  <th className="px-0">Tipo</th>
                  <th className="px-0">Categorias</th>
                  <th className="px-0">Fecha Inicial</th>
                  <th className="px-0">Fecha Final</th>
                  <th className="px-0">Estatus</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {campaignList.map((campania, index) => (
                  <tr key={index}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {campania.id}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {campania.campania}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {campania.tipo || (
                        <p className="text-muted">Sin Fecha Inicial</p>
                      )}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {campania.categorias}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {campania.cfinicia || (
                        <p className="text-muted">Sin Fecha Final</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {campania.cffinal || (
                        <p className="text-muted">Sin Campaña</p>
                      )}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-primary": campania.estatus === "En proceso",
                          "bg-success": campania.estatus === "Finalizada",
                        })}
                      >
                        {campania.estatus}
                      </small>
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      <small
                        className={classList({
                          "badge rounded-pill text-white px-8 py-2": true,
                          "bg-success": campania.estado === "Activo",
                          "bg-warning": campania.estado === "Inactivo",
                        })}
                      >
                        {campania.estado}
                      </small>
                    </td>
                    <td className="pl-0">
                      <i
                        className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                        onClick={() => this.handeViewClick(campania.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="px-3 pb-3 mt-3 d-flex flex-row justify-content-end">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
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

export default CampaignList;
