import Container from "../../components/layouts/Container"
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import { URL_BD_MR } from "../../helpers/Constants";
import { BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { jsPDF } from "jspdf";
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';


export default function resFactura() {


    const [dudaVendedor, setDudaVendedor] = useState(null);
    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const ultimaCompra = router.query.ultimaCompra ? JSON.parse(router.query.ultimaCompra) : null;
    const producto = router.query.producto ? JSON.parse(router.query.producto) : null;


    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    let total = 0;
    if (producto && ultimaCompra) {
        total = ultimaCompra.preciodelservicio + ultimaCompra.impuestos + ultimaCompra.retencion + ultimaCompra.precioenvio;
    }

    let fechaDeCompra = null;
    if (ultimaCompra && ultimaCompra.fechacompra) {
        const fecha = new Date(ultimaCompra.fechacompra);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const ano = fecha.getFullYear();
        fechaDeCompra = `${dia}-${mes}-${ano}`;
    }

    let fechaDePago = null;
    if (ultimaCompra && ultimaCompra.fechadepago) {
        const fecha = new Date(ultimaCompra.fechadepago);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const ano = fecha.getFullYear();
        fechaDePago = `${dia}-${mes}-${ano}`;
    }

    let fechaDeVencimiento = null;
    if (ultimaCompra && ultimaCompra.fechadevencimiento) {
        const fecha = new Date(ultimaCompra.fechadevencimiento);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const ano = fecha.getFullYear();
        fechaDeVencimiento = `${dia}-${mes}-${ano}`;
    }

    //Función para descargar pdf
    const descargarPDF = () => {
        if (ultimaCompra) {
            const doc = new jsPDF();


            doc.text(`Fecha de compra: ${(ultimaCompra.fechacompra)}`, 10, 10);
            doc.text(`Fecha de entrega: ${(ultimaCompra.fechaentrega)}`, 10, 20);
            doc.text(`Fecha de devolución: ${(ultimaCompra.fechadevolucion)}`, 10, 30);
            doc.text(`Fecha de pago: ${(ultimaCompra.fechadepago)}`, 10, 40);
            doc.text(`Fecha de vencimiento: ${(ultimaCompra.fechadevencimiento)}`, 10, 50);
            doc.text(`Precio del servicio: $${ultimaCompra.preciodelservicio}`, 10, 60);
            doc.text(`Precio de envío: $${ultimaCompra.precioenvio}`, 10, 70);
            doc.text(`Retención: $${ultimaCompra.retencion}`, 10, 80);
            doc.text(`Impuestos: $${ultimaCompra.impuestos}`, 10, 90);
            doc.text(`Identificación: ${ultimaCompra.identificacion}`, 10, 100);
            doc.text(`Email: ${ultimaCompra.email}`, 10, 110);
            doc.text(`Celular: ${ultimaCompra.celular}`, 10, 120);
            doc.text(`Nombres: ${ultimaCompra.nombres}`, 10, 130);
            doc.text(`ID del producto: ${ultimaCompra.idproductovehiculo}`, 10, 140);
            doc.text(`Título del producto: ${ultimaCompra.titulonombre}`, 10, 150);
            doc.text(`Medio de pago: ${ultimaCompra.mediodepago}`, 10, 160);
            doc.text(`Estado del pago: ${ultimaCompra.nombreestadopago}`, 10, 170);
            doc.text(`Concepto del pago: ${ultimaCompra.nombreconceptopago}`, 10, 180);

            doc.save("factura.pdf");
        } else {
            console.error("No hay datos de factura disponibles para descargar.");
        }
    };

    // Función para descargar en formato Excel
    const descargarExcel = () => {
        if (ultimaCompra) {
            const wb = utils.book_new();
            const ws_data = [
                ['Fecha de compra', 'Fecha de entrega', 'Fecha de devolución', 'Fecha de pago', 'Fecha de vencimiento', 'Precio del servicio', 'Precio de envío', 'Retención', 'Impuestos', 'Identificación', 'Email', 'Celular', 'Nombres', 'ID del producto', 'Título del producto', 'Medio de pago', 'Estado del pago', 'Concepto del pago'],
                [ultimaCompra.fechacompra, ultimaCompra.fechaentrega, ultimaCompra.fechadevolucion, ultimaCompra.fechadepago, ultimaCompra.fechadevencimiento, ultimaCompra.preciodelservicio, ultimaCompra.precioenvio, ultimaCompra.retencion, ultimaCompra.impuestos, ultimaCompra.identificacion, ultimaCompra.email, ultimaCompra.celular, ultimaCompra.nombres, ultimaCompra.idproductovehiculo, ultimaCompra.titulonombre, ultimaCompra.mediodepago, ultimaCompra.nombreestadopago, ultimaCompra.nombreconceptopago]
            ];
            const ws = utils.aoa_to_sheet(ws_data);
            utils.book_append_sheet(wb, ws, "Factura");
            const wbout = writeFile(wb, 'factura.xlsx', { type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, 'factura.xlsx');
        } else {
            console.error("No hay datos de factura disponibles para descargar.");
        }
    };

    //funcion para obtener duda del vendedor
    useEffect(() => {
        const dudasVendedor = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "126",
                });
                console.log(res.data);
                setDudaVendedor(res.data);
            } catch (error) {
                console.error("Error al leer los datos", error);
            }
        };
        dudasVendedor();
    }, []);


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
                                        <p className="VerVentaLink VerVentaLinkPres">Resumen factura</p>
                                    </Breadcrumbs>
                                </Grid>
                                <Grid className="contMainFacturacion" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={7} className="primerContFacturacion" display={'flex'} flexDirection={'column'}>

                                        <div className="ResFacturaMain">
                                            <div className="TopResFacturaMain">
                                                <p>Facturas en curso</p>
                                            </div>
                                            <div className="DataFacturaRes">
                                                <p>Cargos por venta</p>
                                                <p>${ultimaCompra && ultimaCompra.preciodelservicio ? ultimaCompra.preciodelservicio.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Cargos por envío</p>
                                                <p>${ultimaCompra && ultimaCompra.precioenvio ? ultimaCompra.precioenvio.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Impuestos</p>
                                                <p>${ultimaCompra && ultimaCompra.impuestos ? ultimaCompra.impuestos.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Retenciones</p>
                                                <p>${ultimaCompra && ultimaCompra.retencion ? ultimaCompra.retencion.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="TotalFactRes">
                                                <p>Total facturado</p>
                                                <p>${total.toLocaleString('en-US')}</p>
                                            </div>
                                        </div>


                                        <div className="segdoSubcontFactuRes">
                                            <div className="DudsSobreFact">
                                                <p>¿Dudas sobre tu factura?</p>
                                                <IoIosInformationCircleOutline />
                                            </div>
                                            {dudaVendedor && dudaVendedor.listaresoldudasvende.sort((a, b) => a.id - b.id).map((item) => (
                                                <div className="DudasResFactura" key={item.id}>
                                                    <div className="DudaRandomRes">
                                                        <p>{item.nombre}</p>
                                                    </div>
                                                    <div className="RespuestaRandomRes">
                                                        <p>{item.descripcion}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </Grid>
                                    <Grid item xs={12} md={5} className="segdoContFacturacion" display={'flex'} flexDirection={'column'}>
                                        <div className="contDataResFactura">
                                            <div className="DataContDataResFactura">
                                                <p>Fecha de emisión</p>
                                                <span>
                                                    <p>{fechaDeCompra}</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Fecha de vencimiento</p>
                                                <span>
                                                    <p>{fechaDeVencimiento} </p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Estado del pago</p>
                                                <span>
                                                    <button style={{
                                                        backgroundColor: ultimaCompra && ultimaCompra.estadodelpago === 70 ? '#00BF15' :
                                                            ultimaCompra && ultimaCompra.estadodelpago === 71 ? 'red' :
                                                                'default'
                                                    }}>
                                                        {ultimaCompra && ultimaCompra.nombreestadopago ? ultimaCompra.nombreestadopago : 'No disponible'}
                                                    </button>
                                                </span>
                                            </div>

                                            {ultimaCompra && ultimaCompra.estadodelpago !== 71 && (
                                                <div className="DataContDataResFactura">
                                                    <p>Fecha de pago</p>
                                                    <span>
                                                        <p>{fechaDePago}</p>
                                                    </span>
                                                </div>
                                            )}

                                            <div className="DataContDataResFactura">
                                                <p>Concepto de pago</p>
                                                <span>
                                                    <p>{ultimaCompra && ultimaCompra.nombreconceptopago ? ultimaCompra.nombreconceptopago : 'No disponible'}</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura DataContDataResFacturaTotal">
                                                <p>Por pagar</p>
                                                <span>
                                                    <p>${total.toLocaleString('en-US')}</p>
                                                </span>
                                            </div>

                                        </div>

                                        <div className="contDataResFacturaDownload">
                                            <p>Descargar</p>
                                            <div>
                                                <BsFiletypePdf className="pdfIcon" onClick={descargarPDF} />
                                                <RiFileExcel2Fill className="ExcelIcon" onClick={descargarExcel} />
                                            </div>
                                        </div>
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