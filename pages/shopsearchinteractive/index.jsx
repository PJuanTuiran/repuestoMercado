import React, { useEffect, useState } from "react";
import ShopSearchInterative from "~/components/partials/shop/ShopSearchInterative";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupInteractive from "~/hooks/useProductGroupInteractive";
import ShopInteractivoHeader from "../search/shopinteractivoheader";

import { getUbicarProducto } from "../../store/ubicarproducto/action";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";
import CustomPaginationSearch from "../../components/elements/basic/CustomPaginationSearch";
import ShopSearchInterativeItems from "../../components/partials/shop/ShopSearchInterativeItems";
import ShopSearchInterativeItemsNoPage from "../../components/partials/shop/ShopSearchInterativeItemsnopage";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },
    {
        id: 2,
        text: "Shop",
    },
];

let data = [];

const ShopScreen = (props) => {
    const {
        setOptionSelect,
        optionSelect,
        maximizarOption,
        setMaximizarOption,
        zoom,
        setZoom,
    } = props;
    //console.log("TIPO DISPLAY : ", optionSelect);
    //console.log("DISPLAY MAXIMIZAR: ", maximizarOption);

    const { loading, productItems, getProducts } = useGetProducts();
    const [mostrarZoom, setMostrarZoom] = useState("mt-15 col-md-5");
    const [ajustarCaja, setAjustarCaja] = useState("ml-0");
    const [datos, setDatos] = useState([]);
    const [actualiza, setActualiza] = useState(false);
    const [palabra, setPalabra] = useState("a");
    const [orderPrice, setOrderPrice] = useState(0);

    const [itemIni, setitemIni] = useState(1);
    const [itemFin, setItemFin] = useState(40);

    const { withGrid, withList } = useProductGroupInteractive();
    const dispatch = useDispatch();
    const Router = useRouter();
    const { query } = Router;
    let products = [];
    let productsgen = [];

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const paginaselect = useSelector(
        (state) => state.pageselect.pageselect
    );

    useEffect(() => {
        if (optionSelect == 1) setAjustarCaja("ml-2 ps-layout__right");
        else setAjustarCaja("ml-8 ps-layout__right");

        let dat = JSON.parse(localStorage.getItem("dataselectsearch"));

        let data = dat.nombremarca + " " + dat.nombremodelo;

        let keyword1 = data.toLowerCase();
        let keyword2 = keyword1.replace(",", "");

        let datfind = keyword2;
        const queries = {
            name_contains: keyword2,
        };

        getProducts(queries);
    }, [optionSelect]);

    useEffect(() => {
        dispatch(getUbicarProducto(maximizarOption));

        if (maximizarOption != 0)
            setMostrarZoom("maximizarbusquedaitems mt-15 col-md-5");
        else setMostrarZoom("mt-15 col-md-5");
    }, [optionSelect, maximizarOption]);

    useEffect(() => {
        if (!palabra) {
            if (productItems && productItems.length > 0) setDatos(productItems);
        }
    }, [palabra]);

    if (productItems && productItems.length > 0) {
        if (orderPrice == 1) {
            const compare = (a, b) => {
                if (b.price > a.price) {
                    return -1;
                }
                if (b.price < a.price) {
                    return 1;
                }
                return 0;
            };

            if (productItems.length > 0) productItems.sort(compare);

            //console.log("ORDENADOS : ", menorAmayor);
        } else if (orderPrice == 2) {
            const compare = (a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            };

            if (productItems.length > 0) productItems.sort(compare);
        }

        // console.log("XXXXXX : ", productItems)

        if (query) {
            if (datos.length > 0) {
                data = [];
                //products = [];
                data = datos;
                if (orderPrice > 0) {
                    if (orderPrice == 1) {
                        const compare = (a, b) => {
                            if (b.price > a.price) {
                                return -1;
                            }
                            if (b.price < a.price) {
                                return 1;
                            }
                            return 0;
                        };
                        if (data.length > 0) data.sort(compare);
                        //console.log("ORDENADOS : ", menorAmayor);
                    } else if (orderPrice == 2) {
                        const compare = (a, b) => {
                            if (a.price > b.price) {
                                return -1;
                            }
                            if (a.price < b.price) {
                                return 1;
                            }
                            return 0;
                        };

                        if (data.length > 0) data.sort(compare);
                    }
                }
                console.log("OPTIONS DTA : ", data);
                //products = withList(data, loading, 4);
                if (optionSelect === 1) {
                    products = withList(data, loading, 4);
                } else if (optionSelect === 2) {
                    products = withGrid(data, loading, 4);
                } else {
                    products = withList(data, loading, 4);
                }
                data = [];
            } else {
                if (query.layout === "list") {
                    console.log("OPTIONS list : ", productItems);
                    products = withList(productItems, loading, 4);
                } else if (query.layout === "grid") {
                    console.log("OPTIONS QUERRY : ", productItems);

                    products = withGrid(productItems, loading, 4);
                    switch (query.columns) {
                        case "2":
                            products = withGrid(productItems, loading, 2);
                            break;
                        case "3":
                            products = withGrid(productItems, loading, 3);
                            break;
                        default:
                            products = withGrid(productItems, loading, 4);
                            break;
                    }
                } else {
                    let norepeat = [];
                    let array = [];
                    let arraygen = [];
                    let longitem = productItems.length;

                    let numpag = (longitem / 25 + 0.5).toFixed(0);
                    let arraypg = [];

                    for (var i = 1; i <= numpag; i++) {
                        arraypg.push(i);
                    }

                    let itemsIni = 0;
                    let itemsFin = 25;

                    if (paginaselect == 1) {
                        itemsIni = 0;
                        itemsFin = 25;
                    } else if (paginaselect == 2) {
                        itemsIni = 25;
                        itemsFin = 50;
                    } else if (paginaselect == 3) {
                        itemsIni = 51;
                        itemsFin = 75;
                    } else if (paginaselect == 4) {
                        itemsIni = 75;
                        itemsFin = 100;
                    } else if (paginaselect == 5) {
                        itemsIni = 101;
                        itemsFin = 125;
                    } else if (paginaselect == 6) {
                        itemsIni = 126;
                        itemsFin = 150;
                    } else if (paginaselect == 7) {
                        itemsIni = 151;
                        itemsFin = 175;
                    } else if (paginaselect == 8) {
                        itemsIni = 175;
                        itemsFin = 200;
                    } else if (paginaselect == 9) {
                        itemsIni = 201;
                        itemsFin = 225;
                    } else if (paginaselect == 9) {
                        itemsIni = 226;
                        itemsFin = 250;
                    }

                    dispatch(getNumberPages(arraypg));
                    productItems &&
                        productItems.map((row, index) => {
                            let validar;
                            validar = norepeat.includes(row.name);
                            if (!validar) {
                                if (index >= itemsIni && index <= itemsFin) {
                                    norepeat.push(row.name);
                                    if (row.productogenerico == "No") {
                                        array.push(row);
                                    } else {
                                        arraygen.push(row);
                                    }
                                }
                            }
                        });

                    if (array.length > 0) {
                        if (optionSelect === 1) {
                            products = withList(array, loading, 4);
                        } else if (optionSelect === 2) {
                            products = withGrid(array, loading, 4);
                        } else {
                            products = withList(array, loading, 4);
                        }
                    }
                    
                    if (arraygen.length > 0) {
                        if (optionSelect === 1) {
                            productsgen = withList(arraygen, loading, 4);
                        } else if (optionSelect === 2) {
                            productsgen = withGrid(arraygen, loading, 4);
                        } else {
                            productsgen = withList(arraygen, loading, 4);
                        }
                    }

                }
            }
        }
    } else {
        products = withGrid(productItems, loading, 4);
    }

    const contactanos = () => {
        alert("Formulario en desarrollo");
    };

    useEffect(() => {
        if (actualiza) {
            setActualiza(false);
            setDatos([]);
            //alert(palabra);
            //let palabra = "Alternador CX5";
            let nvoprod = [];
            productItems &&
                productItems.map((row, index) => {
                    let nombre = row.name.toLowerCase();
                    let item = {
                        minusculas: nombre,
                        normal: row.name,
                    };
                    nvoprod.push(item);
                });

            let palabraminuscula = palabra.toLowerCase();

            let arr = [];
            if (palabra != "a") {
                arr = palabraminuscula.split(" ");
            } else {
                arr.push("a");
                arr.push("A");
            }
            let datosselect = [];
            arr &&
                arr.map((row, index) => {
                    nvoprod &&
                        nvoprod
                            .filter((item) => item.minusculas.includes(row))
                            .map((filtered) => datosselect.push(filtered));
                });

            //let mayusculas = palabra; //.toUpperCase();
            let fitrodatos = [];
            let primerapalabra = "";
            let long = productItems.length;

            datosselect &&
                datosselect.map((row, index) => {
                    for (var i = 0; i < long; i++) {
                        if (productItems[i].name == row.normal) {
                            fitrodatos.push(productItems[i]);
                            break;
                        }
                    }
                });

            setDatos(fitrodatos);
            setActualiza(false);
        } else if (orderPrice > 0 && datos.length > 0) {
            setActualiza(false);
            let data = datos;
            setDatos([]);

            if (orderPrice == 2) {
                const compare = (a, b) => {
                    if (b.price > a.price) {
                        return -1;
                    }
                    if (b.price < a.price) {
                        return 1;
                    }
                    return 0;
                };

                if (data.length > 0) data.sort(compare);
                //console.log("ORDENADOS : ", menorAmayor);
            } else if (orderPrice == 1) {
                const compare = (a, b) => {
                    if (a.price > b.price) {
                        return -1;
                    }
                    if (a.price < b.price) {
                        return 1;
                    }
                    return 0;
                };

                if (data.length > 0) data.sort(compare);
            }

            setDatos(data);
            setActualiza(false);
        }
    }, [actualiza, orderPrice]);

    return (
        <div>
            {maximizarOption != 0 ? (
                <div className="row mt-2 mbmenos10 botonresultadobusqueda">
                    <div className="col-md-10">
                        <h1 className="titulocantidadproductossearchlist ">
                            (
                            {productItems && productItems.length > 0
                                ? productItems.length
                                : 0}
                            ) Productos resultado de tu busqueda:{" "}
                            {datosbuscadorinteractivo.nombrecarroceria}
                            {";"}
                            {datosbuscadorinteractivo.nombremarca}
                            {" - "}
                            <a className="textocolorgris">
                                Si no encuentras lo que buscas:
                            </a>
                        </h1>
                    </div>
                    <div
                        className="mt-2 mlmenos15 botoncontactanos col-md-2"
                        onClick={() => contactanos()}>
                        Contáctanos
                    </div>
                </div>
            ) : null}
            <div className={mostrarZoom}>
                <div className="ml-10">
                    <ShopInteractivoHeader
                        optionSelect={optionSelect}
                        setOptionSelect={setOptionSelect}
                        maximizarOption={maximizarOption}
                        setMaximizarOption={setMaximizarOption}
                        zoom={zoom}
                        setZoom={setZoom}
                        setActualiza={setActualiza}
                        setPalabra={setPalabra}
                        setOrderPrice={setOrderPrice}
                    />
                </div>
            </div>
            <div className="ps-page__content">
                <Row>
                    <Col xs={3} sm={3} md={9} lg={12}>
                        <div className={ajustarCaja}>
                            <ShopSearchInterativeItemsNoPage classes="ps-shop--grid">
                                {products}
                            </ShopSearchInterativeItemsNoPage>
                        </div>
                        <div className="mtmenos30 ml-20 mb-10">
                            <div className="infoprodgenericos4">
                                ** Estos productos son recomendados
                                para ti,
                            </div>

                            <div className="infoprodgenericos5">
                                pero pueden no coincidir
                                exactamente con tu búsqueda **{" "}
                            </div>
                        </div>

                        <div className={ajustarCaja}>
                            <ShopSearchInterativeItems classes="ps-shop--grid">
                                {productsgen}
                            </ShopSearchInterativeItems>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ShopScreen;
