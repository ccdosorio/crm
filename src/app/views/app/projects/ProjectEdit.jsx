import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import SweetAlert from "sweetalert2-react";
import AuthService from "../../../services/auth.service";
import { Loading } from "@gull";

import ProjectBadge from "./ProjectBadge";
import ProjectMenu from "./ProjectMenu";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();
class ProjectEdit extends Component {
  state = {
    show: false,
    msg: "",
    hasRecords: false,
    form: {},
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await Http.get(`project/${this.props.match.params.id}`);
    await this.setState({
      form: res[0],
      hasRecords: true,
      onPropValidate: true,
    });
  };
  render() {
    let { hasRecords, show, msg } = this.state;
    let title = "";
    let message;
    user.rol === -1 ? (title = "Editar Proyecto") : (title = "Proyecto");

    if (hasRecords === false) {
      message = <Loading></Loading>;
    }
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Regresar", path: "/projects" },
            { name: title },
          ]}
        />
        {show && (
          <SweetAlert
            show={true}
            title="¡Exitoso!"
            type="success"
            text={msg}
            confirmButtonText="OK"
            onConfirm={() => this.setState({ show: false })}
          />
        )}
        {hasRecords !== false ? (
          <div className="row">
            <div className="col-10">
              <ProjectBadge
                project={this.state.form.proyecto}
                type={this.state.form.tipoProyecto}
                date_initial={this.state.form.fecha_inicio}
                date_final={this.state.form.fecha_final}
                description={this.state.form.descripcion}
                manager={this.state.form.encargado}
                status={this.state.form.estatus}
                category={this.state.form.categorias}
              />
            </div>
            <div className="col-2">
              <ProjectMenu
                history={this.props.history}
                project={this.state.form.id}
              />
            </div>
            {user.rol !== -1 && <div className="col-12"></div>}
          </div>
        ) : (
          message
        )}
      </div>
    );
  }
}

export default ProjectEdit;
