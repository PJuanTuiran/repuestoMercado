import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../store/editdata/action";

let anosselect = ";";

const selectedvehicle = (props) => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [anosSeleccionado, setAnosSeleccionado] = useState([]);
    const [datSelSearch, setDatSelSearch] = useState([]);
    const [datSearchInteractive, setDatSearchInteractive] = useState([]);
    const [longitudDataVeh, setLongitudDataVeh] = useState(0);

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    let dataselectsearch = [];
    dataselectsearch = useSelector(
        (state) => state.dataselectsearch.dataselectsearch
    );

    let datasearchinteractive = [];
    datasearchinteractive = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const regresarAlBuscador = () => {
        let editdata = {
            editar: true,
        };
        dispatch(getEditData(editdata));
        localStorage.setItem("editdata", JSON.stringify(true));
        router.push("/searchinteractive/searchinteractive");
        //location.reload();
    };

    useEffect(() => {
        let long = 0;
        //console.log("SEACRH : ", datasearchinteractive);
        if (datasearchinteractive.length == 0) {
            let data = JSON.parse(
                localStorage.getItem("datasearchinteractive")
            );
            setDatSearchInteractive(data);
        } else setDatSearchInteractive(datasearchinteractive);

        if (dataselectsearch.length == 0) {
            let dat = JSON.parse(localStorage.getItem("dataselectsearch"));
            setDatSelSearch(dat);
        } else setDatSelSearch(dataselectsearch);

        if (
            datSearchInteractive.length > 0 ||
            parseInt(datSearchInteractive.idvehiculo) > 0
        ) {
            long = datSearchInteractive.codigoano.length;
            if (long > 0) {
                long = datSearchInteractive.codigoano.length;
                //console.log("AÑOS : ", long);
                if (long == 0) anosselect = "";
                else anosselect = ";";

                if (datSearchInteractive.codigoano.length == 1) {
                    datSearchInteractive.codigoano &&
                        datSearchInteractive.codigoano.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : null;
                        });
                } else if (datSearchInteractive.codigoano.length == 2) {
                    datSearchInteractive.codigoano &&
                        datSearchInteractive.codigoano.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : index == 1
                                ? (anosselect = anosselect + ";" + row.label)
                                : null;
                        });
                } else if (datSearchInteractive.codigoano.length > 2) {
                    datSearchInteractive.codigoano &&
                        datSearchInteractive.codigoano.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : index == 1
                                ? (anosselect = anosselect + ";" + row.label)
                                : index == 2
                                ? (anosselect =
                                      anosselect + ";" + row.label + "...")
                                : null;
                        });
                }
            }
        } else anosselect = "";

        let validar =  datSelSearch.nombretipovehiculo+" "+datSelSearch.nombrecarroceria+" "+datSelSearch.nombremarca+" "+
        datSelSearch.nombremodelo+" "+dataselectsearch.nombreanno+" "+ datSelSearch.nombretipocombustible+" "+
        datSelSearch.nombrecilindraje+" "+datSelSearch.nombretransmision+" "+datSelSearch.nombretraccion;

        let longitud = validar.length;
        setLongitudDataVeh(longitud);

        console.log("SEACRH XXXX: ", validar);

    }, [datasearchinteractive, dataselectsearch]);

    return (
        <div className="ml-15">
            <div className="row">
                <div className="col-md-10">
                    <div className="mt-15 box textoselectedvehicle">
                        {datSelSearch.nombretipovehiculo}
                        {datSelSearch.nombrecarroceria}
                        {datSelSearch.nombremarca}
                        {datSelSearch.nombremodelo}
                        {dataselectsearch.nombreanno != ";" && dataselectsearch.nombreanno != "Año" 
                         ? " ;"+dataselectsearch.nombreanno : null}
                        {datSelSearch.nombretipocombustible}
                        {datSelSearch.nombrecilindraje}
                        {datSearchInteractive.idvehiculo != 3
                            ? datSelSearch.nombretransmision
                            : null}
                        {datSearchInteractive.idvehiculo != 3 &&
                        datSearchInteractive.idvehiculo != 6 &&
                        datSearchInteractive.idvehiculo != 1
                            ? datSelSearch.nombretraccion
                            : null}
                    </div>
                </div>
                <div className="col-md-1">
                    <div
                        className="posicionbotoneditar botonheaderinteractivoderecha"
                        onClick={() => regresarAlBuscador()}>
                        <i
                            className="tamañoiconoeditar fa fa-edit d-flex justify-content-center"
                            data-tip
                            data-for="registerEdit"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default selectedvehicle;
