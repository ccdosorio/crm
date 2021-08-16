import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import swal from "sweetalert2";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { MdEdit, MdDelete } from "react-icons/md";

import ContactEditor2 from "./ContactEditor2";

import Http from "../../../libs/Https";

class ContactList extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    number_records: 0,
    data: [],
    showEditorDialog: false,
    dialogValues: null,
    hasRecords: true,
  };

  getContacts = async () => {
    let { rowsPerPage, page } = this.state;
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(`contacts/${idcliente}/${page}/${rowsPerPage}`);
    res.length > 0
      ? await this.setState({ hasRecords: true })
      : await this.setState({ hasRecords: false });
    await this.setState({ data: res });
  };

  getCount = async () => {
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(`contacts-count/${idcliente}`);
    await this.setState({ number_records: res[0].cantidad });
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * rowsPerPage;
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(`contacts/${idcliente}/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page });
  };

  handleShowContacts = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(`contacts/${idcliente}/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page });
  };

  toggleEditorDialog = (arg) => {
    if (arg && arg.toString())
      this.setState({ showEditorDialog: true, dialogValues: null });
    else
      this.setState({
        showEditorDialog: !this.state.showEditorDialog,
        dialogValues: null,
      });
  };

  handleEditContact = async (dialogValues) => {
    let dialog = {
      idcontact: dialogValues.idcontacto,
      name: dialogValues.nombre,
      phone: dialogValues.telefono,
      email: dialogValues.correo,
      mobile: dialogValues.celular,
      type: dialogValues.idcontacto_tipo,
    };
    await this.setState({ dialogValues: dialog, showEditorDialog: true });
  };

  handleDeleteContact = async (values) => {
    let { page, rowsPerPage } = this.state;
    let contact = {
      idcontacto: values.idcontacto,
    };
    const idcliente = this.props.match.params.idcliente;
    const res2 = await Http.post("contact-delete", contact);
    await swal.fire({
      title: "¡Eliminado!",
      text: res2,
      icon: "success",
      timer: 1500,
    });
    const res = await Http.get(`contacts/${idcliente}/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page, hasRecords: false });
  };

  handleFormSubmit = async (values) => {
    const idcliente = this.props.match.params.idcliente;
    let contact = {
      idpersona: idcliente,
      idcontacto: values.idcontact,
      nombre: values.name,
      correo: values.email,
      telefono: values.phone,
      celular: values.mobile,
      idcontacto_tipo: values.type,
    };

    let { dialogValues, page, rowsPerPage } = this.state;

    if (!dialogValues) {
      await Http.post("contact-post", contact);
    } else {
      await Http.post("contact-put", contact);
    }
    const res = await Http.get(`contacts/${idcliente}/${page}/${rowsPerPage}`);
    await this.setState({ data: res, page, hasRecords: false });
    this.toggleEditorDialog(false);
  };

  getBadgeColor = (role) => {
    switch (role) {
      case "Activo":
        return "success";

      case "Prospecto":
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
  }

  render() {
    let {
      rowsPerPage,
      number_records,
      dialogValues,
      showEditorDialog,
      data,
      hasRecords,
    } = this.state;
    let msg;
    if (data.length < 1 && hasRecords === true) {
      msg = <Loading></Loading>;
    } else if (hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No cuentas con contactos! 😟
        </span>
      );
    }
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: `/customer/${this.props.match.params.idcliente}/edit`,
            },
            { name: "Listado de Contactos" },
          ]}
        ></Breadcrumb>
        <div className="card-header text-right bg-transparent">
          <button
            type="button"
            className="btn btn-primary btn-md m-1"
            onClick={this.toggleEditorDialog}
          >
            <i className="i-Add-User text-white mr-2"></i> Agregar Contacto
          </button>
        </div>
        {data.length > 0 ? (
          <section className="contact-list">
            <p className="text-muted">{data[0].cliente}</p>
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="card text-left">
                  <div className="row px-4 mt-3">
                    <div className="col-sm-12 col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <span className="mr-1">Mostrar</span>
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
                        <span>registros</span>
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
                            <th>Estado</th>
                            <th>Fecha Creación</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((contact, ind) => (
                            <tr key={ind}>
                              <td></td>
                              <td className="m-3 text-muted">
                                {contact.nombre}
                              </td>
                              <td>{contact.correo}</td>
                              <td>{contact.telefono}</td>
                              <td>{contact.celular}</td>
                              <td>{contact.tipo_contacto}</td>
                              <td valign="middle">
                                <div
                                  className={`badge badge-${this.getBadgeColor(
                                    contact.estado
                                  )} p-2 text-capitalize`}
                                >
                                  {contact.estado ? contact.estado : "Activo"}
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
                              <td>
                                <div className="d-flex">
                                  <div className="cursor-pointer mr-3">
                                    <MdEdit
                                      className="text-success"
                                      size={18}
                                      onClick={() =>
                                        this.handleEditContact(contact)
                                      }
                                    ></MdEdit>
                                  </div>
                                  <div className="cursor-pointer">
                                    <MdDelete
                                      className="text-danger"
                                      size={18}
                                      onClick={() => {
                                        swal
                                          .fire({
                                            title: "¿Estas seguro?",
                                            text: "¡No podrás revertir este cambio!",
                                            icon: "warning",
                                            type: "question",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Si, eliminar",
                                            cancelButtonText: "No",
                                          })
                                          .then((result) => {
                                            if (result.value) {
                                              this.handleDeleteContact(contact);
                                            } else {
                                              swal.fire({
                                                title: "Cencelado!",
                                                text: "Permiso denegado",
                                                type: "error",
                                                icon: "error",
                                                timer: 1500,
                                              });
                                            }
                                          });
                                      }}
                                    ></MdDelete>
                                  </div>
                                </div>
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
        ) : (
          msg
        )}
        <ContactEditor2
          show={showEditorDialog}
          toggleEditorDialog={this.toggleEditorDialog}
          initialValues={dialogValues}
          handleFormSubmit={this.handleFormSubmit}
        ></ContactEditor2>
      </div>
    );
  }
}

export default ContactList;
