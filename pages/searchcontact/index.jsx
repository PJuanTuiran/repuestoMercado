import React, { useEffect, useState } from "react";
import ContainerResult from "~/components/layouts/ContainerResult";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ShopSearch from "~/components/partials/shop/ShopSearch";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
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
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//Constantes
import { URL_BD_MR } from "../../helpers/Constants";
import { AirlineSeatReclineExtra } from "@material-ui/icons";

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
let totitem = 0;
let controlcond = false;
let baseCiudad = [];
let holder = 0;
let datafindcontact = "";
let valdata = 0;

const SearchContact = (props) => {
    const { dataFind, setDataSearch } = props;
    const Router = useRouter();
    const { keyword } = Router.query;
    //console.log("QUE BUSCA : ", dataFind);
    const { loading, getProducts, dataPayload } = useGetProducts();
    //console.log("PAYLOADPROUCT : ", dataFind);
    const { withGrid } = useProductGroup();
    const { withListMaximize } = useProductGroupInteractive();
    const { withList } = useProductGroup();

    const [resultFind, setResultFind] = useState(false);
    const [wordCambia, setWordCambia] = useState(false);
    const [cantidadPrdCiudad, setCantidadPrdCiudad] = useState([]);
    const [PrdCiudadUno, setPrdCiudadUno] = useState([]);
    const [PrdCiudadDos, setPrdCiudadDos] = useState([]);
    const [allCity, setAllCity] = useState([]);

    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [activar, setActivar] = useState("habilitar");
    const [selectGrid, setSelectGrid] = useState(1);
    const [pagInicia, setPagInicia] = useState(0);
    const [itemsPaginas, setItemsPaginas] = useState(10);
    const [pagFin, setPagFin] = useState(10);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);
    const [selected, setSelected] = useState([]);
    const [marcaSelected, setmarcaSelected] = useState("");
    const [activaCiudad, setActivaCiudad] = useState(true);
    const [condition, setCondition] = useState(null);
    const [marcarCondicion, setMarcarCondicion] = useState("");
    const [paginaSel, setPaginaSel] = useState(1);
    const [itemSel, setitemSel] = useState(null);
    const [itemSelCond, setitemSelCond] = useState(null);
    const [contCond, setContCond] = useState(controlcond);

    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(10000000);

    const [numProdRel, setNumProdRel] = useState(10);
    const [irInicio, setIrInicio] = useState(false);

    const [filtroCond, setFiltroCond] = useState(0);

    const [cerrarFiltro, setCerrarFiltro] = useState(false);

    const [eraseCitySel, setEraseCitySel] = useState(0);
    const [citySelected, setCitySelected] = useState([]);

    const [classCondicion, setClassCondicion] = useState("ml-1 mt-10 mb-50");
    const [classCity, setClassCity] = useState("colorxcerrarfiltro apuntador");
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
        if (datax) datay = datax[0].word;

        valdata = JSON.parse(localStorage.getItem("placeholdersearch"));

        setIsLoading(true);
        if (keyword < 7) {
            cerrarFiltros();
        }
    }, [keyword]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        // Lee numero de items de la consulta //
        datafindcontact = JSON.parse(localStorage.getItem("placeholdersearch"));
        const leebdprd = async () => {
            if (dataProd.length == 0) {
                await axios({
                    method: "post",
                    url: URL_BD_MR + "43",
                }).then((res) => {
                    let datos = [];
                    datos = res.data.cantidadprdciudad;
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
                                    ciudad: row.ciudad,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    nombreciu: row.nombreciu,
                                };

                                prdciudaduno.push(item);
                                allcity.push(ciud);
                            } else {
                                let item = {
                                    id: index,
                                    ciudad: row.ciudad,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    nombreciu: row.nombreciu,
                                };

                                prdciudaddos.push(item);
                                allcity.push(ciud);
                            }
                        });

                    setPrdCiudadUno(prdciudaduno);
                    setPrdCiudadDos(prdciudaddos);
                    setAllCity(allcity);
                    setCantidadPrdCiudad(datos);
                });
                setOk(false);
                if (dataFind) {
                    let numpag = dataFind.length / itemsPaginas + 0.9;
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
            let arrayciud = [];
            let prdciudaduno = [];
            let prdciudaddos = [];

            allprdciud = [];
            itemciud = [];
            dataFind &&
                dataFind.map((row, index) => {
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
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
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

            if (arrayciud.length > 0) {
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
        if (dataProd.length > 0) totitem = dataProd.length;
        cambiar();
        setActCiy(false);
    }, [dataProd, filtroCond, clearFiltroCity, actCity, eraseCitySel]);

    useEffect(() => {
        // Lee numero de items de la consulta //
        let arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        if (filtroCond == 0 && citySelected.length == 0) {
            allprdciud = [];
            itemciud = [];
            dataProd = [];

            dataFind &&
                dataFind.map((row, index) => {
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
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
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

            if (arrayciud.length > 0) {
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
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
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

            if (arrayciud.length > 0) {
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
                    dataFind &&
                        dataFind.map((row, index) => {
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
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
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

            if (arrayciud.length > 0) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
        }
        setActCiy(false);
    }, [dataFind, actCity, citySelected, filtroCond]);

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

            setResultFind("");
            const queries = {
                name_contains: "",
            };
            getProducts(queries);
        } else if (
            (keyword != 1 &&
                keyword != 2 &&
                keyword != 3 &&
                keyword != 4 &&
                keyword != 5 &&
                keyword != 6 &&
                keyword != 7) ||
            !dataFind
        ) {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1)
                nombreres = ubiposprod;

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");

            const queries = {
                name_contains: keyword,
            };
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
    }, [keyword, wordCambia, selectGrid]);

    let products = null;
    let productcategory = null;
    let productos = [];
    let productoscategoria = [];
    let filtrarciud = [];
    let prdfiltrados = [];

    if (dataFind && dataFind.length > 0) {
        controlcond = contCond;

        let selectedall = [];
        if (selected.length > 0) {
            selectedall = selected;
        } else {
            selectedall = allCity;
        }

        if (selectedall.length == 0) {
            itemciud = [];
            allprdciud = [];

            dataFind &&
                dataFind.map((row, index) => {
                    //console.log("CITY 11111 : ", row.ciudad);

                    let ciud = {
                        id: index,
                        idciu: row.ciudad,
                        nombreciu: row.nombreciu,
                    };
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        selectedall.push(ciud);
                    }
                });
        }

        if (citySelected && activaCiudad && filtroCond == 0) {
            productos = [];
            productoscategoria = [];
            controlcond = false;
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataFind &&
                        dataFind.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                //console.log("CITY 11111 : ", row);
                                if (row.genericos != "productosgenericos") {
                                    productos.push(row);
                                    dataProd.push(row);
                                } else {
                                    productoscategoria.push(row);
                                    dataProd.push(row);
                                }
                            }
                        });
                });
        } else if (
            selectedall &&
            !activaCiudad &&
            filtroCond == 0
            //&& controlcond
        ) {
            productos = [];
            productoscategoria = [];
            //controlcond = true;
            dataProd &&
                dataProd.map((row, index) => {
                    selectedall &&
                        selectedall.map((item, index) => {
                            if (row.ciudad == item.idciu) {
                                //console.log("CITY 2222222 : ", row);
                                //console.log("ENTRE : ", row.ciudad, ' = ',item.idciu)
                                if (row.genericos != "productosgenericos") {
                                    productos.push(row);
                                } else {
                                    productoscategoria.push(row);
                                }
                            }
                        });
                });
        }

        if (
            condition &&
            (filtroCond == 1 || filtroCond == 2) &&
            !controlcond &&
            citySelected.length == 0
        ) {
            productos = [];
            productoscategoria = [];
            dataProd = [];

            dataFind &&
                dataFind.map((row, index) => {
                    if (row.condition == condition) {
                        if (row.genericos != "productosgenericos") {
                            productos.push(row);
                            dataProd.push(row);
                        } else {
                            productoscategoria.push(row);
                            dataProd.push(row);
                        }
                    }
                });
        } else if (
            condition &&
            (filtroCond == 1 || filtroCond == 2) &&
            citySelected.length > 0
        ) {
            productos = [];
            productoscategoria = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataFind &&
                        dataFind.map((row, index) => {
                            if (
                                row.condition == condition &&
                                row.ciudad == item.idciu
                            ) {
                                if (row.genericos != "productosgenericos") {
                                    productos.push(row);
                                    //dataProd.push(row);
                                } else {
                                    productoscategoria.push(row);
                                    //dataProd.push(row);
                                }
                            }
                        });
                });
        }

        let arraypag = productos;
        let arraypagcat = productoscategoria;
        productoscategoria = [];
        productos = [];

        let contador = 0;
        arraypag &&
            arraypag.map((row, index) => {
                contador = index + 1;
                if (
                    parseInt(contador) >= parseInt(itemIni) &&
                    parseInt(contador) <= parseInt(itemFin)
                ) {
                    productos.push(row);
                }
            });

        if (contador < itemFin) {
            let itemcontinua = contador;
            arraypagcat &&
                arraypagcat.map((row, index) => {
                    contador = itemcontinua + index + 1;
                    if (
                        parseInt(contador) >= parseInt(itemIni) &&
                        parseInt(contador) <= parseInt(itemFin)
                    ) {
                        productoscategoria.push(row);
                    }
                });
        }

        if (ordenarPor == 1) {
            const compare = (a, b) => {
                if (a.fechacreacion > b.fechacreacion) {
                    return -1;
                }
                if (a.fechacreacion < b.fechacreacion) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
        } else if (ordenarPor == 2) {
            const compare = (a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
            //console.log("DATYYYY : ", productos);
        } else if (ordenarPor == 3) {
            const compare = (a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
        } else if (ordenarPor == 0) {
            /*
            const compare = (a, b) => {
                if (a.fechacreacion > b.fechacreacion) {
                    return -1;
                }
                if (a.fechacreacion < b.fechacreacion) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
            */
        }

        let filtprecio = [];
        for (var i = 0; i < productos.length; i++) {
            if (
                productos[i].price >= precioFiltroMinimo &&
                productos[i].price <= precioFiltroMaximo
            ) {
                if (productos[i].genericos != "productosgenericos") {
                    filtprecio.push(productos[i]);
                } else {
                    filtprecio.push(productos[i]);
                    longitud = 10;
                }
            }
        }

        let filtpreciodos = [];

        for (var i = 0; i < productoscategoria.length; i++) {
            if (
                productoscategoria[i].price >= precioFiltroMinimo &&
                productoscategoria[i].price <= precioFiltroMaximo
            ) {
                if (productoscategoria[i].genericos != "productosgenericos") {
                    filtpreciodos.push(productoscategoria[i]);
                } else {
                    filtpreciodos.push(productoscategoria[i]);
                    longitud = 10;
                }
            }
        }

        productos = filtprecio;
        productcategory = filtpreciodos;

        if (selectGrid == 1) {
            basePrecios = productos;
            productcategory = withGrid(productcategory, loading, 4);
            products = withGrid(productos, loading, 4);
            let numreg = filtpreciodos.length;
            //console.log("PRODRC : ", productos);
            //console.log("CATEGOR : ", productcategory)
            controlItem = numreg;
            //console.log("CONTROLITEM : ", numreg)
        } else if (selectGrid == 2) {
            basePrecios = productos;
            productcategory = withListMaximize(productcategory, loading, 4);
            products = withListMaximize(productos, loading, 4);
            let numreg = filtpreciodos.length;
            //console.log("CONTROLITEM : ", numreg)
            controlItem = numreg;
        } else if (selectGrid == 3) {
            basePrecios = productos;
            productcategory = withList(productcategory, loading, 4);
            products = withList(productos, loading, 4);
            let numreg = filtpreciodos.length;
            controlItem = numreg;
            //console.log("CONTROLITEM : ", numreg)
        } else {
            basePrecios = productos;
            productcategory = withGrid(productcategory, loading, 4);
            products = withGrid(productos, loading, 4);
            let numreg = filtpreciodos.length;
            controlItem = numreg;
            //console.log("CONTROLITEM : ", numreg)
        }
    } else {
        products = <p>Producto no encontrado.</p>;
    }

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
    }, [basePrecios, dataFind, selectGrid]);

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

    const cerrarFiltros = () => {
        setPrecioFiltroMinimo(1);
        setPrecioFiltroMaximo(10000000);

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
        if (citySelected.length > 0 && filtroCond > 0) {
            setClassCity("colorxcerrarfiltro apuntador");
            setClassCondicion("mt-60 mlmenos35");
            setClassCitySel("");
        } else {
            setClassCondicion("mt-60 mlmenos230");
            setClassCity("colorxcerrarfiltrodos apuntador");
            setClassCitySel("mlmenos50");
        }
    }, [citySelected, filtroCond]);

    useEffect(() => {
        // Reiniciar todos los filtros por nueva busqueda //
        cerrarFiltros();
        if (dataFind) {
            if (dataFind.length != dataProd.length) dataProd = dataFind;
        }
    }, [dataFind]);

    const SelectCondition = (item) => {
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

    const regresarContactanos = () => {
        setDataSearch(false);
    };

    //console.log("DATA PRD : ", dataProd, "PRDITEM : ", productItems);

    return (
        <div className="ps-page ps-page--shopping mlmenos50">
            <div className="container" id="section-1">
                <div className="ps-page__header">
                    <BreadCrumb breacrumb={breadcrumb} />
                    <br />
                    {holder == 0 ? (
                        <div className="mtmenos30">
                            <Grid container spacing={1}>
                                <Grid item xs={1} md={1} lg={1}>
                                    <div
                                        className="iconoreturncontactresult"
                                        onClick={() => regresarContactanos()}>
                                        <ArrowBackIcon
                                            className="ml-2 mtmenos37"
                                            style={{ fontSize: 35 }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={11} md={11} lg={11}>
                                    <div className="textoresultprodcontact">
                                        ({dataProd.length}) Resultado de la
                                        búsqueda: “{datafindcontact}”
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ) : resultFind == "" ||
                      !resultFind ||
                      !keyword ||
                      activaCiudad ||
                      !activaCiudad ||
                      actCity ? (
                        <a className="textoresultprod mlmenos60 ps-page__heading">
                            ({dataProd.length}) Resultado de la búsqueda: “
                            {nombreres}”
                        </a>
                    ) : keyword != resultFind ||
                      activaCiudad ||
                      !activaCiudad ||
                      actCity ? (
                        <a className="textoresultprod mlmenos60 ps-page__heading">
                            ({dataProd.length}) Resultado de la búsqueda: “
                            {resultFind}”
                        </a>
                    ) : (
                        <a className="textoresultprod mlmenos60 ps-page__heading">
                            ({dataProd.length}) Resultado de la búsqueda: “
                            {keyword}”
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
                                                <Grid item xs={8} md={8} lg={8}>
                                                    <a className="">Nuevo</a>
                                                </Grid>
                                                <Grid item xs={1} md={1} lg={1}>
                                                    <a
                                                        className="colorxcerrarfiltro apuntador"
                                                        onClick={() =>
                                                            SelectCondition(1)
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
                                                <Grid item xs={8} md={8} lg={8}>
                                                    <a className="">Usado</a>
                                                </Grid>
                                                <Grid item xs={1} md={1} lg={1}>
                                                    <a
                                                        className="colorxcerrarfiltro apuntador"
                                                        onClick={() =>
                                                            SelectCondition(2)
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

                        <Grid item xs={9} md={9} lg={9} className="mlmenos4">
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
                                                        citySelected[0].idciu
                                                    )
                                                }>
                                                <div className={classCity}>
                                                    X
                                                </div>
                                            </a>
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : citySelected.length == 2 ? (
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
                                                        citySelected[0].idciu
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
                                                        citySelected[1].idciu
                                                    )
                                                }>
                                                <div className={classCity}>
                                                    X
                                                </div>
                                            </a>
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : citySelected.length == 3 ? (
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
                                                        citySelected[0].idciu
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
                                                        citySelected[1].idciu
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
                                                        citySelected[2].idciu
                                                    )
                                                }>
                                                <div className={classCity}>
                                                    X
                                                </div>
                                            </a>
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : citySelected.length == 4 ? (
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
                                                        citySelected[0].idciu
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
                                                        citySelected[1].idciu
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
                                                        citySelected[2].idciu
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
                                                        citySelected[3].idciu
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

                <div className="ps-page__content mlmenos45">
                    <div className="ps-layout--with-sidebar">
                        <div className="ps-layout__left">
                            <SidebarShopResults
                                filtrarciud={filtrarciud}
                                prdfiltrados={prdfiltrados}
                                setCantidadPrdCiudad={setCantidadPrdCiudad}
                                setActivar={setActivar}
                                cantidadPrdCiudad={cantidadPrdCiudad}
                                PrdCiudadUno={PrdCiudadUno}
                                PrdCiudadDos={PrdCiudadDos}
                                menorprecio={menorprecio}
                                mayorprecio={mayorprecio}
                                setMenorPrecio={setMenorPrecio}
                                setMayorPrecio={setMayorPrecio}
                                precioFiltroMinimo={precioFiltroMinimo}
                                setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                                precioFiltroMaximo={precioFiltroMaximo}
                                setPrecioFiltroMaximo={setPrecioFiltroMaximo}
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
                                filtroPrecio={filtroPrecio}
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
                                            <div
                                                className="regresaracontactanos"
                                                onClick={() =>
                                                    regresarContactanos()
                                                }>
                                                No encontré el producto que
                                                busco
                                            </div>
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

                                <div className="mtmenos20">
                                    {productos.length > 0 ? (
                                        <div className={activar}>
                                            <ShopSearch classes="ps-shop--grid">
                                                {products}
                                            </ShopSearch>
                                        </div>
                                    ) : null}
                                </div>

                                {productcategory ? (
                                    <div>
                                        <div className="infoprodgenericos">
                                            ** Estos productos son recomendados
                                            para ti, pero pueden no coincidir
                                            exactamente con tu búsqueda **{" "}
                                        </div>
                                        <div className="mt-20">
                                            <ShopSearch classes="ps-shop--grid">
                                                {productcategory}
                                            </ShopSearch>
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
                            <PromotionSecureInformation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchContact;
