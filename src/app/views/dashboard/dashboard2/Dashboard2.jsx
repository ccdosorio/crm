import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import ComparisonChart from "app/views/charts/echarts/ComparisonChart";
import LineChart4 from "app/views/charts/echarts/LineChart4";
import DoughnutChart from "app/views/charts/echarts/Doughnut";
import { Table, Col, ProgressBar, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import SimpleCard from "@gull/components/cards/SimpleCard";
import { classList } from "@utils";
import { set } from "lodash";
import Http from "../../../libs/Https";
import { Link } from "react-router-dom";

import CustomerZone from "app/views/charts/echarts/CustomerZone";
import AuthService from "../../../../app/services/auth.service";

import dashboardService from "./dashboardService";
import swal from "sweetalert";

const user = AuthService.getCurrentUser();

class Dashboard2 extends Component {
  state = {
    dataCurrenty: [],
    dataLasty: [],
    dataMoths: [],
    advertisement: [],
    salesDay: 0,
    newLeads: 0,
    ordersDay: 0,
    invoices: 0,
    payments: 0,
    goals: 0,
    goalsv: 0,
    newLeadsExecutive: "",
    hasRecords: false,
    customerZones: [],
    topAuthorList: [
      {
        foto: "/assets/images/ndd-logo1.png",
        nombre: "",
        idcliente: "",
        cantidad: "",
        neto: "",
      },
    ],
    lastMonthSummery: [],
    Primero: 1,
    Segundo: 1,
    Tercero: 1,
    Cuarto: 1,
    PrimeroM: 1,
    SegundoM: 1,
    TerceroM: 1,
    CuartoM: 1,
    customerData: [
      {
        name: "Diarios Modernos S.A.",
        nit: "1689838-9",
        state: "Activo",
        status: "Cliente",
        executive: "Vendedor 1",
      },
    ],
    newUserList: [
      {
        name: "David Hopkins",
        email: "hopkins@gmail.com",
        photoUrl: "/assets/images/faces/2.jpg",
        status: "active",
      },
      {
        name: "James Mitchell",
        email: "petter@gmail.com",
        photoUrl: "/assets/images/faces/3.jpg",
        status: "pending",
      },
      {
        name: "Jessica Mitchell",
        email: "johndoe@gmail.com",
        photoUrl: "/assets/images/faces/4.jpg",
        status: "inactive",
      },
    ],
    topProductList: [
      {
        name: "Watch",
        date: "12-10-2019",
        price: 30,
        status: "delivered",
      },
      {
        name: "Iphone",
        date: "24-10-2019",
        price: 350,
        status: "pending",
      },
      {
        name: "Headphone",
        date: "11-11-2019",
        price: 10,
        status: "not delivered",
      },
    ],
  };

  componentDidMount() {
    if (user.rol !== -1) {
      this.getSalesExecutive();
      this.getSalesExecutiveDay();
      this.getNewLeadsExecutive();
      this.getOrdersDayExecutive();
      this.getInvoicesExecutive();
      this.getPaymentsExecutive();
      this.getGoalsExecutive();
      this.getpTypeExecutive();
      this.getTopTreeExecutive();
      this.getGoalsQuarterExecutive();
      this.getSalesCurrentyExecutive();
      this.getSalesLastyExecutive();
      this.getCustomerZones();
    } else if (user.rol === -1) {
      this.getSalesMonth();
      this.getSalesDay();
      this.getNewLeads();
      this.getOrdersDay();
      this.getInvoices();
      this.getPayments();
      this.getGoals();
    }
  }

  getSalesExecutive() {
    dashboardService
      .getSalesExecute(user.idusuario)
      .then((res) => res.json())
      .then((res) => {
        let moths = [];
        let values = [];
        res.map(({ nombreMes, ValorAnuncio }) => {
          moths.push(nombreMes);
          values.push(ValorAnuncio);
        });
        this.setState({
          dataMoths: moths,
          advertisement: values,
          hasRecords: true,
        });
      })
      .catch((err) => console.log(err));
  }

  getSalesMonth() {
    dashboardService
      .getSalesMonth()
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          let moths = [];
          let values = [];
          res.map(({ nombreMes, ValorAnuncio }) => {
            moths.push(nombreMes);
            values.push(ValorAnuncio);
          });
          this.setState({
            dataMoths: moths,
            advertisement: values,
            hasRecords: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  getSalesExecutiveDay() {
    dashboardService
      .getSalesExecutiveDay(user.idusuario)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ salesDay: res[0].ValorAnuncio });
        }
      })
      .catch((err) => console.log(err));
  }

  getSalesDay() {
    dashboardService
      .getSalesDay()
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ salesDay: res[0].ValorAnuncio });
        }
      })
      .catch((err) => console.log(err));
  }

  getNewLeads() {
    dashboardService
      .getNewLeads()
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ newLeads: res[0].cantidad });
        }
      })
      .catch((err) => console.log(err));
  }

  getNewLeadsExecutive() {
    dashboardService
      .getNewLeadsExecutive(user.idusuario)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ newLeads: res[0].cantidad });
        }
      })
      .catch((err) => console.log(err));
  }

  getOrdersDay() {
    dashboardService
      .getOrdersDay()
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ ordersDay: res[0].valor });
        }
      })
      .catch((err) => console.log(err));
  }

  getOrdersDayExecutive() {
    dashboardService
      .getOrdersDayExecutive(user.idusuario)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ ordersDay: res[0].valor });
        }
      })
      .catch((err) => console.log(err));
  }

  getInvoices() {
    dashboardService
      .getInvoices()
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ invoices: res[0].valor });
        }
      })
      .catch((err) => console.log(err));
  }

  getInvoicesExecutive() {
    dashboardService
      .getInvoicesExecutive(user.idusuario)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          this.setState({ invoices: res[0].valor });
        }
      })
      .catch((err) => console.log(err));
  }

  getPaymentsExecutive = async () => {
    const res = await Http.get(`payment-executive/${user.idusuario}`);
    {
      res[0].total != 0
        ? this.setState({ payments: res[0].total })
        : this.setState({ payments: 0 });
    }
  };

  getPayments = async () => {
    const res = await Http.get(`payment-admin`);
    this.setState({ payments: res[0].total });
  };

  getGoalsExecutive = async () => {
    const res = await Http.get(`goals-executive/${user.idusuario}`);
    this.setState({ goals: res[0].meta, goalsv: res[0].venta });
  };

  getGoals = async () => {
    const res = await Http.get(`goals-admin`);
    this.setState({ goals: res[0].meta, goalsv: res[0].venta });
  };

  getpTypeExecutive = async () => {
    const res = await Http.get(`sales-ptype-executive/${user.idusuario}`);
    this.setState({ lastMonthSummery: res });
  };

  getTopTreeExecutive = async () => {
    const res = await Http.get(`top-three-executive/${user.idusuario}`);
    this.setState({ topAuthorList: res });
  };

  getGoalsQuarterExecutive = async () => {
    const res = await Http.get(`goals-quarter-executive/${user.idusuario}`);
    {
      res.map((dato, index) => {
        dato.nombreMes === "Primero"
          ? this.setState({ Primero: dato.ValorAnuncio })
          : dato.nombreMes === "Segundo"
          ? this.setState({ Segundo: dato.ValorAnuncio })
          : dato.nombreMes === "Tercero"
          ? this.setState({ Tercero: dato.ValorAnuncio })
          : dato.nombreMes === "Cuarto"
          ? this.setState({ Cuarto: dato.ValorAnuncio })
          : dato.nombreMes === "PrimeroM"
          ? this.setState({ PrimeroM: dato.ValorAnuncio })
          : dato.nombreMes === "SegundoM"
          ? this.setState({ SegundoM: dato.ValorAnuncio })
          : dato.nombreMes === "TerceroM"
          ? this.setState({ TerceroM: dato.ValorAnuncio })
          : dato.nombreMes === "CuartoM"
          ? this.setState({ CuartoM: dato.ValorAnuncio })
          : this.setState({ Ninguno: dato.ValorAnuncio });
      });
    }
  };

  getSalesCurrentyExecutive = async () => {
    const res = await Http.get(
      `sales-current-year-executive/${user.idusuario}`
    );
    let Currenty = [];
    res.map(({ ValorAnuncio }) => {
      Currenty.push(ValorAnuncio);
    });
    this.setState({ dataCurrenty: Currenty });
  };

  getSalesLastyExecutive = async () => {
    const res = await Http.get(`sales-last-year-executive/${user.idusuario}`);
    let Lasty = [];
    res.map(({ ValorAnuncio }) => {
      Lasty.push(ValorAnuncio);
    });
    this.setState({ dataLasty: Lasty });
  };

  getCustomerZones = async () => {
    const res = await Http.get(`customer-zones-executive/${user.idusuario}`);
    this.setState({ customerZones: res });
  };

  handlePageClick = (data) => {
    let pageNumber = data.selected;
    let offset = Math.ceil(pageNumber * this.props.perPage);
    this.setState({ offset: offset }, () => {
      console.log(data);
    });
  };

  handleClick = async () => {
    var vnumeroNit = this.numeroNit.value;
    if (vnumeroNit !== "") {
      const res = await Http.get(`customer-nit/${vnumeroNit}`);
      this.setState({ customerData: res });
    } else {
      swal("¡Error!", "Nit inválido", "error");
    }
  };

  getUserStatusClass = (status) => {
    switch (status) {
      case "active":
        return "badge-success";
      case "delivered":
        return "badge-success";
      case "inactive":
        return "badge-warning";
      case "not delivered":
        return "badge-warning";
      case "pending":
        return "badge-primary";
      default:
        break;
    }
  };

  getStatusTextColor = (status) => {
    switch (status) {
      case "Publicidad Normal":
        return "text-success";
      case "Canje":
        return "text-success";
      case "Intercambio":
        return "text-success";
      case "Post-Pago":
        return "text-success";
      case "Publicidad Propia":
        return "text-warning";
      case "Cortesía":
        return "text-danger";
      default:
        return "text-primary";
    }
  };

  getStatusGoals = (status) => {
    if (status <= 30) {
      return "danger";
    } else if (status > 30 && status <= 60) {
      return "warning";
    } else if (status > 60 && status <= 90) {
      return "primary";
    } else {
      return "success";
    }
  };

  render() {
    let {
      lastMonthSummery = [],
      topAuthorList = [],
      customerZones = [],
      newUserList = [],
      customerData = [],
      topProductList = [],
      goalsYear = [],
      dataCurrenty,
      dataLasty,
      dataMoths,
      advertisement,
      hasRecords,
      salesDay,
      newLeads,
      ordersDay,
      invoices,
      payments,
      goals,
      goalsv,
      venta,
      Primero,
      Segundo,
      Tercero,
      Cuarto,
      PrimeroM,
      SegundoM,
      TerceroM,
      CuartoM,
    } = this.state;

    const cardGoals = [
      {
        title: "Primer Trimestre",
        subtitle:
          "Venta:" +
          Primero.toLocaleString() +
          " | Meta:" +
          PrimeroM.toLocaleString(),
        porcentaje: Math.round((Primero / PrimeroM) * 100),
        venta: Primero.toLocaleString(),
        meta: PrimeroM.toLocaleString(),
      },
      {
        title: "Segundo Trimestre",
        subtitle:
          "Venta:" +
          Segundo.toLocaleString() +
          " | Meta:" +
          SegundoM.toLocaleString(),
        porcentaje: Math.round((Segundo / SegundoM) * 100),
        venta: Segundo.toLocaleString(),
        meta: SegundoM.toLocaleString(),
      },
      {
        title: "Tercer Trimestre",
        subtitle:
          "Venta:" +
          Tercero.toLocaleString() +
          " | Meta:" +
          TerceroM.toLocaleString(),
        porcentaje: Math.round((Tercero / TerceroM) * 100),
        venta: Tercero.toLocaleString(),
        meta: TerceroM.toLocaleString(),
      },
      {
        title: "Cuarto Trimestre",
        subtitle:
          "Venta:" +
          Cuarto.toLocaleString() +
          " | Meta:" +
          CuartoM.toLocaleString(),
        porcentaje: Math.round((Cuarto / CuartoM) * 100),
        venta: Cuarto.toLocaleString(),
        meta: CuartoM.toLocaleString(),
      },
    ];
    const cardList = [
      {
        icon: "i-Add-File",
        subtitle: "Órdenes del día",
        title: ordersDay,
      },
      {
        icon: "i-Add-User",
        subtitle: "nuevos prospectos",
        title: newLeads,
      },
      {
        icon: "i-Checkout",
        subtitle: "venta de hoy",
        title: salesDay,
      },
      {
        icon: "i-File-Clipboard-File--Text",
        subtitle: "Facturado en el mes",
        title: invoices,
      },
      {
        icon: "i-Money-2",
        subtitle: "Pagado en el mes",
        title: payments,
      },
      {
        icon: "i-Line-Chart-2",
        subtitle: "Meta: " + goals,
        title: goalsv,
        // venta: goalsv,
      },
    ];

    return (
      <div>
        <Breadcrumb routeSegments={[{ name: "Inicio" }]}></Breadcrumb>
        {hasRecords === false ? (
          <Loading></Loading>
        ) : (
          <div>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="row">
                  {cardList.map((card, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card card-icon-big mb-4">
                        <div className="card-body text-center">
                          <i className={card.icon}></i>
                          <p className="text-muted mt-2 mb-0 text-capitalize">
                            {card.subtitle}
                          </p>
                          <p className="lead text-18 mt-2 mb-0 text-capitalize">
                            {card.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="card mb-4">
                  <div className="card-body p-0">
                    <h5 className="card-title m-0 p-3">Ventas</h5>
                    <LineChart4
                      height="350px"
                      moths={dataMoths}
                      advertisement={advertisement}
                    ></LineChart4>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <SimpleCard title="Venta por Tipo de Pauta" className="mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <table className="table">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Tipo Pauta</th>
                            <th scope="col">Monto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lastMonthSummery.map((item, index) => (
                            <tr key={index}>
                              <td>{item.tipo}</td>
                              <td
                                className={this.getStatusTextColor(item.tipo)}
                              >
                                {item.valor}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <DoughnutChart
                        usuario={user.idusuario}
                        height="200px"
                        valores={lastMonthSummery}
                      ></DoughnutChart>
                    </div>
                  </div>
                </SimpleCard>
              </div>

              <div className="col-lg-6 col-md-12">
                <SimpleCard title="Mejores Clientes" className="mb-4">
                  {topAuthorList.map((author, index) => (
                    <div
                      key={index}
                      className={classList({
                        "d-flex align-items-center border-bottom-dotted-dim": true,
                        "mb-3 pb-3": index !== topAuthorList.length - 1,
                      })}
                    >
                      <img
                        className="avatar-md rounded mr-3"
                        src={author.foto}
                        alt=""
                      />
                      <div className="flex-grow-1">
                        <h6 className="m-0">{author.nombre}</h6>
                        <p className="m-0 text-small text-muted">
                          Su cliente ha invertido {author.neto.toLocaleString()}{" "}
                          de {author.cantidad} pautas durante el mes en curso.
                        </p>
                      </div>
                      <div>
                        <Link to={`/customer/${author.idcliente}/edit`}>
                          <button className="btn btn-outline-primary btn-rounded btn-sm">
                            Ver
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </SimpleCard>
              </div>
              {cardGoals.map((rGoals, index) => (
                <div key={index} className="col-md-3">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h6 className="mb-2 text-muted">{rGoals.title}</h6>
                      <p className="mb-1 text-22 font-weight-light">
                        {rGoals.porcentaje}%
                      </p>
                      <ProgressBar
                        variant={this.getStatusGoals(rGoals.porcentaje)}
                        now={rGoals.porcentaje}
                        style={{ height: "4px" }}
                      ></ProgressBar>
                      <small className="text-muted">{rGoals.subtitle}</small>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-lg-12 col-md-12">
                <SimpleCard
                  title="Comparativo de Venta | Año anterior vs Año actual"
                  className="mb-4"
                >
                  <ComparisonChart
                    height="260px"
                    aanterior={dataLasty}
                    aactual={dataCurrenty}
                  ></ComparisonChart>
                </SimpleCard>
              </div>

              <Col lg={4} md={4} sm={4} xs={12} className="mb-4">
                <div className="card h-100">
                  <div className="card-header purple-500 text-purple-500 p-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="card-title text-white mb-0">Clientes</div>
                      <div className="ul-widget-app__bar ml-auto">
                        <Button
                          key="warning"
                          variant="outline-warning"
                          className="m-1 text-capitalize"
                          onClick={this.handleClick}
                        >
                          Buscar
                        </Button>
                      </div>
                    </div>

                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="busca tu cliente por nit"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        ref={(c) => (this.numeroNit = c)}
                      />
                      <span className="ul-widget-app__find-font">
                        <i className="i-Find-User font-weight-500"></i>
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="ul-widget-app__social-site mt-4 mb-4">
                      <div className="row">
                        <div className="col-12 text-center">
                          {customerData.map((cData, indexcd) => (
                            <div
                              key={indexcd}
                              className="ul-widget-app__social-friends"
                            >
                              <img
                                className="profile-picture avatar-lg mb-2"
                                src="/assets/images/ndd-logo1.png"
                                alt=""
                              />
                              <div className="ul-widget-app__small-title">
                                <span className="t-font-bolder">
                                  {cData.name} <br />( {cData.nit} )
                                </span>
                                <span className="text-primary">
                                  Estado: {cData.state} | Estatus:{" "}
                                  {cData.status} <br /> Ejecutivo en Orden:{" "}
                                  {cData.executive}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <div className="col-lg-8 col-sm-12">
                <SimpleCard title="Clientes por Zona" className="mb-4">
                  <CustomerZone
                    height="260px"
                    dataZonas={customerZones}
                  ></CustomerZone>
                </SimpleCard>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6">
                <div className="card o-hidden mb-4">
                  <div className="card-header d-flex card-title align-items-center mb-0">
                    <h3 className="w-50 float-left m-0">New Users</h3>
                  </div>

                  <div className="table-responsive">
                    <Table
                      hover
                      id="user_table"
                      className="table dataTable-collapse text-center"
                    >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Avatar</th>
                          <th scope="col">Email</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newUserList.map((user, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>
                              <img
                                className="rounded-circle m-0 avatar-sm-table "
                                src={user.photoUrl}
                                alt=""
                              />
                            </td>

                            <td>{user.email}</td>
                            <td>
                              <span
                                className={`badge ${this.getUserStatusClass(
                                  user.status
                                )}`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td>
                              <span className="cursor-pointer text-success mr-2">
                                <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                              </span>
                              <span className="cursor-pointer text-danger mr-2">
                                <i className="nav-icon i-Close-Window font-weight-bold"></i>
                              </span>
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
                        pageCount={5}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card o-hidden mb-4">
                  <div className="card-header d-flex card-title m-0 align-items-center">
                    <h3 className="w-50 float-left card-title m-0">
                      Total Sales
                    </h3>
                  </div>

                  <div className="table-responsive">
                    <Table
                      hover
                      id="sales_table"
                      className="table dataTable-collapse text-center"
                    >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Product</th>
                          <th scope="col">Date</th>

                          <th scope="col">Price</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProductList.map((product, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.date}</td>
                            <td>${product.price}</td>
                            <td>
                              <span
                                className={`badge ${this.getUserStatusClass(
                                  product.status
                                )}`}
                              >
                                {product.status}
                              </span>
                            </td>
                            <td>
                              <span className="cursor-pointer text-success mr-2">
                                <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                              </span>
                              <span className="cursor-pointer text-danger mr-2">
                                <i className="nav-icon i-Close-Window font-weight-bold"></i>
                              </span>
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
                        pageCount={5}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard2;
