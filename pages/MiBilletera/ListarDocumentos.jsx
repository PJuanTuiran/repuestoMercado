import React, { useEffect, useState, useRef } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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
import { MdSave } from "react-icons/md";

function ListarDocumentos({ setModalEditar, uidusuario, idinterno, tipousuario, idcertificado }) {

    //console.log("ID CERTIFICADO : ", idcertificado)
    const fileInput = useRef(null);
    const fileInput2 = useRef(null);
    const columns = ["Fecha documentos", "Nombre documento", "Ver documentos"];
    const [listarDocumentos, setListarDocumentos] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [openModalFirmar, setOpenModalFirmar] = useState(false);
    const [imgFirmaInsp, setImgFirmaInsp] = useState(null);
    const [idInspeccion, setidInspeccion] = useState(null);

    const [selectItem, setSelectItem] = useState(null);

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
                uidusuario: uidusuario,
                idcertificado: idcertificado
            };

            const res = await axios({
                method: "post",
                url: URL_BD_MR + "236", params
            });
            // console.log("Full response received: ", res.data);

            if (res.data && res.data.type === 1) {
                // Log the list of site surveys
                //console.log("Dctos usuarios: ", res.data);
                //setCategorias(res.data.listcategoriasinspeccion);
                let dctosusuario = res.data.listarcertiusuarios;
                setListarDocumentos(dctosusuario);
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

    const changeHandler = async (event) => {
        setLoadFile(true);
        const reader = new FileReader();
        const file = event.target.files[0];
        //console.log("FILE : ", file)
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

                //console.log("IMAGEN : ", base64Image)
            }
        };

        reader.readAsDataURL(file);
    };

    const grabarDocumentoUno = async () => {
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
            URLTIPO = `${URL_BD_MR}237`;
        } else if (tipoFile == 2) {
            archivo = selectedPDFDos;
            URLTIPO = `${URL_BD_MR}238`;
        }

        //Generar nombre de la imagen
        let ImageName = shortid();

        // Crear un objeto FormData
        let formData = new FormData();
        // Agregar los demás campos a formData
        formData.append("id", selectItem);
        formData.append("image", ImageName + extension);
        formData.append("nombreimagen1", ImageName + extension);
        formData.append("numerodeimagenes", 1);
        formData.append("imagen1", archivo);

        const data = {
            id: selectItem,
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
        formData.append("uid", uidusuario);
        formData.append("image", ImageName + extension);
        formData.append("nombreimagen1", ImageName + extension);
        formData.append("numerodeimagenes", 1);
        formData.append("imagen1", archivo);

        const data = {
            uid: uidusuario,
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
        setModalEditar(false)
    }

    return (

        <div className='modalversolretiro'>
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
                        Documentos solicitud retiros usuario
                    </Typography>
                </Grid>
                <Grid item xs={12} md={1} lg={1}>
                    <IoClose
                        onClick={() => cerrar()}
                        className='iconocerrardcto'
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ boxShadow: "none", }}>
                <Table>
                    <TableHead sx={{ background: "#F7FAFF" }}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column}
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        color: '#2D2E83',
                                        fontSize: "16px"
                                    }}
                                >
                                    <div className="textempoyee">{column}</div>
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>

                    {listarDocumentos.length > 0 ? (
                        listarDocumentos
                            .map((insp, index) => (
                                <TableBody key={insp.id}>
                                    <TableRow>
                                        <TableCell>
                                            <Typography
                                                className="textoeditdcto"
                                            >
                                                {insp.fechacreacion}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textoeditdcto"
                                            >
                                                {insp.nombrearchivo}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <div className="textoeditdcto2">
                                                <a
                                                    href={URL_IMAGES_RESULTSSMS + insp.nameimg}
                                                    target="_blank"

                                                >
                                                    {insp.nameimg}
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item xs={12} md={4} lg={4}>
                                                    <div>
                                                        {
                                                            /*
                                                            tipousuario == 1 ?
                                                                <div>
                                                                    <Tooltip title='Seleccione dcto' placement="top-start"
                                                                        onClick={
                                                                            handleClick
                                                                        }
                                                                    >
                                                                        <IconButton>
                                                                            <FaCheckDouble
                                                                                className='iconoeditartransacc'
                                                                                onClick={() => setSelectItem(insp.id)}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </div>
                                                                :
                                                                <div className='deshabilitar'>
                                                                    <Tooltip title='Seleccione dcto' placement="top-start">
                                                                        <IconButton>
                                                                            <FaCheckDouble
                                                                                className='iconoeditartransacc'
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </div>
                                                                */
                                                        }
                                                        <button>
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


                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={2} lg={2}>
                                                    {
                                                        (selectedImage || selectedPDFDos) &&
                                                            selectItem == insp.id ?
                                                            <Tooltip title='Actualizar documento' placement="top-start">
                                                                <IconButton
                                                                    onClick={() => grabarDocumentoUno(insp)}
                                                                >
                                                                    <MdSave
                                                                        className='iconoeditartransacc'
                                                                    />
                                                                </IconButton>
                                                                <div className="nombreimgeditar2">{nameFileLoad}</div>
                                                            </Tooltip>
                                                            :
                                                            null
                                                    }
                                                </Grid>
                                            </Grid>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            ))
                    ) : (
                        <p>No employees for the selected status</p>
                    )}

                </Table>
            </TableContainer>

        </div>
    );
}

export default ListarDocumentos;