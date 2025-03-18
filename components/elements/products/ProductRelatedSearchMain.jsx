import React from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProduct from "~/hooks/useProduct";
import { useRouter } from "next/router";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRatingRelated";
import ModuleProductImages from "~/components/elements/products/modules/ModuleProductImagesSearch";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import { Box, Grid, Button } from "@mui/material";
import axios from "axios";

const ProductRelatedSearchMain = ({ product }) => {
    const router = useRouter();
    const { pricerelatedsearch, badges } = useProduct();

    const verProduct = (dat) => {
        let ruta = "/product/" + dat;
        router.push(ruta);
    };

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
                    console.log("LEER : ", res.data);
                } else console.log("ERROR : ", res.data);
            })
            .catch(function (error) {
                console.log("ERROR : ", res.data);
                return;
            });
    };


    return (
        <div>
            <Grid container spacing={1}
                onClick={() => addItemHistoryPrd()}
            >
                <Grid item xs={12} md={12} lg={12}>
                    <div className="ps-product__thumbnail">
                        {/*
                        <Link
                            href="/product/[id]"
                            as={`/product/${product.id}`}>
                            <a className="ps-product__overlay"></a>
                        </Link>
                        */}
                        <img
                            onClick={() => verProduct(product.id)}
                            className="imageresultprdrelated"
                            src={URL_IMAGES_RESULTS + product.images[0].name}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <div className="ps-product__content">
                        <div className="ps-product__title">
                            <Link
                                href="/product/[id]"
                                as={`/product/${product.id}`}>
                                <div className="tamañotextoprdrelatedname"
                                    onClick={() => verProduct(product.id)}
                                >
                                    {product.name}
                                </div>
                            </Link>
                        </div>
                        <div>{pricerelatedsearch(product)}</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductRelatedSearchMain;
