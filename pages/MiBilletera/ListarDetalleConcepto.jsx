import React, { useEffect, useState, useRef } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from '../../helpers/Constants';
import { IoClose, IoSettingsSharp } from "react-icons/io5";
import { ImEnlarge } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import shortid from 'shortid';
import { useSelector } from "react-redux";
import ModalMensajes from "../mensajes/ModalMensajes";
import { myNumber } from '../../utilities/ArrayFunctions';

function ListarDetalleConcepto({ setModalDetalleConcepto, dataSelectDctos }) {
    const fileInput = useRef(null);
    const fileInput2 = useRef(null);
    const columns = ["Fecha documento", "Fecha de la venta", "Id Compra", "Valor de la venta",
        "Valor abonado", "Precio envio", "Precio del servicio", "IVA", "Retención"];
    const [listarDocumentos, setListarDocumentos] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [openModalFirmar, setOpenModalFirmar] = useState(false);
    const [imgFirmaInsp, setImgFirmaInsp] = useState(null);
    const [idInspeccion, setidInspeccion] = useState(null);

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
                id: dataSelectDctos.idmov,
            };

            const res = await axios({
                method: "post",
                url: URL_BD_MR + "230", params
            });
            console.log("Full response received: ", res.data);

            if (res.data && res.data.type === 1) {
                // Log the list of site surveys
                console.log("Dctos usuarios: ", res.data);
                //setCategorias(res.data.listcategoriasinspeccion);
                let dctosusuario = res.data.listmovabonos;
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
            setTextoMensajes("Primero debes seleccionar el archivo, que quieres actualizar!");
            return
        }

        let archivo;
        let URLTIPO;

        if (tipoFile == 1) {
            archivo = selectedImage;
            URLTIPO = `${URL_BD_MR}220`;
        } else if (tipoFile == 2) {
            archivo = selectedPDFDos;
            URLTIPO = `${URL_BD_MR}221`;
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
        setModalDetalleConcepto(false)
    }

    return (
        <div className='modaldetalletransaccion'>
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
                        Detalle transacción
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
                                    <div className="textodetalle">{column}</div>
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>

                    {listarDocumentos && listarDocumentos.length > 0 ? (
                        listarDocumentos
                            .map((insp, index) => (
                                <TableBody key={insp.id}>
                                    <TableRow>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {insp.fechacreacion}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {insp.fechadelaventa}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {insp.idcompra}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {myNumber(1, insp.valordelaventa, 2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {myNumber(1, insp.valorabono, 2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {myNumber(1, insp.precioenvio, 2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {myNumber(1, insp.preciodelservicio, 2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {myNumber(1, insp.impuestos, 2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                className="textodetalle"
                                            >
                                                {myNumber(1, insp.retencion, 2)}
                                            </Typography>
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

export default ListarDetalleConcepto;