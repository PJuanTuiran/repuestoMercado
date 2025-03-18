import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, InputAdornment, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { URL_BD_MR } from "../../helpers/Constants";
import { BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";

export default function misFacturas() {

    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // console.log("Usuario Facturacion : ", datosusuarios);
    const [busqueda, setBusqueda] = useState("");
    const [user, setUser] = useState(null);
    const [direccion, setDireccion] = useState(null);
    const [UidUser, setUidUser] = useState("");
    const [comprasUsuario, setComprasUsuario] = useState([]);
    const [descargando, setDescargando] = useState(false);

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //Seleccionar funcion por mas antiguo o mas nuevo 
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);

        if (eventKey === "Más antiguo") {
            setComprasUsuario(prevCompras =>
                [...prevCompras].sort((a, b) => new Date(a.fechacompra) - new Date(b.fechacompra))
            );
        } else if (eventKey === "Más reciente") {
            setComprasUsuario(prevCompras =>
                [...prevCompras].sort((a, b) => new Date(b.fechacompra) - new Date(a.fechacompra))
            );
        } else if (eventKey === "Mayor precio") {
            setComprasUsuario(prevCompras =>
                [...prevCompras].sort((a, b) => b.preciodelservicio - a.preciodelservicio)
            );
        } else if (eventKey === "Menor precio") {
            setComprasUsuario(prevCompras =>
                [...prevCompras].sort((a, b) => a.preciodelservicio - b.preciodelservicio)
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

    //función para obtener datos usuario logged
    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setUidUser(res.data[0].uid)
                setUser(res.data[0])
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
            }
        };
        obtenerDatosUsuario();
    }, [datosusuarios]);



    //Función para obtener factura comparando con UId loggeado del vendedor o no
    useEffect(() => {
        const ObtenerFacturas = async () => {
            let params = {
                uidvendedor: UidUser,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "121",
                    params
                });
                console.log('Datos del endPoint 121:', res.data);

                setComprasUsuario(res.data.listarcompras); // Guardamos todas las compras del usuario
                console.log(comprasUsuario)
            } catch (error) {
                console.error("Error al leer los datos de las compras", error);
            }
        };
        ObtenerFacturas();
    }, [UidUser]);



    const formatearFecha = (fechaCompra) => {
        let fechaDeCompra = null;
        if (fechaCompra) {
            const fecha = new Date(fechaCompra);
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
            const ano = fecha.getFullYear();
            fechaDeCompra = `${dia}-${mes}-${ano}`;
        }
        return fechaDeCompra;
    }

    const filtrarFacturas = (compras, numeroFactura) => {
        const numeroFacturaString = String(numeroFactura);
        return compras.filter(compra => compra.numeroctaxcobrar && String(compra.numeroctaxcobrar).includes(numeroFacturaString));
    }

    const comprasFiltradas = filtrarFacturas(comprasUsuario, busqueda);

    const descargarPDF = (compra) => {
        event.stopPropagation();
        const doc = new jsPDF();

        // Agrega los datos de la factura al PDF
        doc.text(`Fecha de compra: ${formatearFecha(compra.fechacompra)}`, 10, 10);
        doc.text(`Fecha de entrega: ${formatearFecha(compra.fechaentrega)}`, 10, 20);
        doc.text(`Fecha de devolución: ${formatearFecha(compra.fechadevolucion)}`, 10, 30);
        doc.text(`Fecha de pago: ${formatearFecha(compra.fechadepago)}`, 10, 40);
        doc.text(`Fecha de vencimiento: ${formatearFecha(compra.fechadevencimiento)}`, 10, 50);
        doc.text(`Precio del servicio: $${compra.preciodelservicio}`, 10, 60);
        doc.text(`Precio de envío: $${compra.precioenvio}`, 10, 70);
        doc.text(`Retención: $${compra.retencion}`, 10, 80);
        doc.text(`Impuestos: $${compra.impuestos}`, 10, 90);
        doc.text(`Identificación: ${compra.identificacion}`, 10, 100);
        doc.text(`Email: ${compra.email}`, 10, 110);
        doc.text(`Celular: ${compra.celular}`, 10, 120);
        doc.text(`Nombres: ${compra.nombres}`, 10, 130);
        doc.text(`ID del producto: ${compra.idproductovehiculo}`, 10, 140);
        doc.text(`Título del producto: ${compra.titulonombre}`, 10, 150);
        doc.text(`Medio de pago: ${compra.mediodepago}`, 10, 160);
        doc.text(`Estado del pago: ${compra.nombreestadopago}`, 10, 170);
        doc.text(`Concepto del pago: ${compra.nombreconceptopago}`, 10, 180);

        // Guarda el PDF
        doc.save("factura.pdf");
    }

    const descargarExcel = (compra) => {
        if (!descargando) {
            setDescargando(true);
            event.stopPropagation();
            // Crear un nuevo libro de trabajo
            const wb = utils.book_new();

            // Crear una hoja de trabajo
            const ws_data = [
                ['Fecha de compra', 'Fecha de entrega', 'Fecha de devolución', 'Fecha de pago', 'Fecha de vencimiento', 'Precio del servicio', 'Precio de envío', 'Retención', 'Impuestos', 'Identificación', 'Email', 'Celular', 'Nombres', 'ID del producto', 'Título del producto', 'Medio de pago', 'Estado del pago', 'Concepto del pago'],
                [formatearFecha(compra.fechacompra), formatearFecha(compra.fechaentrega), formatearFecha(compra.fechadevolucion), formatearFecha(compra.fechadepago), formatearFecha(compra.fechadevencimiento), compra.preciodelservicio, compra.precioenvio, compra.retencion, compra.impuestos, compra.identificacion, compra.email, compra.celular, compra.nombres, compra.idproductovehiculo, compra.titulonombre, compra.mediodepago, compra.nombreestadopago, compra.nombreconceptopago]
            ];
            const ws = utils.aoa_to_sheet(ws_data);

            // Añadir la hoja de trabajo al libro de trabajo
            utils.book_append_sheet(wb, ws, "Factura");

            // Escribir el libro de trabajo en un Blob
            const wbout = writeFile(wb, 'factura.xlsx', { type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });

            // Guardar el archivo
            saveAs(blob, 'factura.xlsx');

            // Al final de la descarga, restablece el estado de 'descargando'
            setDescargando(false);
        }
    }

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
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
                                            onClick={(e) => { e.preventDefault(); router.push('./facturacion') }}

                                        >
                                            <p className="VerVentaLink VerVentaLinkPres">Facturación</p>
                                        </Link>
                                        <p className="VerVentaLink VerVentaLinkPres">Mis facturas</p>
                                    </Breadcrumbs>
                                </Grid>
                                <Grid className="contMainMisFacturas contMainMisFacturas2" container style={{ width: isMdDown ? '100%' : '90%', marginTop:'-1rem' }}>
                                    <div className="contTopMisFacturas">
                                        <InputBase
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                            placeholder="Buscar por número de factura"
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: '#f1f2f6',
                                                padding: '8px',
                                                width: '410px',
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

                                        <Dropdown onSelect={handleSelect} className="dropFactura">
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic"
                                            >
                                                {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}
                                            </Dropdown.Toggle>
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
                                    </div>

                                    <div className="dataMainFacturas">
                                        <div className="topDataMainFacturas">
                                            <p>Fecha de emisión</p>
                                            <p>Concepto de facturación</p>
                                            <p>Número de factura</p>
                                            <p>Total facturado</p>
                                            <p>Descargar</p>
                                        </div>

                                        {comprasFiltradas.length > 0 ? (
                                            comprasFiltradas.map((compra, index) => {
                                                const fechaDeCompra = formatearFecha(compra.fechacompra);

                                                let total = compra.preciodelservicio + compra.impuestos + compra.retencion + compra.precioenvio;

                                                // Formateamos el total con separadores de miles
                                                let totalFormateado = total.toLocaleString('en-US');
                                                return (
                                                    <div className="MapDataMainFacturas" key={index}>
                                                        <div className="MapDataMainFacturasDate">
                                                            <p>{fechaDeCompra}</p>
                                                        </div>
                                                        <div className="MapDataMainFacturasConcept">
                                                            <p>{compra.nombreconceptopago}</p>
                                                        </div>
                                                        <div className="MapDataMainFacturasNumber">
                                                            <p>{compra.numeroctaxcobrar}</p>
                                                        </div>
                                                        <div className="MapDataMainFacturasTotal">
                                                            <p>${totalFormateado}</p> {/* Aquí renderizamos el total */}
                                                        </div>
                                                        <div className="MapDataMainFacturasDownload">
                                                            <RiFileExcel2Fill className="ExcelIcon" onClick={() => descargarExcel(compra)} />
                                                            <BsFiletypePdf className="pdfIcon" onClick={() => descargarPDF(compra)} />
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p>No hay compras para mostrar</p>
                                        )}
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}