import Container from "../../../components/layouts/Container";
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IconButton, Modal, Tooltip, Autocomplete, FormControl, TextField } from "@mui/material";

import React, { useState, useEffect, useRef } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import ModalMensajes from "../../mensajes/ModalControlAcceso";
import ModalMensajesDctos from "../../mensajes/ModalMensajes";
import { IoSquareOutline } from "react-icons/io5";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import shortid from "shortid";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from "~/helpers/Constants";
import axios from "axios";
import { FaEye } from "react-icons/fa";

const ValidDocsPjuridica = () => {
    const router = useRouter();

    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };
    const handleConfirmationSuccess = (route) => () => {
        //router.push(route);
    };

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    const items = [
        "Certificado de Camara de comercio (No menor a 30 días)",
        "RUT (No menor a 30 días)",
        "Cedula de ciudadanía Representante legal",
    ];

    const [fileData1, setFileData1] = useState(null);
    const [fileData2, setFileData2] = useState(null);
    const [fileData3, setFileData3] = useState(null);

    const [fileDataPDF1, setFileDataPDF1] = useState(null);
    const [fileDataPDF2, setFileDataPDF2] = useState(null);
    const [fileDataPDF3, setFileDataPDF3] = useState(null);

    const [nameFileLoad1, setNameFileLoad1] = useState(null);
    const [nameFileLoad2, setNameFileLoad2] = useState(null);
    const [nameFileLoad3, setNameFileLoad3] = useState(null);

    const [extension1, setExtension1] = useState("");
    const [extension2, setExtension2] = useState("");
    const [extension3, setExtension3] = useState("");

    const [tipoFile1, setTipoFile1] = useState(null);
    const [tipoFile2, setTipoFile2] = useState(null);
    const [tipoFile3, setTipoFile3] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");

    const [showModalDctos, setShowModalDctos] = useState(false);
    const [tituloMensajesDctos, setTituloMensajesDctos] = useState("");
    const [textoMensajesDctos, setTextoMensajesDctos] = useState("");

    const [dctosUser, setDctosUser] = useState([]);
    const [listEstados, setListEstados] = useState([]);

    const [mensaje, setMensaje] = useState(null);
    const [count, setCount] = useState(1);

    const handleFileChangeUno = (index, event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        //console.log("FILE : ", file)
        setNameFileLoad1(file.name)

        setFileData1(event.target.files[0]);
        setFileDataPDF1(event.target.files[0]);

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );
            setExtension1(extension);

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                //setUserFile(blob);
                setFileDataPDF1(event.target.files[0]);
                //console.log("PDF BAS64 : ", base64Image)
                setTipoFile1(2);
            } else {
                setFileData1(base64Image);
                setTipoFile1(1);
                //console.log("IMAGEN BAS64: ", base64Image)
            }
        };

        reader.readAsDataURL(file);
    };

    //console.log("XXXXXXXXX : ", documentosUsuario)
    useEffect(() => {
        const leerEstadosProceso = async () => {
            let params = {
                proceso: 1
            }
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "163", params
                });

                if (res.data.type == 1) {
                    console.log(res.data)
                    setListEstados(res.data.listarestadosproceso)
                }
            } catch (error) {
                console.error("Error al leer estados por proceso", error);
            }
        };
        leerEstadosProceso();
    }, []);

    const handleFileChangeDos = (index, event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        //console.log("FILE : ", file)
        setNameFileLoad2(file.name)

        setFileData2(event.target.files[0]);
        setFileDataPDF2(event.target.files[0]);

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );
            setExtension2(extension);

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                //setUserFile(blob);
                setFileDataPDF2(event.target.files[0]);
                //console.log("PDF BAS64 : ", base64Image)
                setTipoFile2(2);
            } else {
                setFileData2(base64Image);
                setTipoFile2(1);
                //console.log("IMAGEN BAS64: ", base64Image)
            }
        };

        reader.readAsDataURL(file);
    };

    const handleFileChangeTres = (index, event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        //console.log("FILE : ", file)
        setNameFileLoad3(file.name)

        setFileData3(event.target.files[0]);
        setFileDataPDF3(event.target.files[0]);

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            let extension =
                "." +
                base64Image.substring(
                    base64Image.indexOf("/") + 1,
                    base64Image.indexOf(";base64")
                );
            setExtension3(extension);

            if (file.type === "application/pdf") {
                const blob = new Blob([file], { type: "application/pdf" });
                //setUserFile(blob);
                setFileDataPDF3(event.target.files[0]);
                //console.log("PDF BAS64 : ", base64Image)
                setTipoFile3(2);
            } else {
                setFileData3(base64Image);
                setTipoFile3(1);
                //console.log("IMAGEN BAS64: ", base64Image)
            }
        };

        reader.readAsDataURL(file);
    };

    const handleSquareClick = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };


    useEffect(() => {
        const datauser = JSON.parse(localStorage.getItem("datauser"));

        const leerdcosnit = async () => {

            let params = {
                usuario: datauser.uid
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "273", params
                });

                if (res.data.type == 1 && res.data.listardcosnit.length > 0) {

                    let data = res.data.listardcosnit;
                    let contador = 0;

                    data &&
                        data.map((row, index) => {
                            if (row.estado == 129) {
                                contador = parseInt(contador) + 1;
                            }
                        });

                    if (contador < 3) {
                        setMensaje("La revisión de los documentos relacionados con el cambio a persona juridica esta en proceso");
                        setCount(1);
                    } else {
                        setMensaje("El proceso de cambio a persona jurídica fue exitoso.");
                        setCount(2);
                    }

                    setDctosUser(res.data.listardcosnit);
                } else {
                    console.log("Error al leer documentos nit usuario!");
                }
            } catch (error) {
                console.error("Error al leer documentos nit", error);
            }
        };

        if (datauser?.uid)
            leerdcosnit();
    }, [])

    const handleValidacion = () => {
        const requiredFiles = [fileData1, fileData2, fileData3];

        if (!fileData1 || !fileData2 || !fileData3) {
            setShowModalDctos(true);
            setTituloMensajesDctos("Documentos");
            setTextoMensajesDctos("Recuerda, debes ingresar los tres documentos!");
            return
        }

        const datauser = JSON.parse(localStorage.getItem("datauser"));

        // Check if all required files are present
        const allFilesPresent = requiredFiles.every(
            (fileData) => fileData !== null
        );

        /*
        if (!allFilesPresent) {
            setTituloMensajes("Validación de Archivos");
            setTextoMensajes("Debes subir todos los archivos requeridos.");
            setShowModal(true);
            return;
        }
            */

        const verDctosUsuario = () => {
            const leerdcosnit = async () => {
                let params = {
                    usuario: datauser.uid
                }

                console.log("PARAMS UID : ", params)

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "269", params
                    });

                    if (res.data.type == 1 && res.data.listardcosnit.length > 0) {
                        setShowModal(true);
                        setTituloMensajes("Documentos");
                        setTextoMensajes("Ya enviantes documentos para esta solicitud!");
                        return
                    } else {
                        saveDocumentos();
                        console.log("MAJSJAHJAHS : ", res.data.listardcosnit);
                    }
                } catch (error) {
                    console.error("Error al leer documentos nit", error);
                }
            };
            leerdcosnit();
        }
        verDctosUsuario();

    };

    const saveDocumentos = () => {

        let ImageName1 = shortid() + extension1;
        let ImageName2 = shortid() + extension2;
        let ImageName3 = shortid() + extension3;

        let arrayimg = [];
        let item1 = {
            nombreimagen1: ImageName1,
            numerodeimagenes: 1,
            imagen1: fileData1,
            tipofile: tipoFile1
        }

        let item2 = {
            nombreimagen1: ImageName2,
            numerodeimagenes: 1,
            imagen1: fileData2,
            tipofile: tipoFile2
        }

        let item3 = {
            nombreimagen1: ImageName3,
            numerodeimagenes: 1,
            imagen1: fileData3,
            tipofile: tipoFile3
        }

        arrayimg.push(item1);
        arrayimg.push(item2);
        arrayimg.push(item3);

        const datauser = JSON.parse(localStorage.getItem("datauser"));

        let archivo;
        let URLTIPO = `${URL_BD_MR}266`;

        //console.log("tipoFile : ", tipoFile)
        //console.log("selectedImage : ", selectedImage)
        //console.log("selectedPDFDos : ", selectedPDFDos)
        //Generar nombre de la imagen
        // Crear un objeto FormData
        let formdata = new FormData();
        // Agregar los demás campos a formData
        formdata.append("usuario", datauser.uid);
        formdata.append("estado", 1);
        formdata.append("nombredoc1", ImageName1);
        formdata.append("nombredoc2", ImageName2);
        formdata.append("nombredoc3", ImageName3);
        formdata.append("longitud", 1);
        formdata.append("controlactivar", "N");
        formdata.append("doc1", fileData1);
        formdata.append("doc2", fileData2);
        formdata.append("doc2", fileData3);

        // Verificar si estás enviando una imagen o un PDF

        let item = {
            usuario: datauser.uid,
            estado: 1,
            nombredoc1: ImageName1,
            nombredoc2: ImageName2,
            nombredoc3: ImageName3,
            longitud: 1,
            controlactivar: "N",
            doc1: fileData1,
            doc2: fileData2,
            doc3: fileData3
        }

        //console.log("DAT IMG : ", item);

        try {

            const grabarImg = async () => {
                await fetch(`${URLTIPO}`, {
                    method: "POST",
                    body: formdata,
                    //headers: headers,
                }).then((response) => {
                    //setIsLoading(false);
                    //console.log("RESP DATA!", response);
                    if (response.data && response.data.type === '0') {
                        console.error("Datos documentos persoja Juridica!", "error");
                        //handleClickOpen("Document could not be created successfully!", "error");
                    } else {
                        console.error("Datos documentos persona Juridica!", "success");
                        //handleClickOpen("Document successfully created!", "success");
                        //listsDocuments();
                        setTituloMensajes("Validación de Archivos");
                        setTextoMensajes("Documentos persona juridica enviados.");
                        setShowModal(true);

                        const esperar = async () => {
                            await new Promise(resolve => setTimeout(resolve, 6000));
                        }
                        esperar();
                        saveDataImg();
                    }
                });
            };
            grabarImg();

        } catch (error) {
            console.error("Error al enviar la documentos", error);
            // Maneja el error según tus necesidades

        }

        const saveDataImg = async () => {
            arrayimg &&
                arrayimg.map((row, index) => {
                    let URLTIPO = null;

                    if (row.tipofile == 1) {
                        URLTIPO = `${URL_BD_MR}267`;
                    } else
                        if (row.tipofile == 2) {
                            URLTIPO = `${URL_BD_MR}268`;
                        }

                    let formdata = new FormData();
                    // Agregar los demás campos a formData
                    formdata.append("nombreimagen1", row.nombreimagen1);
                    formdata.append("imagen1", row.imagen1);
                    formdata.append("numerodeimagenes", 1);

                    let item = {
                        nombreimagen1: row.nombreimagen1,
                        imagen1: row.imagen1,
                        numerodeimagenes: 1
                    }

                    console.log("ITEM IMSGES : ", item)

                    console.log("URLTIPO : ", URLTIPO)

                    const grabarImg = async () => {
                        await fetch(`${URLTIPO}`, {
                            method: "POST",
                            body: formdata,
                            //headers: headers,
                        }).then((response) => {
                            //setIsLoading(false);


                            if (response.data && response.data.type === '0') {
                                console.error("Datos documentos persoja Juridica!", "error");

                                setTituloMensajes("Validación de Archivos");
                                setTextoMensajes("Error al subir los documentos persona juridica.");
                                setShowModal(true);

                                const crearNotificacionVende = async () => {
                                    const idnotificacion = Math.floor(Math.random() * 10000000);
                                    let comentario = "Realizaste solicitud de cambio de razon social, si no fuiste tu, comunicate con la administracion de MR";

                                    let params = {
                                        estado: 128,
                                        uidusuario: datauser.uid,
                                        idorigen: datauser.uid,
                                        idnotificacion: idnotificacion,
                                        comentario: comentario,
                                        estado: 90,
                                        ctlrnotificaentrada: 0,
                                        ctlrnotificasalida: 0,
                                        tiponotificacion: 1,
                                    }

                                    try {
                                        const res = await axios({
                                            method: "post",
                                            url: URL_BD_MR + "823", params
                                        });

                                        if (res.data.type == 1) {
                                            console.log("Notificación vendedor creada")
                                            //return;
                                            setTituloMensajes("Validación de Archivos");
                                            setTextoMensajes("Documentos persona juridica enviados.");
                                            setShowModal(true);

                                            // Esperar 10 milisegundos antes de enviar el siguiente
                                            await new Promise(resolve => setTimeout(resolve, 6000));
                                            //router.push("/");
                                        }
                                    } catch (error) {
                                        console.error("Error creando Notificación", error);
                                    }
                                };

                                crearNotificacionVende();

                            } else {
                                console.error("Datos documentos persona Juridica!", "success");
                                //router.push("/");
                            }
                        });
                    };
                    grabarImg();

                });
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalCloseDctos = () => {
        setShowModalDctos(false);
    };

    const getFileIcon = (fileData) => {
        if (!fileData) {
            return (
                <HiOutlineDocumentArrowUp
                    size={65}
                    style={{
                        color: "#2D2E83",
                        position: "relative",
                        top: "30px",
                    }}
                />
            );
        }

        const { type, name, data } = fileData || {}; // Asegúrate de que fileData sea un objeto

        if (type && type.startsWith("image/")) {
            return (
                <img
                    src={data}
                    alt="Uploaded File"
                    style={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "50%",
                    }}
                />
            );
        } else if (type === "application/pdf") {
            return (
                <div
                    style={{
                        position: "absolute",
                        top: "-20px",
                        right: "-8px",
                        fontSize: "9px",
                        color: "#2D2E83",
                        width: "35px",
                    }}>
                    {" "}
                    {name}{" "}
                </div>
            );
        } else {
            return (
                <HiOutlineDocumentArrowUp
                    size={65}
                    style={{
                        color: "#2D2E83",
                        position: "relative",
                        top: "30px",
                    }}
                />
            );
        }
    };

    const handleValidP = () => {
        router.push("../../my-account");
    };

    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <ModalMensajesDctos
                        shown={showModalDctos}
                        close={handleModalCloseDctos}
                        titulo={tituloMensajesDctos}
                        mensaje={textoMensajesDctos}
                        tipo="error"
                    />
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"></div>
                            <div className="ps-page__content ps-account">
                                <div className="titlesformsUsers">
                                    <p>Validación documentos</p>
                                </div>
                                <Grid sx={{ width: isMdDown ? "100%" : "80%" }}>

                                    {
                                        dctosUser?.length > 0 ?
                                            <Grid item xs={12} md={12}>
                                                {
                                                    count == 1 ?
                                                        <p
                                                            style={{
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                color: "red",
                                                                marginBottom: "30px"
                                                            }}>
                                                            {mensaje}
                                                        </p>
                                                        :
                                                        <p
                                                            style={{
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                color: "green",
                                                                marginBottom: "30px"
                                                            }}>
                                                            {mensaje}
                                                        </p>
                                                }

                                            </Grid>
                                            :
                                            <Grid item xs={12} md={12}>
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        fontWeight: "600",
                                                        color: "#2C2E82",
                                                    }}>
                                                    Adjunta los siguientes archivos para
                                                    enviar la solicitud de cambio de
                                                    cuenta a persona juridica
                                                </p>
                                            </Grid>
                                    }

                                    {
                                        dctosUser?.length > 0 ?
                                            <TableContainer
                                                sx={{
                                                    width: "1000px",
                                                }}
                                            >
                                                <Table>
                                                    <TableHead
                                                        sx={{
                                                            "& th": {
                                                                color: "#2D2E83",
                                                                fontSize: "14px",
                                                                backgroundColor: "#F1F2F6",
                                                            },
                                                        }}>
                                                        <TableRow>
                                                            <TableCell>
                                                                Fecha
                                                            </TableCell>
                                                            <TableCell>
                                                                Documento
                                                            </TableCell>
                                                            <TableCell>
                                                                Estado Documento
                                                            </TableCell>
                                                            <TableCell>
                                                                Ver Documento
                                                            </TableCell>

                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {dctosUser &&
                                                            dctosUser.map((insp, index) => {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            <Typography
                                                                                className="textoeditdcto4"
                                                                            >
                                                                                {insp.fechadecreacion}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Typography
                                                                                className="textoeditdcto0"
                                                                            >
                                                                                Documento Persona Juridica {parseInt(index) + parseInt(1)}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Typography
                                                                                className="textoeditdcto0"
                                                                            >
                                                                                {insp.nombreestado}
                                                                            </Typography>
                                                                        </TableCell>

                                                                        <TableCell>
                                                                            <div className="textoeditdcto3">
                                                                                <a
                                                                                    href={URL_IMAGES_RESULTSSMS + insp.nombredocumento}
                                                                                    target="_blank"
                                                                                >
                                                                                    <FaEye
                                                                                        className='iconovertransacc'
                                                                                    />
                                                                                </a>
                                                                            </div>
                                                                        </TableCell>

                                                                    </TableRow>

                                                                );
                                                            })}
                                                    </TableBody>

                                                </Table>
                                            </TableContainer>
                                            :
                                            <div>
                                                <Grid
                                                    container
                                                    mt={5}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}>
                                                    {items.map((item, index) => (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                fontSize: "20px",
                                                                fontWeight: "400",
                                                                color: "#2C2E82",
                                                            }}>
                                                            <MdOutlineHorizontalRule
                                                                style={{
                                                                    marginRight: "5px",
                                                                }}
                                                                size={15}
                                                            />
                                                            {item}
                                                        </Box>
                                                    ))}
                                                </Grid>
                                                <Grid
                                                    container
                                                    mt={5}
                                                    sx={{ display: "flex" }}>
                                                    {/* Primer div */}
                                                    <div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                position: "relative",
                                                                marginBottom: "20px",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                handleSquareClick(1)
                                                            }>
                                                            <input
                                                                type="file"
                                                                id="fileInput1"
                                                                onChange={(event) =>
                                                                    handleFileChangeUno(
                                                                        1,
                                                                        event
                                                                    )
                                                                }
                                                                style={{ display: "none" }}
                                                                accept=".jpg, .jpeg, .png, .pdf"
                                                            />
                                                            <IoSquareOutline
                                                                size={115}
                                                                style={{ color: "#2D2E83" }}
                                                            />
                                                            {fileData1 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        marginTop: "-60px"
                                                                    }}>
                                                                    {getFileIcon(fileData1)}
                                                                </div>
                                                            ) : (
                                                                <HiOutlineDocumentArrowUp
                                                                    size={65}
                                                                    style={{
                                                                        color: "#2D2E83",
                                                                        position:
                                                                            "absolute",
                                                                        top: "24px",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        {fileData1 && (
                                                            <div
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginTop: "-20px",
                                                                    display: "flex",
                                                                    justifyContent:
                                                                        "center",
                                                                }}>
                                                                <FaCheck
                                                                    size={20}
                                                                    style={{
                                                                        color: "#2D2E83",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Segundo div */}
                                                    <div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                position: "relative",
                                                                marginBottom: "20px",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                handleSquareClick(2)
                                                            }>
                                                            <input
                                                                type="file"
                                                                id="fileInput2"
                                                                onChange={(event) =>
                                                                    handleFileChangeDos(
                                                                        2,
                                                                        event
                                                                    )
                                                                }
                                                                style={{ display: "none" }}
                                                                accept=".jpg, .jpeg, .png, .pdf"
                                                            />
                                                            <IoSquareOutline
                                                                size={115}
                                                                style={{ color: "#2D2E83" }}
                                                            />
                                                            {fileData2 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        marginTop: "-60px"
                                                                    }}>
                                                                    {getFileIcon(fileData2)}
                                                                </div>
                                                            ) : (
                                                                <HiOutlineDocumentArrowUp
                                                                    size={65}
                                                                    style={{
                                                                        color: "#2D2E83",
                                                                        position:
                                                                            "absolute",
                                                                        top: "24px",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        {fileData2 && (
                                                            <div
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginTop: "-20px",
                                                                    display: "flex",
                                                                    justifyContent:
                                                                        "center",
                                                                }}>
                                                                <FaCheck
                                                                    size={20}
                                                                    style={{
                                                                        color: "#2D2E83",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Tercer div */}
                                                    <div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                position: "relative",
                                                                marginBottom: "20px",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                handleSquareClick(3)
                                                            }>
                                                            <input
                                                                type="file"
                                                                id="fileInput3"
                                                                onChange={(event) =>
                                                                    handleFileChangeTres(
                                                                        3,
                                                                        event
                                                                    )
                                                                }
                                                                style={{ display: "none" }}
                                                                accept=".jpg, .jpeg, .png, .pdf"
                                                            />
                                                            <IoSquareOutline
                                                                size={115}
                                                                style={{ color: "#2D2E83" }}
                                                            />
                                                            {fileData3 ? (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        marginTop: "-60px"
                                                                    }}>
                                                                    {getFileIcon(fileData3)}
                                                                </div>
                                                            ) : (
                                                                <HiOutlineDocumentArrowUp
                                                                    size={65}
                                                                    style={{
                                                                        color: "#2D2E83",
                                                                        position:
                                                                            "absolute",
                                                                        top: "24px",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        {fileData3 && (
                                                            <div
                                                                style={{
                                                                    textAlign: "center",
                                                                    marginTop: "-20px",
                                                                    display: "flex",
                                                                    justifyContent:
                                                                        "center",
                                                                }}>
                                                                <FaCheck
                                                                    size={20}
                                                                    style={{
                                                                        color: "#2D2E83",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    container
                                                    mt={3}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}>
                                                    <p
                                                        style={{
                                                            color: "#2C2E82",
                                                            fontSize: "20px",
                                                        }}>
                                                        Ten en cuenta que:
                                                    </p>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            fontSize: "18px",
                                                            fontWeight: "400",
                                                            color: "#2C2E82",
                                                        }}>
                                                        <MdOutlineHorizontalRule
                                                            style={{ marginRight: "5px" }}
                                                            size={15}
                                                        />
                                                        Cada archivo pdf debe pesar máximo
                                                        700KB
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            fontSize: "18px",
                                                            fontWeight: "400",
                                                            color: "#2C2E82",
                                                        }}>
                                                        <MdOutlineHorizontalRule
                                                            style={{ marginRight: "5px" }}
                                                            size={15}
                                                        />{" "}
                                                        Los archivos deben ser en formato
                                                        PNG, JPG, JPEG, PDF
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            fontSize: "18px",
                                                            fontWeight: "400",
                                                            color: "#2C2E82",
                                                        }}>
                                                        <MdOutlineHorizontalRule
                                                            style={{ marginRight: "5px" }}
                                                            size={15}
                                                        />{" "}
                                                        Cada imagen debe pesar máximo 800KB
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            fontSize: "18px",
                                                            fontWeight: "400",
                                                            color: "#2C2E82",
                                                        }}>
                                                        <MdOutlineHorizontalRule
                                                            style={{ marginRight: "5px" }}
                                                            size={15}
                                                        />
                                                        La imagen debe estar enfocada
                                                    </Box>
                                                </Grid>
                                                <Grid container item xs={12} md={12}>
                                                    <Grid item xs={12} md={7}></Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <Box
                                                            display="flex"
                                                            justifyContent="space-between"
                                                            mt={8}
                                                            mb={8}>
                                                            <button
                                                                onClick={handleValidP}
                                                                className="CancelarFormButton">
                                                                Cancelar
                                                            </button>
                                                            <button
                                                                onClick={handleValidacion}
                                                                className="GuardarFormButton">
                                                                Guardar
                                                            </button>

                                                            <ModalMensajes
                                                                shown={showModal}
                                                                close={handleModalClose}
                                                                titulo={tituloMensajes}
                                                                mensaje={textoMensajes}
                                                                tipo="error"
                                                            />
                                                            <Dialog
                                                                className="dialogDatsGuardados"
                                                                open={confirmationOpen}
                                                                PaperProps={{
                                                                    style: {
                                                                        width: isMdDown
                                                                            ? "80%"
                                                                            : "35%",
                                                                        backgroundColor:
                                                                            "white",
                                                                        border: "2px solid gray",
                                                                        padding: "1.4rem",
                                                                        borderRadius:
                                                                            "10px",
                                                                    },
                                                                }}>
                                                                <DialogTitle className="dialogtitleDtsGUardados">
                                                                    <FaCheckCircle
                                                                        size={37}
                                                                        style={{
                                                                            color: "#10c045",
                                                                            marginLeft:
                                                                                "-17px",
                                                                            marginRight:
                                                                                "8px",
                                                                        }}
                                                                    />

                                                                    <p className="dialogtituloP">
                                                                        ¡Cambios realizados
                                                                        con éxito!
                                                                    </p>
                                                                </DialogTitle>
                                                                <DialogContent className="dialogContentDatsGuardados">
                                                                    <p className="PdialogContent">
                                                                        Tus cambios fueron
                                                                        realizamos con
                                                                        exito. Se verán
                                                                        reflejados un unos
                                                                        minutos.
                                                                    </p>
                                                                </DialogContent>
                                                                <DialogActions className="DialogActionsDatsGuardados">
                                                                    <div className="div1buttonDialog">
                                                                        <button
                                                                            className="button2DialogDatsGuardados"
                                                                            onClick={handleConfirmationSuccess(
                                                                                "/EditUsers/MisDatos"
                                                                            )}>
                                                                            Ir a Mis datos
                                                                        </button>
                                                                    </div>
                                                                    <div className="div1buttonDialog">
                                                                        <button
                                                                            className="button1DialogDatsGuardados"
                                                                            onClick={handleConfirmationSuccess(
                                                                                "/"
                                                                            )}>
                                                                            Ir al inicio
                                                                        </button>
                                                                    </div>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </div>

                                    }
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container >
            </div >
        </>
    );
};

export default ValidDocsPjuridica;
