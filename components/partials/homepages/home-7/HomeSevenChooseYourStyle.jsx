import React, { useEffect } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";

const HomeSevenChooseYourStyle = () => {
    const { loading, productItems, getProducts } = useGetProducts();
    const { withGridDetail } = useProductGroup();
    useEffect(() => {
        getProducts({ _limit: 3 });
    }, []);

    return (
        <section
            className="ps-section--choose-style"
            style={{ background: "url(/static/img/related-bg.jpg)" }}>
            <div className="container">
                <h3 className="ps-section__title">Choose your style</h3>
                <div className="ps-section__content">
                    {withGridDetail(productItems, loading, 3)}
                </div>
            </div>
        </section>
    );
};

export default HomeSevenChooseYourStyle;
