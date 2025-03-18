import React from "react";
import Container from "~/components/layouts/Container";
import FeaturedProducts from "~/components/shared/sections/FeaturedProducts";
import BestDealOfWeek from "~/components/partials/homepages/sections/BestDealOfWeek";
import Subscribe from "~/components/shared/sections/Subscribe";
import LatestProducts from "~/components/partials/homepages/sections/LatestProducts";
import HomeTwoPromotionOne from "~/components/partials/homepages/home-2/HomeTwoPromotionOne";
import PopularCategoriesTwo from "~/components/partials/homepages/sections/PopularCategoriesTwo";
import BannerPromotion from "~/components/shared/sections/banners/BannerPromotion";
import HomeTwoPromotionTwo from "~/components/partials/homepages/home-2/HomeTwoPromotionTwo";
import HomeTwoTopBanner from "~/components/partials/homepages/home-2/HomeTwoTopBanner";
import FooterTwo from "~/components/shared/footers/FooterTwo";
import HeaderTwo from "~/components/shared/headers/HeaderTwo";
import FromBlog from "~/components/shared/sections/blog/FromBlog";

const HomeDefaultPage = () => {
    return (
        <Container
            title="Homepage 2"
            header={<HeaderTwo />}
            footer={<FooterTwo />}>
            <main id="homepage-two">
                <HomeTwoTopBanner />
                <HomeTwoPromotionOne />
                <PopularCategoriesTwo />
                <LatestProducts />
                <BestDealOfWeek />
                <div className='ps-home-banner-promotion container'>
                    <BannerPromotion />
                </div>

                <HomeTwoPromotionTwo />
                <FeaturedProducts />
                <FromBlog />
                <Subscribe />
            </main>
        </Container>
    );
};

export default HomeDefaultPage;
