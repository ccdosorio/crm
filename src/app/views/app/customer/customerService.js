import authHeader from "../../../services/auth-header";

const API_URL =
  "https://88xin9j4p9.execute-api.us-east-1.amazonaws.com/dev/api/";
const config = {
  headers: authHeader(),
};

class CustomerService {
  getAllCustomers(idusuario, no_pagina, paginas) {
    return fetch(
      API_URL + `customers/all/${idusuario}/${no_pagina}/${paginas}`,
      config
    );
  }

  getById(id) {
    return fetch(API_URL + `customer/${id}`, config);
  }

  addNewCustomer(requestOptions) {
    return fetch(API_URL + "customer-post", requestOptions);
  }

  getQuantityClients(idusuario) {
    return fetch(API_URL + `clients-count/${idusuario}`, config);
  }
  // Llamadas para el administrador

  getAll(no_pagina, paginas) {
    return fetch(
      API_URL + `customers-manager/all/${no_pagina}/${paginas}`,
      config
    );
  }

  getDataFilters() {
    return fetch(API_URL + "data-customer/", config);
  }

  getQuantityCustomer() {
    return fetch(API_URL + "customer-count/");
  }

  // Llamada a clientes relacionados por cliente: param idcliente

  getCustomerRelationship(idcliente) {
    return fetch(API_URL + `customers-r/all/${idcliente}`, config);
  }

  // Llamadas a Categorías por cliente: param idcliente
  getCategories(idcliente, no_pagina, paginas) {
    return fetch(
      API_URL + `categories-brands/${idcliente}/${no_pagina}/${paginas}`,
      config
    );
  }

  getQuantityCategories(idcliente) {
    return fetch(API_URL + `categories-count/${idcliente}`, config);
  }

  getDataCategory() {
    return fetch(API_URL + "categories/all/", config);
  }

  addCategory(requestOptions) {
    return fetch(API_URL + "category-post", requestOptions);
  }

  updateCategory(requestOptions) {
    return fetch(API_URL + "category-put", requestOptions);
  }

  deleteCategory(requestOptions) {
    return fetch(API_URL + "category-delete", requestOptions);
  }

  getActivityCliente(idcliente,idusuario,no_pagina, paginas) {
    return fetch(API_URL + `customer-activity/${idcliente}/${idusuario}/${no_pagina}/${paginas}`,config);
  }

  getAllActivityCliente(idusuario) {
    return fetch(API_URL + `all-customer-activity/${idusuario}`,config);
  }

}

export default new CustomerService();
