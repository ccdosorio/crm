import React, { Component } from "react";
import ProspectForm from "./ProspectForm";
import SweetAlert from "sweetalert2-react";
import { Breadcrumb, Loading } from "@gull";
import Badge from "../pages/Badge";
import AuthService from "../../../services/auth.service";

import Http from "../../../libs/Https";

const user = AuthService.getCurrentUser();
class ProspectEdit extends Component {
  state = {
    show: false,
    msg: "",
    departments: [],
    municipalities: [],
    hasRecords: false,
    form: {
      nombre: "",
      nit: "",
      direccion: "",
      correo: "",
      telefono: "",
      estatus: "",
      idgeo_departamento: "",
      idgeo_municipio: "",
      zona: "",
      nombre_comercial: "",
      referencia_ubicacion: "",
      celular: "",
      idforma_pago: "",
      idcliente_tipo: "",
      direccion_facturacion: "",
      direccion_pago: "",
      nombre_factura: "",
      nit_factura: "",
      fecha_factura: "",
      fecha_pago: "",
      exento_iva: "",
      exento_timbre: "",
      agente_retenedor: "",
      cuenta_banco: "",
      idbanco: "",
      idtipo_cuenta: "",
      tipo_ingreso: "",
    },
  };

  componentDidMount() {
    this.getData();
    this.getDepartments();
    this.getMunicipalities();
  }

  getData = async () => {
    const res = await Http.get(`prospect/${this.props.match.params.id}`);
    await this.setState({ form: res[0], hasRecords: true });
  };

  getDepartments = async () => {
    const res = await Http.get("departments/all/");
    if (res.length > 0) {
      let departments = res.map(({ idgeo_departamento, nombre }) => {
        if (nombre != null) {
          return {
            label: nombre,
            value: idgeo_departamento,
          };
        } else {
          return false;
        }
      });
      await this.setState({
        departments: departments,
      });
    }
  };

  getMunicipalities = async () => {
    const res = await Http.get("municipalities/all/");
    let municipalities = res.map(({ idgeo_municipio, nombre }) => {
      if (nombre != null) {
        return {
          label: nombre,
          value: idgeo_municipio,
        };
      } else {
        return false;
      }
    });
    await this.setState({
      municipalities: municipalities,
    });
  };

  handleDepartment = (value) => {
    this.setState({
      form: {
        ...this.state.form,
        idgeo_departamento: value.value,
      },
    });
  };

  handleMunicipalities = (value) => {
    this.setState({
      form: {
        ...this.state.form,
        idgeo_municipio: value.value,
      },
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

  handleSubmit = async (event) => {
    event.preventDefault();
    let prospect = {
      idcliente: this.props.match.params.id,
      nit: this.state.form.nit,
      nombre: this.state.form.nombre,
      direccion: this.state.form.direccion,
      correo: this.state.form.correo,
      telefono: this.state.form.telefono,
      estatus: this.state.form.estatus,
      idgeo_departamento: this.state.form.idgeo_departamento,
      idgeo_municipio: this.state.form.idgeo_municipio,
      zona: this.state.form.zona,
      nombre_comercial: this.state.form.nombre_comercial,
      referencia_ubicacion: this.state.form.referencia_ubicacion,
      celular: this.state.form.celular,
      idforma_pago: this.state.form.idforma_pago,
      idcliente_tipo: this.state.form.idcliente_tipo,
      direccion_facturacion: this.state.form.direccion_facturacion,
      direccion_pago: this.state.form.direccion_pago,
      nombre_factura: this.state.form.nombre_factura,
      nit_factura: this.state.form.nit_factura,
      fecha_factura: this.state.form.fecha_factura,
      fecha_pago: this.state.form.fecha_pago,
      exento_iva: this.state.form.exento_iva,
      exento_timbre: this.state.form.exento_timbre,
      agente_retenedor: this.state.form.agente_retenedor,
      cuenta_banco: this.state.form.cuenta_banco,
      idbanco: this.state.form.idbanco,
      idtipo_cuenta: this.state.form.idtipo_cuenta,
      tipo_ingreso: this.state.form.tipo_ingreso,
    };

    const res = await Http.post("customer-put", prospect);
    await this.setState({ show: true, msg: res });
    await this.props.history.push(
      `/prospects/${this.props.match.params.id}/edit`
    );
  };

  render() {
    const { hasRecords } = this.state;
    let title = "";
    let message;
    user.rol === -1 ? (title = "Prospecto") : (title = "Editar prospecto");
    if (hasRecords === false) {
      message = <Loading></Loading>;
    }
    return (
      <React.Fragment>
        <Breadcrumb
          routeSegments={[
            { name: "Regresar", path: "/prospects/list" },
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
            <div className="col-12">
              <Badge
                name={this.state.form.nombre || "Sin"}
                nit={this.state.form.nit || "Sin"}
                address={this.state.form.direccion || "Sin"}
                mail={this.state.form.correo || "Sin"}
                phone={this.state.form.telefono || "Sin"}
                status={this.state.form.estatus || "Sin"}
                zone={this.state.form.zona || "Sin"}
                name_comercial={this.state.form.nombre_comercial || "Sin"}
                location={this.state.form.referencia_ubicacion || "Sin"}
                mobile={this.state.form.celular || "Sin"}
                billing_ddress={this.state.form.direccion_facturacion || "Sin"}
                payment_ddress={this.state.form.direccion_pago || "Sin"}
                billing_name={this.state.form.nombre_factura || "Sin"}
                billing_nit={this.state.form.nit_factura || "Sin"}
                billing_day={this.state.form.fecha_factura || "Sin"}
                payment_day={this.state.form.fecha_pago || "Sin"}
                account_number={this.state.form.cuenta_banco || "Sin"}
                tax_free={this.state.form.exento_iva || "Sin"}
                free_ring={this.state.form.exento_timbre || "Sin"}
                agent_retainer={this.state.form.agente_retenedor || "Sin"}
              />
            </div>
            {user.rol !== -1 && (
              <div className="col-12">
                <ProspectForm
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  formValues={this.state.form}
                  departments={this.state.departments}
                  municipalities={this.state.municipalities}
                  onChangeDepartment={this.handleDepartment}
                  onChangeMunicipalities={this.handleMunicipalities}
                />
              </div>
            )}
          </div>
        ) : (
          message
        )}
      </React.Fragment>
    );
  }
}

export default ProspectEdit;
