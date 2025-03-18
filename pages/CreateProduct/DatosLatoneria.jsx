import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Card, Tooltip, Overlay } from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalComentariosCategorias from "./ModalComentariosCategorias";
import ModalComentariosUbicacionProducto from "./ModalComentariosUbicacionProducto";
import ModalInfoUbicacionPrdoInt from "./ModalInfoUbicacionPrdoInt";
import ModalInfoPosicionPrdoExtIzq from "./ModalInfoPosicionPrdoExtIzq";
import ModalInfoPosicionPrdoExtCentro from "./ModalInfoPosicionPrdoExtCentro";
import ModalInfoPosicionPrdoExtDer from "./ModalInfoPosicionPrdoExtDer";
import ModalInfoUbicacionPrdoIntTrenMotriz from "./ModalInfoUbicacionPrdoIntTrenMotriz";
import ModalInfoTrenMotriz from "./ModalInfoTrenMotriz";
import ModalComentariosHabitaculo from "./ModalComentariosHabitaculo";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";
import iconoaireacondicionadoinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/aireacondicionado.png";
import iconoaireacondicionadoseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/aireacondicionado.png";
import iconoaireacondicionadodescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/aireacondicionado.png";

import iconodireccioninicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/direccion.png";
import iconodireccionseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/direccion.png";
import iconodirecciondescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/direccion.png";

import iconofrenosinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/frenos.png";
import iconofrenosseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/frenos.png";
import iconofrenosdescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/frenos.png";

import iconocajainicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/caja.png";
import iconocajaseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/caja.png";
import iconocajadescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/caja.png";

import iconorefrigeracioninicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/refrigeracion.png";
import iconorefrigeracionseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/refrigeracion.png";
import iconorefrigeraciondescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/refrigeracion.png";

import iconoarranqueinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/arranque.png";
import iconoarranqueseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/arranque.png";
import iconoarranquedescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/arranque.png";

import iconoembragueinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/embrague.png";
import iconoembragueseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/embrague.png";
import iconoembraguedescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/embrague.png";

import iconoescapeinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/escape.png";
import iconoescapeseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/escape.png";
import iconoescapedescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/escape.png";

import iconoinyeccioninicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/inyeccion.png";
import iconoinyeccionseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/inyeccion.png";
import iconoinyecciondescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/inyeccion.png";

import iconorefrigeracioncajainicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/refrigeracioncaja.png";
import iconorefrigeracioncajaseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/refrigeracioncaja.png";
import iconorefrigeracioncajadescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/refrigeracioncaja.png";

import iconosistemaelectricoinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/sistemaelectrico.png";
import iconosistemaelectricoseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/sistemaelectrico.png";
import iconosistemaelectricodescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/sistemaelectrico.png";

import iconosistemaelectricomotorinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/sistemaelectricomotor.png";
import iconosistemaelectricomotorseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/sistemaelectricomotor.png";
import iconosistemaelectricomotordescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/sistemaelectricomotor.png";

import iconosuspensioninicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/suspension.png";
import iconosuspensionseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/suspension.png";
import iconosuspensiondescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/suspension.png";

import iconotransmisioninicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/transmision.png";
import iconotransmisionseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/transmision.png";
import iconotransmisiondescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/transmision.png";

import iconoparabrisasinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/parabrisas.png";
import iconoparabrisasseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/parabrisas.png";
import iconoparabrisasdescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/parabrisas.png";

import iconomotorinicial from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/motor.png";
import iconomotorseleccion from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/motor.png";
import iconomotordescarte from "~/public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/motor.png";

import { Alert } from "antd";

