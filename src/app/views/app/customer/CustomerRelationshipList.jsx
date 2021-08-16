import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import { classList } from "@utils";
import { Link } from "react-router-dom";

import Http from "../../../libs/Https";

class CustomerRelationshipList extends Component {
  state = {
    data: [],
    hasRecords: true,
  };

  getAll = async () => {
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(`customers-r/all/${idcliente}`);
    res.length > 0
      ? await this.setState({ hasRecords: true })
      : await this.setState({ hasRecords: false });
    await this.setState({ data: res });
  };

  componentDidMount() {
    this.getAll();
  }
  render() {
    let { data, hasRecords } = this.state;
    let msg;
    if (data.length < 1 && hasRecords === true) {
      msg = <Loading></Loading>;
    }
    if (hasRecords === false) {
      msg = (
        <span role="img" className="text-muted" aria-label="sad">
          ¡No tienes clientes relacionados! 😟
        </span>
      );
    }

    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: `/agency/${this.props.match.params.idcliente}/edit`,
            },
            { name: "Clientes Relacionados" },
          ]}
        />
        {data.length > 0 ? (
          <div className="row">
            {data.map((customer, index) => {
              return (
                <div key={index} className="col-md-4">
                  <CustomerRItem customer={customer} />
                </div>
              );
            })}
          </div>
        ) : (
          msg
        )}
      </React.Fragment>
    );
  }
}

class CustomerRItem extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="card card-profile-1 mb-4">
          <div className="card-body text-center">
            <h5 className="m-0">{this.props.customer.nombre || "Sin"}</h5>
            <p className="mt-0">{this.props.customer.nit || "Sin"}</p>
            <p>{this.props.customer.idcliente}</p>
            <p>
              <strong>Tipo: </strong>
              {this.props.customer.tipo || "Sin"}
            </p>
            <p>
              <strong>Dirección: </strong>
              {this.props.customer.direccion || "Sin"}
            </p>
            <p>
              <strong>Tel: </strong>
              {this.props.customer.telefono || "Sin"}
            </p>
            <p>
              <strong>Ejecutivo: </strong>
              {this.props.customer.ejecutivo || "Sin"}
            </p>
            <p className="pl-0 capitalize">
              <small
                className={classList({
                  "badge rounded-pill text-white px-8 py-2": true,
                  "bg-success": this.props.customer.estatus === "Cliente",
                  "bg-warning": this.props.customer.estatus === "Prospecto",
                  "bg-danger": this.props.customer.estatus === "Rechazado",
                })}
              >
                {this.props.customer.estatus}
              </small>
            </p>
            <p className="text-muted mt-2 mb-0 text-capitalize">
              {this.props.customer.nombre_comercial || "Sin nombre comercial"}
            </p>
            <br />
            <Link to={`/customer/${this.props.customer.idcliente}/edit`}>
              <button className="btn btn-primary btn-rounded">Ver</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomerRelationshipList;
