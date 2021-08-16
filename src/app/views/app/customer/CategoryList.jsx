import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import swal from "sweetalert2";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { MdEdit, MdDelete } from "react-icons/md";

import CategoryEditor2 from "./CategoryEditor2";

import Http from "../../../libs/Https";

class CategoryList extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    number_records: 0,
    data: [],
    showEditorDialog: false,
    dialogValues: null,
    filter_category: [],
    id_category: 1,
    msgDelete: "",
    hasRecords: true,
    defaultValue: "",
  };

  getData = async () => {
    let { rowsPerPage, page } = this.state;
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(
      `categories-brands/${idcliente}/${page}/${rowsPerPage}`
    );
    res.length > 0
      ? await this.setState({ hasRecords: true })
      : await this.setState({ hasRecords: false });
    await this.setState({ data: res });
  };

  getCount = async () => {
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(`categories-count/${idcliente}`);
    await this.setState({ number_records: res[0].cantidad });
  };

  getFilterCategory = async () => {
    const res = await Http.get("categories/all/");
    let filter_category = res.map(({ idcategoria, nombre }) => {
      if (nombre != null) {
        return {
          value: idcategoria,
          label: nombre,
        };
      } else {
        return false;
      }
    });
    await this.setState({ filter_category: filter_category });
  };

  handlePageClick = async (data) => {
    let { rowsPerPage } = this.state;
    let page = data.selected * rowsPerPage;
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(
      `categories-brands/${idcliente}/${page}/${rowsPerPage}`
    );
    await this.setState({ data: res, page });
  };

  handleShowCategories = async (event) => {
    await this.setState({ rowsPerPage: event.target.value });
    let { page, rowsPerPage } = this.state;
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(
      `categories-brands/${idcliente}/${page}/${rowsPerPage}`
    );
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

  handleEditCategory = async (dialogValues) => {
    let dialog = {
      idcliente_marca: dialogValues.idcliente_marca,
      type: dialogValues.idcategoria,
      idcliente: dialogValues.idcliente,
      name: dialogValues.nombre,
    };
    let defaultValues = {
      label: dialogValues.categoria,
      value: dialogValues.idcategoria,
    };
    await this.setState({
      dialogValues: dialog,
      showEditorDialog: true,
      defaultValue: defaultValues,
    });
  };

  handleDeleteCategory = async (values) => {
    const idcliente = this.props.match.params.idcliente;
    let { page, rowsPerPage } = this.state;
    let category = {
      idcategoria: values.idcliente_marca,
    };
    await Http.post("category-delete", category);
    await this.setState({ msgDelete: "¡Categoría Eliminada!" });
    await swal.fire({
      title: "¡Eliminada!",
      text: this.state.msgDelete,
      icon: "success",
      timer: 1500,
    });
    const res = await Http.get(
      `categories-brands/${idcliente}/${page}/${rowsPerPage}`
    );
    await this.setState({ data: res, page });
  };

  handleFormSubmit = async (values) => {
    const idcliente = this.props.match.params.idcliente;
    let category = {
      idcliente: idcliente,
      idcliente_marca: values.idcliente_marca,
      idcategoria: this.state.id_category,
      nombre: values.name,
    };

    let { dialogValues, page, rowsPerPage } = this.state;

    if (!dialogValues) {
      await Http.post("category-post", category);
    } else {
      await Http.post("category-put", category);
    }
    const res = await Http.get(
      `categories-brands/${idcliente}/${page}/${rowsPerPage}`
    );
    await this.setState({ data: res, page, hasRecords: false });
    this.toggleEditorDialog(false);
  };

  handleIdCategory = async (value) => {
    await this.setState({ id_category: value.value });
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
    this.getData();
  }

  componentWillMount() {
    this.getCount();
    this.getFilterCategory();
  }

  render() {
    let {
      rowsPerPage,
      number_records,
      dialogValues,
      defaultValue,
      showEditorDialog,
      data,
      hasRecords,
      filter_category,
    } = this.state;
    let msg;
    if (data.length < 1 && hasRecords === true) {
      msg = <Loading></Loading>;
    } else if (hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No cuentas con categorías! 😟
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
            { name: "Listado de Marcas / Categorías" },
          ]}
        ></Breadcrumb>
        <div className="card-header text-right bg-transparent">
          <button
            type="button"
            className="btn btn-primary btn-md m-1"
            onClick={this.toggleEditorDialog}
          >
            <i className="i-Add-User text-white mr-2"></i> Agregar Marca /
            Categoría
          </button>
        </div>
        {data.length > 0 ? (
          <section className="contact-list">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="card text-left">
                  <div>
                    <div className="row px-4 mt-3">
                      <div className="col-sm-12 col-md-6 mb-2">
                        <div className="d-flex align-items-center">
                          <span className="mr-1">Mostrar</span>
                          <div className="mr-1">
                            <select
                              className="form-control"
                              onChange={this.handleShowCategories}
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
                            <th>Marca</th>
                            <th>Cliente</th>
                            <th>Categoría</th>
                            <th>Estado</th>
                            <th>Fecha Creación</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((category, ind) => (
                            <tr key={ind}>
                              <td></td>
                              <td className="m-3 text-muted">
                                {category.nombre}
                              </td>
                              <td>{category.cliente}</td>
                              <td>{category.categoria}</td>
                              <td valign="middle">
                                <div
                                  className={`badge badge-${this.getBadgeColor(
                                    category.estado
                                  )} p-2 text-capitalize`}
                                >
                                  {category.estado ? category.estado : "Activo"}
                                </div>
                              </td>
                              <td>
                                {format(
                                  new Date(
                                    category.fecha_insercion
                                      ? category.fecha_insercion
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
                                        this.handleEditCategory(category)
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
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Si, eliminar",
                                            cancelButtonText: "No",
                                          })
                                          .then((result) => {
                                            if (result.value) {
                                              this.handleDeleteCategory(
                                                category
                                              );
                                            } else {
                                              swal.fire({
                                                title: "Cencelado!",
                                                text: "Permiso denegado",
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
        <CategoryEditor2
          show={showEditorDialog}
          toggleEditorDialog={this.toggleEditorDialog}
          initialValues={dialogValues}
          handleFormSubmit={this.handleFormSubmit}
          valuesFilter={filter_category}
          handleIdCategory={this.handleIdCategory}
          valuesCategory={defaultValue}
        ></CategoryEditor2>
      </div>
    );
  }
}

export default CategoryList;
