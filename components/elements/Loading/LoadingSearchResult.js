import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap";
//import "./Loading.css";

function LoadingSearchResult(props) {
    return (
        <div className="divPadre" >
            <div className="divHijo" >
                <br />
                <i className="spinnerpinonsearchresult fa fa-cog fa-spin"></i>
            </div>
        </div>
    );
}

//<Spinner color="primary" className="spinnerReactstrap" />

export default LoadingSearchResult;