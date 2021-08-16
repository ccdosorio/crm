import React, { Component } from "react";
import CustomerList from "../customer/CustomerList";
import CustomerListAdmin from "../customer/CustomerListAdmin";
import { Breadcrumb, Loading } from "@gull";
import AuthService from "../../../services/auth.service";
import Select from "react-select";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();
class Customers extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    number_records: 0,
    data: [],
    filterTradeName: [],
    filterNit: [],
    filterName: [],
    response_signin: {},
    hasRecords: true,
  };

  getCustomers = async () => {
    let { rowsPerPage, page } = this.state;
    const res = await Http.get(
      `customers/all/${user.idusuario}/${page}/${rowsPerPage}`
    );
    res.length > 0
      ? await this.setState({ data: res, hasRecords: true })
      : await this.setState({ hasRecords: false });
  };

  getCustomersExecutive = async () => {
    const res = await Http.get(`customercalendar/sesion/${user.idusuario}`);
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
      res.map(({ idcliente, cliente }) => {
        if (cliente !== null && cliente !== "") {
          filterName.push({
            value: idcliente,
            label: cliente,
          });
        }
      });
      await this.setState({
        hasRecords: true,
        filterTradeName: filterTradeName,
        filterNit: filterNit,
        filterName: filterName,
      });
    }
  };

  getDataFilters = async () => {
    const res = await Http.get("data-customer");
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
      });
    }
  };

  getCount = async () => {
    const res = await Http.get(`clients-count/${user.idusuario}`);
    await this.setState({ number_records: res[0].cantidad });
  };

  handleTradeName = (value) => {
    this.props.history.push(`/customer/${value.value}/edit`);
  };

  handleNit = (value) => {
    this.props.history.push(`/customer/${value.value}/edit`);
  };

  handleName = (value) => {
    this.props.history.push(`/customer/${value.value}/edit`);
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * rowsPerPage;
    const res = await Http.get(
      `customers/all/${user.idusuario}/${page}/${rowsPerPage}`
    );
    await this.setState({ data: res, page });
  };

  handleShowCustomers = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(
      `customers/all/${user.idusuario}/${page}/${rowsPerPage}`
    );
    await this.setState({ data: res, page });
  };

  componentDidMount() {
    if (user.rol === -1) {
      this.getDataFilters();
    } else {
      this.getCustomers();
      this.getCount();
      this.getCustomersExecutive();
    }
  }

  render() {
    const {
      filterTradeName,
      filterNit,
      data,
      filterName,
      number_records,
      rowsPerPage,
      hasRecords,
    } = this.state;

    let listCustomer;
    if (data.length < 1 && hasRecords === true) {
      listCustomer = <Loading></Loading>;
    }
    if (data.length >= 1 && user.rol !== -1) {
      listCustomer = (
        <CustomerList
          customers={data}
          rol={user.rol}
          rowsPerPage={rowsPerPage}
          onChangeShowCustomers={this.handleShowCustomers}
          number_records={number_records}
          onChangePageClick={this.handlePageClick}
        />
      );
    } else if (user.rol === -1) {
      listCustomer = <CustomerListAdmin history={this.props.history} />;
    } else if (hasRecords === false) {
      listCustomer = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No cuentas con clientes! 😟
        </span>
      );
    }
    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Listado de Clientes" },
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
        {listCustomer}
      </React.Fragment>
    );
  }
}

export default Customers;
