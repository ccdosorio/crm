import React from "react";
import { Modal, FormControl, FormLabel, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const ContactEditor2 = ({
  show,
  initialValues,
  toggleEditorDialog,
  handleFormSubmit,
}) => {
  return (
    <Modal show={show} onHide={toggleEditorDialog} centered>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {initialValues ? "Editar" : "Nuevo"} Contacto
        </h5>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => toggleEditorDialog(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Formik
          initialValues={
            initialValues
              ? initialValues
              : {
                  name: "",
                  email: "",
                  phone: "",
                  mobile: "",
                  type: "1",
                }
          }
          validationSchema={contactSchema}
          enableReinitialize={true}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="position-relative">
              <Form.Row className="mb-3">
                <FormLabel column sm={2}>
                  Nombre
                </FormLabel>
                <FormControl
                  className="col-sm-10"
                  placeholder="Nombre"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.name && touched.name}
                  value={values.name}
                ></FormControl>
              </Form.Row>
              <Form.Row className="mb-3">
                <FormLabel column sm={2}>
                  Correo
                </FormLabel>
                <FormControl
                  className="col-sm-10"
                  placeholder="Correo Electrónico"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.email && touched.email}
                  value={values.email}
                ></FormControl>
              </Form.Row>
              <Form.Row className="mb-3">
                <FormLabel column sm={2}>
                  Teléfono
                </FormLabel>
                <FormControl
                  className="col-sm-10"
                  placeholder="Teléfono"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.phone && touched.phone}
                  value={values.phone}
                ></FormControl>
              </Form.Row>
              <Form.Row className="mb-3">
                <FormLabel column sm={2}>
                  Celular
                </FormLabel>
                <FormControl
                  className="col-sm-10"
                  placeholder="Celular"
                  name="mobile"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobile}
                ></FormControl>
              </Form.Row>
              <fieldset className="form-group">
                <div className="row">
                  <div className="col-form-label col-sm-2 pt-0">Tipo</div>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        value="1"
                        onChange={handleChange}
                        checked={"1".match(values.type)}
                        id="facturacion_electronica"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="facturacion_electronica"
                      >
                        Facturación Electrónica
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        value="2"
                        onChange={handleChange}
                        checked={"2".match(values.type)}
                        id="comercial"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="comercial"
                      >
                        Comercial
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        value="3"
                        onChange={handleChange}
                        checked={"3".match(values.type)}
                        id="credito"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="manager"
                      >
                        Crédito
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="form-group row">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const contactSchema = yup.object().shape({
  name: yup.string().required("es requerido"),
  email: yup.string().email().required("es requerido"),
  phone: yup.string().required("es requerido"),
});

export default ContactEditor2;
