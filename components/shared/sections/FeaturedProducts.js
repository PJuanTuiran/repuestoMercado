import React, { useEffect } from "react";
import Link from "next/link";
const HomeOneFeaturedProducts = ({
    collectionSlug,
    title = "Featured Products",
    showAll = false,
}) => {
    
    let products = [];
    let showAllView;
    if (showAll) {
        showAllView = (
            <div className="ps-section__bottom">
                <Link href="/shop">
                    <a className="ps-btn ps-btn--outline ps-btn--">Show all</a>
                </Link>
            </div>
        );
    }
    return (
        <section className="ps-section--standard ps-featured-products">
            <div className="container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                </div>
                <div className="ps-section__content">{products}</div>
                {showAllView}
            </div>
        </section>
    );
};

export default HomeOneFeaturedProducts;
