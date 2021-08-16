import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import CurrencyFormat from "react-currency-format";

import Http from "../../../libs/Https";

class PautaDetail extends Component {
  state = {
    data: [],
    hasRecords: false,
  };

  getPautaDetail = async () => {
    const idpauta = this.props.match.params.idpauta;
    const res = await Http.get(`pauta-detail/${idpauta}`);
    await this.setState({ data: res[0], hasRecords: true });
  };

  componentWillMount() {
    this.getPautaDetail();
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
            { name: "Regresar", path: `/pautas/${data.idorden}` },
            { name: "Detalle Pauta" },
          ]}
        />
        {hasRecords !== false ? (
          <div className="ul-contact-detail col-12">
            <div className="row">
              <div className="col-lg-12 col-xl-12 ">
                <div className="card o-hidden">
                  <div className="card-body">
                    <div className="ul-contact-detail__info">
                      <h1 className="m-3 text-center">
                        <strong>{data.titular}</strong>
                      </h1>
                      <div className="row">
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Fecha publicación:</h5>
                            <span>{data.fecha_publicacion || "Sin"}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Forma de pago:</h5>
                            <span>{data.pago_tipo || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Produto:</h5>
                            <span>{data.producto_tra || "Sin"}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Tipo de Pauta:</h5>
                            <span>{data.pago_tipo || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Tamaño:</h5>
                            <span>{data.modulo}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Estado:</h5>
                            <span>{data.estado || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Monto Neto:</h5>
                            <CurrencyFormat
                              value={data.monto_neto}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Q"}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Monto:</h5>
                            <CurrencyFormat
                              value={data.monto}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Q"}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Iva:</h5>
                            <CurrencyFormat
                              value={data.monto_iva}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Q"}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Cliente:</h5>
                            <span>{data.cliente || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Timbre:</h5>
                            <CurrencyFormat
                              value={data.monto_impuesto}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Q"}
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

export default PautaDetail;
