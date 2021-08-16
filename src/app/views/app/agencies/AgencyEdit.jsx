import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import Badge from "../pages/Badge";
import Menu from "./Menu";

import Http from "../../../libs/Https";

class AgencyEdit extends Component {
  state = {
    data: [],
    hasRecords: false,
  };

  getData = async () => {
    const idcliente = this.props.match.params.idcliente;
    const res = await Http.get(`agencies-detail/${idcliente}`);
    await this.setState({ data: res, hasRecords: true });
  };

  componentWillMount() {
    this.getData();
  }
  render() {
    let { data, hasRecords } = this.state;
    let msg;
    if (hasRecords === false) {
      msg = <Loading></Loading>;
    }
    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            { name: "Regresar", path: "/agencies/list" },
            { name: "Agencia" },
          ]}
        />
        {hasRecords !== false ? (
          <div className="row">
            <div className="col-9">
              <Badge
                name={data.nombre || "Sin"}
                nit={data.nit || "Sin"}
                address={data.direccion || "Sin"}
                mail={data.correo || "Sin"}
                phone={data.telefono || "Sin"}
                status={data.estatus || "Sin"}
                zone={data.zona || "Sin"}
                name_comercial={data.nombre_comercial || "Sin"}
                location={data.referencia_ubicacion || "Sin"}
                mobile={data.celular || "Sin"}
                billing_ddress={data.direccion_facturacion || "Sin"}
                payment_ddress={data.direccion_pago || "Sin"}
                billing_name={data.nombre_factura || "Sin"}
                billing_nit={data.nit_factura || "Sin"}
                billing_day={data.fecha_factura || "Sin"}
                payment_day={data.fecha_pago || "Sin"}
                account_number={data.cuenta_banco || "Sin"}
                tax_free={data.exento_iva || "Sin"}
                free_ring={data.exento_timbre || "Sin"}
                agent_retainer={data.agente_retenedor || "Sin"}
              />
            </div>
            <div className="col-3">
              <Menu history={this.props.history} agency={data.idcliente} />
            </div>
          </div>
        ) : (
          msg
        )}
      </React.Fragment>
    );
  }
}

export default AgencyEdit;
