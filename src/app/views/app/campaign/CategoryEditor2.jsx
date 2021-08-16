import React from "react";
import { Modal, FormLabel, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Select from "react-select";

const CategoryEditor2 = ({
  show,
  initialValues,
  toggleEditorDialog,
  handleFormSubmit,
  valuesFilter,
  handleIdCategory,
  valuesCategory,
}) => {
  return (
    <Modal show={show} onHide={toggleEditorDialog} centered>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {initialValues ? "Editar" : "Nueva"} Categoría
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
                  type: 1,
                }
          }
          validationSchema={categorySchema}
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
                  Categoría
                </FormLabel>
                <Select
                  className="basic-single col-sm-10"
                  classNamePrefix="select"
                  name="type"
                  options={valuesFilter}
                  onChange={handleIdCategory}
                  defaultValue={valuesCategory}
                />
              </Form.Row>
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

const categorySchema = yup.object().shape({
  //   name: yup.string().required("es requerido"),
});

export default CategoryEditor2;
