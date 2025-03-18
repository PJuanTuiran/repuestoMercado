import React, { useEffect, useState, useRef } from "react";
import ContainerResult from "~/components/layouts/ContainerResult";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ShopSearch from "~/components/partials/shop/ShopSearch";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupInteractive from "~/hooks/useProductGroupInteractive";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";
import useProductGroup from "~/hooks/useProductGroup";
import { useRouter } from "next/router";
import ModuleShopResults from "~/components/partials/shop/modules/ModuleShopResults";
import CustomPagination from "~/components/elements/basic/CustomPagination";
import SidebarShopResults from "~/components/shared/sidebar/SidebarShopResults";
import axios from "axios";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ViewAddShoppingCart from "../shop/viewaddshoppingcart";
import AddShoppingCart from "../shop/addshoppingcart";
import { getAddEdToCart } from "../../store/addedtocart/action";
import { getDataShoppingCart } from "../../store/datashoppingcart/action";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getOpenCloseCity } from "../../store/openclosecity/action";
import { getNumberPrdSelect } from "../../store/numberprdselect/action";
import { getFiltroPrd } from "../../store/filtroprd/action";
import { getFiltroCondicionPrd } from "../../store/filtrocondicionprd/action";
import { getRangosPrecio } from "../../store/rangosprecio/action";
import PromotionSecureInformation from "../../components/shared/sections/PromotionInformationSearch";
import FooterDefault from "../../components/shared/footers/FooterDefault";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

import ModalMensajesWishListSearch from "../../pages/mensajes/ModalMensajesWishListSearch";

//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { AirlineSeatReclineExtra } from "@material-ui/icons";
import { getUserMenu } from "../../store/usermenu/action";

let dataPrd = [];

const breadcrumb = [
    {
        id: 1,
        text: "Inicio",
        url: "/",
    },
    {
        id: 2,
        text: "Tienda",
        url: "/shop",
    },
    {
        id: 3,
        text: "Resultado de la búsqueda",
    },
];

let arraypag = [];
let longitud = 0;
let itemciud = [];
let allprdciud = [];
let nombreres = null;
let basePrecios = [];
let dataProd = [];
let controlItem = 40;
//let totitem = 0;
let controlcond = false;
let baseCiudad = [];
let holder = 0;
let valdata = 0;
let numregfiltroprecio = 0;
let longprd = 0;

