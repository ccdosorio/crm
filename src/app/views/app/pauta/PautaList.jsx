import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import { Link } from "react-router-dom";

import Http from "../../../libs/Https";

class PautaList extends Component {
  state = {
    data: [],
    hasRecords: true,
  };

  getPautas = async () => {
    const idorden = this.props.match.params.idorden;
    const res = await Http.get(`pautas-order/${idorden}`);
    if (res.length > 0) {
      await this.setState({ hasRecords: true });
    } else {
      await this.setState({ hasRecords: false });
    }
    await this.setState({ data: res });
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

  componentWillMount() {
    this.getPautas();
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
          ¡La orden no cuenta con pautas! 😟
        </span>
      );
    }
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: `/order-detail/${this.props.match.params.idorden}`,
            },
            { name: "Pautas" },
          ]}
        />
        {data.length > 0 ? (
          <div className="row">
            {data.map((pauta, ind) => {
              return (
                <div key={ind} className="col-md-4">
                  <PautaListItem pauta={pauta} getColor={this.getBadgeColor} />
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

class PautaListItem extends Component {
  render() {
    return (
      <div className="card card-profile-1 mb-4">
        <div className="card-body text-center">
          <h3 className="m-0">{this.props.pauta.titular || "Sin"}</h3>
          <p>{this.props.pauta.producto_tra || "Sin"}</p>
          <div valign="middle">
            <div
              className={`badge badge-${this.props.getColor(
                this.props.pauta.estado
              )} p-2 text-capitalize`}
            >
              {this.props.pauta.estado ? this.props.pauta.estado : "Creado"}
            </div>
          </div>
          <p className="m-0">{this.props.pauta.fecha_publicacion || "Sin"}</p>
          <p className="text-muted mt-2 mb-0 text-capitalize">
            {this.props.pauta.modulo || "Sin"}
          </p>
          <br />
          <Link to={`/pauta/detail/${this.props.pauta.idpauta}`}>
            <button className="btn btn-primary btn-rounded">Ver</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default PautaList;
