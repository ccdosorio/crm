import React, { Component } from "react";
import { Storage } from "aws-amplify";

import { Breadcrumb, SimpleCard } from "@gull";
import { Button, Card, Row, Col, ProgressBar } from "react-bootstrap";

import Http from "../../../libs/Https";

class ProjectUploadS3 extends Component {
  state = {
    dragClass: "",
    files: [],
    files_content: [],
    statusList: [],
    queProgress: 0,
  };

  handleFileSelect = async (event) => {
    let files = event.target.files;
    let list = [];
    let list2 = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
        progress: 0,
      });
      list2.push(iterator);
    }

    await this.setState({
      files: [...list],
      file_event: list2,
    });
  };

  handleDragOver = (event) => {
    event.preventDefault();
    this.setState({ dragClass: "drag-shadow" });
  };

  handleDrop = (event) => {
    event.preventDefault();
    event.persist();

    let files = event.dataTransfer.files;
    let list = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
        progress: 0,
      });
    }

    this.setState({
      dragClass: "",
      files: [...list],
    });

    return false;
  };

  handleDragStart = (event) => {
    this.setState({ dragClass: "drag-shadow" });
  };

  handleSingleRemove = (index) => {
    let files = [...this.state.files];
    let file = this.state.files[index];

    files[index] = { ...file, progress: 0 };
    files.splice(index, 1);
    this.setState({
      files: [...files],
      queProgress: 100 - 100 / this.state.files.length,
    });
  };

  handleAllRemove = () => {
    this.setState({ files: [], queProgress: 0 });
  };

  uploadSingleFile = (index) => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: true, error: false, progress: 100 };

    let binder;
    if (this.state.files[index].file.type === "application/pdf")
      binder = "pdfs";
    else binder = "images";
    let project = this.props.match.params.id;
    const file_event = this.state.files[index].file;
    Storage.put(
      `nd/proyectos/${project}/${binder}/${file_event.name}`,
      file_event,
      {
        contentType: file_event.type,
      }
    )
      .then((res) => {
        if (res) {
          console.log("Succesfull: " + JSON.stringify(res));
          this.setState({
            files: [...allFiles],
          });
          let name_file = file_event.name.split(".");
          let project = {
            idproject: this.props.match.params.id,
            name: name_file[0],
            path: res.key,
            type: file_event.type,
          };
          this.saveDocumentDB(project);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  uploadAllFile = () => {
    let allFiles = [];

    this.state.files.map((item) => {
      allFiles.push({
        ...item,
        uploading: true,
        error: false,
        progress: 100,
      });

      return item;
    });

    let binder, project;
    for (let index = 0; index < this.state.files.length; index++) {
      if (this.state.files[index].file.type === "application/pdf")
        binder = "pdfs";
      else binder = "images";
      project = this.props.match.params.id;
      const file_event = this.state.files[index].file;
      Storage.put(
        `nd/proyectos/${project}/${binder}/${file_event.name}`,
        file_event,
        {
          contentType: this.state.files[index].file.type,
        }
      )
        .then((res) => {
          if (res) {
            if (res) {
              console.log("Succesfull" + JSON.stringify(res));
              this.setState({
                files: [...allFiles],
                queProgress: 100,
              });
              let name_file = file_event.name.split(".");
              let project = {
                idproject: this.props.match.params.id,
                name: name_file[0],
                path: res.key,
                type: file_event.type,
              };
              this.saveDocumentDB(project);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleSingleCancel = (index) => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: false, error: true, progress: 0 };

    let binder;
    if (this.state.files[index].file.type === "application/pdf")
      binder = "pdfs";
    else binder = "images";
    let project = this.props.match.params.id;
    const file_event = this.state.files[index].file;
    Storage.remove(`nd/campanias/${project}/${binder}/${file_event.name}`)
      .then((res) => {
        if (res) {
          this.setState({
            files: [...allFiles],
            queProgress: 0,
          });
          let name_file = file_event.name.split(".");
          let project = {
            name: name_file[0],
            idproject: this.props.match.params.id,
          };
          this.deleteDocumentDB(project);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCancelAll = () => {
    let allFiles = [];

    this.state.files.map((item) => {
      allFiles.push({
        ...item,
        uploading: false,
        error: true,
        progress: 0,
      });

      return item;
    });

    for (let index = 0; index < this.state.files.length; index++) {
      let binder;
      if (this.state.files[index].file.type === "application/pdf")
        binder = "pdfs";
      else binder = "images";
      let project = this.props.match.params.id;
      const file_event = this.state.files[index].file;
      Storage.remove(`nd/proyectos/${project}/${binder}/${file_event.name}`)
        .then((res) => {
          if (res) {
            this.setState({
              files: [...allFiles],
              queProgress: 0,
            });
            let name_file = file_event.name.split(".");
            let project = {
              name: name_file[0],
              idproject: this.props.match.params.id,
            };
            console.log(project);
            this.deleteDocumentDB(project);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  saveDocumentDB = async (project) => {
    await Http.post("project/document-post", project);
  };

  deleteDocumentDB = async (project) => {
    await Http.post("project/document-delete", project);
  };

  render() {
    let { dragClass, files, queProgress } = this.state;
    let isEmpty = files.length === 0;
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: `/project/${this.props.match.params.id}/edit`,
            },
            { name: "Registrar Proyecto" },
          ]}
        ></Breadcrumb>
        <SimpleCard title="Subir Archivo">
          <div className="d-flex flex-wrap mb-4">
            <label htmlFor="upload-multiple-file">
              <Button className="btn-rounded" as="span">
                <div className="flex flex-middle">
                  <i className="i-Share-on-Cloud "> </i>
                  <span>Selecciona tu archivo</span>
                </div>
              </Button>
            </label>
            <input
              type="file"
              className="d-none"
              onChange={this.handleFileSelect}
              id="upload-multiple-file"
              multiple
            />
          </div>

          <div
            className={`${dragClass} dropzone mb-4 d-flex justify-content-center align-items-center`}
            onDragEnter={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
          >
            {isEmpty ? (
              <span>Suelta tus archivos aquí</span>
            ) : (
              <h5 className="m-0">
                {files.length} Archivo{files.length > 1 ? "s" : ""} seleccionado
                {files.length > 1 ? "s" : ""}...
              </h5>
            )}
          </div>

          <Card className="mb-4">
            <Row className="align-items-center p-3">
              <Col lg={4} md={4}>
                Nombre
              </Col>
              <Col lg={1} md={1}>
                Tamaño
              </Col>
              <Col lg={2} md={2}>
                Progreso
              </Col>
              <Col lg={1} md={1}>
                Estado
              </Col>
              <Col lg={4} md={4}>
                Acciones
              </Col>
            </Row>
            <hr className="mt-0 mb-3" />

            {isEmpty && (
              <p className="p-3 py-0">No hay archivos seleccionados</p>
            )}

            {files.map((item, index) => {
              let { file, uploading, error, progress } = item;
              return (
                <Row className="align-items-center px-3" key={file.name}>
                  <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
                    {file.name}
                  </Col>
                  <Col lg={1} md={1} sm={12} xs={12} className="mb-3">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </Col>
                  <Col lg={2} md={2} sm={12} xs={12} className="mb-3">
                    <ProgressBar
                      now={progress}
                      variant="success"
                      className="progress-thin"
                    ></ProgressBar>
                  </Col>
                  <Col lg={1} md={1} sm={12} xs={12} className="mb-3">
                    {error && (
                      <i className="i-Information text-danger text-18"> </i>
                    )}
                  </Col>
                  <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
                    <div className="d-flex">
                      <Button
                        disabled={uploading}
                        onClick={() => this.uploadSingleFile(index)}
                      >
                        Subir
                      </Button>
                      <Button
                        className="mx-8"
                        variant="warning"
                        disabled={!uploading}
                        onClick={() => this.handleSingleCancel(index)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => this.handleSingleRemove(index)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </Card>

          <div>
            <p className="m-0">Proceso de la cola:</p>
            <div className="py-3">
              <ProgressBar
                now={queProgress}
                variant="success"
                className="progress-thin"
              ></ProgressBar>
            </div>
            <div className="flex">
              <Button disabled={isEmpty} onClick={this.uploadAllFile}>
                Subir todos
              </Button>
              <Button
                className="mx-8"
                variant="warning"
                disabled={isEmpty}
                onClick={this.handleCancelAll}
              >
                Cancelar todo
              </Button>
              {!isEmpty && (
                <Button variant="danger" onClick={this.handleAllRemove}>
                  Eliminar todos
                </Button>
              )}
            </div>
          </div>
        </SimpleCard>
      </div>
    );
  }
}

export default ProjectUploadS3;
