import React, { Component } from "react";
import { format } from "date-fns";

class CampaignView extends Component {
  render() {
    return (
      <div className="card card-profile-1 mb-12">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="m-3 text-center">
                <strong>{this.props.campania}</strong>
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Fecha Inicio: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">
                    {format(
                      new Date(
                        this.props.cfinicia ? this.props.cfinicia : new Date()
                      ).getTime(),
                      "dd MMM, yyyy"
                    )}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Estado: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.estatus}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Categoria: </p>
                </div>
                <div className="col-8">
                  <p className="m-0">{this.props.categorias}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Fecha Finalización: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">
                    {format(
                      new Date(
                        this.props.cffinal ? this.props.cffinal : new Date()
                      ).getTime(),
                      "dd MMM, yyyy"
                    )}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Estado: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.estado}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Tipo de Campaña: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.tipo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CampaignView;
