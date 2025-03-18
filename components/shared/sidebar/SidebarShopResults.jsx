import React, { useEffect, useState, useRef } from "react";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import WidgetShopByRating from "~/components/shared/widgets/WidgetShopByRating";
import WidgetShopFilterByConditionsResult from "~/components/shared/widgets/WidgetShopFilterByConditionsResult";
import WidgetShopRelatedProductsResults from "~/components/shared/widgets/WidgetShopRelatedProductsResults";
import RelatedProducts from "../../partials/products/RelatedProducts";
import WidgetShopByLocationResult from "~/components/shared/widgets/WidgetShopByLocationResult";
import ModuleShopActionsInteractivo from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import WidgetFilterByPriceRangeResults from "~/components/shared/widgets/WidgetFilterByPriceRangeResults";
import { Box, Grid, Button } from "@mui/material";
import { useRouter } from "next/router";

const SidebarShopResults = (props) => {
    const router = useRouter();

    const {
        filtrarciud,
        prdfiltrados,
        setCantidadPrdCiudad,
        cantidadPrdCiudad,
        setActivar,
        PrdCiudadUno,
        PrdCiudadDos,
        menorprecio,
        mayorprecio,
        setMenorPrecio,
        setMayorPrecio,
        precioFiltroMinimo,
        setPrecioFiltroMinimo,
        precioFiltroMaximo,
        setPrecioFiltroMaximo,
        setSelected,
        marcaSelected,
        setmarcaSelected,
        marcarCondicion,
        setMarcarCondicion,
        condition,
        setCondition,
        numProdRel,
        setActivaCiudad,
        activaCiudad,
        itemSel,
        setitemSel,
        itemSelCond,
        setitemSelCond,
        setFiltroCond,
        filtroCond,
        cerrarFiltro,
        setCerrarFiltro,
        setEraseCitySel,
        eraseCitySel,
        setCitySelected,
        citySelected,
        setIrInicio,
        setActCiy,
        actCity,
        setPaginaSel,
        setitemIni,
        setItemFin,
        setclearFiltroCity,
        setFiltroPrecio,
        longprd,
        dataPrd,
        productItems
    } = props;

    const comprainteractiva = () => {
        if (router.pathname != "/searchinteractive/searchinteractive") {
            router.replace("/searchinteractive/searchinteractive");
            router.push("/searchinteractive/searchinteractive");
        } else {
            router.replace("/searchinteractive/searchinteractive");
            router.push("/searchinteractive/searchinteractive");
            location.reload();
        }
    };

    return (
        <div>
            <div>
                <a className="tamañotextofiltroresult textocolor">Filtros</a>
            </div>
            <Grid
                container
                alignItems="center"
                spacing={1}
                className="cajalinkbuscadorespecial apuntador mb-10"
                onClick={() => comprainteractiva()}>
                <Grid item xs={2} md={2} lg={2}>
                    <a>
                        <i
                            className="iconomotocajalink fa fa-car"
                            aria-hidden="true"></i>
                    </a>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    <p className="textolinkbusacodorespecial">
                        Busca coincidencias
                    </p>
                </Grid>
                <Grid item xs={3} md={3} lg={3} className="mtmenos20">
                    <a>
                        <i
                            className="iconomotocajalink fa fa-motorcycle"
                            aria-hidden="true"></i>
                    </a>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    <p className="textolinkbusacodorespecial mtmenos20">
                        con tu vehículo
                    </p>
                </Grid>
            </Grid>
            <div className="pt-1">
                <hr />
            </div>

            <div className="ml-3 mb-90 mtmenos20">
                <WidgetFilterByPriceRangeResults
                    menorprecio={menorprecio}
                    mayorprecio={mayorprecio}
                    setMenorPrecio={setMenorPrecio}
                    setMayorPrecio={setMayorPrecio}
                    precioFiltroMinimo={precioFiltroMinimo}
                    setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                    precioFiltroMaximo={precioFiltroMaximo}
                    setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                    setFiltroPrecio={setFiltroPrecio}
                    dataPrd={dataPrd}
                    productItems={productItems}
                />
            </div>
            <div>
                <div className="pt-30">
                    <hr />
                    <WidgetShopFilterByConditionsResult
                        marcarCondicion={marcarCondicion}
                        setMarcarCondicion={setMarcarCondicion}
                        condition={condition}
                        setCondition={setCondition}
                        setFiltroCond={setFiltroCond}
                        filtroCond={filtroCond}
                        setitemSelCond={setitemSelCond}
                        itemSelCond={itemSelCond}
                        setActCiy={setActCiy}
                        actCity={actCity}
                        setPaginaSel={setPaginaSel}
                        setitemIni={setitemIni}
                        setItemFin={setItemFin}
                        setIrInicio={setIrInicio}
                    />
                </div>
                <hr />
                <div className="pt-20">
                    <WidgetShopByLocationResult
                        filtrarciud={filtrarciud}
                        cantidadPrdCiudad={cantidadPrdCiudad}
                        PrdCiudadUno={PrdCiudadUno}
                        PrdCiudadDos={PrdCiudadDos}
                        setActivar={setActivar}
                        setSelected={setSelected}
                        marcaSelected={marcaSelected}
                        setmarcaSelected={setmarcaSelected}
                        setActivaCiudad={setActivaCiudad}
                        activaCiudad={activaCiudad}
                        itemSel={itemSel}
                        setitemSel={setitemSel}
                        cerrarFiltro={cerrarFiltro}
                        setCerrarFiltro={setCerrarFiltro}
                        setEraseCitySel={setEraseCitySel}
                        eraseCitySel={eraseCitySel}
                        setCitySelected={setCitySelected}
                        filtroCond={filtroCond}
                        setIrInicio={setIrInicio}
                        setActCiy={setActCiy}
                        actCity={actCity}
                        setPaginaSel={setPaginaSel}
                        setitemIni={setitemIni}
                        setItemFin={setItemFin}
                        setclearFiltroCity={setclearFiltroCity}
                        citySelected={citySelected}
                    />
                   
                    <br />
                    <hr />
                    <div className="pt-20">
                    <WidgetShopRelatedProductsResults numProdRel={numProdRel} />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default SidebarShopResults;
