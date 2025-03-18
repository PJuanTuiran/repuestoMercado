import React, { useEffect, useState } from "react";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import WidgetShopByRating from "~/components/shared/widgets/WidgetShopByRating";
import WidgetShopFilterByConditionsSearch from "~/components/shared/widgets/WidgetShopFilterByConditionsSearch";
import WidgetShopRelatedProductsSearch from "~/components/shared/widgets/WidgetShopRelatedProductsSearch";
import WidgetShopByLocationSearch from "~/components/shared/widgets/WidgetShopByLocationSearch";
import WidgetFilterByPriceRangeSearch from "~/components/shared/widgets/WidgetFilterByPriceRangeSearch";
import { getCitySelect } from "../../../store/cityselect/action";
import { getSelectCondition } from "../../../store/selectcondition/action";
import { useSelector, useDispatch } from "react-redux";

let ciudadesselAlt = [];

const SidebarShopInteractiveSearch = (props) => {
    const dispatch = useDispatch();
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);
    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(10000000);
    const [condicionPrd, setCondicionPrd] = useState(0);
    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [margen, setMargen] = useState("");
    const [classContainer, setClassContainer] = useState(
        "ps-sidebar--shop sizesidebarinteractive"
    );

    const leerciudadesSel = () => {
        let cityselect = JSON.parse(localStorage.getItem("cityselect"));
        dispatch(getCitySelect(cityselect));
        setUpdateData(!updateData)
        //console.log("CIUDAD : ", cityselect)
    };

    let addedtocart = [0];
    addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);


    let gripselect = 0;
    gripselect = useSelector((state) => state.gripselect.gripselect);

    useEffect(() => {
        let aadditemcar = JSON.parse(localStorage.getItem("aadditemcar"));
        if (aadditemcar) {
            setMargen("marginsuperior");
        } else {
            setMargen("");
        }
    }, [addedtocart]);

    useEffect(() => {
        let conditionselect = JSON.parse(localStorage.getItem("conditionselect"));
        setCondicionPrd(conditionselect);
        if (condicionPrd > 0) {
            setClassContainer("ps-sidebar--shop sizesidebarinteractivedos");
        } else {
            setClassContainer("ps-sidebar--shop sizesidebarinteractive");
        }
    }, [condicionPrd]);

    return (
        <div>
            {
                !viewSearch ?
                    <div className={classContainer}>
                        <div className={margen}></div>
                        <div className="tamañotextonombrefiltro textocolor">Filtros</div>
                        <hr />
                        <div>
                            <WidgetFilterByPriceRangeSearch
                                menorprecio={menorprecio}
                                mayorprecio={mayorprecio}
                                setMenorPrecio={setMenorPrecio}
                                setMayorPrecio={setMayorPrecio}
                                precioFiltroMinimo={precioFiltroMinimo}
                                setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                                precioFiltroMaximo={precioFiltroMaximo}
                                setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                                setFiltroPrecio={setFiltroPrecio}
                                condicionPrd={condicionPrd}
                                updateData={updateData}
                            />
                            <div className="pt-140">
                                <hr />
                                <br />
                                <WidgetShopFilterByConditionsSearch
                                    condicionPrd={condicionPrd}
                                    setCondicionPrd={setCondicionPrd}
                                />

                                <hr />
                                <br />
                                <div onClick={() => leerciudadesSel()}>
                                    <WidgetShopByLocationSearch/>
                                </div>
                                <hr />
                                {gripselect > 1 ? (
                                    <WidgetShopRelatedProductsSearch />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>

    );
};

export default SidebarShopInteractiveSearch;
