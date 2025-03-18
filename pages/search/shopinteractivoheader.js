
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";
import SidebarShop from "~/components/shared/sidebar/SidebarShopSearchInteractive";
import imagenbarra from "../../public/static/img/icon/bars.svg";
import imagenfoto from "../../public/static/img/icon/gird2.svg";
import SortBySearchInteractive from "../../components/partials/shop/modules/SortBySearchInteractive"
import { useSelector, useDispatch } from "react-redux";
import { getChangeSearch } from "../../store/changesearch/action";
import { getBlockScreen } from "../../store/blockscreen/action";
import { getViewSearch } from "../../store/viewsearch/action";
import { getSelectViewPrd } from "../../store/selectviewprd/action";

const ShopInteractivoHeader = (props) => {
    const {
        showProductInteractivo,
        setShowProductInteractivo,
        setOptionSelect,
        optionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
        setActualiza,
        setPalabra,
        setOrderPrice
    } = props;
    const dispatch = useDispatch();
    const [datosBuscar, setDatosBuscar] = useState("");
    const [selectItem, setSelectItem] = useState("mlmenos4 botonheaderinteractivoderecha");
    const [selectPhoto, setSelectPhoto] = useState("mlmenos23 botonheaderinteractivoderecha");
    const [selectMaximizar, setSelectMaximizar] = useState("mlmenos40 botonheaderinteractivoderecha");

    let selectviewprd = useSelector((state) => state.selectviewprd.selectviewprd);
    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);

    //console.log("selectviewprd : ",selectviewprd, " - ", viewSearch)
    // Condición para redirigir View de Productos Buscador Especial
    useEffect(() => {
        if (selectviewprd > 0 && viewSearch) {
            setMaximizarOption(1);
            let ctrview = JSON.parse(localStorage.getItem("ctrview"));

            if (ctrview) {
                //alert("HEADER")
                dispatch(getViewSearch(true));
                //dispatch(getSelectViewPrd(0));
            }else{
                //alert("HE222222")
                dispatch(getViewSearch(false));
            }

            dispatch(getChangeSearch(1));
            dispatch(getBlockScreen(0));
        } else {
            setMaximizarOption(0);
        }
    }, [selectviewprd, viewSearch])

    useEffect(() => {
        setOptionSelect(1);
        setSelectItem("mlmenos4 botonheaderinteractivoderechaselect");
    }, []);

    const MostrarItems = () => {
        setOptionSelect(1);
        setSelectItem("mlmenos4 botonheaderinteractivoderechaselect");
        setSelectPhoto("mlmenos23 botonheaderinteractivoderecha colornoseleccion");
        if (zoom) {
            setMaximizarOption(1);
        }
    };

    const MostrarFotos = () => {
        setOptionSelect(2);
        setSelectPhoto("mlmenos23 botonheaderinteractivoderechaselect");
        setSelectItem("mlmenos4 botonheaderinteractivoderecha colornoseleccion");
        if (zoom) {
            setMaximizarOption(2);
        }
    };

    const maximizar = () => {
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        if (maximizarOption === 0) {
            if (optionSelect === 1) setMaximizarOption(1);
            else if (optionSelect === 2) setMaximizarOption(2);
            //setZoom(true);
        }
        dispatch(getChangeSearch(1));
        dispatch(getBlockScreen(0));
    };

    useEffect(() => {
        let activargrilla = JSON.parse(localStorage.getItem("activargrilla"));

        if (activargrilla == 1) {
            setMaximizarOption(1);
            setOptionSelect(1);
        } else
            if (activargrilla == 2) {
                setMaximizarOption(2);
                setOptionSelect(2);
            } else
                if (activargrilla == 3) {
                    setMaximizarOption(3);
                    setOptionSelect(3);
                }
    }, []);

    const minimizar = () => {
        if (maximizarOption != 0) {
            setMaximizarOption(0);
            setSelectPhoto("botonheaderinteractivoderecha mlmenos20");
            setSelectItem("botonheaderinteractivoderecha");
            setSelectMaximizar("botonheaderinteractivoderecha mlmenos35")
            //setZoom(false);
        }
        localStorage.setItem("aadditemcar", JSON.stringify(false));
        dispatch(getChangeSearch(1));
        dispatch(getBlockScreen(0));
    };

    function handleSubmit(e) {
        setActualiza(true);
    }

    const tituloOnChange = (e) => {
        var strLength = e.length;
        setPalabra(e);
        setDatosBuscar(e);
    };

    return (
        <div className="tamañobuscadorsearchinteractive">
            <Row>
                <Col xs={1} sm={2} md={4} lg={9}>
                    <div className="ps-search-table-mr">
                        <div className="input-group tamañoinputsearchproduct">
                            <input
                                className="form-control ps-form__input colorbuscador sinborder"
                                //name={datosBuscar}
                                onChange={(e) => tituloOnChange(e.target.value)}
                                type="text"
                            />
                            <div className="input-group-append colorbuscador">
                                <a href="#" onClick={(e) => handleSubmit(e)}>
                                    <i className="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                    <Button
                        className={selectItem}
                        variant="outline-light"
                        onClick={() => MostrarItems()}
                    >
                        <img
                            className="tamañoiconosheadershop"
                            src={imagenbarra.src} />
                    </Button>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                    <Button
                        className={selectPhoto}
                        variant="outline-light"
                        onClick={() => MostrarFotos()}
                    >
                        <img
                            className="tamañoiconosheadershop"
                            src={imagenfoto.src} />
                    </Button>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                    {
                        maximizarOption === 0 ?
                            (
                                <Button
                                    className={selectMaximizar}
                                    variant="outline-light"
                                >
                                    <i
                                        onClick={() => maximizar()}
                                        className="mtmenos3 tamañomaximizarminimizar fa fa-arrows-alt"
                                        aria-hidden="true"></i>
                                </Button>
                            )
                            :
                            (
                                <Button
                                    className={selectMaximizar}
                                    variant="outline-light"
                                >
                                    <i
                                        onClick={() => minimizar()}
                                        className="mtmenos3 tamañomaximizarminimizar fa fa-2x fa fa-compress"
                                        aria-hidden="true"></i>
                                </Button>
                            )
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={3} sm={3} md={9} lg={12}>
                    {maximizarOption != 2 && maximizarOption != 1 ?
                        <div className="ml-1 mb-2 ps-layout__left">
                            <SortBySearchInteractive
                                setOrderPrice={setOrderPrice}
                            />
                        </div>
                        :
                        <div className="ml-15 mt-15 ps-layout__left">

                        </div>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default ShopInteractivoHeader;