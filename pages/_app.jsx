import React, { useEffect, useState } from "react";
import { wrapper } from "../store/store";
import MasterLayout from "~/components/layouts/MasterLayout";
import { CookiesProvider } from "react-cookie";
import { SSRProvider } from "@react-aria/ssr";
import "swiper/swiper-bundle.min.css";
import "antd/dist/antd.compact.min.css";
import "~/public/static/css/bootstrap.min.css";
import "~/public/static/fonts/feather-font/css/iconfont.css";
import "~/public/static/fonts/Linearicons/Font/demo-files/demo.css";
import "~/public/static/fonts/font-awesome/css/font-awesome.min.css";
import "~/public/static/css/style.min.css";
import "~/public/static/css/slick.min.css";
import "~/styles/scss/home-1.scss";
import "~/styles/platform/custom.scss";
import "~/styles/platform/themes/home-one.scss";
import Users from "~/repositories/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "../store/userlogged/action";
import { getEditDataFind } from "../store/editdatafind/action";
import { getSelectViewProduct } from "../store/selectviewproduct/action";
import { getDuplicarPrd } from "../store/duplicarprd/action";
import Home from "~/pages/Home/Home";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { getTypesIdentifications } from "../store/typesidentifications/action";
import TypesIdentificationsRepository from "~/repositories/TypesIdentificationsRepository";
import { getDatosGenerales } from "../store/datosgenerales/action";
import DataGeneralRepository from "~/repositories/ReadDatosGenerales";
import { getDataWishList } from "../store/datawishlist/action";
import { getDataFindProducts } from "../store/datafindproducts/action";
import { getFiltroPrd } from "../store/filtroprd/action";
import { getCtlrInput } from "~/store/ctlrinput/action";
import { getRefreshPage } from "../store/refreshpage/action";
import { getFiltroCondicionPrd } from "../store/filtrocondicionprd/action";
import DataFindProducts from "~/repositories/DataFindProducts";
import { URL_BD_MR } from "../helpers/Constants";
import { getWordBase } from "../store/wordbase/action";
import GetWordBase from "~/repositories/getWordBase";
import ModalDenegarAcceso from "./mensajes/ModalDenegarAcceso";
import { getControlAcceso } from "../store/controlacceso/action";
import ModalMensajes from "./mensajes/ModalMensajes";

//Firebase
import firebase from "../utilities/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import MyGarage from "~/components/shared/MyGarage/MyGarage";
import axios from "axios";

