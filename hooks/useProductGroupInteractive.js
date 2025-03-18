import React, { useState, useEffect } from "react";
import Product from "~/components/elements/products/Product";
import ProductPhotoInteractive from "~/components/elements/products/ProductPhotoInteractive";
import { generateTempArray } from "~/utilities/common-helpers";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import ProductGridWithDetail from "~/components/elements/products/ProductGridWithDetail";
import ProductListSearchInteractive from "~/components/elements/products/ProductListSearchInteractive";
import ProductListInteractiveMaximize from "~/components/elements/products/ProductListInteractiveMaximize";
import ProductListInteractiveMaximizeDos from "~/components/elements/products/ProductListInteractiveMaximizeDos";
import SkeletonProductHorizontal from "~/components/elements/skeletons/SkeletonProductHorizontal";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";
import SwiperCarousel from "~/components/elements/carousel/SwiperCarousel";

// install Swiper modules
SwiperCore.use([Navigation]);

export default function useProductGroupInteractive() {
    const [mostrarZoom, setMostrarZoom] = useState("ps-layout__item");

    const showInteractivo = useSelector(
        (state) => state.selectviewproduct.selectviewproduct.viewproductinteractive
    );

    const datosubicarproducto = useSelector(
        (state) => state.ubicarproducto.ubicarproducto
    );

    useEffect(() => {
        if (datosubicarproducto != 0)
            setMostrarZoom("maximizarbusquedaitems ps-layout__item");
        else
            setMostrarZoom("ps-layout__item");
    }, [datosubicarproducto]);

    //console.log("VALOR VIEW PRODUCTO : ", showInteractivo)
    return {
        withCarousel: (source, loading, setting) => {

            let carousel;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Product product={item} />
                        </SwiperSlide>
                    ));

                    carousel = (
                        <SwiperCarousel setting={setting ? setting : undefined}>
                            {items}
                        </SwiperCarousel>
                    );
                } else {
                    carousel = <p>No hay resultados para tu busqueda.</p>;
                }
            } else {
                const skeletons = generateTempArray(2).map((item) => (
                    <div className=" col-6" key={item}></div>
                ));
                carousel = <div className="row">{skeletons}</div>;
            }
            return carousel;
        },
        withGrid: (source, loading, columns = 4, showProductInteractivo) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item ajustephotossearchinteractive "
                            key={item.id}>
                            <ProductPhotoInteractive product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items"
                            data-columns={4}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados para tu busqueda.</p>;
                }
            } else {
                const items = generateTempArray(columns * 2).map((item) => (
                    <div key={item} className="ps-layout__item">
                        <SkeletonProduct />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--grid ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withGridDetail: (source, loading, columns = 5) => {

            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductGridWithDetail product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items with-skeleton"
                            data-columns={columns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados para tu busqueda.</p>;
                }
            } else {
                const items = generateTempArray(columns * 2).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProduct />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--grid ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withList: (source, loading, columns = 4) => {

            let view;
            let control = false;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className={mostrarZoom} key={item.id}>
                            <ProductListSearchInteractive product={item} />
                        </div>
                    ));
                    view = (
                        <div className="ps-layout--list ps-shop-items">
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados para tu busqueda.</p>;
                }
            } else {
                const items = generateTempArray(columns).map((item) => (
                    <div
                        key={item}
                        className="ps-layout__item"
                        data-columns={columns}>
                        <SkeletonProductHorizontal />
                    </div>
                ));
                view = (
                    <div
                        className="ps-layout--list ps-shop-items with-skeleton"
                        data-columns={columns}>
                        {items}
                    </div>
                );
            }
            return view;
        },
        withListMaximize: (source, loading, columns = 4) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    //console.log("DATOXXX : ", source)

                    let resprod = [];
                    let unico = [];
                    let validar;

                    source &&
                        source.map((item, index) => {
                            validar = unico.includes(item.id);
                            if (!validar) {
                                unico.push(item.id);
                                resprod.push(item);
                            }
                        });

                    const items = resprod.map((item, index) => (
                        <div className={mostrarZoom} key={item.id}>
                            <ProductListInteractiveMaximize product={item} iditem={index} />
                            {/*
                                index % 2 == 0 ?
                                    <ProductListInteractiveMaximize product={item} iditem={index} />
                                    :
                                    <ProductListInteractiveMaximizeDos product={item} iditem={index} />
                    */}
                        </div>
                    ));
                    view = (
                        <div className="ps-layout--list ps-shop-items">
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados para tu busqueda.</p>;
                }
            }
            return view;
        },
    };
}
