import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Accordion } from "react-bootstrap";
import { Loading } from "@gull";

import swal from "sweetalert";
import Http from "../../../libs/Https";
import AuthService from "../../../services/auth.service";

const user = AuthService.getCurrentUser();
const array_ids = [];
class CampaignSendsMails extends Component {
  state = {
    data: [],
    sends: [],
    campaign: [],
    date: "",
    date_campaign: "",
    hasRecords: true,
    isDateValid: true,
  };
  componentDidMount() {
    this.getData();
  }

  componentWillMount() {
    this.getCampaign();
  }

  getData = async () => {
    const res = await Http.post("customers-categories-territory", {
      idusuario: user.idusuario,
    });

    if (res.length < 0) await this.setState({ hasRecords: false });
    await this.setState({ data: res });
  };

  getCampaign = async () => {
    const res = await Http.get(`campaing/${this.props.match.params.idcapaing}`);
    // console.log(res);
    let curr_date = new Date();
    let final_date = new Date(res[0].cffinal);

    if (final_date < curr_date) {
      await this.setState({ isDateValid: false });
    }
    await this.setState({
      date_campaign: new Date(res[0].cffinal),
      campaign: res,
    });
  };

  handleInputChange = async (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let id = event.target.value;
    let idcliente = parseInt(id);

    if (value) {
      array_ids.push(idcliente);
    } else {
      for (let index = 0; index < array_ids.length; index++) {
        if (array_ids[index] == idcliente) {
          array_ids.splice(index, 1);
        }
      }
    }

    await this.setState({ sends: array_ids });
  };

  handleChangeDate = async (e) => {
    await this.setState({ date: e.target.value });
  };

  handleClick = async () => {
    const idcampaign = this.props.match.params.idcapaing;
    let { date, sends, date_campaign } = this.state;
    let date_ex = new Date(date);

    if (sends.length < 1)
      swal("¡Error!", "No ha seleccionado ningún cliente", "warning");

    if (date === "")
      swal("¡Error!", "Selecciona una fecha de ejecución", "warning");

    if (date_ex > date_campaign)
      swal(
        "¡Error!",
        "La fecha de ejecución es mayor a la fecha de finalización de la campaña",
        "warning"
      );

    if (sends.length > 0 && date !== "" && date_ex <= date_campaign) {
      let send = {
        idcampaign: idcampaign,
        sends: sends,
        date: date,
      };
      // console.log(send);
      const res = await Http.post("campaign/send", send);
      // console.log(res);
      if (res.code === 200) {
        swal(
          "¡Exitoso!",
          "Se insertaron los registros correctamente",
          "success"
        ).then(() => {
          this.props.history.push(`/campaign/${idcampaign}/edit`);
        });
      }
    }
  };

  render() {
    let { data, hasRecords, isDateValid } = this.state;
    let msg;

    if (data.length > 0 && isDateValid === false && hasRecords === true) {
      msg = (
        <p className="text-muted">
          No se pueden hacer envíos de esta campaña 😞
        </p>
      );
    }

    if (data.length < 1 && hasRecords === true) {
      msg = <Loading></Loading>;
    }

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: `/campaign/${this.props.match.params.idcapaing}/edit`,
            },
            { name: "Administración de Envíos" },
          ]}
        />
        {data.length > 0 && isDateValid === true ? (
          <div className="mb-3">
            <h3 className="m-0">{this.state.campaign[0].campania}</h3>
            <br />
            <div className="row">
              <div className="col-md-12 mb-3 form-group">
                <label htmlFor="fecha_ejecucion">Fecha Ejecución:</label>
                <input
                  type="date"
                  placeholder="yyyy-mm-dd"
                  min="1800-01-01"
                  max="2050-12-31"
                  className="form-control form-control-rounded w-25"
                  id="fecha_ejecucion"
                  onChange={this.handleChangeDate}
                  name="fecha_ejecucion"
                />
              </div>
              {data.map((value, id) => (
                <div className="col-lg-4 mb-3" key={id}>
                  <Accordion>
                    <div className="card card-body ul-border__bottom">
                      <div className="text-center">
                        <div className="row">
                          <div className="col-12">
                            <h5 className="heading text-primary">{value[0]}</h5>
                          </div>
                        </div>
                        <Accordion.Toggle
                          eventKey={0}
                          as="span"
                          className="t-font-boldest ul-cursor--pointer"
                        >
                          Clientes
                        </Accordion.Toggle>
                      </div>

                      <Accordion.Collapse eventKey={0}>
                        <div className="mt-3">
                          {value[1].map((item, id) => (
                            <div key={id}>
                              <div className="row">
                                <div className="col-10">
                                  <p>{item.nombre}</p>
                                </div>
                                <div className="col-2">
                                  <input
                                    type="checkbox"
                                    name={item.nombre}
                                    value={item.idcliente}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                              </div>
                              <hr></hr>
                            </div>
                          ))}
                        </div>
                      </Accordion.Collapse>
                    </div>
                  </Accordion>
                </div>
              ))}
              <div className="col-md-12 mb-3 form-group">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.handleClick}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        ) : (
          msg
        )}
      </div>
    );
  }
}

export default CampaignSendsMails;
