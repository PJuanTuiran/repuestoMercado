import React, { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Container from "~/components/layouts/Container";
import DetailDefault from "~/components/elements/detail/DetailDefault";
import useGetProducts from "~/hooks/useGetProducts";
import MyPosts from "./myposts";
import SortByPosts from "../../components/partials/shop/modules/SortByPosts";
import { Box, Grid, Button } from "@mui/material";
import LateralMenu from "../../pages/LateralMenu";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { getCloseMenu } from "../../store/closemenu/action";
import { getMenuPublication } from "../../store/menupublication/action";
import { getDuplicarPrd } from "../../store/duplicarprd/action";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";
import ModalControlAcceso from "../mensajes/ModalControlAcceso";

const index = () => {
    const Router = useRouter();
    const irA = useRef(null);
    const dispatch = useDispatch();
    const { id } = Router.query;
    const { loading, product, getPublicatById } = useGetProducts();
    //console.log("DATOS PRODUCTO : ", product);

    const [sombraOpen, setSombraOpen] = useState("");
    const [sombraOpenDos, setSombraOpenDos] = useState("contImgMisCompras");
    const [sombraOpenTres, setSombraOpenTres] = useState("productComprado");
    const [sombraOpenCuatro, setSombraOpenCuatro] = useState(
        "precioProductMisCompras"
    );
    const [fondoInput, setFondoInput] = useState(
        "input-group inputbuscarposts"
    );
    const [controlImg, setControlImg] = useState("");
    const [sizeMenu, setSizeMenu] = useState("menulatpublicacion");
    const [disabledImg, setDisabledImg] = useState("menulatpublicacion");

    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [datosBuscar, setDatosBuscar] = useState(null);
    const [numeroPublicaciones, setNumeroPublicaciones] = useState(0);

    const [showModalControlAcceso, setShowModalControlAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState(false);
    const [textoControlAcceso, setTextoControlAcceso] = useState(false);

    const [orderPrice, setOrderPrice] = useState(0);
    const [closeOpen, setcloseOpen] = useState(false);
    const activausermenu = useSelector((state) => state.usermenu.usermenu);
    const activausermenuprimary = useSelector(
        (state) => state.usermenu.usermenuprimary
    );
    const closemenu = useSelector((state) => state.closemenu.closemenu);
    const menupublication = useSelector(
        (state) => state.menupublication.menupublication
    );
    const numpagina = useSelector((state) => state.pageselect.pageselect);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        if (datosusuarios.activo == 30) {
            setShowModalControlAcceso(true);
            setTituloControlAcceso("Mis publicaciones");
            setTextoControlAcceso(
                "Tu cuenta se encuentra bloqueada, para saber más mira tu correo electrónico o contacta a soporte a través de nuestro correo soporte@mercadorepuesto.com.co"
            );
            return;
        }
    }, [datosusuarios]);

    useEffect(() => {
        let numpag = (numeroPublicaciones / 10 + 0.5).toFixed(0);
        let arraypg = [];
        for (var i = 1; i <= numpag; i++) {
            arraypg.push(i);
        }
        dispatch(getNumberPages(arraypg));
        dispatch(getPageSelect(1));
    }, [numeroPublicaciones]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <DetailDefault product={product} />;
    }

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
            text: nombreProducto,
        },
    ];

    const tituloOnChange = (e) => {
        var strLength = e.length;
        setDatosBuscar(e);
    };

    function handleSubmit(e) {
        //console.log("ON CLICK : ", datosBuscar);
    }

    const newPost = () => {
        dispatch(getDuplicarPrd(0));
        localStorage.setItem("accion", JSON.stringify("Crear Producto"));
        Router.push("/CreateProduct/createproduct");
    };

    useEffect(() => {
        setcloseOpen(false);
        setSombraOpen("");
        setSombraOpenDos("contImgMisCompras");
        setSombraOpenTres("productComprado");
        setSombraOpenCuatro("precioProductMisCompras");
        setDisabledImg("");
        setControlImg("");
        setFondoInput("input-group inputbuscarposts");
    }, [activausermenu, activausermenuprimary]);

    useEffect(() => {
        if (closemenu) {
            setcloseOpen(false);
            setSombraOpen("");
            setSombraOpenDos("contImgMisCompras");
            setSombraOpenTres("productComprado");
            setSombraOpenCuatro("precioProductMisCompras");
            setFondoInput("input-group inputbuscarposts");
            setDisabledImg("");
            setControlImg("");
            dispatch(getCloseMenu(false));
            dispatch(getMenuPublication(1));
        }
    }, [closemenu]);

    const closeOpenMenu = () => {
        setcloseOpen(true);
        //if (filteredCompras.length == 0)
        setSombraOpen("disablemyaccountcuatro4");
        //else setSombraOpen("disablemyaccountcuatro");
        // setSombraOpenDos("SubcontainerMisDatosDisabled");
        setSombraOpenDos("contImgMisComprasDisabled");
        setSombraOpenTres("productCompradoDisabled");
        setSombraOpenCuatro("precioProductMisComprasDisabled");
        setControlImg("disabledimg");
        dispatch(getUserMenuPrimary(false));
    };

    useEffect(() => {
        if (closeOpen) {
            setDisabledImg("menulatpublicacion0");
            dispatch(getMenuPublication(1));
        } else {
            setDisabledImg(sizeMenu);
            dispatch(getMenuPublication(0));
        }
    }, [closeOpen]);

    useEffect(() => {
        if (!closeOpen) {
            dispatch(getMenuPublication(0));
            if (numeroPublicaciones >= 0 && numeroPublicaciones <= 4) {
                setSizeMenu("menulatpublicacion");
                setDisabledImg("menulatpublicacion");
            } else if (numeroPublicaciones >= 5 && numeroPublicaciones <= 10) {
                setSizeMenu("menulatpublicacion1");
                setDisabledImg("menulatpublicacion1");
            } else if (numeroPublicaciones >= 11 && numeroPublicaciones <= 16) {
                setSizeMenu("menulatpublicacion2");
                setDisabledImg("menulatpublicacion2");
            } else if (numeroPublicaciones >= 17 && numeroPublicaciones <= 22) {
                setSizeMenu("menulatpublicacion3");
                setDisabledImg("menulatpublicacion3");
            } else if (numeroPublicaciones >= 23 && numeroPublicaciones <= 28) {
                setSizeMenu("menulatpublicacion4");
                setDisabledImg("menulatpublicacion4");
            } else if (numeroPublicaciones >= 29 && numeroPublicaciones <= 34) {
                setSizeMenu("menulatpublicacion5");
                setDisabledImg("menulatpublicacion5");
            } else if (numeroPublicaciones >= 35 && numeroPublicaciones <= 40) {
                setSizeMenu("menulatpublicacion6");
                setDisabledImg("menulatpublicacion6");
            } else if (numeroPublicaciones >= 41 && numeroPublicaciones <= 46) {
                setSizeMenu("menulatpublicacion7");
                setDisabledImg("menulatpublicacion7");
            } else if (numeroPublicaciones >= 47 && numeroPublicaciones <= 53) {
                setSizeMenu("menulatpublicacion8");
                setDisabledImg("menulatpublicacion8");
            } else if (numeroPublicaciones >= 54 && numeroPublicaciones <= 59) {
                setSizeMenu("menulatpublicacion9");
                setDisabledImg("menulatpublicacion9");
            } else if (numeroPublicaciones >= 60 && numeroPublicaciones <= 65) {
                setSizeMenu("menulatpublicacion10");
                setDisabledImg("menulatpublicacion10");
            } else if (numeroPublicaciones >= 66 && numeroPublicaciones <= 71) {
                setSizeMenu("menulatpublicacion10");
                setDisabledImg("menulatpublicacion10");
            } else if (numeroPublicaciones >= 72 && numeroPublicaciones <= 77) {
                setSizeMenu("menulatpublicacion10");
                setDisabledImg("menulatpublicacion10");
            } else if (numeroPublicaciones >= 78 && numeroPublicaciones <= 83) {
                setSizeMenu("menulatpublicacion10");
                setDisabledImg("menulatpublicacion10");
            } else if (numeroPublicaciones >= 84 && numeroPublicaciones <= 89) {
                setSizeMenu("menulatpublicacion10");
                setDisabledImg("menulatpublicacion10");
            }
        }
    }, [numeroPublicaciones]);

    useEffect(() => {
        if (menupublication == 1) {
            setFondoInput("input-group inputbuscarpostsdisable");
        } else {
            setFondoInput("input-group inputbuscarposts");
        }
    }, [menupublication]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [numpagina]);

    return (
        <Container title="Product">
            <div className="ps-page ps-page--product" ref={irA}>
                <div className="container">
                    <ModalControlAcceso
                        shown={showModalControlAcceso}
                        close={setShowModalControlAcceso}
                        titulo={tituloControlAcceso}
                        mensaje={textoControlAcceso}
                        tipo="1"
                    />
                    <Grid container spacing={1}>
                        <Grid item xs={1} md={1} lg={1}>
                            <Button
                                variant="outline-light"
                                onClick={() => closeOpenMenu()}
                                style={{ backgroundColor: "transparent" }}>
                                <div className={disabledImg}>
                                    <MenuIcon className="menuproperty" />
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={8} md={8} lg={8}>
                            <div className="titulopublicaciones">
                                Mis Publicaciones
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            md={3}
                            lg={3}
                            onClick={() => newPost()}>
                            <div className="newposts">
                                <a>
                                    Nueva publicación
                                    <i
                                        className="iconoadd fa fa-plus-circle"
                                        aria-hidden="true"></i>
                                </a>
                            </div>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <div className="mtmenos10">
                                    {closeOpen ? <LateralMenu /> : null}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <div className={sombraOpen}>
                        <Grid container spacing={1}>
                            <Grid item xs={4} md={4} lg={4}>
                                <div className="ml-30 mtmenos20 mb-20">
                                    <SortByPosts
                                        orderPrice={orderPrice}
                                        setOrderPrice={setOrderPrice}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <div>
                                    <input
                                        className={fondoInput}
                                        onChange={(e) =>
                                            tituloOnChange(e.target.value)
                                        }
                                        value={datosBuscar}
                                        type="text"
                                    />
                                    <div className="iconobuscarpost">
                                        <a
                                            href="#"
                                            onClick={(e) => handleSubmit(e)}>
                                            <i
                                                className="fa fa-search"
                                                aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
                                <div className="numeroprodmyposts">
                                    Número de publicaciones:{" "}
                                    {numeroPublicaciones}
                                </div>
                            </Grid>
                        </Grid>

                        <div className="ps-page__content mt-10">
                            <div className="ps-layout--with-sidebar ps-reverse">
                                <div className="ps-layout__right">
                                    <MyPosts
                                        setNumeroPublicaciones={
                                            setNumeroPublicaciones
                                        }
                                        orderPrice={orderPrice}
                                        setOrderPrice={setOrderPrice}
                                        datosBuscar={datosBuscar}
                                        setDatosBuscar={setDatosBuscar}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default index;
