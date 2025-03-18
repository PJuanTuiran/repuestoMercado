import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../store/editdata/action";
import { getSelectViewPrd } from "../../store/selectviewprd/action";
import { getViewSearch } from "../../store/viewsearch/action";

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
    const [anoSelect, setAnoSelect] = useState("");
    const [classTextoSel, setClassTextoSel] = useState(
        "mt-15 box textoselectedvehicle mb-10"
    );
    const [classTextoSelDos, setClassTextoSelDos] = useState(
        "textoselectedvehicledos"
    );

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
        dispatch(getSelectViewPrd(0));
        dispatch(getViewSearch(false));
        localStorage.setItem("editdata", JSON.stringify(true));
        localStorage.setItem("editVehHistory", JSON.stringify(false));
        router.push({
            pathname: "/searchinteractive/searchinteractive",
            query: {
                editVehSearch: JSON.stringify(true),
            },
        });

        //router.push("/searchinteractive/searchinteractive");
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

        let varanos = "" + dataselectsearch.nombreanno;

        if (varanos == "Año") setAnoSelect("");
        else if (varanos) {
            let longano = varanos.length;

            if (longano > 15) {
                let val = ";" + varanos.substr(0, 14) + "...";
                setAnoSelect(val);
            } else {
                let val = ";" + varanos;
                setAnoSelect(val);
            }
        }

        /*
let otravariables = datSelSearch.nombretipocombustible+" "+datSelSearch.nombrecilindraje+" "+
datSelSearch.nombretransmision+" "+datSelSearch.nombretraccion;
        */

        let validar =
            "" +
            dataselectsearch.nombretipocombustible +
            " " +
            dataselectsearch.nombrecilindraje +
            " " +
            dataselectsearch.nombretransmision +
            " " +
            dataselectsearch.nombretraccion;

        let longitud = validar.length;

        if (longitud > 3) {
            setClassTextoSel("mt-15 box textoselectedvehicle");
            setClassTextoSelDos("textoselectedvehicledos mb-10");
        } else {
            setClassTextoSel("mt-15 box textoselectedvehicle mb-10");
            setClassTextoSelDos("textoselectedvehicledos");
        }
        setLongitudDataVeh(longitud);

        //console.log("SEACRH XXXX: ", longitud);
    }, [datasearchinteractive, dataselectsearch]);

    return (
        <div className="ml-15">
            <div className="row">
                <div className="col-md-10">
                    <div className={classTextoSel}>
                        {datSelSearch.nombretipovehiculo}
                        {datSelSearch.nombrecarroceria}
                        {datSelSearch.nombremarca}
                        {datSelSearch.nombremodelo}
                        {anoSelect == ";0;" || anoSelect == ";0" || !anoSelect || anoSelect == ";Año" || anoSelect == ";Año;" ? "" : anoSelect}
                    </div>
                    {longitudDataVeh > 3 ? (
                        <div className={classTextoSelDos}>
                            {datSelSearch.nombretipocombustible.substr(1, 14)}
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
                    ) : null}
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