function App({ Component, pageProps }) {
    const router = useRouter();
    const [selectedForm, setSelectedForm] = useState(null);
    const [user, setUser] = useState(false);
    const [controlHome, setControlHome] = useState("");
    // Arreglo tipos de Marcas de Vehiculos
    const [usuari, setUsuario] = useState([]);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState(defaultValueForm());
    const [showModal, setShowModal] = useState(false);
    const [codigoToken, setCodigoToken] = useState("");
    const [actualizaVistaProducto, setActualizaVistaProducto] = useState(false);
    const [datosConectores, setDatosConectores] = useState([]);

    const [showModalDenegarAcceso, setShowModalDenegarAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [showModalMensaje, setShowModalMensaje] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [ctlRedirigir, setctlRedirigir] = useState(null);

    // Inicializamos el arrego para validar si el usuario esta logueado
    const userlogged = useSelector((state) => state.userlogged.userlogged);
    // Disparar procedimiento que lee Informacion del Usuario
    const refreshpage = useSelector((state) => state.refreshpage.refreshpage);
    const controlacceso = useSelector(
        (state) => state.controlacceso.controlacceso
    );

    //lee datos enviados por parametros al redirigir

    let ctlredirigir = null;

    useEffect(() => {
        if (typeof window !== "undefined") {
            //if (router.query.iduser) {
            const url = window.location.search;
            const urlParametro = new URLSearchParams(url);
            const parametro = urlParametro.get("ctlredirigir");
            const uidusuario = urlParametro.get("uidusuario");

            const nomenclatura = document.getElementById("parametro");
            //localStorage.setItem("idusuario", parametro);
            setctlRedirigir(parametro);
            ctlredirigir = parametro;

            if (ctlredirigir == "0246810") {
                localStorage.setItem("uidusuario", JSON.stringify(uidusuario));
                localStorage.setItem("ctlredirigir", JSON.stringify(ctlredirigir));
            }
        }
    }, []);

    // Lee de la base de datos los tipos de Identificación

    useEffect(() => {
        if (navigator.geolocation) {
            /*
            navigator.geolocation.getCurrentPosition(function(position) {    
                $scope.createMarker(map);
                $scope.posicion_actual = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
            }
            */
            /*
            var geocoding =
                "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                6.1561 +
                "," +
                -75.6208 +
                "&sensor=false";
            console.log("DATOS XX : ", geocoding);
*/
            /*
            getJSON(geocoding).done(function (location) {
                console.log(location.results[0].formatted_address);
                $scope.search_entidad = location.results[0].formatted_address;
                $scope.$digest();
            });
            */
        }

        if (navigator.geolocation) {
            let posicion =
                navigator.geolocation.getCurrentPosition(showPosition);
            //console.log("POSICTIO : ", posicion);
            //"http://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&sensor=false", function(data) {
            //console.log(data);
        }

        function showPosition(position) {
            console.log("Latitude: " + position.coords.latitude);
            console.log("Longitude: " + position.coords.longitude);
            //const google = window.google;
            //var miDireccion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        }
        let item = {
            login: true,
        };

        localStorage.setItem("redirect", JSON.stringify(0));
        localStorage.setItem("ctlrnotificacion", JSON.stringify(0));
        localStorage.setItem("crearusuario", JSON.stringify(false));
        localStorage.setItem("loginvender", JSON.stringify(item));
        localStorage.setItem("orderbyprd", JSON.stringify(0));
        localStorage.setItem("textoorderbyprd", JSON.stringify("Ordenar por"));
        localStorage.setItem("ctrlposicionprd", JSON.stringify(0));
        localStorage.setItem("posicionprd", JSON.stringify(0));
        localStorage.setItem("rangoprecios", JSON.stringify([]));
        localStorage.removeItem("dataWords");
        localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        localStorage.setItem("filtrociudadprd", JSON.stringify([]));
        localStorage.setItem("filtroprecioprd", JSON.stringify([]));
        localStorage.setItem("idvehgarage", JSON.stringify(-1));
        localStorage.setItem("selectvehgarage", JSON.stringify(null));
        let inicia = null;
        localStorage.setItem("placeholdersearch", JSON.stringify(inicia));
        localStorage.setItem("vehproductos", JSON.stringify([]));
        localStorage.setItem("duplicarprd", JSON.stringify([]));

        let activacompra = JSON.parse(localStorage.getItem("activacompra"));

        if (activacompra) {
            setShowModalDenegarAcceso(true);
            setTituloControlAcceso("Compras MR");
            setTextoControlAcceso(
                "Proceso de compra se completo de manera correcta!"
            );
            localStorage.setItem("activacompra", JSON.stringify(false));
        }

        async function typesidentifications(dat) {
            let editar = {
                editarCombustible: false,
                editarTraccion: false,
                editarTransmision: false,
                editarCilindraje: false,
            };
            dispatch(getEditDataFind(editar));
            //localStorage.setItem("editardatosbuscador", JSON.stringify(editar));
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesIdentifications =
                await TypesIdentificationsRepository.getTypesIdentifications(0);
            //console.log("TYPES IDENTIFICATIONS : ", TypesIdentifications);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesIdentifications(TypesIdentifications));
        }
        typesidentifications(0);
        const leeconectores = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "38",
            })
                .then((res) => {
                    //console.log("CONECTORES : ", res.data.listarconectores);
                    let datconectar = res.data.listarconectores;
                    //setDatosConectores(res.data.listarconectores);
                    localStorage.setItem(
                        "dataconectores",
                        JSON.stringify(datconectar)
                    );
                })
                .catch(function (error) { });
        };
        leeconectores();

        const palabras = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "37",
            })
                .then((res) => {
                    let datwords = res.data.listarpalabras;
                    localStorage.setItem("datawords", JSON.stringify(datwords));
                })
                .catch(function (error) { });
        };
        palabras();

        //lee productos genericos
        const leeGenericos = async () => {

            await axios({
                method: "post",
                url: URL_BD_MR + "42",
            }).then((res) => {
                let datagenericos = res.data;

                localStorage.setItem(
                    "datagenericos",
                    JSON.stringify(datagenericos)
                );
                console.log("DAT GENERICOS : ", res.data);
            });
        };
        leeGenericos();

        //lee productos genericos
        const leeSubCateGenericos = async () => {

            await axios({
                method: "post",
                url: URL_BD_MR + "216",
            }).then((res) => {
                let listasubcategenericos = res.data.listsubcategorias;

                localStorage.setItem(
                    "subcategenericos",
                    JSON.stringify(listasubcategenericos)
                );
                //console.log("DAT GENERICOS : ", res.data);
            });
        };
        leeSubCateGenericos();

        /* Lee las categorías recomendadas para asignar al local storage */
        const categRecomendadas = async () => {
            let params = {
                recomendadas: 1
            }
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "215", params
                });
                //console.log("RESP REC : ", res.data)
                let listasubcategenericos = res.data.listsubcategorias;
                //setImagenes(res.data.listsubcategorias);

                localStorage.setItem(
                    "subcategrecomendadas",
                    JSON.stringify(listasubcategenericos)
                );
            } catch (error) {
                console.error("Error Subcategorias recomendadas", error);
                // Maneja el error según tus necesidades
            }
        };
        categRecomendadas();

    }, []);

    // Lee Datos generales del sistema MR
    useEffect(() => {
        async function datageneral(dat) {
            // Lee la función creada en repositories - DatosGenerales
            const DataGeneral = await DataGeneralRepository.getReadDataGeneral(
                0
            );
            //console.log("DATA GENRAL : ", DataGeneral);

            // Coloca los datos en state arreglo de categorias
            dispatch(getFiltroPrd(0));
            dispatch(getCtlrInput(false));
            dispatch(getFiltroCondicionPrd(0));
            dispatch(getDatosGenerales(DataGeneral));
            dispatch(getDuplicarPrd(0));
            localStorage.setItem(
                "categorias",
                JSON.stringify(DataGeneral?.vgl_categorias)
            );
            localStorage.setItem(
                "subcategorias",
                JSON.stringify(DataGeneral?.vgl_subcategorias)
            );
            localStorage.setItem(
                "datostiposvehiculos",
                JSON.stringify(DataGeneral?.vgl_tiposvehiculos)
            );
            localStorage.setItem(
                "datosmarcasvehiculos",
                JSON.stringify(DataGeneral?.vgl_marcasvehiculos)
            );
            localStorage.setItem(
                "datoscarroceriasvehiculos",
                JSON.stringify(DataGeneral?.vgl_carroceriasvehiculos)
            );
            localStorage.setItem(
                "datosannosvehiculos",
                JSON.stringify(DataGeneral?.vgl_annosvehiculos)
            );

            localStorage.setItem("editdata", JSON.stringify(false));
            localStorage.setItem("editVehHistory", JSON.stringify(false));
        }
        datageneral(0);
    }, []);

    useEffect(() => {
        const obtenerMensajeBienvenida = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "132",
                });
                // console.log(res.data);
                if (res.data.listmensaje.length > 0) {
                    localStorage.setItem(
                        "mensajesbienvenida",
                        JSON.stringify(res.data.listmensaje)
                    );
                }
            } catch (error) {
                console.error("Error al leer los datos", error);
            }
        };
        obtenerMensajeBienvenida();
    }, []);

    // Lee de la base de datos buscador especial
    useEffect(() => {
        async function dataproducts(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository

            const datosproductos = await DataFindProducts.getDataFindProducts(
                dat
            );
            //console.log("LEE OBJETO PRODUCTOS: ", datosproductos);
            // Coloca los datos en state arreglo de categorias
            dispatch(getDataFindProducts(datosproductos[0]));
        }
        //dataproducts(0);
        async function datawordbase(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository

            const datosbasepalabras = await GetWordBase.getWordBase(dat);
            //console.log("WORD BASE: ", datosbasepalabras);
            // Coloca los datos en state arreglo de categorias
            dispatch(getWordBase(datosbasepalabras));
        }
        datawordbase(0);
    }, []);

    // Lee de la base de datos los datos de las paginas para navegar desde el menu inicial
    useEffect(() => {
       
        if (!ctlredirigir) {

            localStorage.setItem("direccionenvio", JSON.stringify([]));
            dispatch(getDuplicarPrd(0));
            var caracteres = "012346789";
            var name = "";
            for (var i = 0; i < 4; i++)
                name += caracteres.charAt(
                    Math.floor(Math.random() * caracteres.length)
                );
            //console.log("CODIGO ALEATORIO : ", name);

            async function usuariologueado(dat) {
                //Valida si el Usuario esta logueado en Mercado Repuesto
                const auth = getAuth(firebase);
                //console.log("USUARIO LOGUEADO : ", auth.currentUser);
               
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        console.log("USUARIO LOGUEADO : ", user);
                        const uid = user.uid;

                        setSelectedForm("login");
                        setUser(true);
                        const leer = async () => {
                            const dat = {
                                usuario: user.metadata.createdAt,
                            };

                            const DatosUsuario = await Users.getUsers(dat);

                            if (DatosUsuario.length > 0) {
                                if (
                                    DatosUsuario[0].activo === 31 ||
                                    DatosUsuario[0].activo === 30 ||
                                    DatosUsuario[0].activo === 35
                                ) {
                                    if (user.metadata.createdAt) {
                                        //console.log("ID USER : ",user.metadata.createdAt)
                                        const leerItems = async () => {
                                            let params = {
                                                usuario: user.metadata.createdAt,
                                            };

                                            await axios({
                                                method: "post",
                                                url: URL_BD_MR + "54",
                                                params,
                                            })
                                                .then((res) => {
                                                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                                    dispatch(
                                                        getDataWishList(
                                                            res.data
                                                                .listaritemdeseos
                                                                .length
                                                        )
                                                    );
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error leyendo preguntas al vendedor"
                                                    );
                                                });
                                        };
                                        leerItems();
                                    }

                                    setCodigoToken(DatosUsuario[0].token);
                                    if (DatosUsuario.length > 0) {
                                        if (DatosUsuario[0].activo === 350) {
                                            setSelectedForm(null);
                                        } else {
                                            setUsuario(DatosUsuario[0]);

                                            const Usuario = {
                                                uid: user.metadata.createdAt,
                                                logged: true,
                                                name: DatosUsuario[0].primernombre,
                                                usuario: DatosUsuario[0].usuario,
                                                lastname:
                                                    DatosUsuario[0].primerapellido,
                                                idinterno: DatosUsuario[0].id,
                                                tipousuario:
                                                    DatosUsuario[0].tipousuario,
                                                activo: DatosUsuario[0].activo,
                                                tipoidentificacion:
                                                    DatosUsuario[0]
                                                        .tipoidentificacion,
                                                identificacion:
                                                    DatosUsuario[0].identificacion,
                                                razonsocial:
                                                    DatosUsuario[0].razonsocial,
                                                email: DatosUsuario[0].email,
                                                celular: DatosUsuario[0].celular,
                                                fechatoken:
                                                    DatosUsuario[0].fechatoken,
                                            };
                                            //console.log("USUARIO LOGUEADO : ",Usuario);
                                            localStorage.setItem(
                                                "datauser",
                                                JSON.stringify(Usuario)
                                            );
                                            dispatch(getUserLogged(Usuario));
                                            router.push("/");
                                        }
                                    } else {

                                        const Usuario = {
                                            uid: user.metadata.createdAt,
                                            logged: true,
                                            name: user.displayName,
                                            usuario: DatosUsuario[0].usuario,
                                            lastname:
                                                DatosUsuario[0].primerapellido,
                                            idinterno: DatosUsuario[0].id,
                                            tipousuario:
                                                DatosUsuario[0].tipousuario,
                                            activo: DatosUsuario[0].activo,
                                            tipoidentificacion:
                                                DatosUsuario[0].tipoidentificacion,
                                            identificacion:
                                                DatosUsuario[0].identificacion,
                                            razonsocial:
                                                DatosUsuario[0].razonsocial,
                                            token: DatosUsuario[0].token,
                                            email: DatosUsuario[0].email,
                                            celular: DatosUsuario[0].celular,
                                            fechatoken: DatosUsuario[0].fechatoken,
                                        };
                                        dispatch(getUserLogged(Usuario));
                                        localStorage.setItem(
                                            "datauser",
                                            JSON.stringify(null)
                                        );
                                        localStorage.setItem(
                                            "dataUser",
                                            JSON.stringify(null)
                                        );
                                    }
                                } else {
                                    // Asignamos Datos al arreglo de Usuarios desde la base de datos
                                    const ActualizaDatosUsuario =
                                        await Users.getUsers(dat);

                                    //ActualizaDatosUsuario[0].activo === 35 ||
                                    if (
                                        ActualizaDatosUsuario[0].activo === 31 ||
                                        ActualizaDatosUsuario[0].activo === 30 ||
                                        ActualizaDatosUsuario[0].activo === 35
                                    ) {
                                        setCodigoToken(DatosUsuario[0].token);

                                        const Usuario = {
                                            uid: user.metadata.createdAt,
                                            logged: false,
                                            name: "",
                                            usuario: DatosUsuario[0].usuario,
                                            lastname:
                                                DatosUsuario[0].primerapellido,
                                            idinterno: 0,
                                            tipousuario:
                                                DatosUsuario[0].tipousuario,
                                            activo: DatosUsuario[0].activo,
                                            tipoidentificacion:
                                                DatosUsuario[0].tipoidentificacion,
                                            identificacion:
                                                DatosUsuario[0].identificacion,
                                            razonsocial:
                                                DatosUsuario[0].razonsocial,
                                            token: DatosUsuario[0].token,
                                            email: DatosUsuario[0].email,
                                            celular: DatosUsuario[0].celular,
                                            fechatoken: DatosUsuario[0].fechatoken,
                                        };
                                        dispatch(getUserLogged(Usuario));
                                    }
                                }
                            }

                            let dispositivo = null;

                            const handleDeviceDetection = () => {
                                const userAgent = navigator.userAgent.toLowerCase();
                                let array = userAgent.split(" ");
                                //console.log("XXXXXXX : ",array[0]+" "+array[1]+" " +array[2] +" "+array[3]+" "+array[4]+" "+array[5]);
                                let tipodispo = array[0] + " " + array[1] + " " + array[2] + " " + array[3] + " " + array[4] + " " + array[5];

                                localStorage.setItem("dispositivo", JSON.stringify(tipodispo));

                                const isMobile =
                                    /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
                                        userAgent
                                    );
                                const isTablet =
                                    /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
                                        userAgent
                                    );

                                let idDispositivo;
                                if (isMobile) {
                                    idDispositivo =
                                        "Mobile" +
                                        " " +
                                        array[1] +
                                        " " +
                                        array[2] +
                                        array[3] +
                                        array[4] +
                                        array[5];
                                } else if (isTablet) {
                                    idDispositivo =
                                        "Tablet" +
                                        " " +
                                        array[1] +
                                        " " +
                                        array[2] +
                                        array[3] +
                                        array[4] +
                                        array[5];
                                } else {
                                    idDispositivo =
                                        "Desktop" +
                                        " " +
                                        array[1] +
                                        " " +
                                        array[2] +
                                        array[3] +
                                        array[4] +
                                        array[5];
                                }

                                // Almacena el id del dispositivo en el estado
                                //setIdDispositivoActual(idDispositivo);

                                // Imprime el id del dispositivo actual en la consola
                                //console.log("Dispositivo actual:", idDispositivo);
                                //console.log("USER:", user.metadata.createdAt);
                                dispositivo = idDispositivo;

                                const saveLinkedDevices = async () => {
                                    let params = {
                                        iddispositivo: dispositivo,
                                        localizacion: "",
                                        usuario: user.metadata.createdAt,
                                    };

                                    await axios({
                                        method: "post",
                                        url: URL_BD_MR + "92",
                                        params,
                                    })
                                        .then((res) => {
                                            if (res.data.type == 1) {
                                                console.log(
                                                    "ADD DISPOSITIVO : ",
                                                    res
                                                );

                                                const saveHistorial = async () => {
                                                    await axios({
                                                        method: "post",
                                                        url: URL_BD_MR + "921",
                                                        params,
                                                    })
                                                        .then((res) => {
                                                            if (
                                                                res.data.type == 1
                                                            ) {
                                                                console.log(
                                                                    "ADD HISTORY DISPOSITIVO : ",
                                                                    res
                                                                );
                                                            } else {
                                                                console.log(
                                                                    "ERROR HISTORY DISPOSITIVO : ",
                                                                    res
                                                                );
                                                            }
                                                        })
                                                        .catch(function (error) { });
                                                };
                                                saveHistorial();
                                            } else {
                                                console.log(
                                                    "ERR DISPOSITIVO : ",
                                                    res
                                                );
                                            }
                                        })
                                        .catch(function (error) { });
                                };

                                if (dispositivo) saveLinkedDevices();
                            };

                            handleDeviceDetection();

                        };
                        leer();
                        // Coloca los datos en state arreglo de categorias

                        //Lee direccion usuario
                        const direccionUsuario = async () => {
                            let params = {
                                usuario: user.metadata.createdAt,
                            };

                            await axios({
                                method: "post",
                                url: URL_BD_MR + "65",
                                params,
                            })
                                .then((res) => {
                                    if (
                                        res.data.listardireccionesusuario.length > 0
                                    ) {
                                        localStorage.setItem(
                                            "direccionenvio",
                                            JSON.stringify(
                                                res.data.listardireccionesusuario[0]
                                            )
                                        );
                                    } else {
                                        localStorage.setItem(
                                            "direccionenvio",
                                            JSON.stringify([])
                                        );
                                    }
                                })
                                .catch(function (error) {
                                    console.log("Error leyendo direcciones");
                                });
                        };
                        direccionUsuario();
                    } else {
                        console.log("USUARIO NO ESTA LOGUEADO");
                        setSelectedForm(null);
                        const Usuario = {
                            uid: 0,
                            logged: false,
                            name: "",
                            usuario: "",
                            idinterno: 0,
                            activo: "",
                            tipoidentificacion: 0,
                            identificacion: 0,
                            razonsocial: "",
                            token: 0,
                            email: 0,
                            celular: 0,
                            fechatoken: "",
                        };
                        dispatch(getUserLogged(Usuario));
                        localStorage.setItem(
                            "datauser",
                            JSON.stringify(null)
                        );
                        localStorage.setItem(
                            "dataUser",
                            JSON.stringify(null)
                        );
                    }
                });
            }
            usuariologueado(0);
        }else{
            localStorage.setItem("direccionenvio", JSON.stringify([]));
            dispatch(getDuplicarPrd(0));
            
            async function usuariologueado(dat) {
                //Valida si el Usuario esta logueado en Mercado Repuesto
                const auth = getAuth(firebase);
                //console.log("USUARIO LOGUEADO : ", auth.currentUser);
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        console.log("USUARIO LOGUEADO : ", user);
                        const uid = user.uid;

                        setSelectedForm("login");
                        setUser(true);
                        const leer = async () => {
                            const dat = {
                                usuario: user.metadata.createdAt,
                            };

                            const DatosUsuario = await Users.getUsers(dat);

                            if (DatosUsuario.length > 0) {
                                if (
                                    DatosUsuario[0].activo === 31 ||
                                    DatosUsuario[0].activo === 30 ||
                                    DatosUsuario[0].activo === 35
                                ) {
                                    if (user.metadata.createdAt) {
                                        //console.log("ID USER : ",user.metadata.createdAt)
                                        const leerItems = async () => {
                                            let params = {
                                                usuario: user.metadata.createdAt,
                                            };

                                            await axios({
                                                method: "post",
                                                url: URL_BD_MR + "54",
                                                params,
                                            })
                                                .then((res) => {
                                                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                                    dispatch(
                                                        getDataWishList(
                                                            res.data
                                                                .listaritemdeseos
                                                                .length
                                                        )
                                                    );
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error leyendo preguntas al vendedor"
                                                    );
                                                });
                                        };
                                        leerItems();
                                    }

                                    setCodigoToken(DatosUsuario[0].token);
                                    if (DatosUsuario.length > 0) {
                                        if (DatosUsuario[0].activo === 350) {
                                            setSelectedForm(null);
                                        } else {
                                            setUsuario(DatosUsuario[0]);

                                            const Usuario = {
                                                uid: user.metadata.createdAt,
                                                logged: true,
                                                name: DatosUsuario[0].primernombre,
                                                usuario: DatosUsuario[0].usuario,
                                                lastname:
                                                    DatosUsuario[0].primerapellido,
                                                idinterno: DatosUsuario[0].id,
                                                tipousuario:
                                                    DatosUsuario[0].tipousuario,
                                                activo: DatosUsuario[0].activo,
                                                tipoidentificacion:
                                                    DatosUsuario[0]
                                                        .tipoidentificacion,
                                                identificacion:
                                                    DatosUsuario[0].identificacion,
                                                razonsocial:
                                                    DatosUsuario[0].razonsocial,
                                                email: DatosUsuario[0].email,
                                                celular: DatosUsuario[0].celular,
                                                fechatoken:
                                                    DatosUsuario[0].fechatoken,
                                            };
                                            //console.log("USUARIO LOGUEADO : ",Usuario);
                                            localStorage.setItem(
                                                "datauser",
                                                JSON.stringify(Usuario)
                                            );
                                            dispatch(getUserLogged(Usuario));
                                            //router.push("/");
                                        }
                                    } else {

                                        const Usuario = {
                                            uid: user.metadata.createdAt,
                                            logged: true,
                                            name: user.displayName,
                                            usuario: DatosUsuario[0].usuario,
                                            lastname:
                                                DatosUsuario[0].primerapellido,
                                            idinterno: DatosUsuario[0].id,
                                            tipousuario:
                                                DatosUsuario[0].tipousuario,
                                            activo: DatosUsuario[0].activo,
                                            tipoidentificacion:
                                                DatosUsuario[0].tipoidentificacion,
                                            identificacion:
                                                DatosUsuario[0].identificacion,
                                            razonsocial:
                                                DatosUsuario[0].razonsocial,
                                            token: DatosUsuario[0].token,
                                            email: DatosUsuario[0].email,
                                            celular: DatosUsuario[0].celular,
                                            fechatoken: DatosUsuario[0].fechatoken,
                                        };
                                        dispatch(getUserLogged(Usuario));
                                        localStorage.setItem(
                                            "datauser",
                                            JSON.stringify(null)
                                        );
                                        localStorage.setItem(
                                            "dataUser",
                                            JSON.stringify(null)
                                        );
                                    }
                                } else {
                                    // Asignamos Datos al arreglo de Usuarios desde la base de datos
                                    const ActualizaDatosUsuario =
                                        await Users.getUsers(dat);

                                    //ActualizaDatosUsuario[0].activo === 35 ||
                                    if (
                                        ActualizaDatosUsuario[0].activo === 31 ||
                                        ActualizaDatosUsuario[0].activo === 30 ||
                                        ActualizaDatosUsuario[0].activo === 35
                                    ) {
                                        setCodigoToken(DatosUsuario[0].token);

                                        const Usuario = {
                                            uid: user.metadata.createdAt,
                                            logged: false,
                                            name: "",
                                            usuario: DatosUsuario[0].usuario,
                                            lastname:
                                                DatosUsuario[0].primerapellido,
                                            idinterno: 0,
                                            tipousuario:
                                                DatosUsuario[0].tipousuario,
                                            activo: DatosUsuario[0].activo,
                                            tipoidentificacion:
                                                DatosUsuario[0].tipoidentificacion,
                                            identificacion:
                                                DatosUsuario[0].identificacion,
                                            razonsocial:
                                                DatosUsuario[0].razonsocial,
                                            token: DatosUsuario[0].token,
                                            email: DatosUsuario[0].email,
                                            celular: DatosUsuario[0].celular,
                                            fechatoken: DatosUsuario[0].fechatoken,
                                        };
                                        dispatch(getUserLogged(Usuario));
                                    }
                                }
                            }

                            let dispositivo = null;

                            

                        };
                        leer();
                        // Coloca los datos en state arreglo de categorias

                        //Lee direccion usuario
                        
                    } else {
                        console.log("USUARIO NO ESTA LOGUEADO");
                        setSelectedForm(null);
                        const Usuario = {
                            uid: 0,
                            logged: false,
                            name: "",
                            usuario: "",
                            idinterno: 0,
                            activo: "",
                            tipoidentificacion: 0,
                            identificacion: 0,
                            razonsocial: "",
                            token: 0,
                            email: 0,
                            celular: 0,
                            fechatoken: "",
                        };
                        dispatch(getUserLogged(Usuario));
                        localStorage.setItem(
                            "datauser",
                            JSON.stringify(null)
                        );
                        localStorage.setItem(
                            "dataUser",
                            JSON.stringify(null)
                        );
                    }
                });
            }
            usuariologueado(0);
        }
    }, [controlacceso]);

    useEffect(() => {
        setTimeout(function () {
            document.getElementById("__next").classList.add("ps-loaded");
        }, 100);
    });

    const handlerForm = () => {
        if (router.asPath === "/") {
            switch (selectedForm) {
                case "login":
                    return <Component {...pageProps} />;
                default:
                    return <Home setSelectedForm={setSelectedForm} />;
            }
        } else {
            switch (selectedForm) {
                default:
                    return <Component {...pageProps} />;
            }
        }
    };
    //return <Component {...pageProps} />;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validarToken = () => {
        console.log("VALIDAR TOKEN : ", formData.token);
        console.log("CODIGO TOKEN : ", codigoToken);
    };

    return (
        <SSRProvider>
            <CookiesProvider>
                <MasterLayout>{handlerForm()}</MasterLayout>
            </CookiesProvider>
            <ModalDenegarAcceso
                shown={showModalDenegarAcceso}
                close={setShowModalDenegarAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />

            <ModalMensajes
                shown={showModalMensaje}
                close={setShowModalMensaje}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="error"
            />

            <Modal dialogClassName="modaltoken" show={showModal}>
                <Modal.Header closeButton>
                    <h2>ACTIVAR CUENTA</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <form onChange={onChange}>
                        <div className="ps-form__group">
                            <label className="ps-form__label">
                                Ingresar Codigo :
                            </label>
                            <input
                                className="form-control ps-form__input"
                                name="token"
                                type="text"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">

                    <Row>
                        <Col xs lg={6}>
                            <div
                                className="ps-btn ps-btn--warning"
                                onClick={validarToken}>
                                Activar Cuenta
                            </div>
                        </Col>
                        <Col xs lg={2}>
                            <Button
                                className="ps-btn ps-btn--warning"
                                onClick={() => setShowModal(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </SSRProvider>
    );
}

function defaultValueForm() {
    return {
        token: "",
    };
}

// <Component {...pageProps} />
export default wrapper.withRedux(App);
