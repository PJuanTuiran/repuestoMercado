import React, { useEffect, useState } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import { useRouter } from "next/router";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

//Importar Carrusel
//import SedanLatoneriaDerecha from "../CarruselVehiculos/CarruselSedan/SedanLatoneriaDerechaDatosBuscador";

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

const Searchcategorias = () => {
    const Router = useRouter();
    const { keyword } = Router.query;
    //console.log("QUE BUSCA : ", keyword);
    const [showModalDatosBuscador, setShowModalDatosBuscador] = useState(true);
    const { loading, productItems, getProducts } = useGetProducts();
    //console.log("PRODUCT ITEMS : ", productItems);
    const { withGrid } = useProductGroup();

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    console.log("DATOS BUSCADOR CATEGORIAS : ", datosbuscadorinteractivo);

    useEffect(() => {
        const queries = {
            name_contains: keyword,
        };
        getProducts(queries);
    }, [keyword]);

    let products;
    if (productItems && productItems.length > 0) {
        products = withGrid(productItems, loading, 4);
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    return (
        <Container>
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Resultado de la búsqueda: “{keyword}”
                        </h1>
                    </div>
                    <Row>
                        <Col xs={12} md={2} lg={6}>
                            <Row>
                                <div className="espaciobordecarroceriasedan">
                                    <Col xs lg={1}>
                                        <ButtonGroup vertical>
                                            <div className="espaciosuperiorbordecarroceriasedan">
                                                <Row>
                                                    <Col xs lg={8}>
                                                        <Button className="datosbotoncarroceriabuscador">
                                                            LATONERIA
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </ButtonGroup>
                                    </Col>
                                </div>
                                <div>
                                    <Col xs lg={4}>
                                        <ButtonGroup>
                                            <div className="espaciobordedatosbuscador">
                                                <Row>
                                                    <div className="espaciodatossedan">
                                                        <Col
                                                            xs
                                                            lg={12}
                                                            md={{ offset: 0 }}>
                                                            <Button className="botondatosbuscadorizquierda">
                                                                {
                                                                    datosbuscadorinteractivo.nombretipovehiculo
                                                                }
                                                            </Button>
                                                            <Button className="botondatosbuscador">
                                                                {
                                                                    datosbuscadorinteractivo.nombrecarroceria
                                                                }
                                                            </Button>
                                                            <Button className="botondatosbuscador">
                                                                {
                                                                    datosbuscadorinteractivo.nombremarca
                                                                }
                                                            </Button>
                                                            <Button className="botondatosbuscadorderecha">
                                                                {
                                                                    datosbuscadorinteractivo.nombreaño1
                                                                }
                                                            </Button>
                                                        </Col>
                                                    </div>
                                                </Row>
                                            </div>
                                        </ButtonGroup>
                                    </Col>
                                    <Col xs lg={4}>
                                        <ButtonGroup>
                                            <div className="espaciobordedatosbuscador">
                                                <Row>
                                                    <div className="espaciodatossedan">
                                                        <Col
                                                            xs
                                                            lg={12}
                                                            md={{ offset: 0 }}>
                                                            <Button className="botondatosbuscador">
                                                                {
                                                                    datosbuscadorinteractivo.nombremodelo1
                                                                }
                                                            </Button>
                                                            <Button className="botondatosbuscador">
                                                                {
                                                                    datosbuscadorinteractivo.nombrecilindraje1
                                                                }
                                                            </Button>
                                                            <Button className="botondatosbuscador">
                                                                {
                                                                    datosbuscadorinteractivo.nombreTipoCombustibe
                                                                }
                                                            </Button>
                                                            <Button className="botondatosbuscadorderecha">
                                                                {
                                                                    datosbuscadorinteractivo.nombretransmision
                                                                }
                                                            </Button>
                                                        </Col>
                                                    </div>
                                                </Row>
                                            </div>
                                        </ButtonGroup>
                                    </Col>
                                    <Col xs lg={4}>
                                        <div className="auth__box-logo">
                                            {
                                                //<SedanLatoneriaDerecha />
                                            }
                                        </div>
                                    </Col>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={12} md={2} lg={6}>
                            <div className="ps-layout__right">
                                <Shop classes="ps-shop--grid">{products}</Shop>
                                <PromotionSecureInformation />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default Searchcategorias;
