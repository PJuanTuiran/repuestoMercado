import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import BreadCrumb from "~/components/elements/BreadCrumb";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import Shop from "~/components/partials/shop/Shop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import Container from "~/components/layouts/Container";

const CategoryScreen = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const { loading, category, getCategoryBySlug } = useGetProducts();
    const { withGrid } = useProductGroup();

    useEffect(() => {
        slug && getCategoryBySlug(slug);
    }, [slug]);

    let products;
    if (category) {
        if (category.products.length > 0) {
            products = withGrid(category.products, loading, 6);
        } else {
            products = <p>No hay resultados para tu busqueda.</p>;
        }
    }

    const breadcrumb = [
        {
            id: 1,
            text: "Home",
            url: "/",
        },

        {
            id: 2,
            text: category ? category.name : "Category",
        },
    ];

    return (
        <>
            <Container title={category ? category.name : "Category"}>
                <div className="ps-page ps-page--shopping">
                    <div className="container">
                        <div className="ps-page__header">
                            <BreadCrumb breacrumb={breadcrumb} />
                            <h1 className="ps-page__heading">
                                {category ? category.name : "Category"}
                                <sup>
                                    (
                                    {category && category.products.length > 0
                                        ? category.products.length
                                        : 0}
                                    )
                                </sup>
                            </h1>
                        </div>
                        <div className="ps-page__content">
                            <Shop classes="ps-shop--grid" actions={false}>
                                {products}
                            </Shop>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default CategoryScreen;
