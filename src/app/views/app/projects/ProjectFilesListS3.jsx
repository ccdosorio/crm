import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Storage } from "aws-amplify";

import { Tab, Tabs } from "react-bootstrap";
import SimpleCard from "@gull/components/cards/SimpleCard";

const URL_BUCKET =
  "https://s3.amazonaws.com/nd.s3.rep.documentos-electronicos/public/";
class ProjectFilesListS3 extends Component {
  state = {
    images: [],
    files: [],
    hasImages: true,
    hasFiles: true,
  };
  listImages = () => {
    let project = this.props.match.params.idproject;
    Storage.list(`nd/proyectos/${project}/images/`)
      .then((res) => {
        if (res.length > 0) {
          let allData = [];
          for (let index = 0; index < res.length; index++) {
            let array_file = res[index].key.split(".");
            let name_file = array_file[0].toString().split("/");
            allData.push({ key: res[index].key, name: name_file[4] });
          }
          this.setState({ images: allData });
        } else {
          this.setState({ hasImages: false });
        }
      })
      .catch((err) => console.log(err));
  };

  listFiles = () => {
    let project = this.props.match.params.idproject;
    Storage.list(`nd/proyectos/${project}/pdfs/`)
      .then((res) => {
        if (res.length > 0) {
          let allData = [];
          for (let index = 0; index < res.length; index++) {
            let array_file = res[index].key.split(".");
            let name_file = array_file[0].toString().split("/");
            allData.push({ key: res[index].key, name: name_file[4] });
          }
          this.setState({ files: allData });
        } else {
          this.setState({ hasFiles: false });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.listImages();
    this.listFiles();
  }
  render() {
    let { hasImages, hasFiles, images, files } = this.state;
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            {
              name: "Regresar",
              path: `/project/${this.props.match.params.idproject}/edit`,
            },
            { name: "Listado de Archivos" },
          ]}
        />
        <SimpleCard title="Archivos">
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Imágenes">
              {images.length < 1 && hasImages ? (
                <div className="spinner-bubble spinner-bubble-primary m-5"></div>
              ) : null}

              {images.length < 1 && hasImages === false ? (
                <span role="img" className="text-muted" aria-label="sad">
                  ¡Esta campaña no tiene imágenes! 😟
                </span>
              ) : null}
              <div className="row">
                {this.state.images.map((image, index) => {
                  return (
                    <div key={index} className="col-md-4">
                      <ListItemImages image={image} />
                    </div>
                  );
                })}
              </div>
            </Tab>
            <Tab eventKey="profile" title="PDF">
              {files.length < 1 && hasFiles ? (
                <div className="spinner-bubble spinner-bubble-primary m-5"></div>
              ) : null}

              {files.length < 1 && hasFiles === false ? (
                <span role="img" className="text-muted" aria-label="sad">
                  ¡Esta campaña no tiene pdfs! 😟
                </span>
              ) : null}
              <div className="row">
                {this.state.files.map((file, index) => {
                  return (
                    <div key={index} className="col-md-4">
                      <ListItemFiles file={file} />
                    </div>
                  );
                })}
              </div>
            </Tab>
          </Tabs>
        </SimpleCard>
      </div>
    );
  }
}

export default ProjectFilesListS3;

class ListItemImages extends Component {
  render() {
    return (
      <div className="card bg-dark text-white o-hidden mb-4">
        <img className="card-img" src={URL_BUCKET + this.props.image.key} />
        <div className="card-img-overlay">
          <div className="text-center pt-4">
            <h5 className="card-title mb-2 text-white text-capitalize text-capitalize">
              {this.props.image.name}
            </h5>
            <div className="separator border-top mb-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

class ListItemFiles extends Component {
  render() {
    return (
      <SimpleCard title={this.props.file.name}>
        <img className="card-img" src="/assets/images/pdf-icon.png" />
        {/* <iframe
          className="d-block w-100 rounded"
          src={URL_BUCKET + this.props.file.key}
          alt="Second slide"
        /> */}
      </SimpleCard>
    );
  }
}
