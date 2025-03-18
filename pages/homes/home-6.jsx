import React from "react";
import Container from "~/components/layouts/Container";
import LatestProducts from "~/components/partials/homepages/sections/LatestProducts";
import BannerPromotionThree from "~/components/shared/sections/banners/BannerPromotionThree";
import HomeSixPromotions from "~/components/partials/homepages/home-6/HomeSixPromotions";
import FeaturedProducts from "~/components/shared/sections/FeaturedProducts";
import BannerPromotionSeven from "~/components/shared/sections/banners/BannerPromotionSeven";
import HomeSixTopBanners from "~/components/partials/homepages/home-6/HomeSixTopBanners";
import HomeSixTopPromotion from "~/components/partials/homepages/home-6/HomeSixTopPromotion";
import FooterFour from "~/components/shared/footers/FooterFour";
import HeaderFour from "~/components/shared/headers/HeaderFour";
import HomeSixTestimonials from "~/components/partials/homepages/home-6/HomeSixTestimonials";
import HomeSixDelivery from "~/components/partials/homepages/home-6/HomeSixDelivery";

const HomeSixScreen = () => {
    return (
        <Container
            title="Homepage 6"
            header={<HeaderFour />}
            footer={<FooterFour />}>
            <main id="homepage-six" className="ps-home--6">
                <HomeSixTopBanners />
                <HomeSixTopPromotion />
                <LatestProducts />
                <BannerPromotionThree />
                <HomeSixPromotions />
                <FeaturedProducts />
                <BannerPromotionSeven />
                <HomeSixTestimonials />
                <HomeSixDelivery />
            </main>
        </Container>
    );
};

export default HomeSixScreen;
