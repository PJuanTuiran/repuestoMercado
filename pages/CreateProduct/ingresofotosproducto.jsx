import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import shortid from "shortid";
import { useRouter } from "next/router";
import Loading from "~/components/elements/Loading";
import img from "../../public/imagesupload/uploadimage.png";
import eliminar from "../../public/imagesupload/eliminar.png";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ModalMensajes from "../mensajes/ModalMensajes";

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

function IngresoFotosProducto(props) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [
        showModalMensajesPersonaJuridica,
        setShowModalMensajesPersonaJuridica,
    ] = useState(false);

    const { setShowModalFotos, showModalFotos } = props;
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

    const [images, setImages] = useState([]);

    const [selectedArchives, setSelectedArchives] = useState([]);
    const [baseArchives, setBaseArchives] = useState([]);

    // Lee Caracteristicas del Vehiculo seleccionado
    const caracteristicasvehiculo = useSelector(
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
    const datosubicarproducto = useSelector(
        (state) => state.ubicarproducto.ubicarproducto
    );
    const usuariologueado = useSelector((state) => state.userlogged.userlogged);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const generabase64 = async () => {
        if (!fileName) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "La Visibilidad de tu producto depende de las fotos, Ingresa como minimo una!"
            );
            return;
        }

        const recorreImagen = async () => {
            let longitud = fileName.length;
            let arreglofotos = [];
            let contador = 0;
            await Array.from(fileName).forEach((archivo) => {
                var reader = new FileReader();
                reader.readAsDataURL(archivo);
                reader.onload = function () {
                    var base64 = reader.result;
                    arreglofotos[contador] = base64;
                    //console.log("BASE 64 : ", base64.substring(base64.indexOf('/') + 1, base64.indexOf(';base64')));
                    var extension =
                        "." +
                        base64.substring(
                            base64.indexOf("/") + 1,
                            base64.indexOf(";base64")
                        );
                    contador = contador + 1;

                    if (contador === longitud) {
                        //console.log("CONTADOR : ", contador);
                        //console.log("LONGITUD : ", longitud);
                        setLoading(true);
                        grabarfoto(arreglofotos, extension);
                    }
                };
            });
        };
        recorreImagen();
    };

    const grabarfoto = async (dato, ext) => {
        //console.log("IMAGEN EN PRUEBA : ", dato[1]);

        let longitud = dato.length;
        let datoimagen;
        let nombrefoto = shortid();
        //console.log("LONGITUD FOTO : ", longitud);
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

        //console.log("DATOS IMAGEN : ", datoimagen);
        //return;
        creaProducto(datoimagen);
    };

    const creaProducto = async (datosimagenes) => {
        // POST request using axios with async/await

        //console.log("DATOS IMAGENES : ", datosimagenes);
        //return;
        const formdata = new FormData();
        formdata.append("id", 0);
        formdata.append(
            "productogenerico",
            caracteristicasvehiculo.productogenerico
        );
        formdata.append("tipovehiculo", caracteristicasvehiculo.tipovehiculo);
        formdata.append("carroceria", caracteristicasvehiculo.carroceria);
        formdata.append("marca", caracteristicasvehiculo.marca);
        formdata.append("anno", caracteristicasvehiculo.anno);
        formdata.append("modelo", caracteristicasvehiculo.modelo);
        formdata.append(
            "cilindrajemotor",
            caracteristicasmotor.cilindradamotor
        );
        formdata.append(
            "tipocombustible",
            caracteristicasmotor.tipocombustible
        );
        formdata.append("transmision", caracteristicasmotor.tipotransmision);
        formdata.append("tipotraccion", caracteristicasmotor.traccionmotor);
        formdata.append("turbocompresor", caracteristicasmotor.turbomotor);
        formdata.append("posicionproducto", datosubicarproducto.ubicarPosicion);
        formdata.append("partedelvehiculo", datosubicarproducto.ubicarProducto);
        formdata.append("posicionproducto", datosubicarproducto.ubicarPosicion);
        formdata.append("titulonombre", datosproductouno.titulonombre);
        formdata.append("marcarepuesto", datosproductouno.marcarepuesto);
        formdata.append("condicion", datosproductouno.condicion);
        formdata.append(
            "estadoproducto",
            datosproductouno.calificacionproducto
        );
        formdata.append("numerodeunidades", datosproductodos.numerodeunidades);
        formdata.append("precio", datosproductodos.precio);
        formdata.append("numerodeparte", datosproductouno.numerodeparte);
        formdata.append("compatible", datosproductouno.compatible);
        formdata.append(
            "descripcionproducto",
            datosproductodos.descripcionproducto
        );
        formdata.append("vendeporpartes", datosproductodos.vendeporpartes);
        formdata.append("peso", datosproductodos.peso);
        formdata.append("largo", datosproductodos.largo);
        formdata.append("ancho", datosproductodos.ancho);
        formdata.append("alto", datosproductodos.alto);
        formdata.append("descuento", formData.descuento);
        formdata.append("usuario", usuariologueado.uid);
        formdata.append("moneda", formData.moneda);
        formdata.append("estado", formData.estado);
        formdata.append("longitud", datosimagenes.longitud);
        formdata.append("nombreimagen1", datosimagenes.nombreimagen1);
        formdata.append("imagen1", datosimagenes.imagen1);
        formdata.append("nombreimagen2", datosimagenes.nombreimagen2);
        formdata.append("imagen2", datosimagenes.imagen2);
        formdata.append("nombreimagen3", datosimagenes.nombreimagen3);
        formdata.append("imagen3", datosimagenes.imagen3);
        formdata.append("nombreimagen4", datosimagenes.nombreimagen4);
        formdata.append("imagen4", datosimagenes.imagen4);
        formdata.append("nombreimagen5", datosimagenes.nombreimagen5);
        formdata.append("imagen5", datosimagenes.imagen5);
        formdata.append("nombreimagen6", datosimagenes.nombreimagen6);
        formdata.append("imagen6", datosimagenes.imagen6);
        formdata.append("nombreimagen7", datosimagenes.nombreimagen7);
        formdata.append("imagen7", datosimagenes.imagen7);
        formdata.append("nombreimagen8", datosimagenes.nombreimagen8);
        formdata.append("imagen8", datosimagenes.imagen8);
        formdata.append("nombreimagen9", datosimagenes.nombreimagen9);
        formdata.append("imagen9", datosimagenes.imagen9);
        formdata.append("nombreimagen10", datosimagenes.nombreimagen10);
        formdata.append("imagen10", datosimagenes.imagen10);

        console.log("FORM DATA : ", formdata);

        //console.log("DATOS CREACION DE PRODUCTO : ", producto);
        let url = "https://gimcloud.com.co/mrp/api";

        await fetch(`${url}/16`, {
            method: "POST",
            body: formdata,
            //headers: headers,
        }).then((response) => {
            if (response) {
                //console.log("VALOR RESPONSE : ", response);
                if (response.status === 200) {
                    setShowModalMensajes(true);
                    setTituloMensajes("Mercado Repuesto");
                    setTextoMensajes(
                        "Fotos productos grabadas de forma correcta!"
                    );
                    //console.log("VALOR QUE RETORNA 200 : ", response.status);
                    setLoading(false);
                    router.push("/");
                } else {
                    setShowModalMensajes(true);
                    setTituloMensajes("Mercado Repuesto");
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

    const onSelectFile = (event) => {
        console.log("EVENT FILE : ", event.target.files);

        if (selectedArchives.length > 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Mercado Repuesto");
            setTextoMensajes("Recuerda, maximo diez archivos!");
            return;
        }

        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        let longitud = baseArchives.length;

        //return

        const newDet = [];
        if (!baseArchives) {
            setBaseArchives(selectedFilesArray);
        } else newDet.push.apply(baseArchives, selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file.name;
            //return URL.createObjectURL(file);
        });

        //console.log("NOMBRE ARCHIVO : ", selectedFiles);

        // Selected Files se actualiza con el ingreso o borrado, por eso se deben igualar
        //if(selectedFilesArray.length != baseArchives.length){
        //    setBaseArchives(selectedFilesArray)
        //}

        setSelectedArchives((previousImages) =>
            previousImages.concat(imagesArray)
        );
    };

    const actualizaImagenes = () => {
        if (selectedArchives.length > 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Mercado Repuesto");
            setTextoMensajes("Recuerda, maximo 10 archivos!");
            setLoading(false);
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

        //console.log("LONGITUD BASE : ", baseArchives.length)
        //console.log("DOCUMENTOS SELECTED : ", selectedArchives);
        //console.log("DOCUMENTOS BASE : ", baseArchives);
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
    }, [selectedArchives]);

    const onCloseModalFotosProducto = () => {
        setShowModalFotos(false);
    };

    //show={true //showModalFotos}
    return (
        <div className="ps-page__header">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <div>
                <Modal className="modalfotosproductos" show={showModalFotos}>
                    <Modal.Body>
                        <div className="ml-165">
                            <Row>
                                <Col xl={8} lg={8} md={8} sm={8}>
                                    <div className="tamañotextocrearproducto">
                                        SUBIR FOTOS DEL PRODUCTO
                                    </div>
                                </Col>
                                <Col
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    sm={1}
                                    className="ml-10 mt-20">
                                    <button
                                        type="button"
                                        className="cerrarmodal"
                                        data-dismiss="modal"
                                        onClick={onCloseModalFotosProducto}>
                                        {" "}
                                        X{" "}
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <br />
                        <form onChange={onChange}>
                            <div className="ps-form--review">
                                <div className="ps-form__group">
                                    <Form.Group
                                        controlId="formFileMultiple"
                                        className="ps-form__group">
                                        {/*
                                            <Form.Label>
                                            <h3>
                                                Por favor subir los documentos
                                                para activar tu cuenta
                                            </h3>
                                        </Form.Label>
                                        */}
                                        <div className="ml-10">
                                            <Row>
                                                <Col
                                                    className="ml-20"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoUno ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    0 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgUno
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />

                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-input">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgUno.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-input"
                                                                    name="images"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoDos ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    0 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgDos
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputUno">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgDos.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputUno"
                                                                    name="imagesuno"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoTres ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    0 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgTres
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputDos">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgTres.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputDos"
                                                                    name="imagesdos"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoCuatro ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    1 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgCuatro
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputTres">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgCuatro.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputTres"
                                                                    name="imagestres"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoCinco ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    2 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgCinco
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputCuatro">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgCinco.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputCuatro"
                                                                    name="imagescuatro"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="mt-15 ml-10">
                                            <Row>
                                                <Col
                                                    className="ml-20"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoSeis ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    0 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgSeis
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputCinco">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgSeis.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputCinco"
                                                                    name="imagescinco"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoSiete ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    0 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgSiete
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputSeis">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgSiete.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputSeis"
                                                                    name="imagesseis"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoOcho ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    0 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgOcho
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputSiete">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgOcho.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputSiete"
                                                                    name="imagessiete"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoNueve ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    1 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgNueve
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputOcho">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgNueve.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputOcho"
                                                                    name="imagesocho"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col
                                                    className="espacioimagenproducto"
                                                    xl={2}
                                                    lg={2}
                                                    sm={2}
                                                    md={2}>
                                                    <div className="image-upload">
                                                        {mostrarDocumentoDiez ? (
                                                            <div>
                                                                {selectedArchives &&
                                                                    selectedArchives.map(
                                                                        (
                                                                            archive,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        archive
                                                                                    }>
                                                                                    {index ==
                                                                                    2 ? (
                                                                                        <div>
                                                                                            <img
                                                                                                className="tamañoimagenuploadproducto"
                                                                                                src={
                                                                                                    imgDiez
                                                                                                }
                                                                                                alt="Seleccionar Archivo"
                                                                                            />
                                                                                            <div>
                                                                                                <button
                                                                                                    className="botonborrararchivo"
                                                                                                    onClick={() =>
                                                                                                        setSelectedArchives(
                                                                                                            selectedArchives.filter(
                                                                                                                (
                                                                                                                    e
                                                                                                                ) =>
                                                                                                                    e !==
                                                                                                                    archive
                                                                                                            )
                                                                                                        )
                                                                                                    }>
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                    {
                                                                                        // <p>{index + 1}</p>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label for="file-inputNueve">
                                                                    <img
                                                                        className="tamañoimagenupload"
                                                                        src={
                                                                            imgDiez.src
                                                                        }
                                                                        alt="Seleccionar Archivo"
                                                                    />
                                                                    <div className="inputtextobotondoctojuridica">
                                                                        Ingresar
                                                                        Documento
                                                                    </div>
                                                                </label>
                                                                <input
                                                                    id="file-inputNueve"
                                                                    name="imagesnueve"
                                                                    type="file"
                                                                    onChange={
                                                                        onSelectFile
                                                                    }
                                                                    multiple
                                                                    //style={{ display: "none" }}
                                                                    accept="image/png, image/jpeg, application/pdf"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </form>
                        {loading ? (
                            <Loading />
                        ) : (
                            <div>
                                <br />
                            </div>
                        )}
                    </Modal.Body>

                    <div className="botongrabarproducto">
                        <Row>
                            <Col xs lg={5}>
                                <div>
                                    <p className="ps-form__text">
                                        Incluye como mínimo una foto!
                                    </p>
                                </div>
                            </Col>
                            <Col xs lg={4}>
                                <div className="ps-btn" onClick={generabase64}>
                                    Grabar Producto
                                </div>
                            </Col>
                            <Col xs lg={1}>
                                <Button
                                    className="ps-btn ps-btn--warning"
                                    onClick={() => setShowModalFotos(false)}>
                                    {" "}
                                    Cancelar{" "}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        id: 0,
        productogenerico: 0,
        tipovehiculo: 0,
        carroceria: 0,
        marca: 0,
        anno: 0,
        modelo: 0,
        cilindrajemotor: 0,
        tipocombustible: 0,
        transmision: 0,
        partedelvehiculo: "",
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

export default IngresoFotosProducto;
