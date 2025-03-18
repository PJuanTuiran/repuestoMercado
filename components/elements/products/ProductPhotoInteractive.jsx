import React, { useState } from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProductInteractive from "~/hooks/useProductInteractive";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "~/components/elements/products/modules/ModuleProductImages";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";

const ProductPhotoInteractive = ({ product }) => {
    const router = useRouter();
    const { price, badges, pricephoto } = useProductInteractive();
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const optionsIrA = () => {
        localStorage.setItem("ira", JSON.stringify(6));
        localStorage.setItem("rutaira", JSON.stringify(router.pathname));

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
        <div className="mr-2 mb-2">
            <div className="ps-product__thumbnail" onClick={() => optionsIrA()}>
                <ModuleProductImages product={product} />
            </div>
        </div>
    );
};

export default ProductPhotoInteractive;
