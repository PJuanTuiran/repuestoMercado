import React, { useState } from "react";
import Product from "~/components/elements/products/Product";
import ProductPhotoSearch from "~/components/elements/products/ProductPhotoSearch";
import ProductResults from "~/components/elements/products/ProductResults";
import ProductSearchView from "../components/elements/products/ProductSearchView";
import ProductListPhotoImageSearch from "../components/elements/products/ProductListPhotoImageSearch";
import ProductResultsDos from "~/components/elements/products/ProductResultsDos";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import ProductGridWithDetail from "~/components/elements/products/ProductGridWithDetail";
import ProductListPhotoImageView from "~/components/elements/products/ProductListPhotoImageView";
import ProductListPosts from "~/components/elements/products/ProductListPosts";
import SkeletonProductHorizontal from "~/components/elements/skeletons/SkeletonProductHorizontal";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";
import SwiperCarousel from "~/components/elements/carousel/SwiperCarousel";

// install Swiper modules
SwiperCore.use([Navigation]);

export default function useProductGroup() {
    const numpagina = useSelector(
        (state) => state.pageselect.pageselect
    );
    
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
        withGrid: (source, loading, columns = 5) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="pl-15 ps-layout__item" key={item.id}>
                            <ProductSearchView product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items"
                            data-columns={columns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>Producto no encontrado.</p>;
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
        withGridDos: (source, loading, columns = 5) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="pl-15 ps-layout__item" key={item.id}>
                            <ProductResultsDos product={item} />
                        </div>
                    ));
                    view = (
                        <div
                            className="ps-layout--grid ps-shop-items"
                            data-columns={columns}>
                            {items}
                        </div>
                    );
                } else {
                    view = <p>Producto no encontrado.</p>;
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
                    view = <p>Producto no encontrado.</p>;
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
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductListPhotoImageSearch product={item} />
                        </div>
                    ));
                    view = (
                        <div className="ps-layout--list ps-shop-items">
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados de la busqueda.</p>;
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
        withListView: (source, loading, columns = 4) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    const items = source.map((item) => (
                        <div className="ps-layout__item" key={item.id}>
                            <ProductListPhotoImageView product={item} />
                        </div>
                    ));
                    view = (
                        <div className="ps-layout--list ps-shop-items">
                            {items}
                        </div>
                    );
                } else {
                    view = <p>No hay resultados de la busqueda.</p>;
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
        withListPosts: (source, loading, columns = 4) => {
            let view;
            if (!loading) {
                if (source && source.length > 0) {
                    if (numpagina == 1) {
                        const items = source.map((item, index) => (
                            index <= 9 ?
                                <div className="ps-layout__item" key={item.id}>
                                    <ProductListPosts product={item} />
                                </div>
                                :
                                null
                        ));
                        view = (
                            <div className="ps-layout--list ps-shop-items">
                                {items}
                            </div>
                        );
                    }else
                    if (numpagina == 2) {
                        const items = source.map((item, index) => (
                            index > 9 && index <= 19 ?
                                <div className="ps-layout__item" key={item.id}>
                                    <ProductListPosts product={item} />
                                </div>
                                :
                                null
                        ));
                        view = (
                            <div className="ps-layout--list ps-shop-items">
                                {items}
                            </div>
                        );
                    }
                    else
                    if (numpagina == 3) {
                        const items = source.map((item, index) => (
                            index > 19 && index <= 29 ?
                                <div className="ps-layout__item" key={item.id}>
                                    <ProductListPosts product={item} />
                                </div>
                                :
                                null
                        ));
                        view = (
                            <div className="ps-layout--list ps-shop-items">
                                {items}
                            </div>
                        );
                    }
                    else
                    if (numpagina == 4) {
                        const items = source.map((item, index) => (
                            index > 29 && index <= 39 ?
                                <div className="ps-layout__item" key={item.id}>
                                    <ProductListPosts product={item} />
                                </div>
                                :
                                null
                        ));
                        view = (
                            <div className="ps-layout--list ps-shop-items">
                                {items}
                            </div>
                        );
                    }

                } else {
                    view = <p>No hay resultados de la busqueda.</p>;
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
    };
}
