import Container from "../../components/layouts/Container"
import { Grid, useMediaQuery, useTheme, InputAdornment, InputBase, Tooltip, IconButton, Modal } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { URL_BD_MR } from "../../helpers/Constants";
import { useSelector } from "react-redux";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import shortid from "shortid";
import ModalMensajes from "../mensajes/ModalMensajes";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";
import { GrCertificate } from "react-icons/gr";

import ListarDocumentos from "./ListarDocumentos";
import ListarDctosTransaccion from "./ListarDctosTransaccion";
import RegistrarDctoTransaccion from "./RegistrarDctoTransaccion";
import ListarDetalleConcepto from "./ListarDetalleConcepto";

export default function misMovimientos() {

    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null);
    const fileInput = useRef(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [busqueda, setBusqueda] = useState(false);
    const [movimientos, setMovimientos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [modalEditar, setModalEditar] = useState(false);
    const [modalGrabarDcto, setModalGrabarDcto] = useState(false);
    const [modalListarDcto, setModalListarDcto] = useState(false);
    const [modalDetalleConcepto, setModalDetalleConcepto] = useState(false);

    const [nameFileLoad, setNameFileLoad] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [extension, setExtension] = useState("");
    const [selectedPDFDos, setSelectedPDFDos] = useState(null);
    const [tipoFile, setTipoFile] = useState(null);
    const [loadFile, setLoadFile] = useState(false);
    const [archivoUser, setArchivoUser] = useState([]);

    const [showModalMensaje, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const handleClosePdf = () => setModalEditar(false);
    const handleGrabarDcto = () => setModalGrabarDcto(false);
    const handleListarDcto = () => setModalListarDcto(false);
    const handleDetalleConcepto = () => setModalDetalleConcepto(false);

    const [estadoCuenta, setEstadoCuenta] = useState(null);

    const [dataSelectDctos, setDataSelectDctos] = useState([]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    let uidusuario = null;
    let idinterno = null;
    let tipousuario = null;

    if (typeof window !== "undefined") {
        if (router.query.uidusuario) {
            uidusuario = JSON.parse(router.query.uidusuario);
            idinterno = JSON.parse(router.query.idinterno);
            tipousuario = JSON.parse(router.query.tipousuario);
        }
    }

    const verDocumentos = (data) => {
        setModalEditar(true)
        setDataSelectDctos(data);
    }

    const grabarDctos = (data) => {
        setModalGrabarDcto(true)
        setDataSelectDctos(data);
    }

    const listarDctos = (data) => {
        setModalListarDcto(true)
        setDataSelectDctos(data);
    }

    const detalleConcepto = (data) => {
        setModalDetalleConcepto(true)
        setDataSelectDctos(data);
    }

    useEffect(() => {
        setBusqueda(false);
        const listarSolPendientes = async () => {

            let valsolpendiente = 0;

            let params = {
                uidvendedor: uidusuario
            }

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "1552", params
                });

                if (res.data.type == 1) {
                    res.data.listarsolpendiente &&
                        res.data.listarsolpendiente.map((pendt) => {
                            valsolpendiente = parseFloat(valsolpendiente) + parseFloat(pendt.valortransferencia);
                            //console.log("PENDIE : ", pendt.valortransferencia)
                        });

                    ListarMovimientosUsuario(valsolpendiente);
                }
            } catch (error) {
                console.error("Error al leer los datos", error);
            }
        };
        listarSolPendientes();

        const ListarMovimientosUsuario = async (valpte) => {
            let params = {
                uidcomprador: uidusuario,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}218`,
                    params,
                });

                const datosUsuario = res.data.listmovbilletera.filter(usuario => usuario.idcomprador == uidusuario);

                let saldocta = 0;
                res.data.listmovbilletera &&
                    res.data.listmovbilletera.map((mov) => {
                        if (mov.idtransaccion == 1) {
                            saldocta = parseFloat(saldocta) + parseFloat(mov.valorabono);
                        } else
                            if (mov.idtransaccion == 2) {
                                saldocta = parseFloat(saldocta) - parseFloat(mov.valorabono);
                            }

                    });

                saldocta = parseFloat(saldocta) - parseFloat(valpte);
                leerDctosUsuario(saldocta, datosUsuario)
               
            } catch (error) {
                console.error("Error al leer las transacciones del vendedor", error);
            }
        };

        const leerDctosUsuario = async (saldo, datosusu) => {
            //console.log("Dctos usuarios: ", saldo, datosusu);
            //return
            try {
                // We make a POST request to the server with the client ID as a parameter
                let params = {
                    uidusuario: datosusu[0].uid,
                };

                console.log("UID USUA: ", datosusu[0].uid);

                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "240", params
                });
                //console.log("Full response received: ", res.data);

                if (res.data && res.data.type === 1) {
                    // Log the list of site surveys
                    //console.log("Dctos usuarios: ", res.data);
                    //setCategorias(res.data.listcategoriasinspeccion);
                    let dctosusuario = res.data.listardctotransac;

                    let itemmov = [];
                    let datamov = [];
                    datosusu &&
                        datosusu.map((item) => {
                            let control = null;
                            dctosusuario &&
                                dctosusuario.map((dctos) => {
                                    if (dctos.idtransaccion == item.idmov)
                                        control = true;
                                });

                            if (control) {
                                //console.log("DCTOS : ", dctos)
                                itemmov = ({
                                    ...item, dctosusu: true
                                });
                            } else {
                                itemmov = ({
                                    ...item, dctosusu: false
                                });
                            }
                            //alert("wwww")
                            datamov.push(itemmov);
                        });
                    //console.log("DCTOS : ", datamov)
                    setEstadoCuenta(saldo);
                    setMovimientos(datamov);
                } else {
                    // If the response type is not 1, log the actual response type
                    console.log("Error leyendo Documentos: ", res.data);
                }
            } catch (error) {
                // If there's an error in the process, log the error message
                console.error("Error leyendo Documentos", error);
            }
        };

        const listUsuarioImg = async () => {
            let params = {
                uidusuario: datosusuarios.uid,
            };

            console.log("params : ", params)

            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}236`,
                    params,
                });

                const usuarioimg = res.data.listarcertiusuarios;

                setArchivoUser(usuarioimg);


            } catch (error) {
                console.error("Error al leer las transacciones del vendedor", error);
            }
        };
        listUsuarioImg();

    }, [uidusuario, busqueda]);

    const handleClick = () => {
        fileInput.current.click();
    }

    //Seleccionar funcion por mas antiguo o mas nuevo 
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);

        if (eventKey === "Más antiguo") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => new Date(a.fechaabono) - new Date(b.fechaabono))
            );
        } else if (eventKey === "Más reciente") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => new Date(b.fechaabono) - new Date(a.fechaabono))
            );
        } else if (eventKey === "Mayor precio") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => b.valorabono - a.valorabono)
            );
        } else if (eventKey === "Menor precio") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => a.valorabono - b.valorabono)
            );
        }
    };

    //Button de dropdown
    const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="dropdowncustomMisFacturas"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
        </button>
    ));


    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

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

    const grabarDocumentos = async () => {
        /*
        if (archivoUser) {
            alert("entre")
            setShowModalMensajes(true);
            setTituloMensajes("Documentos");
            setTextoMensajes("Ya tienes registrados documentos, puedes actualizar los archivos");
            return
        }
            */

        let archivo;
        let URLTIPO;

        if (tipoFile == 1) {
            archivo = selectedImage;
            URLTIPO = `${URL_BD_MR}234`;
        } else if (tipoFile == 2) {
            archivo = selectedPDFDos;
            URLTIPO = `${URL_BD_MR}235`;
        }

        //Generar nombre de la imagen
        let ImageName = shortid();

        // Crear un objeto FormData
        let formData = new FormData();
        // Agregar los demás campos a formData
        formData.append("uid", uidusuario);
        formData.append("nombrearchivo", "Certificados");
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
                    } else {
                        console.error("Archivo grabado!", "success");
                        setShowModalMensajes(true);
                        setTituloMensajes("Documentos");
                        setTextoMensajes("Ya hemos guardado tus documentos, cerrar para continuar");
                        setBusqueda(true);
                        return
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

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <Modal
                        open={modalEditar}
                        onClose={handleClosePdf}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <ListarDocumentos
                            dataSelectDctos={dataSelectDctos}
                            idcertificado={dataSelectDctos.idcertificado}
                            idinterno={idinterno}
                            uidusuario={uidusuario}
                            setModalEditar={setModalEditar}
                            tipousuario={tipousuario}
                        />
                    </Modal>
                    <Modal
                        open={modalGrabarDcto}
                        onClose={handleGrabarDcto}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <RegistrarDctoTransaccion
                            dataSelectDctos={dataSelectDctos}
                            idinterno={idinterno}
                            setModalGrabarDcto={setModalGrabarDcto}
                        />
                    </Modal>
                    <Modal
                        open={modalListarDcto}
                        onClose={handleListarDcto}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <ListarDctosTransaccion
                            dataSelectDctos={dataSelectDctos}
                            idinterno={idinterno}
                            setModalListarDcto={setModalListarDcto}
                            tipousuario={tipousuario}
                        />
                    </Modal>
                    <Modal
                        open={modalDetalleConcepto}
                        onClose={handleDetalleConcepto}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <ListarDetalleConcepto
                            dataSelectDctos={dataSelectDctos}
                            idinterno={idinterno}
                            setModalDetalleConcepto={setModalDetalleConcepto}
                        />
                    </Modal>


                    <ModalMensajes
                        shown={showModalMensaje}
                        close={setShowModalMensajes}
                        titulo={tituloMensajes}
                        mensaje={textoMensajes}
                        tipo="error"
                    />
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container" >
                            <div className="ps-page__header" > </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>

                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9', marginBottom: '3rem' }} size={17} />} aria-label="breadcrumb" className="linkMisvResF">
                                        <Link
                                            className="linkMisv"
                                            underline="none"
                                            href="./"
                                            onClick={(e) => { e.preventDefault(); router.push('./') }}

                                        >
                                            <p className="VerVentaLink VerVentaLinkPres">Mi billetera</p>
                                        </Link>
                                        <p className="VerVentaLink VerVentaLinkPres">Mis movimientos</p>
                                    </Breadcrumbs>
                                </Grid>
                                <Grid className="contMainMisFacturas contMainMisFacturas2" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '-1rem' }}>
                                    <div className="contTopMisFacturas">
                                        <Grid item xs={12} md={3} lg={3}>
                                            <InputBase
                                                value={searchTerm}
                                                onChange={event => setSearchTerm(event.target.value)}
                                                placeholder="Buscar en mis movimientos"
                                                sx={{
                                                    borderRadius: '10px',
                                                    backgroundColor: '#f1f2f6',
                                                    padding: '8px',
                                                    width: '320px',
                                                    height: '44px',
                                                    padding: '10px',
                                                    fontSize: '16px',
                                                    paddingLeft: '3rem',
                                                    color: '#2C2E82',
                                                    fontWeight: '500',
                                                    '&::placeholder': {
                                                        color: '#3E4089',
                                                        fontWeight: '600',
                                                    },
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <SearchIcon style={{ fontSize: 30, color: '#3E4089' }} />
                                                    </InputAdornment>
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            {
                                                nameFileLoad ?
                                                    <div className="guardardcobilletera"
                                                        onClick={() => grabarDocumentos()}
                                                    >
                                                        Guardar documentos
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <Dropdown onSelect={handleSelect} className="dropFactura">
                                                <div className="ordenarbilletera">
                                                    <Dropdown.Toggle
                                                        as={CustomDropdownButton}
                                                        id="dropdown-basic"
                                                    >
                                                        {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}

                                                    </Dropdown.Toggle>
                                                </div>
                                                <Dropdown.Menu className="tamañocajaoptionsVendedor">
                                                    <Dropdown.Item
                                                        eventKey="Más antiguo"
                                                        className="itemsdropdownVerVenta"
                                                    >
                                                        Más antiguo
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Más reciente"
                                                        className="itemsdropdownVerVenta"
                                                    >
                                                        Más reciente
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Mayor precio"
                                                        className="itemsdropdownVerVenta"
                                                    >
                                                        Mayor precio
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Menor precio"
                                                        className="itemsdropdownVerVenta"
                                                    >
                                                        Menor precio
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Grid>
                                    </div>

                                    <Grid container>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <div className="saldocuenta">Saldo disponible: {" "}</div>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <div className="saldocuenta">
                                                $
                                                {" "}{estadoCuenta && estadoCuenta.toLocaleString(
                                                    "en-US"
                                                )}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container className="dataMainMovimientos" display={'flex'} flexDirection={'column'}>
                                        <Grid item xs={12}>
                                            <Grid container className="dataMovimientosTop">
                                                <Grid item xs={12} md={1} lg={1}>
                                                    <p>ID compra</p>
                                                </Grid>
                                                <Grid item xs={12} md={1} lg={1}>
                                                    <p>ID abono</p>
                                                </Grid>
                                                <Grid item xs={12} md={1.1} lg={1.1}>
                                                    <p>Fecha</p>
                                                </Grid>
                                                <Grid item xs={12} md={5} lg={5}>
                                                    <p className="ml-5px">Concepto</p>
                                                </Grid>
                                                <Grid item xs={12} md={1.2} lg={1.2}>
                                                    <div className="single-line">Valor abono</div>
                                                </Grid>
                                                <Grid item xs={12} md={1.2} lg={1.2}>
                                                    <div className="single-line">Valor retiro</div>
                                                </Grid>
                                                <Grid item xs={12} md={1} lg={1}>
                                                    <div className="dctotransaccion">Documentos</div>
                                                </Grid>
                                            </Grid>

                                            {movimientos && movimientos
                                                .filter(movimiento => movimiento.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion))
                                                .map((movimiento, index) => (
                                                    <Grid container className="dataMovimientosM" key={index}>
                                                        <Grid item xs={12} md={1} lg={1}>
                                                            <p>{movimiento.idcompra}</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={1} lg={1}>
                                                            <p>{movimiento.idmovimiento}</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={1.1} lg={1.1}>
                                                            <p className="fechabilletera">
                                                                {movimiento.fechaaprobacion}
                                                            </p>
                                                        </Grid>
                                                        <Grid item xs={12} md={5} lg={5}>
                                                            <p className="nombreconceptobilletera">
                                                                {movimiento.nombre}
                                                            </p>
                                                        </Grid>
                                                        <Grid item xs={12} md={1.2} lg={1.2}>
                                                            {
                                                                movimiento.idtransaccion == 1 ?
                                                                    <div className="valorbilletera">
                                                                        ${movimiento.valorabono.toLocaleString('en-US')}
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </Grid>
                                                        <Grid item xs={12} md={1.2} lg={1.2}>
                                                            {
                                                                movimiento.idtransaccion == 2 ?
                                                                    <div className="valorbilletera">
                                                                        ${movimiento.valorabono.toLocaleString('en-US')}
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </Grid>
                                                        <Grid item xs={12} md={1} lg={1}>
                                                            <Grid container>
                                                                <Grid item xs={12} md={4} lg={4}>
                                                                    {
                                                                        tipousuario == 2 && movimiento.idcompra == 0 ?
                                                                            <Tooltip title='Subir documentos' placement="top-start">
                                                                                <IconButton
                                                                                    onClick={() => grabarDctos(movimiento)}
                                                                                >
                                                                                    <FaCloudUploadAlt
                                                                                        className="iconodctobilletera"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            :
                                                                            <Tooltip
                                                                                title='Subir documentos'
                                                                                placement="top-start"
                                                                                className="deshabilitar"
                                                                            >
                                                                                <IconButton>
                                                                                    <FaCloudUploadAlt
                                                                                        className="iconodctobilletera"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                    }

                                                                </Grid>
                                                                <Grid item xs={12} md={4} lg={4}>
                                                                    {
                                                                        movimiento.idcompra > 0 || !movimiento.dctosusu ?
                                                                            <Tooltip
                                                                                title='Ver documentos'
                                                                                placement="top-start"
                                                                                className="deshabilitar"
                                                                            >
                                                                                <IconButton>
                                                                                    <FaEye
                                                                                        className="iconodctobilletera2"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            : 
                                                                            <Tooltip title='Ver documentos' placement="top-start">
                                                                                <IconButton
                                                                                    onClick={() => listarDctos(movimiento)}
                                                                                >
                                                                                    <FaEye
                                                                                        className="iconodctobilletera2"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                    }
                                                                </Grid>
                                                                <Grid item xs={12} md={3} lg={3}>
                                                                    {
                                                                        movimiento.idcompra == 0 ?
                                                                            <Tooltip
                                                                                title='Detalle concepto'
                                                                                placement="top-start"
                                                                                className="deshabilitar"
                                                                            >
                                                                                <IconButton>
                                                                                    <BiSolidDetail
                                                                                        className="iconodctobilletera3"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            :
                                                                            <Tooltip title='Detalle concepto' placement="top-start">
                                                                                <IconButton
                                                                                    onClick={() => detalleConcepto(movimiento)}
                                                                                >
                                                                                    <BiSolidDetail
                                                                                        className="iconodctobilletera3"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                    }
                                                                </Grid>
                                                                <Grid item xs={12} md={1} lg={1}>
                                                                    {
                                                                        movimiento.idcompra == 0 ?
                                                                            <Tooltip title='Soporte retiro' placement="top-start">
                                                                                <IconButton
                                                                                    onClick={() => verDocumentos(movimiento)}
                                                                                >
                                                                                    < GrCertificate
                                                                                        className="iconodctobilletera4"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            :
                                                                            <Tooltip
                                                                                title='Soporte retiro'
                                                                                placement="top-start"
                                                                                className="deshabilitar"
                                                                            >
                                                                                <IconButton>
                                                                                    < GrCertificate
                                                                                        className="iconodctobilletera4"
                                                                                    />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                    }
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}