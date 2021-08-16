import React, { Component } from "react";
import Http from "../../../libs/Https";
import PasswordStrengthBar from "react-password-strength-bar";
import { Breadcrumb } from "@gull";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import { Modal } from "react-bootstrap";
import swal from "sweetalert2";
import { Storage } from "aws-amplify";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Profiles.css";
import { AsyncStorage } from "AsyncStorage";
import moment from "moment";
import { Button } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import ProfileEventDialog from "./ProfileEventDialog";
import DatePicker, { registerLocale } from "react-datepicker";
import deLocale from "date-fns/locale/es";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Formik } from "formik";
import classnames from "classnames";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DateTime from "react-datetime";
import dateFormat from "dateformat";
import Layout2Header from "../../../GullLayout/Layout2/Layout2Header";
import md5 from "md5";
const URL_BUCKET =
  "https://s3.amazonaws.com/nd.s3.rep.documentos-electronicos/public/";
const key = "response_signin";

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: "",
      profileImgPortada: "",
      response_signin: {},
      banderaAvatar: false,
      banderaPortada: false,
      idpersona: "",
      foto: "",
      nombre: " ",
      apellido: "",
      correo: "",
      fecha_nacimiento: "",
      profesion: "",
      telefonos: "",
      ext: "",
      facebook: "",
      direccion: "",
      twitter: "",
      linkedin: "",
      estado: "",
      show: false,
      // response_datos: {},
      response_datos: {},
      profileList: [],
      profile_by: {},
      mensaje: "",
      password: "",
      check_password: "",
      genero: "",
      array_genero: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassoword = this.handleChangePassoword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  imageHandlerPortada = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImgPortada: reader.result });
        // console.log("resultado de la imagen", reader.result);
      }
    };

    const file_event_portada = e.target.files[0];

    AsyncStorage.getItem(key).then((response) => {
      this.setState({ response_signin: JSON.parse(response) });
      let idusuario = this.state.response_signin.idusuario;
      Storage.put(
        `nd/perfil/portada/${idusuario}/${file_event_portada.name}`,
        file_event_portada,
        {
          contentType: file_event_portada.type,
        }
      )
        .then((res) => {
          if (res) {
            let portada = {
              idusuario: idusuario,
              portada: file_event_portada.name,
            };

            this.updatePortada(portada);
            //console.log("json ---: " + portada);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    reader.readAsDataURL(e.target.files[0]);
  };

  listPortada = () => {
    AsyncStorage.getItem(key).then((response) => {
      this.setState({ response_signin: JSON.parse(response) });
      let idusuario = this.state.response_signin.idusuario;
      // this.getAvatar(idusuario)

      this.getPortada(idusuario).then((res) => {
        let portada = res;
        //console.log("------------> portada",portada)
        if (portada !== null || portada !== "") {
          Storage.list(`nd/perfil/portada/${idusuario}/${portada}`)
            .then((res) => {
              //console.log("------------>",res[0].key)
              if (res.length > 0) {
                this.setState({
                  banderaPortada: true,
                  profileImgPortada: res[0].key,
                });
              } else {
                //("NO HAY IMAGENES");

                this.setState({
                  banderaPortada: false,
                  profileImgPortada:
                    "https://s3.amazonaws.com/nd.s3.rep.documentos-electronicos/portada/annie-spratt-xz485Eku8O4-unsplash.jpg",
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          //console.log("NO HAY IMAGENES");

          this.setState({
            banderaPortada: false,
            profileImgPortada:
              "https://s3.amazonaws.com/nd.s3.rep.documentos-electronicos/portada/annie-spratt-xz485Eku8O4-unsplash.jpg",
          });
        }
        // prints 60 after 4 seconds.
      });
    });
  };

  /*---------------------------------------------------------------------------------------------------------------------------*/

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
        // console.log("resultado de la imagen", reader.result);
      }
    };

    const file_event = e.target.files[0];
    AsyncStorage.getItem(key).then((response) => {
      this.setState({ response_signin: JSON.parse(response) });
      let idusuario = this.state.response_signin.idusuario;
      Storage.put(
        `nd/perfil/avatar/${idusuario}/${file_event.name}`,
        file_event,
        {
          contentType: file_event.type,
        }
      )
        .then((res) => {
          if (res) {
            let profile = {
              idusuario: idusuario,
              foto: file_event.name,
            };

            this.updateAvatar(profile);
            //console.log("json ---: " + profile);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    reader.readAsDataURL(e.target.files[0]);
  };

  listAvatar = () => {
    AsyncStorage.getItem(key).then((response) => {
      this.setState({ response_signin: JSON.parse(response) });
      let idusuario = this.state.response_signin.idusuario;
      // this.getAvatar(idusuario)

      this.getAvatar(idusuario).then((res) => {
        let foto = res;
        // console.log("si entra",res)
        // console.log("fotoooo->",foto)
        if (foto !== null || foto !== "") {
          // console.log("foto",foto)
          Storage.list(`nd/perfil/avatar/${idusuario}/${foto}`)
            .then((res) => {
              if (res.length > 0) {
                this.setState({ banderaAvatar: true, profileImg: res[0].key });
              } else {
                //  console.log("NO HAY IMAGENES");

                this.setState({
                  banderaAvatar: false,
                  profileImg:
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                });
              }
            })
            .catch((err) => console.log(err));
        } else {
          //  console.log("NO HAY IMAGENES");

          this.setState({
            banderaAvatar: false,
            profileImg:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          });
        }

        // prints 60 after 4 seconds.
      });
    });
  };

  listDatosPersonales = () => {
    AsyncStorage.getItem(key).then((response) => {
      this.setState({ response_signin: JSON.parse(response) });
      let idusuario = this.state.response_signin.idusuario;

      this.getDatosPersonales(idusuario).then((res) => {
        this.setState({
          idpersona: res.idpersona,
          nombre: res.nombre,
          apellido: res.apellido,
          correo: res.correo,
          fecha_nacimiento: new Date(res.fecha_nacimiento),
          profesion: res.profesion,
          telefonos: res.telefonos,
          ext: res.ext,
          facebook: res.facebook,
          direccion: res.direccion,
          twitter: res.twitter,
          linkedin: res.linkedin,
          estado: res.estado_p,
          genero: res.genero,
        });
        /*console.log(
          "nombre",
          this.state.nombre,
          "fecha",
          this.state.fecha_nacimiento
        );*/
      });
    });
  };

  toggleEventDialog = () => {
    this.setState({ show: !this.state.show });
  };

  toggleOpenDialog = (idusuario, avatar, nombre, apellido, telefono) => {
    let jsonDatos = {
      idusuario: idusuario,
      avatar: avatar,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
    };
    this.setState({ show: true, profile_by: jsonDatos });
  };

  componentDidMount() {
    this.listAvatar();
    this.listPortada();
    this.listDatosPersonales();
    this.getListProfile();
  }

  updateAvatar = async (profile) => {
    await Http.post("profile/avatar/put", profile);
    window.location.reload(true);
  };

  getAvatar = async (idusuario) => {
    const res = await Http.get(`profile/avatar/${idusuario}`);

    return res[0].foto;
    //await this.setState({ foto: res[0].foto });
  };

  updatePortada = async (portada) => {
    await Http.post("profile/portada/put", portada);
  };

  getPortada = async (idusuario) => {
    const res = await Http.get(`profile/portada/${idusuario}`);

    return res[0].portada;

    //await this.setState({ foto: res[0].foto });
  };

  updateDatosPersonales = async (datos) => {
    const res = await Http.post("profile/datos/put", datos);

    return res;
  };

  sendMessage = async (datos) => {
    const res = await Http.postSMS("prod/sms", datos);

    return res;
  };

  getDatosPersonales = async (idusuario) => {
    const res = await Http.get(`profile/datos/${idusuario}`);

    let jsonDatos = res[0];

    return res[0];
  };

  getListProfile = async () => {
    const res = await Http.get(`profile/datos/all`);

    this.setState({ profileList: res });

    //console.log("array", this.state.profileList);
  };

  updateContraseña = async (datos) => {
    const res = await Http.post("profile/password/put", datos);

    return res;
  };

  /*handleChange(event) {
    console.log("asdfasfasd", event.target);
    
    this.setState({ nombre: event.target.value });
  }*/

  handleChange(event) {
    const { name, value } = event.target;
    //console.log("name", name, "value", value);

    this.setState({
      [name]: value,
    });
  }

  handleChangePassoword(event) {
    const { name, value } = event.target;
    //  console.log("name", name, "value", value);
    this.setState({
      [name]: value,
    });
  }

  updatePassword = async () => {
    let contraseñaNueva = md5(this.state.password);
    let contraseñaVerificada = md5(this.state.check_password);
    let contraseña = this.state.password;

    if (contraseña.length >= 3) {
      if (contraseñaVerificada == contraseñaNueva) {
        let idusuario = this.state.response_signin.idusuario;
        let jsonContraseña = {
          idusuario: idusuario,
          password: contraseñaNueva,
        };

        this.updateContraseña(jsonContraseña).then((res) => {
          swal.fire({
            text: res,
            type: "success",
            icon: "success",
            timer: 2000,
          });
        });
      } else {
        NotificationManager.info(
          "La contraseña a verificar no coincide con la contraseña nueva"
        );
      }
    } else {
      NotificationManager.info(
        "La contraseña tiene que ser mayor o igual a 3 caracteres"
      );
    }
    // console.log("contraseña", md5(this.state.password));
  };

  handleMessageSend = (message, telefono) => {
    if (message !== "") {
      if (telefono !== "") {
        let json = {
          message: message,
          phone_number: "+502" + telefono,
        };
        this.sendMessage(json).then((res) => {
          if (res.code == "error") {
            NotificationManager.warning("No. de celular incorrecto");
            swal.fire({
              title: "mensaje no enviado ",
              text: res.code,
              type: "success",
              icon: "success",
              timer: 2000,
            });
          } else {
            // console.log("mensaje", res);
            swal.fire({
              title: "mensaje enviado ",
              text: res.code,
              type: "success",
              icon: "success",
              timer: 2000,
            });
          }
          this.setState({ show: !this.state.show });
        });
      } else {
        NotificationManager.warning(
          "El ejecutivo no tiene registrado el no. de celular"
        );
      }
    } else {
      NotificationManager.warning("El mensaje no puede ir vacio");
    }
  };

  handleChange(event) {
    const { name, value } = event.target;
    //("name", name, "value", value);
    this.setState({
      [name]: value,
    });
  }

  handleDateChange = (date) => {
    this.setState({
      fecha_nacimiento: date,
    });
    //console.log("fecha de nacimineto", this.state.fecha_nacimiento);
  };

  /*handleFormSubmit(value) {
    console.log("valuesssssss: ", this.state.nombre);
    value.preventDefault();
  }*/

  handleSubmit = async (event) => {
    event.preventDefault();
    let valido = true;
    if (this.state.nombre === "" || this.state.nombre === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Nombre"
      );
      valido = false;
    }

    if (this.state.apellido === "" || this.state.apellido === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Apellido"
      );

      valido = false;
    }

    if (this.state.telefonos === "" || this.state.telefonos === null) {
      NotificationManager.warning(
        "Este campo no puede ir vacio",
        "Campo Telefono"
      );

      valido = false;
    }

    if (this.state.ext === "" || this.state.ext === null) {
      NotificationManager.warning("Este campo no puede ir vacio", "Campo Ext.");

      valido = false;
    }

    if (valido) {
      //Enviarlo a la base de datos o a otro componente
      let jsonDatos = {
        idpersona: this.state.idpersona,
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        fecha_de_nacimiento: this.state.fecha_nacimiento,
        profesion: this.state.profesion,
        telefonos: this.state.telefonos,
        ext: this.state.ext,
        direccion: this.state.direccion,
        facebook: this.state.facebook,
        twitter: this.state.twitter,
        linkedin: this.state.linkedin,
        estado: this.state.estado,
        correo: this.state.correo,
        genero: this.state.genero,
      };
      // console.log("Se envian los datos " + JSON.stringify(jsonDatos));

      //let res = this.updateDatosPersonales(JSON.stringify(jsonDatos));

      this.updateDatosPersonales(jsonDatos).then((res) => {
        swal.fire({
          text: res,
          type: "success",
          icon: "success",
          timer: 2000,
        });
      });
    }
  };

  /*handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
  };*/

  handleSelect(key) {
    // console.log("key-->", key);
    if (key == "datos") {
      this.listDatosPersonales();
    }
  }

  render() {
    // console.log("datosss", this.state.fecha_nacimiento);
    // Get the <span> element that closes the modal
    /*let span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
   /* span.onclick = function () {
      modal.style.display = "none";
    };*/
    let { profileList, arrayAvatar, show, profile_by, password } = this.state;

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/dashboard/v2" },
            { name: "Perfil" },
          ]}
        ></Breadcrumb>

        <div className="card user-profile o-hidden mb-4">
          <div className="contenedor">
            {this.state.banderaPortada === false ? (
              <div
                className="header-cover mb-4"
                style={{
                  backgroundImage: "url(" + this.state.profileImgPortada + ")",
                }}
              ></div>
            ) : (
              <div
                className="header-cover mb-4"
                style={{
                  backgroundImage:
                    "url(" + URL_BUCKET + this.state.profileImgPortada + ")",
                }}
              ></div>
            )}
            <input
              type="file"
              accept="image/*"
              name="image-upload2"
              id="inputPortada"
              onChange={this.imageHandlerPortada}
            />

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>
                  Click para cambiar portada.
                </Tooltip>
              }
            >
              <Button
                htmlFor="inputPortada"
                id="btnCentrar"
                key={`info`}
                variant={`outline-info`}
                className="m-1 text-capitalize"
              >
                <label
                  id="myImgPortada"
                  htmlFor="inputPortada"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <strong> CAMBIAR MI PORTADA</strong>
                </label>
              </Button>
            </OverlayTrigger>
          </div>

          <div className="user-info">
            <input
              type="file"
              accept="image/*"
              name="image-upload"
              id="input"
              onChange={this.imageHandler}
            />
            <label id="myImg2" htmlFor="input">
              {this.state.banderaAvatar === false ? (
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-right`}>
                      Click para cambiar imagen.
                    </Tooltip>
                  }
                >
                  <img
                    id="myImg"
                    src={this.state.profileImg}
                    alt=""
                    htmlFor="input"
                  />
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-right`}>
                      Click para cambiar imagen.
                    </Tooltip>
                  }
                >
                  <img
                    id="myImg"
                    src={URL_BUCKET + this.state.profileImg}
                    alt=""
                    htmlFor="input"
                  />
                </OverlayTrigger>
              )}
            </label>

            <p className="m-0 text-24">
              {" "}
              {this.state.nombre + " " + this.state.apellido}{" "}
            </p>
            {this.state.profesion === null || this.state.profesion === "" ? (
              <p className="text-muted m-0">Vendedor</p>
            ) : (
              <p className="text-muted m-0">{this.state.profesion}</p>
            )}
          </div>
          <div className="card-body pt-4">
            <Tabs
              defaultActiveKey="datos"
              className="justify-content-center profile-nav mb-4"
            >
              {/* <Tab eventKey="Timeline" title="Timeline">
                <div
                  className="tab-pane fade active show"
                  id="timeline"
                  role="tabpanel"
                  aria-labelledby="timeline-tab"
                >
                  <ul className="timeline clearfix">
                    <li className="timeline-line"></li>
                    <li className="timeline-item">
                      <div className="timeline-badge">
                        <i className="badge-icon bg-primary text-white i-Cloud-Laptop"></i>
                      </div>
                      <div className="timeline-card card">
                        <div className="card-body">
                          <div className="mb-1">
                            <strong className="mr-1">Timothy Carlson</strong>
                            added a new photo
                            <p className="text-muted">3 hours ago</p>
                          </div>
                          <img
                            className="rounded mb-2"
                            src="/assets/images/photo-wide-1.jpg"
                            alt=""
                          />
                          <div className="mb-3">
                            <span className="mr-1">Like</span>
                            <span>Comment</span>
                          </div>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Write comment"
                              aria-label="comment"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                id="button-comment1"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <div className="timeline-badge">
                        <img
                          className="badge-img"
                          src="/assets/images/faces/1.jpg"
                          alt=""
                        />
                      </div>
                      <div className="timeline-card card">
                        <div className="card-body">
                          <div className="mb-1">
                            <strong className="mr-1">Timothy Carlson</strong>
                            updated his sattus
                            <p className="text-muted">16 hours ago</p>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Modi dicta beatae illo illum iusto iste
                            mollitia explicabo quam officia. Quas ullam,
                            quisquam architecto aspernatur enim iure debitis
                            dignissimos suscipit ipsa.
                          </p>
                          <div className="mb-3">
                            <span className="mr-1">Like</span>
                            <span>Comment</span>
                          </div>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Write comment"
                              aria-label="comment"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                id="button-comment2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="timeline clearfix">
                    <li className="timeline-line"></li>
                    <li className="timeline-group text-center">
                      <button className="btn btn-icon-text btn-primary">
                        <i className="i-Calendar-4"></i> 2018
                      </button>
                    </li>
                  </ul>
                  <ul className="timeline clearfix">
                    <li className="timeline-line"></li>
                    <li className="timeline-item">
                      <div className="timeline-badge">
                        <i className="badge-icon bg-danger text-white i-Love-User"></i>
                      </div>
                      <div className="timeline-card card">
                        <div className="card-body">
                          <div className="mb-1">
                            <strong className="mr-1">New followers</strong>
                            <p className="text-muted">2 days ago</p>
                          </div>
                          <p>
                            <Link to="/">Henry krick</Link> and 16 others
                            followed you
                          </p>
                          <div className="mb-3">
                            <span className="mr-1">Like</span>
                            <span>Comment</span>
                          </div>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Write comment"
                              aria-label="comment"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                id="button-comment3"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <div className="timeline-badge">
                        <i className="badge-icon bg-primary text-white i-Cloud-Laptop"></i>
                      </div>
                      <div className="timeline-card card">
                        <div className="card-body">
                          <div className="mb-1">
                            <strong className="mr-1">Timothy Carlson</strong>
                            added a new photo
                            <p className="text-muted">2 days ago</p>
                          </div>
                          <img
                            className="rounded mb-2"
                            src="/assets/images/photo-wide-2.jpg"
                            alt=""
                          />
                          <div className="mb-3">
                            <span className="mr-1">Like</span>
                            <span>Comment</span>
                          </div>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Write comment"
                              aria-label="comment"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                id="button-comment4"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="timeline clearfix">
                    <li className="timeline-line"></li>
                    <li className="timeline-group text-center">
                      <button className="btn btn-icon-text btn-warning">
                        <i className="i-Calendar-4"></i> Joined in 2013
                      </button>
                    </li>
                  </ul>
                </div>
              </Tab>*/}
              <Tab eventKey="datos" title="Datos Personales">
                <div className="col-md-12">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="card-title mb-3">
                        Información Personal
                      </div>

                      <form onSubmit={this.handleSubmit}>
                        <div className="row">
                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="nombre">Nombre(s)</label>
                            <input
                              name="nombre"
                              type="text"
                              className="form-control "
                              id="nombre"
                              onChange={this.handleChange}
                              value={this.state.nombre}
                              placeholder="Ingrese Nombre(s)"
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="apellido">Apellido(s)</label>
                            <input
                              name="apellido"
                              type="text"
                              className="form-control"
                              id="apellido"
                              onChange={this.handleChange}
                              value={this.state.apellido}
                              placeholder="Ingrese Apellido(s)"
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="correo">Correo Electronico</label>
                            <input
                              /*disabled="enabled"*/
                              name="correo"
                              type="text"
                              className="form-control "
                              id="correo"
                              onChange={this.handleChange}
                              value={this.state.correo}
                              placeholder="Ingrese Correo Electronico"
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="fecha">Fecha de Nacimiento</label>
                            {/* <DatePicker
                              className="form-control"
                              
                              selected={this.state.fecha_nacimiento}
                              onChange={this.handleDateChange}
                              
                              locale="es"
                            />*/}
                            <MuiPickersUtilsProvider
                              utils={DateFnsUtils}
                              locale={deLocale}
                            >
                              <Grid container justify="space-around">
                                <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  format="MM/dd/yyyy"
                                  value={this.state.fecha_nacimiento}
                                  onChange={this.handleDateChange}
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                />
                              </Grid>
                            </MuiPickersUtilsProvider>
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="profesion">Profesión</label>
                            <input
                              name="profesion"
                              type="text"
                              className="form-control "
                              id="profesion"
                              onChange={this.handleChange}
                              value={this.state.profesion}
                              placeholder="Ingrese Profesión"
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="telefonos">Celular</label>
                            <input
                              maxlength="8"
                              name="telefonos"
                              onChange={this.handleChange}
                              value={this.state.telefonos}
                              className="form-control "
                              id="telefonos"
                              placeholder="Ingrese No. Celular"
                              type="text"
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="ext">Ext.</label>
                            <input
                              name="ext"
                              type="text"
                              className="form-control "
                              id="ext"
                              onChange={this.handleChange}
                              value={this.state.ext}
                              placeholder="Ingrese ext."
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="direccion">Dirección</label>
                            <input
                              name="direccion"
                              onChange={this.handleChange}
                              value={this.state.direccion}
                              className="form-control "
                              id="direccion"
                              type="direccion"
                              placeholder="Ingrese dirección."
                            />
                          </div>
                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="genero">Genero</label>

                            <select
                              id="genero"
                              className="form-control"
                              name="genero"
                              value={this.state.genero}
                              onChange={this.handleChange}
                            >
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </select>
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="facebook">Facebook</label>
                            <input
                              name="facebook"
                              onChange={this.handleChange}
                              value={this.state.facebook}
                              className="form-control "
                              id="facebook"
                              type="text"
                              placeholder="Ingrese el link de su perfil de Facebook"
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="twitter">Twitter</label>
                            <input
                              name="twitter"
                              onChange={this.handleChange}
                              value={this.state.twitter}
                              className="form-control "
                              id="twitter"
                              type="text"
                              placeholder="Ingrese el link de su perfil de Twitter"
                            />
                          </div>

                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="linkedin">Linkedin</label>
                            <input
                              name="linkedin"
                              onChange={this.handleChange}
                              value={this.state.linkedin}
                              className="form-control "
                              id="linkedin"
                              type="text"
                              placeholder="Ingrese el link de su perfil de linkedin"
                            />
                          </div>
                          <div className="col-md-4 form-group mb-3">
                            <label htmlFor="estado">Estado</label>
                            <input
                              name="estado"
                              maxlength="45"
                              onChange={this.handleChange}
                              value={this.state.estado}
                              className="form-control "
                              id="estado"
                              type="text"
                              placeholder="Ingrese estado (45 caracteres max)"
                            />
                          </div>

                          <div className="col-md-12">
                            <br></br>
                            <br></br>
                            <Button type="submit" variant="primary">
                              ACTUALIZAR MI INFORMACIÓN
                            </Button>
                            {/* <button type="submit" className="btn btn-primary">
                              Actualizar mi informacion personal
                            </button>*/}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Friends" title="Contactos">
                <div className="row">
                  {profileList.map((profile, index) =>
                    profile.idusuario ===
                    this.state.response_signin.idusuario ? (
                      <div
                        style={{
                          display: "none",
                        }}
                      ></div>
                    ) : (
                      <div className="col-md-3">
                        <div className="card card-profile-1 mb-4">
                          <div className="card-body text-center">
                            <div className="avatar box-shadow-2 mb-3">
                              {profile.foto === null || profile.foto === "" ? (
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={
                                    URL_BUCKET +
                                    `nd/perfil/avatar/${profile.idusuario}/${profile.foto}`
                                  }
                                  alt=""
                                />
                              )}
                              )}
                            </div>
                            <h5 className="m-0">
                              {profile.nombre + " " + profile.apellido}
                            </h5>
                            {profile.profesion === "" ||
                            profile.profesion === null ? (
                              <p className="mt-0">vendedor</p>
                            ) : (
                              <p className="mt-0">{profile.profesion}</p>
                            )}

                            {profile.estado_p === "" ||
                            profile.estado_p === null ? (
                              <p>no hay publicación de estado</p>
                            ) : (
                              <p>{profile.estado_p}</p>
                            )}
                            <button
                              className="btn btn-primary btn-rounded"
                              onClick={() =>
                                this.toggleOpenDialog(
                                  profile.idusuario,
                                  profile.foto,
                                  profile.nombre,
                                  profile.apellido,
                                  profile.telefonos
                                )
                              }
                            >
                              Enviar mensaje
                            </button>

                            <div className="card-socials-simple mt-4">
                              {profile.ext === "" || profile.ext === null ? (
                                <span className=" px-1"></span>
                              ) : (
                                <span className=" px-1">
                                  {/* <i className="i-Telephone mr-1"></i>*/}
                                  <strong>ext: </strong>
                                  {profile.ext}
                                </span>
                              )}
                              {profile.telefonos === "" ||
                              profile.telefonos === null ? (
                                <span className=" px-1"></span>
                              ) : (
                                <span className=" px-1">
                                  {/* <i className="i-Telephone mr-2"></i>*/}
                                  <strong>cel: </strong>
                                  {profile.telefonos}
                                </span>
                              )}
                            </div>

                            <div className="card-socials-simple mt-4">
                              {profile.linkedin === "" ||
                              profile.linkedin === null ? (
                                <span></span>
                              ) : (
                                <span className="cursor-pointer px-1">
                                  <a href={profile.linkedin} target="_blank">
                                    <i className="i-Linkedin-2"></i>
                                  </a>
                                </span>
                              )}

                              {profile.facebook === "" ||
                              profile.facebook === null ? (
                                <span></span>
                              ) : (
                                <span className="cursor-pointer px-1">
                                  <a href={profile.facebook} target="_blank">
                                    <i className="i-Facebook-2"></i>
                                  </a>
                                </span>
                              )}
                              {profile.twitter === "" ||
                              profile.twitter === null ? (
                                <span></span>
                              ) : (
                                <span className="cursor-pointer px-1">
                                  <a href={profile.twitter} target="_blank">
                                    <i className="i-Twitter"></i>
                                  </a>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Tab>
              <Tab eventKey="Photos" title="Cambiar Contraseña">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <h4>CAMBIO DE CONTRASEÑA</h4>
                    <p>Verifica bien tu nueva contraseña</p>
                    <div className="card mb-5">
                      <div className="card-body">
                        <div className="row row-xs">
                          <div className="col-md-5">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              placeholder="Nueva contraseña"
                              value={this.state.password}
                              onChange={this.handleChangePassoword}
                            />
                            <PasswordStrengthBar
                              minLength="4"
                              shortScoreWord=""
                              scoreWords={[
                                "muy corto",
                                "corto",
                                "débil",
                                "bien",
                                "fuerte",
                              ]}
                              password={this.state.password}
                            />
                          </div>
                          <div className="col-md-5 mt-3 mt-md-0">
                            <input
                              type="password"
                              name="check_password"
                              className="form-control"
                              placeholder="Verificar contraseña"
                              value={this.state.check_password}
                              onChange={this.handleChangePassoword}
                            />
                          </div>
                          <div className="col-md-2 mt-3 mt-md-0">
                            <button
                              className="btn btn-primary btn-block"
                              onClick={() => this.updatePassword()}
                            >
                              Aceptar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <NotificationContainer />
        <ProfileEventDialog
          open={show}
          closeDialog={this.toggleEventDialog}
          profile={profile_by}
          handleMessageSend={this.handleMessageSend}
        ></ProfileEventDialog>
      </div>
    );
  }
}

export default Profiles;
