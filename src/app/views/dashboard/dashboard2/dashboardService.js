import authHeader from "../../../../app/services/auth-header";

const API_URL =
  "https://88xin9j4p9.execute-api.us-east-1.amazonaws.com/dev/api/";
const config = {
  headers: authHeader(),
};

class DashboardService {
  // ventas mes (grafica)
  getSalesExecute(idusuario) {
    return fetch(API_URL + `sales-executive/${idusuario}`, config);
  }

  // ventas del día (grafica)

  getSalesExecutiveDay(idusuario) {
    return fetch(API_URL + `sales-executive-day/${idusuario}`, config);
  }

  // nuevos prospectos
  getNewLeadsExecutive(idusuario) {
    return fetch(API_URL + `new-leads-executive/${idusuario}`, config);
  }

  // órdenes del día
  getOrdersDayExecutive(idusuario) {
    return fetch(API_URL + `orders-today-executive/${idusuario}`, config);
  }

  // facturas del mes ejecutivo
  getInvoicesExecutive(idusuario) {
    return fetch(API_URL + `invoice-executive/${idusuario}`, config);
  }

  // ADMINISTRADOR

  // ventas mes (grafica)
  getSalesMonth() {
    return fetch(API_URL + "sales-month", config);
  }

  // ventas del día
  getSalesDay() {
    return fetch(API_URL + "sales-day", config);
  }

  // prospectos nuevos
  getNewLeads() {
    return fetch(API_URL + "new-leads", config);
  }

  // órdenes del día
  getOrdersDay() {
    return fetch(API_URL + "orders-today", config);
  }
  
  // facturas del mes
  getInvoices() {
    return fetch(API_URL + `invoice-admin`, config);
  }
}

export default new DashboardService();
