import React, { useState, useEffect } from "react";
import conditions from "~/public/static/data/conditions.json";
import { getSelectCondition } from "../../../store/selectcondition/action";
import { useSelector, useDispatch } from "react-redux";

let condicion = [
    { value: 1, name: "Nuevo" },
    { value: 2, name: "Usado" },
];

const WidgetShopFilterByConditionsSearch = (props) => {
    const dispatch = useDispatch();
    const { condicionPrd, setCondicionPrd } = props;
    const [marcarCondicion, setMarcarCondicion] = useState("");
    
    let clearCondition = useSelector(
        (state) => state.clearcondition.clearcondition
    );

    useEffect(() => {
        if (clearCondition == 0) {
            setCondicionPrd(0);
            setMarcarCondicion("");
            localStorage.setItem("conditionselect", JSON.stringify(0));
            dispatch(getSelectCondition(0));
        }
    }, [clearCondition]);

    const SelectCondition = (item) => {
        if (condicionPrd == item) {
            setCondicionPrd(0);
            setMarcarCondicion("");
            localStorage.setItem("conditionselect", JSON.stringify(0));
            dispatch(getSelectCondition(0));
        } else {
            setCondicionPrd(item);
            setMarcarCondicion("subrayartexto");
            localStorage.setItem("conditionselect", JSON.stringify(item));
            dispatch(getSelectCondition(item));
        }
    };

    return (
        <aside>
            <div className="widget-title tamañotextotitulocondicionsearch">
                Condición
            </div>
            {
                console.log("CONDICTION : ", condicion, " - ", condicionPrd)

            }
            <div>
                {condicion &&
                    condicion.map((item, index) => {
                        return (
                            <div className="form-group">
                                <div
                                    className="mtmenos20"
                                    onClick={() => SelectCondition(item.value)}>
                                    {condicionPrd == item.value ? (
                                        <div>
                                            <i
                                                className="tamañoletra11search fa fa-check-square-o colorbase"
                                                aria-hidden="true"></i>
                                            <label
                                                className={marcarCondicion}
                                                htmlFor="five-star">
                                                <span className="ps-rating tamañoletra11search colorbase">
                                                    <a>{item.name} </a>
                                                </span>
                                            </label>
                                        </div>
                                    ) : (
                                        <div>
                                            <i
                                                className="tamañoletra11search fa fa-square-o colorbase"
                                                aria-hidden="true"></i>
                                            <label htmlFor="five-star">
                                                <span className="ps-rating tamañoletra11search colorbase">
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

export default WidgetShopFilterByConditionsSearch;
