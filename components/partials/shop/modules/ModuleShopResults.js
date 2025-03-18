import React, { useState, useEffect } from "react";
import ModuleShopSortBy from "~/components/partials/shop/modules/ModuleShopSortBy";
import ModuleShopPaginationRange from "~/components/partials/shop/modules/ModuleShopPaginationRange";
import { getGripSelect } from "../../../../store/gripselect/action";
import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

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

const ModuleShopResults = (props) => {
    const dispatch = useDispatch();
    const {
        setSelectGrid, itemsPaginas, setItemsPaginas, ordenarPor, setOrdenarPor,
        textoOrdenar, setTextoOrdenar } = props;

    const [showItem, setShowItem] = useState("fa fa-bars tamañoiconogridresult mtr-3");
    const [showPhoto, setShowPhoto] = useState("fa fa-th-large tamañoiconogridresult selecticonogrip");
    const [showItemPhoto, setShowItemPhoto] = useState("fa fa-th-list tamañoiconogridresult mtr-3");

    useEffect(() => {
        dispatch(getGripSelect(2));
    }, []);

    const MostrarItems = () => {
        dispatch(getGripSelect(1));
        setSelectGrid(2);
        setShowItem("fa fa-bars tamañoiconogridresult selecticonogrip")
        setShowPhoto("fa fa-th-large tamañoiconogridresult mtr-3")
        setShowItemPhoto("fa fa-th-list tamañoiconogridresult mtr-3")
    };

    const MostrarFotos = () => {
        dispatch(getGripSelect(2));
        setSelectGrid(1);
        setShowPhoto("fa fa-th-large tamañoiconogridresult  selecticonogrip")
        setShowItem("fa fa-bars tamañoiconogridresult mtr-3")
        setShowItemPhoto("fa fa-th-list tamañoiconogridresult mtr-3")
    };

    const MostrarFotosItems = () => {
        dispatch(getGripSelect(3));
        setSelectGrid(3);
        setShowItemPhoto("fa fa-th-list tamañoiconogridresult  selecticonogrip")
        setShowPhoto("fa fa-th-large tamañoiconogridresult mtr-3")
        setShowItem("fa fa-bars tamañoiconogridresult mtr-3")

    };
    //{swichersItemsView}
    return (
        <div className="ps-shop__actions altobarragripresult">
            <div className="ps-shop__actions-left">
                <div className="apuntador">
                    <Row>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            <i className={showItem} aria-hidden="true"
                                onClick={() => MostrarItems()}>
                            </i>
                        </Col>
                        <div className="ml-3" onClick={() => MostrarFotos()}>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <i className={showPhoto} aria-hidden="true">
                                </i>
                            </Col>
                        </div>
                        <div onClick={() => MostrarFotosItems()}>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <i className={showItemPhoto}>
                                </i>
                            </Col>
                        </div>
                    </Row>
                </div>
            </div>
            <div className="ps-shop__actions-right">
                <ModuleShopSortBy
                    ordenarPor={ordenarPor}
                    setOrdenarPor={setOrdenarPor}
                    textoOrdenar={textoOrdenar}
                    setTextoOrdenar={setTextoOrdenar}
                />
            </div>
        </div>
    );
};

export default ModuleShopResults;
