import React, { useEffect, useState } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/ShopSearchInterative";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroupInteractive";
import { useRouter } from "next/router";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";

const breadcrumb = [
    {
        id: 1,
        text: "Inicio",
        url: "/",
    },
    {
        id: 2,
        text: "Tienda",
        url: "/shop",
    },
    {
        id: 3,
        text: "Resultado de la búsqueda",
    },
];

const SearchInteractive = () => {
    const Router = useRouter();
    const { keyword } = Router.query;
    const [showProductInteractivo, setShowProductInteractivo] = useState(false);

    //console.log("QUE BUSCA : ", keyword);
    const { loading, productItems, getProducts } = useGetProducts();
    //console.log("PRODUCT ITEMS : ", productItems);
    const { withGrid } = useProductGroup();

    useEffect(() => {
        const queries = {
            name_contains: "BMW",
        };
        getProducts(queries);
    }, [keyword]);

    let products;
    if (productItems && productItems.length > 0) {
        products = withGrid(productItems, loading, 5, showProductInteractivo);
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    return (
        <div className="ps-page ps-page--shopping">
            <div className="ps-layout__right ">
                <div className="ps-shop__header">
                    <div className="container">
                        <br />
                        <ShopInteractivoHeader
                            showProductInteractivo={showProductInteractivo}
                            setShowProductInteractivo={
                                setShowProductInteractivo
                            }
                        />
                    </div>
                </div>
                <Shop className="ps-shop--grid ">{products}</Shop>
            </div>
            {/*   
            <div className="container">
                <div className="ps-layout__right">
                    <Shop classes="ps-shop--grid">{products}</Shop>
                </div>
            </div>
            */}
        </div>
    );
};

const ShopInteractivoHeader = (props) => {
    const { showProductInteractivo, setShowProductInteractivo } = props;
    const [datosBuscar, setDatosBuscar] = useState("");

    const noMostrarFotos = () => {
        setShowProductInteractivo(true);
    };

    const MostrarFotos = () => {
        setShowProductInteractivo(false);
    };

    function handleSetKeyword(e) {
        //e.preventDefault();
        console.log("DATOS BUSCAR : ", datosBuscar);
        /*
        if (e.target.value !== "") {
            setKeyword(e.target.value);
        } else {
            setKeyword(e.target.value);
        }
        */
    }

    function handleSubmit(e) {
        //e.preventDefault();
        console.log("ON CLICK : ", datosBuscar);
        /*
        if (keyword !== "") {
            Router.push(`/search?keyword=${keyword}`);
        }
        */
    }

    const tituloOnChange = (e) => {
        //console.log("LONGITUD TITULO NOMBRE : ", e);
        var strLength = e.length;
        //console.log("LONGITUD : ", strLength);
        setDatosBuscar(e);
    };

    return (
        <div>
            <Row>
            <Col xs={1} sm={2} md={2} lg={3}>
                    <Button className="botonheaderinteractivoizquierda">
                        <i className="fa fa-2x fa-compress" aria-hidden="true"></i>
                        {"\u00A0"}
                        {"\u00A0"}
                        {"\u00A0"}
                        <i
                            onClick={noMostrarFotos}
                            className="fa fa-2x fa-arrows-alt"
                            aria-hidden="true"></i>
                    </Button>
                </Col>

                <Col xs={1} sm={2} md={4} lg={6}>
                    <div className="ps-search-table">
                        <div className="input-group">
                            <input
                                className="form-control ps-form__input"
                                name="datosBuscar"
                                onChange={(e) => tituloOnChange(e.target.value)}
                                type="text"
                            />
                            <div className="input-group-append">
                                <a href="#" onClick={(e) => handleSubmit(e)}>
                                    <i className="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col xs={1} sm={2} md={2} lg={3}>
                    <Button className="botonheaderinteractivoderecha">
                        <i
                            onClick={MostrarFotos}
                            className="fa fa-2x fa-picture-o"
                            aria-hidden="true"></i>
                        {"\u00A0"}
                        {"\u00A0"}
                        {"\u00A0"}
                        <i className="fa fa-2x fa-expand" aria-hidden="true"></i>
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default SearchInteractive;
