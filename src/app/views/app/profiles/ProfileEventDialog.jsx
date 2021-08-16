import React, { useState } from "react";
import "@date-io/date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import AuthService from "../../../services/auth.service";
import {
  Modal,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import { CirclePicker } from "react-color";
import * as yup from "yup";
import Select, { components } from "react-select";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
const URL_BUCKET =
  "https://s3.amazonaws.com/nd.s3.rep.documentos-electronicos/public/";
const ProfileEventDialog = ({ open, closeDialog, profile,handleMessageSend}) => {

    let [message, setMessage] = React.useState("");
 
   // console.log("telefon",profile.telefono)
    /*const sendMessageOnEnter = event => {
        console.log("entraaaaaaaa",profile.telefono)
      if (event.key === "Enter" && !event.shiftKey) {
        message = message.trim();
        if (message !== "") handleMessageSend(message,profile.telefono);
        setMessage("");
      }
    };*/
//  console.log("haber entra aca ---->", profile);
  return (
    <Modal show={open} onHide={closeDialog} centered={true}>
    
        
      <Modal.Body>
        <div className="chat-content-wrap sidebar-content">
          <div className="d-flex pl-3 pr-3 pt-2 pb-2 o-hidden box-shadow-1 chat-topbar">
            <span className="link-icon d-md-none">
              <i className="icon-regular i-Right ml-0 mr-3"></i>
            </span>

            <div className="d-flex align-items-center">
            

              {profile.avatar === null || profile.avatar === "" ? (
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt=""
                className="avatar-sm rounded-circle mr-2"
                />
              ) : (
                <img
                  src={
                    URL_BUCKET +
                    `nd/perfil/avatar/${profile.idusuario}/${profile.avatar}`
                  }
                  alt=""
                className="avatar-sm rounded-circle mr-2"
                />
              )}
              <p className="m-0 text-title text-16 flex-grow-1">
                {profile.nombre + " " + profile.apellido}
              </p>
            </div>
          </div>

          <div className="pl-3 pr-3 pt-3 pb-3 box-shadow-1 chat-input-area">
            <form className="inputForm">
              <div className="form-group">
                <textarea
                  className="form-control form-control-rounded"
                  placeholder="Escribe el mensaje de texto"
                  name="mensaje"
                  id="mensaje"
                  cols="30"
                  onChange={e => setMessage(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="d-flex">
                <div className="flex-grow-1"></div>
                <Button
                onClick={() => {
                    handleMessageSend(message,profile.telefono);
               
                  }}
                  className="btn btn-icon btn-rounded mr-2"
                  variant="primary"
                >
                  <i className="i-Paper-Plane"></i>
                </Button>
                <Button
                  className="btn btn-icon btn-rounded mr-2"
                  variant="danger"
                  onClick={closeDialog}
                >
                  <i className="i-Close"></i>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default ProfileEventDialog;
