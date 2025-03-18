import React, { useEffect, useState } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroupInteractive";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getClearLocation } from "../../store/clearlocation/action";
import { getClearCondition } from "../../store/clearcondition/action";
import { getCitySelect } from "../../store/cityselect/action";
import { Box, Grid, Button } from "@mui/material";

const ViewFilterSelect = (props) => {
    const {
        classSearch,
        setclassSearch,
        eraseCitySel,
        setEraseCitySel,
        citySelected,
        setCitySelected,
        filtroCond,
        setFiltroCond,
        condition,
        setCondition,
        marcarCondicion,
        setMarcarCondicion,
        itemSelCond,
        setitemSelCond,
        classCity,
        setClassCity,
        classCitySel,
        setClassCitySel,
        maximizarOption,
        optionSelect
    } = props;

    const dispatch = useDispatch();
    const Router = useRouter();
    const { keyword } = Router.query;

    const { loading, productItems, getProducts } = useGetProducts();
    let dataCitySelect = useSelector((state) => state.cityselect.cityselect);
    //console.log("QUE BUSCA : ", dataCitySelect);
    
    const [classCondicion, setClassCondicion] = useState("ml-0 mt-10 mb-0");
    const [classCerrarFiltr, setClassCerrarFiltr] = useState("colorxcerrarfiltrotres");
    const condicionPrd = useSelector(
        (state) => state.selectcondition.selectcondition
    );
    const rangoPrd = useSelector((state) => state.rangosprecio.rangosprecio);
    const changesearchprice = useSelector(
        (state) => state.changesearchprice.changesearchprice
    );

    //className="ps-page ps-page--shopping"

    const { withGrid } = useProductGroup();

    useEffect(() => {
        let conditionselect = JSON.parse(localStorage.getItem("conditionselect"));
        setFiltroCond(conditionselect);
    }, []);

    useEffect(() => {
        setCitySelected(dataCitySelect);
        if(dataCitySelect?.length == 0){
            localStorage.setItem("activafiltrociudad", JSON.stringify(false));
        }
    }, [dataCitySelect]);

    const SelectCondition = (item) => {
        if (item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(1));
        } else if (item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(2));
        } else {
            setCondition(item);
            dispatch(getClearCondition(0));
            //setitemSel(item);
            setFiltroCond(item);
            //setMarcarCondicion("subrayartexto");
        }
    };

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

        localStorage.setItem("cityselect", JSON.stringify(citysel));
        dispatch(getCitySelect(citysel));

        if (citysel.length > 0) {
            dispatch(getClearLocation(1));
        } else if (citysel.length == 0) {
            dispatch(getClearLocation(0));
        }
        //console.log("RESTA CIDU : ", citysel);
    };

    return (
        <div className={`${classSearch}`}>
            {maximizarOption > 0 ? (
                <Grid container spacing={1}>
                    <Grid item xs={2} md={2} lg={2}>
                        {filtroCond > 0 ? (
                            <div className="mlmenos75">
                                {filtroCond == 1 ? (
                                    <div className="textocdnsearchinteractive">
                                        <Grid
                                            container
                                           
                                            spacing={1}>
                                            <Grid item xs={8} md={8} lg={8}>
                                                <a className="">Nuevo</a>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    className="colorxcerrarfiltro apuntador"
                                                    onClick={() =>
                                                        SelectCondition(0)
                                                    }>
                                                    {" X "}
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : filtroCond == 2 ? (
                                    <div className="mlmenos35 textocdnsearchinteractive">
                                        <Grid
                                            container
                                            spacing={1}>
                                            <Grid item xs={8} md={8} lg={8}>
                                                <a className="">Usado</a>
                                            </Grid>
                                            <Grid item xs={1} md={1} lg={1}>
                                                <a
                                                    className="colorxcerrarfiltro apuntador"
                                                    onClick={() =>
                                                        SelectCondition(0)
                                                    }>
                                                    {" X "}
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </Grid>
                    {
                        console.log("citySelected : ", citySelected)
                    }

                    {citySelected.length > 0 && filtroCond > 0 ? (
                        <Grid item xs={9} md={9} lg={9} className="mlmenos25">
                            {citySelected.length == 1 ? (
                                <div className={classCondicion}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={2} md={2} lg={2}>
                                            <div className="tamañotextociudadeselectcuatro">
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
                                                 <div className="filtercityuno">
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
                                            <div className="tamañotextociudadeselectcuatro">
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
                                                 <div className="filtercityuno">
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
                                            <div className="tamañotextociudadeselectocho">
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
                                                <div className="filtercitydos">
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
                                            <div className="tamañotextociudadeselectcuatro">
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
                                                 <div className="filtercityuno">
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
                                            <div className="tamañotextociudadeselectocho">
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
                                                 <div className="filtercitydos">
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
                                            <div className="tamañotextociudadeselectnueve">
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
                                                 <div className="filtercitytres">
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
                                            <div className="tamañotextociudadeselectcuatro">
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
                                                <div className="filtercityuno">
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
                                            <div className="tamañotextociudadeselectocho">
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
                                               <div className="filtercitydos">
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
                                            <div className="tamañotextociudadeselectnueve">
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
                                               <div className="filtercitytres">
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
                                            <div className="tamañotextociudadeselectdiez">
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
                                                <div className="filtercitycuatro">
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
                    ) : (
                        <Grid item xs={9} md={9} lg={9} className="mlmenos115">
                            <div className="mlmenos100">
                                {citySelected.length == 1 ? (
                                    <div className={classCondicion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <div className="tamañotextociudadeselectcuatro">
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
                                                    <div className="colorxcerrarfiltrotres">
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
                                                <div className="tamañotextociudadeselectcinco">
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
                                                     <div className="colorxcerrarfiltrocuatro">
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
                                                 <div className="tamañotextociudadeselectcinco">
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
                                                    <div className="colorxcerrarfiltrocuatro">
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
                                                <div className="tamañotextociudadeselectcuatro">
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
                                                    <div className="colorxcerrarfiltrocuatro">
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
                                                <div className="tamañotextociudadeselectcinco">
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
                                                   <div className="colorxcerrarfiltrocuatro">
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
                                                <div className="tamañotextociudadeselectseis">
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
                                                     <div className="colorxcerrarfiltrocinco">
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
                                                <div className="tamañotextociudadeselectcuatro">
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
                                                    <div className="colorxcerrarfiltrotres">
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
                                                <div className="tamañotextociudadeselectcinco">
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
                                                    <div className="colorxcerrarfiltrocuatro">
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
                                                <div className="tamañotextociudadeselectseis">
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
                                                    <div className="colorxcerrarfiltrocinco">
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
                                                <div className="tamañotextociudadeselectsiete">
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
                                                   <div className="colorxcerrarfiltroseis">
                                                        X
                                                    </div>
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : (
                                    <div className="mtmenos80"></div>
                                )}
                            </div>
                        </Grid>
                    )}
                </Grid>
            ) : null}
        </div>
    );
};

export default ViewFilterSelect;
