import React, { useState, useEffect } from "react";
import conditions from "~/public/static/data/conditions.json";
import { getFiltroCondicionPrd } from "../../../store/filtrocondicionprd/action";
import { useDispatch, useSelector } from "react-redux";

let condicion = [
    { value: 1, name: "Nuevo" },
    { value: 2, name: "Usado" },
];

const WidgetShopFilterByConditionsResult = (props) => {
    const dispatch = useDispatch();

    const {
        marcarCondicion,
        setMarcarCondicion,
        condition,
        setCondition,
        setFiltroCond,
        filtroCond,
        itemSelCond,
        setitemSelCond,
        setActCiy,
        setPaginaSel,
        setitemIni,
        setItemFin,
        setIrInicio,
    } = props;

    const filtroprd = useSelector((state) => state.filtrocondicionprd.filtrocondicionprd);

    /*
    useEffect(() => {
        if (filtroprd == 1) {
            let filtrocondicionprd = JSON.parse(
                localStorage.getItem("filtrocondicionprd")
            );
            SelectCondition(filtrocondicionprd);
        }
    }, [filtroprd]);
    */

    useEffect(() => {
        let filtrocondicionprd = JSON.parse(localStorage.getItem("filtrocondicionprd"));
        setFiltroCond(filtrocondicionprd);
    }, [filtroprd]);
    
    const SelectCondition = (item) => {
        if (filtroCond == 1 && item == 1) {
            localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
            dispatch(getFiltroCondicionPrd(0));
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setActCiy(true);
            setPaginaSel(1);
            setitemIni(1);
            setItemFin(40);
        } else if (filtroCond == 2 && item == 2) {
            localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
            dispatch(getFiltroCondicionPrd(0));
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setActCiy(true);
            setPaginaSel(1);
            setitemIni(1);
            setItemFin(40);
        } else {
            localStorage.setItem("filtrocondicionprd", JSON.stringify(item));
            dispatch(getFiltroCondicionPrd(item));
            setActCiy(true);
            setCondition(item);
            setitemSelCond(item);
            setFiltroCond(item);
            setMarcarCondicion("subrayartexto");
            setIrInicio(true);
            setPaginaSel(1);
            setitemIni(1);
            setItemFin(40);
        }
    };

    console.log("ITEM SEL CON : ", filtroprd);

    return (
        <aside>
            <div className="widget-title tamañotextotitulocondicion">
                Condición
            </div>
            <div>
                {condicion &&
                    condicion.map((item, index) => {
                        return (
                            <div className="form-group">
                                <div
                                    className="mtmenos20"
                                    onClick={() => SelectCondition(item.value)}>
                                    {item.value == filtroCond ? (
                                        <div>
                                            <i
                                                className="tamañoletra11 fa fa-check-square-o colorbase"
                                                aria-hidden="true"></i>
                                            <label
                                                className={marcarCondicion}
                                                htmlFor="five-star">
                                                <span className="ps-rating tamañoletra11 colorbase">
                                                    <a>{item.name} </a>
                                                </span>
                                            </label>
                                        </div>
                                    ) : (
                                        <div>
                                            <i
                                                className="tamañoletra11 fa fa-square-o colorbase"
                                                aria-hidden="true"></i>
                                            <label htmlFor="five-star">
                                                <span className="ps-rating tamañoletra11 colorbase">
                                                    <a>{item.name} </a>
                                                </span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </aside>
    );
};

export default WidgetShopFilterByConditionsResult;
