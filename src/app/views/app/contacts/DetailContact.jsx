import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import Http from "../../../libs/Https";

class DetailContact extends Component {
  state = {
    data: [],
    hasRecords: false,
  };
  getContact = async () => {
    const idcontacto = this.props.match.params.idcontacto;
    const res = await Http.get(`contact-by/${idcontacto}`);
    await this.setState({ data: res, hasRecords: true });
  };

  componentWillMount() {
    this.getContact();
  }
  render() {
    let { data, hasRecords } = this.state;
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Regresar", path: "/contacts-all" },
            { name: "Detalle Contacto" },
          ]}
        ></Breadcrumb>
        {hasRecords === false ? <Loading></Loading> : null}
        {data.map((contact, ind) => (
          <section className="ul-contact-detail" key={ind}>
            <div className="row">
              <div className="col-lg-6 col-xl-6 ">
                <div className="card o-hidden">
                  <div className="card-body">
                    <div className="ul-contact-detail__info">
                      <div className="row">
                        <div className="col-6 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Nombre</h5>
                            <span>{contact.nombre}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Teléfono</h5>
                            <span>{contact.telefono || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-6 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Tipo</h5>
                            <span>{contact.tipo_contacto}</span>
                          </div>
                          <div className="ul-contact-detail__info-1">
                            <h5>Cliente</h5>
                            <span>{contact.nombre_cliente}</span>
                          </div>
                        </div>
                        <div className="col-6 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Correo</h5>
                            <span>{contact.correo || "Sin"}</span>
                          </div>
                        </div>
                        <div className="col-6 text-center">
                          <div className="ul-contact-detail__info-1">
                            <h5>Celular</h5>
                            <span>{contact.celular || "Sin"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    );
  }
}

export default DetailContact;
