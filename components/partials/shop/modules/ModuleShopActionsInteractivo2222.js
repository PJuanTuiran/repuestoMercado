import React, { useState } from "react";
import ModuleShopSortBy from "~/components/partials/shop/modules/ModuleShopSortBy";
import ModuleShopPaginationRange from "~/components/partials/shop/modules/ModuleShopPaginationRange";
import WidgetFilterByPriceRangeInteractive from "~/components/shared/widgets/WidgetFilterByPriceRangeInteractive";
import { Box, Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import imagenbarra from "../../../../public/static/img/icon/bars.svg";
//import imagenbarra from "../../public/static/img/icon/bars.svg";
import imagenfoto from "../../../../public/static/img/icon/gird2.svg";

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

const ModuleShopActionsInteractivo = (props) => {
    const {
        setOptionSelect,
        optionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom
    } = props;

    const [selectedLayout, setSelectedLayout] = useState(layoutItems[3]);
    const Router = useRouter();
    const [selectItem, setSelectItem] = useState("botonheaderinteractivoderecha");
    const [selectPhoto, setSelectPhoto] = useState("botonheaderinteractivoderecha mlmenos20");
    const [selectMaximizar, setSelectMaximizar] = useState("botonheaderinteractivoderecha mlmenos35");
    const [datosBuscar, setDatosBuscar] = useState("");

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

    const MostrarItems = () => {
        setOptionSelect(1);
        setSelectItem("botonheaderinteractivoderechaselect mlmenos5");
        setSelectPhoto("botonheaderinteractivoderecha mlmenos20 colornoseleccion");
        setMaximizarOption(1);
    };

    const MostrarFotos = () => {
        setOptionSelect(2);
        setSelectPhoto("botonheaderinteractivoderechaselect mlmenos20");
        setSelectItem("botonheaderinteractivoderecha colornoseleccion");
        setMaximizarOption(2);

    };

    const MostrarFotosItems = () => {
        setOptionSelect(3);
        setSelectPhoto("botonheaderinteractivoderechaselect mlmenos20");
        setSelectItem("botonheaderinteractivoderecha colornoseleccion");
        setMaximizarOption(3);

    };

    const maximizar = () => {
        if (maximizarOption === 0) {
            if (optionSelect === 1) setMaximizarOption(1);
            else if (optionSelect === 2) setMaximizarOption(2);
            //setZoom(true);
        }
    };

    const minimizar = () => {
        if (maximizarOption != 0) {
            setMaximizarOption(0);
            setSelectPhoto("botonheaderinteractivoderecha mlmenos20");
            setSelectItem("botonheaderinteractivoderecha");
            setSelectMaximizar("botonheaderinteractivoderecha mlmenos35")
            //setZoom(false);
        }
    };

    const tituloOnChange = (e) => {
        var strLength = e.length;
        setDatosBuscar(e);
    };

    function handleSubmit(e) {
        console.log("ON CLICK : ", datosBuscar);
    }

    //{swichersItemsView}
    /*
mt-20 mlmenos20 tamañoiconosheadershopzoom posicioniconosheadershopzoom
mt-20 mlmenos20 tamañoiconosheadershopzoom posicioniconosheadershopzoom
mlmenos20 tamañoiconosheadershopzoom posicioniconosheadershopzoom
    */
    return (
        <div className="ps-shop__actions">
            <div className="ps-shop__actions-left">
                <div className="">
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={1} md={1} lg={1}>
                            <div className="mlmenos250">
                                <WidgetFilterByPriceRangeInteractive />
                            </div>
                        </Grid>
                        <Grid item xs={5} md={5} lg={5}>
                            <Grid container alignItems="center" spacing={1}
                                className="mlmenos60"
                            >
                                <Grid item xs={1} md={1} lg={1}>
                                    <img
                                        onClick={() => MostrarItems()}
                                        className="tamañoimgheadershopzoom"
                                        src={imagenbarra.src} />
                                </Grid>
                                <Grid item xs={1} md={1} lg={1}>
                                    <img
                                        onClick={() => MostrarFotos()}
                                        className="ml-1 tamañoimgheadershopzoom"
                                        src={imagenfoto.src} />
                                </Grid>
                                <Grid item xs={1} md={1} lg={1}>
                                    <div
                                        className="ml-1 tamañoiconosheadershopzoom"
                                        onClick={() => MostrarFotosItems()}
                                    >
                                        <i className="fa fa-th-list" aria-hidden="true"></i>
                                    </div>
                                </Grid>
                                <Grid item xs={1} md={1} lg={1}>
                                    <div
                                        className="ml-3 tamañoiconosheadershopzoom"
                                        onClick={() => minimizar()}
                                    >
                                        <i

                                            className="fa fa fa-compress"
                                            aria-hidden="true"></i>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}>

                            <div className="input-group tamanoinputbuscar">
                                <input
                                    className="form-control  
                                       ps-form__input colorbuscador sinborder textocolor"
                                    //name={datosBuscar}
                                    onChange={(e) => tituloOnChange(e.target.value)}
                                    type="text"
                                />
                                <div className="input-group-append colorbuscador">
                                    <a href="#" onClick={(e) => handleSubmit(e)}>
                                        <i className="ml-10 fa fa-search"></i>
                                    </a>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}>
                            <div className="ml-100">
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <ModuleShopSortBy />
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <ModuleShopPaginationRange />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>


            </div>

        </div>
    );
};

export default ModuleShopActionsInteractivo;
