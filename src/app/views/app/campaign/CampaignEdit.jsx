import React, { Component } from "react";
import { Breadcrumb, Loading } from "@gull";
import SweetAlert from "sweetalert2-react";
import CampaignView from "../pages/CampaignView";
import MenuCampaign from "../pages/MenuCampaign";
import AuthService from "../../../services/auth.service";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();
class CampaignEdit extends Component {
  state = {
    show: false,
    msg: "",
    hasRecords: false,
    form: {
      id: "",
      campania: "",
      cffinal: "",
      estatus: "",
      estado: "",
      categorias: "",
      tipo: "",
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await Http.get(`campaing/${this.props.match.params.id}`);
    await this.setState({
      form: res[0],
      hasRecords: true,
      onPropValidate: true,
    });
  };

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { hasRecords } = this.state;
    let title = "";
    let msg;
    user.rol === -1 ? (title = "Editar Campaña") : (title = "Campaña");

    if (hasRecords === false) {
      msg = <Loading></Loading>;
    }
    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            { name: "Regresar", path: "/campaign/list" },
            { name: title },
          ]}
        />
        {this.state.show && (
          <SweetAlert
            show={true}
            title="¡Exitoso!"
            type="success"
            text={this.state.msg}
            confirmButtonText="OK"
            onConfirm={() => this.setState({ show: false })}
          />
        )}
        {hasRecords !== false ? (
          <div className="row">
            <div className="col-10">
              <CampaignView
                campania={this.state.form.campania || "Sin"}
                cfinicia={this.state.form.cfinicia || "Sin"}
                cffinal={this.state.form.cffinal || "Sin"}
                estatus={this.state.form.estatus || "Sin"}
                estado={this.state.form.estado || "Sin"}
                categorias={this.state.form.categorias || "Sin"}
                tipo={this.state.form.tipo || "Sin"}
              />
            </div>
            <div className="col-2">
              <MenuCampaign
                history={this.props.history}
                campaign={this.state.form.id}
              />
            </div>
            {user.rol !== -1 && <div className="col-12"></div>}
          </div>
        ) : (
          msg
        )}
      </React.Fragment>
    );
  }
}

export default CampaignEdit;
