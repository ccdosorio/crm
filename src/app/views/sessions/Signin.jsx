import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import SweetAlert from "sweetalert2-react";
import { AsyncStorage } from "AsyncStorage";

import AuthService from "../../services/auth.service";

const SigninSchema = yup.object().shape({
  username: yup.string().required("Se requiere nombre de usuario"),
  password: yup
    .string()
    .min(3, "La contraseña debe tener 3 caracteres")
    .required("Se requiere contraseña"),
});

const key = "response_signin";

class Signin extends Component {
  state = {
    show: false,
    msg: "",
    username: "",
    password: "",
    result: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (value) => {
    AuthService.login(value.username, value.password).then(
      (res) => {
        if (res.mensaje) {
          this.setState({ show: true, msg: res.mensaje });
        } else {
          this.props.history.push({
            pathname: "/dashboard/v2",
          });
          window.location.reload();

          AsyncStorage.setItem(key, JSON.stringify(res))
            .then(() => console.log("efectiva"))
            .catch((error) => console.log("err: ", error));
        }

        //console.log(res)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <div
        className="auth-layout-wrap"
        style={{
          backgroundImage: "url(/assets/images/fondo1.jpg)",
        }}
      >
        {this.state.show && (
          <SweetAlert
            show={true}
            title="¡Error!"
            type="error"
            text={this.state.msg}
            confirmButtonText="OK"
            color="#1565c0"
            onConfirm={() => this.setState({ show: false })}
          />
        )}
        <div className="auth-content">
          <div className="card o-hidden">
            <div className="row">
              <div className="col-md-6">
                <div className="p-4">
                  <div className="auth-logo text-center mb-4">
                    <img src="/assets/images/ndd-logo.png" alt="" />
                  </div>
                  <h1 className="mb-3 text-18">Iniciar sesión</h1>
                  <Formik
                    initialValues={this.state}
                    validationSchema={SigninSchema}
                    onSubmit={this.handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="email">Usuario</label>
                          <input
                            className="form-control form-control-rounded position-relative"
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={values.username}
                          />
                          {errors.username && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Contraseña</label>
                          <input
                            className="form-control form-control-rounded"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                          />
                          {errors.password && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <button
                          className="btn btn-rounded btn-info btn-block mt-2"
                          type="submit"
                        >
                          Ingresar
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
              <div
                className="col-md-6 text-center "
                style={{
                  backgroundSize: "cover",
                  backgroundImage: "url(/assets/images/fondo3.jpg)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
