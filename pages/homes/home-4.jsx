import React from "react";
import Container from "~/components/layouts/Container";
import FeaturedProducts from "~/components/shared/sections/FeaturedProducts";
import HomeFourTopBanners from "~/components/partials/homepages/home-4/HomeFourTopBanners";
import PopularCategoriesThree from "~/components/partials/homepages/sections/PopularCategoriesThree";
import HomeFourPromotions from "~/components/partials/homepages/home-4/HomeFourPromotions";
import LatestProducts from "~/components/partials/homepages/sections/LatestProducts";
import BestDealOfWeek from "~/components/partials/homepages/sections/BestDealOfWeek";
import BannerPromotionThree from "~/components/shared/sections/banners/BannerPromotionThree";
import BannerPromotionFour from "~/components/shared/sections/banners/BannerPromotionFour";
import BannerPromotionFive from "~/components/shared/sections/banners/BannerPromotionFive";
import BannerPromotionSix from "~/components/shared/sections/banners/BannerPromotionSix";
import Subscribe from "~/components/shared/sections/Subscribe";
import FooterTwo from "~/components/shared/footers/FooterTwo";
import HeaderFour from "~/components/shared/headers/HeaderFour";

const HomeDefaultPage = () => {
    return (
        <Container
            title="Homepage 4"
            header={<HeaderFour />}
            footer={<FooterTwo classes="ps-footer-4" />}>
            <main id="homepage-four">
                <PopularCategoriesThree class="collect" />
                <HomeFourTopBanners />
                <HomeFourPromotions />
                <LatestProducts />
                <BestDealOfWeek />
                <BannerPromotionThree />
                <FeaturedProducts showAll={true} />
                <BannerPromotionFour />
                <LatestProducts />
                <BannerPromotionFive />
                <FeaturedProducts title="Popular in this week" showAll={true} />
                <BannerPromotionSix />
                <Subscribe />
            </main>
        </Container>
    );
};

export default HomeDefaultPage;
