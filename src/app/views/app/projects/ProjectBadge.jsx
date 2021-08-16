import React from "react";
import { format } from "date-fns";

const ProjectBadge = (props) => {
  return (
    <div className="card card-profile-1 mb-12">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="m-3 text-center">
              <strong>{props.project}</strong>
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="card-body text-center">
            <div className="row">
              <div className="col-4">
                <p className="text-muted">Fecha Inicio: </p>
              </div>
              <div className="col-8">
                <p className="mt-0">
                  {format(
                    new Date(
                      props.date_initial ? props.date_initial : new Date()
                    ).getTime(),
                    "dd MMM, yyyy"
                  )}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p className="text-muted">Descripción: </p>
              </div>
              <div className="col-8">
                <p className="mt-0">{props.description || "Sin descripción"}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p className="text-muted">Encargado: </p>
              </div>
              <div className="col-8">
                <p className="m-0">{props.manager || "Sin encargado"}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p className="text-muted">Categoría: </p>
              </div>
              <div className="col-8">
                <p className="m-0">{props.category || "Sin categoría"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card-body text-center">
            <div className="row">
              <div className="col-5">
                <p className="text-muted">Fecha Finalización: </p>
              </div>
              <div className="col-7">
                <p className="mt-0">
                  {format(
                    new Date(
                      props.date_final ? props.date_final : new Date()
                    ).getTime(),
                    "dd MMM, yyyy"
                  )}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="text-muted">Estatus: </p>
              </div>
              <div className="col-7">
                <p className="mt-0">{props.status}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="text-muted">Tipo de Proyecto: </p>
              </div>
              <div className="col-7">
                <p className="mt-0">{props.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBadge;