const SearchResultScreen = () => {
    const Router = useRouter();
    const irA = useRef(null);
    const dispatch = useDispatch();
    let { keyword } = Router.query;

    const { loading, productItems, getProducts, dataPayload } =
        useGetProducts();

    const { withGridDos } = useProductGroup();
    const { withListMaximize } = useProductGroupInteractive();
    const { withListView } = useProductGroup();

    const [resultFind, setResultFind] = useState(false);
    const [wordCambia, setWordCambia] = useState(false);
    const [cantidadPrdCiudad, setCantidadPrdCiudad] = useState([]);
    const [PrdCiudadUno, setPrdCiudadUno] = useState([]);
    const [PrdCiudadDos, setPrdCiudadDos] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [selected, setSelected] = useState([]);
    const [marcaSelected, setmarcaSelected] = useState("");
    const [activaCiudad, setActivaCiudad] = useState(true);
    const [eraseCitySel, setEraseCitySel] = useState(0);
    const [citySelected, setCitySelected] = useState([]);

    const [activar, setActivar] = useState("habilitar");
    const [selectGrid, setSelectGrid] = useState(1);
    const [pagInicia, setPagInicia] = useState(0);
    const [itemsPaginas, setItemsPaginas] = useState(10);
    const [pagFin, setPagFin] = useState(10);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);

    const [condition, setCondition] = useState(null);
    const [marcarCondicion, setMarcarCondicion] = useState("");
    const [paginaSel, setPaginaSel] = useState(1);
    const [itemSel, setitemSel] = useState(null);
    const [itemSelCond, setitemSelCond] = useState(null);
    const [contCond, setContCond] = useState(controlcond);
    const [disableEnable, setDisableEnable] = useState("");

    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(10000000);

    const [numProdRel, setNumProdRel] = useState(10);
    const [irInicio, setIrInicio] = useState(false);

    const [filtroCond, setFiltroCond] = useState(0);
    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [cerrarFiltro, setCerrarFiltro] = useState(false);

    const [classCondicion, setClassCondicion] = useState("ml-1 mt-10 mb-50");
    const [classCity, setClassCity] = useState(
        "colorcerrarselectlocation apuntador"
    );
    const [classCitySel, setClassCitySel] = useState(
        "colorxcerrarfiltro apuntador"
    );

    const [ok, setOk] = useState(false);
    const [clearFiltroCity, setclearFiltroCity] = useState(false);
    const [actCity, setActCiy] = useState(false);
    const [itemIni, setitemIni] = useState(1);
    const [itemFin, setItemFin] = useState(40);
    const [textoOrdenar, setTextoOrdenar] = useState("Ordenar por");
    const [isLoading, setIsLoading] = useState(true);

    const [addcartId, setAddcartId] = useState(0);
    const [addcartIdLogin, setAddcartIdLogin] = useState(0);
    const [addcartImagen, setAddcartImagen] = useState(0);
    const [addcartTitulo, setAddcartTitulo] = useState(0);
    const [addcartCantidad, setAddcartCantidad] = useState(0);
    const [agregarCarrito, setAgregarCarrito] = useState(false);
    const [dataCart, setDataCart] = useState(0);

    const [dataHolder, setDataHolder] = useState("");
    const [selectGrip, setSelectGrip] = useState(1);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [onOffClick, setOnOffClick] = useState(
        "ps-page ps-page--shopping ml-82 cajaprueba habilitar"
    );

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    // Asignamos Datos al arreglo de Usuarios desde el state
    let addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const leeira = useSelector((state) => state.leeira.ira);
    // Lee registro de producto al carrito por login de usuario
    const addlogin = useSelector((state) => state.addlogin.addlogin);
    //lee valor de la grilla seleccionada
    const gripselect = useSelector((state) => state.gripselect.gripselect);

    const filtroprd = useSelector((state) => state.filtroprd.filtroprd);
    const orderbyprd = useSelector(
        (state) => state.filtroorderbyprd.filtroorderbyprd
    );
    const filtrocondprd = useSelector((state) => state.filtrocondicionprd.filtrocondicionprd);

    const openclosecity = useSelector(
        (state) => state.openclosecity.openclosecity
    );

    useEffect(() => {
        if (productItems) {
            let precios = [];
            productItems &&
                productItems?.map((row, index) => {
                    precios.push(row.price);
                });

            let menorAmayor = precios.sort(function (a, b) {
                return a - b;
            });
            let long = menorAmayor.length;

            setMenorPrecio(menorAmayor[0]);
            setMayorPrecio(menorAmayor[long - 1]);
            let item = {
                menorprecio: menorAmayor[0],
                mayorprecio: menorAmayor[long - 1],
            };

            if (filtroprd != 3)
                localStorage.setItem("rangoprecios", JSON.stringify(item));
        }
    }, [productItems]);

    useEffect(() => {
        dispatch(getNumberPrdSelect(longprd));
    }, [gripselect, longprd]);

    useEffect(() => {
        dispatch(getUserMenu(false));
        dispatch(getUserMenuPrimary(false));
        let itemshoppingcartadd = JSON.parse(
            localStorage.getItem("itemshoppingcartadd")
        );

        let contrview = JSON.parse(localStorage.getItem("contrview"));

        if (addlogin.length > 0) {
            setAddcartId(0);
            localStorage.setItem("itemshoppingcartadd", JSON.stringify(null));
            setAddcartIdLogin(addlogin[0].idproducto);
            setAddcartImagen(addlogin[0].nombreimagen1);
            setAddcartTitulo(addlogin[0].titulonombre);
            setAddcartCantidad(addlogin[0].cantidad);
        } else if (contrview == 0) {
            let item = {
                idproducto: 0,
                nombreimagen1: "",
                titulonombre: "",
            };
            setAddcartId(0);
            setAddcartIdLogin(0);
            setAddcartImagen("");
            setAddcartTitulo("");
            setAddcartCantidad(0);
            localStorage.setItem("addedtocart", JSON.stringify(item));
        }

        let okwishlist = JSON.parse(localStorage.getItem("itemswishlistadd"));
        if (okwishlist == "Ok") {
            localStorage.setItem("itemswishlistadd", JSON.stringify(null));
            setShowModalMensajes(true);
            setOnOffClick(
                "ps-page ps-page--shopping ml-82 cajaprueba deshabilitar"
            );
            setTituloMensajes("Lista de deseos");
            let texto = "Producto agregado a lista de deseo";
            setTextoMensajes(texto);
        }
    }, [productItems]);

    useEffect(() => {
        let itemshoppingcartadd = JSON.parse(
            localStorage.getItem("itemshoppingcartadd")
        );

        if (itemshoppingcartadd) {
            const controlNumPrdCar = (data) => {
                let continuar = true;

                const leerItemsCarrito = async () => {
                    let params = {
                        usuario: datosusuarios.uid,
                    };

                    await axios({
                        method: "post",
                        url: URL_BD_MR + "59",
                        params,
                    })
                        .then((res) => {
                            if (res.data.type == 1) {
                                if (res.data.listarcarritocompra.length >= 15) {
                                    continuar = false;
                                    setShowModalMensajes(true);
                                    setTituloMensajes("Carrito de compra");
                                    let texto =
                                        "Puedes agregar maximo 15 productos al carrito de compra";
                                    setTextoMensajes(texto);
                                    return;
                                } else validaPrdShoppingCar();
                            } else {
                                continuar = true;
                                validaPrdShoppingCar();
                            }
                        })
                        .catch(function (error) {
                            console.log(
                                "Error leyendo items carrito de compra"
                            );
                        });
                };
                leerItemsCarrito();
            };
            controlNumPrdCar();

            const validaPrdShoppingCar = () => {
                localStorage.setItem("contrview", JSON.stringify(0));
                const leerItem = async () => {
                    const leerItems = async () => {
                        let params = {
                            idproducto: itemshoppingcartadd.idproducto,
                            usuario: datosusuarios.uid,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "62",
                            params,
                        })
                            .then((res) => {
                                if (res.data.listaritemcarrito.length > 0) {
                                    //console.log("LEER : ", res.data.listaritemcarrito[0].idproducto
                                } else grabarItemCarrito();
                            })
                            .catch(function (error) { });
                    };
                    leerItems();
                };
                leerItem();
            };

            const grabarItemCarrito = async () => {
                if (leeira != 3) {
                    let params = {
                        compatible: itemshoppingcartadd.compatible,
                        idproducto: itemshoppingcartadd.idproducto,
                        usuario: datosusuarios.uid,
                        cantidad: 1,
                    };

                    await axios({
                        method: "post",
                        url: URL_BD_MR + "58",
                        params,
                    })
                        .then((res) => {
                            const grabarItemCarritoHistorial = async () => {
                                let params = {
                                    compatible: itemshoppingcartadd.compatible,
                                    idproducto: itemshoppingcartadd.idproducto,
                                    usuario: datosusuarios.uid,
                                    cantidad: 1,
                                };

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "581",
                                    params,
                                })
                                    .then((res) => {
                                        console.log(
                                            "OK item  add carrito de compra"
                                        );
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error item add carrito de compra"
                                        );
                                    });
                            };
                            grabarItemCarritoHistorial();

                            const leeItemAgregadoCarrito = async () => {
                                let params = {
                                    idproducto: itemshoppingcartadd.idproducto,
                                    usuario: datosusuarios.uid,
                                };

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "62",
                                    params,
                                })
                                    .then((res) => {
                                        let item = {
                                            idproducto:
                                                res.data.listaritemcarrito[0]
                                                    .idproducto,
                                            nombreimagen1:
                                                res.data.listaritemcarrito[0]
                                                    .nombreimagen1,
                                            titulonombre:
                                                res.data.listaritemcarrito[0]
                                                    .titulonombre,
                                            cantidad:
                                                res.data.listaritemcarrito[0]
                                                    .cantidad,
                                        };

                                        dispatch(getAddEdToCart(item));
                                        localStorage.setItem(
                                            "addedtocart",
                                            JSON.stringify(item)
                                        );
                                        localStorage.setItem(
                                            "itemshoppingcartadd",
                                            JSON.stringify(null)
                                        );
                                        localStorage.setItem(
                                            "contrview",
                                            JSON.stringify(1)
                                        );
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo items carrito de compra"
                                        );
                                    });
                            };
                            leeItemAgregadoCarrito();

                            const leerItemsCarrito = async () => {
                                let params = {
                                    usuario: datosusuarios.uid,
                                };

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "59",
                                    params,
                                })
                                    .then((res) => {
                                        dispatch(
                                            getDataShoppingCart(
                                                res.data.listarcarritocompra
                                                    .length
                                            )
                                        );
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo items carrito de compra"
                                        );
                                    });
                            };
                            leerItemsCarrito();
                        })
                        .catch(function (error) {
                            console.log(
                                "Error leyendo items carrito de compra"
                            );
                        });
                }
            };
        }
    }, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("addedtocart"));
        if (data) {
            setAddcartId(data.idproducto);
            setAddcartImagen(data.nombreimagen1);
            setAddcartTitulo(data.titulonombre);
            setAddcartCantidad(data.cantidad);
        }
    }, [addedtocart]);

    useEffect(() => {
        if (
            keyword != 1 &&
            keyword != 2 &&
            keyword != 3 &&
            keyword != 4 &&
            keyword != 5 &&
            keyword != 6 &&
            keyword != 7
        ) {
            let row = [];
            let item = {
                word: keyword,
            };
            // word: keyword.trim()
            row.push(item);
            localStorage.setItem("keyword", JSON.stringify(row));
        }

        let datax = JSON.parse(localStorage.getItem("keyword"));

        let datay = "";
        if (datax) {
            datay = datax[0].word;
        }
        valdata = JSON.parse(localStorage.getItem("placeholdersearch"));
        let filtrocondicionprd = JSON.parse(
            localStorage.getItem("filtrocondicionprd")
        );

        let filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );

        let filtroprecioprd = JSON.parse(
            localStorage.getItem("filtroprecioprd")
        );

        setIsLoading(true);
        if (
            keyword < 7 &&
            filtrocondicionprd == 0 &&
            filtrociudadprd.length == 0 &&
            filtroprecioprd.length == 0 &&
            orderbyprd == 0
        ) {
            cerrarFiltros();
        }
    }, [keyword]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        // Lee numero de items de la consulta //
        const leebdprd = async () => {
            if (dataProd.length == 0) {
                await axios({
                    method: "post",
                    url: URL_BD_MR + "43",
                }).then((res) => {

                    let datos = res.data.cantidadprdciudad;

                    baseCiudad = datos;

                    const compare = (a, b) => {
                        if (a.nombre_ciu < b.nombre_ciu) {
                            return -1;
                        }
                        if (a.nombre_ciu > b.nombre_ciu) {
                            return 1;
                        }
                        return 0;
                    };

                    if (datos.length > 0) datos.sort(compare);

                    let prdciudaduno = [];
                    let prdciudaddos = [];
                    let allcity = [];
                    datos &&
                        datos.map((row, index) => {
                            if (index % 2 == 0) {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombre_ciu: row.nombre_ciu,
                                    nombreciu: row.nombreciudad,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaduno.push(item);
                                allcity.push(ciud);
                            } else {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaddos.push(item);
                                allcity.push(ciud);
                            }
                        });

                    const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

                    if (!activafiltrociudad) {
                        setPrdCiudadUno(prdciudaduno);
                        setPrdCiudadDos(prdciudaddos);
                        setAllCity(allcity);
                    }

                    if (datos?.length > 0) {
                        setCantidadPrdCiudad(datos);
                    }

                });
                setOk(false);
                if (productItems) {
                    let numpag = productItems?.length / itemsPaginas + 0.9;
                    let numpaginas = Math.trunc(numpag);

                    let array = [];
                    for (var i = 1; i <= numpaginas; i++) {
                        array.push(i);
                    }

                    setNumeroPaginas(array);
                    arraypag = array;
                }
            }
        };
        leebdprd();
    }, []);

    useEffect(() => {
        if (clearFiltroCity && filtroCond == 0) {
            dispatch(getOpenCloseCity(0));
            let arrayciud = [];
            let prdciudaduno = [];
            let prdciudaddos = [];

            allprdciud = [];
            itemciud = [];
            productItems &&
                productItems?.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
            setclearFiltroCity(true);
        }
    }, [clearFiltroCity]);

    const cambiar = () => {
        setActivaCiudad(false);
    };

    useEffect(() => {
        if (filtrarciud.length == 0) {
            dispatch(getOpenCloseCity(2));
        }
    }, [filtroCond]);

    useEffect(() => {
        // Lee numero de items de la consulta //
        let pageIni = JSON.parse(localStorage.getItem("selectpage"));

        if (pageIni != 0) {
            if (pageIni == 1) {
                setitemIni(1);
                setItemFin(40);
            } else if (pageIni == 2) {
                setitemIni(41);
                setItemFin(80);
            } else if (pageIni == 3) {
                setitemIni(81);
                setItemFin(120);
            } else if (pageIni == 4) {
                setitemIni(121);
                setItemFin(160);
            } else if (pageIni == 5) {
                setitemIni(161);
                setItemFin(200);
            } else if (pageIni == 6) {
                setitemIni(201);
                setItemFin(240);
            } else if (pageIni == 7) {
                setitemIni(241);
                setItemFin(280);
            } else if (pageIni == 8) {
                setitemIni(281);
                setItemFin(320);
            } else if (pageIni == 9) {
                setitemIni(321);
                setItemFin(360);
            } else if (pageIni == 9) {
                setitemIni(361);
                setItemFin(400);
            }
            setPaginaSel(pageIni);
        }

        let arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        if (filtroCond == 0 && citySelected.length == 0) {
            allprdciud = [];
            itemciud = [];
            dataProd = [];

            productItems &&
                productItems?.map((row, index) => {
                    if (row.genericos != "productosgenericos") {
                        dataProd.push(row);
                    } else {
                        dataProd.push(row);
                    }
                });

            dataProd &&
                dataProd.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {

                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;

                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
        } else if (citySelected.length > 0 && filtroCond > 0) {
            let dataalter = dataProd;
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataalter &&
                        dataalter.map((row, index) => {
                            if (
                                row.ciudad == item.idciu &&
                                filtroCond == row.condition
                            ) {
                                dataProd.push(row);
                            }
                        });
                });

        } else if (itemciud.length > 0 && filtroCond > 0) {
            allprdciud = [];
            itemciud = [];

            dataProd &&
                dataProd.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
        } else if (citySelected.length > 0 && filtroCond == 0) {
            let contador = 0;
            allprdciud = [];
            itemciud = [];
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    productItems &&
                        productItems?.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                allprdciud.push(row.ciudad);
                                let validar;
                                validar = itemciud.includes(row.ciudad);
                                dataProd.push(row);
                                if (!validar) {
                                    itemciud.push(row.ciudad);
                                }
                            }
                        });
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    let ciudad = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                ciudad = base.ciudad;
                                nombreciudad = base.nombre_ciu;
                            }
                        });

                    let ciud = {
                        id: index,
                        idciu: ciudad,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (arrayciud.length > 0 && !activafiltrociudad) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
        }
        setActCiy(false);
    }, [productItems, actCity, citySelected, filtroCond]);

    useEffect(() => {
        if (basePrecios.length > 0) {
            let precios = [];
            basePrecios &&
                basePrecios.map((row, index) => {
                    precios.push(row.price);
                });

            precios.sort(function (a, b) {
                return a - b;
            });
            setMenorPrecio(precios[0]);

            precios.sort(function (a, b) {
                return b - a;
            });
            setMayorPrecio(precios[0]);
        }
    }, [basePrecios, selectGrid]);

    useEffect(() => {
        if (basePrecios.length > 0) {
            let precios = [];
            basePrecios &&
                basePrecios.map((row, index) => {
                    precios.push(row.price);
                });
        }
    }, [precioFiltroMinimo, precioFiltroMaximo]);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordCambia(true);
        }, 500);
        return () => console.log("actualizar");
    }, [wordCambia]);

    useEffect(() => {
        if (!valdata) {
            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            nombreres = "";
            setResultFind("");

            const queries = {
                name_contains: "",
            };
            //console.log("BUSXXXX : ", queries);

            getProducts(queries);
        } else if (
            (keyword != 1 &&
                keyword != 2 &&
                keyword != 3 &&
                keyword != 4 &&
                keyword != 5 &&
                keyword != 6 &&
                keyword != 7) ||
            !productItems
        ) {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1) {
                nombreres = ubiposprod;
                //keyword = ubiposprod;
            }

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");

            let keyword1 = keyword?.toLowerCase();
            let keyword2 = keyword1?.replace(",", "");

            const queries = {
                name_contains: keyword2,
            };
            //console.log("BUSCAR : ", queries);

            getProducts(queries);
        } else {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1)
                nombreres = ubiposprod;

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");
        }

        if (holder == 0) {
            let selectvehgarage = JSON.parse(
                localStorage.getItem("selectvehgarage")
            );
            if (selectvehgarage) {
                let data = JSON.parse(
                    localStorage.getItem("placeholdersearch")
                );
                setDataHolder(data);
            } else {
                setDataHolder("");
            }
        }
    }, [keyword, wordCambia, selectGrid]);

    let products = null;
    let productcategory = null;
    let productos = [];
    let productoscategoria = [];
    let mostrarGategorias = false;

    let filtrarciud = [];
    let prdfiltrados = [];

    if (productItems && productItems?.length > 0) {
        controlcond = contCond;

        let esgenerico = JSON.parse(localStorage.getItem("esgenerico"));
        let codigogenerico = JSON.parse(localStorage.getItem("codigogenerico"));
        let itemordenar = JSON.parse(localStorage.getItem("orderbyprd"));
        let texto = JSON.parse(localStorage.getItem("textoorderbyprd"));

        if (itemordenar > 0) {
            if (itemordenar == 1) {
                const compare = (a, b) => {
                    if (a.fechacreacion < b.fechacreacion) {
                        return -1;
                    }
                    if (a.fechacreacion > b.fechacreacion) {
                        return 1;
                    }
                    return 0;
                };
                if (productItems?.length > 0) productItems?.sort(compare);
            }

            if (itemordenar == 2) {
                const compare = (a, b) => {
                    if (b.price < a.price) {
                        return -1;
                    }
                    if (b.price > a.price) {
                        return 1;
                    }
                    return 0;
                };
                if (productItems?.length > 0) productItems?.sort(compare);
            }

            if (itemordenar == 3) {
                const compare = (a, b) => {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1;
                    }
                    return 0;
                };
                if (productItems?.length > 0) productItems?.sort(compare);
            }
        } else {
            if (ordenarPor == 1) {
                const compare = (a, b) => {
                    if (a.fechacreacion < b.fechacreacion) {
                        return -1;
                    }
                    if (a.fechacreacion > b.fechacreacion) {
                        return 1;
                    }
                    return 0;
                };
                if (productItems?.length > 0) productItems?.sort(compare);
            }

            if (ordenarPor == 2) {
                const compare = (a, b) => {
                    if (b.price < a.price) {
                        return -1;
                    }
                    if (b.price > a.price) {
                        return 1;
                    }
                    return 0;
                };
                if (productItems?.length > 0) productItems?.sort(compare);
            }

            if (ordenarPor == 3) {
                const compare = (a, b) => {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1;
                    }
                    return 0;
                };
                if (productItems?.length > 0) productItems?.sort(compare);
            }
        }

        let filtrociudad = [];

        if (citySelected.length > 0) {
            citySelected &&
                citySelected.map((item, index) => {
                    productItems &&
                        productItems?.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                filtrociudad.push(row);
                            }
                        });
                });
        } else {
            filtrociudad = productItems;
        }

        let filtroprecio = [];

        filtrociudad &&
            filtrociudad.map((row, index) => {
                if (
                    row.price >= precioFiltroMinimo &&
                    row.price <= precioFiltroMaximo
                ) {
                    filtroprecio.push(row);
                }
            });

        filtroprecio &&
            filtroprecio.map((row, index) => {
                if (row.productogenerico == "No") {
                    productos.push(row);
                } else {
                    productoscategoria.push(row);
                }
            });

        let productos0 = [];
        let productoscategoria0 = [];
        let prdfiltrocondicion = [];
        let categfiltrocondicion = [];

        const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

        if (activafiltrociudad) {
            const filtrociudadprd = JSON.parse(localStorage.getItem("filtrociudadprd"));
            filtrociudad = filtrociudadprd;

            filtrociudad &&
                filtrociudad.map((item, index) => {
                    productos &&
                        productos.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                productos0.push(row);
                            }
                        });
                });

            filtrociudad &&
                filtrociudad.map((item, index) => {
                    productoscategoria &&
                        productoscategoria.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                productoscategoria0.push(row);
                            }
                        });
                });

        } else {
            productos0 = productos;
            productoscategoria0 = productoscategoria;
        }

        if (filtroCond > 0) {
            productos0 &&
                productos0.map((row, index) => {
                    if (row.condition == filtroCond) {
                        prdfiltrocondicion.push(row);
                    }
                });

            productoscategoria0 &&
                productoscategoria0.map((row, index) => {
                    if (row.condition == filtroCond) {
                        categfiltrocondicion.push(row);
                    }
                });
        } else {
            prdfiltrocondicion = productos0;
            categfiltrocondicion = productoscategoria0;
        }

        if (categfiltrocondicion.length > 0 && prdfiltrocondicion.length > 0) {
            longprd = categfiltrocondicion.length + prdfiltrocondicion.length;
        } else if (categfiltrocondicion.length > 0) {
            longprd = categfiltrocondicion.length;
        } else if (prdfiltrocondicion.length > 0) {
            longprd = prdfiltrocondicion.length;
        }

        let ciudsel = [];
        let itemciud = [];
        cantidadPrdCiudad &&
            cantidadPrdCiudad.map((row, index) => {
                categfiltrocondicion &&
                    categfiltrocondicion.map((item, index) => {
                        if (row.idciu == item.ciudad) {
                            let validar;
                            validar = itemciud.includes(row.idciu);
                            if (!validar) {
                                itemciud.push(row.ciudad);
                                ciudsel.push(row);
                            }
                            prdfiltrados.push(item);
                        }
                    });
            });

        cantidadPrdCiudad &&
            cantidadPrdCiudad.map((row, index) => {
                prdfiltrocondicion &&
                    prdfiltrocondicion.map((item, index) => {
                        if (row.idciu == item.ciudad) {
                            let validar;
                            validar = itemciud.includes(row.idciu);
                            if (!validar) {
                                itemciud.push(row.ciudad);
                                ciudsel.push(row);
                            }
                            prdfiltrados.push(item);
                        }
                    });
            });

        if (!activafiltrociudad)
            filtrarciud = ciudsel;

        if (!dataPayload && categfiltrocondicion.length > 0)
            mostrarGategorias = true;

        let allprdciud2 = [];
        let itemciud2 = [];
        let allprd2 = [];

        prdfiltrocondicion &&
            prdfiltrocondicion.map((row, index) => {
                allprd2.push(row)
            });

        categfiltrocondicion &&
            categfiltrocondicion.map((row, index) => {
                allprd2.push(row)
            });

        allprd2 &&
            allprd2.map((row, index) => {
                let validar;
                validar = itemciud2.includes(row.ciudad);
                if (!validar) {
                    itemciud2.push(row.ciudad);
                }
            });

        const compareAsc = (a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        };

        const compareDesc = (a, b) => {
            if (b.price < a.price) {
                return -1;
            }
            if (b.price > a.price) {
                return 1;
            }
            return 0;
        };

        //console.log("PROD2AASSA : ", allprd2)
        
        let rangomenor = 0;
        if (allprd2.length > 0) allprd2.sort(compareAsc);

        if (allprd2?.length > 0)
            rangomenor = allprd2[0].price;

        let rangomayor = 0;
        if (allprd2.length > 0) allprd2.sort(compareDesc);

        if (allprd2?.length > 0)
            rangomayor = allprd2[0].price;

        if (!allprd2?.length || allprd2?.length == 0) {
            let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
            rangomenor = rangoprecios.menorprecio;
            rangomayor = rangoprecios.mayorprecio;
        }

        let rangpre = {
            menorprecio: rangomenor,
            mayorprecio: rangomayor,
        };

        //console.log("RANGREXACAS : ", rangpre);

        if (rangomenor != 1 && rangomayor != 10000000) {
            localStorage.setItem(
                "filtroprecioprd",
                JSON.stringify(rangpre)
            );
        }

        localStorage.setItem("rangoprecios", JSON.stringify(rangpre));
        // Coloca los datos en state range de precios
        dispatch(getRangosPrecio(rangpre));

        itemciud2 &&
            itemciud2.map((item, ind) => {
                let contador = 0;
                let dat;
                allprd2 &&
                    allprd2.map((row, index) => {
                        if (item == row.ciudad) {
                            contador = parseInt(contador) + 1;
                            dat = {
                                id: index,
                                idciu: row.ciudad,
                                ciudad: row.ciudad,
                                nombreciu: row.nombreciudad,
                                nombre_ciu: row.nombreciudad,
                                productosciudad: contador,
                            }
                        }
                    });
                allprdciud2.push(dat)
            });

        dataPrd = allprd2;

        filtrarciud = allprdciud2;
        //setCantidadPrdCiudad(allprdciud2);

        if (selectGrid == 1) {
            productcategory = withGridDos(categfiltrocondicion, loading, 4);
            products = withGridDos(prdfiltrocondicion, loading, 4);
        } else if (selectGrid == 2) {
            productcategory = withListMaximize(
                categfiltrocondicion,
                loading,
                4
            );
            products = withListMaximize(prdfiltrocondicion, loading, 4);
        } else if (selectGrid == 3) {
            productcategory = withListView(categfiltrocondicion, loading, 4);
            products = withListView(prdfiltrocondicion, loading, 4);
        } else {
            productcategory = withGridDos(categfiltrocondicion, loading, 4);
            products = withGridDos(prdfiltrocondicion, loading, 4);
        }
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    useEffect(() => {
        if (filtrarciud?.length > 0 && cantidadPrdCiudad?.length == 0) {
            setCantidadPrdCiudad(filtrarciud);
        }
    }, [filtrarciud])

    useEffect(() => {
        if (openclosecity == 1) {

            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));
            if (activafiltrociudad) {
                const filtrociudadprd = JSON.parse(localStorage.getItem("filtrociudadprd"));
                const dataciudadprd = JSON.parse(localStorage.getItem("filtrarciud"));

                if (filtrociudadprd.length > 0) {
                    filtrarciud = filtrociudadprd;

                    setCantidadPrdCiudad(filtrociudadprd);

                    let prdciudaduno = [];
                    let prdciudaddos = [];
                    let allcity = [];
                    filtrociudadprd &&
                        filtrociudadprd.map((row, index) => {
                            if (index % 2 == 0) {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaduno.push(item);
                                allcity.push(ciud);
                            } else {
                                let item = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciu,
                                    nombre_ciu: row.nombreciu,
                                    productosciudad: row.productosciudad,
                                };

                                prdciudaddos.push(item);
                                allcity.push(ciud);
                            }
                        });

                    setPrdCiudadUno(prdciudaduno);
                    setPrdCiudadDos(prdciudaddos);
                    setAllCity(allcity);

                } else {
                    setPrdCiudadUno([]);
                    setPrdCiudadDos([]);
                    setAllCity([]);
                }
            }
        } else {
            const activafiltrociudad = JSON.parse(localStorage.getItem("activafiltrociudad"));

            if (!activafiltrociudad && productItems?.length > 0) {
                let allprdciud2 = [];
                let itemciud2 = [];
                let allprd2 = [];

                productItems &&
                    productItems?.map((row, index) => {
                        let validar;
                        validar = itemciud2.includes(row.ciudad);
                        if (!validar) {
                            itemciud2.push(row.ciudad);
                        }
                    });

                itemciud2 &&
                    itemciud2.map((item, ind) => {
                        let contador = 0;
                        let dat;
                        productItems &&
                            productItems?.map((row, index) => {
                                if (item == row.ciudad) {
                                    contador = parseInt(contador) + 1;
                                    dat = {
                                        id: index,
                                        idciu: row.ciudad,
                                        ciudad: row.ciudad,
                                        nombreciu: row.nombreciudad,
                                        nombre_ciu: row.nombreciudad,
                                        productosciudad: contador,
                                    }
                                }
                            });
                        allprdciud2.push(dat)
                    });

                //const filtrociudadprd = allprdciud2;
                //const dataciudadprd = allprdciud2;

                setCantidadPrdCiudad(allprdciud2);

                localStorage.setItem("filtrociudadprd", JSON.stringify(citySelected));
                localStorage.setItem("dataciudadprd", JSON.stringify(citySelected));

                let datos = allprdciud2;

                baseCiudad = datos;

                const compare = (a, b) => {
                    if (a.nombre_ciu < b.nombre_ciu) {
                        return -1;
                    }
                    if (a.nombre_ciu > b.nombre_ciu) {
                        return 1;
                    }
                    return 0;
                };

                if (datos.length > 0) datos.sort(compare);

                let prdciudaduno = [];
                let prdciudaddos = [];
                let allcity = [];
                datos &&
                    datos.map((row, index) => {
                        if (index % 2 == 0) {
                            let item = {
                                id: index,
                                idciu: row.idciu,
                                nombre_ciu: row.nombre_ciu,
                                productosciudad: row.productosciudad,
                            };

                            let ciud = {
                                id: index,
                                idciu: row.idciu,
                                nombreciu: row.nombreciu,
                                nombre_ciu: row.nombreciu,
                                productosciudad: row.productosciudad,
                            };

                            prdciudaduno.push(item);
                            allcity.push(ciud);
                        } else {
                            let item = {
                                id: index,
                                idciu: row.idciu,
                                nombre_ciu: row.nombre_ciu,
                                productosciudad: row.productosciudad,
                            };

                            let ciud = {
                                id: index,
                                idciu: row.idciu,
                                nombreciu: row.nombreciu,
                                nombre_ciu: row.nombreciu,
                                productosciudad: row.productosciudad,
                            };

                            prdciudaddos.push(item);
                            allcity.push(ciud);
                        }
                    });

                if (!activafiltrociudad) {
                    setPrdCiudadUno(prdciudaduno);
                    setPrdCiudadDos(prdciudaddos);
                    setAllCity(allcity);
                }

                if (datos?.length > 0) {
                    setCantidadPrdCiudad(datos);
                }

            }
        }
    }, [openclosecity])

    useEffect(() => {
        setOk(true);
    }, [itemsPaginas]);

    useEffect(() => {
        if (dataProd.length > 0) {
            let numpag = dataProd.length / itemsPaginas + 0.9;
            let numpaginas = Math.trunc(numpag);

            let array = [];
            for (var i = 1; i <= numpaginas; i++) {
                array.push(i);
            }
            setNumeroPaginas(array);
            arraypag = array;
        }
    }, [citySelected, condition]);

    useEffect(() => {
        if (selectGrid == 1) {
            setPaginaSel(1);
            setPagInicia(0);
            setPagFin(40);
            setItemsPaginas(40);
        } else if (selectGrid == 2) {
            setPaginaSel(1);
            setPagInicia(0);
            setPagFin(60);
            setItemsPaginas(60);
        } else if (selectGrid == 3) {
            setPaginaSel(1);
            setPagInicia(0);
            setPagFin(20);
            setItemsPaginas(20);
        }
    }, [selectGrid]);

    useEffect(() => {
        if (dataProd.length == 0) {
            setNumProdRel(1);
        } else if (controlItem >= 1 && controlItem <= 4 && selectGrid == 2) {
            setNumProdRel(1);
        } else if (controlItem >= 1 && controlItem <= 8 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 8 && controlItem <= 16 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 16 && controlItem <= 24 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 24 && controlItem <= 34 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 34 && controlItem <= 44 && selectGrid == 2) {
            setNumProdRel(3);
        } else if (controlItem > 40 && selectGrid == 2) {
            setNumProdRel(3);
        } else if (controlItem >= 1 && controlItem <= 3 && selectGrid == 2) {
            setNumProdRel(3);
        } else if (controlItem >= 4 && controlItem <= 7 && selectGrid == 3) {
            setNumProdRel(4);
        } else if (controlItem >= 7 && controlItem <= 10 && selectGrid == 3) {
            setNumProdRel(6);
        } else if (controlItem >= 10 && controlItem <= 13 && selectGrid == 3) {
            setNumProdRel(8);
        } else if (controlItem > 13 && controlItem <= 16 && selectGrid == 3) {
            setNumProdRel(10);
        } else if (controlItem > 16 && controlItem <= 24 && selectGrid == 3) {
            setNumProdRel(13);
        } else if (controlItem > 24 && controlItem <= 34 && selectGrid == 3) {
            setNumProdRel(17);
        } else if (controlItem > 34 && controlItem <= 44 && selectGrid == 3) {
            setNumProdRel(19);
        } else if (controlItem > 40 && selectGrid == 3) {
            setNumProdRel(21);
        } else if (controlItem >= 1 && controlItem <= 2) {
            setNumProdRel(1);
        } else if (controlItem >= 3 && controlItem <= 4) {
            setNumProdRel(2);
        } else if (controlItem >= 5 && controlItem <= 6) {
            setNumProdRel(3);
        } else if (controlItem >= 7 && controlItem <= 9) {
            setNumProdRel(3);
        } else if (controlItem > 8 && controlItem <= 16) {
            setNumProdRel(5);
        } else if (controlItem > 16 && controlItem <= 24) {
            setNumProdRel(6);
        } else if (controlItem > 24 && controlItem <= 34) {
            setNumProdRel(7);
        } else if (controlItem > 34 && controlItem <= 44) {
            setNumProdRel(9);
        } else if (controlItem > 40) {
            setNumProdRel(11);
        }
    }, [basePrecios, productItems, selectGrid]);

    const cerrarCity = (dato) => {
        let ciudades = citySelected;
        let citysel = [];
        let contcity = [];
        ciudades &&
            ciudades.map((item, index) => {
                if (dato != item.idciu) {
                    citysel.push(item);
                } else setEraseCitySel(dato);
            });
        setCitySelected(citysel);
    };

    useEffect(() => {
        let filtrociudadprd = [];
        filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );
        if (filtrociudadprd.length == 0) {
            setCitySelected([]);
        }
    }, [])

    const cerrarFiltros = () => {
        setPrecioFiltroMinimo(1);
        setPrecioFiltroMaximo(10000000);
        setFiltroPrecio(false);
        setMenorPrecio(1);
        setMayorPrecio(10000000);

        setCerrarFiltro(true);
        setCitySelected([]);
        setSelected([]);
        setmarcaSelected("");
        setCondition(null);
        setitemSel(0);
        setitemSelCond(0);
        setFiltroCond(0);
        setMarcarCondicion("");
        setOrdenarPor(0);
        setTextoOrdenar("Ordenar por");
    };

    const handleClickScroll = () => {
        const element = document.getElementById("section-1");
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIrInicio(false);
    };

    useEffect(() => {
        if (irInicio) {
            handleClickScroll();
        }
    }, [irInicio]);

    useEffect(() => {
        if (citySelected.length > 0) {
            localStorage.setItem(
                "filtrociudadprd",
                JSON.stringify(citySelected)
            );
        }
        if (citySelected.length > 0 && filtroCond > 0) {
            setClassCity("colorcerrarselectlocationdos apuntador");
            setClassCondicion("mt-60 mlmenos35");
            setClassCitySel("");
        } else {
            setClassCondicion("mt-60 mlmenos230");
            setClassCity("colorcerrarselectlocation apuntador");
            setClassCitySel("mlmenos50");
        }

        if (citySelected.length > 0) {
            dispatch(getFiltroPrd(2));
        }
    }, [citySelected, filtroCond]);

    useEffect(() => {
        let filtrocondicionprd = JSON.parse(
            localStorage.getItem("filtrocondicionprd")
        );
        let filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );
        if (filtrociudadprd.length > 0) {
            dispatch(getFiltroPrd(2));
        }
        let filtroprecioprd = JSON.parse(
            localStorage.getItem("filtroprecioprd")
        );
        if (filtroprecioprd.length > 0) {
            dispatch(getFiltroPrd(3));
            setPrecioFiltroMinimo(filtroprecioprd[0].preminimo);
            setPrecioFiltroMaximo(filtroprecioprd[0].premaximo);
        } else {
            let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
            if (rangoprecios) {
                setPrecioFiltroMinimo(rangoprecios.menorprecio);
                setPrecioFiltroMaximo(rangoprecios.mayorprecio);
                setMenorPrecio(rangoprecios.menorprecio);
                setMayorPrecio(rangoprecios.mayorprecio);
            }
        }
    }, []);

    useEffect(() => {
        let filtrocondicionprd = JSON.parse(
            localStorage.getItem("filtrocondicionprd")
        );
        let filtrociudadprd = JSON.parse(
            localStorage.getItem("filtrociudadprd")
        );
        let filtroprecioprd = JSON.parse(
            localStorage.getItem("filtroprecioprd")
        );

        if (
            filtrocondicionprd == 0 &&
            filtrociudadprd.length == 0 &&
            filtroprecioprd.length == 0 &&
            orderbyprd == 0
        ) {
            cerrarFiltros();
        }

        if (productItems) {
            if (productItems?.length != dataProd.length) dataProd = productItems;
        }
    }, [productItems]);

    const SelectCondition = (item) => {
        if (filtroCond == item) {
            localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        }
        if (item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setMarcarCondicion("");
        } else if (item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setMarcarCondicion("");
        }
    };

    const encontrar = () => {
        if (datosusuarios.activo == 30) {
            setDisableEnable("deshabilitar");
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Productos MR");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }

        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        localStorage.setItem("eraseplaceholder", JSON.stringify(0));
        Router.push("/Contactanos/");
    };

    const onSelectPrd = () => {
        localStorage.setItem("selectpage", JSON.stringify(paginaSel));
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [addcartId, addcartCantidad]);

    useEffect(() => {
        window.addEventListener("beforeunload", reiniciarCartItem());
    }, []);

    const reiniciarCartItem = () => {
        let item = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
        };
        setAddcartId(0);
        setAddcartImagen("");
        setAddcartTitulo("");
        setAddcartCantidad(0);
        localStorage.setItem("addedtocart", JSON.stringify(item));
    };

    return (
        <ContainerResult>
            <ModalMensajesWishListSearch
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
                setOnOffClick={setOnOffClick}
            />
            <ModalControlAcceso
                shown={showModalControlAcceso}
                close={setShowModalControlAcceso}
                titulo={tituloControlAcceso}
                mensaje={textoControlAcceso}
                tipo="1"
            />
            <div className={onOffClick} ref={irA}>
                <div className="container" id="section-1">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />

                        {agregarCarrito ? (
                            <AddShoppingCart data={dataCart} />
                        ) : null}

                        {addcartId > 0 ? (
                            <div className="productoagregarcarrito">
                                <ViewAddShoppingCart
                                    idproducto={addcartId}
                                    nombreimagen1={addcartImagen}
                                    titulonombre={addcartTitulo}
                                />
                            </div>
                        ) : addcartIdLogin > 0 ? (
                            <div className="productoagregarcarrito">
                                <ViewAddShoppingCart
                                    idproducto={addcartIdLogin}
                                    nombreimagen1={addcartImagen}
                                    titulonombre={addcartTitulo}
                                />
                            </div>
                        ) : null}

                        <br />

                        {holder == 0 ? (
                            <a className="textoresultprod mlmenos51 ps-page__heading">
                                {dataHolder?.length > 70 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {dataHolder.substr(0, 86)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproddos">
                                                {dataHolder.substr(87, 88)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultprodtres">
                                                {dataHolder.substr(175, 88)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {dataHolder?.substr(0, 86)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}
                            </a>
                        ) : resultFind == "" ||
                            !resultFind ||
                            !keyword ||
                            activaCiudad ||
                            !activaCiudad ||
                            actCity ? (
                            <a className="textoresultprod mlmenos51 ps-page__heading">
                                {nombreres?.length > 70 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {nombreres.substr(0, 86)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproddos">
                                                {nombreres.substr(87, 88)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultprodtres">
                                                {nombreres.substr(175, 88)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {nombreres.substr(0, 86)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}
                            </a>
                        ) : keyword != resultFind ||
                            activaCiudad ||
                            !activaCiudad ||
                            actCity ? (
                            <a className="textoresultprod mlmenos51 ps-page__heading">
                                {resultFind?.length > 70 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {resultFind?.substr(0, 86)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproddos">
                                                {resultFind.substr(87, 88)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultprodtres">
                                                {resultFind?.substr(175, 88)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {resultFind?.substr(0, 86)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}
                            </a>
                        ) : (
                            <a className="textoresultprod mlmenos51 ps-page__heading">
                                {keyword?.length > 70 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {keyword.substr(0, 86)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproddos">
                                                {keyword.substr(87, 88)}
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultprodtres">
                                                {keyword.substr(175, 88)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className="textoresultproduno">
                                                ({longprd}) Resultado de la
                                                búsqueda:{" "}
                                                {keyword.substr(0, 86)}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}
                            </a>
                        )}
                    </div>

                    <div className="mtmenos95">
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={2} md={2} lg={2}>
                                {filtroCond > 0 ? (
                                    <div className="mlmenos11 mt-60">
                                        {filtroCond == 1 ? (
                                            <div className="mlmenos35 tamañotextociudadeselect">
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={8}
                                                        md={8}
                                                        lg={8}>
                                                        <a className="">
                                                            Nuevo
                                                        </a>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1}
                                                        md={1}
                                                        lg={1}>
                                                        <a
                                                            className="colorxcerrarfiltro apuntador"
                                                            onClick={() =>
                                                                SelectCondition(
                                                                    1
                                                                )
                                                            }>
                                                            {" X "}
                                                        </a>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ) : filtroCond == 2 ? (
                                            <div className="mlmenos35 tamañotextociudadeselect">
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={8}
                                                        md={8}
                                                        lg={8}>
                                                        <a className="">
                                                            Usado
                                                        </a>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={1}
                                                        md={1}
                                                        lg={1}>
                                                        <a
                                                            className="colorxcerrarfiltro apuntador"
                                                            onClick={() =>
                                                                SelectCondition(
                                                                    2
                                                                )
                                                            }>
                                                            {" X "}
                                                        </a>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="mt-50"></div>
                                )}
                            </Grid>

                            <Grid
                                item
                                xs={9}
                                md={9}
                                lg={9}
                                className="mlmenos4">
                                {citySelected.length == 1 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : citySelected?.length == 2 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[1].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[1]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : citySelected?.length == 3 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[1].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[1]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[2].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[2]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : citySelected?.length == 4 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[0].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[0]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[1].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[1]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[2].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[2]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2}
                                                className={classCitySel}>
                                                <div className="tamañotextociudadeselectdos">
                                                    {citySelected[3].nombreciu}
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    onClick={() =>
                                                        cerrarCity(
                                                            citySelected[3]
                                                                .idciu
                                                        )
                                                    }>
                                                    <div className={classCity}>
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : (
                                    <div className="mtmenos90"></div>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <div className="boxsearchmain mlmenos45">
                        <div className="ps-layout--with-sidebar">
                            <div className="ps-layout__left">
                                <SidebarShopResults
                                    filtrarciud={filtrarciud}
                                    prdfiltrados={prdfiltrados}
                                    setCantidadPrdCiudad={setCantidadPrdCiudad}
                                    cantidadPrdCiudad={cantidadPrdCiudad}
                                    PrdCiudadUno={PrdCiudadUno}
                                    PrdCiudadDos={PrdCiudadDos}
                                    setActivar={setActivar}
                                    menorprecio={menorprecio}
                                    mayorprecio={mayorprecio}
                                    setMenorPrecio={setMenorPrecio}
                                    setMayorPrecio={setMayorPrecio}
                                    precioFiltroMinimo={precioFiltroMinimo}
                                    setPrecioFiltroMinimo={
                                        setPrecioFiltroMinimo
                                    }
                                    precioFiltroMaximo={precioFiltroMaximo}
                                    setPrecioFiltroMaximo={
                                        setPrecioFiltroMaximo
                                    }
                                    setSelected={setSelected}
                                    marcaSelected={marcaSelected}
                                    setmarcaSelected={setmarcaSelected}
                                    marcarCondicion={marcarCondicion}
                                    setMarcarCondicion={setMarcarCondicion}
                                    condition={condition}
                                    setCondition={setCondition}
                                    numProdRel={numProdRel}
                                    setActivaCiudad={setActivaCiudad}
                                    activaCiudad={activaCiudad}
                                    itemSel={itemSel}
                                    setitemSel={setitemSel}
                                    itemSelCond={itemSelCond}
                                    setitemSelCond={setitemSelCond}
                                    setFiltroCond={setFiltroCond}
                                    filtroCond={filtroCond}
                                    cerrarFiltro={cerrarFiltro}
                                    setCerrarFiltro={setCerrarFiltro}
                                    setEraseCitySel={setEraseCitySel}
                                    eraseCitySel={eraseCitySel}
                                    setCitySelected={setCitySelected}
                                    citySelected={citySelected}
                                    setIrInicio={setIrInicio}
                                    setActCiy={setActCiy}
                                    actCity={actCity}
                                    setPaginaSel={setPaginaSel}
                                    setitemIni={setitemIni}
                                    setItemFin={setItemFin}
                                    setclearFiltroCity={setclearFiltroCity}
                                    setFiltroPrecio={setFiltroPrecio}
                                    longprd={longprd}
                                    dataPrd={dataPrd}
                                    productItems={productItems}
                                />
                            </div>
                            <div className="ps-layout__right tamañocontainerresult">
                                <ModuleShopResults
                                    setSelectGrid={setSelectGrid}
                                    itemsPaginas={itemsPaginas}
                                    setItemsPaginas={setItemsPaginas}
                                    ordenarPor={ordenarPor}
                                    setOrdenarPor={setOrdenarPor}
                                    textoOrdenar={textoOrdenar}
                                    setTextoOrdenar={setTextoOrdenar}
                                />
                                <div>
                                    <div className="mtmenos25 pb-3">
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <a className="textoclicaqui">
                                                    Si no encuentras lo que
                                                    buscas,{" "}
                                                    <a
                                                        className="subrayartextoclicaqui"
                                                        onClick={() =>
                                                            encontrar()
                                                        }>
                                                        haz clic aquí
                                                    </a>
                                                </a>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={0}>
                                            <Grid item xs={6} md={6} lg={6}>
                                                {productos.length == 0 &&
                                                    !isLoading ? (
                                                    <h2 className="ml-1 mtmenos5 tamañotextotoken">
                                                        Producto no encontrado
                                                    </h2>
                                                ) : null}
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <br />

                                    {isLoading ? <LoadingSearchResult /> : null}
                                    <div className={disableEnable}>
                                        <div className="mtmenos20">
                                            {productos.length > 0 ? (
                                                <div
                                                    className={activar}
                                                    onClick={() =>
                                                        onSelectPrd()
                                                    }>
                                                    <ShopSearch classes="ps-shop--grid disableEnable">
                                                        {products}
                                                    </ShopSearch>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    {dataPayload || mostrarGategorias ? (
                                        <div>
                                            <div className="infoprodgenericos">
                                                ** Estos productos son
                                                recomendados para ti, pero
                                                pueden no coincidir exactamente
                                                con tu búsqueda **{" "}
                                            </div>
                                            <div className={disableEnable}>
                                                <div className="mt-20">
                                                    <ShopSearch classes="ps-shop--grid">
                                                        {productcategory}
                                                    </ShopSearch>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                {ok ? (
                                    <div className="ps-shop__footer">
                                        <CustomPagination
                                            numeroPaginas={numeroPaginas}
                                            setPagInicia={setPagInicia}
                                            setPagFin={setPagFin}
                                            itemsPaginas={itemsPaginas}
                                            paginaSel={paginaSel}
                                            setPaginaSel={setPaginaSel}
                                            setIrInicio={setIrInicio}
                                            setitemIni={setitemIni}
                                            setItemFin={setItemFin}
                                        />
                                    </div>
                                ) : (
                                    <div className="ps-shop__footer">
                                        <CustomPagination
                                            numeroPaginas={numeroPaginas}
                                            setPagInicia={setPagInicia}
                                            setPagFin={setPagFin}
                                            itemsPaginas={itemsPaginas}
                                            paginaSel={paginaSel}
                                            setPaginaSel={setPaginaSel}
                                            setIrInicio={setIrInicio}
                                            setitemIni={setitemIni}
                                            setItemFin={setItemFin}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="positionfootermainsearchini">
                        <FooterDefault />
                    </div>
                </div>
            </div>
        </ContainerResult>
    );
};

export default SearchResultScreen;
