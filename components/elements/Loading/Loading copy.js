import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap";
//import "./Loading.css";

function Loading(props) {
    return (
        <div className="divPadre" >
            <div className="divHijo" >
                <br />
                <h1>AQUI </h1>
            </div>
        </div>
    );
}

//<Spinner color="primary" className="spinnerReactstrap" />
//<i className="selecticonoestadoproducto fa fa-cog fa-spin"></i>
export default Loading;