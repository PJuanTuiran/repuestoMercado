import React from "react";
import Container from "~/components/layouts/Container";
import FeaturedProducts from "~/components/shared/sections/FeaturedProducts";
import BannerPromotionTwo from "~/components/shared/sections/banners/BannerPromotionTwo";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import TopSellers from "~/components/partials/homepages/sections/TopSellers";
import HomeThreeLastOffers from "~/components/partials/homepages/home-3/HomeThreeLastOffers";
import HomeThreeTopBanners from "~/components/partials/homepages/home-3/HomeThreeTopBanners";
import FooterThree from "~/components/shared/footers/FooterThree";
import HeaderThree from "~/components/shared/headers/HeaderThree";
import PopularCategoriesThree from "~/components/partials/homepages/sections/PopularCategoriesThree";
import HomeThreeWeekDeal from "~/components/partials/homepages/home-3/HomeThreeWeekDeal";

const HomeDefaultPage = () => {
    return (
        <Container
            title="Homepage 3"
            header={<HeaderThree />}
            footer={<FooterThree />}>
            <main id="homepage-three">
                <HomeThreeTopBanners />
                <PopularCategoriesThree />
                <HomeThreeWeekDeal />
                <HomeThreeLastOffers />
                <TopSellers />
                <div className="container">
                    <PromotionSecureInformation />
                </div>
                <FeaturedProducts />
                <BannerPromotionTwo />
            </main>
        </Container>
    );
};

export default HomeDefaultPage;
