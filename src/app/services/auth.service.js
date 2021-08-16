import axios from "axios";

const API_URL =
  "https://88xin9j4p9.execute-api.us-east-1.amazonaws.com/dev/api/";

let banderaTour = localStorage.getItem("bandera");
let banderaTourCita = localStorage.getItem("banderaCita");
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));

          localStorage.setItem("bandera", "false");
          let bandera = localStorage.getItem("bandera");

          if (bandera == "false" && banderaTour === null) {
            localStorage.setItem("bandera", "false");
          } else if (bandera == "false" && banderaTour == "true") {
            localStorage.setItem("bandera", "true");
          }

          localStorage.setItem("banderaCita", "false");
          let banderaCita = localStorage.getItem("banderaCita");
 
          
          if (banderaCita == "false" && banderaTourCita === null) {
            localStorage.setItem("banderaCita", "false");
          } else if (banderaCita == "false" && banderaTourCita == "true") {
            localStorage.setItem("banderaCita", "true");
          }
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
