import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
    Button,
    Row,
    Col,
    Tooltip,
    Overlay,
} from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import ModalComentariosCategorias from "./ModalComentariosCategorias";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";

function CategoriasProductosGenericos(props) {
    const {
        setShowDatosProductos,
        showDatosProductos,
        abrirCerrarCategoriasGenerico,
        setAbrirCerrarCategoriasGenerico,
        categoria,
        setCategoria,
    } = props;
    const router = useRouter();
    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);

    const [nombreEstetico, setnombreEstetico] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreInterior, setnombreInterior] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreExterior, setnombreExterior] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreSonido, setnombreSonido] = useState("botoncategoriasgenerico");
    const [nombreIluminacion, setnombreIluminacion] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreLubricantes, setnombreLubricantes] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreLlantas, setnombreLlantas] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreBaterias, setnombreBaterias] = useState(
        "botoncategoriasgenerico"
    );
    const [nombrePlumillas, setnombrePlumillas] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreKit, setnombreKit] = useState("botoncategoriasgenerico");

    const [nombreUbicacionExteriorInfo, setnombreUbicacionExteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionInteriorInfo, setnombreUbicacionInteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionTrenMotrizInfo, setnombreUbicacionTrenMotrizInfo] =
        useState("botonpartesvehiculoinfo mt-2");

    const [modalLubricantesFluidos, setmodalLubricantesFluidos] =
        useState(false);
    const [modalEsteticos, setmodalEsteticos] = useState(false);
    const [modalLlantasRines, setmodalLlantasRines] = useState(false);
    const [modalIluminacion, setmodalIluminacion] = useState(false);
    const [modalKitCarretera, setmodalKitCarretera] = useState(false);
    const [modalBaterias, setmodalBaterias] = useState(false);
    const [modalPlumillas, setmodalPlumillas] = useState(false);
    const [modalInterior, setmodalInterior] = useState(false);
    const [modalExterior, setmodalExterior] = useState(false);
    const [modalSonido, setmodalSonido] = useState(false);
    const [habilitaSiguiente, setHabilitaSiguiente] = useState(true);
    const [classHabilitaSiguiente, setClassHabilitaSiguiente] = useState(
        "ps-btn  redondearborde baseinput colortextoselect ml-2"
    );
    const [listaSubCateGen, setListaSubCateGen] = useState(null);
    const [listaCategoriasGen, setListaCategoriasGen] = useState(null);

    const [lubricantesFluidos, setLubricantesFluidos] = useState(false);

    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);
    const [abrirCerarUbicarProducto, setAbrirCerarUbicarProducto] =
        useState(false);
    const [showModalComentariosCategoria, setShowModalComentariosCategoria] =
        useState(false);

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [classInfoEstetico, setClassInfoEstetico] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoExterior, setClassInfoExterior] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoInterior, setClassInfoInterior] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoSonido, setClassInfoSonido] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoIluminacion, setClassInfoIluminacion] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoLubricantes, setClassInfoLubricantes] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoLlantas, setClassInfoLlantas] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoBaterias, setClassInfoBaterias] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoPlumillas, setClassInfoPlumillas] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoKit, setClassInfoKit] = useState(
        "iconoinfomaterialproducto"
    );

    const [classEstetico, setClassEstetico] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classExterior, setClassExterior] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classInterior, setClassInterior] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classSonido, setClassSonido] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classIluminacion, setClassIluminacion] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classLubricantes, setClassLubricantes] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classLlantas, setClassLlantas] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classBaterias, setClassBaterias] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classPlumillas, setClassPlumillas] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [classKit, setClassKit] = useState(
        "cajaiconoinfomaterialcategorias apuntador apuntador"
    );
    const [subCateGenericos, setSubCateGenericos] = useState([]);

    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
        //AQUI
        if (duplicarprd == 1) {
            let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
            let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));

            if (datosprducto.posicionproducto == -1) {
                onEsteticos();
            } else if (datosprducto.posicionproducto == -2) {
                onInterior();
            } else if (datosprducto.posicionproducto == -3) {
                onExterior();
            } else if (datosprducto.posicionproducto == -4) {
                onSonido();
            } else if (datosprducto.posicionproducto == -5) {
                onIluminacion();
            } else if (datosprducto.posicionproducto == -6) {
                onLubricantesFluidos();
            } else if (datosprducto.posicionproducto == -7) {
                onLlantasRines();
            } else if (datosprducto.posicionproducto == -8) {
                onBaterias();
            } else if (datosprducto.posicionproducto == -9) {
                onPlumillas();
            } else if (datosprducto.posicionproducto == -10) {
                onKitCarretera();
            }
        }
    }, [duplicarprd]);

    useEffect(() => {
        const leerSubCatGene = async () => {
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "216"
                });
                //console.log("RESP CAT GENERA : ", res.data)
                if (res.data.type == 1)
                    setListaSubCateGen(res.data.listsubcategorias);
                else
                    console.error("Error leyendo categorias genericos", error);
            } catch (error) {
                console.error("Error leyendo categorias genericos", error);
                // Maneja el error según tus necesidades
            }
        };
        leerSubCatGene();

        const leerCategorias = async () => {
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "295"
                });

                //console.log("RESP CAT GENERAICA : ", res.data.listarcatgenerica);

                if (res.data.type == 1)
                    setListaCategoriasGen(res.data.listarcatgenerica);
                else
                    console.error("Error leyendo categorias genericos", error);
            } catch (error) {
                console.error("Error leyendo categorias genericos", error);
                // Maneja el error según tus necesidades
            }
        };
        leerCategorias();

    }, []);

    useEffect(() => {
        let subcategenericos = JSON.parse(localStorage.getItem("subcategenericos"));
        setSubCateGenericos(subcategenericos);

        //console.log("CATEGE GEN : ", subcategenericos)
        if (categoria == 1) {
            setCategoriaSeleccionada(subcategenericos[0].nombre);
        } else if (categoria == 2) {
            setCategoriaSeleccionada(subcategenericos[1].nombre);
        } else if (categoria == 3) {
            setCategoriaSeleccionada(subcategenericos[2].nombre);
        } else if (categoria == 4) {
            setCategoriaSeleccionada(subcategenericos[3].nombre);
        } else if (categoria == 5) {
            setCategoriaSeleccionada(subcategenericos[4].nombre);
        } else if (categoria == 6) {
            setCategoriaSeleccionada(subcategenericos[5].nombre);
        } else if (categoria == 7) {
            setCategoriaSeleccionada(subcategenericos[6].nombre);
        } else if (categoria == 8) {
            setCategoriaSeleccionada(subcategenericos[7].nombre);
        } else if (categoria == 9) {
            setCategoriaSeleccionada(subcategenericos[8].nombre);
        } else if (categoria == 10) {
            setCategoriaSeleccionada(subcategenericos[9].nombre);
        } else
            setCategoriaSeleccionada(
                "Suegerencia: Aquí puedes ingresar información relacionada con tu producto."
            );
    }, [categoria]);

    useEffect(() => {
        router.push("/CreateProduct/createproduct#categorias");
    }, []);

    const comentarioEsteticos = () => {
        setShowModalComentariosCategoria(true);
        setCategoriaSeleccionada(subCateGenericos[0].nombre);
        setCategoria(1);
    };

    const onEsteticos = () => {
        setnombreEstetico("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(1);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -1,
            posicionProducto: -1,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproductoselect");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico(
            "cajaiconoinfomaterialcategorias apuntador apuntador iconocategoriaselect"
        );
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioInterior = () => {
        setShowModalComentariosCategoria(true);
        setCategoriaSeleccionada(subCateGenericos[1].nombre);
        setCategoria(2);
    };

    const onInterior = () => {
        setnombreInterior("botoncategoriasgenerico colorseleccionboton");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");
        setCategoria(2);

        let asignagenerico = [];
        let item = {
            ubicacionProducto: -2,
            posicionProducto: -2,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproductoselect");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador ");
        setClassInterior(
            "cajaiconoinfomaterialcategorias apuntador  iconocategoriaselect"
        );
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioExterior = () => {
        setCategoriaSeleccionada(subCateGenericos[2].nombre);
        setShowModalComentariosCategoria(true);
        setCategoria(3);
    };

    const onExterior = () => {
        setnombreExterior("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(3);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -3,
            posicionProducto: -3,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproductoselect");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior(
            "cajaiconoinfomaterialcategorias apuntador iconocategoriaselect"
        );
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioSonido = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(4);
        setCategoriaSeleccionada(subCateGenericos[3].nombre);
    };

    const onSonido = () => {
        setnombreSonido("botoncategoriasgenerico colorseleccionboton");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(4);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -4,
            posicionProducto: -4,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproductoselect");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido(
            "cajaiconoinfomaterialcategorias apuntador iconocategoriaselect"
        );
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioIluminacion = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(5);
        setCategoriaSeleccionada(subCateGenericos[4].nombre);
    };

    const onIluminacion = () => {
        setnombreIluminacion("botoncategoriasgenerico colorseleccionboton");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(5);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -5,
            posicionProducto: -5,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproductoselect");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion(
            "cajaiconoinfomaterialcategorias apuntador  iconocategoriaselect"
        );
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioLubricantesFluidos = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(6);
        setCategoriaSeleccionada(subCateGenericos[5].nombre);
    };

    const onLubricantesFluidos = () => {
        setnombreLubricantes("botoncategoriasgenerico colorseleccionboton");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(6);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -6,
            posicionProducto: -6,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproductoselect");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes(
            "cajaiconoinfomaterialcategorias apuntador iconocategoriaselect"
        );
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioLlantasRines = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(7);
        setCategoriaSeleccionada(subCateGenericos[6].nombre);
    };

    const onLlantasRines = () => {
        setnombreLlantas("botoncategoriasgenerico colorseleccionboton");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(7);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -7,
            posicionProducto: -7,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproductoselect");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas(
            "cajaiconoinfomaterialcategorias apuntador  iconocategoriaselect"
        );
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioBaterias = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(8);
        setCategoriaSeleccionada(subCateGenericos[7].nombre);
    };

    const onBaterias = () => {
        setnombreBaterias("botoncategoriasgenerico colorseleccionboton");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(8);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -8,
            posicionProducto: -8,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproductoselect");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador ");
        setClassBaterias(
            "cajaiconoinfomaterialcategorias apuntador  iconocategoriaselect"
        );
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioPlumillas = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(9);
        setCategoriaSeleccionada(subCateGenericos[8].nombre);
    };

    const onPlumillas = () => {
        setnombrePlumillas("botoncategoriasgenerico colorseleccionboton");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(9);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -9,
            posicionProducto: -9,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproductoselect");
        setClassInfoKit("iconoinfomaterialproducto");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas(
            "cajaiconoinfomaterialcategorias apuntador   iconocategoriaselect"
        );
        setClassKit("cajaiconoinfomaterialcategorias apuntador");
    };

    const comentarioKitCarretera = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(10);
        setCategoriaSeleccionada(subCateGenericos[9].nombre);
    };

    const Out = () => {
        if (!categoria) {
            setnombreKit("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
        }
    };

    const onKitCarretera = () => {
        setnombreKit("botoncategoriasgenerico colorseleccionboton");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn redondearborde ml-2");

        setCategoria(10);
        let asignagenerico = [];
        let item = {
            ubicacionProducto: -10,
            posicionProducto: -10,
        };
        asignagenerico.push(item);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(asignagenerico)
        );

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproductoselect");

        setClassEstetico("cajaiconoinfomaterialcategorias apuntador");
        setClassExterior("cajaiconoinfomaterialcategorias apuntador");
        setClassInterior("cajaiconoinfomaterialcategorias apuntador");
        setClassSonido("cajaiconoinfomaterialcategorias apuntador");
        setClassIluminacion("cajaiconoinfomaterialcategorias apuntador");
        setClassLubricantes("cajaiconoinfomaterialcategorias apuntador");
        setClassLlantas("cajaiconoinfomaterialcategorias apuntador");
        setClassBaterias("cajaiconoinfomaterialcategorias apuntador");
        setClassPlumillas("cajaiconoinfomaterialcategorias apuntador");
        setClassKit(
            "cajaiconoinfomaterialcategorias apuntador iconocategoriaselect"
        );
    };

    const iramispublicaciones = () => {
        router.push("/publication");
    };

    const mostrarModalDatosProducto = () => {
        setShowDatosProductos(true);
        setAbrirCerrarCategoriasGenerico(!abrirCerrarCategoriasGenerico);
    };

    const mostrarModalDatosProductoEditar = () => {
        //setShowDatosProductos(!showDatosProductos);
        setAbrirCerrarCategoriasGenerico(!abrirCerrarCategoriasGenerico);
    };

    const onEsteticosOver = () => {
        if (!categoria) {
            setnombreEstetico("botoncategoriasgenerico colorseleccionboton");
            setnombreInterior("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onInteriorOver = () => {
        if (!categoria) {
            setnombreInterior("botoncategoriasgenerico colorseleccionboton");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onExteriorOver = () => {
        if (!categoria) {
            setnombreExterior("botoncategoriasgenerico colorseleccionboton");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onSonidoOver = () => {
        if (!categoria) {
            setnombreSonido("botoncategoriasgenerico   colorseleccionboton");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onIluminacionOver = () => {
        if (!categoria) {
            setnombreIluminacion(
                "botoncategoriasgenerico  colorseleccionboton"
            );
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onLubricantesFluidosOver = () => {
        if (!categoria) {
            setnombreLubricantes("botoncategoriasgenerico colorseleccionboton");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onLlantasRinesOver = () => {
        if (!categoria) {
            setnombreLlantas("botoncategoriasgenerico colorseleccionboton");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onBateriasOver = () => {
        if (!categoria) {
            setnombreBaterias("botoncategoriasgenerico colorseleccionboton");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onPlumillasOver = () => {
        if (!categoria) {
            setnombrePlumillas("botoncategoriasgenerico colorseleccionboton");
            setnombreBaterias("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onKitCarreteraOver = () => {
        if (!categoria) {
            setnombreKit("botoncategoriasgenerico colorseleccionboton");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
        }
    };

    return (
        <div id="categorias">
            {abrirCerrarCategoriasGenerico ? (
                <div>
                    <h3 className="ml-15 tituloadvertenciaproductos">
                        Escoge la categoría
                    </h3>

                    <div className="ml-19 mt-4">
                        <Row>
                            <Col xl={12} lg={12} md={12} xs={12}>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreEstetico}
                                            onClick={() => onEsteticos()}
                                            onMouseOver={onEsteticosOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[0].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classEstetico}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={comentarioEsteticos}>
                                                {!modalEsteticos ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoEstetico
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreInterior}
                                            onClick={onInterior}
                                            onMouseOver={onInteriorOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[1].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classInterior}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={comentarioInterior}>
                                                {!modalInterior ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoInterior
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreExterior}
                                            onClick={onExterior}
                                            onMouseOver={onExteriorOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[2].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classExterior}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={comentarioExterior}>
                                                {!modalExterior ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoExterior
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreSonido}
                                            onClick={onSonido}
                                            onMouseOver={onSonidoOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[3].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classSonido}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={comentarioSonido}>
                                                {!modalSonido ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoSonido
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreLubricantes}
                                            onClick={onLubricantesFluidos}
                                            onMouseOver={
                                                onLubricantesFluidosOver
                                            }
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[5].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classLubricantes}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={
                                                    comentarioLubricantesFluidos
                                                }>
                                                {!modalLubricantesFluidos ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoLubricantes
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreLlantas}
                                            onClick={onLlantasRines}
                                            onMouseOver={onLlantasRinesOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[6].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classLlantas}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={
                                                    comentarioLlantasRines
                                                }>
                                                {!modalLlantasRines ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoLlantas
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreBaterias}
                                            onClick={onBaterias}
                                            onMouseOver={onBateriasOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[7].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classBaterias}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={comentarioBaterias}>
                                                {!modalBaterias ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoBaterias
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombrePlumillas}
                                            onClick={onPlumillas}
                                            onMouseOver={onPlumillasOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[8].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classPlumillas}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={comentarioPlumillas}>
                                                {!modalPlumillas ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoPlumillas
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreKit}
                                            onClick={onKitCarretera}
                                            onMouseOver={onKitCarreteraOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[9].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classKit}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={
                                                    comentarioKitCarretera
                                                }>
                                                {!modalKitCarretera ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={classInfoKit}
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreIluminacion}
                                            onClick={onIluminacion}
                                            onMouseOver={onIluminacionOver}
                                            onMouseOut={Out}>
                                            {listaSubCateGen && listaSubCateGen[4].nombre}
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div className={classIluminacion}>
                                            <div
                                                className="fondodivinfomaterial"
                                                onClick={comentarioIluminacion}>
                                                {!modalIluminacion ? (
                                                    <InfoIcon
                                                        style={{ fontSize: 30 }}
                                                        className={
                                                            classInfoIluminacion
                                                        }
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="mt-20">
                        <Row>
                            <Col
                                xl={5}
                                lg={5}
                                md={5}
                                xs={5}
                                className=" mr-28"></Col>
                            <Col
                                xl={3}
                                lg={3}
                                md={3}
                                xs={3}
                                className="ml-30 mr-20">
                                {/*
<Button
                                    variant="outline-light"
                                    className="ps-btn  redondearborde baseinputdos colortextoselect"
                                    disabled={habilitaSiguiente}
                                    onClick={() => iramispublicaciones()}>
                                    {" "}
                                    Ir a mis publicaciones
                                </Button>
                                        */}
                            </Col>
                            <Col xl={2} lg={2} md={2} xs={2}>
                                <Button
                                    variant="outline-light"
                                    className={classHabilitaSiguiente}
                                    disabled={habilitaSiguiente}
                                    onClick={() => mostrarModalDatosProducto()}>
                                    {" "}
                                    Siguiente
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="ml-10">
                        <h3 className="ml-2 tituloadvertenciaproductosizquierda">
                            Categoría seleccionada
                        </h3>
                    </div>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div
                                className="ml-15 mt-1 datoscerradosgenericos"
                                disabled={true}>
                                <h3 className="textoubicacionproducto">
                                    {categoriaSeleccionada}
                                </h3>
                            </div>
                        </Col>
                        <Col
                            xl={1}
                            lg={1}
                            md={1}
                            xs={1}
                            className="ml-195 mtmenos2 apuntador">
                            <div className="showcerrarabrir">
                                <i
                                    className="mt-2 fa fa-angle-down d-flex justify-content-center colorbase"
                                    onClick={() =>
                                        mostrarModalDatosProductoEditar()
                                    }
                                    aria-hidden="true"
                                    ref={targetshow}
                                    onMouseOver={() => setShowEdit(true)}
                                    onMouseOut={() => setShowEdit(false)}></i>
                            </div>

                            <Overlay
                                className=""
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
            )}

            <div className="App">
                <ModalComentariosCategorias
                    shown={showModalComentariosCategoria}
                    close={() => {
                        setShowModalComentariosCategoria(false);
                    }}
                    categoria={categoria}
                    listaCategoriasGen={listaCategoriasGen}
                />
            </div>
        </div>
    );
}

export default CategoriasProductosGenericos;
