import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

class ProspectsListItem extends Component {
  render() {
    return (
      <div className="card card-profile-1 mb-4">
        <div className="card-body text-center">
          <h5 className="m-0">{this.props.prospect.nombre || "Nombre"}</h5>
          <p className="mt-0">{this.props.prospect.correo || "Sin Correo"}</p>
          <p>
            <strong>Tel: </strong>
            {this.props.prospect.telefono || "00000000"}
          </p>
          <p>
            <strong>Nit: </strong>
            {this.props.prospect.nit || "000000-0"}
          </p>
          <p className="text-muted mt-2 mb-0 text-capitalize">
            {this.props.prospect.nombre_comercial || "Sin nombre comercial"}
          </p>
          <br />
          <Link to={`/prospects/${this.props.prospect.idcliente}/edit`}>
            <button className="btn btn-primary btn-rounded">Ver</button>
          </Link>
        </div>
      </div>
    );
  }
}

class ProspectsList extends Component {
  render() {
    return (
      <div>
        <div className="row px-4 mt-3">
          <div className="col-sm-12 col-md-6 mb-2">
            <div className="d-flex align-items-center">
              <span className="mr-1">Show</span>
              <div className="mr-1">
                <select
                  className="form-control"
                  onChange={this.props.onChangeShowProspects}
                  value={this.props.rowsPerPage}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <span>entries</span>
            </div>
          </div>
        </div>
        <div className="row">
          {this.props.prospects.map((prospect) => {
            return (
              <div key={prospect.idcliente} className="col-md-4">
                <ProspectsListItem prospect={prospect} />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-end mr-lg-6">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(
              this.props.number_records / this.props.rowsPerPage
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={this.props.onChangePageClick}
            containerClassName={"pagination pagination-lg"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default ProspectsList;
