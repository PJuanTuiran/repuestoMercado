import React from "react";
import Link from "next/link";
import useProduct from "~/hooks/useProduct";
import axios from "axios";
import { useSelector } from "react-redux";
//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants";
import ModuleProductImagesResultsDos from "~/components/elements/products/modules/ModuleProductImagesResultsDos";

const ProductResultsDos = ({ product }) => {
    const { price, badges } = useProduct();
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
        <div className="ps-product ps-product--grid">
            <div className="cajaimagesresult"
                onClick={() => onClickImagen()}
            >
                <div className="ps-product__thumbnail">
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <a className="ps-product__overlay"></a>
                    </Link>
                    <ModuleProductImagesResultsDos product={product} />
                    {badges(product)}
                </div>
            </div>
            <div className="ps-product__content mt-60">
                <div
                    onClick={() => onClickImagen()}
                >
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <a className="textoimagenesresult">{product.name}</a>
                    </Link>
                </div>
                {price(product)}
                {
                    //<ModuleProductRating />
                }
            </div>
        </div>
    );
};

export default ProductResultsDos;
