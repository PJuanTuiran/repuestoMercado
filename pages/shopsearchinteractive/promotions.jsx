import React from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import BannerPromotionEight from "~/components/shared/sections/banners/BannerPromotionEight";
import PopularCategoriesTwo from "~/components/partials/homepages/sections/PopularCategoriesTwo";
import BestDealOfWeek from "~/components/partials/homepages/sections/BestDealOfWeek";
import PopularBrands from "~/components/shared/sections/PopularBrands";
import FeaturedProducts from "~/components/shared/sections/FeaturedProducts";
import FromBlog from "~/components/shared/sections/blog/FromBlog";
import Subscribe from "~/components/shared/sections/Subscribe";
import PopularCategoriesThree from "~/components/partials/homepages/sections/PopularCategoriesThree";
import PopularCategoriesFour from "~/components/partials/homepages/sections/PopularCategoriesFour";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },
    {
        id: 2,
        text: "Shop",
        url: "/shop",
    },
    {
        id: 3,
        text: "Shop Promotions",
    },
];

const ShopPromotionsScreen = () => {
    return (
        <Container title="Shop Promotions">
            <main className="ps-page ps-page--shopping ps-page--shop-promotion">
                <div className="ps-page__header">
                    <div className="container">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                </div>
                <div className="ps-section__content">
                    <BannerPromotionEight />
                    <PopularCategoriesTwo />
                    <BestDealOfWeek />
                    <PopularBrands />
                    <FeaturedProducts />
                    <FromBlog />
                    <Subscribe />
                </div>
            </main>
        </Container>
    );
};

export default ShopPromotionsScreen;
