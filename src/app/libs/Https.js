import authHeader from "../../../src/app/services/auth-header";
import AuthService from "../services/auth.service";

const API_URL =
  "https://88xin9j4p9.execute-api.us-east-1.amazonaws.com/dev/api/";

const API_URL_SMS = "https://3q43xcqrt1.execute-api.us-east-1.amazonaws.com/";

const config = {
  headers: authHeader(),
};

const user = AuthService.getCurrentUser();

class Http {
  get = async (url) => {
    try {
      let req = await fetch(API_URL + url, config);
      let json = await req.json();

      return json;
    } catch (err) {
      console.log("http get method err", err);

      throw Error(err);
    }
  };

  post = async (url, form) => {
    try {
      let req = await fetch(API_URL + url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authorization: user.token,
        },
        body: JSON.stringify(form),
        redirect: "follow",
        referrer: "no-referrer",
      });

      let json = await req.json();

      return json;
    } catch (err) {
      console.log("http post method err", err);

      throw Error(err);
    }
  };

  postSMS = async (url, form) => {
    try {
      let req = await fetch(API_URL_SMS + url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify(form),
        redirect: "follow",
        referrer: "no-referrer",
      });

      let json = await req.json();

      return json;
    } catch (err) {
      console.log("http post method err", err);

      throw Error(err);
    }
  };
}

export default new Http();
