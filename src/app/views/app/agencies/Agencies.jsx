import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import AuthService from "../../../services/auth.service";
import AgenciesList from "./AgenciesList";
import AgenciesListAdmin from "./AgenciesListAdmin";

import Http from "../../../libs/Https";

import Select from "react-select";

const user = AuthService.getCurrentUser();
class Agencies extends Component {
  state = {
    filterName: [],
    rowsPerPage: 10,
    page: 0,
    number_records: 0,
    data: [],
    hasRecords: true,
  };

  getAgencies = async () => {
    let { rowsPerPage, page } = this.state;
    const res = await Http.get(
      `agencies/all/${user.idusuario}/${page}/${rowsPerPage}`
    );
    res.length === 0 && (await this.setState({ hasRecords: false }));
    await this.setState({ data: res });
  };

  getFilterAgenciesAdmin = async () => {
    const res = await Http.get("filter-agencies-admin");
    if (res.length > 0) {
      let filterName = [];
      res.map(({ idcliente, agencia }) => {
        if (agencia !== null && agencia !== "") {
          filterName.push({
            value: idcliente,
            label: agencia,
          });
        }
      });
      await this.setState({
        hasRecords: true,
        filterName: filterName,
      });
    } else {
      await this.setState({ hasRecords: false });
    }
  };

  getFilterAgencies = async () => {
    const res = await Http.get(`filter-agencies/${user.idusuario}`);
    if (res.length > 0) {
      let filterName = [];
      res.map(({ idcliente, agencia }) => {
        if (agencia !== null && agencia !== "") {
          filterName.push({
            value: idcliente,
            label: agencia,
          });
        }
      });
      await this.setState({
        hasRecords: true,
        filterName: filterName,
      });
    }
  };

  getCount = async () => {
    const res = await Http.get(`agencies-count/${user.idusuario}`);
    await this.setState({ number_records: res[0].cantidad });
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * rowsPerPage;
    const res = await Http.get(
      `agencies/all/${user.idusuario}/${page}/${rowsPerPage}`
    );
    await this.setState({ data: res, page });
  };

  handleShowAgencies = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(
      `agencies/all/${user.idusuario}/${page}/${rowsPerPage}`
    );
    await this.setState({ data: res, page });
  };

  handleName = (value) => {
    this.props.history.push(`/agency/${value.value}/edit`);
  };

  componentWillMount() {
    if (user.rol === -1) {
      this.getFilterAgenciesAdmin();
    } else {
      this.getAgencies();
      this.getCount();
      this.getFilterAgencies();
    }
  }
  render() {
    let { data, number_records, rowsPerPage, hasRecords, filterName } =
      this.state;
    let listAgencies;
    if (data.length < 1 && hasRecords === true) {
      listAgencies = <Loading></Loading>;
    }

    if (data.length >= 1 && user.rol !== -1) {
      listAgencies = (
        <AgenciesList
          agencies={data}
          rol={user.rol}
          rowsPerPage={rowsPerPage}
          number_records={number_records}
          onShowAgencies={this.handleShowAgencies}
          onChangePageClick={this.handlePageClick}
        />
      );
    } else if (user.rol === -1) {
      listAgencies = <AgenciesListAdmin history={this.props.history} />;
    } else if (hasRecords === false) {
      listAgencies = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No cuentas con agencias! 😟
        </span>
      );
    }
    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Listado de Agencias" },
          ]}
        />
        {hasRecords === true && (
          <div className="mb-12">
            <div className="form-row">
              <div className="col-md-3 form-group mb-3">
                <label htmlFor="">Nombre: </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={filterName[0]}
                  name="agencia"
                  options={filterName}
                  onChange={this.handleName}
                />
              </div>
            </div>
          </div>
        )}

        {listAgencies}
      </React.Fragment>
    );
  }
}

export default Agencies;
