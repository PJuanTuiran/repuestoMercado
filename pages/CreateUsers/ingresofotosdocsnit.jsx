import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateTokenRepository from "~/repositories/UpdateTokenRepository";
import TokenRegistroRepository from "~/repositories/TokenRegistroRepository";
import ActivateUserRepository from "~/repositories/ActivateUserRepository";
import grabarPDFsNitRepository from "~/repositories/grabarPDFsNitRepository";
import shortid from "shortid";
import { useRouter } from "next/router";
import Loading from "~/components/elements/Loading";
import Moment from "moment";
//import img from "../../public/imagesupload/upload.png";
import img from "../../public/imagesupload/uploadimage.png";
import eliminar from "../../public/imagesupload/eliminar.png";
//Firebase
import firebase from "../../utilities/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesImgNit from "../mensajes/ModalMensajesImgNit";
import { getRefreshPage } from "../../store/refreshpage/action";

import {
    Select,
    Modal,
    Button,
    Row,
    Col,
    ButtonGroup,
    Form,
    Card,
    CardGroup,
} from "react-bootstrap";

function IngresoFotosDocsNit(props) {
    const { setShowModalFotos, showModalFotos, setSubirDocsNit, idUid, email } =
        props;

    const dispatch = useDispatch();
    const router = useRouter();
    const [imgUno, setImgUno] = useState(img);
    const [imgDos, setImgDos] = useState(img);
    const [imgTres, setImgTres] = useState(img);
    const [selectedArchives, setSelectedArchives] = useState([]);
    const [baseArchives, setBaseArchives] = useState([]);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [formDataToken, setFormDataToken] = useState(defaultValueToken());
    const [showModal, setShowModal] = useState(false);

    const [showModalCrearCta, setShowModalCrearCta] = useState(true);
    const [tituloCrearCta, setTituloCrearCta] = useState("");
    const [textoCrearCta, setTextoCrearCta] = useState("");

    const [formData, setFormData] = useState(defaultValueForm());
    const [loading, setLoading] = useState(false);

    const [mostrarDocumentoUno, setMostrarDocumentoUno] = useState(false);
    const [mostrarDocumentoDos, setMostrarDocumentoDos] = useState(false);
    const [mostrarDocumentoTres, setMostrarDocumentoTres] = useState(false);

    const [crearCta, setCrearCta] = useState(false);

    const [showModalMedio, setShowModalMedio] = useState(false);
    const [codigoToken, setCodigoToken] = useState("");

    const [showModalInformacion, setShowModalInformacion] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

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

    const onCloseModalDctosJuridica = () => {
        //setShowModalFotos(!showModalFotos);
        setShowModalFotos(false);
    };

    const onCloseModalActivarCuenta = () => {
        setShowModal(false);
    };

    const onCloseModalMedioToken = () => {
        setShowModalMedio(false);
    };

    const onCloseModalInformacion = () => {
        setShowModalInformacion(false);
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeToken = (e) => {
        setFormDataToken({
            ...formDataToken,
            [e.target.name]: e.target.value,
        });
    };

    const generabase64 = async (file) => {
        // se cambia baseArchives por baseArchives  OJO

        const recorreImagen = async () => {
            let longitud = baseArchives.length;
            if (longitud < 3) {
                setShowModalMensajes(true);
                setTituloMensajes("Registro Usuarios");
                setTextoMensajes("Recuerda debes subir los tres documentos!");
                return;
            }
            let arreglofotos = [];
            let contador = 0;
            await Array.from(baseArchives).forEach((archivo) => {
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
                        setLoading(true);
                        grabarfoto(baseArchives, extension);
                    }
                };
            });
        };
        recorreImagen();
    };

    const grabarfoto = async (dato, ext) => {
        let longitud = dato.length;
        let datodoc;
        let nombredoc = shortid();
        //console.log("LONGITUD FOTO : ", longitud);
        switch (longitud) {
            case 1:
                datodoc = {
                    longitud,
                    nombredoc1: nombredoc + "-1" + ext,
                    doc1: dato[0],
                };
                break;
            case 2:
                datodoc = {
                    longitud,
                    nombredoc1: nombredoc + "-1" + ext,
                    doc1: dato[0],
                    nombredoc2: nombredoc + "-2" + ext,
                    doc2: dato[1],
                };
                break;
            case 3:
                datodoc = {
                    longitud,
                    nombredoc1: nombredoc + "-1" + ext,
                    doc1: dato[0],
                    nombredoc2: nombredoc + "-2" + ext,
                    doc2: dato[1],
                    nombredoc3: nombredoc + "-3" + ext,
                    doc3: dato[2],
                };
                break;
            default:
                datodoc = {
                    longitud,
                    nombredoc1: "",
                    doc1: 0,
                    nombredoc2: "",
                    doc2: 0,
                    nombredoc3: "",
                    doc3: 0,
                };
                break;
        }

        //console.log("DATOS IMAGEN : ", datodoc);
        //return;
        crearDocumentos(datodoc);
    };

    const crearDocumentos = async (documentosnit) => {
        const formdata = new FormData();
        //console.log("NOMBRE DOC : ", documento);
        formdata.append("usuario", idUid);
        formdata.append("estado", 1);
        formdata.append("nombredcto1", documentosnit.nombredoc1);
        formdata.append("nombredcto2", documentosnit.nombredoc2);
        formdata.append("nombredcto3", documentosnit.nombredoc3);
        formdata.append("longitud", documentosnit.longitud);
        formdata.append("controlactivar", "N");
        formdata.append("doc1", documentosnit.doc1);
        formdata.append("doc2", documentosnit.doc2);
        formdata.append("doc2", documentosnit.doc3);

        fetch("https://gimcloud.com.co/mrp/api/22", {
            method: "POST",
            body: formdata,
        }).then((response) => {
            //console.log("RESPONSE : ", response)
            if (response) {
                if (response.status === 200) {
                    setShowModalFotos(false);
                    setSubirDocsNit(false);
                    dispatch(getRefreshPage(true));
                    //AQUI
                    //router.push("/");
                } else {
                    setShowModalMensajes(true);
                    setTituloMensajes("Mercado Repuesto");
                    setTextoMensajes(
                        "Se presentaron inconvenientes al grabar los documentos, Intenta nuevamente!"
                    );
                    return;
                }
                setLoading(false);
                const auth = getAuth(firebase);
                signOut(auth)
                    .then(() => {})
                    .catch((error) => {
                        console.log("Error Cerrando Sesión");
                    });
                //router.push("/");
                let medio = "email";
                //generaToken(medio);
            } else {
                console.log("RESPONSE DOCS NIT : ", response);
            }
        });
    };

    const generaToken = async (medio) => {
        var caracteres = "012346789";
        var codigoid = "";
        for (var i = 0; i < 4; i++)
            codigoid += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        let tokenid = codigoid; //cadena.substring(0, 6);
        setCodigoToken(tokenid);

        const datosToken = {
            id: idUid,
            token: tokenid,
            fechatoken: fechaactual,
        };

        const datosEnviarToken = {
            token: tokenid,
            medio: medio,
            email_cliente: email,
            nro_ws: "3155337803",
        };

        const respuesta = await UpdateTokenRepository.getUpdateToken(
            datosToken
        ).then((response) => {
            if (response) {
                if (response.type === 1) {
                    setShowModalMensajes(true);
                    setTituloMensajes("Mercado Repuesto");
                    setTextoMensajes("Token generado de forma correcta!");
                    //setLoading(false);
                    //(true);
                    token(datosEnviarToken);
                    //actualizaDatosUsuarioState(IdToken);
                    //router.push("/");
                } else {
                    setShowModalMensajes(true);
                    setTituloMensajes("Mercado Repuesto");
                    setTextoMensajes(
                        "Se presentaron inconvenientes al generar el token, Intenta nuevamente!"
                    );
                    //router.push("/");
                }
            } else {
                console.log("RESPONSE ACTUALIZACION DEL TOKEN : ", response);
                //return null;
            }
        });
        //setShowModal(false);
    };

    const token = async (datos) => {
        const datosEnviarToken = {
            token: datos.token,
            medio: datos.medio,
            email_cliente: datos.email_cliente,
            nro_ws: datos.nro_ws,
        };

        async function enviartoken(dat) {
            // Lee Web Service para enviar el token al usuario
            const datosToken = {
                token: dat.token,
                email_cliente: dat.email_cliente,
                nro_ws: dat.nro_ws,
                medio: dat.medio,
            };

            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Mercado Repuesto");
                    setTextoMensajes(
                        "Token enviado al correo, Recuerda revisar en correos no deseados!"
                    );
                })
                .catch((error) => {
                    setShowModalMensajes(true);
                    setTituloMensajes("Mercado Repuesto");
                    setTextoMensajes(
                        "Error enviando token al medio seleccionado!"
                    );
                });
        }
        enviartoken(datosEnviarToken);
    };

    const validarToken = () => {
        const dat = {
            id: idUid,
        };

        const activarToken = async () => {
            const respuesta = await ActivateUserRepository.getActivateUser(
                dat
            ).then((response) => {
                if (response) {
                    if (response.type === 1) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Mercado Repuesto");
                        setTextoMensajes(
                            "Ya puedes disfrutar de una experiencia diferente MR!"
                        );
                        router.push("/");
                    } else {
                        setShowModalMensajes(true);
                        setTituloMensajes("Mercado Repuesto");
                        setTextoMensajes(
                            "Algo salio mal, si deseas puedes reenviar tu token de activación!"
                        );
                        router.push("/");
                    }
                } else {
                    console.log("ENVIAR TOKEN : ", response);
                    //return null;
                }
            });
        };
        activarToken();
    };

    const tokenmensajetexto = () => {
        let medio = "sms";
        setShowModalMedio(false);
        generaToken(medio);
    };

    const tokenemail = () => {
        let medio = "email";
        //setShowModalMedio(false);
        generaToken(medio);
    };

    const tokenwhatsapp = () => {
        let medio = "whatsapp";
        setShowModalMedio(false);
        generaToken(medio);
    };

    const cerrarModalFotos = () => {
        //setShowModalFotos(!showModalFotos);
        setShowModalFotos(false);
    };

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        let longitud = baseArchives.length;

        const newDet = [];
        if (!baseArchives) {
            setBaseArchives(selectedFilesArray);
        } else newDet.push.apply(baseArchives, selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file.name;
            //return URL.createObjectURL(file);
        });

        if (baseArchives.length === 0) {
            setMostrarDocumentoUno(false);
            setMostrarDocumentoDos(false);
            setMostrarDocumentoTres(false);
        } else if (baseArchives.length === 1) {
            setMostrarDocumentoUno(true);
        } else if (baseArchives.length === 2) {
            setMostrarDocumentoUno(true);
            setMostrarDocumentoDos(true);
        } else if (baseArchives.length === 3) {
            setMostrarDocumentoUno(true);
            setMostrarDocumentoDos(true);
            setMostrarDocumentoTres(true);
        }

        if (selectedArchives.length > 3) {
            setShowModalMensajes(true);
            setTituloMensajes("Mercado Repuesto");
            setTextoMensajes("Recuerda, solo puedes ingresar tres archivos!");
            return;
        }

        setSelectedArchives((previousImages) =>
            previousImages.concat(imagesArray)
        );
    };

    useEffect(() => {
        if (crearCta) {
            localStorage.setItem("crearusuario", JSON.stringify(false));
            router.push("/");
        }
    }, [crearCta]);

    useEffect(() => {
        //console.log("LONGITUD USE EFFECT : ", selectedArchives.length)

        if (selectedArchives.length > 3) {
            setShowModalMensajes(true);
            setTituloMensajes("Mercado Repuesto");
            setTextoMensajes("Recuerda, solo puedes ingresar tres archivos!");
            setSelectedArchives([]);
            return;
        }

        if (selectedArchives.length > 0) {
            if (selectedArchives.length === 1) {
                setImgUno(eliminar);
                setMostrarDocumentoUno(true);
                setImgDos(img);
                setImgTres(img);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
            } else if (selectedArchives.length === 2) {
                setImgUno(eliminar);
                setImgDos(eliminar);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setImgTres(img);
                setMostrarDocumentoTres(false);
            } else if (selectedArchives.length === 3) {
                setImgUno(eliminar);
                setImgDos(eliminar);
                setImgTres(eliminar);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
            }
        } else {
            setImgUno(img);
            setImgDos(img);
            setImgTres(img);
            setMostrarDocumentoUno(false);
            setMostrarDocumentoDos(false);
            setMostrarDocumentoTres(false);
        }
    }, [selectedArchives]);

    const grabarDocumentos = () => {
        const base = [];
        const unicos = [];

        const docGrabar = [];

        if (selectedArchives.length < 3) {
            setShowModalMensajes(true);
            setTituloMensajes("Mercado Repuesto");
            setTextoMensajes("Recuerda, Debes ingresar los tres archivos!");
            setSelectedArchives([]);
            return;
        }

        selectedArchives &&
            selectedArchives.forEach((row) => {
                baseArchives &&
                    baseArchives.forEach((archivos) => {
                        //console.log("ARCHIVOS FILTRADO : ",  row , "ARCHIVO BASE : ", archivos.name)
                        if (row === archivos.name) {
                            docGrabar.push(archivos);
                        }
                    });
            });

        for (var i = 0; i < docGrabar.length; i++) {
            const elemento = docGrabar[i].name;
            if (!base.includes(docGrabar[i].name)) {
                base.push(elemento);
                unicos.push(docGrabar[i]);
            }
        }
        if (unicos.length > 3) {
            setShowModalMensajes(true);
            setTituloMensajes("Mercado Repuesto");
            setTextoMensajes("Recuerda, son maximo tres archivos!");
            return;
        }

        //setFileName(unicos);

        generabase64(unicos);
    };

    const controlBorrarImg = (index) => {
        setMostrarDocumentoUno(false);
        setMostrarDocumentoDos(false);
        setMostrarDocumentoTres(false);
        borrarImg(index);
    };

    const borrarImg = (index) => {
        let array = selectedArchives;
        array.splice(index, 1);

        if (array.length === 0) {
            setMostrarDocumentoUno(false);
            setMostrarDocumentoDos(false);
            setMostrarDocumentoTres(false);
            setImgUno(img);
            setImgDos(img);
            setImgTres(img);
        } else if (array.length === 1) {
            setSelectedArchives(array);
            setMostrarDocumentoUno(true);
            setMostrarDocumentoDos(false);
            setMostrarDocumentoTres(false);
            setImgDos(img);
            setImgTres(img);
        } else if (array.length === 2) {
            setMostrarDocumentoUno(true);
            setMostrarDocumentoDos(true);
            setMostrarDocumentoTres(false);
            setImgTres(img);
            setSelectedArchives(array);
        } else if (array.length === 3) {
            setMostrarDocumentoUno(true);
            setMostrarDocumentoDos(true);
            setMostrarDocumentoTres(true);
            setSelectedArchives(array);
        }
    };

    //show={showModalFotos}
    //console.log("showModalFotos : ", showModalFotos);
    return (
        <div className="ps-page__header">
            <div className="cajadoctonitfotos">
                {
                    //<Modal className="cajatextodoctonitfotos" show={showModalFotos}>
                }
                <Modal className="modaldoctonitfotos" show={showModalFotos}>
                    <ModalMensajes
                        shown={showModalMensajes}
                        close={setShowModalMensajes}
                        titulo={tituloMensajes}
                        mensaje={textoMensajes}
                        tipo="1"
                    />
                    <div>
                        <Row>
                            <Col xl={8} lg={8} md={8} sm={8}>
                                <div className="titulopersonajuridica">
                                    Subir Documentos Persona Jurídica
                                </div>
                            </Col>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <button
                                    type="button"
                                    className="cerrarmodalpersonajuridica"
                                    data-dismiss="modal"
                                    onClick={onCloseModalDctosJuridica}>
                                    {" "}
                                    X{" "}
                                </button>
                            </Col>
                        </Row>
                    </div>

                    <div>
                        <div className="cajasubirdctospersonajuridica">
                            <Row>
                                <Col xl={2} lg={2} sm={2} md={2}>
                                    <div className="image-upload">
                                        {mostrarDocumentoUno ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    className="mt-20"
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    0 ? (
                                                                        <div>
                                                                            <h4 className="eliminardoctojuridica">
                                                                                {
                                                                                    archive
                                                                                }
                                                                            </h4>

                                                                            <div>
                                                                                <button
                                                                                    className="botonborrararchivojuridica"
                                                                                    onClick={(
                                                                                        e
                                                                                    ) =>
                                                                                        controlBorrarImg(
                                                                                            index
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
                                                        className="imagenpersonajuridica"
                                                        src={imgUno.src}
                                                        alt="Seleccionar Archivo"
                                                    />
                                                    <div className="inputtextobotondoctojuridica">
                                                        Ingresar Documento
                                                    </div>
                                                </label>
                                                <input
                                                    id="file-input"
                                                    name="images"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col xl={2} lg={2} sm={2} md={2}>
                                    <div className="image-upload">
                                        {mostrarDocumentoDos ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    className="mt-20"
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    1 ? (
                                                                        <div>
                                                                            <h4 className="eliminardoctojuridica">
                                                                                {archive.substr(
                                                                                    0,
                                                                                    12
                                                                                ) +
                                                                                    "..."}
                                                                            </h4>

                                                                            <div>
                                                                                <button
                                                                                    className="botonborrararchivojuridica"
                                                                                    onClick={() =>
                                                                                        controlBorrarImg(
                                                                                            index
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
                                                        className="imagenpersonajuridica"
                                                        src={imgDos.src}
                                                        alt="Seleccionar Archivo"
                                                    />
                                                    <div className="inputtextobotondoctojuridica">
                                                        Ingresar Documento
                                                    </div>
                                                </label>
                                                <input
                                                    id="file-input"
                                                    name="images"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col xl={2} lg={2} sm={2} md={2}>
                                    <div className="image-upload">
                                        {mostrarDocumentoTres ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    className="mt-20"
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    2 ? (
                                                                        <div>
                                                                            <h4 className="eliminardoctojuridica">
                                                                                {archive.substr(
                                                                                    0,
                                                                                    12
                                                                                ) +
                                                                                    "..."}
                                                                            </h4>

                                                                            <div>
                                                                                <button
                                                                                    className="botonborrararchivojuridica"
                                                                                    onClick={() =>
                                                                                        controlBorrarImg(
                                                                                            index
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
                                                        className="imagenpersonajuridica"
                                                        src={imgTres.src}
                                                        alt="Seleccionar Archivo"
                                                    />
                                                    <div className="inputtextobotondoctojuridica">
                                                        Ingresar Documento
                                                    </div>
                                                </label>
                                                <input
                                                    id="file-input"
                                                    name="images"
                                                    type="file"
                                                    onChange={onSelectFile}
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
                        <h4 className="ml-20">
                            Recuerda: Cámara de Comercio, RUT y Cedula de
                            ciudadanía del Representante legal.
                        </h4>
                        <h4 className="ml-20">
                            Despues de subir los tres archivos, y luego oprimir
                            grabar documentos.
                        </h4>
                    </div>
                    {loading ? (
                        <div className="mlmenos200 mtmenos40">
                            <Loading />
                        </div>
                    ) : (
                        <div>
                            <br />
                        </div>
                    )}

                    <div className="botongrabardocumentos">
                        <Row>
                            <Col xs={6} lg={4} md={4}>
                                <div
                                    className="botoncancelardoctojuridica"
                                    onClick={() => cerrarModalFotos()}>
                                    {" "}
                                    Cancelar{" "}
                                </div>
                            </Col>
                            <Col xs={6} lg={6} md={6}>
                                <div
                                    className="botongrabardoctojuridica"
                                    onClick={grabarDocumentos}>
                                    Grabar Documentos
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal>

                <Modal className="modalmediotokendctonit" show={showModalMedio}>
                    <Modal.Body>
                        <Row>
                            <Col xs={6} lg={6} md={6} sm={6} className="ml-140">
                                <h2>POR QUE MEDIO DESEA RECIBIR EL TOKEN</h2>
                            </Col>
                            <Col xs={3} lg={3} md={3} sm={3} className="ml-40">
                                <button
                                    type="button"
                                    className="cerrarmodal"
                                    data-dismiss="modal"
                                    onClick={onCloseModalMedioToken}>
                                    {" "}
                                    X{" "}
                                </button>
                            </Col>
                        </Row>
                        <hr />
                        <br />
                        <form>
                            <Row className="mt-20">
                                <Col
                                    xl={2}
                                    lg={2}
                                    md={2}
                                    xs={2}
                                    className="ml-90">
                                    <Button
                                        className="ps-btn"
                                        onClick={tokenemail}>
                                        Email
                                    </Button>
                                </Col>
                                <Col xl={2} lg={2} md={2} xs={2}>
                                    <Button
                                        className="ps-btn"
                                        onClick={tokenwhatsapp}>
                                        WhatsApp
                                    </Button>
                                </Col>
                                <Col
                                    xl={2}
                                    lg={2}
                                    md={2}
                                    xs={2}
                                    className="ml-30">
                                    <Button
                                        className="ps-btn"
                                        onClick={tokenmensajetexto}>
                                        Mensaje de Texto
                                    </Button>
                                </Col>
                            </Row>
                            <div>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <Row>
                                    <Col xs lg={3}></Col>
                                    <Col xs lg={6} className="ml-40">
                                        <Button
                                            className="ps-btn"
                                            onClick={() =>
                                                setShowModalMedio(false)
                                            }>
                                            Regresar
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal dialogClassName="modaltoken" show={showModal}>
                    <Modal.Header>
                        <h2>ACTIVAR CUENTA</h2>
                        <button
                            type="button"
                            className="cerrarmodal"
                            data-dismiss="modal"
                            onClick={onCloseModalActivarCuenta}>
                            {" "}
                            X{" "}
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <form onChange={onChangeToken}>
                            <div className="ps-form__group">
                                <label className="ps-form__label">
                                    Ingresar Codigo :
                                </label>
                                <input
                                    className="form-control ps-form__input"
                                    name="token"
                                    type="text"
                                />
                            </div>
                        </form>
                    </Modal.Body>
                    <div className="botongrabarproducto">
                        <Row>
                            <Col xs lg={6}>
                                <div className="ps-btn" onClick={validarToken}>
                                    Activar Cuenta
                                </div>
                            </Col>
                            <Col xs lg={2}>
                                <Button
                                    className="ps-btn"
                                    onClick={() => setShowModal(false)}>
                                    {" "}
                                    Cancelar{" "}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <div>
                    <Modal
                        className="modalinformaciongenericos"
                        show={showModalInformacion}>
                        <Modal.Header>
                            <h2>REVISIÓN DE DOCUMENTOS PARA ACTIVAR CUENTA </h2>
                            <button
                                type="button"
                                className="cerrarmodal"
                                data-dismiss="modal"
                                onClick={onCloseModalInformacion}>
                                {" "}
                                X{" "}
                            </button>
                        </Modal.Header>
                        <Modal.Body>
                            <h2>
                                {" "}
                                El área Jurídica de Mercado Repuesto realizara
                                la revisión de los documentos, inmediatamente
                                tengamos la confirmación habilitaremos la opción
                                para la activación de tu cuenta.
                            </h2>
                            <ButtonGroup vertical></ButtonGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() => setShowModalInformacion(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        id: 0,
        productogenerico: 0,
        numerodeimagenes: 3,
        nombreimagen1: "",
        nombreimagen2: "",
        nombreimagen3: "",
    };
}

function defaultValueToken() {
    return {
        token: "",
    };
}

export default IngresoFotosDocsNit;
