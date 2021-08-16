import React, { Component } from "react";
import ProspectsList from "../prospects/ProspectsList";
import ProspectListAdmin from "../prospects/ProspectListAdmin";
import { Breadcrumb, Loading } from "@gull";
import AuthService from "../../../services/auth.service";
import Select from "react-select";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();
class Prospects extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    number_records: "",
    data: [],
    filterTradeName: [],
    filterNit: [],
    filterName: [],
    response_signin: {},
    hasRecords: true,
  };

  getProspects = async () => {
    let { rowsPerPage, page } = this.state;
    const res = await Http.get(
      `prospects/all/${page}/${rowsPerPage}/${user.idusuario}`
    );
    await this.setState({ data: res, number_records: res[0].cantidad });
  };

  getDataFilters = async () => {
    const res = await Http.get("data-prospect/");
    if (res.length > 0) {
      let filterTradeName = [];
      res.map(({ idcliente, nombre_comercial }) => {
        if (nombre_comercial !== null && nombre_comercial !== "") {
          filterTradeName.push({
            value: idcliente,
            label: nombre_comercial,
          });
        }
      });
      let filterNit = [];
      res.map(({ idcliente, nit }) => {
        if (nit !== null && nit !== "") {
          filterNit.push({
            value: idcliente,
            label: nit,
          });
        }
      });
      let filterName = [];
      res.map(({ idcliente, nombre }) => {
        if (nombre !== null && nombre !== "") {
          filterName.push({
            value: idcliente,
            label: nombre,
          });
        }
      });
      await this.setState({
        filterTradeName: filterTradeName,
        filterNit: filterNit,
        filterName: filterName,
        hasRecords: true,
      });
    }
  };

  getFilterProspects = async () => {
    const res = await Http.get(`filter-prospects/${user.idusuario}`);

    if (res.length > 0) {
      let filterTradeName = [];
      res.map(({ idcliente, nombre_comercial }) => {
        if (nombre_comercial !== null && nombre_comercial !== "") {
          filterTradeName.push({
            value: idcliente,
            label: nombre_comercial,
          });
        }
      });
      let filterNit = [];
      res.map(({ idcliente, nit }) => {
        if (nit !== null && nit !== "") {
          filterNit.push({
            value: idcliente,
            label: nit,
          });
        }
      });
      let filterName = [];
      res.map(({ idcliente, nombre }) => {
        if (nombre != null && nombre != "") {
          filterName.push({
            value: idcliente,
            label: nombre,
          });
        }
      });
      await this.setState({
        filterTradeName: filterTradeName,
        filterNit: filterNit,
        filterName: filterName,
      });
    } else {
      await this.setState({ hasRecords: false });
    }
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * rowsPerPage;
    const res = await Http.get(
      `prospects/all/${page}/${rowsPerPage}/${user.idusuario}`
    );
    await this.setState({ data: res, page });
  };

  handleShowProspects = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(
      `prospects/all/${page}/${rowsPerPage}/${user.idusuario}`
    );
    await this.setState({ data: res, page });
  };

  handleTradeName = (value) => {
    this.props.history.push(`/prospects/${value.value}/edit`);
  };

  handleNit = (value) => {
    this.props.history.push(`/prospects/${value.value}/edit`);
  };

  handleName = (value) => {
    this.props.history.push(`/prospects/${value.value}/edit`);
  };

  componentWillMount() {
    if (user.rol === -1) {
      this.getDataFilters();
    } else {
      this.getProspects();
      this.getFilterProspects();
    }
  }

  render() {
    const {
      filterTradeName,
      filterNit,
      filterName,
      data,
      hasRecords,
      rowsPerPage,
      number_records,
    } = this.state;

    let listProspect;
    if (data.length < 1 && hasRecords === true) {
      listProspect = <Loading></Loading>;
    }
    if (data.length >= 1 && user.rol !== -1) {
      listProspect = (
        <ProspectsList
          prospects={data}
          rol={user.rol}
          rowsPerPage={rowsPerPage}
          number_records={number_records}
          onChangeShowProspects={this.handleShowProspects}
          onChangePageClick={this.handlePageClick}
        />
      );
    } else if (user.rol === -1) {
      listProspect = <ProspectListAdmin history={this.props.history} />;
    } else if (hasRecords === false) {
      listProspect = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No cuentas con prospectos! 😟
        </span>
      );
    }
    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Listado de Prospectos" },
          ]}
        />
        <div className="mb-12">
          <div className="form-row">
            <div className="col-md-3 form-group mb-3">
              <label htmlFor="">Nombre: </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={filterName[0]}
                name="color"
                options={filterName}
                onChange={this.handleName}
              />
            </div>
            <div className="col-md-3 form-group mb-3">
              <label htmlFor="">Nombre Comercial:</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={filterTradeName[0]}
                name="color"
                options={filterTradeName}
                onChange={this.handleTradeName}
              />
            </div>
            <div className="col-md-3 form-group mb-3">
              <label htmlFor="">Nit:</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={filterNit[0]}
                name="color"
                options={filterNit}
                onChange={this.handleNit}
              />
            </div>
          </div>
        </div>
        {listProspect}
      </React.Fragment>
    );
  }
}

export default Prospects;
