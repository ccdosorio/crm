import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import Select from "react-select";

import Http from "../../../libs/Https";

class ContactList2 extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    filterContacts: [],
    number_records: 0,
    data: [],
    searchQuery: "",
    hasRecords: true,
  };

  getContacts = async () => {
    let { rowsPerPage, page } = this.state;
    const res = await Http.get(`contacts-get/${page}/${rowsPerPage}`);
    if (res.length > 0) {
      await this.setState({
        data: res,
      });
    } else {
      await this.setState({ hasRecords: false });
    }
  };

  getCount = async () => {
    const res = await Http.get("contacts-quantity");
    await this.setState({ number_records: res[0].cantidad });
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * rowsPerPage;
    const res = await Http.get(`contacts-get/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page });
  };

  handleShowContacts = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const res = await Http.get(`contacts-get/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page });
  };

  getDataFilters = async () => {
    const res = await Http.get("filter-contacts/");
    if (res.length > 0) {
      let filterContacts = [];
      res.map(({ idcontacto, nombre }) => {
        if (nombre !== null && nombre !== "") {
          filterContacts.push({
            value: idcontacto,
            label: nombre,
          });
        }
      });
      await this.setState({ filterContacts: filterContacts });
    }
  };

  handleContact = (value) => {
    this.props.history.push(`/contact-detail/${value.value}`);
  };

  handeViewClick = (idcontacto) => {
    this.props.history.push(`/contact-detail/${idcontacto}`);
  };

  getBadgeColor = (role) => {
    switch (role) {
      case "Activo":
        return "success";

      case "Inactivo":
        return "warning";

      default:
        return "primary";
    }
  };

  componentDidMount() {
    this.getContacts();
  }

  componentWillMount() {
    this.getCount();
    this.getDataFilters();
  }

  render() {
    let {
      rowsPerPage,
      number_records,
      filterContacts,
      data,
      hasRecords,
    } = this.state;

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Listado de Contactos" },
          ]}
        ></Breadcrumb>
        {number_records < 1 && hasRecords === true ? (
          <div className="spinner-bubble spinner-bubble-primary m-5"></div>
        ) : (
          <div>
            <div className="col-md-3 form-group mb-3">
              <label htmlFor="">Nombre: </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={filterContacts[0]}
                name="color"
                options={filterContacts}
                onChange={this.handleContact}
              />
            </div>
            <section className="contact-list">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="card text-left">
                    <div className="row px-4 mt-3">
                      <div className="col-sm-12 col-md-6 mb-2">
                        <div className="d-flex align-items-center">
                          <span className="mr-1">Show</span>
                          <div className="mr-1">
                            <select
                              className="form-control"
                              onChange={this.handleShowContacts}
                              value={this.state.rowsPerPage}
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

                    <div className="card-body pt-1">
                      <div className="table-responsive">
                        <table
                          id="ul-contact-list"
                          className="display table w-100"
                        >
                          <thead>
                            <tr>
                              <th></th>
                              <th>Nombre</th>
                              <th>Correo</th>
                              <th>Teléfono</th>
                              <th>Celular</th>
                              <th>Tipo</th>
                              <th>Cliente</th>
                              <th>Estado</th>
                              <th>Fecha Creación</th>
                              <th className="px-0">Opciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((contact, ind) => (
                              <tr key={ind}>
                                <td></td>
                                <td className="m-3 text-muted">
                                  {contact.nombre || "Sin"}
                                </td>
                                <td>{contact.correo || "Sin"}</td>
                                <td>{contact.telefono || "Sin"}</td>
                                <td>{contact.telefono || "Sin"}</td>
                                <td>{contact.celular || "Sin"}</td>
                                <td>{contact.nombre_cliente || "Sin"}</td>
                                <td valign="middle">
                                  <div
                                    className={`badge badge-${this.getBadgeColor(
                                      contact.estado
                                    )} p-2 text-capitalize`}
                                  >
                                    {contact.estado
                                      ? contact.estado
                                      : "Developer"}
                                  </div>
                                </td>
                                <td>
                                  {format(
                                    new Date(
                                      contact.fecha_insercion
                                        ? contact.fecha_insercion
                                        : new Date()
                                    ).getTime(),
                                    "dd MMM, yyyy"
                                  )}
                                </td>
                                <td className="pl-0">
                                  <i
                                    className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                                    onClick={() =>
                                      this.handeViewClick(contact.idcontacto)
                                    }
                                  ></i>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex justify-content-end mr-lg-4">
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={Math.ceil(number_records / rowsPerPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={3}
                          onPageChange={this.handlePageClick}
                          containerClassName={"pagination pagination-lg"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default ContactList2;
