import React from "react";
import Link from "next/link";
import useProductInteractive from "~/hooks/useProductInteractive";
import { myNumber } from "../../../utilities/ArrayFunctions";
import { Box, Grid, Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";

const ProductListInteractiveMaximizeDos = ({ product }) => {
    const { price, badges, iditem } = useProductInteractive();
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const onClickImagen = () => {
        const addItemVisita = async () => {
            let params = {
                idproducto: product.id,
                usuario: datosusuarios.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "70",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data)
                    } else console.log("ERROR : ", res.data)
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data)
                    return;
                });
        };
        addItemVisita();

        const addItemHistoryPrd = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));

            let params = {
                idproducto: product.id,
                usuario: datauser.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "87",
                params,
            })
                .then((res) => {
                    if (res.data > 0) {
                        console.log("LEER : ", res.data)
                    } else console.log("ERROR : ", res.data)
                })
                .catch(function (error) {
                    console.log("ERROR : ", res.data)
                    return;
                });
        };
        addItemHistoryPrd();
    };

    return (
        <div className="listinteractivemaximizeDos">
            <Grid container spacing={1}>
                <Grid item xs={9} md={9} lg={9}>
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <div className="pl-10 textoproductlistinteractivemaximize"
                        onClick={() => onClickImagen()}
                        >
                            {product.name}
                        </div>
                    </Link>
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                    <a className="ml-20 colorbase"> $ </a>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <div className="formatoprecioproductlistmaximize">
                        {myNumber(1, product.price, 2)}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductListInteractiveMaximizeDos;
