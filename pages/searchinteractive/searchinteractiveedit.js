import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Dropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useDispatch, useSelector } from "react-redux";
import { getTypesVehicles } from "../../store/typesvehicles/action";
import { getEditDataFind } from "../../store/editdatafind/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";
import { MultiSelect } from "react-multi-select-component";
import { getDataSearchInteractive } from "../../store/datasearchinteractive/action";
import { getDataSelectSearch } from "../../store/dataselectsearch/action";
import { getEditData } from "../../store/editdata/action";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
        &#x25bc;
    </a>
));

let dato = [];

const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañocajaoptionsitemssearchdos"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value)}
                //value={value}
                />

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
                { }
            </div>
        );
    }
);

function SearchInteractiveEdit(props) {
    const router = useRouter();
    const controlAnno = useRef();
    const { close, setIsLoading, setClicAqui, setHabilitarIcono, setDatosFaltantes } = props;
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(defaultValueForm());

    const [listTiposVehiculos, setListtiposVehiculos] = useState([]);
    const [listMarcasVehiculos, setListMarcasVehiculos] = useState([]);
    const [listCarroceriasVehiculos, setListCarroceriasVehiculos] = useState(
        []
    );
    const [listAnnosVehiculos, setListAnnosVehiculos] = useState([]);
    const [listModelosVehiculos, setListModelosVehiculos] = useState([]);
    const [listCilindrajeVehiculos, setListCilindrajeVehiculos] = useState([]);

    // Arreglo version de motores segun modelo Selecciondo
    const [tipoVehiculo, setTipoVehiculo] = useState(0);
    const [carroceriaVehiculo, setCarroceriaVehiculo] = useState(0);
    const [marcaVehiculo, setMarcaVehiculo] = useState(0);
    const [annoVehiculo, setAnnoVehiculo] = useState([]);
    const [modeloVehiculo, setModeloVehiculo] = useState([]);
    const [cilindrajeVehiculo, setCilindrajeVehiculo] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [tipoCombustible, setTipoCombustible] = useState(0);
    const [tipoTransmision, setTipoTransmision] = useState(0);
    const [tipoTraccion, setTipoTraccion] = useState(0);

    const [alertarTipo, setAlertarTipo] = useState("textoalertdos");
    const [alertarCarroceria, setAlertarCarroceria] = useState("textoalertdos");
    const [alertarMarca, setAlertarMarca] = useState("textoalertdos");
    const [alertarModelo, setAlertarModelo] = useState("textoalertdos");

    const [mostrarTransmision, setMostrarTransmision] = useState("mostrar-div");
    const [mostrarTraccion, setMostrarTraccion] = useState("mostrar-div");
    const [mostrarCombustible, setMostrarCombustible] = useState("mostrar-div");

    const [disabledTipo, setDisabledTipo] = useState(true);
    const [disabledCarroceria, setDisabledCarroceria] = useState(true);
    const [disabledMarca, setDisabledMarca] = useState(true);
    const [disabledModelo, setDisabledModelo] = useState(true);
    const [disabledAnno, setDisabledAnno] = useState("deshabilitar");
    const [disabledCilindraje, setDisabledCilindraje] = useState(true);
    const [disabledCombustible, setDisabledCombustible] = useState(true);
    const [disabledTransmision, setDisabledTransmision] = useState(true);
    const [disabledTraccion, setDisabledTraccion] = useState(true);

    const [alertaTipo, setAlertaTipo] = useState("");
    const [alertaCarroceria, setAlertaCarroceria] = useState("");
    const [alertaMarca, setAlertaMarca] = useState("");
    const [alertaModelos, setAlertaModelos] = useState("");

    const [nombreTipoVeh, setNombreTipoVeh] = useState("Tipo Vehículo");
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState("Carrocería");
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState("Marca");
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState("Año");
    const [nombreModeloVeh, setNombreModeloVeh] = useState("Modelo");
    const [nombreCilindrajeVeh, setNombreCilindrajeVeh] = useState("Cilindraje");
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState("Transmisión");
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState("Combustible");
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState("Tracción");

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [textoMensajesAlterno, setTextoMensajesAlterno] = useState(false);
    const [activar, setActivar] = useState(false);
    const [open, setOpen] = useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [marcas, setMarcas] = useState([]);
    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda
    const [modelos, setModels] = useState([]);
    // Arreglo carrocerias de los Vehiculos segun Tipo Selecciondo
    const [carrocerias, setCarrocerias] = useState([]);
    // Disparar procedimiento que lee los Tipos de Vehiculos
    const [classTransmision, setClassTransmision] = useState("alinearizquierda dropdownsearchinteractiveothers");
    const [classTraccion, setClassTraccion] = useState("ml-5 alinearizquierda dropdownsearchinteractiveothers");
    const [classCombustible, setClassCombustible] = useState("alinearizquierda dropdownsearchinteractivecombustible");
    const [classCilindraje, setClassCilindraje] = useState("alinearizquierda dropdownsearchinteractivecilindraje");

    const [cambioCilindraje, setCambioCilindraje] = useState(false);
    const [cambioTransmision, setCambioTransmision] = useState(false);
    const [cambioCombustible, setCambioCombustible] = useState(false);
    const [cambioTraccion, setCambioTraccion] = useState(false);

    const [editCilindraje, setEditCilindraje] = useState(false);
    const [editTransmision, setEditTransmision] = useState(false);
    const [editCombustible, setEditCombustible] = useState(false);
    const [editTraccion, setEditTraccion] = useState(false);

    let editardatosbuscador = useSelector(
        (state) => state.editdatafind.editdatafind
    );

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    useEffect(() => {
        //Lee datos editar variables sistema tren motriz
        //editardatosbuscador = JSON.parse(localStorage.getItem("editardatosbuscador"));
        //console.log("DATOS : ", editardatosbuscador)
        setDisabledTipo(true);
        setDisabledCarroceria(true);
        setDisabledMarca(true);
        setDisabledModelo(true);
        setDisabledAnno("deshabilitar");
        setDisabledCilindraje(true);
        setDisabledCombustible(true);
        setDisabledTransmision(true);
        setDisabledTraccion(true);

        if (editardatosbuscador) {

            if (editardatosbuscador.editarCilindraje) {
                setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindrajealert")
                setCambioCilindraje(true);
                setDisabledCilindraje(false);
            } else
                setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje")

            if (editardatosbuscador.editarCombustible) {
                setClassCombustible("alinearizquierda dropdownsearchinteractivealert")
                setCambioCombustible(true);
                setDisabledCombustible(false);
            } else
                setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible")

            if (editardatosbuscador.editarTraccion) {
                setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothersalert")
                setCambioTraccion(true);
                setDisabledTraccion(false);
            } else
                setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers")

            if (editardatosbuscador.editarTransmision) {
                setClassTransmision("alinearizquierda dropdownsearchinteractiveothersalert")
                setCambioTransmision(true);
                setDisabledTransmision(false);
            } else
                setClassTransmision("alinearizquierda dropdownsearchinteractiveothers")



        }
    }, [editardatosbuscador]);

    const datosmodelosvehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );
    const datoscilindrajevehiculos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );
    const datasearchinteractive = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    const editardatos = useSelector(
        (state) => state.editdata.editdata.editar
    );
    const [url, setUrl] = useState(
        "https://gimcloud.com.co/files/mercadorepuesto/buscador/"
    );

    useEffect(() => {
        localStorage.setItem(
            "annoselect",
            JSON.stringify("")
        );
        setListtiposVehiculos(
            JSON.parse(localStorage.getItem("datostiposvehiculos"))
        );
        setListMarcasVehiculos(
            JSON.parse(localStorage.getItem("datosmarcasvehiculos"))
        );
        setListCarroceriasVehiculos(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        setListAnnosVehiculos(
            JSON.parse(localStorage.getItem("datosannosvehiculos"))
        );

        if (editardatos) {
            setTipoVehiculo(datasearchinteractive.idvehiculo);
            setCarroceriaVehiculo(datasearchinteractive.idcarrorecia);
            setMarcaVehiculo(datasearchinteractive.idmarca);
            setAnnoVehiculo(datasearchinteractive.codigoano);
            setModeloVehiculo(datasearchinteractive.codigomodelo);
            setCilindrajeVehiculo(datasearchinteractive.codigocilindraje);
            setTipoCombustible(datasearchinteractive.codigocombustible);
            setTipoTransmision(datasearchinteractive.codigotransmision);
            setTipoTraccion(datasearchinteractive.codigotraccion);

            setNombreTipoVeh(datasearchinteractive.nombretipovehiculo);
            setNombreCarroceriaVeh(datasearchinteractive.nombrecarroceria);
            setNombreMarcaVeh(datasearchinteractive.nombremarca);

            //if (datasearchinteractive && datasearchinteractive.annosseleccionado.length === 0)
            if (datasearchinteractive)
                setNombreAnnoVeh(["Año"])
            else
                setNombreAnnoVeh(datasearchinteractive.annosseleccionado);

            setNombreModeloVeh(datasearchinteractive.nombremodelo);
            setNombreCilindrajeVeh(datasearchinteractive.nombrecilindraje);
            setNombreCombustibleVeh(datasearchinteractive.nombretipocombustible);

            if (datasearchinteractive.idvehiculo != 3 && datasearchinteractive.idvehiculo != 4) {
                setNombreTransmisionVeh(datasearchinteractive.nombretransmision);
                setNombreTraccionVeh(datasearchinteractive.nombretraccion);
            } else {
                setNombreTransmisionVeh("");
                setNombreTraccionVeh("");
                setNombreCombustibleVeh("");
                setDisabledTransmision(true);
                setDisabledTraccion(true);
                setDisabledCombustible(true);
                setMostrarTransmision("ocultar-div");
                setMostrarTraccion("ocultar-div");
                setMostrarCombustible("ocultar-div");
            }

            if (datasearchinteractive.idvehiculo != 1 && datasearchinteractive.idvehiculo != 3 &&
                datasearchinteractive.idvehiculo != 6) {
                setNombreTraccionVeh(datasearchinteractive.nombretraccion);
            } else {
                setNombreTraccionVeh("");
                setDisabledTraccion(true);
                setMostrarTraccion("ocultar-div");
            }

            setMarcas(datasearchinteractive.tiposmarcas);
            setModels(datasearchinteractive.tiposmodelos);
            setCarrocerias(datasearchinteractive.tiposcarrocerias);
            setCilindrajes(datasearchinteractive.tiposcilindrajes)
        }

        //setListModelosVehiculos(data.vgl_modelosvehiculos);
        //setListCilindrajeVehiculos(data.vgl_cilindrajesvehiculos);Año

        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
    }, [editardatos, datasearchinteractive]);

    const colocarDatosState = () => {
        if (cambioCilindraje && cambioTransmision) {
            setHabilitarIcono(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje && cambioCombustible) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y combustible de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje && cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos cilindraje y tracción de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCilindraje) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato cilindraje de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioCombustible && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos combustible y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCombustible && cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos combustible y tracción de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioCombustible) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato combustible de tu vehículo, es necesario para continuar."
            );
            return;
        }

        if (cambioTraccion && cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos tracción y transmisión de tu vehículo, son necesarios para continuar."
            );
            return;
        }

        if (cambioTransmision) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de transmisión de tu vehículo, es necesario para continuar."
            );
            return;
        }


        if (cambioTraccion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de tracción de tu vehículo, es necesario para continuar."
            );
            return;
        }
        //localStorage.removeItem("datasearchinteractive");

        let editar = {
            editarCombustible: false,
            editarTraccion: false,
            editarTransmision: false,
            editarCilindraje: false,
            habilitarBotonCombustible: editCombustible,
            habilitarBotonTraccion: editTraccion,
            habilitarBotonTransmision: editTransmision,
            habilitarBotonCilindraje: editCilindraje,
        };

        dispatch(getEditDataFind(editar));

        if (!tipoVehiculo) {
            setAlertaTipo("textoalertdos")
        }

        if (!carroceriaVehiculo) {
            setAlertaCarroceria("textoalertdos")
        }

        if (!marcaVehiculo) {
            setAlertaMarca("textoalertdos")
        }

        if (!modeloVehiculo || modeloVehiculo.length === 0) {
            setAlertaModelos("textoalert")
        }

        if (!tipoVehiculo && !carroceriaVehiculo && !marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos tipo de vehículo, carroceria, marca y modelo son necesarios para continuar."
            );
            return;
        }

        if (!carroceriaVehiculo && !marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos carroceria, marca y modelo de tu vehículo son necesarios para continuar."
            );
            return;
        }

        if (!marcaVehiculo && (!modeloVehiculo || modeloVehiculo.length === 0)) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "Los datos marca y modelo del vehículo son necesarios para continuar."
            );
            return;
        }

        if (!modeloVehiculo || modeloVehiculo.length === 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato modelo del vehículo es necesarios para continuar."
            );
            return;
        }

        if (!tipoVehiculo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo del vehículo, es necesarios para continuar."
            );
            return;
        }

        if (!carroceriaVehiculo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato tipo de carroceria del vehículo, es necesarios para continuar."
            );
            return;
        }

        if (!marcaVehiculo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información faltante");
            setTextoMensajes(
                "El dato marca del vehículo, es necesarios para continuar."
            );
            return;
        }

        let marcasSeleccionadas = "";
        const detNombreAnno = [];
        let annoSeleccionadas = "";
        let modeloSeleccionadas = "";
        let cilindrajeSeleccionadas = "";
        let combustibleSeleccionadas = "";
        let transmisionSeleccionadas = "";
        let traccionSeleccionadas = "";

        if (marcaVehiculo.length > 0) {
            marcasSeleccionadas = marcaVehiculo;
        }

        for (var i = 0; i < annoVehiculo.length; i++) {
            detNombreAnno.push(annoVehiculo[i].anovehiculo);
            annoSeleccionadas = annoSeleccionadas + annoVehiculo[i].anovehiculo + " ";
        }

        if (detNombreAnno.length > 0)
            setNombreAnnoVeh(detNombreAnno);

        if (modeloVehiculo.length > 0) {
            modeloSeleccionadas = modeloVehiculo;
        }

        if (cilindrajeVehiculo.length > 0) {
            cilindrajeSeleccionadas = cilindrajeVehiculo;
        }

        if (tipoCombustible.length > 0) {
            combustibleSeleccionadas = tipoCombustible;
        }

        if (tipoTransmision.length > 0) {
            transmisionSeleccionadas = tipoTransmision;
        }

        if (tipoTraccion.length > 0) {
            traccionSeleccionadas = tipoTraccion;
        }

        const DatosBuscadorInteractivo = {
            idvehiculo: tipoVehiculo,
            idcarrorecia: carroceriaVehiculo,
            idmarca: marcaVehiculo,
            codigoano: datasearchinteractive.codigoano,
            codigomodelo: modeloVehiculo,
            codigocilindraje: cilindrajeVehiculo,
            codigocombustible: tipoCombustible,
            codigotransmision: tipoTransmision,
            codigotraccion: tipoTraccion,
            nombretipovehiculo: nombreTipoVeh,
            nombrecarroceria: nombreCarroceriaVeh,
            nombremarca: nombreMarcaVeh,
            nombreanno: nombreAnnoVeh,
            nombremodelo: nombreModeloVeh,
            nombrecilindraje: nombreCilindrajeVeh,
            nombretipocombustible: nombreCombustibleVeh,
            nombretransmision: nombreTransmisionVeh, //datosbuscadorinteractivo.nombretransmision,
            nombretraccion: nombreTraccionVeh, // datosbuscadorinteractivo.nombretraccion,
            marcasseleccionadas: marcasSeleccionadas,
            annosseleccionado: datasearchinteractive.nombreanno,
            modelosseleccionados: modeloSeleccionadas,
            cilindrajesseleccionados: cilindrajeSeleccionadas,
            combustiblesseleccionados: combustibleSeleccionadas,
            transmisionesseleccionadas: transmisionSeleccionadas,
            traccionesseleccionadas: traccionSeleccionadas,
            tiposvehiculos: listTiposVehiculos,
            tiposcarrocerias: carrocerias,
            tiposmarcas: marcas,
            tiposmodelos: modelos,
            tiposcilindrajes: cilindrajes,
        };

        let transmisionselect = "";
        let traccionselect = "";
        let cilindrajeselect = "";
        let combustibleselect = "";
        let anosselect = "";

        //console.log("AÑOS : ", nombreAnnoVeh[0])
        if (nombreAnnoVeh[0] != "Año" && nombreAnnoVeh[0] != "A")
            anosselect = "; " + detNombreAnno;

        if (nombreTransmisionVeh != "Transmisión")
            transmisionselect = "; " + nombreTransmisionVeh;

        if (nombreTraccionVeh != "Tracción")
            traccionselect = "; " + nombreTraccionVeh;

        if (nombreCilindrajeVeh != "Cilindraje")
            cilindrajeselect = "; " + nombreCilindrajeVeh;

        if (nombreCombustibleVeh != "Combustible")
            combustibleselect = "; " + nombreCombustibleVeh;

        const DatosSeleccionadosBuscador = {
            nombretipovehiculo: nombreTipoVeh,
            nombrecarroceria: "; " + nombreCarroceriaVeh,
            nombremarca: "; " + nombreMarcaVeh,
            nombreanno: anosselect,
            nombremodelo: "; " + nombreModeloVeh,
            nombrecilindraje: cilindrajeselect,
            nombretipocombustible: combustibleselect,
            nombretransmision: transmisionselect,
            nombretraccion: traccionselect,
        };

        dispatch(getDataSelectSearch(DatosSeleccionadosBuscador));
        //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatosBuscadorInteractivo);

        // Se comenta por que al editar el vehículo no estaba mostrando los cambios de los sistema motriz
        dispatch(getDataSearchInteractive(DatosBuscadorInteractivo));

        //localStorage.setItem("datasearchinteractive",JSON.stringify(DatosBuscadorInteractivo));
        let editdata = {
            editar: false
        }

        //setDatosFaltantes(true);
        dispatch(getEditData(editdata));
        setIsLoading(true);
        close(false);
        //mostrarCarroceria();
    };

    const mostrarCarroceria = () => {
        if (carroceriaVehiculo == 24) {
            router.push("/searchinteractive/sedan/searchsedan#searchmr");
        } else
            if (carroceriaVehiculo == 8) {
                router.push("/searchinteractive/coupe/searchcoupe#searchmr");
            } else
                if (carroceriaVehiculo == 2) {
                    router.push("/searchinteractive/automoviltrespuertas/searchtrespuertas#searchmr");
                } else
                    if (carroceriaVehiculo == 3) {
                        router.push("/searchinteractive/automovilcincopuertas/searchcincopuertas#searchmr");
                    }
                    else
                        if (carroceriaVehiculo == 16) {
                            router.push("/searchinteractive/camionetadoblechasis/searchcamionetadoblechasis#searchmr");
                        } else
                            if (carroceriaVehiculo == 17) {
                                router.push("/searchinteractive/camionetasencillachasis/searchcamionetasencillachasis#searchmr");
                            } else
                                if (carroceriaVehiculo == 20) {
                                    router.push("/searchinteractive/camionetadoblevolco/searchcamionetadoblevolco#searchmr");
                                }
                                else
                                    if (carroceriaVehiculo == 21) {
                                        router.push("/searchinteractive/camionetasencillavolco/searchcamionetasencillavolco#searchmr");
                                    }

    };

    let combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    if (tipoVehiculo == 4) {
        combustible = [
            { label: "Gasolina – Eléctrico", value: 4 },
        ];
    } else {
        combustible = [
            { label: "Gasolina", value: 1 },
            { label: "Diesel", value: 2 },
            { label: "Gasolina – Gas", value: 3 },
            { label: "Gasolina – Eléctrico", value: 4 },
        ];
    }

    const transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    const traccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    const tracciondos = [
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    const handleChange = (selectedOptions) => {
        setAlertarTipo("textoalertdos");
        setAlertarCarroceria("textoalertdos");
        setAlertarMarca("textoalertdos");
        setAlertarModelo("textoalertdos");
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");
        setAlertaTipo("");
        setAlertarTipo("");
        setCarroceriaVehiculo(0);
        setMarcaVehiculo(0);
        setAnnoVehiculo([]);
        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setNombreCarroceriaVeh("Carrocería");
        setNombreMarcaVeh("Marca");
        setNombreAnnoVeh("Año");
        setNombreModeloVeh("Modelo");
        setNombreCilindrajeVeh("Cilindraje");
        setNombreCombustibleVeh("Combustible");

        if (selectedOptions == 3 || selectedOptions == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setMostrarCombustible("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setNombreCombustibleVeh("");
        } else if (
            selectedOptions == 1 ||
            selectedOptions == 3 ||
            selectedOptions == 4 ||
            selectedOptions == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            setNombreTransmisionVeh("Transmisión");
            setNombreTraccionVeh("Tracción");
        }

        setTipoVehiculo(selectedOptions);
        const tipovehiculo = {
            idtipovehiculo: selectedOptions,
        };

        async function readtypevehicle(tipovehiculo) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            listTiposVehiculos &&
                listTiposVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.id) ===
                        Number.parseInt(tipovehiculo.idtipovehiculo)
                    ) {
                        setNombreTipoVeh(row.label);
                    }
                });
        }
        readtypevehicle(tipovehiculo);

        const newDet = [];
        listCarroceriasVehiculos.forEach((row) => {
            if (
                parseInt(row.tipovehiculo) ===
                parseInt(selectedOptions)
            ) {
                //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                let item = {
                    id: row.id,
                    carroceria: row.carroceria,
                    tipovehiculo: row.tipovehiculo,
                    estado: row.estado,
                    value: row.id,
                    label: row.carroceria,
                };
                newDet.push(item);
            }
        });
        setCarrocerias(newDet);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setAlertaCarroceria("");
        setAlertarCarroceria("");
        setCarroceriaVehiculo(selectedOptions);

        if (selectedOptions == 16 ||
            selectedOptions == 21 ||
            selectedOptions == 17 ||
            selectedOptions == 20)
            setNombreTraccionVeh("Tracción")

        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        setMarcaVehiculo(0);
        setAnnoVehiculo([]);
        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setNombreMarcaVeh("Marca");
        //setNombreAnnoVeh("Año...");
        setNombreModeloVeh("Modelo");
        //setNombreCilindrajeVeh("Cilindraje");
        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        const newDet = [];
        listMarcasVehiculos &&
            listMarcasVehiculos.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVehiculo) &&
                    Number.parseInt(row.carroceria) ===
                    Number.parseInt(selectedOptions)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipovehiculo: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDet.push(item);
                }
            });
        setMarcas(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        setAlertaMarca("");
        setAlertarMarca("");
        // Asignamos la marca del Vehiculo Seleccionado por el usuario
        setMarcaVehiculo(selectedOptions);

        setAnnoVehiculo([]);
        setModeloVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        //setNombreAnnoVeh("Año");
        setNombreModeloVeh("Modelo");
        //setNombreCilindrajeVeh("Cilindraje");
        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
            setMostrarCombustible("ocultar-div");
            setNombreCombustibleVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        const newDet = [];
        datosmodelosvehiculos &&
            datosmodelosvehiculos.forEach((row) => {
                if (
                    parseInt(row.marca) ===
                    parseInt(selectedOptions) &&
                    parseInt(row.carroceria) ===
                    parseInt(carroceriaVehiculo)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        modelo: row.modelo,
                        tipovehiculo: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        value: row.id,
                        label: row.modelo,
                    };
                    newDet.push(item);
                }
            });
        setModels(newDet);
    };

    const handleChangeModels = (selectedOptions) => {
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");

        setAlertaModelos("");
        setAlertarModelo("");
        setModeloVehiculo(selectedOptions);

        //setAnnoVehiculo([]);
        setCilindrajeVehiculo([]);
        setCilindrajes([]);
        setTipoCombustible(0);
        setTipoTransmision(0);
        setTipoTraccion(0);

        //setNombreAnnoVeh("Año...");
        //setNombreCilindrajeVeh("Cilindraje");
        //setNombreTransmisionVeh("Transmisión");
        //setNombreCombustibleVeh("Combustible");
        //setNombreTraccionVeh("Tracción");

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }

        if (selectedOptions.length > 0) {
            const newDet = [];
            datoscilindrajevehiculos &&
                datoscilindrajevehiculos.forEach((row) => {
                    if (
                        parseInt(row.tipovehiculo) ===
                        parseInt(tipoVehiculo) &&
                        parseInt(row.carroceria) ===
                        parseInt(carroceriaVehiculo) &&
                        parseInt(row.modelo) ===
                        parseInt(selectedOptions)
                    ) {
                        //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            cilindraje: row.cilindraje,
                            tipovehiculo: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            modelo: row.modelo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                        };
                        newDet.push(item);
                    }
                });
            setCilindrajes(newDet);
        }
    };

    const handleChangeAnno = (selectedOptions) => {
        //console.log("AÑOS SELEC: ",selectedOptions)
        setAnnoVehiculo(selectedOptions);

        let nombres = [];
        selectedOptions &&
            selectedOptions.map((row, index) => {
                nombres.push(row.label)
            });

        setNombreAnnoVeh(nombres);

        if (selectedOptions.length === 0) {
            setAnnoVehiculo([]);
            setNombreAnnoVeh("Año")
        }

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeCilindraje = (selectedOptions) => {
        setClassCilindraje("alinearizquierda dropdownsearchinteractivecilindraje");
        setCambioCilindraje(false);
        setEditCilindraje(true);
        if (selectedOptions.length > 0) {
            //console.log("VERSION MOTOR SELECCIONADO : ", selectedOptions);
            setCilindrajeVehiculo(selectedOptions);
        }
        /*
                setNombreTransmisionVeh("Transmisión");
                setNombreCombustibleVeh("Combustible");
                setNombreTraccionVeh("Tracción");
       
        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
             */
    };

    const handleChangeCombustible = (selectedOptions) => {
        //console.log("COMBUSTIBLE : ", selectedOptions);
        setTipoCombustible(selectedOptions);
        setClassCombustible("alinearizquierda dropdownsearchinteractivecombustible");
        setCambioCombustible(false);
        setEditCombustible(true);

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTransmision("ocultar-div");
            setMostrarTraccion("ocultar-div");
            setNombreTransmisionVeh("");
            setNombreTraccionVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
            setMostrarTransmision("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
        } else {
            setMostrarTransmision("mostrar-div");
            setMostrarTraccion("mostrar-div");
            //setNombreTransmisionVeh("Transmisión");
            //setNombreTraccionVeh("Tracción");
        }
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTipoTransmision(selectedOptions);
        setClassTransmision("alinearizquierda dropdownsearchinteractiveothers");
        setCambioTraccion(false);
        setCambioTransmision(false);
        setEditTransmision(true);

        if (tipoVehiculo == 3 || tipoVehiculo == 4) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
        } else if (
            tipoVehiculo == 1 ||
            tipoVehiculo == 3 ||
            tipoVehiculo == 4 ||
            tipoVehiculo == 6
        ) {
            setMostrarTraccion("ocultar-div");
            setNombreTraccionVeh("");
        } else {
            setMostrarTraccion("mostrar-div");
            //setNombreTraccionVeh("Tracción");
            //setDisabledTraccion(false);
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTipoTraccion(selectedOptions);
        setClassTraccion("ml-5 alinearizquierda dropdownsearchinteractiveothers");
        setCambioTraccion(false);
        setEditTraccion(true);
    };

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        async function typesvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesVehicles =
                await TypesVehiclesRepository.getTypesVehicles(0);
            //console.log("TYPES VEHICLES : ", TypesVehicles[0].header_supplies);
            setVehiculos(TypesVehicles[0].header_supplies);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesVehicles(TypesVehicles));
        }
        typesvehicles(0);
    }, [tipos]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const editarBuscador = () => {
        setClicAqui(true);
    };

    //useOnClickOutside(controlAnno, () => setOpen(false));

    return (
        <div id="general" className="ps-page ps-page--inner">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            <div className="row">
                <div className="ml-10 col-md-8">
                    <div className="mt-10">
                        <div className="ps-form__group searchContainer">
                            <div className="searchContainerMargin">

                                <div className="barrainputbuscadorinteractivo">
                                    <Row>
                                        <Col xs={3} sm={3} md={3} lg={3} >
                                            <Dropdown
                                                onSelect={handleChange}
                                            >
                                                <Dropdown.Toggle
                                                    className="alinearizquierda dropdownsearchinteractive"
                                                    disabled={disabledTipo}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarTipo}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaTipo}
                                                        >
                                                            {nombreTipoVeh}
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="optionssearchinteractive">
                                                    {listTiposVehiculos &&
                                                        listTiposVehiculos.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreTipoVeh(item.text)}
                                                                    >
                                                                        {
                                                                            item.text
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs={2} sm={2} md={3} lg={3} >
                                            <Dropdown
                                                onSelect={handleChangeCarroceria}
                                            >
                                                <Dropdown.Toggle
                                                    className="mlmenos20 alinearizquierda searchcarrocerias"
                                                    variant="outline-light"
                                                    disabled={disabledCarroceria}
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarCarroceria}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaCarroceria}
                                                        >
                                                            {nombreCarroceriaVeh}
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="optionssearchinteractive">
                                                    {carrocerias &&
                                                        carrocerias.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.value
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreCarroceriaVeh(item.label)}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs={2} sm={2} md={3} lg={3} >
                                            <Dropdown
                                                onSelect={handleChangeBrand}
                                            >
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    className="ml-40 alinearizquierda 
                                                               dropdownsearchinteractivebrand"
                                                    disabled={disabledMarca}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarMarca}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaMarca}
                                                        >
                                                            {nombreMarcaVeh}
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenu}
                                                    variant="outline-light"
                                                    className="optionssearchinteractive">
                                                    {marcas &&
                                                        marcas.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreMarcaVeh(item.text)}
                                                                    >
                                                                        {
                                                                            item.text
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <div className={disabledAnno} >
                                            <Col xs={2} sm={2} md={2} lg={2}>
                                                <MultiSelect
                                                    options={annos}
                                                    value={annoVehiculo}
                                                    enabled="false"
                                                    onChange={handleChangeAnno}
                                                    enableSearch="true"
                                                    className="ml-3 dropdown-heading-anno-search size-anno-search"
                                                    labelledBy="Año"
                                                    //disabled="true"
                                                    overrideStrings={{
                                                        selectSomeItems: nombreAnnoVeh,
                                                        allItemsAreSelected:
                                                            "Todos los años",
                                                        search: "Buscar",
                                                        selectAll:
                                                            "Todos"
                                                    }}
                                                />

                                            </Col>
                                        </div>
                                    </Row>
                                </div>
                                <br />
                                <div className="barrainputbuscadorinteractivo">
                                    <Row>
                                        <Col xs={3} sm={3} md={3} lg={3}>
                                            <Dropdown
                                                onSelect={handleChangeModels}
                                            >
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    disabled={disabledModelo}
                                                    className="alinearizquierda dropdownsearchinteractivemodels "
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <Row>
                                                        <Col xs={1} sm={1} md={1} lg={1} >
                                                            <h3 className={alertarModelo}> * </h3>
                                                        </Col>
                                                        <Col xs={10} sm={10} md={10} lg={10}
                                                            className={alertaModelos}
                                                        >
                                                            {nombreModeloVeh}
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenu}
                                                    variant="outline-light"
                                                    className="optionssearchinteractiveannos">
                                                    {modelos &&
                                                        modelos.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreModeloVeh(item.label)}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2} className="ml-20" >
                                            <Dropdown
                                                onSelect={handleChangeCilindraje}
                                            >
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    disabled={disabledCilindraje}
                                                    className={classCilindraje}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    {nombreCilindrajeVeh}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenu}
                                                    variant="outline-light"
                                                    className="optionssearchinteractiveannos">
                                                    {cilindrajes &&
                                                        cilindrajes.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        eventKey={
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            setNombreCilindrajeVeh(item.cilindraje)}
                                                                    >
                                                                        {
                                                                            item.cilindraje
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2} className="mlmenos1">
                                            <div className={mostrarCombustible} >
                                                <Dropdown
                                                    onSelect={handleChangeCombustible}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledCombustible}
                                                        className={classCombustible}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        {nombreCombustibleVeh}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractiveannos">
                                                        {combustible &&
                                                            combustible.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.value
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreCombustibleVeh(item.label)}
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                        {
                                            //AQUI
                                        }
                                        <Col xs={2} sm={2} md={2} lg={2} className="ml-10">
                                            <div className={mostrarTransmision} >
                                                <Dropdown
                                                    onSelect={handleChangeTransmision}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledTransmision}
                                                        className={classTransmision}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        {nombreTransmisionVeh}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractiveannos">
                                                        {transmision &&
                                                            transmision.map(
                                                                (item) => {
                                                                    return (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdowncustom"
                                                                            eventKey={
                                                                                item.value
                                                                            }
                                                                            onClick={() =>
                                                                                setNombreTransmisionVeh(item.label)}
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Dropdown.Item>
                                                                    );
                                                                }
                                                            )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2} className="mlmenos20">
                                            <div className={mostrarTraccion} >
                                                <Dropdown
                                                    onSelect={handleChangeTraccion}
                                                >
                                                    <Dropdown.Toggle
                                                        onclick={CustomToggle}
                                                        disabled={disabledTraccion}
                                                        className={classTraccion}
                                                        variant="outline-light"
                                                        id="dropdown-basic">
                                                        {nombreTraccionVeh}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        as={CustomMenu}
                                                        variant="outline-light"
                                                        className="optionssearchinteractiveannos">
                                                        {
                                                            carroceriaVehiculo != 16 &&
                                                                carroceriaVehiculo != 21 &&
                                                                carroceriaVehiculo != 17 &&
                                                                carroceriaVehiculo != 20 ?
                                                                traccion &&
                                                                traccion.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                eventKey={
                                                                                    item.value
                                                                                }
                                                                                onClick={() =>
                                                                                    setNombreTraccionVeh(item.label)}
                                                                            >
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )
                                                                :
                                                                tracciondos &&
                                                                tracciondos.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustom"
                                                                                eventKey={
                                                                                    item.value
                                                                                }
                                                                                onClick={() =>
                                                                                    setNombreTraccionVeh(item.label)}
                                                                            >
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )

                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-10">
                <Row>
                    <Col xs={12} sm={12} md={5} lg={5} >
                        <h1 className="textoeditinformacionfaltante">
                            ** Para volver y editar otro datos de tu vehículo haz clic
                        </h1>

                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1} >
                        <h1 className="textoeditinformacionfaltante clicaqui"
                            onClick={() => editarBuscador()}
                        >
                            aquí.
                        </h1>
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3} ></Col>
                    <Col xs={3} sm={3} md={3} lg={3} >
                        <div className="mt-10 ml-70 ps-btn redondearborde"
                            onClick={colocarDatosState}
                        >
                            Buscar Producto
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        codigo: 0,
        codigolatint: 0,
    };
}

// Hook
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export default SearchInteractiveEdit;