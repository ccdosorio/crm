import React, { Component } from "react";
import { SimpleCard } from "@gull";
import { Link } from "react-router-dom";

class Campaign extends Component {
  render() {
    return (
      <div>
        <section className="ul-pricing-table">
          <div className="row ">
            <div className="col-lg-12 col-xl-12">
              <SimpleCard title="Planificar Campañas" className="mb-4">
                <div className="ul-pricing__table-list">
                  <div className="row">
                    <div className="col-md-12 col-lg-4 col-xl-4"></div>
                    <div className="col-md-12 col-lg-4 col-xl-4">
                      <div className="ul-pricing__table-1 border-right-0">
                        <div className="ul-pricing__image card-icon-bg-primary">
                          <i className="i-Email"></i>
                        </div>
                        <div className="ul-pricing__title">
                          <h2 className="heading text-primary">
                            Correo electrónico
                          </h2>
                        </div>
                        <div className="ul-pricing__list">
                          <p>
                            Crea tu campaña y envíala a tus clientes muy
                            fácilmente desde tu CRM
                          </p>
                        </div>
                        <Link to={"/campaign/create"}>
                          <button
                            type="button"
                            className="btn btn-lg btn-default btn-rounded btn-primary m-1"
                          >
                            Crear
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleCard>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Campaign;
