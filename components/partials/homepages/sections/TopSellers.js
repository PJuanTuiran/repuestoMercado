import React, { useEffect, useState } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";

const categories = [
    {
        id: 1,
        text: "Blood pressure",
        collectionSlug: "top-5-best-sellers",
    },
    {
        id: 2,
        text: "Face masks",
        collectionSlug: "featured-products",
    },
    {
        id: 3,
        text: "Stomatology",
        collectionSlug: "best-deal-of-week",
    },
];

const TopSellers = ({ collectionSlug }) => {
    const { loading, productItems, getProductsByCollection } = useGetProducts();
    const { withCarousel } = useProductGroup();
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    function handleSelectedCategory(e, category) {
        e.preventDefault();
        getProductsByCollection(category.collectionSlug);
        setSelectedCategory(category);
    }

    useEffect(() => {
        getProductsByCollection("top-5-best-sellers");
    }, [collectionSlug]);
    const products = withCarousel(productItems, loading);

    // Views
    const categoriesView = categories.map((item) => (
        <li
            className={item.id === selectedCategory.id ? "active" : ""}
            key={item.id}>
            <a href="#" onClick={(e) => handleSelectedCategory(e, item)}>
                {item.text}
            </a>
        </li>
    ));

    return (
        <div className="ps-section--standard ps-best-sellers">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Top 5 Bestsellers in:</h3>
                    <ul className="ps-list--categories">{categoriesView}</ul>
                </div>
                <div className="ps-section__content">{products}</div>
            </div>
        </div>
    );
};

export default TopSellers;
