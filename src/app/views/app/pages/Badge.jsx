import React, { Component } from "react";

class Badge extends Component {
  render() {
    return (
      <div className="card card-profile-1 mb-12">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="m-3 text-center">
                <strong>{this.props.name}</strong>
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Nit: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.nit}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Dirección: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.address}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Correo: </p>
                </div>
                <div className="col-8">
                  <p className="m-0">{this.props.mail}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Teléfono: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.phone}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Estatus: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.status}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Zona: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.zone}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Nombre Comercial: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.name_comercial}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Referencia de Ubicación: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.location}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <p className="text-muted">Celular: </p>
                </div>
                <div className="col-8">
                  <p className="mt-0">{this.props.mobile}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Direcció de Facturación: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.billing_ddress}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Dirección de Pago: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.payment_ddress}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Nombre Facturación: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.billing_name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Nit Facturación: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.billing_nit}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Día Facturación: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.billing_day}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Día de Pago: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.payment_day}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">No. de cuenta: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.account_number}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Exento de IVA: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.tax_free}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Exento de Timbre: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.free_ring}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className="text-muted">Agente retenedor: </p>
                </div>
                <div className="col-7">
                  <p className="mt-0">{this.props.agent_retainer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Badge;
