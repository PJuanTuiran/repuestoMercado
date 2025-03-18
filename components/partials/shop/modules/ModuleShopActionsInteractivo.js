import React, { useState, useEffect } from "react";
import SortByPrice from "~/components/partials/shop/modules/SortByPrice";
import ModuleShopPaginationRange from "~/components/partials/shop/modules/ModuleShopPaginationRange";
import { getChangeSearch } from "../../../../store/changesearch/action";
import { useSelector, useDispatch } from "react-redux";
import { getClearCondition } from "../../../../store/clearcondition/action";
import { getAddEdToCart } from "../../../../store/addedtocart/action";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";

const layoutItems = [
    {
        id: 1,
        url: "/shop?layout=list",
        image: "/static/img/icon/bars.svg",
        imageActive: "/static/img/icon/bars.svg",
    },
    {
        id: 2,
        url: "/shop?layout=grid&columns=2",
        image: "/static/img/icon/gird2.svg",
        imageActive: "/static/img/icon/gird2.svg",
    },
    {
        id: 3,
        url: "/shop?layout=grid&columns=3",
        image: "/static/img/icon/gird3.svg",
        imageActive: "/static/img/icon/gird3.svg",
    },
    {
        id: 4,
        url: "/shop?layout=grid&columns=4",
        image: "/static/img/icon/gird4.svg",
        imageActive: "/static/img/icon/gird4.svg",
    },
];

let showItem = "fa fa-bars gripone";
let showPhoto = "fa fa-th-large griptwoselect";
let showItemPhoto = "fa fa-th-list gripthree";

