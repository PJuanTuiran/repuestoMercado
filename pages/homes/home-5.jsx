import React from "react";
import Container from "~/components/layouts/Container";
import LatestProducts from "~/components/partials/homepages/sections/LatestProducts";
import HomeFivePromtions from "~/components/partials/homepages/home-5/HomeFivePromtions";
import PopularCategoriesFour from "~/components/partials/homepages/sections/PopularCategoriesFour";
import HomeFiveProductList from "~/components/partials/homepages/home-5/HomeFiveProductList";
import HomeFiveBannerProduct from "~/components/partials/homepages/home-5/HomeFiveBannerProduct";
import HomeFiveTopBanners from "~/components/partials/homepages/home-5/HomeFiveTopBanners";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import SiteFeatures from "~/components/shared/sections/SiteFeatures";
import BannerPromotion from "~/components/shared/sections/banners/BannerPromotion";
import FromBlog from "~/components/shared/sections/blog/FromBlog";
import FooterFour from "~/components/shared/footers/FooterFour";
import HeaderFive from "~/components/shared/headers/HeaderFive";

const HomeDefaultPage = () => {
    return (
        <Container
            title="Homepage 5"
            header={<HeaderFive />}
            footer={<FooterFour />}>
            <main id="homepage-five">
                <HomeFiveTopBanners />
                <HomeFivePromtions />
                <PopularCategoriesFour />
                <LatestProducts />
                <HomeFiveProductList />
                <div className="container">
                    <PromotionSecureInformation />
                </div>
                <HomeFiveProductList
                    reversed={true}
                    banner={<HomeFiveBannerProduct type={2} />}
                />
                <SiteFeatures />
                <HomeFiveProductList
                    banner={<HomeFiveBannerProduct type={3} />}
                />
                <div className="container">
                    <BannerPromotion />
                </div>
                <FromBlog />
            </main>
        </Container>
    );
};

export default HomeDefaultPage;