function DatosLatoneria(props) {
    const {
        setShowModalLatoneria,
        showModalLatoneria,
        setShowModalLatoneriaActiva,
        showModalLatoneriaActiva,
        seleccionoUbicacionProducto,
        setSeleccionoUbicacionProducto,
        setShowModalDatosProducto,
        showModalDatosProducto,
        setShowDatosProductos,
        setSelecDatosProducto,
        setShowDatosProductosActiva,
        showDatosProductosActiva,
        tipoVehUno,
        activaDuplicar,
        setActivaDuplicar,
        setOpenCloseUbicarPrd
    } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [iconoAireacondicionado, setIconoAireacondicionado] = useState(
        iconoaireacondicionadodescarte
    );
    const [iconoArranque, setIconoArranque] = useState(iconoarranquedescarte);
    const [iconoCaja, setIconoCaja] = useState(iconocajadescarte);
    const [iconoDireccion, setIconoDireccion] = useState(
        iconodirecciondescarte
    );
    const [iconoEmbrague, setIconoEmbrague] = useState(iconoembraguedescarte);
    const [iconoEscape, setIconoEscape] = useState(iconoescapedescarte);
    const [iconoFrenos, setIconoFrenos] = useState(iconofrenosdescarte);
    const [iconoInyeccion, setIconoInyeccion] = useState(
        iconoinyecciondescarte
    );
    const [iconoMotor, setIconoMotor] = useState(iconomotordescarte);
    const [iconoParabrisas, setIconoParabrisas] = useState(
        iconoparabrisasdescarte
    );

    const [iconoRefrigeracion, setIconoRefrigeracion] = useState(
        iconorefrigeraciondescarte
    );

    const [iconoRefrigeracionCaja, setIconoRefrigeracionCaja] = useState(
        iconorefrigeracioncajadescarte
    );
    const [iconoSistemElectrico, setIconoSistemElectrico] = useState(
        iconosistemaelectricodescarte
    );
    const [iconoSistemElectricoMotor, setIconoSistemElectricoMotor] = useState(
        iconosistemaelectricomotordescarte
    );
    const [iconoSuspension, setIconosuspension] = useState(
        iconosuspensiondescarte
    );
    const [iconoTransmision, setIconoTransmision] = useState(
        iconotransmisiondescarte
    );

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);

    const [nombreUbicacionExterior, setnombreUbicacionExterior] = useState(
        "botonpartesvehiculo redondearborde"
    );
    const [nombreUbicacionInterior, setnombreUbicacionInterior] = useState(
        "botonpartesvehiculo redondearborde"
    );
    const [nombreUbicacionTrenMotriz, setnombreUbicacionTrenMotriz] = useState(
        "botonpartesvehiculo redondearborde"
    );
    const [nombreUbicacionExteriorInfo, setnombreUbicacionExteriorInfo] =
        useState("mt-2 redondearborde");
    const [nombreUbicacionInteriorInfo, setnombreUbicacionInteriorInfo] =
        useState("mt-2 redondearborde");
    const [nombreUbicacionTrenMotrizInfo, setnombreUbicacionTrenMotrizInfo] =
        useState("mt-2 redondearborde");

    const [nombreUbicacionIzquierda, setnombreUbicacionIzquierda] = useState(
        "botonpartesvehiculo redondearborde"
    );
    const [nombreUbicacionCentro, setnombreUbicacionCentro] = useState(
        "botonpartesvehiculo redondearborde"
    );
    const [nombreUbicacionDerecha, setnombreUbicacionDerecha] = useState(
        "botonpartesvehiculo redondearborde"
    );
    const [nombreUbicacionIzquierdaInfo, setnombreUbicacionIzquierdaInfo] =
        useState("mt-2 redondearborde");
    const [nombreUbicacionCentroInfo, setnombreUbicacionCentroInfo] = useState(
        "mt-2 redondearborde"
    );
    const [nombreUbicacionDerechaInfo, setnombreUbicacionDerechaInfo] =
        useState("mt-2 redondearborde");

    const [seleccionoUbicacionConsola, setSeleccionoUbicacionConsola] =
        useState("botonpartesvehiculo redondearborde");
    const [seleccionoUbicacionAsiento, setSeleccionoUbicacionAsiento] =
        useState("botonpartesvehiculo redondearborde");
    const [seleccionoUbicacionTecho, setSeleccionoUbicacionTecho] = useState(
        "botonpartesvehiculo redondearborde"
    );

    const [showImagenExterior, setShowImagenExterior] = useState(true);
    const [showImagenInterior, setShowImagenInterior] = useState(false);
    const [showImagenTrenMotriz, setShowImagenTrenMotriz] = useState(false);

    const [showExteriorBase, setShowExteriorBase] = useState(true);
    const [showImagenIzquierda, setShowImagenIzquierda] = useState(false);
    const [showImagenCentro, setShowImagenCentro] = useState(false);
    const [showImagenDerecha, setShowImagenDerecha] = useState(false);

    const [showConsolaBase, setShowConsolaBase] = useState(true);
    const [showImagenConsola, setShowImagenConsola] = useState(false);
    const [showImagenAsiento, setShowImagenAsiento] = useState(false);
    const [showImagenTecho, setShowImagenTecho] = useState(false);

    const [showImagenBaseMotorElectrico, setShowImagenBaseMotorElectrico] =
        useState(true);
    const [showImagenAireacondicionado, setShowImagenAireacondicionado] =
        useState(false);
    const [showImagenArranque, setShowImagenArranque] = useState(false);
    const [showImagenCaja, setShowImagenCaja] = useState(false);
    const [showImagenDireccion, setShowImagenDireccion] = useState(false);
    const [showImagenEmbrague, setShowImagenEmbrague] = useState(false);
    const [showImagenEscape, setShowImagenEscape] = useState(false);
    const [showImagenFrenos, setShowImagenFrenos] = useState(false);
    const [showImagenInyeccion, setShowImagenInyeccion] = useState(false);
    const [showImagenMotor, setShowImagenMotor] = useState(false);
    const [showImagenParabrisas, setShowImagenParabrisas] = useState(false);
    const [showImagenRefrigeracion, setShowImagenRefrigeracion] =
        useState(false);
    const [showImagenRefrigeracionCaja, setShowImagenRefrigeracionCaja] =
        useState(false);
    const [showImagenSistemElectrico, setShowImagenSistemElectrico] =
        useState(false);
    const [showImagenSistemElectricoMotor, setShowImagenSistemElectricoMotor] =
        useState(false);
    const [showImagenSuspension, setShowImagensuspension] = useState(false);
    const [showImagenTransmision, setShowImagenTransmision] = useState(false);

    const [
        mostrarModalComentariosHabitaculo,
        setMostrarModalComentariosHabitaculo,
    ] = useState(false);
    const [textoPosicionHabitaculo, setTextoPosicionHabitaculo] = useState(0);

    const [ubicarProducto, setUbicarProducto] = useState(0);

    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);

    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);
    const [abrirCerarUbicarProducto, setAbrirCerarUbicarProducto] =
        useState(false);
    const [
        mostrarModalComentariosUbicacionProducto,
        setMostrarModalComentariosUbicacionProducto,
    ] = useState(false);
    const [
        mostrarModalInfoUbicacionPrdoInt,
        setMostrarModalInfoUbicacionPrdoInt,
    ] = useState(false);
    const [tipoSistema, setTipoSistema] = useState(0);
    const [sistemaNoDisponible, setSistemaNoDisponible] = useState(0);
    const [
        mostrarModalInfoPosicionPrdoExtDer,
        setMostrarModalInfoPosicionPrdoExtDer,
    ] = useState(false);

    const [mostrarCodigo, setMostrarCodigo] = useState(false);

    const [mostrarModalPrdoTrenMotriz, setMostrarModalPrdoTrenMotriz] =
        useState(false);

    const [mostrarModalTrenMotriz, setMostrarModalTrenMotriz] = useState(false);
    const [seleccionaTrenMotriz, setSeleccionaTrenMotriz] = useState(0);

    const [textoPosicionUbicacionProducto, setTextoPosicionUbicacionProducto] =
        useState(0);
    const [mensajeUbicacionProd, setMensajeUbicacionProd] = useState(null);
    const [posicionUbicacionProd, setPosicionUbicacionProd] = useState(null);
    const [
        showModalPosicionProductoLatoneria,
        setShowModalPosicionProductoLatoneria,
    ] = useState(false);
    const [posicionProductoIzquierdo, setPosicionProductoIzquierdo] =
        useState(false);
    const [posicionProductoCentro, setPosicionProductoCentro] = useState(false);
    const [posicionProductoDerecho, setPosicionProductoDerecho] =
        useState(false);
    const [
        showModalPosicionProductoHabitaculo,
        setShowModalPosicionProductoHabitaculo,
    ] = useState(false);
    const [posicionProductoConsola, setPosicionProductoConsola] =
        useState(false);
    const [posicionProductoAsiento, setPosicionProductoAsiento] =
        useState(false);
    const [posicionProductoTecho, setPosicionProductoTecho] = useState(false);
    const [showModalPosicionProductoMotor, setShowModalPosicionProductoMotor] =
        useState(false);

    const [sistemaMotorSeleccionado, setSistemaMotorSeleccionado] = useState(0);
    const [ubicacionProducto, setUbicacionProducto] = useState(0);
    const [posicionProducto, setPosicionProducto] = useState(0);
    const [habilitaSiguiente, setHabilitaSiguiente] = useState(true);
    const [habilitaSiguienteLatoneria, setHabilitaSiguienteLatoneria] =
        useState(true);
    const [habilitaSiguienteTrenMotriz, setHabilitaSiguienteTrenMotriz] =
        useState(true);
    const [textoUbicacionProducto, setTextoUbicacionProducto] = useState(
        "Ubicación del producto en tu vehículo"
    );
    const [partesTrenMotrizSeleccionada, setpartesTrenMotrizSeleccionada] =
        useState([]);
    const [iconoSeleccionadoUno, setIconoSeleccionadoUno] = useState(
        iconoaireacondicionadodescarte
    );
    const [iconoSeleccionadoDos, setIconoSeleccionadoDos] = useState(
        iconoaireacondicionadodescarte
    );
    const [iconoSeleccionadoTres, setIconoSeleccionadoTres] = useState("");
    const [iconoSeleccionadoCuatro, setIconoSeleccionadoCuatro] = useState("");
    const [borrar, setBorrar] = useState(false);

    const [botonAireacondicionado, setBotonAireacondicionado] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonArranque, setBotonArranque] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonCaja, setBotonCaja] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonDireccion, setBotonDireccion] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonEmbrague, setBotonEmbrague] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonEscape, setBotonEscape] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonFrenos, setBotonFrenos] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonInyeccion, setBotonInyeccion] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonMotor, setBotonMotor] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonParabrisas, setBotonParabrisas] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonRefrigeracion, setBotonRefrigeracion] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonRefrigeracionCaja, setBotonRefrigeracionCaja] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonSistemaElectrico, setBotonSistemaElectrico] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonSistemaElectricoMotor, setBotonSistemaElectricoMotor] =
        useState("botontrenmotrizcrearprdo apuntador");
    const [botonSuspension, setBotonsuspension] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonTransmision, setBotonTransmision] = useState(
        "botontrenmotrizcrearprdo apuntador"
    );
    const [botonHabilitado, setBotonHabilitado] = useState("pl-40");
    const [botonHabilitadoDos, setBotonHabilitadoDos] = useState("");
    const [eliminaItem, setEliminaItem] = useState(false);
    const [imagen, setImagen] = useState(null);

    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
        //AQUI
        if (duplicarprd == 2 && activaDuplicar) {
            let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
            let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));
        
            if(datosprducto.posicionproducto == 11){
                SelecUbicarProductoLatoneria();
                SeleccionePosicionProductoIzquierdo();
            }else
            if(datosprducto.posicionproducto == 12){
                SelecUbicarProductoLatoneria();
                SeleccionePosicionProductoCentro();
            }else
            if(datosprducto.posicionproducto == 13){
                SelecUbicarProductoLatoneria();
                SeleccionePosicionProductoDerecho();
            }
            else
            if(datosprducto.posicionproducto == 21){
                SelecUbicarProductoHabitaculo();
                SeleccioneConsola();
            }else
            if(datosprducto.posicionproducto == 22){
                SelecUbicarProductoHabitaculo();
                SeleccioneAsiento();
            }else
            if(datosprducto.posicionproducto == 23){
                SelecUbicarProductoHabitaculo();
                SeleccioneTecho();
            }
            else
            if(datosprducto.posicionproducto == 302  && tipoVehUno == 14 /*VALIDAR AL TENER PRODUCTO COMO ESTE */){
                SelecUbicarProductoLatoneria();
                SeleccionePosicionProductoCentro();
            }else
            if(datosprducto.posicionproducto == 302){
                SelecUbicarProductoMotor();
                SeleccionasistemaElectricoMotor();
            }
            else
            if(datosprducto.posicionproducto == 303){
                SelecUbicarProductoMotor();
                SeleccionaSuspension();
            }else
            if(datosprducto.posicionproducto == 304){
                SelecUbicarProductoMotor();
                SeleccionasistemaElectrico();
            }else
            if(datosprducto.posicionproducto == 305){
                SelecUbicarProductoMotor();
                SeleccionaFrenos();
            }else
            if(datosprducto.posicionproducto == 306){
                SelecUbicarProductoMotor();
                SeleccionaInyeccion();
            }else
            if(datosprducto.posicionproducto == 307){
                SelecUbicarProductoMotor();
                SeleccionaEmbrague();
            }else
            if(datosprducto.posicionproducto == 308){
                SelecUbicarProductoMotor();
                SeleccionaRefrigeracion();
            }else
            if(datosprducto.posicionproducto == 309){
                SelecUbicarProductoMotor();
                SeleccionaDireccion();
            }else
            if(datosprducto.posicionproducto == 310){
                SelecUbicarProductoMotor();
                SeleccionaCaja();
            }else
            if(datosprducto.posicionproducto == 311){
                SelecUbicarProductoMotor();
                SeleccionaRefrigeracionCaja();
            }else
            if(datosprducto.posicionproducto == 312){
                SelecUbicarProductoMotor();
                SeleccionaTransmision();
            }else
            if(datosprducto.posicionproducto == 313){
                SelecUbicarProductoMotor();
                SeleccionaAireAcondicionado();
            }else
            if(datosprducto.posicionproducto == 314){
                SelecUbicarProductoMotor();
                SeleccionaArranque();
            }else
            if(datosprducto.posicionproducto == 315){
                SelecUbicarProductoMotor();
                SeleccionaEscape();
            }else
            if(datosprducto.posicionproducto == 316){
                SelecUbicarProductoMotor();
                SeleccionaParabrisas();
            }
        }
    }, [duplicarprd, activaDuplicar]);
   
    const eliminarElemento = (item) => {
        let array = partesTrenMotrizSeleccionada;
        array.splice(item, 1);
        setpartesTrenMotrizSeleccionada(array);
        setBorrar(true);
    };

    useEffect(() => {
        setBorrar(false);
        if (tipoVehUno == 6 || tipoVehUno == 3 || tipoVehUno == 1) {
            setBotonHabilitadoDos("deshabilitar");
            setBotonHabilitado("pl-40 deshabilitar");
        }
    }, [borrar]);

    useEffect(() => {
        if (eliminaItem) {
            setEliminaItem(false);
        }
    }, [eliminaItem]);

    useEffect(() => {
        if (partesTrenMotrizSeleccionada.length > 0) {
            /* Desmarcamos todos los botones y recorremos arreglo para asignar selección */
            setBotonAireacondicionado("botontrenmotrizcrearprdo");
            setBotonDireccion("botontrenmotrizcrearprdo");
            setBotonFrenos("botontrenmotrizcrearprdo");
            setBotonCaja("botontrenmotrizcrearprdo");
            setBotonRefrigeracionCaja("botontrenmotrizcrearprdo");
            setBotonArranque("botontrenmotrizcrearprdo");
            setBotonParabrisas("botontrenmotrizcrearprdo");
            setBotonMotor("botontrenmotrizcrearprdo");
            setBotonEmbrague("botontrenmotrizcrearprdo");
            setBotonEscape("botontrenmotrizcrearprdo");
            setBotonInyeccion("botontrenmotrizcrearprdo");
            setBotonRefrigeracion("botontrenmotrizcrearprdo");
            setBotonSistemaElectrico("botontrenmotrizcrearprdo");
            setBotonSistemaElectricoMotor("botontrenmotrizcrearprdo");
            setBotonsuspension("botontrenmotrizcrearprdo");
            setBotonTransmision("botontrenmotrizcrearprdo");

            setShowImagenBaseMotorElectrico(false);
            setShowImagenAireacondicionado(false);
            setShowImagenArranque(false);
            setShowImagenCaja(false);
            setShowImagenDireccion(false);
            setShowImagenEmbrague(false);
            setShowImagenEscape(false);
            setShowImagenFrenos(false);
            setShowImagenInyeccion(false);
            setShowImagenMotor(false);
            setShowImagenParabrisas(false);
            setShowImagenRefrigeracion(false);
            setShowImagenRefrigeracionCaja(false);
            setShowImagenSistemElectrico(false);
            setShowImagenSistemElectricoMotor(false);
            setShowImagensuspension(false);
            setShowImagenTransmision(false);

            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona == 1) {
                    setBotonAireacondicionado(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoAireacondicionado(iconoaireacondicionadoseleccion);
                    setShowImagenAireacondicionado(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 2) {
                    setBotonDireccion(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoDireccion(iconodireccionseleccion);
                    setShowImagenDireccion(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 3) {
                    setBotonFrenos("botontrenmotrizcrearprdoselect apuntador");
                    setIconoFrenos(iconofrenosseleccion);
                    setShowImagenFrenos(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 4) {
                    setBotonCaja("botontrenmotrizcrearprdoselect apuntador");
                    setIconoCaja(iconocajaseleccion);
                    setShowImagenCaja(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 5) {
                    setBotonRefrigeracionCaja(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoRefrigeracionCaja(iconorefrigeracioncajaseleccion);
                    setShowImagenRefrigeracionCaja(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 6) {
                    setBotonArranque(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoArranque(iconoarranqueseleccion);
                    setShowImagenArranque(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 7) {
                    setBotonParabrisas(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoParabrisas(iconoparabrisasseleccion);
                    setShowImagenParabrisas(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 8) {
                    setBotonMotor("botontrenmotrizcrearprdoselect apuntador");
                    setIconoMotor(iconomotorseleccion);
                    setShowImagenMotor(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 9) {
                    setBotonEmbrague(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoEmbrague(iconoembragueseleccion);
                    setShowImagenEmbrague(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 10) {
                    setBotonEscape("botontrenmotrizcrearprdoselect apuntador");
                    setIconoEscape(iconoescapeseleccion);
                    setShowImagenEscape(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 11) {
                    setBotonInyeccion(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoInyeccion(iconoinyeccionseleccion);
                    setShowImagenInyeccion(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 12) {
                    setBotonRefrigeracion(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoRefrigeracion(iconorefrigeracionseleccion);
                    setShowImagenRefrigeracion(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 13) {
                    setBotonSistemaElectrico(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoSistemElectrico(iconosistemaelectricoseleccion);
                    setShowImagenSistemElectrico(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 14) {
                    setBotonSistemaElectricoMotor(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoSistemElectricoMotor(
                        iconosistemaelectricomotorseleccion
                    );
                    setShowImagenSistemElectricoMotor(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 15) {
                    setBotonsuspension(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconosuspension(iconosuspensionseleccion);
                    setShowImagensuspension(true);
                    setHabilitaSiguienteTrenMotriz(false);
                } else if (part.sistemaselecciona == 16) {
                    setBotonTransmision(
                        "botontrenmotrizcrearprdoselect apuntador"
                    );
                    setIconoTransmision(iconotransmisionseleccion);
                    setShowImagenTransmision(true);
                    setHabilitaSiguienteTrenMotriz(false);
                }
            });
        }
    }, [partesTrenMotrizSeleccionada, eliminaItem]);

    const mostrarModalDatosProducto = () => {
        const newDet = [];
        let item = {
            ubicacionProducto: ubicacionProducto,
            posicionProducto: posicionProducto,
        };
        newDet.push(item);

        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(newDet)
        );

        setShowModalLatoneria(true);
        setShowModalLatoneriaActiva(true);
        setSeleccionoUbicacionProducto(true);
        setAbrirCerarUbicarProducto(true);
        setOpenCloseUbicarPrd(false);
        setUbicarProductoLatoneria(false);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        setShowDatosProductos(true);
    };

    const abrirDatosUbicacionProucto = () => {
        if (tipoVehUno > 0) {
            setShowModalLatoneria(true);
            setShowModalLatoneriaActiva(true);
            setSeleccionoUbicacionProducto(true);
            setAbrirCerarUbicarProducto(false);
            setOpenCloseUbicarPrd(true);

            if (ubicacionProducto == 1) setUbicarProductoLatoneria(true);

            if (ubicacionProducto == 2) setUbicarProductoHabitaculo(true);

            if (ubicacionProducto == 3) setUbicarProductoMotor(true);
        } else {
            setShowModalLatoneria(true);
            setShowModalLatoneriaActiva(true);
            setSeleccionoUbicacionProducto(true);
            setAbrirCerarUbicarProducto(false);
            setOpenCloseUbicarPrd(false);
            setUbicarProductoLatoneria(false);
            setUbicarProductoHabitaculo(false);
            setUbicarProductoMotor(false);
        }
    };

    const mostrarComentariolatoneria = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        //setPosicionProductoIzquierdo(false);
        //setPosicionProductoCentro(false);
        //setPosicionProductoDerecho(false);
        setTextoPosicionUbicacionProducto(1);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Exterior' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Exterior");
    };
    const mostrarComentariohabitaculo = () => {
        setMostrarModalInfoUbicacionPrdoInt(true);
        setTextoPosicionUbicacionProducto(2);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Interior' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Interior");
    };

    const mostrarComentariomotor = () => {
        setMostrarModalPrdoTrenMotriz(true);
        setTextoPosicionUbicacionProducto(3);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Tren Motriz' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Tren Motriz");
    };

    const SelecUbicarProductoLatoneria = () => {
        //if (tipoVehUno != 1) {
        setUbicacionProducto(1);
        setUbicarProductoLatoneria(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        setShowImagenExterior(true);
        setShowImagenInterior(false);
        setShowImagenTrenMotriz(false);
        setHabilitaSiguienteLatoneria(true);
        setHabilitaSiguiente(true);
        setHabilitaSiguienteTrenMotriz(true);
        setShowModalPosicionProductoLatoneria(true);
        setUbicarProducto(1);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior(
            "botonpartesvehiculo colorseleccionboton redondearborde"
        );
        setnombreUbicacionInterior("botonpartesvehiculo redondearborde");
        setnombreUbicacionTrenMotriz("botonpartesvehiculo redondearborde");

        setnombreUbicacionExteriorInfo(
            "mt-1 colorseleccionboton redondearborde"
        );
        setnombreUbicacionInteriorInfo("mt-1 redondearborde");
        setnombreUbicacionTrenMotrizInfo("mt-1 redondearborde");
    };

    const SelecUbicarProductoHabitaculo = () => {
        setUbicacionProducto(2);
        setUbicarProductoHabitaculo(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
        setShowImagenExterior(false);
        setShowConsolaBase(true);
        setShowImagenTrenMotriz(false);

        setHabilitaSiguienteLatoneria(true);
        setHabilitaSiguiente(true);
        setHabilitaSiguienteTrenMotriz(true);

        setShowModalPosicionProductoHabitaculo(true);
        setUbicarProducto(2);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior("botonpartesvehiculo redondearborde");
        setnombreUbicacionInterior(
            "botonpartesvehiculo  colorseleccionboton redondearborde"
        );
        setnombreUbicacionTrenMotriz("botonpartesvehiculo redondearborde");

        setnombreUbicacionExteriorInfo("mt-1 redondearborde");
        setnombreUbicacionInteriorInfo(
            "mt-1  colorseleccionboton redondearborde"
        );
        setnombreUbicacionTrenMotrizInfo("mt-1 redondearborde");
    };

    const SelecUbicarProductoMotor = () => {
        if (tipoVehUno === 1) {
            setTextoUbicacionProducto("Tren Motriz");
        }
        setUbicacionProducto(3);
        setUbicarProductoMotor(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
        setShowImagenExterior(false);
        setShowImagenInterior(false);
        setShowImagenTrenMotriz(true);

        setHabilitaSiguienteLatoneria(true);
        setHabilitaSiguiente(true);
        setHabilitaSiguienteTrenMotriz(true);

        setShowModalPosicionProductoMotor(true);
        setUbicarProducto(3);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior(
            "botonpartesvehiculo redondearborde redondearborde"
        );
        setnombreUbicacionInterior("botonpartesvehiculo redondearborde");
        setnombreUbicacionTrenMotriz(
            "botonpartesvehiculo colorseleccionboton redondearborde"
        );

        setnombreUbicacionExteriorInfo("mt-2 redondearborde");
        setnombreUbicacionInteriorInfo("mt-2 redondearborde");
        setnombreUbicacionTrenMotrizInfo(
            "mt-2 colorseleccionboton redondearborde"
        );
    };

    const mostrarComentarioPosicionIzquierdo = (codigo) => {
        setMostrarCodigo(codigo);
        setMostrarModalInfoPosicionPrdoExtDer(true);
        setTextoPosicionUbicacionProducto(4);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Exterior - Izquierda' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Exterior - Izquierda");
    };

    const mostrarComentarioPosicionCentro = (codigo) => {
        setMostrarCodigo(codigo);
        setMostrarModalInfoPosicionPrdoExtDer(true);
        setTextoPosicionUbicacionProducto(5);

        if (tipoVehUno != 1) {
            setMensajeUbicacionProd(
                "Para ver que incluye la selección 'Exterior - Centro' escoge la carroceria del vehículo de referencia"
            );
            setPosicionUbicacionProd("Exterior - Centro");
        } else {
            setMensajeUbicacionProd(
                "Para ver que incluye la selección, escoge el tipo de motocicleta de referencia"
            );
            setPosicionUbicacionProd("Unica selección");
        }
    };

    const mostrarComentarioPosicionDerecho = (codigo) => {
        setMostrarCodigo(codigo);
        setMostrarModalInfoPosicionPrdoExtDer(true);
        setTextoPosicionUbicacionProducto(6);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Exterior - Derecha' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Exterior - Derecha");
    };

    const mostrarComentarioConsola = (codigo) => {
        setMostrarCodigo(codigo);
        setMostrarModalInfoPosicionPrdoExtDer(true);
        setTextoPosicionHabitaculo(1);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Interior - Consola' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Interior - Consola");
    };

    const mostrarComentarioAsiento = (codigo) => {
        setMostrarCodigo(codigo);
        setMostrarModalInfoPosicionPrdoExtDer(true);
        setTextoPosicionHabitaculo(2);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Interior - Asientos' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Interior - Asientos");
    };

    const mostrarComentarioTecho = (codigo) => {
        setMostrarCodigo(codigo);
        setMostrarModalInfoPosicionPrdoExtDer(true);
        setTextoPosicionHabitaculo(3);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección 'Interior - Habitaculo' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd("Interior - Habitaculo");
    };

    const SeleccionePosicionProductoIzquierdo = () => {
        setPosicionProducto(11);
        setPosicionProductoIzquierdo(true);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(false);
        setHabilitaSiguienteLatoneria(false);
        setShowExteriorBase(false);
        setShowImagenIzquierda(true);
        setShowImagenCentro(false);
        setShowImagenDerecha(false);
        setTextoUbicacionProducto("Exterior - Izquierdo");
        setnombreUbicacionIzquierda(
            "botonpartesvehiculo colorseleccionboton redondearborde"
        );
        setnombreUbicacionCentro("botonpartesvehiculo redondearborde");
        setnombreUbicacionDerecha("botonpartesvehiculo redondearborde");
        setnombreUbicacionIzquierdaInfo(
            "mt-1 colorseleccionboton redondearborde"
        );
        setnombreUbicacionCentroInfo("mt-1 redondearborde");
        setnombreUbicacionDerechaInfo("mt-1 redondearborde");
    };

    const SeleccionePosicionProductoCentro = () => {
        setPosicionProducto(12);
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(true);
        setPosicionProductoDerecho(false);
        setHabilitaSiguienteLatoneria(false);
        setShowExteriorBase(false);
        setShowImagenIzquierda(false);
        setShowImagenCentro(true);
        setShowImagenDerecha(false);

        if (tipoVehUno != 1) setTextoUbicacionProducto("Exterior - Centro");
        else setTextoUbicacionProducto("Exterior - Unica Selección");

        setnombreUbicacionIzquierda("botonpartesvehiculo redondearborde");
        setnombreUbicacionCentro(
            "botonpartesvehiculo colorseleccionboton redondearborde"
        );
        setnombreUbicacionDerecha("botonpartesvehiculo redondearborde");
        setnombreUbicacionIzquierdaInfo("mt-1 redondearborde");
        setnombreUbicacionCentroInfo("mt-1 colorseleccionboton redondearborde");
        setnombreUbicacionDerechaInfo("mt-1 redondearborde");
    };

    const SeleccionePosicionProductoDerecho = () => {
        setPosicionProducto(13);
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(false);
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(true);

        setPosicionProductoDerecho(true);
        setHabilitaSiguienteLatoneria(false);
        setShowExteriorBase(false);
        setShowImagenIzquierda(false);
        setShowImagenCentro(false);
        setShowImagenDerecha(true);
        setTextoUbicacionProducto("Exterior - Derecha");

        setnombreUbicacionIzquierda("botonpartesvehiculo redondearborde");
        setnombreUbicacionCentro("botonpartesvehiculo redondearborde");
        setnombreUbicacionDerecha(
            "botonpartesvehiculo  colorseleccionboton redondearborde"
        );
        setnombreUbicacionIzquierdaInfo("mt-1 redondearborde");
        setnombreUbicacionCentroInfo("mt-1 redondearborde");
        setnombreUbicacionDerechaInfo(
            "mt-1  colorseleccionboton redondearborde"
        );
    };

    const SeleccioneConsola = () => {
        setPosicionProducto(21);
        setPosicionProductoConsola(true);
        setPosicionProductoAsiento(false);
        setShowConsolaBase(false);
        setPosicionProductoTecho(false);
        setShowImagenConsola(true);
        setSeleccionoUbicacionConsola(
            "botonpartesvehiculo colorseleccionboton"
        );
        setSeleccionoUbicacionAsiento("botonpartesvehiculo");
        setSeleccionoUbicacionTecho("botonpartesvehiculo");
        setShowImagenAsiento(false);
        setShowImagenTecho(false);
        setHabilitaSiguiente(false);
        setTextoUbicacionProducto("Interior - Consola");
    };

    const SeleccioneAsiento = () => {
        setPosicionProducto(22);
        setPosicionProductoConsola(false);
        setPosicionProductoAsiento(true);
        setPosicionProductoTecho(false);
        setShowConsolaBase(false);
        setShowImagenConsola(false);
        setShowImagenAsiento(true);
        setSeleccionoUbicacionAsiento(
            "botonpartesvehiculo colorseleccionboton"
        );
        setSeleccionoUbicacionConsola("botonpartesvehiculo");
        setSeleccionoUbicacionTecho("botonpartesvehiculo");
        setShowImagenTecho(false);
        setHabilitaSiguiente(false);
        setTextoUbicacionProducto("Interior - asiento");
    };

    const SeleccioneTecho = () => {
        setPosicionProducto(23);
        setPosicionProductoConsola(false);
        setPosicionProductoAsiento(false);
        setPosicionProductoTecho(true);
        setShowImagenConsola(false);
        setShowConsolaBase(false);
        setShowImagenAsiento(false);
        setShowImagenTecho(true);
        setSeleccionoUbicacionTecho("botonpartesvehiculo colorseleccionboton");
        setSeleccionoUbicacionAsiento("botonpartesvehiculo");
        setSeleccionoUbicacionConsola("botonpartesvehiculo");
        setHabilitaSiguiente(false);
        setTextoUbicacionProducto("Interior - Techo");
    };

    const SeleccionBaseMotorElectrico = () => {
        if (sistemaMotorSeleccionado == 0)
            setTextoUbicacionProducto("Tren Motriz - Base");
    };

    const SeleccionaAireAcondicionado = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 1) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoAireacondicionado(iconoaireacondicionadodescarte);
                    setBotonAireacondicionado("botontrenmotrizcrearprdo");
                    setShowImagenAireacondicionado(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setTextoUbicacionProducto("Tren Motriz - Aire Acondicionado");
        setSistemaMotorSeleccionado(1);

        let dato = [];
        let item;
        item = {
            sistemaselecciona: 1,
            imagen: iconoaireacondicionadoseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconoaireacondicionadoseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoUno != iconoaireacondicionadoseleccion
        ) {
            setIconoSeleccionadoUno(iconoaireacondicionadoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoUno != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoTres != iconoaireacondicionadoseleccion
        ) {
            setIconoSeleccionadoUno(iconoaireacondicionadoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoUno != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoTres != iconoaireacondicionadoseleccion
        ) {
            setIconoSeleccionadoUno(iconoaireacondicionadoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoUno != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoTres != iconoaireacondicionadoseleccion &&
            iconoSeleccionadoCuatro != iconoaireacondicionadoseleccion
        ) {
            setIconoSeleccionadoUno(iconoaireacondicionadoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(313);

        setIconoAireacondicionado(iconoaireacondicionadoseleccion);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaArranque = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 6) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoArranque(iconoarranquedescarte);
                    setBotonArranque("botontrenmotrizcrearprdo");
                    setShowImagenArranque(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(2);

        let dato = [];
        let item = {
            sistemaselecciona: 6,
            imagen: iconoarranqueseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconoarranqueseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconoarranqueseleccion &&
            iconoSeleccionadoUno != iconoarranqueseleccion
        ) {
            setIconoSeleccionadoUno(iconoarranqueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconoarranqueseleccion &&
            iconoSeleccionadoUno != iconoarranqueseleccion &&
            iconoSeleccionadoTres != iconoarranqueseleccion
        ) {
            setIconoSeleccionadoUno(iconoarranqueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconoarranqueseleccion &&
            iconoSeleccionadoUno != iconoarranqueseleccion &&
            iconoSeleccionadoTres != iconoarranqueseleccion
        ) {
            setIconoSeleccionadoUno(iconoarranqueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconoarranqueseleccion &&
            iconoSeleccionadoUno != iconoarranqueseleccion &&
            iconoSeleccionadoTres != iconoarranqueseleccion &&
            iconoSeleccionadoCuatro != iconoarranqueseleccion
        ) {
            setIconoSeleccionadoUno(iconoarranqueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }
        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(314);
        setTextoUbicacionProducto("Tren Motriz - Arranque");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranqueseleccion);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaCaja = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 4) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoCaja(iconocajadescarte);
                    setBotonCaja("botontrenmotrizcrearprdo");
                    setShowImagenCaja(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(3);

        let dato = [];
        let item = {
            sistemaselecciona: 4,
            imagen: iconocajaseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconocajaseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconocajaseleccion &&
            iconoSeleccionadoUno != iconocajaseleccion
        ) {
            setIconoSeleccionadoUno(iconocajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconocajaseleccion &&
            iconoSeleccionadoUno != iconocajaseleccion &&
            iconoSeleccionadoTres != iconocajaseleccion
        ) {
            setIconoSeleccionadoUno(iconocajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconocajaseleccion &&
            iconoSeleccionadoUno != iconocajaseleccion &&
            iconoSeleccionadoTres != iconocajaseleccion
        ) {
            setIconoSeleccionadoUno(iconocajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconocajaseleccion &&
            iconoSeleccionadoUno != iconocajaseleccion &&
            iconoSeleccionadoTres != iconocajaseleccion &&
            iconoSeleccionadoCuatro != iconocajaseleccion
        ) {
            setIconoSeleccionadoUno(iconocajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }
        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(310);
        setTextoUbicacionProducto("Tren Motriz - Caja");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajaseleccion);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaDireccion = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 2) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoDireccion(iconodirecciondescarte);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(4);

        let dato = [];
        let item = {
            sistemaselecciona: 2,
            imagen: iconodireccionseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconodireccionseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconodireccionseleccion &&
            iconoSeleccionadoUno != iconodireccionseleccion
        ) {
            setIconoSeleccionadoUno(iconodireccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconodireccionseleccion &&
            iconoSeleccionadoUno != iconodireccionseleccion &&
            iconoSeleccionadoTres != iconodireccionseleccion
        ) {
            setIconoSeleccionadoUno(iconodireccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconodireccionseleccion &&
            iconoSeleccionadoUno != iconodireccionseleccion &&
            iconoSeleccionadoTres != iconodireccionseleccion
        ) {
            setIconoSeleccionadoUno(iconodireccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconodireccionseleccion &&
            iconoSeleccionadoUno != iconodireccionseleccion &&
            iconoSeleccionadoTres != iconodireccionseleccion &&
            iconoSeleccionadoCuatro != iconodireccionseleccion
        ) {
            setIconoSeleccionadoUno(iconodireccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(309);
        setTextoUbicacionProducto("Tren Motriz - Dirección");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodireccionseleccion);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaEmbrague = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 9) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoEmbrague(iconoembraguedescarte);
                    setBotonEmbrague("botontrenmotrizcrearprdo");
                    setShowImagenEmbrague(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(5);

        let dato = [];
        let item = {
            sistemaselecciona: 9,
            imagen: iconoembragueseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconoembragueseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconoembragueseleccion &&
            iconoSeleccionadoUno != iconoembragueseleccion
        ) {
            setIconoSeleccionadoUno(iconoembragueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconoembragueseleccion &&
            iconoSeleccionadoUno != iconoembragueseleccion &&
            iconoSeleccionadoTres != iconoembragueseleccion
        ) {
            setIconoSeleccionadoUno(iconoembragueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconoembragueseleccion &&
            iconoSeleccionadoUno != iconoembragueseleccion &&
            iconoSeleccionadoTres != iconoembragueseleccion
        ) {
            setIconoSeleccionadoUno(iconoembragueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconoembragueseleccion &&
            iconoSeleccionadoUno != iconoembragueseleccion &&
            iconoSeleccionadoTres != iconoembragueseleccion &&
            iconoSeleccionadoCuatro != iconoembragueseleccion
        ) {
            setIconoSeleccionadoUno(iconoembragueseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(307);
        setTextoUbicacionProducto("Tren Motriz - Embrague");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembragueseleccion);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaEscape = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 10) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoEscape(iconoescapedescarte);
                    setBotonEscape("botontrenmotrizcrearprdo");
                    setShowImagenEscape(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(6);

        let dato = [];
        let item = {
            sistemaselecciona: 10,
            imagen: iconoescapeseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconoescapeseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconoescapeseleccion &&
            iconoSeleccionadoUno != iconoescapeseleccion
        ) {
            setIconoSeleccionadoUno(iconoescapeseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconoescapeseleccion &&
            iconoSeleccionadoUno != iconoescapeseleccion &&
            iconoSeleccionadoTres != iconoescapeseleccion
        ) {
            setIconoSeleccionadoUno(iconoescapeseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconoescapeseleccion &&
            iconoSeleccionadoUno != iconoescapeseleccion &&
            iconoSeleccionadoTres != iconoescapeseleccion
        ) {
            setIconoSeleccionadoUno(iconoescapeseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconoescapeseleccion &&
            iconoSeleccionadoUno != iconoescapeseleccion &&
            iconoSeleccionadoTres != iconoescapeseleccion &&
            iconoSeleccionadoCuatro != iconoescapeseleccion
        ) {
            setIconoSeleccionadoUno(iconoescapeseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(315);
        setTextoUbicacionProducto("Tren Motriz - Escape");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapeseleccion);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaFrenos = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 3) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoFrenos(iconofrenosdescarte);
                    setBotonFrenos("botontrenmotrizcrearprdo");
                    setShowImagenFrenos(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(7);

        let dato = [];
        let item = {
            sistemaselecciona: 3,
            imagen: iconofrenosseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconofrenosseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconofrenosseleccion &&
            iconoSeleccionadoUno != iconofrenosseleccion
        ) {
            setIconoSeleccionadoUno(iconofrenosseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconofrenosseleccion &&
            iconoSeleccionadoUno != iconofrenosseleccion &&
            iconoSeleccionadoTres != iconofrenosseleccion
        ) {
            setIconoSeleccionadoUno(iconofrenosseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconofrenosseleccion &&
            iconoSeleccionadoUno != iconofrenosseleccion &&
            iconoSeleccionadoTres != iconofrenosseleccion
        ) {
            setIconoSeleccionadoUno(iconofrenosseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconofrenosseleccion &&
            iconoSeleccionadoUno != iconofrenosseleccion &&
            iconoSeleccionadoTres != iconofrenosseleccion &&
            iconoSeleccionadoCuatro != iconofrenosseleccion
        ) {
            setIconoSeleccionadoUno(iconofrenosseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(305);
        setTextoUbicacionProducto("Tren Motriz - Frenos");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosseleccion);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaInfoMotriz = (value) => {
        //alert(value);
        setImagen(null);
        setTipoSistema(null);
        setSistemaNoDisponible(null);
        let nombresistema;
        let sistema = "";
        if (value == 1) {
            sistema = "Sistema motor";
        } else if (value == 2) {
            sistema = "Sistema de transmisión";
        } else if (value == 3) {
            sistema = "Sistema de frenos";
        } else if (value == 4) {
            sistema = "Sistema de dirección";
        } else if (value == 5) {
            sistema = "Sistema de suspensión";
        } else if (value == 6) {
            sistema = "Sistema de caja";
        } else if (value == 7) {
            sistema = "Sistema de embrague";
        } else if (value == 8) {
            sistema = "Sistema de inyección";
        } else if (value == 9) {
            sistema = "Sistema de refrigeración general";
        } else if (value == 10) {
            sistema = "Sistema de refrigeración caja";
        } else if (value == 11) {
            sistema = "Sistema de escape";
        } else if (value == 12) {
            sistema = "Sistema de aire acondicionado";
        } else if (value == 13) {
            sistema = "Sistema eléctrico accesorios";
        } else if (value == 14) {
            sistema = "Sistema de arranque";
        } else if (value == 15) {
            sistema = "Sistema limpiabrisas";
        } else if (value == 16) {
            sistema = "Sistema eléctrico motor";
        }

        setSeleccionaTrenMotriz(value);
        setMensajeUbicacionProd(
            "Para ver que incluye la selección '" +
                sistema +
                "' escoge la carroceria del vehículo de referencia"
        );
        setPosicionUbicacionProd(sistema);
        setMostrarModalTrenMotriz(true);
    };

    const SeleccionaInyeccion = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 11) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoInyeccion(iconoinyecciondescarte);
                    setBotonInyeccion("botontrenmotrizcrearprdo");
                    setShowImagenInyeccion(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(8);

        let dato = [];
        let item = {
            sistemaselecciona: 11,
            imagen: iconoinyeccionseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconoinyeccionseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconoinyeccionseleccion &&
            iconoSeleccionadoUno != iconoinyeccionseleccion
        ) {
            setIconoSeleccionadoUno(iconoinyeccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconoinyeccionseleccion &&
            iconoSeleccionadoUno != iconoinyeccionseleccion &&
            iconoSeleccionadoTres != iconoinyeccionseleccion
        ) {
            setIconoSeleccionadoUno(iconoinyeccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconoinyeccionseleccion &&
            iconoSeleccionadoUno != iconoinyeccionseleccion &&
            iconoSeleccionadoTres != iconoinyeccionseleccion
        ) {
            setIconoSeleccionadoUno(iconoinyeccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconoinyeccionseleccion &&
            iconoSeleccionadoUno != iconoinyeccionseleccion &&
            iconoSeleccionadoTres != iconoinyeccionseleccion &&
            iconoSeleccionadoCuatro != iconoinyeccionseleccion
        ) {
            setIconoSeleccionadoUno(iconoinyeccionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(306);
        setTextoUbicacionProducto("Tren Motriz - Inyección");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyeccionseleccion);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaMotor = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 8) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoMotor(iconomotordescarte);
                    setBotonMotor("botontrenmotrizcrearprdo");
                    setShowImagenMotor(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(9);

        let dato = [];
        let item = {
            sistemaselecciona: 8,
            imagen: iconomotorseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconomotorseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconomotorseleccion &&
            iconoSeleccionadoUno != iconomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconomotorseleccion &&
            iconoSeleccionadoUno != iconomotorseleccion &&
            iconoSeleccionadoTres != iconomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconomotorseleccion &&
            iconoSeleccionadoUno != iconomotorseleccion &&
            iconoSeleccionadoTres != iconomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconomotorseleccion &&
            iconoSeleccionadoUno != iconomotorseleccion &&
            iconoSeleccionadoTres != iconomotorseleccion &&
            iconoSeleccionadoCuatro != iconomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(301);
        setTextoUbicacionProducto("Tren Motriz - Motor");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotorseleccion);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaParabrisas = () => {
        let continua = true;
        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 7) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoParabrisas(iconoparabrisasdescarte);
                    setBotonParabrisas("botontrenmotrizcrearprdo");
                    setShowImagenParabrisas(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(10);

        let dato = [];
        let item = {
            sistemaselecciona: 7,
            imagen: iconoparabrisasseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconoparabrisasseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconoparabrisasseleccion &&
            iconoSeleccionadoUno != iconoparabrisasseleccion
        ) {
            setIconoSeleccionadoUno(iconoparabrisasseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconoparabrisasseleccion &&
            iconoSeleccionadoUno != iconoparabrisasseleccion &&
            iconoSeleccionadoTres != iconoparabrisasseleccion
        ) {
            setIconoSeleccionadoUno(iconoparabrisasseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconoparabrisasseleccion &&
            iconoSeleccionadoUno != iconoparabrisasseleccion &&
            iconoSeleccionadoTres != iconoparabrisasseleccion
        ) {
            setIconoSeleccionadoUno(iconoparabrisasseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconoparabrisasseleccion &&
            iconoSeleccionadoUno != iconoparabrisasseleccion &&
            iconoSeleccionadoTres != iconoparabrisasseleccion &&
            iconoSeleccionadoCuatro != iconoparabrisasseleccion
        ) {
            setIconoSeleccionadoUno(iconoparabrisasseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);
        setPosicionProducto(316);
        setTextoUbicacionProducto("Tren Motriz - Parabrisas");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasseleccion);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaRefrigeracion = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 12) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoRefrigeracion(iconorefrigeraciondescarte);
                    setBotonRefrigeracion("botontrenmotrizcrearprdo");
                    setShowImagenRefrigeracion(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(11);

        let dato = [];
        let item = {
            sistemaselecciona: 12,
            imagen: iconorefrigeracionseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconorefrigeracionseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconorefrigeracionseleccion &&
            iconoSeleccionadoUno != iconorefrigeracionseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconorefrigeracionseleccion &&
            iconoSeleccionadoUno != iconorefrigeracionseleccion &&
            iconoSeleccionadoTres != iconorefrigeracionseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconorefrigeracionseleccion &&
            iconoSeleccionadoUno != iconorefrigeracionseleccion &&
            iconoSeleccionadoTres != iconorefrigeracionseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconorefrigeracionseleccion &&
            iconoSeleccionadoUno != iconorefrigeracionseleccion &&
            iconoSeleccionadoTres != iconorefrigeracionseleccion &&
            iconoSeleccionadoCuatro != iconorefrigeracionseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(308);
        setTextoUbicacionProducto("Tren Motriz - Refrigeración");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeracionseleccion);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaRefrigeracionCaja = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 5) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
                    setBotonRefrigeracionCaja("botontrenmotrizcrearprdo");
                    setShowImagenRefrigeracionCaja(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(12);

        let dato = [];
        let item = {
            sistemaselecciona: 5,
            imagen: iconorefrigeracioncajaseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconorefrigeracioncajaseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoUno != iconorefrigeracioncajaseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracioncajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoUno != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoTres != iconorefrigeracioncajaseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracioncajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoUno != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoTres != iconorefrigeracioncajaseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracioncajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoUno != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoTres != iconorefrigeracioncajaseleccion &&
            iconoSeleccionadoCuatro != iconorefrigeracioncajaseleccion
        ) {
            setIconoSeleccionadoUno(iconorefrigeracioncajaseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(311);
        setTextoUbicacionProducto("Tren Motriz - Refrigeración Caja");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajaseleccion);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionasistemaElectrico = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 13) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoSistemElectrico(iconosistemaelectricodescarte);
                    setBotonSistemaElectrico("botontrenmotrizcrearprdo");
                    setShowImagenSistemElectrico(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(13);

        let dato = [];
        let item = {
            sistemaselecciona: 13,
            imagen: iconosistemaelectricoseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconosistemaelectricoseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconosistemaelectricoseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricoseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconosistemaelectricoseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricoseleccion &&
            iconoSeleccionadoTres != iconosistemaelectricoseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconosistemaelectricoseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricoseleccion &&
            iconoSeleccionadoTres != iconosistemaelectricoseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconosistemaelectricoseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricoseleccion &&
            iconoSeleccionadoTres != iconosistemaelectricoseleccion &&
            iconoSeleccionadoCuatro != iconosistemaelectricoseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricoseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(304);
        setTextoUbicacionProducto("Tren Motriz - Sistema Eléctrico");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricoseleccion);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionasistemaElectricoMotor = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 14) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoSistemElectricoMotor(
                        iconosistemaelectricomotordescarte
                    );
                    setBotonSistemaElectricoMotor("botontrenmotrizcrearprdo");
                    setShowImagenSistemElectricoMotor(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(14);

        let dato = [];
        let item = {
            sistemaselecciona: 14,
            imagen: iconosistemaelectricomotorseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconosistemaelectricomotorseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoTres != iconosistemaelectricomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoTres != iconosistemaelectricomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoUno != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoTres != iconosistemaelectricomotorseleccion &&
            iconoSeleccionadoCuatro != iconosistemaelectricomotorseleccion
        ) {
            setIconoSeleccionadoUno(iconosistemaelectricomotorseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(302);
        setTextoUbicacionProducto("Tren Motriz - Eléctrico Motor");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotorseleccion);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaSuspension = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 15) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconosuspension(iconosuspensiondescarte);
                    setBotonsuspension("botontrenmotrizcrearprdo");
                    setShowImagensuspension(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(15);

        let dato = [];
        let item = {
            sistemaselecciona: 15,
            imagen: iconosuspensionseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconosuspensionseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconosuspensionseleccion &&
            iconoSeleccionadoUno != iconosuspensionseleccion
        ) {
            setIconoSeleccionadoUno(iconosuspensionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconosuspensionseleccion &&
            iconoSeleccionadoUno != iconosuspensionseleccion &&
            iconoSeleccionadoTres != iconosuspensionseleccion
        ) {
            setIconoSeleccionadoUno(iconosuspensionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconosuspensionseleccion &&
            iconoSeleccionadoUno != iconosuspensionseleccion &&
            iconoSeleccionadoTres != iconosuspensionseleccion
        ) {
            setIconoSeleccionadoUno(iconosuspensionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconosuspensionseleccion &&
            iconoSeleccionadoUno != iconosuspensionseleccion &&
            iconoSeleccionadoTres != iconosuspensionseleccion &&
            iconoSeleccionadoCuatro != iconosuspensionseleccion
        ) {
            setIconoSeleccionadoUno(iconosuspensionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(303);
        setTextoUbicacionProducto("Tren Motriz - Suspensión");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensionseleccion);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const SeleccionaTransmision = () => {
        let continua = true;

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part, index) => {
                if (part.sistemaselecciona == 16) {
                    let array = partesTrenMotrizSeleccionada;
                    array.splice(index, 1);
                    setpartesTrenMotrizSeleccionada(array);
                    continua = false;
                    setIconoTransmision(iconotransmisiondescarte);
                    setBotonTransmision("botontrenmotrizcrearprdo");
                    setShowImagenTransmision(false);
                    setEliminaItem(true);
                }
            });

        if (!continua) return;

        setSistemaMotorSeleccionado(16);

        let dato = [];
        let item = {
            sistemaselecciona: 16,
            imagen: iconotransmisionseleccion,
        };

        partesTrenMotrizSeleccionada &&
            partesTrenMotrizSeleccionada.map((part) => {
                if (part.sistemaselecciona != item.sistemaselecciona) {
                    dato.push(part);
                }
            });
        dato.push(item);

        if (dato.length == 1) {
            setIconoSeleccionadoUno(iconotransmisionseleccion);
        } else if (
            dato.length == 2 &&
            iconoSeleccionadoDos != iconotransmisionseleccion &&
            iconoSeleccionadoUno != iconotransmisionseleccion
        ) {
            setIconoSeleccionadoUno(iconotransmisionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
        } else if (
            dato.length == 3 &&
            iconoSeleccionadoDos != iconotransmisionseleccion &&
            iconoSeleccionadoUno != iconotransmisionseleccion &&
            iconoSeleccionadoTres != iconotransmisionseleccion
        ) {
            setIconoSeleccionadoUno(iconotransmisionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
        } else if (
            dato.length == 4 &&
            iconoSeleccionadoDos != iconotransmisionseleccion &&
            iconoSeleccionadoUno != iconotransmisionseleccion &&
            iconoSeleccionadoTres != iconotransmisionseleccion
        ) {
            setIconoSeleccionadoUno(iconotransmisionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        } else if (
            dato.length > 4 &&
            iconoSeleccionadoDos != iconotransmisionseleccion &&
            iconoSeleccionadoUno != iconotransmisionseleccion &&
            iconoSeleccionadoTres != iconotransmisionseleccion &&
            iconoSeleccionadoCuatro != iconotransmisionseleccion
        ) {
            setIconoSeleccionadoUno(iconotransmisionseleccion);
            setIconoSeleccionadoDos(iconoSeleccionadoUno);
            setIconoSeleccionadoTres(iconoSeleccionadoDos);
            setIconoSeleccionadoCuatro(iconoSeleccionadoTres);
        }

        if (dato.length > 4) {
            dato.shift();
        }

        setpartesTrenMotrizSeleccionada(dato);

        setPosicionProducto(312);
        setTextoUbicacionProducto("Tren Motriz - Transmisión");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisionseleccion);
    };

    const OnUbicacionExterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionExterior(
                "botonpartesvehiculo colorseleccionboton redondearborde"
            );
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OffUbicacionExterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionExterior("botonpartesvehiculo redondearborde");
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OnUbicacionInterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionInterior(
                "botonpartesvehiculo colorseleccionboton redondearborde"
            );
            setShowImagenExterior(false);
            setShowImagenInterior(true);
            setShowImagenTrenMotriz(false);
        }
    };

    const OffUbicacionInterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionInterior("botonpartesvehiculo redondearborde");
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OnTrenMotriz = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionTrenMotriz(
                "botonpartesvehiculo colorseleccionboton redondearborde"
            );
            setShowImagenExterior(false);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(true);
        }
    };

    const OffOnTrenMotriz = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionTrenMotriz("botonpartesvehiculo redondearborde");
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OnUbicacionIzquierda = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda(
                "botonpartesvehiculo colorseleccionboton redondearborde"
            );
            setnombreUbicacionCentro("botonpartesvehiculo redondearborde");
            setnombreUbicacionDerecha("botonpartesvehiculo redondearborde");
            setShowImagenIzquierda(true);
            setShowImagenCentro(false);
            setShowImagenDerecha(false);
            setShowExteriorBase(false);
        }
    };

    const OffUbicacionTodos = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda("botonpartesvehiculo redondearborde");
            setnombreUbicacionCentro("botonpartesvehiculo redondearborde");
            setnombreUbicacionDerecha("botonpartesvehiculo redondearborde");
            setShowImagenIzquierda(false);
            setShowImagenCentro(false);
            setShowImagenDerecha(false);
            setShowExteriorBase(true);
        }
    };

    const OnUbicacionCentro = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda("botonpartesvehiculo redondearborde");
            setnombreUbicacionCentro(
                "botonpartesvehiculo  colorseleccionboton redondearborde"
            );
            setnombreUbicacionDerecha("botonpartesvehiculo redondearborde");
            setShowImagenIzquierda(false);
            setShowImagenCentro(true);
            setShowImagenDerecha(false);
            setShowExteriorBase(false);
        }
    };

    const OnUbicacionDerecha = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda("botonpartesvehiculo redondearborde");
            setnombreUbicacionCentro("botonpartesvehiculo redondearborde");
            setnombreUbicacionDerecha(
                "botonpartesvehiculo  colorseleccionboton redondearborde"
            );
            setShowImagenIzquierda(false);
            setShowImagenCentro(false);
            setShowImagenDerecha(true);
            setShowExteriorBase(false);
        }
    };

    const OnUbicacionConsola = () => {
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola(
                "botonpartesvehiculo colorseleccionboton"
            );
            setSeleccionoUbicacionAsiento("botonpartesvehiculo");
            setSeleccionoUbicacionTecho("botonpartesvehiculo");
            setShowConsolaBase(false);
            setShowImagenConsola(true);
            setShowImagenAsiento(false);
            setShowImagenTecho(false);
        }
    };

    const OffUbicacionHabitaculoTodos = () => {
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola("botonpartesvehiculo");
            setSeleccionoUbicacionAsiento("botonpartesvehiculo");
            setSeleccionoUbicacionTecho("botonpartesvehiculo");
            setShowConsolaBase(true);
            setShowImagenConsola(false);
            setShowImagenAsiento(false);
            setShowImagenTecho(false);
        }
    };

    const OnUbicacionAsiento = () => {
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola("botonpartesvehiculo");
            setSeleccionoUbicacionAsiento(
                "botonpartesvehiculo colorseleccionboton"
            );
            setSeleccionoUbicacionTecho("botonpartesvehiculo");
            setShowConsolaBase(false);
            setShowImagenConsola(false);
            setShowImagenAsiento(true);
            setShowImagenTecho(false);
        }
    };

    const OnUbicacionTecho = () => {
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola("botonpartesvehiculo");
            setSeleccionoUbicacionAsiento("botonpartesvehiculo");
            setSeleccionoUbicacionTecho(
                "botonpartesvehiculo colorseleccionboton"
            );
            setShowConsolaBase(false);
            setShowImagenConsola(false);
            setShowImagenAsiento(false);
            setShowImagenTecho(true);
        }
    };

    return (
        <div className="mt-55">
            {showModalLatoneriaActiva ? (
                <div className="ps-page__header mtmenos60 ml-70 cajavehiculoscompatiblesproducto">
                    <div>
                        <ModalMensajes
                            shown={showModalMensajes}
                            close={setShowModalMensajes}
                            titulo={tituloMensajes}
                            mensaje={textoMensajes}
                            tipo="1"
                        />
                        <div>
                            <div className="ml-14 mb-20">
                                <h3 className="tituloadvertenciaproductosizquierda mb-15">
                                    Ubicación del producto en tu vehículo
                                </h3>
                            </div>
                            {!abrirCerarUbicarProducto ? (
                                <div className="ml-2">
                                    <div className="ml-10 mb-20">
                                        <h3 className="textotuproductoestaen">
                                            Tu producto está en:
                                        </h3>
                                    </div>
                                    <Row className="pl-15">
                                        <Col xl={2} lg={2} md={2} xs={2}></Col>
                                        <Col xl={4} lg={4} md={4} xs={4}>
                                            <Row>
                                                <Col
                                                    xl={8}
                                                    lg={8}
                                                    md={8}
                                                    xs={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            nombreUbicacionExterior
                                                        }
                                                        onClick={
                                                            SelecUbicarProductoLatoneria
                                                        }
                                                        onMouseOver={() =>
                                                            OnUbicacionExterior()
                                                        }
                                                        onMouseOut={() =>
                                                            OffUbicacionExterior()
                                                        }>
                                                        EXTERIOR
                                                    </Button>
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    xs={1}>
                                                    <div
                                                        variant="outline-light"
                                                        className={
                                                            nombreUbicacionExteriorInfo
                                                        }
                                                        onClick={
                                                            mostrarComentariolatoneria
                                                        }>
                                                        {!ubicarProductoLatoneria ? (
                                                            <div className="cajaiconoinfomaterialtres">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterial"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="cajaiconoinfomaterialubicacion">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                            {tipoVehUno != 1 ? (
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        xs={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionInterior
                                                            }
                                                            onClick={
                                                                SelecUbicarProductoHabitaculo
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionInterior()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionInterior()
                                                            }>
                                                            INTERIOR
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        xl={1}
                                                        lg={1}
                                                        md={1}
                                                        xs={1}>
                                                        <div
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionInteriorInfo
                                                            }
                                                            onClick={
                                                                mostrarComentariohabitaculo
                                                            }>
                                                            {!ubicarProductoHabitaculo ? (
                                                                <div className="cajaiconoinfomaterialtres">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="cajaiconoinfomaterialubicacion">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ) : null}
                                            <Row>
                                                <Col
                                                    xl={8}
                                                    lg={8}
                                                    md={8}
                                                    xs={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            nombreUbicacionTrenMotriz
                                                        }
                                                        onClick={
                                                            SelecUbicarProductoMotor
                                                        }
                                                        onMouseOver={() =>
                                                            OnTrenMotriz()
                                                        }
                                                        onMouseOut={() =>
                                                            OffOnTrenMotriz()
                                                        }>
                                                        TREN MOTRIZ
                                                    </Button>
                                                </Col>
                                                <Col
                                                    xl={1}
                                                    lg={1}
                                                    md={1}
                                                    xs={1}>
                                                    <div
                                                        variant="outline-light"
                                                        className={
                                                            nombreUbicacionTrenMotrizInfo
                                                        }
                                                        onClick={
                                                            mostrarComentariomotor
                                                        }>
                                                        {!ubicarProductoMotor ? (
                                                            <div className="cajaiconoinfomaterialtres">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterial"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="cajaiconoinfomaterialubicacion">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null}
                        </div>
                        <div className="App">
                            <ModalComentariosUbicacionProducto
                                shown={mostrarModalComentariosUbicacionProducto}
                                close={() => {
                                    setMostrarModalComentariosUbicacionProducto(
                                        false
                                    );
                                }}
                                texto={textoPosicionUbicacionProducto}
                                mensajeUbicacionProd={mensajeUbicacionProd}
                                posicionUbicacionProd={posicionUbicacionProd}
                                tipoVehUno={tipoVehUno}
                            />
                        </div>

                        <div className="App">
                            <ModalInfoUbicacionPrdoInt
                                shown={mostrarModalInfoUbicacionPrdoInt}
                                close={() => {
                                    setMostrarModalInfoUbicacionPrdoInt(false);
                                }}
                                texto={textoPosicionUbicacionProducto}
                                mensajeUbicacionProd={mensajeUbicacionProd}
                                posicionUbicacionProd={posicionUbicacionProd}
                                tipoVehUno={tipoVehUno}
                            />
                        </div>

                        <div className="App">
                            <ModalInfoPosicionPrdoExtDer
                                shown={mostrarModalInfoPosicionPrdoExtDer}
                                close={() => {
                                    setMostrarModalInfoPosicionPrdoExtDer(
                                        false
                                    );
                                }}
                                texto={textoPosicionUbicacionProducto}
                                mensajeUbicacionProd={mensajeUbicacionProd}
                                posicionUbicacionProd={posicionUbicacionProd}
                                mostrarCodigo={mostrarCodigo}
                                tipoVehUno={tipoVehUno}
                            />
                        </div>
                        <div className="App">
                            <ModalInfoUbicacionPrdoIntTrenMotriz
                                shown={mostrarModalPrdoTrenMotriz}
                                close={() => {
                                    setMostrarModalPrdoTrenMotriz(false);
                                }}
                                texto={textoPosicionUbicacionProducto}
                                mensajeUbicacionProd={mensajeUbicacionProd}
                                posicionUbicacionProd={posicionUbicacionProd}
                                tipoVehUno={tipoVehUno}
                            />
                        </div>
                        <div className="App">
                            <ModalInfoTrenMotriz
                                shown={mostrarModalTrenMotriz}
                                close={() => {
                                    setMostrarModalTrenMotriz(false);
                                }}
                                texto={textoPosicionUbicacionProducto}
                                mensajeUbicacionProd={mensajeUbicacionProd}
                                posicionUbicacionProd={posicionUbicacionProd}
                                tipoVehUno={tipoVehUno}
                                seleccionaTrenMotriz={seleccionaTrenMotriz}
                                tipoSistema={tipoSistema}
                                setTipoSistema={setTipoSistema}
                                setSistemaNoDisponible={setSistemaNoDisponible}
                                sistemaNoDisponible={sistemaNoDisponible}
                                setImagen={setImagen}
                                imagen={imagen}
                            />
                        </div>

                        {showModalDatosProducto ? (
                            ubicarProductoLatoneria ? (
                                <div>
                                    <div className="ml-15 mt-15 mb-15">
                                        <Row>
                                            <Col xl={9} lg={9} md={9} sm={9}>
                                                <h3 className="tituloadvertenciaproductosizquierda">
                                                    Escoge la posición en la que
                                                    cuentra tu producto:
                                                </h3>
                                            </Col>
                                        </Row>
                                    </div>
                                    {tipoVehUno != 1 ? (
                                        <Row className="pl-22 mtmenos5">
                                            <Col
                                                xl={2}
                                                lg={2}
                                                md={2}
                                                xs={2}></Col>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        sm={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionIzquierda
                                                            }
                                                            onClick={
                                                                SeleccionePosicionProductoIzquierdo
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionIzquierda()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionTodos()
                                                            }>
                                                            IZQUIERDO
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <div
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionIzquierdaInfo
                                                            }
                                                            onClick={() =>
                                                                mostrarComentarioPosicionIzquierdo(
                                                                    3
                                                                )
                                                            }>
                                                            {!posicionProductoIzquierdo ? (
                                                                <div className="cajaiconoinfomaterialtres">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="cajaiconoinfomaterialubicacion">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        sm={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionCentro
                                                            }
                                                            onClick={
                                                                SeleccionePosicionProductoCentro
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionCentro()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionTodos()
                                                            }>
                                                            CENTRO
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <div
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionCentroInfo
                                                            }
                                                            onClick={() =>
                                                                mostrarComentarioPosicionCentro(
                                                                    2
                                                                )
                                                            }>
                                                            {!posicionProductoCentro ? (
                                                                <div className="cajaiconoinfomaterialtres">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="cajaiconoinfomaterialubicacion">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        sm={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionDerecha
                                                            }
                                                            onClick={
                                                                SeleccionePosicionProductoDerecho
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionDerecha()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionTodos()
                                                            }>
                                                            DERECHA
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <div
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionDerechaInfo
                                                            }
                                                            onClick={() =>
                                                                mostrarComentarioPosicionDerecho(
                                                                    1
                                                                )
                                                            }>
                                                            {!posicionProductoDerecho ? (
                                                                <div className="cajaiconoinfomaterialtres">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="cajaiconoinfomaterialubicacion">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <Row className="pl-22 mtmenos5">
                                            <Col
                                                xl={2}
                                                lg={2}
                                                md={2}
                                                xs={2}></Col>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        sm={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionCentro
                                                            }
                                                            onClick={
                                                                SeleccionePosicionProductoCentro
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionCentro()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionTodos()
                                                            }>
                                                            UNICA SELECCIÓN
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <div
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionCentroInfo
                                                            }
                                                            onClick={() =>
                                                                mostrarComentarioPosicionCentro(
                                                                    2
                                                                )
                                                            }>
                                                            {!posicionProductoCentro ? (
                                                                <div className="cajaiconoinfomaterialtres">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="cajaiconoinfomaterialubicacion">
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )}
                                    <br />
                                    <div className="ml-615">
                                        <Row>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Button
                                                    className="ps-btn colorfonoazulbase redondearborde"
                                                    disabled={
                                                        habilitaSiguienteLatoneria
                                                    }
                                                    onClick={() =>
                                                        mostrarModalDatosProducto()
                                                    }>
                                                    {" "}
                                                    Siguiente
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : ubicarProductoHabitaculo ? (
                                <div>
                                    <div>
                                        <Row>
                                            <Col
                                                xl={10}
                                                lg={10}
                                                md={10}
                                                sm={10}>
                                                <h3 className="ml-15 mt-15 mb-15 tituloadvertenciaproductosizquierda">
                                                    Escoge la posición en que se
                                                    encuentra tu producto:
                                                </h3>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="pl-22">
                                        <Col xl={2} lg={2} md={2} xs={2}></Col>
                                        <Col xl={4} lg={4} md={4} xs={4}>
                                            <Row>
                                                <Col
                                                    lg={8}
                                                    xl={8}
                                                    xs={8}
                                                    md={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            seleccionoUbicacionConsola
                                                        }
                                                        onClick={
                                                            SeleccioneConsola
                                                        }
                                                        onMouseOver={() =>
                                                            OnUbicacionConsola()
                                                        }
                                                        onMouseOut={() =>
                                                            OffUbicacionHabitaculoTodos()
                                                        }>
                                                        CONSOLA
                                                    </Button>
                                                </Col>
                                                <Col
                                                    lg={1}
                                                    xl={1}
                                                    xs={1}
                                                    md={1}>
                                                    <div
                                                        variant="outline-light"
                                                        className="redondearborde mt-2"
                                                        onClick={() =>
                                                            mostrarComentarioConsola(
                                                                4
                                                            )
                                                        }>
                                                        {!posicionProductoConsola ? (
                                                            <div className="cajaiconoinfomaterialtres">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterial"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="cajaiconoinfomaterialubicacion">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    lg={8}
                                                    xl={8}
                                                    xs={8}
                                                    md={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            seleccionoUbicacionAsiento
                                                        }
                                                        onClick={
                                                            SeleccioneAsiento
                                                        }
                                                        onMouseOver={() =>
                                                            OnUbicacionAsiento()
                                                        }
                                                        onMouseOut={() =>
                                                            OffUbicacionHabitaculoTodos()
                                                        }>
                                                        ASIENTO
                                                    </Button>
                                                </Col>
                                                <Col
                                                    lg={1}
                                                    xl={1}
                                                    xs={1}
                                                    md={1}>
                                                    <div
                                                        variant="outline-light"
                                                        className="redondearborde mt-2"
                                                        onClick={() =>
                                                            mostrarComentarioAsiento(
                                                                5
                                                            )
                                                        }>
                                                        {!posicionProductoAsiento ? (
                                                            <div className="cajaiconoinfomaterialtres">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterial"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="cajaiconoinfomaterialubicacion">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    lg={8}
                                                    xl={8}
                                                    xs={8}
                                                    md={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            seleccionoUbicacionTecho
                                                        }
                                                        onClick={
                                                            SeleccioneTecho
                                                        }
                                                        onMouseOver={() =>
                                                            OnUbicacionTecho()
                                                        }
                                                        onMouseOut={() =>
                                                            OffUbicacionHabitaculoTodos()
                                                        }>
                                                        TECHO
                                                    </Button>
                                                </Col>
                                                <Col
                                                    lg={1}
                                                    xl={1}
                                                    xs={1}
                                                    md={1}>
                                                    <div
                                                        variant="outline-light"
                                                        className="redondearborde mt-2"
                                                        onClick={() =>
                                                            mostrarComentarioTecho(
                                                                6
                                                            )
                                                        }>
                                                        {!posicionProductoTecho ? (
                                                            <div className="cajaiconoinfomaterialtres">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterial"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="cajaiconoinfomaterialubicacion">
                                                                <div className="fondodivselecciontipoproducto">
                                                                    <InfoIcon
                                                                        style={{
                                                                            fontSize: 30,
                                                                        }}
                                                                        className="iconoinfomaterialproductoselect"></InfoIcon>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <br />
                                    <div className="ml-615">
                                        <Row>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Button
                                                    className="ps-btn colorfonoazulbase redondearborde"
                                                    disabled={habilitaSiguiente}
                                                    onClick={() =>
                                                        mostrarModalDatosProducto()
                                                    }>
                                                    {" "}
                                                    Siguiente
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : ubicarProductoMotor ? (
                                <div className="ml-30">
                                    {tipoVehUno != 1 ? (
                                        <div>
                                            <Row>
                                                <Col
                                                    xl={11}
                                                    lg={11}
                                                    md={11}
                                                    sm={11}>
                                                    <h3 className="tituloadvertenciaproductosizquierda mlmenos15 mt-20 mb-20">
                                                        Escoge el sistema en que
                                                        se encuentra tu
                                                        producto:
                                                    </h3>
                                                </Col>
                                            </Row>
                                            <div className="pl-30">
                                                <Row>
                                                    <Row>
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaInyeccion
                                                                    }
                                                                    className={
                                                                        "tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    }
                                                                    src={
                                                                        iconoInyeccion.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenInyeccion ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonInyeccion
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaInyeccion()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            inyección
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            8
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div
                                                            className={
                                                                botonHabilitado
                                                            }>
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaRefrigeracionCaja
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoRefrigeracionCaja.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenRefrigeracionCaja ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                5
                                                                            }
                                                                            xl={
                                                                                5
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonRefrigeracionCaja
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaRefrigeracionCaja()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                refrigeración
                                                                                caja
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={2}
                                                                    xl={2}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                10
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaRefrigeracion
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoRefrigeracion.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenRefrigeracion ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonRefrigeracion
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaRefrigeracion()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            refrigeración
                                                                            motor
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            9
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaCaja
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoCaja.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenCaja ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonCaja
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaCaja()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                caja
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                6
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionasistemaElectricoMotor
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoSistemElectricoMotor.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenSistemElectricoMotor ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonSistemaElectricoMotor
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionasistemaElectricoMotor()
                                                                            }>
                                                                            Sistema
                                                                            eléctrico
                                                                            motor
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            16
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaTransmision
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoTransmision.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenTransmision ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonTransmision
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaTransmision()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                transmisión
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                2
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaArranque
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoArranque.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenArranque ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonArranque
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaArranque()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            arranque
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            14
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaDireccion
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoDireccion.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenDireccion ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonDireccion
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaDireccion()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                dirección
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                4
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaEscape
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoEscape.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenEscape ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonEscape
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaEscape()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            escape
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            11
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaFrenos
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoFrenos.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenFrenos ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonFrenos
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaFrenos()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                frenos
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                3
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <div
                                                            className={
                                                                botonHabilitadoDos
                                                            }>
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaAireAcondicionado
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoAireacondicionado.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenAireacondicionado ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonAireacondicionado
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaAireAcondicionado()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                aire
                                                                                acondicionado
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                12
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaSuspension
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoSuspension.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenSuspension ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonSuspension
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaSuspension()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                suspensión
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                5
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaMotor
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoMotor.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenMotor ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonMotor
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaMotor()
                                                                            }>
                                                                            Sistema
                                                                            motor
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            1
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div
                                                            className={
                                                                botonHabilitado
                                                            }>
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaParabrisas
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoParabrisas.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenParabrisas ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonParabrisas
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaParabrisas()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                limpiaparabrisas
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                15
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaEmbrague
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoEmbrague.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenEmbrague ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonEmbrague
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaEmbrague()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            embrague
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            7
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionasistemaElectrico
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoSistemElectrico.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenSistemElectrico ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonSistemaElectrico
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionasistemaElectrico()
                                                                                }>
                                                                                Sistema
                                                                                eléctrico
                                                                                accesorios
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                13
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                </Row>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Row>
                                                <Col
                                                    xl={11}
                                                    lg={11}
                                                    md={11}
                                                    sm={11}>
                                                    <h3 className="tituloadvertenciaproductosizquierda mlmenos15 mt-20 mb-20">
                                                        Escoge el sistema en que
                                                        se encuentra tu
                                                        producto:
                                                    </h3>
                                                </Col>
                                            </Row>
                                            <div className="pl-30">
                                                <Row>
                                                    <Row>
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaInyeccion
                                                                    }
                                                                    className={
                                                                        "tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    }
                                                                    src={
                                                                        iconoInyeccion.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenInyeccion ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonInyeccion
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaInyeccion()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            inyección
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            8
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <div className="ml-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaEmbrague
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoEmbrague.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenEmbrague ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonEmbrague
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaEmbrague()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                embrague
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                7
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaRefrigeracion
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoRefrigeracion.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenRefrigeracion ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonRefrigeracion
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaRefrigeracion()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            refrigeración
                                                                            motor
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            9
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaCaja
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoCaja.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenCaja ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonCaja
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaCaja()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                caja
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                6
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionasistemaElectricoMotor
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoSistemElectricoMotor.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenSistemElectricoMotor ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonSistemaElectricoMotor
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionasistemaElectricoMotor()
                                                                            }>
                                                                            Sistema
                                                                            eléctrico
                                                                            motor
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            16
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaTransmision
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoTransmision.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenTransmision ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonTransmision
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaTransmision()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                transmisión
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                2
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaArranque
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoArranque.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenArranque ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonArranque
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaArranque()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            arranque
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            14
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaDireccion
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoDireccion.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenDireccion ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonDireccion
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaDireccion()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                dirección
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                4
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaEscape
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoEscape.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenEscape ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonEscape
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaEscape()
                                                                            }>
                                                                            Sistema
                                                                            de
                                                                            escape
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            11
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaFrenos
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoFrenos.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenFrenos ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonFrenos
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaFrenos()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                frenos
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                3
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Row>
                                                            <Col lg={3} xl={3}>
                                                                <img
                                                                    onClick={
                                                                        SeleccionaMotor
                                                                    }
                                                                    className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                    src={
                                                                        iconoMotor.src
                                                                    }
                                                                    alt="First slide"
                                                                />
                                                            </Col>
                                                            <Col lg={6} xl={6}>
                                                                <Row>
                                                                    {showImagenMotor ? (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }>
                                                                            <i
                                                                                className="chektrenmotriz fa fa-check-circle"
                                                                                aria-hidden="true"></i>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col
                                                                            lg={
                                                                                1
                                                                            }
                                                                            xl={
                                                                                1
                                                                            }></Col>
                                                                    )}
                                                                    <Col
                                                                        lg={6}
                                                                        xl={6}>
                                                                        <Button
                                                                            className={
                                                                                botonMotor
                                                                            }
                                                                            variant="outline-light"
                                                                            onClick={() =>
                                                                                SeleccionaMotor()
                                                                            }>
                                                                            Sistema
                                                                            motor
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg={3} xl={3}>
                                                                <div
                                                                    className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                    onClick={() =>
                                                                        SeleccionaInfoMotriz(
                                                                            1
                                                                        )
                                                                    }>
                                                                    <div className="fondodivselecciontipoproducto">
                                                                        <InfoIcon
                                                                            style={{
                                                                                fontSize: 30,
                                                                            }}
                                                                            className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="pl-40">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionaSuspension
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoSuspension.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenSuspension ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonSuspension
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionaSuspension()
                                                                                }>
                                                                                Sistema
                                                                                de
                                                                                suspensión
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                5
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>

                                                    <Row className="mt-3">
                                                        <div className="pl-220">
                                                            <Row>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <img
                                                                        onClick={
                                                                            SeleccionasistemaElectrico
                                                                        }
                                                                        className="tamañoiconotrenmotrizcrearprdo apuntador"
                                                                        src={
                                                                            iconoSistemElectrico.src
                                                                        }
                                                                        alt="First slide"
                                                                    />
                                                                </Col>
                                                                <Col
                                                                    lg={6}
                                                                    xl={6}>
                                                                    <Row>
                                                                        {showImagenSistemElectrico ? (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }>
                                                                                <i
                                                                                    className="chektrenmotriz fa fa-check-circle"
                                                                                    aria-hidden="true"></i>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                xl={
                                                                                    1
                                                                                }></Col>
                                                                        )}
                                                                        <Col
                                                                            lg={
                                                                                6
                                                                            }
                                                                            xl={
                                                                                6
                                                                            }>
                                                                            <Button
                                                                                className={
                                                                                    botonSistemaElectrico
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    SeleccionasistemaElectrico()
                                                                                }>
                                                                                Sistema
                                                                                eléctrico
                                                                                accesorios
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col
                                                                    lg={3}
                                                                    xl={3}>
                                                                    <div
                                                                        className="iconoinfotrenmotrizcrearpdo apuntador"
                                                                        onClick={() =>
                                                                            SeleccionaInfoMotriz(
                                                                                13
                                                                            )
                                                                        }>
                                                                        <div className="fondodivselecciontipoproducto">
                                                                            <InfoIcon
                                                                                style={{
                                                                                    fontSize: 30,
                                                                                }}
                                                                                className="iconoinfotrenmotrizselect"></InfoIcon>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Row>
                                                </Row>
                                            </div>
                                        </div>
                                    )}

                                    <Row>
                                        <Col xl={12} lg={12} md={4} xs={4}>
                                            <Button
                                                className="ml-580 mt-3 mb-2 ps-btn colorfonoazulbase redondearborde"
                                                disabled={
                                                    habilitaSiguienteTrenMotriz
                                                }
                                                onClick={() =>
                                                    mostrarModalDatosProducto()
                                                }>
                                                {" "}
                                                Siguiente
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            ) : abrirCerarUbicarProducto ? (
                                <div className="ml-10">
                                    <Row>
                                        <Col xl={7} lg={7} md={7} xs={7}>
                                            <div
                                                className="ml-1 mt-1 datoscerrados"
                                                disabled={true}>
                                                <h3 className="textoubicacionproductomotos">
                                                    {textoUbicacionProducto}
                                                </h3>
                                            </div>
                                        </Col>
                                        <Col
                                            xl={1}
                                            lg={1}
                                            md={1}
                                            xs={1}
                                            className="ml-124 mtmenos2">
                                            <div className="showcerrarabrir">
                                                <i
                                                    className="colortextoselect mt-2 fa fa-angle-down 
                                                               d-flex justify-content-center apuntador"
                                                    onClick={
                                                        abrirDatosUbicacionProucto
                                                    }
                                                    aria-hidden="true"
                                                    ref={targetshow}
                                                    onMouseOver={() =>
                                                        setShowEdit(true)
                                                    }
                                                    onMouseOut={() =>
                                                        setShowEdit(false)
                                                    }></i>
                                            </div>

                                            <Overlay
                                                className="mt-10"
                                                target={targetshow.current}
                                                show={showEdit}
                                                placement="top">
                                                {(props) => (
                                                    <Tooltip
                                                        className="ubicartooltipproducto"
                                                        id="overlay-example"
                                                        {...props}>
                                                        <h3 className="tamañotextotooltipproducto">
                                                            {" "}
                                                            Editar{" "}
                                                        </h3>
                                                    </Tooltip>
                                                )}
                                            </Overlay>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                        ) : null}

                        <div className="App">
                            <ModalComentariosHabitaculo
                                shown={mostrarModalComentariosHabitaculo}
                                close={() => {
                                    setMostrarModalComentariosHabitaculo(false);
                                }}
                                texto={textoPosicionHabitaculo}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default DatosLatoneria;
