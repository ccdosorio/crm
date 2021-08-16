import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Table, Card } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Http from "../../../libs/Https";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

class CampaignProjects extends Component {
  state = {
    projectList: [],
    page: 0,
    rowsPerPage: 10,
    numer_records: "",
    hasRecords: true,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let { page, rowsPerPage } = this.state;
    const id = this.props.match.params.id;
    const res = await Http.get(`projects/${id}/${page}/${rowsPerPage}`);
    res.length > 0
      ? await this.setState({
          projectList: res,
          numer_records: res[0].cantidad,
          hasRecords: true,
        })
      : await this.setState({ hasRecords: false });
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * 10;
    const id = this.props.match.params.id;
    const res = await Http.get(`projects/${id}/${page}/${rowsPerPage}`);
    await this.setState({ projectList: res, page });
  };

  handleShowProjects = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const id = this.props.match.params.id;
    const res = await Http.get(`projects/${id}/${page}/${rowsPerPage}`);
    await this.setState({ projectList: res, page });
  };

  render() {
    let { projectList, numer_records, rowsPerPage, hasRecords } = this.state;

    let msg;
    if (projectList.length < 1 && hasRecords === true) {
      msg = <div className="spinner-bubble spinner-bubble-primary m-5"></div>;
    } else if (hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No cuentas con proyectos! 😟
        </span>
      );
    }
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: "/campaign/" + this.props.match.params.id + "/edit",
            },
            { name: "Proyectos de Campaña" },
          ]}
        />
        {projectList.length > 0 ? (
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
                {/* <div style={styleButtonExcel}> 
                    <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="btn btn-primary"
                          table="table-to-campaing"
                          filename="Proyectos de Campaña"
                          sheet="Proyectos"
                          buttonText="Descarga Excel"
                          />
                    </div> */}
              </div>
            </div>
            <Table style={{ minWidth: 750 }} id="table-to-campaing">
              <thead>
                <tr>
                  <th className="pl-sm-24">Id</th>
                  <th className="px-0">Proyecto</th>
                  <th className="px-0">Descripción</th>
                  <th className="px-0">Tipo</th>
                  <th className="px-0">Fecha Inicial</th>
                  <th className="px-0">Fecha Final</th>
                  <th className="px-0">Fecha Creación</th>
                  <th className="px-0">Estado</th>
                  <th className="px-0">Estatus</th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project, index) => (
                  <tr key={index}>
                    <td className="pl-sm-24 capitalize" align="left">
                      {project.id}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {project.proyecto}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {project.descripcion || (
                        <p className="text-muted">Sin Descripcion</p>
                      )}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {project.tipoProyecto}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {project.pfinicia}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {project.pffinal || (
                        <p className="text-muted">Sin Fecha Final</p>
                      )}
                    </td>
                    <td className="pl-0 capitalize" align="left">
                      {project.fcreacion}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {project.estado}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {project.estatus}
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

export default CampaignProjects;
