import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import AuthService from "../../../services/auth.service";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();

class OrderList extends Component {
  state = {
    data: [],
    hasRecords: true,
    isMatch: true,
    allData: [],
    query: "",
  };
  getOrders = async () => {
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(
      `orders-customer/${idcliente}/${user.idusuario}`
    );
    if (res.length > 0) {
      await this.setState({ hasRecords: true });
    } else {
      await this.setState({ hasRecords: false });
    }
    await this.setState({ data: res, allData: res });
  };

  getBadgeColor = (role) => {
    switch (role) {
      case "Emitido":
        return "success";

      case "Creado":
        return "primary";

      case "Inactivo":
        return "danger";

      case "Por emitir":
        return "warning";

      default:
        return "primary";
    }
  };

  handleText = async (e) => {
    await this.setState({ query: e.target.value });
    await this.handleSearch(this.state.query);
  };

  handleSearch = (query) => {
    const { allData } = this.state;

    const dataFiltered = allData.filter((value) => {
      let order = value.numero.toString();
      return (
        order.toLowerCase().includes(query.toLowerCase()) ||
        value.fecha.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (dataFiltered.length === 0) {
      this.setState({ isMatch: false });
    } else if (dataFiltered.length >= 1) {
      this.setState({ isMatch: true });
    }
    this.setState({ data: dataFiltered });
  };

  componentWillMount() {
    this.getOrders();
  }

  render() {
    let { data, hasRecords, query, isMatch } = this.state;
    let msg;

    if (data.length < 1 && hasRecords === true && isMatch === true) {
      msg = <Loading></Loading>;
    }
    if (user.rol === -1 && hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No tiene acceso a esta información! 😟
        </span>
      );
    } else if (hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡El cliente no cuenta con órdenes! 😟
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
            { name: "Listado de Ordenes" },
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
                  placeholder="Buscar número de orden"
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
        {data.length > 0 ? (
          <div className="row">
            {data.map((order, ind) => {
              return (
                <div key={ind} className="col-md-4">
                  <OrderListItem order={order} getColor={this.getBadgeColor} />
                </div>
              );
            })}
          </div>
        ) : (
          msg
        )}
      </div>
    );
  }
}

class OrderListItem extends Component {
  render() {
    return (
      <div className="card card-profile-1 mb-4">
        <div className="card-body text-center">
          <h3 className="m-0">{this.props.order.numero || "Sin"}</h3>
          <CurrencyFormat
            value={this.props.order.monto}
            displayType={"text"}
            thousandSeparator={true}
            prefix={this.props.order.moneda}
            renderText={(value) => <p className="mt-0">{value}</p>}
          />
          <div valign="middle">
            <div
              className={`badge badge-${this.props.getColor(
                this.props.order.estado
              )} p-2 text-capitalize`}
            >
              {this.props.order.estado ? this.props.order.estado : "Activo"}
            </div>
          </div>
          <p className="m-0">{this.props.order.fecha || "Sin"}</p>
          <p className="text-muted mt-2 mb-0 text-capitalize">
            {this.props.order.cliente || "Sin"}
          </p>
          <br />
          <Link to={`/order-detail/${this.props.order.idorden}`}>
            <button className="btn btn-primary btn-rounded">Ver</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default OrderList;
