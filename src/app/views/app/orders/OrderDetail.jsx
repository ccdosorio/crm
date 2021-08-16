import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import MenuOptions from "../customer/MenuOptions";
import CurrencyFormat from "react-currency-format";
import Http from "../../../libs/Https";

class OrderDetail extends Component {
  state = {
    data: [],
    idCliente: "",
    hasRecords: false,
  };

  getOrderDetail = async () => {
    const idorden = this.props.match.params.idorden;
    const res = await Http.get(`order-detail/${idorden}`);
    await this.setState({
      data: res[0],
      idCliente: res[0].idCliente,
      hasRecords: true,
    });
  };

  componentWillMount() {
    this.getOrderDetail();
  }
  render() {
    let { data, idCliente, hasRecords } = this.state;
    let msg;
    if (hasRecords === false) {
      msg = <Loading></Loading>;
    }
    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: `/orders/${idCliente}`,
            },
            { name: "Detalle de orden" },
          ]}
        />
        {hasRecords !== false ? (
          <div className="ul-contact-detail col-12">
            <div className="row">
              <div className="col-lg-12 col-xl-12 ">
                <div className="card o-hidden">
                  <div className="card-body">
                    <div className="ul-contact-detail__info">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <h1 className="m-3 text-center">
                              <strong>{data.numero || "Sin"}</strong>
                            </h1>
                          </div>
                          <div className="col-md-auto"></div>
                          <div className="col col-lg-2">
                            <MenuOptions
                              history={this.props.history}
                              order={this.props.match.params.idorden}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Estado:</h5>
                            <span>{data.estado || "Sin"}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Cliente:</h5>
                            <span>{data.cliente || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Ejecutivo:</h5>
                            <span>{data.nombre_ejecutivo || "Sin"}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Cliente consumo:</h5>
                            <span>{data.cliente_entrega}</span>
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Monto Neto:</h5>
                            <CurrencyFormat
                              value={data.monto_neto}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={data.moneda}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Agencia:</h5>
                            <span>{data.cliente_intermediario || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Tipo de Pauta:</h5>
                            <span>{data.pago_tipo || "Sin"}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Monto:</h5>
                            <CurrencyFormat
                              value={data.monto}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={data.moneda}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Forma de pago:</h5>
                            <span>{data.pago_tipo || "Sin"}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Timbre:</h5>
                            <CurrencyFormat
                              value={data.monto_impuesto}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={data.moneda}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Fecha ingreso:</h5>
                            <span>{data.fecha || "Sin"}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Iva:</h5>
                            <CurrencyFormat
                              value={data.monto_iva}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={data.moneda}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          msg
        )}
      </React.Fragment>
    );
  }
}

export default OrderDetail;