const ModuleShopActionsInteractivo = (props) => {
    const {
        setOptionSelect,
        optionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
        menorprecio,
        setMenorPrecio,
        mayorprecio,
        setMayorPrecio,
        precioFiltroMinimo,
        setPrecioFiltroMinimo,
        precioFiltroMaximo,
        setPrecioFiltroMaximo,
        filtroPrecio,
        setFiltroPrecio,
        orderPrice,
        setOrderPrice,
        datosBuscar,
        setDatosBuscar
    } = props;

    const dispatch = useDispatch();
    const [selectedLayout, setSelectedLayout] = useState(layoutItems[3]);
    const Router = useRouter();
    const [selectItem, setSelectItem] = useState("botonheaderinteractivoderecha");
    const [selectPhoto, setSelectPhoto] = useState("botonheaderinteractivoderecha mlmenos20");
    const [selectMaximizar, setSelectMaximizar] = useState("botonheaderinteractivoderecha mlmenos35");

    useEffect(() => {
        if (optionSelect == 1) {
            showItem = "fa fa-bars griponeselect";
            showPhoto = "fa fa-th-large griptwo";
            showItemPhoto = "fa fa-th-list gripthree";
        } else
            if (optionSelect == 2) {
                showItem = "fa fa-bars gripone";
                showPhoto = "fa fa-th-large griptwoselect";
                showItemPhoto = "fa fa-th-list gripthree";
            }
            else
            if (optionSelect == 3) {
                showItem = "fa fa-bars gripone";
                showPhoto = "fa fa-th-large griptwo";
                showItemPhoto = "fa fa-th-list gripthreeselect";
            }
    }, [optionSelect]);

    //function handleSelecteLayout(e, layout) {
    function handleSelecteLayout(e) {
        let layout = {
            id: 1,
            image: "/static/img/icon/bar.svg",
            imageActive: "/static/img/icon/bars.svg",
            url: "/shop?layout=list"
        }
        //console.log("LAYOU : ", layout)
        e.preventDefault();
        setSelectedLayout(layout);
        Router.push(layout.url, undefined, { scroll: false });
    }

    //console.log("OPTION : ", 'ITEM: ', showItem, 'FOTO: ', showPhoto, 'ITEMFOTO: ', showItemPhoto)
    const MostrarItems = (seleccion) => {
        showItem = "fa fa-bars griponeselect";
        showPhoto = "fa fa-th-large griptwo";
        showItemPhoto = "fa fa-th-list gripthree";
        setOptionSelect(1);
        setSelectItem("botonheaderinteractivoderechaselect mlmenos5");
        setSelectPhoto("botonheaderinteractivoderecha mlmenos20 colornoseleccion");
        setMaximizarOption(1);
    };

    const MostrarFotos = (seleccion) => {
        showItem = "fa fa-bars gripone";
        showPhoto = "fa fa-th-large griptwoselect";
        showItemPhoto = "fa fa-th-list gripthree";

        setOptionSelect(2);
        setSelectPhoto("botonheaderinteractivoderechaselect mlmenos20");
        setSelectItem("botonheaderinteractivoderecha colornoseleccion");
        setMaximizarOption(2);
    };

    const MostrarFotosItems = (seleccion) => {
        showItem = "fa fa-bars gripone";
        showPhoto = "fa fa-th-large griptwo";
        showItemPhoto = "fa fa-th-list gripthreeselect";
        localStorage.setItem("aadditemcar", JSON.stringify(true));
        setOptionSelect(3);
        setSelectPhoto("botonheaderinteractivoderechaselect mlmenos20");
        setSelectItem("botonheaderinteractivoderecha colornoseleccion");
        setMaximizarOption(3);
    };

    const maximizar = () => {
        dispatch(getChangeSearch(0));
        if (maximizarOption === 0) {
            if (optionSelect === 1) setMaximizarOption(1);
            else if (optionSelect === 2) setMaximizarOption(2);
            //setZoom(true);
        }
    };

    const minimizar = () => {
        dispatch(getChangeSearch(0));
        localStorage.setItem("activargrilla",JSON.stringify(0)); 
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        let item = {
            idproducto: 0,
            nombreimagen1: "",
            titulonombre: "",
        };
        localStorage.setItem("addedtocart", JSON.stringify(item));
        dispatch(getAddEdToCart(item));

        if (maximizarOption != 0) {
            setMaximizarOption(0);
            setSelectPhoto("botonheaderinteractivoderecha mlmenos20");
            setSelectItem("botonheaderinteractivoderecha");
            setSelectMaximizar("botonheaderinteractivoderecha mlmenos35")
            dispatch(getClearCondition(0));
            //setZoom(false);
        }
    };

    const tituloOnChange = (e) => {
        var strLength = e.length;
        setDatosBuscar(e);
    };

    function handleSubmit(e) {
        //console.log("ON CLICK : ", datosBuscar);
    }
    //{swichersItemsView}
    return (
        <div className="ps-shop__actions">
            <div className="ps-shop__actions-left">
                {showItem || showPhoto || showItemPhoto ?

                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={1} md={1} lg={1}>
                            <i className={showItem}
                                onClick={() => MostrarItems(1)}
                            ></i>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <i className={showPhoto}

                                onClick={() => MostrarFotos(2)}
                            ></i>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}></Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <i className={showItemPhoto}
                                onClick={() => MostrarFotosItems(3)}
                            ></i>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <div
                                className="tamañoiconosheadershopzoom ml-15 apuntador"
                                onClick={() => minimizar()}
                            >
                                <i
                                    className="fa fa fa-compress"
                                    aria-hidden="true"></i>
                            </div>
                        </Grid>
                    </Grid>
                    :
                    null
                }

                <div className="mlmenos10 tamañobarrasearinteractive ps-search-table-mr-zoom">
                    <div className="input-group tamanoinputbuscar">
                        <input
                            className="colorbuscadorsearchzoom sinborder textocolor"
                            //name={datosBuscar}
                            onChange={(e) => tituloOnChange(e.target.value)}
                            value={datosBuscar}
                            type="text"
                        />
                        <div className="input-group-append colorbuscador">
                            <a href="#" onClick={(e) => handleSubmit(e)}>
                                <i className="mlmenos25 fa fa-search"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div className="ps-shop__actions-right">
                <SortByPrice
                    orderPrice={orderPrice}
                    setOrderPrice={setOrderPrice}
                />
                {
                    //<ModuleShopPaginationRange />
                }
            </div>
        </div>
    );
};

export default ModuleShopActionsInteractivo;
