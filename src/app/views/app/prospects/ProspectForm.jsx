import React, { Component } from "react";
import Select from "react-select";

import Http from "../../../libs/Https";

class ProspectForm extends Component {
  state = {
    idMunicipality: 0,
    municipality: "",
    idDepartment: 0,
    department: "",
    hasRecords: false,
  };

  getData = async () => {
    const res = await Http.get(`customer/${this.props.formValues.idcliente}`);
    if (res[0].idgeo_departamento !== null) {
      await this.setState({
        idDepartment: res[0].idgeo_departamento,
        department: res[0].departamento,
      });
    } else {
      await this.setState({
        idDepartment: 0,
        department: "SIN DEPARTAMENTO",
      });
    }

    if (res[0].idgeo_municipio !== null) {
      await this.setState({
        idMunicipality: res[0].idgeo_municipio,
        municipality: res[0].municipio,
      });
    } else {
      await this.setState({
        idMunicipality: 0,
        municipality: "SIN MUNICIPIO",
      });
    }
    await this.setState({ hasRecords: true });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    let { hasRecords, idMunicipality, municipality, idDepartment, department } =
      this.state;
    let msg = "";
    return (
      <div>
        {hasRecords !== false ? (
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={this.props.onSubmit}>
                <div className="form-row">
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      className="form-control form-control-rounded"
                      id="nombre"
                      name="nombre"
                      placeholder="Escriba su nombre"
                      onChange={this.props.onChange}
                      value={this.props.formValues.nombre || ""}
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="nit">Nit</label>
                    <input
                      type="text"
                      className="form-control form-control-rounded"
                      id="nit"
                      name="nit"
                      disabled
                      placeholder="Escriba su nit"
                      onChange={this.props.onChange}
                      value={this.props.formValues.nit || ""}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                      className="form-control form-control-rounded"
                      id="direccion"
                      name="direccion"
                      placeholder="Escriba su dirección"
                      onChange={this.props.onChange}
                      value={this.props.formValues.direccion || ""}
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="correo">Correo</label>
                    <input
                      type="email"
                      className="form-control form-control-rounded"
                      id="correo"
                      name="correo"
                      placeholder="Escriba su correo"
                      onChange={this.props.onChange}
                      value={this.props.formValues.correo || ""}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      className="form-control form-control-rounded"
                      id="telefono"
                      name="telefono"
                      placeholder="Escriba su teléfono"
                      onChange={this.props.onChange}
                      value={this.props.formValues.telefono || ""}
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="estatus">Estatus</label>
                    <select
                      className="form-control form-control-rounded"
                      name="estatus"
                      onChange={this.props.onChange}
                      value={this.props.formValues.estatus || ""}
                      disabled
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Prospecto">Prospecto</option>
                      <option value="Cliente">Cliente</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="idgeo_departamento">Departamento</label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={{
                        label: department,
                        value: idDepartment,
                      }}
                      name="idgeo_departamento"
                      options={this.props.departments}
                      onChange={this.props.onChangeDepartment}
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="idgeo_municipio">Municipio</label>
                    <Select
                      className="basic-single form-control-rounded"
                      classNamePrefix="select"
                      defaultValue={{
                        label: municipality,
                        value: idMunicipality,
                      }}
                      name="idgeo_municipio"
                      options={this.props.municipalities}
                      onChange={this.props.onChangeMunicipalities}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="zona">Zona</label>
                    <input
                      className="form-control form-control-rounded"
                      id="zona"
                      name="zona"
                      placeholder="Escriba la zona"
                      onChange={this.props.onChange}
                      value={this.props.formValues.zona || ""}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="nombre_comercial">Nombre Comercial</label>
                    <input
                      className="form-control form-control-rounded"
                      id="nombre_comercial"
                      name="nombre_comercial"
                      placeholder="Escriba el nombre"
                      onChange={this.props.onChange}
                      value={this.props.formValues.nombre_comercial || ""}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="referencia_ubicacion">
                      Referencia de Ubicación
                    </label>
                    <input
                      className="form-control form-control-rounded"
                      id="referencia_ubicacion"
                      name="referencia_ubicacion"
                      placeholder="Escriba su referencia"
                      onChange={this.props.onChange}
                      value={this.props.formValues.referencia_ubicacion || ""}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="celular">Celular</label>
                    <input
                      type="number"
                      className="form-control form-control-rounded"
                      id="celular"
                      name="celular"
                      placeholder="Escriba su celular"
                      onChange={this.props.onChange}
                      value={this.props.formValues.celular || ""}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="idforma_pago">Forma de Pago</label>
                    <select
                      className="form-control form-control-rounded"
                      name="idforma_pago"
                      onChange={this.props.onChange}
                      value={this.props.formValues.idforma_pago || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1">Deposito</option>
                      <option value="2">Cheque</option>
                      <option value="3">Efectivo</option>
                      <option value="4">Tarjeta</option>
                      <option value="5">Transferencia</option>
                      <option value="6">Contraseña</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="idcliente_tipo">Tipo de cliente</label>
                    <select
                      className="form-control form-control-rounded"
                      name="idcliente_tipo"
                      onChange={this.props.onChange}
                      value={this.props.formValues.idcliente_tipo || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1">Directo</option>
                      <option value="2">Agencia de Publicidad</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="direccion_facturacion">
                      Dirección de Facturación
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-rounded"
                      id="direccion_facturacion"
                      name="direccion_facturacion"
                      placeholder="Direccion de facturación"
                      onChange={this.props.onChange}
                      value={this.props.formValues.direccion_facturacion || ""}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="direccion_pago">Dirección de Pago</label>
                    <input
                      type="text"
                      className="form-control form-control-rounded"
                      id="direccion_pago"
                      name="direccion_pago"
                      placeholder="Direccion de pago"
                      onChange={this.props.onChange}
                      value={this.props.formValues.direccion_pago || ""}
                    />
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="nombre_factura">Nombre para Facturar</label>
                    <input
                      type="text"
                      className="form-control form-control-rounded"
                      id="nombre_factura"
                      name="nombre_factura"
                      placeholder="Nombre factura"
                      onChange={this.props.onChange}
                      value={this.props.formValues.nombre_factura || ""}
                    />
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="nit_factura">Nit para Facturar</label>
                    <input
                      type="text"
                      className="form-control form-control-rounded"
                      id="nit_factura"
                      name="nit_factura"
                      placeholder="Nit factura"
                      onChange={this.props.onChange}
                      value={this.props.formValues.nit_factura || ""}
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="fecha_factura">Día para facturar</label>
                    <input
                      type="number"
                      className="form-control form-control-rounded"
                      id="fecha_factura"
                      name="fecha_factura"
                      placeholder="Escriba el día"
                      onChange={this.props.onChange}
                      value={this.props.formValues.fecha_factura || ""}
                    />
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="fecha_pago">Día de Pago</label>
                    <input
                      type="number"
                      className="form-control form-control-rounded"
                      id="fecha_pago"
                      name="fecha_pago"
                      placeholder="Escribe el día"
                      value={this.props.formValues.fecha_pago || ""}
                      onChange={this.props.onChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="cuenta_banco">No. de cuenta</label>
                    <input
                      type="text"
                      className="form-control form-control-rounded"
                      id="cuenta_banco"
                      name="cuenta_banco"
                      placeholder="No. de cuenta"
                      value={this.props.formValues.cuenta_banco || ""}
                      onChange={this.props.onChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="idbanco">Banco</label>
                    <select
                      className="form-control form-control-rounded"
                      name="idbanco"
                      onChange={this.props.onChange}
                      value={this.props.formValues.idbanco || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1">Banco Industrial</option>
                      <option value="2">Banrural</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="idtipo_cuenta">Tipo de Cuenta</label>
                    <select
                      className="form-control form-control-rounded"
                      name="idtipo_cuenta"
                      onChange={this.props.onChange}
                      value={this.props.formValues.idtipo_cuenta || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1">Monetaria</option>
                      <option value="2">Ahorro</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="tipo_ingreso">Tipo de Ingreso</label>
                    <select
                      className="form-control form-control-rounded"
                      name="tipo_ingreso"
                      onChange={this.props.onChange}
                      value={this.props.formValues.tipo_ingreso || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Agencia">Agencia</option>
                      <option value="Directo">Directo</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="exento_iva">Excento de Iva</label>
                    <select
                      className="form-control form-control-rounded"
                      name="exento_iva"
                      onChange={this.props.onChange}
                      value={this.props.formValues.exento_iva || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="exento_timbre">Excento de Timbre</label>
                    <select
                      className="form-control form-control-rounded"
                      name="exento_timbre"
                      onChange={this.props.onChange}
                      value={this.props.formValues.exento_timbre || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="agente_retenedor">Agente retenedor</label>
                    <select
                      className="form-control form-control-rounded"
                      name="agente_retenedor"
                      onChange={this.props.onChange}
                      value={this.props.formValues.agente_retenedor || ""}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary">
                    Editar
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          msg
        )}
      </div>
    );
  }
}

export default ProspectForm;
