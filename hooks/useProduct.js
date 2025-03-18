import React from "react";
import LazyLoad from "react-lazyload";
import { baseUrlProduct } from "~/repositories/Repository";
import { formatCurrency } from "~/utilities/product-helper";
import Link from "next/link";

function getImageURL(source, size) {
    let image, imageURL;

    if (source) {
        if (size && size === "large") {
            if (source.formats.large) {
                image = source.formats.large.url;
            } else {
                image = source.url;
            }
        } else if (size && size === "medium") {
            if (source.formats.medium) {
                image = source.formats.medium.url;
            } else {
                image = source.url;
            }
        } else if (size && size === "thumbnail") {
            if (source.formats.thumbnail) {
                image = source.formats.source.url;
            } else {
                image = source.url;
            }
        } else if (size && size === "small") {
            if (source.formats.small !== undefined) {
                image = source.formats.small.url;
            } else {
                image = source.url;
            }
        } else {
            image = source.url;
        }
        imageURL = `${baseUrlProduct}${image}`;
    } else {
        imageURL = `/static/img/undefined-product-thumbnail.jpg`;
    }
    return imageURL;
}

export default function useProduct() {
    return {
        thumbnailImages: (payload) => {
            if (payload && payload) {
                if (payload && payload.thumbnail) {
                    return (
                        <>
                            <LazyLoad>
                                <img
                                    src={getImageURL(payload.thumbnail)}
                                    alt=""
                                />
                            </LazyLoad>
                            <LazyLoad>
                                <img
                                    src={getImageURL(payload.thumbnail)}
                                    className="second"
                                    alt=""
                                />
                            </LazyLoad>
                        </>
                    );
                }
            }
        },
        price: (payload) => {
            let view;
            if (payload && payload.sale_price) {
                view = (
                    <p className="ps-product__price sale">
                        <span>$</span>
                        {formatCurrency(payload.sale_price)}
                        {/*
                        <del className="ml-2">
                            <span>$</span>
                            {formatCurrency(payload.price)}
                        </del>
                        */}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>$</span>
                        {formatCurrency(payload.price)}
                    </p>
                );
            }
            return view;
        },
        pricerelated: (payload) => {
            let view;
            if (payload && payload.sale_price) {
                view = (
                    <p className="ps-product__price sale fomatoprecioprdrelated">
                        <span>$</span>
                        {formatCurrency(payload && payload.sale_price)}
                        {/*
                        <del className="ml-2">
                            <span>$</span>
                            {formatCurrency(payload.price)}
                        </del>
                        */}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>$</span>
                        {formatCurrency(payload && payload.price)}
                    </p>
                );
            }
            return view;
        },
        pricerelatedsearch: (payload) => {
            let view;
            if (payload && payload.sale_price) {
                view = (
                    <p className="ps-product__price sale fomatoprecioprdrelatedsearch">
                        <span>$</span>
                        {formatCurrency(payload && payload.sale_price)}
                        {/*
                        <del className="ml-2">
                            <span>$</span>
                            {formatCurrency(payload.price)}
                        </del>
                        */}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>$</span>
                        {formatCurrency(payload && payload.price)}
                    </p>
                );
            }
            return view;
        },
        pricesearch: (payload) => {
            let view;
            if (payload && payload.sale_price) {
                view = (
                    <p className="ps-product__price sale ml-30">
                        <span>$</span>
                        {formatCurrency(payload && payload.sale_price)}
                        {/*
                        <del className="ml-2">
                            <span>$</span>
                            {formatCurrency(payload.price)}
                        </del>
                        */}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>$</span>
                        {formatCurrency(payload && payload.price)}
                    </p>
                );
            }
            return view;
        },
        priceviewsingle: (payload) => {
            let view;
            if (payload && payload.sale_price) {
                view = (
                    <p className="nameprdviewsingle sale">
                        <span>$</span>
                        {formatCurrency(payload.sale_price)}
                        {/*
                        <del className="ml-2">
                            <span>$</span>
                            {formatCurrency(payload.price)}
                        </del>
                        */}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>$</span>
                        {formatCurrency(payload && payload.price)}
                    </p>
                );
            }
            return view;
        },
        badges: (payload) => {
            let view = null;
            if (payload && payload.badges && payload && payload.badges.length > 0) {
                const items = payload && payload.badges.map((item) => {
                    if (item.value === "hot") {
                        return (
                            <span
                                className="ps-product__badge hot"
                                key={item.id}>
                                Hot
                            </span>
                        );
                    }
                    if (item.value === "new") {
                        return (
                            <span
                                className="ps-product__badge new"
                                key={item.id}>
                                New
                            </span>
                        );
                    }
                    if (item.value === "sale") {
                        return (
                            <span
                                className="ps-product__badge sale"
                                key={item.id}>
                                Sale
                            </span>
                        );
                    }
                });
                view = <div className="ps-product__badges">{items}</div>;
            }
            return view;
        },
        onSale: (payload) => {
            let view = null;
            if (payload && payload.sale_price && payload && payload.on_sale) {
                const discountPercent = (
                    ((payload && payload.sale_price - payload && payload.price) / payload && payload.price) *
                    100
                ).toFixed(0);
                view = (
                    <span className="ps-product__on-sale">
                        -{discountPercent}%
                    </span>
                );
            }
            return view;
        },
        brand: (payload) => {
            let view;
            if (payload && payload.product_brands && payload && payload.product_brands.length > 0) {
                view = (
                    <Link href="/shop">
                        <a className="tamañotextoubicacioninfoproducto">
                            {payload && payload.product_brands[0].name}
                        </a>
                    </Link>
                );
            } else {
                view = (
                    <Link href="/shop">
                        <a className="text-capitalize">No Brand</a>
                    </Link>
                );
            }
            return view;
        },
    };
}
