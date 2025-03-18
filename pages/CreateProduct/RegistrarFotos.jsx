import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import shortid from "shortid";
import axios from "axios";
import LoadingGrabarProducto from "~/components/elements/Loading/LoadingGrabarProducto";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Row, Col, Form } from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import img from "../../public/imagesupload/uploadimage.png";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesImagenes from "../mensajes/ModalMensajesImagenes";
import Moment from "moment";
import { URL_BD_MR, URL_MK_MR } from "../../helpers/Constants";

//Constantes
import { URL_IMAGES_RESULTS } from "../../helpers/Constants";

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}

function NumberFormatCelular(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix=""
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

NumberFormatCelular.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

let arraydimension = [];
let contadortexto = 0;
let mensajeUno = "";
let mensajeDos = "";
let contadorimg = 0;

function RegistrarFotos(props) {
    const { generico, idVehiculosProducto, openCloseUbicarPrd,
        openCloseInformacionPrd, openCloseDatPublicaPrd, openClose
    } = props;
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [showControlUnError, setShowControlUnError] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesImagenes, setShowModalMensajesImagenes] = useState(false);
    const [tituloMensajesImagenes, setTituloMensajesImagenes] = useState("");
    const [textoMensajesImagenes, setTextoMensajesImagenes] = useState("");
    const [textoMensajesImagenesUno, setTextoMensajesImagenesUno] = useState("");
    const [textoMensajesImagenesDos, setTextoMensajesImagenesDos] = useState("");
    const [textoMensajesImagenesTres, setTextoMensajesImagenesTres] = useState("");
    const [textoMensajesImagenesCuatro, setTextoMensajesImagenesCuatro] = useState("");
    const [mostrarErrores, setMostrarErrores] = useState("");
    let img = URL_IMAGES_RESULTS + "uploadimage.png";

    const router = useRouter();
    const [formData, setFormData] = useState(defaultValueForm());
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(false);
    const [imgUno, setImgUno] = useState(img);
    const [imgDos, setImgDos] = useState(img);
    const [imgTres, setImgTres] = useState(img);
    const [imgCuatro, setImgCuatro] = useState(img);
    const [imgCinco, setImgCinco] = useState(img);
    const [imgSeis, setImgSeis] = useState(img);
    const [imgSiete, setImgSiete] = useState(img);
    const [imgOcho, setImgOcho] = useState(img);
    const [imgNueve, setImgNueve] = useState(img);
    const [imgDiez, setImgDiez] = useState(img);

    const [imgUnoLoad, setImgUnoLoad] = useState(img);
    const [imgDosLoad, setImgDosLoad] = useState(img);
    const [imgTresLoad, setImgTresLoad] = useState(img);
    const [imgCuatroLoad, setImgCuatroLoad] = useState(img);
    const [imgCincoLoad, setImgCincoLoad] = useState(img);
    const [imgSeisLoad, setImgSeisLoad] = useState(img);
    const [imgSieteLoad, setImgSieteLoad] = useState(img);
    const [imgOchoLoad, setImgOchoLoad] = useState(img);
    const [imgNueveLoad, setImgNueveLoad] = useState(img);
    const [imgDiezLoad, setImgDiezLoad] = useState(img);

    const [mostrarDocumentoUno, setMostrarDocumentoUno] = useState(false);
    const [mostrarDocumentoDos, setMostrarDocumentoDos] = useState(false);
    const [mostrarDocumentoTres, setMostrarDocumentoTres] = useState(false);
    const [mostrarDocumentoCuatro, setMostrarDocumentoCuatro] = useState(false);
    const [mostrarDocumentoCinco, setMostrarDocumentoCinco] = useState(false);
    const [mostrarDocumentoSeis, setMostrarDocumentoSeis] = useState(false);
    const [mostrarDocumentoSiete, setMostrarDocumentoSiete] = useState(false);
    const [mostrarDocumentoOcho, setMostrarDocumentoOcho] = useState(false);
    const [mostrarDocumentoNueve, setMostrarDocumentoNueve] = useState(false);
    const [mostrarDocumentoDiez, setMostrarDocumentoDiez] = useState(false);

    const [selectedArchives, setSelectedArchives] = useState([]);
    const [baseArchives, setBaseArchives] = useState([]);
    const [vehCompatibles, setVehCompatibles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [eliminaImagen, setEliminaImagen] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [mostrarMas, setMostrarMas] = useState(false);
    const [cajaFotos, setCajaFotos] = useState(
        "cajafotosproductos ps-page__header mt-25"
    );
    const [valor, setValor] = useState("");
    const [resultImgLoad, setresultImgLoad] = useState(false);

    const [textoDimension, setTextoDimension] = useState(null);
    const [textoTamaño, setTextoTamaño] = useState(null);
    const [textoFormato, setTextoFormato] = useState(null);
    const [textoLongitud, setTextoLongitud] = useState(null);
    const [datPrd, setDatPrd] = useState(null);
    const [duplicarPrd, setDuplicarPrd] = useState(null);
    const [imagenesLoad, setImagenesLoad] = useState([]);
    const [contadorImg, setContadorImg] = useState(0);
    const [numImg, setNumImg] = useState(0);
    const [imgDuplicar, setImgDuplicar] = useState(0);
    const [accion, setAccion] = useState(null);

    const [idPublication, setIdPublication] = useState(0);

    // Lee Caracteristicas del Veh Selecdo
    const caracteristicasVeh = useSelector(
        (state) => state.vehiculoseleccionado.vehiculoseleccionado
    );
    // Lee Carateristicas del Motor
    const caracteristicasmotor = useSelector(
        (state) => state.datosmotor.datosmotor
    );
    // Lee Datos de producto ingresdo por el vendedor
    const datosproductouno = useSelector(
        (state) => state.datosproducto.datosproducto
    );
    const datosproductodos = useSelector(
        (state) => state.datosproductouno.datosproductouno
    );

    const usuariologueado = useSelector((state) => state.userlogged.userlogged);

    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
        if (duplicarprd == 1 || duplicarprd == 2) {
            setDuplicarPrd(duplicarprd);
            let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
            let accion = JSON.parse(localStorage.getItem("accion"));
            setAccion(accion);
            setIdPublication(datosprducto.id);
            contadorimg = datosprducto.numerodeimagenes;
            setImgDuplicar(contadorimg);
            setContadorImg(datosprducto.numerodeimagenes);

            let imgload = [];
            if (contadorimg == 1) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                for (var i = 0; i <= 9; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 2) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                for (var i = 0; i <= 8; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 3) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                for (var i = 0; i <= 7; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 4) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                setImgCuatroLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen4
                );

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen4);
                for (var i = 0; i <= 6; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 5) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                setImgCuatroLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen4
                );
                setImgCincoLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen5
                );

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen4);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen5);
                for (var i = 0; i <= 5; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 6) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                setImgCuatroLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen4
                );
                setImgCincoLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen5
                );
                setImgSeisLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen4);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen5);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                for (var i = 0; i <= 4; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 7) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                setImgCuatroLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen4
                );
                setImgCincoLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen5
                );
                setImgSeisLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                setImgSieteLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen7
                );

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen4);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen5);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen7);
                for (var i = 0; i <= 3; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 8) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                setImgCuatroLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen4
                );
                setImgCincoLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen5
                );
                setImgSeisLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                setImgSieteLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen7
                );
                setImgOchoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen8);

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen4);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen5);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen7);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen8);
                for (var i = 0; i <= 2; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
                setImagenesLoad(imgload);
            } else if (contadorimg == 9) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                setImgCuatroLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen4
                );
                setImgCincoLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen5
                );
                setImgSeisLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                setImgSieteLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen7
                );
                setImgOchoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen8);
                setImgNueveLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen9
                );

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen4);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen5);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen7);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen8);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen9);
                for (var i = 0; i <= 1; i++) {
                    imgload.push(img);
                }
                setImagenesLoad(imgload);
            } else if (contadorimg == 10) {
                setImgUnoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                setImgDosLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                setImgTresLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                setImgCuatroLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen4
                );
                setImgCincoLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen5
                );
                setImgSeisLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                setImgSieteLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen7
                );
                setImgOchoLoad(URL_IMAGES_RESULTS + datosprducto.nombreimagen8);
                setImgNueveLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen9
                );
                setImgDiezLoad(
                    URL_IMAGES_RESULTS + datosprducto.nombreimagen10
                );

                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen1);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen2);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen3);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen4);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen5);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen6);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen7);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen8);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen9);
                imgload.push(URL_IMAGES_RESULTS + datosprducto.nombreimagen10);
                setImagenesLoad(imgload);
            }

            setDatPrd(datosprducto);
            let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));
        } else {
            let imgload = [];
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            imgload.push(img);
            setImagenesLoad(imgload);
        }
    }, [duplicarprd]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const generabase64 = async () => {
        //setIsLoading(true);
        //console.log("FILE NAME : ", baseArchives[0]);

        if (baseArchives.length == 0 && duplicarprd == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "La visibilidad de tu producto depende de las fotos, Ingresa como mínimo una!"
            );
        }

        var reader = new FileReader();
        //console.log("EVENT FILE : ", baseArchives);
        //return
        const recorreImagen = async () => {
            let longitud = baseArchives.length;

            //Cuando al duplicar producto no se agragan imagenes nuevas);
            if (longitud == 0) duplicarProducto(0);

            let arreglofotos = [];
            let contador = 0;
            await Array.from(baseArchives).forEach((archivo) => {
                var reader = new FileReader();
                reader.readAsDataURL(archivo);
                reader.onload = function () {
                    var base64 = reader.result;
                    arreglofotos[contador] = base64;
                    var extension =
                        "." +
                        base64.substring(
                            base64.indexOf("/") + 1,
                            base64.indexOf(";base64")
                        );
                    contador = contador + 1;

                    if (contador === longitud) {
                        grabarfoto(arreglofotos, extension);
                    }
                };
            });
        };
        recorreImagen();
    };

    useEffect(() => {
        if (generico == "No") {
            let params;
            const leeVehiculosTemporal = async () => {
                if (duplicarprd == 2) {
                    let idvehcompduplicar = JSON.parse(
                        localStorage.getItem("idvehcompduplicar")
                    );
                    params = {
                        codigo: idvehcompduplicar,
                    };
                } else {
                    params = {
                        codigo: idVehiculosProducto,
                    };
                }

                await axios({
                    method: "post",
                    url: URL_BD_MR + "33", params,
                    params,
                })
                    .then((res) => {
                        setVehCompatibles(res.data);
                        console.log("DAT: ", res.data);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo productos termporales");
                    });
            };
            leeVehiculosTemporal();
        } else {
            let vehcompatibles = [];

            let veh = {
                id: 0,
                idtipoproducto: 0,
                tipovehiculo: 0,
                carroceria: 0,
                marca: 0,
                anno: 0,
                modelo: 0,
                cilindraje: 0,
                transmision: 0,
                combustible: 0,
                traccion: 0,
                selecttipo: "Genérico",
                selectcarroceria: "Genérico",
                selectmarca: "Genérico",
                selectanno: "Genérico",
                selectmodelo: "Genérico",
                selectcilindraje: "Genérico",
                selecttransmision: "Genérico",
                selectcombustible: "Genérico",
                selecttraccion: "Genérico",
                comparar: 0,
                fecha: "2023-01-01",
                estado: 0,
            };

            vehcompatibles.push(veh);
            setVehCompatibles(vehcompatibles);
        }
    }, []);

    const grabarfoto = async (dato, ext) => {
        let longitud = dato.length;
        setNumImg(longitud);
        let datoimagen;
        let nombrefoto = shortid();
        switch (longitud) {
            case 1:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                };
                break;
            case 2:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                };
                break;
            case 3:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                };
                break;
            case 4:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                };
                break;
            case 5:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                };
                break;
            case 6:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                };
                break;
            case 7:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                };
                break;
            case 8:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                };
                break;
            case 9:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                    nombreimagen9: nombrefoto + "-9" + ext,
                    imagen9: dato[8],
                };
                break;
            case 10:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                    nombreimagen9: nombrefoto + "-9" + ext,
                    imagen9: dato[8],
                    nombreimagen10: nombrefoto + "-10" + ext,
                    imagen10: dato[10],
                };
                break;
            default:
                datoimagen = {
                    longitud,
                    nombreimagen1: "",
                    imagen1: 0,
                    nombreimagen2: "",
                    imagen2: 0,
                    nombreimagen3: "",
                    imagen3: 0,
                    nombreimagen4: "",
                    imagen4: 0,
                    nombreimagen5: "",
                    imagen5: 0,
                    nombreimagen6: "",
                    imagen6: 0,
                    nombreimagen7: "",
                    imagen7: 0,
                    nombreimagen8: "",
                    imagen8: 0,
                    nombreimagen9: "",
                    imagen9: 0,
                    nombreimagen10: "",
                    imagen10: 0,
                };
                break;
        }
        if (duplicarprd == 1 || duplicarprd == 2) {
            duplicarProducto(datoimagen);
        } else {
            creaProducto(datoimagen);
        }
    };

    const creaProducto = async (datosimagenes) => {
        if (openCloseUbicarPrd || openCloseInformacionPrd || openCloseDatPublicaPrd || openClose) {
            setShowModalMensajes(true);
            setTituloMensajes("Crear Publicación");
            setTextoMensajes(
                "Recuerda todas las secciones deben estar cerradas, revisar!"
            );
            return
        }

        let datauser = JSON.parse(localStorage.getItem("datauser"));
        //console.log("VEH : ", dataprd[0]);
        //return
        let grabaproductos = false;

        const ubiposprod = JSON.parse(
            localStorage.getItem("ubicacionposicionproducto")
        );
        const infoprod = JSON.parse(
            localStorage.getItem("informacionproducto")
        );
        const datpubli = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        console.log("infoprodXXX : ", infoprod[0].vendeporpartes)

        async function noticarCrearPrd() {

            const requestData = {
                "remitente": datosusuarios.email,
                "asunto": "Crear Producto MR",
                "plantilla": "info",
                "to": "Mercado Repuesto",
                "contenido_html": {
                    "title": "Acabas de registrar un nuevo producto en MR",
                    "subtitle": "Producto registrado por: " + datosusuarios.usuario,
                    "body": infoprod[0].titulonombre,
                    "tipo": "01"
                }
            };

            const config = {
                headers: {
                    "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                    "Content-Type": "application/json" || x < z
                }
            };

            const sendRequest = async () => {
                try {
                    const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                } catch (error) {
                    console.error('Errorxx:', error);
                }
            }
            sendRequest();
        }
        //noticarCrearPrd();

        let validarprecio;
        let valprod = datpubli[0].precio;
        let long = datpubli[0].precio.length;
        let preciovta = "";

        for (var i = 0; i < long; i++) {
            validarprecio = valprod.substr(i, 1);
            if (
                validarprecio == 0 ||
                validarprecio == 1 ||
                validarprecio == 2 ||
                validarprecio == 3 ||
                validarprecio == 4 ||
                validarprecio == 5 ||
                validarprecio == 6 ||
                validarprecio == 7 ||
                validarprecio == 8 ||
                validarprecio == 9
            ) {
                preciovta = preciovta + validarprecio;
            }
        }

        let preciosinseparadores = preciovta;
        let anchosinseparadores;
        let altosinseparadores;
        let largosinseparadores;
        let pesosinseparadores;
        let idvehiculoscompatible = shortid();

        if (duplicarprd == 1 || duplicarprd == 2) {
            anchosinseparadores = datpubli[0].ancho;
            altosinseparadores = datpubli[0].alto;
            largosinseparadores = datpubli[0].largo;
            pesosinseparadores = datpubli[0].peso;
        } else {
            anchosinseparadores = datpubli[0].ancho.replace(/,/g, "");
            altosinseparadores = datpubli[0].alto.replace(/,/g, "");
            largosinseparadores = datpubli[0].largo.replace(/,/g, "");
            pesosinseparadores = datpubli[0].peso.replace(/,/g, "");
        }

        let item = {
            id: idvehiculoscompatible,
            titulo: infoprod[0].titulonombre,
        };
        //newDetUno.push(itemUno);

        localStorage.setItem("idpublicacion", JSON.stringify(item));

        //Eliminar separadores en el precio
        let valorproducto = preciosinseparadores;
        let IdVehPrd = idVehiculosProducto;

        if (duplicarprd == 1 || duplicarprd == 2) {
            IdVehPrd = idvehiculoscompatible;
            valorproducto = parseInt(preciosinseparadores);
        } else {
            IdVehPrd = idVehiculosProducto;
        }

        // Datos vehículos no genericos - compatibles
        if (generico == "No") {
            vehCompatibles &&
                vehCompatibles.map((veh) => {
                    let params = {
                        idproductovehiculo: IdVehPrd,
                        productogenerico: generico,
                        tipovehiculo: veh.tipovehiculo,
                        carroceria: veh.carroceria,
                        marca: veh.marca,
                        anno: veh.anno,
                        modelo: veh.modelo,
                        cilindraje: veh.cilindraje,
                        combustible: veh.combustible,
                        transmision: veh.transmision,
                        traccion: veh.traccion,
                        partedelvehiculo: ubiposprod[0].ubicacionProducto,
                        posicionproducto: ubiposprod[0].posicionProducto,
                        titulonombre: infoprod[0].titulonombre,
                        marcarepuesto: infoprod[0].marcarepuesto,
                        condicion: infoprod[0].condicion,
                        estadoproducto: infoprod[0].estadoproducto,
                        numerodeunidades: datpubli[0].numerodeunidades,
                        precio: valorproducto,
                        numerodeparte: infoprod[0].numerodeparte,
                        compatible: idvehiculoscompatible,
                        descripcionproducto: datpubli[0].descripcionproducto,
                        vendeporpartes: infoprod[0].vendeporpartes,
                    };

                    const grabaVehCompatibles = async () => {
                        await axios({
                            method: "post",
                            url: URL_BD_MR + "36", params,
                        })
                            .then((res) => {
                                console.log("DAT RES: ", res);
                                console.log("DAT: ", res.data);
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo productos termporales"
                                );
                            });
                    };
                    grabaVehCompatibles();
                });
        }

        //console.log("VEH : ", valorproducto);
        //return;

        let nombreimagen1 = "";
        let imagen1 = "";
        let nombreimagen2 = "";
        let imagen2 = "";
        let nombreimagen3 = "";
        let imagen3 = "";
        let nombreimagen4 = "";
        let imagen4 = "";
        let nombreimagen5 = "";
        let imagen5 = "";
        let nombreimagen6 = "";
        let imagen6 = "";
        let nombreimagen7 = "";
        let imagen7 = "";
        let nombreimagen8 = "";
        let imagen8 = "";
        let nombreimagen9 = "";
        let imagen9 = "";
        let nombreimagen10 = "";
        let imagen10 = "";

        //console.log("ASASASS : ", datosimagenes.longitud);
        //return;
        if (datosimagenes.longitud == 1) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
        } else if (datosimagenes.longitud == 2) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
        } else if (datosimagenes.longitud == 3) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
        } else if (datosimagenes.longitud == 4) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
            nombreimagen4 = datosimagenes.nombreimagen4;
            imagen4 = datosimagenes.imagen4;
        } else if (datosimagenes.longitud == 5) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
            nombreimagen4 = datosimagenes.nombreimagen4;
            imagen4 = datosimagenes.imagen4;
            nombreimagen5 = datosimagenes.nombreimagen5;
            imagen5 = datosimagenes.imagen5;
        } else if (datosimagenes.longitud == 6) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
            nombreimagen4 = datosimagenes.nombreimagen4;
            imagen4 = datosimagenes.imagen4;
            nombreimagen5 = datosimagenes.nombreimagen5;
            imagen5 = datosimagenes.imagen5;
            nombreimagen6 = datosimagenes.nombreimagen6;
            imagen6 = datosimagenes.imagen6;
        } else if (datosimagenes.longitud == 7) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
            nombreimagen4 = datosimagenes.nombreimagen4;
            imagen4 = datosimagenes.imagen4;
            nombreimagen5 = datosimagenes.nombreimagen5;
            imagen5 = datosimagenes.imagen5;
            nombreimagen6 = datosimagenes.nombreimagen6;
            imagen6 = datosimagenes.imagen6;
            nombreimagen7 = datosimagenes.nombreimagen7;
            imagen7 = datosimagenes.imagen7;
        } else if (datosimagenes.longitud == 8) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
            nombreimagen4 = datosimagenes.nombreimagen4;
            imagen4 = datosimagenes.imagen4;
            nombreimagen5 = datosimagenes.nombreimagen5;
            imagen5 = datosimagenes.imagen5;
            nombreimagen6 = datosimagenes.nombreimagen6;
            imagen6 = datosimagenes.imagen6;
            nombreimagen7 = datosimagenes.nombreimagen7;
            imagen7 = datosimagenes.imagen7;
            nombreimagen8 = datosimagenes.nombreimagen8;
            imagen8 = datosimagenes.imagen8;
        } else if (datosimagenes.longitud == 9) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
            nombreimagen4 = datosimagenes.nombreimagen4;
            imagen4 = datosimagenes.imagen4;
            nombreimagen5 = datosimagenes.nombreimagen5;
            imagen5 = datosimagenes.imagen5;
            nombreimagen6 = datosimagenes.nombreimagen6;
            imagen6 = datosimagenes.imagen6;
            nombreimagen7 = datosimagenes.nombreimagen7;
            imagen7 = datosimagenes.imagen7;
            nombreimagen8 = datosimagenes.nombreimagen8;
            imagen8 = datosimagenes.imagen8;
            nombreimagen9 = datosimagenes.nombreimagen9;
            imagen9 = datosimagenes.imagen9;
        } else if (datosimagenes.longitud == 10) {
            nombreimagen1 = datosimagenes.nombreimagen1;
            imagen1 = datosimagenes.imagen1;
            nombreimagen2 = datosimagenes.nombreimagen2;
            imagen2 = datosimagenes.imagen2;
            nombreimagen3 = datosimagenes.nombreimagen3;
            imagen3 = datosimagenes.imagen3;
            nombreimagen4 = datosimagenes.nombreimagen4;
            imagen4 = datosimagenes.imagen4;
            nombreimagen5 = datosimagenes.nombreimagen5;
            imagen5 = datosimagenes.imagen5;
            nombreimagen6 = datosimagenes.nombreimagen6;
            imagen6 = datosimagenes.imagen6;
            nombreimagen7 = datosimagenes.nombreimagen7;
            imagen7 = datosimagenes.imagen7;
            nombreimagen8 = datosimagenes.nombreimagen8;
            imagen8 = datosimagenes.imagen8;
            nombreimagen9 = datosimagenes.nombreimagen9;
            imagen9 = datosimagenes.imagen9;
            nombreimagen10 = datosimagenes.nombreimagen10;
            imagen10 = datosimagenes.imagen10;
        }

        let loadimage = null;
        if (!imagen1) {
            loadimage = "No";
        } else loadimage = "Si";

        const formdata = new FormData();
        formdata.append("id", 0);
        formdata.append("productogenerico", generico);
        formdata.append("idproductovehiculo", IdVehPrd);
        formdata.append("tipovehiculo", vehCompatibles[0].tipovehiculo);
        formdata.append("carroceria", vehCompatibles[0].carroceria);
        formdata.append("marca", vehCompatibles[0].marca);
        formdata.append("anno", vehCompatibles[0].anno);
        formdata.append("modelo", vehCompatibles[0].modelo);
        formdata.append("cilindrajemotor", vehCompatibles[0].cilindraje);
        formdata.append("tipocombustible", vehCompatibles[0].combustible);
        formdata.append("transmision", vehCompatibles[0].transmision);
        formdata.append("tipotraccion", vehCompatibles[0].traccion);
        formdata.append("turbocompresor", 0);
        formdata.append("posicionproducto", ubiposprod[0].posicionProducto);
        formdata.append("partedelvehiculo", ubiposprod[0].ubicacionProducto);
        formdata.append("titulonombre", infoprod[0].titulonombre);
        formdata.append("marcarepuesto", infoprod[0].marcarepuesto);
        formdata.append("condicion", infoprod[0].condicion);
        formdata.append("estadoproducto", infoprod[0].estadoproducto);
        formdata.append("vendeporpartes", infoprod[0].vendeporpartes);
        formdata.append("numerodeparte", infoprod[0].numerodeparte);
        formdata.append("funcionalidad", infoprod[0].funcionalidad);
        formdata.append("numerodeunidades", datpubli[0].numerodeunidades);
        formdata.append("precio", valorproducto);
        formdata.append("compatible", idvehiculoscompatible);
        formdata.append("descripcionproducto", datpubli[0].descripcionproducto);
        formdata.append("peso", parseInt(pesosinseparadores));
        formdata.append("alto", parseInt(altosinseparadores));
        formdata.append("ancho", parseInt(anchosinseparadores));
        formdata.append("largo", parseInt(largosinseparadores));
        formdata.append("ciudad", datpubli[0].ciudad);
        formdata.append("fechacreacion", fechaactual);
        formdata.append("descuento", formData.descuento);
        formdata.append("usuario", usuariologueado.uid);
        formdata.append("moneda", formData.moneda);
        formdata.append("estado", formData.estado);
        formdata.append("longitud", numImg + contadorImg);
        formdata.append("nombreimagen1", nombreimagen1);
        formdata.append("imagen1", imagen1);
        formdata.append("nombreimagen2", nombreimagen2);
        formdata.append("imagen2", imagen2);
        formdata.append("nombreimagen3", nombreimagen3);
        formdata.append("imagen3", imagen3);
        formdata.append("nombreimagen4", nombreimagen4);
        formdata.append("imagen4", imagen4);
        formdata.append("nombreimagen5", nombreimagen5);
        formdata.append("imagen5", imagen5);
        formdata.append("nombreimagen6", nombreimagen6);
        formdata.append("imagen6", imagen6);
        formdata.append("nombreimagen7", nombreimagen7);
        formdata.append("imagen7", imagen7);
        formdata.append("nombreimagen8", nombreimagen8);
        formdata.append("imagen8", imagen8);
        formdata.append("nombreimagen9", nombreimagen9);
        formdata.append("imagen9", imagen9);
        formdata.append("nombreimagen10", nombreimagen10);
        formdata.append("imagen10", imagen10);
        formdata.append("loadimage", loadimage);

        let datx = {
            id: 0,
            productogenerico: generico,
            idproductovehiculo: IdVehPrd,
            tipovehiculo: vehCompatibles[0].tipovehiculo,
            carroceria: vehCompatibles[0].carroceria,
            marca: vehCompatibles[0].marca,
            anno: vehCompatibles[0].anno,
            modelo: vehCompatibles[0].modelo,
            cilindrajemotor: vehCompatibles[0].cilindraje,
            tipocombustible: vehCompatibles[0].combustible,
            transmision: vehCompatibles[0].transmision,
            tipotraccion: vehCompatibles[0].traccion,
            turbocompresor: 0,
            posicionproducto: ubiposprod[0].posicionProducto,
            partedelvehiculo: ubiposprod[0].ubicacionProducto,
            titulonombre: infoprod[0].titulonombre,
            marcarepuesto: infoprod[0].marcarepuesto,
            condicion: infoprod[0].condicion,
            estadoproducto: infoprod[0].estadoproducto,
            vendeporpartes: infoprod[0].vendeporpartes,
            numerodeparte: infoprod[0].numerodeparte,
            funcionalidad: infoprod[0].funcionalidad,
            numerodeunidades: datpubli[0].numerodeunidades,
            precio: valorproducto,
            compatible: idvehiculoscompatible,
            descripcionproducto: datpubli[0].descripcionproducto,
            peso: parseInt(pesosinseparadores),
            alto: parseInt(altosinseparadores),
            ancho: parseInt(anchosinseparadores),
            largo: parseInt(largosinseparadores),
            ciudad: datpubli[0].ciudad,
            fechacreacion: fechaactual,
            descuento: formData.descuento,
            usuario: usuariologueado.uid,
            moneda: formData.moneda,
            estado: formData.estado,
            longitud: numImg + contadorImg,
            nombreimagen1: nombreimagen1,
            imagen1: imagen1,
            nombreimagen2: nombreimagen2,
            imagen2: imagen2,
            nombreimagen3: nombreimagen3,
            imagen3: imagen3,
            nombreimagen4: nombreimagen4,
            imagen4: imagen4,
            nombreimagen5: nombreimagen5,
            imagen5: imagen5,
            nombreimagen6: nombreimagen6,
            imagen6: imagen6,
            nombreimagen7: nombreimagen7,
            imagen7: imagen7,
            nombreimagen8: nombreimagen8,
            imagen8: imagen8,
            nombreimagen9: nombreimagen9,
            imagen9: imagen9,
            nombreimagen10: nombreimagen10,
            imagen10: imagen10,
            loadimage: loadimage,
        }

        //console.log("DATOS XXX : ", datx)
        //return;

        let creoregistro = false;
        let url = "https://gimcloud.com.co/mrp/api";

        await fetch(`${url}/16`, {
            method: "POST",
            body: formdata,
            //headers: headers,
        }).then((response) => {
            setIsLoading(false);
            if (response) {
                if (response.status === 200) {
                    async function noticarCrearPrd() {
                        let enlace = URL_MK_MR + "product/"+idvehiculoscompatible+"?redirect=2&ctlredirigir="+datauser.uid;
                        let imagen = "<p><strong><img src='https://gimcloud.com.co/files/mercadorepuesto/" + nombreimagen1 + "' alt='Mercado Repuesto' height='150 width=150' ></strong>.</p>";

                        const requestData = {
                            "remitente": datosusuarios.email,
                            "asunto": "¡FELICITACIONES TIENES UNA NUEVA PUBLICACIÓN!",
                            "plantilla": "info",
                            "to": "Mercado Repuesto",
                            "contenido_html": {
                                "title": imagen,
                                "subtitle": "Haz clic aquí, para ver la publicacion, " + enlace,
                                "body": infoprod[0].titulonombre,
                                "tipo": "01 "
                            }
                        };

                        const config = {
                            headers: {
                                "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                                "Content-Type": "application/json" || x < z
                            }
                        };

                        const sendRequest = async () => {
                            try {
                                const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                            } catch (error) {
                                console.error('Errorxx:', error);
                            }
                        }
                        sendRequest();
                    }
                    noticarCrearPrd();

                    const crearNotificaPrd = async () => {
                        const idnotificacion = Math.floor(Math.random() * 10000000);
                        let comentario = "FELICITACIONES TIENES UNA NUEVA PUBLICACIÓN";

                        let params = {
                            estado: 128,
                            uidusuario: datauser.uid,
                            idnotificacion: idnotificacion,
                            idorigen: idvehiculoscompatible,
                            comentario: comentario,
                            estado: 90,
                            ctlrnotificaentrada: 0,
                            ctlrnotificasalida: 0,
                            tiponotificacion: 13,
                        }

                        try {
                            const res = await axios({
                                method: "post",
                                url: URL_BD_MR + "823", params
                            });

                            console.log("RESDATAXXX : ", res.data)

                            if (res.data.type == 1) {
                                console.log("Notificación comprador creada")
                                //return;
                                //router.push("/");
                            }
                        } catch (error) {
                            console.error("Error creando Notificación", error);
                        }
                    };

                    crearNotificaPrd();

                    creoregistro = true;
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Fotos productos grabadas de forma correcta!"
                    );
                    setLoading(false);
                    router.push({
                        pathname: "/CreateProduct/terminapublicacion",
                        query: {
                            estadopublicacion: 2,
                            idprd: infoprod[0].idprd,
                            compatible: JSON.stringify(idvehiculoscompatible),
                            titulopublicacion: JSON.stringify(
                                infoprod[0].titulonombre
                            ),
                        },
                    });
                } else {
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Se presentaron inconvenientes al grabar los fotos, Intenta nuevamente!"
                    );
                    setLoading(false);
                    router.push("/");
                }
            } else {
                console.log("RESPONSE INGRESO FOTOS : ", response);
            }
        });
    };

    const cancelar = () => {
        router.push("/");
    };

    const duplicarProducto = async (datosimagenes) => {
        
        let datauser = JSON.parse(localStorage.getItem("datauser"));

        let vehproductos = JSON.parse(
            localStorage.getItem("vehproductos")
        );

        let vehproductosctrl = JSON.parse(
            localStorage.getItem("vehproductosctrl")
        );

        let compara = false;
        vehproductos &&
            vehproductos.map((veh, index) => {
                vehproductosctrl &&
                    vehproductosctrl.map((ctrl, ind) => {
                        if (veh.comparar != ctrl.comparar && index == ind) {
                            compara = true;
                        }
                    });
            });

        /*
        if (!compara) {
            setShowModalMensajes(true);
            setTituloMensajes("Crear Publicación");
            setTextoMensajes(
                "Recuerda, no puedes tener dos publicaciones identificas!"
            );
            //return
        }
            */

        //return

        if (openCloseUbicarPrd || openCloseInformacionPrd || openCloseDatPublicaPrd || openClose) {

            //alert(openCloseUbicarPrd)
            //alert(openCloseInformacionPrd)
            //alert(openCloseDatPublicaPrd)
            //alert(openClose)

            setShowModalMensajes(true);
            setTituloMensajes("Crear Publicación");
            setTextoMensajes(
                "Recuerda todas las secciones deben estar cerradas, revisar!"
            );
            return
        }

        let grabaproductos = false;

        const ubiposprod = JSON.parse(
            localStorage.getItem("ubicacionposicionproducto")
        );
        const infoprod = JSON.parse(
            localStorage.getItem("informacionproducto")
        );
        const datpubli = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        const cambiacondicionprd = JSON.parse(
            localStorage.getItem("cambiacondicionprd")
        );
        
        let validarprecio;
        let valprod = "" + datpubli[0].precio;
        let long = valprod.length;
        let preciovta = "";

        for (var i = 0; i < long; i++) {
            validarprecio = valprod.substr(i, 1);
            if (
                validarprecio == 0 ||
                validarprecio == 1 ||
                validarprecio == 2 ||
                validarprecio == 3 ||
                validarprecio == 4 ||
                validarprecio == 5 ||
                validarprecio == 6 ||
                validarprecio == 7 ||
                validarprecio == 8 ||
                validarprecio == 9
            ) {
                preciovta = preciovta + validarprecio;
            }
        }

        let preciosinseparadores = preciovta;
        let anchosinseparadores;
        let altosinseparadores;
        let largosinseparadores;
        let pesosinseparadores;
        let idvehiculoscompatible = shortid();

        if (duplicarprd == 1 || duplicarprd == 2) {
            anchosinseparadores = datpubli[0].ancho;
            altosinseparadores = datpubli[0].alto;
            largosinseparadores = datpubli[0].largo;
            pesosinseparadores = datpubli[0].peso;
        } else {
            anchosinseparadores = datpubli[0].ancho.replace(/,/g, "");
            altosinseparadores = datpubli[0].alto.replace(/,/g, "");
            largosinseparadores = datpubli[0].largo.replace(/,/g, "");
            pesosinseparadores = datpubli[0].peso.replace(/,/g, "");
        }

        let item = {
            id: idvehiculoscompatible,
            titulo: infoprod[0].titulonombre,
        };
        //newDetUno.push(itemUno);

        localStorage.setItem("idpublicacion", JSON.stringify(item));

        //Eliminar separadores en el precio
        let valorproducto = preciosinseparadores;
        let IdVehPrd = idVehiculosProducto;

        if (duplicarprd == 1 || duplicarprd == 2) {
            IdVehPrd = idvehiculoscompatible;
            valorproducto = parseInt(preciosinseparadores);
        } else {
            IdVehPrd = idVehiculosProducto;
        }

        // Datos vehículos no genericos - compatibles

        if (generico == "No") {
            vehproductos &&
                vehproductos.map((veh) => {
                    let params = {
                        idproductovehiculo: IdVehPrd,
                        productogenerico: generico,
                        tipovehiculo: veh.tipovehiculo,
                        carroceria: veh.carroceria,
                        marca: veh.marca,
                        anno: veh.anno,
                        modelo: veh.modelo,
                        cilindraje: veh.cilindraje,
                        combustible: veh.combustible,
                        transmision: veh.transmision,
                        traccion: veh.traccion,
                        partedelvehiculo: ubiposprod[0].ubicacionProducto,
                        posicionproducto: ubiposprod[0].posicionProducto,
                        titulonombre: infoprod[0].titulonombre,
                        marcarepuesto: infoprod[0].marcarepuesto,
                        condicion: infoprod[0].condicion,
                        estadoproducto: infoprod[0].estadoproducto,
                        numerodeunidades: datpubli[0].numerodeunidades,
                        precio: valorproducto,
                        numerodeparte: infoprod[0].numerodeparte,
                        compatible: idvehiculoscompatible,
                        descripcionproducto: datpubli[0].descripcionproducto,
                        vendeporpartes: infoprod[0].vendeporpartes,
                    };

                    const grabaVehCompatibles = async () => {
                        await axios({
                            method: "post",
                            url: URL_BD_MR + "36", params
                        })
                            .then((res) => {
                                console.log("DAT RES: ", res);
                                console.log("DAT: ", res.data);
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo productos termporales"
                                );
                            });
                    };
                    grabaVehCompatibles();
                });
        }

        let nombreimagen1 = "";
        let imagen1 = "";
        let nombreimagen2 = "";
        let imagen2 = "";
        let nombreimagen3 = "";
        let imagen3 = "";
        let nombreimagen4 = "";
        let imagen4 = "";
        let nombreimagen5 = "";
        let imagen5 = "";
        let nombreimagen6 = "";
        let imagen6 = "";
        let nombreimagen7 = "";
        let imagen7 = "";
        let nombreimagen8 = "";
        let imagen8 = "";
        let nombreimagen9 = "";
        let imagen9 = "";
        let nombreimagen10 = "";
        let imagen10 = "";

        if (duplicarprd == 1 || duplicarprd == 2) {
            if (datosimagenes.longitud == 1) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
            } else if (datosimagenes.longitud == 2) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
            } else if (datosimagenes.longitud == 3) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
            } else if (datosimagenes.longitud == 4) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
                nombreimagen4 = datosimagenes.nombreimagen4;
                imagen4 = datosimagenes.imagen4;
            } else if (datosimagenes.longitud == 5) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
                nombreimagen4 = datosimagenes.nombreimagen4;
                imagen4 = datosimagenes.imagen4;
                nombreimagen5 = datosimagenes.nombreimagen5;
                imagen5 = datosimagenes.imagen5;
            } else if (datosimagenes.longitud == 6) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
                nombreimagen4 = datosimagenes.nombreimagen4;
                imagen4 = datosimagenes.imagen4;
                nombreimagen5 = datosimagenes.nombreimagen5;
                imagen5 = datosimagenes.imagen5;
                nombreimagen6 = datosimagenes.nombreimagen6;
                imagen6 = datosimagenes.imagen6;
            } else if (datosimagenes.longitud == 7) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
                nombreimagen4 = datosimagenes.nombreimagen4;
                imagen4 = datosimagenes.imagen4;
                nombreimagen5 = datosimagenes.nombreimagen5;
                imagen5 = datosimagenes.imagen5;
                nombreimagen6 = datosimagenes.nombreimagen6;
                imagen6 = datosimagenes.imagen6;
                nombreimagen7 = datosimagenes.nombreimagen7;
                imagen7 = datosimagenes.imagen7;
            } else if (datosimagenes.longitud == 8) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
                nombreimagen4 = datosimagenes.nombreimagen4;
                imagen4 = datosimagenes.imagen4;
                nombreimagen5 = datosimagenes.nombreimagen5;
                imagen5 = datosimagenes.imagen5;
                nombreimagen6 = datosimagenes.nombreimagen6;
                imagen6 = datosimagenes.imagen6;
                nombreimagen7 = datosimagenes.nombreimagen7;
                imagen7 = datosimagenes.imagen7;
                nombreimagen8 = datosimagenes.nombreimagen8;
                imagen8 = datosimagenes.imagen8;
            } else if (datosimagenes.longitud == 9) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
                nombreimagen4 = datosimagenes.nombreimagen4;
                imagen4 = datosimagenes.imagen4;
                nombreimagen5 = datosimagenes.nombreimagen5;
                imagen5 = datosimagenes.imagen5;
                nombreimagen6 = datosimagenes.nombreimagen6;
                imagen6 = datosimagenes.imagen6;
                nombreimagen7 = datosimagenes.nombreimagen7;
                imagen7 = datosimagenes.imagen7;
                nombreimagen8 = datosimagenes.nombreimagen8;
                imagen8 = datosimagenes.imagen8;
                nombreimagen9 = datosimagenes.nombreimagen9;
                imagen9 = datosimagenes.imagen9;
            } else if (datosimagenes.longitud == 10) {
                nombreimagen1 = datosimagenes.nombreimagen1;
                imagen1 = datosimagenes.imagen1;
                nombreimagen2 = datosimagenes.nombreimagen2;
                imagen2 = datosimagenes.imagen2;
                nombreimagen3 = datosimagenes.nombreimagen3;
                imagen3 = datosimagenes.imagen3;
                nombreimagen4 = datosimagenes.nombreimagen4;
                imagen4 = datosimagenes.imagen4;
                nombreimagen5 = datosimagenes.nombreimagen5;
                imagen5 = datosimagenes.imagen5;
                nombreimagen6 = datosimagenes.nombreimagen6;
                imagen6 = datosimagenes.imagen6;
                nombreimagen7 = datosimagenes.nombreimagen7;
                imagen7 = datosimagenes.imagen7;
                nombreimagen8 = datosimagenes.nombreimagen8;
                imagen8 = datosimagenes.imagen8;
                nombreimagen9 = datosimagenes.nombreimagen9;
                imagen9 = datosimagenes.imagen9;
                nombreimagen10 = datosimagenes.nombreimagen10;
                imagen10 = datosimagenes.imagen10;
            }

            if (
                (duplicarprd == 1 || duplicarprd == 2 || datosimagenes == 0) &&
                imgDuplicar > 0
            ) {
                if (imagenesLoad[0] != img)
                    nombreimagen1 = imagenesLoad[0].substr(46, 40);

                if (imagenesLoad[1] != img)
                    nombreimagen2 = imagenesLoad[1].substr(46, 40);

                if (imagenesLoad[2] != img)
                    nombreimagen3 = imagenesLoad[2].substr(46, 40);

                if (imagenesLoad[3] != img)
                    nombreimagen4 = imagenesLoad[3].substr(46, 40);

                if (imagenesLoad[4] != img)
                    nombreimagen5 = imagenesLoad[4].substr(46, 40);

                if (imagenesLoad[5] != img)
                    nombreimagen6 = imagenesLoad[5].substr(46, 40);

                if (imagenesLoad[6] != img)
                    nombreimagen7 = imagenesLoad[6].substr(46, 40);

                if (imagenesLoad[7] != img)
                    nombreimagen8 = imagenesLoad[7].substr(46, 40);

                if (imagenesLoad[8] != img)
                    nombreimagen9 = imagenesLoad[8].substr(46, 40);

                if (imagenesLoad[9] != img)
                    nombreimagen10 = imagenesLoad[9].substr(46, 40);
            }
        }

        let numimages = numImg + contadorImg;
        if (datosimagenes.longitud > 0 && imgDuplicar == 0) {
            numimages = datosimagenes.longitud;
        }

        let funcionalidad = infoprod[0].funcionalidad;
        if (infoprod[0].funcionalidad == 1) {
            funcionalidad = "Baja";
        } else if (infoprod[0].funcionalidad == 2) {
            funcionalidad = "Regular";
        } else if (infoprod[0].funcionalidad == 3) {
            funcionalidad = "Buena";
        } else if (infoprod[0].funcionalidad == 4) {
            funcionalidad = "Excelente";
        }

        let loadimage = null;
        if (!imagen1) {
            loadimage = "No";
        } else loadimage = "Si";

        if (duplicarprd == 1 || duplicarprd == 2) {
            let row = {
                id: idPublication,
                productogenerico: generico,
                idproductovehiculo: IdVehPrd,
                tipovehiculo: vehproductos[0]?.tipovehiculo ? vehproductos[0]?.tipovehiculo : 0,
                carroceria: vehproductos[0]?.carroceria ? vehproductos[0]?.carroceria : 0,
                marca: vehproductos[0]?.marca ? vehproductos[0]?.marca : 0,
                anno: vehproductos[0]?.anno ? vehproductos[0]?.anno : 0,
                modelo: vehproductos[0]?.modelo ? vehproductos[0]?.modelo : 0,
                cilindrajemotor: vehproductos[0]?.cilindraje ? vehproductos[0]?.cilindraje : 0,
                tipocombustible: vehproductos[0]?.combustible ? vehproductos[0]?.combustible : 0,
                transmision: vehproductos[0]?.transmision ? vehproductos[0]?.transmision : 0,
                tipotraccion: vehproductos[0]?.traccion ? vehproductos[0]?.traccion : 0,
                turbocompresor: 0,
                posicionproducto: ubiposprod[0]?.posicionProducto,
                partedelvehiculo: ubiposprod[0]?.ubicacionProducto,
                titulonombre: infoprod[0]?.titulonombre,
                marcarepuesto: infoprod[0]?.marcarepuesto,
                condicion: infoprod[0]?.condicion,
                estadoproducto: infoprod[0]?.estadoproducto,
                vendeporpartes: infoprod[0]?.vendeporpartes,
                numerodeparte: infoprod[0]?.numerodeparte,
                funcionalidad: infoprod[0]?.funcionalidad,
                numerodeunidades: datpubli[0]?.numerodeunidades,
                precio: valorproducto,
                compatible: idvehiculoscompatible,
                descripcionproducto: datpubli[0]?.descripcionproducto,
                peso: parseInt(pesosinseparadores),
                alto: parseInt(altosinseparadores),
                ancho: parseInt(anchosinseparadores),
                largo: parseInt(largosinseparadores),
                ciudad: datpubli[0]?.ciudad,
                fechacreacion: fechaactual,
                descuento: formData.descuento,
                usuario: usuariologueado.uid,
                moneda: formData.moneda,
                estado: formData.estado,
                longitud: numImg + contadorImg,
                nombreimagen1: nombreimagen1 ? nombreimagen1 : null,
                imagen1: imagen1 ? imagen1 : null,
                nombreimagen2: nombreimagen2 ? nombreimagen2 : null,
                imagen2: imagen2 ? imagen2 : null,
                nombreimagen3: nombreimagen3 ? nombreimagen3 : null,
                imagen3: imagen3 ? imagen3 : null,
                nombreimagen4: nombreimagen4 ? nombreimagen4 : null,
                imagen4: imagen4 ? imagen4 : null,
                nombreimagen5: nombreimagen5 ? nombreimagen5 : null,
                imagen5: imagen5 ? imagen5 : null,
                nombreimagen6: nombreimagen6 ? nombreimagen6 : null,
                imagen6: imagen6 ? imagen6 : null,
                nombreimagen7: nombreimagen7 ? nombreimagen7 : null,
                imagen7: imagen7 ? imagen7 : null,
                nombreimagen8: nombreimagen8 ? nombreimagen8 : null,
                imagen8: imagen8 ? imagen8 : null,
                nombreimagen9: nombreimagen9 ? nombreimagen9 : null,
                imagen9: imagen9 ? imagen9 : null,
                nombreimagen10: nombreimagen10 ? nombreimagen10 : null,
                imagen10: imagen10 ? imagen10 : null,
            };

            //console.log("datPrd ORIGEN : ", datPrd)
            //console.log("DUPLICAR XXX : ", row)
            //AQUI
            //console.log("FUNCIONAILIAD : ", datPrd.funcionalidad, " - ", row.funcionalidad)

            //alert(datPrd.titulonombre)
            //alert(row.titulonombre)

            if (
                datPrd.carroceria === row.carroceria
                && datPrd.ciudad === row.ciudad
                && datPrd.descripcionproducto === row.descripcionproducto
                && datPrd.marcarepuesto === row.marcarepuesto
                && datPrd.moneda === row.moneda
                && datPrd.nombreimagen1 === row.nombreimagen1
                && datPrd.nombreimagen2 === row.nombreimagen2
                && datPrd.nombreimagen3 === row.nombreimagen3
                && datPrd.nombreimagen4 === row.nombreimagen4
                && datPrd.nombreimagen5 === row.nombreimagen5
                && datPrd.nombreimagen6 === row.nombreimagen6
                && datPrd.nombreimagen7 === row.nombreimagen7
                && datPrd.nombreimagen8 === row.nombreimagen8
                && datPrd.nombreimagen9 === row.nombreimagen9
                && datPrd.nombreimagen10 === row.nombreimagen10
                && datPrd.numerodeparte === row.numerodeparte
                && datPrd.numerodeunidades === row.numerodeunidades
                && datPrd.partedelvehiculo === row.partedelvehiculo
                && datPrd.precio === row.precio
                && datPrd.productogenerico === row.productogenerico
                && datPrd.tipocombustible === row.tipocombustible
                && datPrd.tipotraccion === row.tipotraccion
                && datPrd.tipovehiculo === row.tipovehiculo
                && datPrd.titulonombre === row.titulonombre
                && datPrd.transmision === row.transmision
                && !compara
                && !cambiacondicionprd
            ) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Recuerda, no puedes tener dos publicaciones identificas!"
                );
                return
            }

            /*
            if (//datPrd.alto === row.alto &&
                //datPrd.ancho === row.ancho &&
                //datPrd.anno === row.anno &&
                datPrd.carroceria === row.carroceria &&
                //datPrd.cilindrajemotor === row.cilindrajemotor &&
                datPrd.ciudad === row.ciudad &&
                //datPrd.compatible === row.compatible &&
                //datPrd.condicion === row.condicion &&
                datPrd.descripcionproducto === row.descripcionproducto &&
                //datPrd.descuento === row.descuento &&
                //datPrd.estado === row.estado &&
                //datPrd.estadoproducto === row.estadoproducto &&
                //datPrd.fechacreacion === row.fechacreacion &&
                //datPrd.funcionalidad === row.funcionalidad &&
                //datPrd.id === row.id &&
                //datPrd.idproductovehiculo === row.idproductovehiculo &&
                //datPrd.largo === row.largo &&
                //datPrd.longitud === row.longitud &&
                //datPrd.marca === row.marca &&
                datPrd.marcarepuesto === row.marcarepuesto &&
                //datPrd.modelo === row.modelo &&
                datPrd.moneda === row.moneda &&
                datPrd.nombreimagen1 === row.nombreimagen1 &&
                datPrd.nombreimagen2 === row.nombreimagen2 &&
                datPrd.nombreimagen3 === row.nombreimagen3 &&
                datPrd.nombreimagen4 === row.nombreimagen4 &&
                datPrd.nombreimagen5 === row.nombreimagen5 &&
                datPrd.nombreimagen6 === row.nombreimagen6 &&
                datPrd.nombreimagen7 === row.nombreimagen7 &&
                datPrd.nombreimagen8 === row.nombreimagen8 &&
                datPrd.nombreimagen9 === row.nombreimagen9 &&
                datPrd.nombreimagen10 === row.nombreimagen10 &&
                datPrd.numerodeparte === row.numerodeparte &&
                datPrd.numerodeunidades === row.numerodeunidades &&
                datPrd.partedelvehiculo === row.partedelvehiculo &&
                //datPrd.peso === row.peso &&
                //datPrd.posicionproducto === row.posicionproducto &&
                datPrd.precio === row.precio &&
                datPrd.productogenerico === row.productogenerico &&
                datPrd.tipocombustible === row.tipocombustible &&
                datPrd.tipotraccion === row.tipotraccion &&
                datPrd.tipovehiculo === row.tipovehiculo &&
                datPrd.titulonombre === row.titulonombre &&
                datPrd.transmision === row.transmision 
                //&&
                //datPrd.turbocompresor === row.turbocompresor &&
                //datPrd.usuario === row.usuario &&
                //datPrd.vendeporpartes === row.vendeporpartes
                ) {
                alert("IGUALES")
            }
                */

        }

        //alert("SIGUE")

        //return

        //alert(valorproducto)

        const formdata = new FormData();
        formdata.append("id", idPublication);
        formdata.append("productogenerico", generico);
        formdata.append("idproductovehiculo", IdVehPrd);
        formdata.append("tipovehiculo", vehproductos[0]?.tipovehiculo ? vehproductos[0]?.tipovehiculo : 0);
        formdata.append("carroceria", vehproductos[0]?.carroceria ? vehproductos[0]?.carroceria : 0);
        formdata.append("marca", vehproductos[0]?.marca ? vehproductos[0]?.marca : 0);
        formdata.append("anno", vehproductos[0]?.anno ? vehproductos[0]?.anno : 0);
        formdata.append("modelo", vehproductos[0]?.modelo ? vehproductos[0]?.modelo : 0);
        formdata.append("cilindrajemotor", vehproductos[0]?.cilindraje ? vehproductos[0]?.cilindraje : 0);
        formdata.append("tipocombustible", vehproductos[0]?.combustible ? vehproductos[0]?.combustible : 0);
        formdata.append("transmision", vehproductos[0]?.transmision ? vehproductos[0]?.transmision : 0);
        formdata.append("tipotraccion", vehproductos[0]?.traccion ? vehproductos[0]?.traccion : 0);
        formdata.append("turbocompresor", 0);
        formdata.append("posicionproducto", ubiposprod[0]?.posicionProducto);
        formdata.append("partedelvehiculo", ubiposprod[0]?.ubicacionProducto);
        formdata.append("titulonombre", infoprod[0]?.titulonombre);
        formdata.append("marcarepuesto", infoprod[0]?.marcarepuesto);
        formdata.append("condicion", infoprod[0]?.condicion);
        formdata.append("estadoproducto", infoprod[0]?.estadoproducto);
        formdata.append("vendeporpartes", infoprod[0]?.vendeporpartes);
        formdata.append("numerodeparte", infoprod[0]?.numerodeparte);
        formdata.append("funcionalidad", funcionalidad);
        formdata.append("numerodeunidades", datpubli[0]?.numerodeunidades);
        formdata.append("precio", valorproducto);
        formdata.append("compatible", idvehiculoscompatible);
        formdata.append("descripcionproducto", datpubli[0]?.descripcionproducto);
        formdata.append("peso", parseInt(pesosinseparadores));
        formdata.append("alto", parseInt(altosinseparadores));
        formdata.append("ancho", parseInt(anchosinseparadores));
        formdata.append("largo", parseInt(largosinseparadores));
        formdata.append("ciudad", datpubli[0]?.ciudad);
        formdata.append("fechacreacion", fechaactual);
        formdata.append("descuento", formData.descuento);
        formdata.append("usuario", usuariologueado.uid);
        formdata.append("moneda", formData.moneda);
        formdata.append("estado", formData.estado);
        formdata.append("longitud", numimages);
        formdata.append("nombreimagen1", nombreimagen1);
        formdata.append("imagen1", imagen1);
        formdata.append("nombreimagen2", nombreimagen2);
        formdata.append("imagen2", imagen2);
        formdata.append("nombreimagen3", nombreimagen3);
        formdata.append("imagen3", imagen3);
        formdata.append("nombreimagen4", nombreimagen4);
        formdata.append("imagen4", imagen4);
        formdata.append("nombreimagen5", nombreimagen5);
        formdata.append("imagen5", imagen5);
        formdata.append("nombreimagen6", nombreimagen6);
        formdata.append("imagen6", imagen6);
        formdata.append("nombreimagen7", nombreimagen7);
        formdata.append("imagen7", imagen7);
        formdata.append("nombreimagen8", nombreimagen8);
        formdata.append("imagen8", imagen8);
        formdata.append("nombreimagen9", nombreimagen9);
        formdata.append("imagen9", imagen9);
        formdata.append("nombreimagen10", nombreimagen10);
        formdata.append("imagen10", imagen10);
        formdata.append("loadimage", loadimage);
        /*
        let row = {
            id: idPublication,
            productogenerico: generico,
            idproductovehiculo: IdVehPrd,
            tipovehiculo: vehCompatibles[0].tipovehiculo,
            carroceria: vehCompatibles[0].carroceria,
            marca: vehCompatibles[0].marca,
            anno: vehCompatibles[0].anno,
            modelo: vehCompatibles[0].modelo,
            cilindrajemotor: vehCompatibles[0].cilindraje,
            tipocombustible: vehCompatibles[0].combustible,
            transmision: vehCompatibles[0].transmision,
            tipotraccion: vehCompatibles[0].traccion,
            turbocompresor: 0,
            posicionproducto: ubiposprod[0].posicionProducto,
            partedelvehiculo: ubiposprod[0].ubicacionProducto,
            titulonombre: infoprod[0].titulonombre,
            marcarepuesto: infoprod[0].marcarepuesto,
            condicion: infoprod[0].condicion,
            estadoproducto: infoprod[0].estadoproducto,
            vendeporpartes: infoprod[0].vendeporpartes,
            numerodeparte: infoprod[0].numerodeparte,
            funcionalidad: infoprod[0].funcionalidad,
            numerodeunidades: datpubli[0].numerodeunidades,
            precio: valorproducto,
            compatible: idvehiculoscompatible,
            descripcionproducto: datpubli[0].descripcionproducto,
            peso: parseInt(pesosinseparadores),
            alto: parseInt(altosinseparadores),
            ancho: parseInt(anchosinseparadores),
            largo: parseInt(largosinseparadores),
            ciudad: datpubli[0].ciudad,
            fechacreacion: fechaactual,
            descuento: formData.descuento,
            usuario: usuariologueado.uid,
            moneda: formData.moneda,
            estado: formData.estado,
            longitud: numImg + contadorImg,
            nombreimagen1: nombreimagen1,
            imagen1: imagen1,
            nombreimagen2: nombreimagen2,
            imagen2: imagen2,
            nombreimagen3: nombreimagen3,
            imagen3: imagen3,
            nombreimagen4: nombreimagen4,
            imagen4: imagen4,
            nombreimagen5: nombreimagen5,
            imagen5: imagen5,
            nombreimagen6: nombreimagen6,
            imagen6: imagen6,
            nombreimagen7: nombreimagen7,
            imagen7: imagen7,
            nombreimagen8: nombreimagen8,
            imagen8: imagen8,
            nombreimagen9: nombreimagen9,
            imagen9: imagen9,
            nombreimagen10: nombreimagen10,
            imagen10: imagen10,
        };
*/
        //console.log("PRDDDSDD : ", row);
        //return;
        //AQUI
        let codigo = 0;
        if (accion == "editar") {
            codigo = 1016;
        } else if (accion == "duplicar") {
            codigo = 16;
        }

        let url = "https://gimcloud.com.co/mrp/api";

        await fetch(`${url}/${codigo}`, {
            method: "POST",
            body: formdata,
            //headers: headers,
        }).then((response) => {
            setIsLoading(false);
            if (response) {
                if (response.status === 200) {
                    console.log("RESP CREA PRD : ", response);

                    async function noticarCrearPrd() {
                        let enlace = URL_MK_MR + "product/"+idvehiculoscompatible+"?redirect=2&ctlredirigir="+datauser.uid;
                        let imagen = "<p><strong><img src='https://gimcloud.com.co/files/mercadorepuesto/" + nombreimagen1 + "' alt='Mercado Repuesto' height='150 width=150' ></strong>.</p>";

                        const requestData = {
                            "remitente": datosusuarios.email,
                            "asunto": "¡FELICITACIONES TIENES UNA NUEVA PUBLICACIÓN!",
                            "plantilla": "info",
                            "to": "Mercado Repuesto",
                            "contenido_html": {
                                "title": imagen,
                                "subtitle": "Haz clic aquí, para ver la publicacion, " + enlace,
                                "body": infoprod[0].titulonombre,
                                "tipo": "01 "
                            }
                        };

                        const config = {
                            headers: {
                                "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                                "Content-Type": "application/json" || x < z
                            }
                        };

                        const sendRequest = async () => {
                            try {
                                const response = await axios.post("https://gimcloud.com.co/api/endpoint/mail", requestData, config);
                            } catch (error) {
                                console.error('Errorxx:', error);
                            }
                        }
                        sendRequest();
                    }
                    noticarCrearPrd();

                    const crearNotificaPrd = async () => {
                        const idnotificacion = Math.floor(Math.random() * 10000000);
                        let comentario = "FELICITACIONES TIENES UNA NUEVA PUBLICACIÓN";

                        let params = {
                            estado: 128,
                            uidusuario: datauser.uid,
                            idnotificacion: idnotificacion,
                            idorigen: idvehiculoscompatible,
                            comentario: comentario,
                            estado: 90,
                            ctlrnotificaentrada: 0,
                            ctlrnotificasalida: 0,
                            tiponotificacion: 13,
                        }

                        try {
                            const res = await axios({
                                method: "post",
                                url: URL_BD_MR + "823", params
                            });

                            console.log("RESDATAXXX : ", res.data)

                            if (res.data.type == 1) {
                                console.log("Notificación comprador creada")
                                //return;
                                //router.push("/");
                            }
                        } catch (error) {
                            console.error("Error creando Notificación", error);
                        }
                    };

                    crearNotificaPrd();

                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Fotos productos grabadas de forma correcta!"
                    );
                    setLoading(false);
                    //router.push("/");
                    //router.push("/CreateProduct/terminapublicacion");
                    router.push({
                        pathname: "/CreateProduct/terminapublicacion",
                        query: {
                            estadopublicacion: JSON.stringify(1),
                            idprd: IdVehPrd,
                            compatible: JSON.stringify(idvehiculoscompatible),
                            titulopublicacion: JSON.stringify(
                                infoprod[0].titulonombre
                            ),
                        },
                    });
                } else {
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Se presentaron inconvenientes al grabar los fotos, Intenta nuevamente!"
                    );
                    setLoading(false);
                    router.push("/");

                    //Router.push(`/search?keyword=${keyword}`);
                    //router.push("/CreateProduct/terminapublicacion");
                }
            } else {
                console.log("RESPONSE INGRESO FOTOS : ", response);
            }
        });
    };

    const onSelectFileAnt = (event) => {
        const selectedFiles = event.target.files;
        const validateFilesArray = Array.from(selectedFiles);

        let contdimen = true;
        let contproporuna = true;
        let tipo = true;

        let dimension = true;
        arraydimension = [];
        let long = validateFilesArray.length;
        let contador = 0;
        let alto = 0;
        let ancho = 0;
        let proporcionuna = true;
        let proporciondos = false;
        let contpropor = 0;

        validateFilesArray.map((file, index) => {
            var archivo, img;
            if (file.type.substring(0, 5) != "image") {
                tipo = false;
                contador = contador + 1;
                //console.log("TIPO ARCHIVO : ", file.type.substring(0, 5));
            }
            if (file.size > 1050000) {
                contdimen = false;
                contador = contador + 1;
                //console.log("TAMAÑO : ", file.size);
            } else {
                if ((archivo = file)) {
                    img = new Image();

                    img.onload = function () {
                        contador = contador + 1;

                        alto = this.height;
                        ancho = this.width;

                        let proaltominimo = 0;
                        let proaltomaximo = 0;
                        let proanchominimo = 0;
                        let proanchomaximo = 0;

                        if (
                            (ancho >= 1400 &&
                                ancho <= 1800 &&
                                alto >= 750 &&
                                alto <= 1050) ||
                            (ancho >= 750 &&
                                ancho <= 1050 &&
                                alto >= 1400 &&
                                alto <= 1800)
                        ) {
                            let proporcion = alto / ancho;
                            let promax = parseInt(1) + parseFloat(proporcion);

                            proaltominimo = (alto * proporcion).toFixed(0);
                            proaltomaximo = (alto * promax).toFixed(0);

                            proanchominimo = (ancho * proporcion).toFixed(0);
                            proanchomaximo = (ancho * promax).toFixed(0);
                            contpropor = proporcion;
                        } else {
                            if (contpropor == 0) {
                                if (ancho > alto) {
                                    proaltominimo = (alto * 0.7).toFixed(0);
                                    proaltomaximo = (alto * 1.4).toFixed(0);

                                    proanchominimo = (ancho * 0.7).toFixed(0);
                                    proanchomaximo = (ancho * 1.3).toFixed(0);
                                }

                                if (alto > ancho) {
                                    proaltominimo = (alto * 0.7).toFixed(0);
                                    proaltomaximo = (alto * 1.3).toFixed(0);

                                    proanchominimo = (ancho * 0.7).toFixed(0);
                                    proanchomaximo = (ancho * 1.4).toFixed(0);
                                }

                                if (alto == ancho) {
                                    proaltominimo = (alto * 0.9).toFixed(0);
                                    proaltomaximo = (alto * 1.1).toFixed(0);

                                    proanchominimo = (ancho * 0.9).toFixed(0);
                                    proanchomaximo = (ancho * 1.1).toFixed(0);
                                }

                                if (
                                    ancho >= proaltominimo &&
                                    ancho <= proaltomaximo
                                ) {
                                    proporcionuna = true;
                                } else {
                                    proporcionuna = false;
                                    contproporuna = false;
                                }

                                if (
                                    alto >= proanchominimo &&
                                    alto <= proanchomaximo
                                ) {
                                    proporcionuna = true;
                                } else {
                                    proporcionuna = false;
                                    contproporuna = false;
                                }

                                if (alto > 2400 || ancho > 2400) {
                                    contdimen = false;
                                    dimension = false;
                                } else dimension = true;
                            }
                        }

                        //onsole.log("ALTO UNO: ", proaltominimo);
                        //console.log("ALTO UNO: ", proaltomaximo);

                        //console.log("ANCHO UNO: ", proanchominimo);
                        //console.log("ANCHO UNO: ", proanchomaximo);
                        //return

                        let item = {
                            posicion: index,
                            ancho: ancho,
                            alto: alto,
                            dimension: dimension,
                            proporcionuna: proporcionuna,
                            proaltominimo: proaltominimo,
                            proaltomaximo: proaltomaximo,
                            proanchominimo: proanchominimo,
                            proanchomaximo: proanchomaximo,
                        };

                        arraydimension.push(item);
                        if (long == contador) {
                            if (!tipo || !contdimen || !contproporuna) {
                                console.log(
                                    "TIPO : ",
                                    tipo,
                                    "DIMENSION : ",
                                    contdimen,
                                    "PROPORCION : ",
                                    contproporuna
                                );

                                let texto = "";
                                let textouno = "";
                                let textodos = "";
                                let textotres = "";
                                let textocuatro = "";

                                texto =
                                    "Alguno(s) de los archivos no cumplen con las sugerencias";

                                if (!tipo) {
                                    textouno =
                                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png";
                                    setTextoFormato(
                                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png"
                                    );
                                }
                                if (!contdimen) {
                                    textodos =
                                        "- El tamaño máximo de las imágenes es 1024 x 1024";
                                    setTextoTamaño(
                                        "- El tamaño máximo de las imágenes es 1024 x 1024"
                                    );
                                }
                                if (!contproporuna) {
                                    textotres =
                                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho";
                                    setTextoDimension(
                                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho"
                                    );
                                }
                                if (long > 10) {
                                    textocuatro =
                                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)";
                                    setTextoLongitud(
                                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)"
                                    );
                                }

                                setShowModalMensajesImagenes(true);
                                setMostrarErrores(true);
                                setTituloMensajesImagenes(
                                    "No logramos subir algunas de tus imagenes, ten en cuenta que:"
                                );
                                setTextoMensajesImagenes(texto);
                                setTextoMensajesImagenesUno(textouno);
                                setTextoMensajesImagenesDos(textodos);
                                setTextoMensajesImagenesTres(textotres);
                                setTextoMensajesImagenesCuatro(textocuatro);
                            }
                            onSelectFile(
                                validateFilesArray,
                                arraydimension,
                                tipo,
                                contdimen,
                                contproporuna,
                                long
                            );
                        }
                    };
                    img.src = URL.createObjectURL(archivo);
                }
            }

            if (!tipo || !contdimen || !contproporuna) {
                let texto = "";
                let textouno = "";
                let textodos = "";
                let textotres = "";
                let textocuatro = "";

                setTextoDimension(null);
                setTextoTamaño(null);
                setTextoFormato(null);
                setTextoLongitud(null);

                texto =
                    "Alguno(s) de los archivos no cumplen con las sugerencias";

                if (!tipo) {
                    textouno =
                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png";
                    setTextoFormato(
                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png"
                    );
                }
                if (!contdimen) {
                    textodos =
                        "- El tamaño máximo de las imágenes es 1024 x 1024";
                    setTextoTamaño(
                        "- El tamaño máximo de las imágenes es 1024 x 1024"
                    );
                }
                if (!contproporuna) {
                    textotres =
                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho";
                    setTextoDimension(
                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho"
                    );
                }
                if (long > 10) {
                    textocuatro =
                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)";
                    setTextoLongitud(
                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)"
                    );
                }

                setShowControlUnError(true);
                setShowModalMensajesImagenes(true);
                setMostrarErrores(true);
                setTituloMensajesImagenes(
                    "No logramos subir algunas de tus imagenes, ten en cuenta que:"
                );
                setTextoMensajesImagenes(texto);
                setTextoMensajesImagenesUno(textouno);
                setTextoMensajesImagenesDos(textodos);
                setTextoMensajesImagenesTres(textotres);
                setTextoMensajesImagenesCuatro(textocuatro);
            }
        });
    };

    //const onSelectFile = (event, arraydimension) => {
    const onSelectFile = (
        validateFilesArray,
        arraydimension,
        tipo,
        contdimen,
        contproporuna,
        longmaxima
    ) => {
        let imagesArraySelected = [];
        let contimg = 0;

        let imgbig = "";
        let contadordos = 0;
        let valtamaño = false;
        let valformato = false;
        let dimension = false;

        let controlvaltamaño = false;
        let controlvalformato = false;

        validateFilesArray &&
            validateFilesArray.map((file, index) => {
                let dimension = false;
                let proporcionuna = false;

                arraydimension &&
                    arraydimension.map((item, ind) => {
                        if (item.posicion == index) {
                            //console.log("FILE : ", file.name, "-", item);
                            dimension = item.dimension;
                            proporcionuna = item.proporcionuna;
                        }
                    });

                if (dimension && proporcionuna) {
                    if (file.size > 800000) {
                        valtamaño = true;
                        controlvaltamaño = true;
                    }

                    if (file.type.substring(0, 5) != "image") {
                        valformato = true;
                        controlvalformato = true;
                    }

                    if (file.size <= 800000) {
                        if (file.type.substring(0, 5) == "image") {
                            contimg = contimg + 1;
                            if (contimg <= 10) {
                                imagesArraySelected.push(file);
                            }
                        }
                    }
                }
            });

        let contador = 0;
        let arraynew = [];

        //console.log("BASE ARCH : ", baseArchives)
        if (baseArchives.length > 0) {
            baseArchives &&
                baseArchives.map((item, index) => {
                    contador = contador + 1;
                    if (contador <= 10) arraynew.push(item);
                });

            //console.log("ARCH SELECT: ", imagesArraySelected)
            imagesArraySelected &&
                imagesArraySelected.map((file, index) => {
                    contador = contador + 1;
                    if (contador <= 10) {
                        arraynew.push(file);
                    }
                });

            setBaseArchives(arraynew);
            setSelectedArchives(arraynew);
            setContadorImg(arraynew.length);
        } else {
            setBaseArchives(imagesArraySelected);
            setSelectedArchives(imagesArraySelected);

            setContadorImg(imagesArraySelected.length);
        }

        if (duplicarprd == 1 || duplicarprd == 2) {
            let nvo = [];
            let uno = [];
            let dos = [];
            let tres = [];
            let longitud = imagesArraySelected.length;

            let arraybase = imagenesLoad;
            //setImagenesLoad([]);
            arraybase &&
                arraybase.map((row, index) => {
                    if (index < longitud) {
                        uno.push(row);
                        dos.push(img);
                    } else {
                        nvo.push(row);
                    }
                });

            dos &&
                dos.map((row, index) => {
                    tres.push(row);
                });

            console.log("UNO : ", tres);

            uno &&
                uno.map((row, index) => {
                    tres.push(row);
                });
            console.log("DOS : ", tres);
            let largo = tres.length;
            let cont = largo;
            nvo &&
                nvo.map((row, index) => {
                    if (cont < 10) {
                        tres.push(row);
                        cont = cont + 1;
                    }
                });

            console.log("TRES : ", tres);
            setImagenesLoad(tres);
            contadorimg = tres.length;
            setContadorImg(tres.length);
        }
    };

    const borrarImagenes = (pos, numreg) => {
        setMostrarDocumentoUno(false);
        setMostrarDocumentoDos(false);
        setMostrarDocumentoTres(false);
        setMostrarDocumentoCuatro(false);
        setMostrarDocumentoCinco(false);
        setMostrarDocumentoSeis(false);
        setMostrarDocumentoSiete(false);
        setMostrarDocumentoOcho(false);
        setMostrarDocumentoNueve(false);
        setMostrarDocumentoDiez(false);

        let imagenes = selectedArchives;
        let nvo = [];

        imagenes &&
            imagenes.map((row, index) => {
                if (index != pos) {
                    nvo.push(row);
                }
            });

        let long = nvo.length - 1;
        let array = [];
        imagenesLoad &&
            imagenesLoad.map((row, index) => {
                if (index <= long) {
                    array.push(img);
                } else if (row != img) {
                    array.push(row);
                }
            });
        let longnvo = 10 - array.length;

        for (var i = 0; i < longnvo; i++) {
            array.push(img);
        }

        //console.log("ARRAY NVO CC : ", array);
        setImagenesLoad(array);
        setSelectedArchives(nvo);
        setBaseArchives(nvo);

        setContadorImg(nvo.length);
    };

    const borrarImagenesLoad = (pos, numreg) => {
        let nvo = [];

        if (contadorImg == 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Recuerda, debes incluir como mínimo una imagen!");
            setSelectedArchives([]);
            return;
        }
        imagenesLoad &&
            imagenesLoad.map((row, index) => {
                if (index != pos && index < 10) {
                    nvo.push(row);
                }
            });
        let borraimg = imgDuplicar - 1;
        setImgDuplicar(borraimg);
        contadorimg = pos;
        setContadorImg(pos);
        let numitem = 10 - contadorimg;
        for (var i = 0; i < numitem; i++) {
            if (nvo.length < 10) nvo.push(img);
        }

        setImagenesLoad(nvo);
    };

    const actualizaImagenes = () => {
        if (selectedArchives.length > 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Recuerda, maximo 10 archivos!");
            setSelectedArchives([]);
            return;
        }

        if (selectedArchives.length === 1) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
        } else if (selectedArchives.length === 2) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
        } else if (selectedArchives.length === 3) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
        } else if (selectedArchives.length === 4) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
        } else if (selectedArchives.length === 5) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
        } else if (selectedArchives.length === 6) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
        } else if (selectedArchives.length === 7) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
        } else if (selectedArchives.length === 8) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
        } else if (selectedArchives.length === 9) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
            setImgNueve(URL.createObjectURL(baseArchives[8]));
        } else if (selectedArchives.length === 10) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
            setImgNueve(URL.createObjectURL(baseArchives[8]));
            setImgDiez(URL.createObjectURL(baseArchives[9]));
        }
    };

    useEffect(() => {
        if (selectedArchives.length > 0) {
            if (selectedArchives.length === 1) {
                setImgDos(img);
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 2) {
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 3) {
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 4) {
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 5) {
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 6) {
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 7) {
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 8) {
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 9) {
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(true);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 10) {
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(true);
                setMostrarDocumentoDiez(true);
            } else {
                setImgUno(img);
                setImgDos(img);
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(false);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            }
            actualizaImagenes();
        } else {
            setImgUno(img);
            setImgDos(img);
            setImgTres(img);
            setImgCuatro(img);
            setImgCinco(img);
            setImgSeis(img);
            setImgSiete(img);
            setImgOcho(img);
            setImgNueve(img);
            setImgDiez(img);
            if (duplicarprd == 0) {
                setMostrarDocumentoUno(false);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            }
        }
    }, [selectedArchives]);

    const verMas = () => {
        setMostrarMas(true);
        setCajaFotos("cajafotosproductosampliada ps-page__header mt-25");
    };

    const verMenos = () => {
        setMostrarMas(false);
        setCajaFotos("cajafotosproductos ps-page__header mt-25");
    };

    //console.log("ESTADI : ", showModalMensajesImagenes)

    const reiniciar = () => {
        setMostrarErrores(false);
        let tem = "";
        setValor(tem);
    };

    const showErrorImg = () => {
        setresultImgLoad(true);
        setCajaFotos("cajafotosproductoserrores ps-page__header mt-25");
    };

    const showSuggestionsImg = () => {
        setresultImgLoad(false);

        if (mostrarErrores && !resultImgLoad && showControlUnError)
            setCajaFotos("cajafotosproductosampliadados ps-page__header mt-25");
        else setCajaFotos("cajafotosproductosampliada ps-page__header mt-25");
    };

    const iramispublicaciones = () => {
        router.push("/publication");
    };

    useEffect(() => {
        if (mostrarErrores && resultImgLoad) {
            if (showControlUnError)
                setCajaFotos(
                    "cajafotosproductoserroresdos ps-page__header mt-25"
                );
            else
                setCajaFotos("cajafotosproductoserrores ps-page__header mt-25");
        }
    }, [mostrarErrores]);

    useEffect(() => {
        if (duplicarprd == 1 || duplicarprd == 2) {
            let long = selectedArchives.length - 1;
            let longimg = 0;
            imagenesLoad &&
                imagenesLoad.map((row, index) => {
                    if (img != row && index > long) {
                        longimg = index + 1;
                    }
                });

            contadorimg = longimg;
            setContadorImg(longimg);
        }
    }, [imagenesLoad, selectedArchives]);

    useEffect(() => {
        contadortexto = 0;
        if (textoDimension) {
            contadortexto = contadortexto + 1;
        }
        if (textoTamaño) {
            contadortexto = contadortexto + 1;
        }
        if (textoFormato) {
            contadortexto = contadortexto + 1;
        }
        if (textoLongitud) {
            contadortexto = contadortexto + 1;
        }
        if (contadortexto < 3) {
            mensajeUno = "textoventanamensajesimagenes pt-30";
            mensajeDos = "textoventanamensajesimagenesdos pt-30";
        } else {
            mensajeUno = "textoventanamensajesimagenes";
            mensajeDos = "textoventanamensajesimagenesdos";
        }
    }, [textoDimension, textoTamaño, textoFormato, textoLongitud]);

    //console.log("ID PUBLICACTION : ", idPublication);

    return (
        <div className={cajaFotos}>
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesImagenes
                shown={showModalMensajesImagenes}
                close={setShowModalMensajesImagenes}
                titulo={tituloMensajesImagenes}
                textouno={textoMensajesImagenesUno}
                textodos={textoMensajesImagenesDos}
                textotres={textoMensajesImagenesTres}
                textocuatro={textoMensajesImagenesCuatro}
                mensaje={textoMensajesImagenes}
                contadortexto={contadortexto}
                mensajeUno={mensajeUno}
                mensajeDos={mensajeDos}
                tipo="1"
            />

            <Row>
                <Col xl={7} lg={7} md={7} sm={7}>
                    <div>
                        <h3 className="ml-25 tituloadvertenciaproductosizquierda mt-15 mb-15">
                            Ingresa fotos del producto - mínimo una
                        </h3>
                    </div>
                </Col>
            </Row>

            {isLoading ? (
                <LoadingGrabarProducto />
            ) : (
                <form onChange={onChange} className="ml-25">
                    <Form.Group
                        controlId="formFileMultiple"
                        className="ps-form__group">
                        <div className="ml-8">
                            <Row>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoUno ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgUno
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        0,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 1 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[0]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    0,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoDos ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgDos
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        1,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 2 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[1]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    1,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputUno">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputUno"
                                                            name="imagesuno"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoTres ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgTres
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        2,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 3 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[2]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    2,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputDos">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputDos"
                                                            name="imagesdos"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>

                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoCuatro ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        1 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgCuatro
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        3,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 4 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[3]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    3,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputTres">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputTres"
                                                            name="imagestres"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                {console.log("MOSTAR 5 : ", imagenesLoad[4])}

                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoCinco ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        1 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgCinco
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        4,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 5 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[4]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    4,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputCuatro">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputCuatro"
                                                            name="imagescuatro"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="mt-15 ml-8">
                            <Row>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoSeis ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgSeis
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        5,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 6 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[5]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    5,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputCinco">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputCinco"
                                                            name="imagescinco"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoSiete ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgSiete
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        6,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 7 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[6]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    6,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputSeis">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputSeis"
                                                            name="imagesseis"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoOcho ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgOcho
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        7,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 8 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[7]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    7,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputSiete">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputSiete"
                                                            name="imagessiete"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoNueve ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        1 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgNueve
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        8,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 9 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[8]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    8,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputOcho">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputOcho"
                                                            name="imagesocho"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div className="image-upload">
                                        {mostrarDocumentoDiez ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={index}>
                                                                    {index ==
                                                                        2 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgDiez
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    borrarImagenes(
                                                                                        9,
                                                                                        1
                                                                                    )
                                                                                }>
                                                                                <h4 className="apuntador">
                                                                                    X
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                {contadorImg >= 10 ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                imagenesLoad[9]
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenesLoad(
                                                                    9,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-inputNueve">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={img}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-inputNueve"
                                                            name="imagesnueve"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            type="file"
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            //style={{ display: "none" }}
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form.Group>
                </form>
            )}
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <br />
                </div>
            )}

            <div className="ml-32 mtmenos20">
                <Row>
                    {!resultImgLoad ? (
                        <Col xl={12} lg={12} xs={12} md={12}>
                            <div>
                                <p className="textosugerencia mtmenos5">
                                    **Ten en cuenta que:
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    Recomendaciones para que tu publicación
                                    tenga más visualizaciones:
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - Debes agregar como minimo una(01) imagen y
                                    como máximo diez(10)
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - El tamaño máximo de las imágenes es 1024 x
                                    1024
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - La proporción de las imagenes debe ser de
                                    4:3, es decir 4 unidades de alto por 3 de
                                    ancho
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - Cada imagen debe tener un peso máximo de
                                    800KB
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - Tus imagenes deben ser en formato jpg,
                                    jpeg o png
                                </p>
                                {!mostrarMas ? (
                                    <p
                                        className="subrayartextoclicaqui mtmenos7 apuntador"
                                        onClick={() => verMas()}>
                                        Ver mas...
                                    </p>
                                ) : (
                                    <a>
                                        <p className="textosugerencia mtmenos7">
                                            - El fondo de las imágenes debe ser
                                            color blanco o gris claro
                                        </p>
                                        <p className="textosugerencia mtmenos5">
                                            - Las imágenes deben se cuadradas,
                                            optimo 1024 x 1024
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - Las imágenes deben llenar al menos
                                            el 85% o más del marco de la imagen
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - La imagen debe estar enfocada
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - No incluir datos de promoción en
                                            las imágenes
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - No incluir datos de teléfonos
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - No incluir datos de contactos
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - Las imágenes deben ser nítidas
                                        </p>
                                        <p
                                            className="subrayartextoclicaqui mtmenos7 apuntador"
                                            onClick={() => verMenos()}>
                                            Ver menos...
                                        </p>
                                    </a>
                                )}
                            </div>
                        </Col>
                    ) : (
                        <Col xl={12} lg={12} xs={12} md={12}>
                            <div>
                                <p className="mtmenos5 textosugerenciaalert">
                                    ** No logramos subir algunas de tus
                                    imagenes, ten en cuenta que:
                                </p>
                                <p className="mtmenos5 textosugerenciaalert">
                                    {textoLongitud}
                                </p>
                                <p className="mtmenos5 textosugerenciaalert">
                                    {textoFormato}
                                </p>
                                <p className="mtmenos7 textosugerenciaalert">
                                    {textoDimension}
                                </p>
                                <p className="mtmenos7 textosugerenciaalert">
                                    {textoTamaño}
                                </p>
                            </div>
                        </Col>
                    )}

                    <Col xl={12} lg={12} xs={12} md={12}>
                        {mostrarErrores ? (
                            !resultImgLoad ? (
                                <p
                                    className="mt-10 mtmenos2 subrayartextoclicaqui apuntador"
                                    onClick={() => showErrorImg()}>
                                    Ver errores cargue imagenes...
                                </p>
                            ) : (
                                <p
                                    className="mtmenos2 subrayartextoclicaqui apuntador"
                                    onClick={() => showSuggestionsImg()}>
                                    Ver recomendaciones cargue imagenes...
                                </p>
                            )
                        ) : null}
                    </Col>
                </Row>
                <Row>
                    <Col xl={6} lg={6} xs={6} md={6}></Col>
                    <Col xl={3} lg={3} xs={3} md={3}>
                        {duplicarprd == 1 || duplicarprd == 2 ? (
                            <Button
                                variant="outline-light"
                                className="ps-btn mtmenos10 redondearborde baseinputdos colortextoselect"
                                onClick={() => iramispublicaciones()}>
                                {" "}
                                Ir a mis publicaciones
                            </Button>
                        ) : (
                            <Button
                                variant="outline-light"
                                onClick={cancelar}
                                className="ml-20 mtmenos10 colortextoselect ps-btn baseinput redondearborde">
                                {" "}
                                Cancelar{" "}
                            </Button>
                        )}
                    </Col>
                    <Col xl={2} lg={2} xs={2} md={2}>
                        <div
                            className="ml-20 mtmenos20 ps-btn redondearborde"
                            //onClick={() => creaProducto()}
                            onClick={generabase64}>
                            Publicar
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        id: 0,
        productogenerico: 0,
        tipoVeh: 0,
        carroceria: 0,
        marca: 0,
        anno: 0,
        modelo: 0,
        cilindrajemotor: 0,
        tipocombustible: 0,
        transmision: 0,
        ciudad: 0,
        fechacreacion: "",
        partedelVeh: "",
        posicionproducto: "",
        titulonombre: "",
        marcarepuesto: "",
        condicion: "",
        estadoproducto: "",
        numerodeunidades: "",
        precio: "",
        numerodeparte: 0,
        compatible: "",
        descripcionproducto: "",
        vendeporpartes: "",
        peso: 0,
        largo: 0,
        ancho: 0,
        alto: 0,
        tipotraccion: 0,
        turbocompresor: 0,
        descuento: 0,
        usuario: 1,
        moneda: 0,
        estado: 31,
        numerodeimagenes: 0,
        nombreimagen1: "",
        nombreimagen2: "",
        nombreimagen3: "",
        nombreimagen4: "",
        nombreimagen5: "",
        nombreimagen6: "",
        nombreimagen7: "",
        nombreimagen8: "",
        nombreimagen9: "",
        nombreimagen10: "",
    };
}

export default RegistrarFotos;
