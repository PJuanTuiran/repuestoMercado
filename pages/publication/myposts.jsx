import React, { useEffect, useState, useRef } from "react";
import ShopSearch from "~/components/partials/shop/ShopSearch";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import { getCancelCondition } from "../../store/cancelcondition/action";
import { getLongPage } from "../../store/longpage/action"
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomPaginationPublication from "../../components/elements/basic/CustomPaginationPublication";

//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";

let controlcond = false;
let holder = 0;
let valdata = 0;

const MyPosts = (props) => {
    const {
        setNumeroPublicaciones,
        orderPrice,
        setOrderPrice,
        datosBuscar,
        setDatosBuscar,
    } = props;
    const Router = useRouter();
    const irA = useRef(null);
    const dispatch = useDispatch();
    let { keyword } = Router.query;

    const { loading, productItems, getProducts, dataPayload } =
        useGetProducts();
    const { withListPosts } = useProductGroup();
    const [resultFind, setResultFind] = useState(false);
    const [wordCambia, setWordCambia] = useState(false);
    const [dataMyPosts, setDataMyPosts] = useState([]);
    const [activar, setActivar] = useState("habilitar");
    const [selectGrid, setSelectGrid] = useState(1);
    const [paginaSel, setPaginaSel] = useState(1);
    const [contCond, setContCond] = useState(controlcond);

    const [irInicio, setIrInicio] = useState(false);

    // Asignamos Datos al arreglo de Usuarios desde el state
    let addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const cancelcondition = useSelector(
        (state) => state.cancelcondition.cancelcondition
    );

    useEffect(() => {
        const addItemVisita = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "76",
                params,
            })
                .then((res) => {
                    setNumeroPublicaciones(res.data.length);
                    setDataMyPosts(res.data);
                    dispatch(getCancelCondition(0));
                })
                .catch(function (error) {
                    console.log("ERROR : ");
                    return;
                });
        };
        addItemVisita();
    }, [datosusuarios, cancelcondition]);

    useEffect(() => {
        if (!valdata) {
            const queries = {
                name_contains: "",
            };
            //console.log("BUSXXXX : ", queries);
            getProducts(queries);
        } else if (
            (keyword != 1 &&
                keyword != 2 &&
                keyword != 3 &&
                keyword != 4 &&
                keyword != 5 &&
                keyword != 6 &&
                keyword != 7) ||
            !productItems
        ) {
            const queries = {
                name_contains: keyword,
            };
            //console.log("BUSCAR : ", queries);
            getProducts(queries);
        } else {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1)
                nombreres = ubiposprod;

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");
        }
    }, [keyword, wordCambia, selectGrid]);

    let products = null;
    let productcategory = null;
    let productos = [];
    let productoscategoria = [];

    if (dataMyPosts && dataMyPosts.length > 0) {
        controlcond = contCond;

        let datafind = dataMyPosts;

        let ordenarPrecios = [];
        if (orderPrice == 1) {
            const compare = (a, b) => {
                if (b.price > a.price) {
                    return -1;
                }
                if (b.price < a.price) {
                    return 1;
                }
                return 0;
            };

            if (datafind.length > 0) datafind.sort(compare);
            //console.log("ORDENADOS : ", menorAmayor);
        } else if (orderPrice == 2) {
            const compare = (a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            };

            if (datafind.length > 0) datafind.sort(compare);
        } else if (orderPrice == 3) {
            const compare = (b, a) => {
                if (b.fechacreacion > a.fechacreacion) {
                    return -1;
                }
                if (b.fechacreacion < a.fechacreacion) {
                    return 1;
                }
                return 0;
            };

            if (datafind.length > 0) datafind.sort(compare);
            //console.log("ORDENADOS : ", menorAmayor);
        } else if (orderPrice == 4) {
            const compare = (b, a) => {
                if (a.fechacreacion > b.fechacreacion) {
                    return -1;
                }
                if (a.fechacreacion < b.fechacreacion) {
                    return 1;
                }
                return 0;
            };

            if (datafind.length > 0) datafind.sort(compare);
        }

        if (datosBuscar) {
            let palabraminuscula = datosBuscar.toLowerCase();

            let dataPrdItem = datafind;

            let nvoprod = [];
            dataPrdItem &&
                dataPrdItem.map((row, index) => {
                    let nombre = row.name.toLowerCase();

                    let validar;
                    validar = nombre.includes(palabraminuscula);
                    if (validar) {
                        nvoprod.push(row);
                    }
                });
            datafind = nvoprod;
        }

        dispatch(getLongPage(datafind.length));

        productcategory = withListPosts(datafind, loading, 4);
        products = withListPosts(datafind, loading, 4);
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    const handleClickScroll = () => {
        const element = document.getElementById("section-1");
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIrInicio(false);
    };

    const onSelectPrd = () => {
        localStorage.setItem("selectpage", JSON.stringify(paginaSel));
        //alert(paginaSel)
    };

    useEffect(() => {}, [orderPrice]);

    return (
        <div className="container">
          
            <div className="mtmenos20">
                <Grid container spacing={1}>
                    <Grid item xs={9} md={9} lg={9}>
                        <div className={activar} onClick={() => onSelectPrd()}>
                            <ShopSearch classes="ps-shop--grid">
                                {products}
                            </ShopSearch>
                        </div>
                    </Grid>
                </Grid>
                <div className="ml-250">
                    <CustomPaginationPublication />
                </div>
            </div>
        </div>
    );
};

export default MyPosts;
