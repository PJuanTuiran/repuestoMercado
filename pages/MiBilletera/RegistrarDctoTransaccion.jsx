import React, { useEffect, useState, useRef } from 'react';
import { Grid, TextField, Typography } from "@mui/material";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from '../../helpers/Constants';
import { IoClose, IoSettingsSharp } from "react-icons/io5";
import { ImEnlarge } from "react-icons/im";
import { FaPeoplePulling } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa";
import shortid from 'shortid';
import { useSelector } from "react-redux";
import ModalMensajes from "../mensajes/ModalMensajes";

function RegistrarDctoTransaccion({ setModalGrabarDcto, dataSelectDctos }) {

    console.log("DATXXX : ", dataSelectDctos)
    const fileInput = useRef(null);
    const fileInput2 = useRef(null);
    const columns = ["Fecha documento", "Nombre documento", "Ver documento"];
    const [listarDocumentos, setListarDocumentos] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [nombreArchivo, setNombreArchivo] = useState(null);

    const [nameFileLoad, setNameFileLoad] = useState(null);
    const [nameFileLoad2, setNameFileLoad2] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [extension, setExtension] = useState("");
    const [selectedPDFDos, setSelectedPDFDos] = useState(null);
    const [tipoFile, setTipoFile] = useState(null);
    const [loadFile, setLoadFile] = useState(false);

    const [showModalMensaje, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const handleClick = () => {
        fileInput.current.click();
    }

    const handleClick2 = () => {
        fileInput2.current.click();
    }

    const leerDctosUsuario = async () => {
        
        try {
            // We make a POST request to the server with the client ID as a parameter
            let params = {
                idtransaccion: dataSelectDctos.idmov,
            };

            const res = await axios({
                method: "post",
                url: URL_BD_MR + "227", params
            });
            // console.log("Full response received: ", res.data);

            if (res.data && res.data.type === 1) {
                // Log the list of site surveys
                console.log("Dctos usuarios: ", res.data);
                //setCategorias(res.data.listcategoriasinspeccion);
                let dctosusuario = res.data.listardctotransac;
                setListarDocumentos(dctosusuario);
                if(dctosusuario.length > 0){
                    setShowModalMensajes(true);
                    setTituloMensajes("Documentos");
                    setTextoMensajes("Ya registrarte un documento para esta transacción, si deseas lo puedes editar y modificar!");
                    setModalGrabarDcto(false);
                }
            } else {
                // If the response type is not 1, log the actual response type
                console.log("Error leyendo Documentos: ", res.data);
            }
        } catch (error) {
            // If there's an error in the process, log the error message
            console.error("Error leyendo Documentos", error);
        }
    };

    useEffect(() => {
        leerDctosUsuario();
    }, [])

    const openFirmarLider = (data, firma) => {
        console.log("DATA : ", data)
        setidInspeccion(data.id)
        setImgFirmaInsp(firma)
        //setDataCostoWO(data)
        setOpenModalFirmar(true);
    }

    const changeHandler = async (event) => {
        setLoadFile(true);
        const reader = new FileReader();
        const file = event.target.files[0];
        console.log("FILE : ", file)
        setNameFileLoad(file.name)

        setSelectedPDFDos(event.target.files[0]);

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );
            setExtension(extension);

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                //setUserFile(blob);
                setSelectedPDF(event.target.files[0]);
                setTipoFile(2);
            } else {
                setSelectedImage(base64Image);
                setTipoFile(1);

                console.log("IMAGEN : ", base64Image)
            }
        };

        reader.readAsDataURL(file);
    };

    const changeHandler2 = async (event) => {
        setLoadFile(true);
        const reader = new FileReader();
        const file = event.target.files[0];
        console.log("FILE : ", file)
        setNameFileLoad2(file.name)

        setSelectedPDFDos(event.target.files[0]);

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );
            setExtension(extension);

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                //setUserFile(blob);
                setSelectedPDF(event.target.files[0]);
                setTipoFile(2);
            } else {
                setSelectedImage(base64Image);
                setTipoFile(1);

                console.log("IMAGEN : ", base64Image)
            }
        };

        reader.readAsDataURL(file);
    };

    const grabarDocumentoUno = async () => {
        if (!selectedImage && !selectedPDFDos) {
            setShowModalMensajes(true);
            setTituloMensajes("Documentos");
            setTextoMensajes("Primero debes seleccionar el archivo, que quieres guardar!");
            return
        }

        let archivo;
        let URLTIPO;

        if (tipoFile == 1) {
            archivo = selectedImage;
            URLTIPO = `${URL_BD_MR}225`;
        } else if (tipoFile == 2) {
            archivo = selectedPDFDos;
            URLTIPO = `${URL_BD_MR}226`;
        }

        //Generar nombre de la imagen
        let ImageName = shortid();

        // Crear un objeto FormData
        let formData = new FormData();
        // Agregar los demás campos a formData
        formData.append("idtransaccion", dataSelectDctos.idmov);
        formData.append("image", ImageName + extension);
        formData.append("nombreimagen1", ImageName + extension);
        formData.append("numerodeimagenes", 1);
        formData.append("imagen1", archivo);
        formData.append("nombrearchivo", nombreArchivo);
        formData.append("uidusuario", dataSelectDctos.uid);
        
        const data = {
            idtransaccion: dataSelectDctos.idmov,
            image: archivo,
            nombreimagen1: ImageName + extension,
            numerodeimagenes: 1,
            imagen1: archivo,
            nombrearchivo: nombreArchivo,
            uidusuario: dataSelectDctos.uid
        };

        // Verificar si estás enviando una imagen o un PDF

        //console.log("DAT IMG : ", data);
        //return
        try {

            const grabarImg = async () => {
                await fetch(`${URLTIPO}`, {
                    method: "POST",
                    body: formData,
                    //headers: headers,
                }).then((response) => {
                    //setIsLoading(false);
                    if (response.data && response.data.type === '0') {
                        console.error("Errror grabando archivo!", "error");
                        setShowModalMensajes(true);
                        setTituloMensajes("Documentos");
                        setTextoMensajes("Error grabando documentos!");
                    } else {
                        console.error("Archivo grabado!", "success");
                        setShowModalMensajes(true);
                        setTituloMensajes("Documentos");
                        setTextoMensajes("Documento grabado, OK!");
                        setModalGrabarDcto(false);
                    }
                });

            };
            grabarImg();
            //listsDocuments();
        } catch (error) {
            console.error("Error al enviar la factura", error);
            // Maneja el error según tus necesidades
        }
    };

    const grabarDocumentoDos = async () => {
        if (!selectedImage && !selectedPDFDos) {
            setShowModalMensajes(true);
            setTituloMensajes("Documentos");
            setTextoMensajes("Primero debes seleccionar el archivo, que quieres actualizar!");
            return
        }

        let archivo;
        let URLTIPO;

        if (tipoFile == 1) {
            archivo = selectedImage;
            URLTIPO = `${URL_BD_MR}223`;
        } else if (tipoFile == 2) {
            archivo = selectedPDFDos;
            URLTIPO = `${URL_BD_MR}224`;
        }

        //Generar nombre de la imagen
        let ImageName = shortid();

        // Crear un objeto FormData
        let formData = new FormData();
        // Agregar los demás campos a formData
        formData.append("uid", datosusuarios.uid);
        formData.append("image", ImageName + extension);
        formData.append("nombreimagen1", ImageName + extension);
        formData.append("numerodeimagenes", 1);
        formData.append("imagen1", archivo);

        const data = {
            uid: datosusuarios.uid,
            image: archivo,
            nombreimagen1: ImageName + extension,
            numerodeimagenes: 1,
            imagen1: archivo
        };

        // Verificar si estás enviando una imagen o un PDF

        //console.log("DAT IMG : ", data);
        //return
        try {

            const grabarImg = async () => {
                await fetch(`${URLTIPO}`, {
                    method: "POST",
                    body: formData,
                    //headers: headers,
                }).then((response) => {
                    //setIsLoading(false);
                    if (response.data && response.data.type === '0') {
                        console.error("Errror grabando archivo!", "error");
                        setShowModalMensajes(true);
                        setTituloMensajes("Documentos");
                        setTextoMensajes("Error actualizando documentos!");
                    } else {
                        console.error("Archivo grabado!", "success");
                        setShowModalMensajes(true);
                        setTituloMensajes("Documentos");
                        setTextoMensajes("Documento actualizado, OK!");
                        leerDctosUsuario();
                    }
                });

            };
            grabarImg();
            //listsDocuments();
        } catch (error) {
            console.error("Error al enviar la factura", error);
            // Maneja el error según tus necesidades
        }
    };

    const cerrar = () => {
        setModalGrabarDcto(false)
    }

    const nombreAsignado = (data) => {
        setNombreArchivo(data)
    }

    return (

        <div className='modalgrabardctos'>
            <ModalMensajes
                shown={showModalMensaje}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="error"
            />
            <Grid container>
                <Grid item xs={12} md={11} lg={11}>
                    <Typography
                        className="tituloeditdcto"
                    >
                        Registrar documentos usuarios por transacción
                    </Typography>
                </Grid>
                <Grid item xs={12} md={1} lg={1}>
                    <IoClose
                        onClick={() => cerrar()}
                        className='iconocerrardcto'
                    />
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <div className="mt-10">
                        <div className='textonombrearchivo'>Nombre del archivo</div>
                        <div>
                            <input
                                className='inputnombrearchivo'
                                onChange={(e) => nombreAsignado(e.target.value)}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={1.5} lg={1.5}></Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <div>
                        <a>
                            <button
                                className="actdocbilletera ml-10"
                                onClick={
                                    handleClick
                                }
                            >
                                < div >
                                    Seleccionar archivo
                                </div>
                                <a>
                                    <input
                                        type="file"
                                        accept=".pdf,.png,.jpeg,.jpg"
                                        onChange={
                                            changeHandler
                                        }
                                        style={{
                                            display:
                                                "none",
                                        }}
                                        ref={
                                            fileInput
                                        }
                                    />
                                </a>
                            </button>
                        </a>
                        <div className="nombreimg">{nameFileLoad}</div>
                    </div>
                </Grid>

                <Grid item xs={12} md={8} lg={8}>
                    <div className='grabardocbilletera'
                        onClick={() => grabarDocumentoUno()}
                    >
                        Grabar archivo
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default RegistrarDctoTransaccion;