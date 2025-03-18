import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap";
//import "./Loading.css";

function LoadingGrabarProducto(props) {
    return (
        <div className="divPadre" >
            <div className="divHijo" >
                <br />
                <i className="spinnergrabarproducto fa fa-cog fa-spin"></i>
            </div>
        </div>
    );
}

//<Spinner color="primary" className="spinnerReactstrap" />

export default LoadingGrabarProducto;