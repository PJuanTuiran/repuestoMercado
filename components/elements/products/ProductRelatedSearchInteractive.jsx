import React from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProduct from "~/hooks/useProduct";
import { useRouter } from "next/router";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRatingRelated";
import ModuleProductImages from "~/components/elements/products/modules/ModuleProductImagesSearch";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import { Box, Grid, Button } from "@mui/material";

const ProductRelatedSearchInteractive = ({ product }) => {
    const router = useRouter();
    const { pricerelatedsearch, badges } = useProduct();

    const verProduct = (dat) => {
        let ruta = "/product/" + dat;
        router.push(ruta);
    };

    return (
        <div>
            <Grid container spacing={1}>
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
                            className="imageresultprdrelatedinteractive"
                            onClick={() => verProduct(product.id)}
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
                                <div
                                    className="tamañotextoprdrelatedinteractive"
                                    onClick={() => verProduct(product.id)}>
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

export default ProductRelatedSearchInteractive;
