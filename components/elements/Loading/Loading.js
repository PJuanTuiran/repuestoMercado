import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap";
//import "./Loading.css";

function Loading(props) {
    return (
        <div className="divPadre" >
            <div className="divHijo" >
                <br />
                <i className="spinnerpinon fa fa-cog fa-spin"></i>
            </div>
        </div>
    );
}

//<Spinner color="primary" className="spinnerReactstrap" />

export default Loading;