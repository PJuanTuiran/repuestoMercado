import React, { useEffect } from "react";
import CountDown from "~/components/elements/CountDown";

const BestDealOfWeek = ({ collectionSlug }) => {
    let products;

    return (
        <div className="ps-section--standard ps-best-deal-of-week">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Mejores Ofertas de la Semana!</h3>
                    <CountDown
                        time="12 31 2021, 6:00 am"
                        format="MM DD YYYY, h:mm a"
                    />
                </div>
                <div className="ps-section__content">{products}</div>
            </div>
        </div>
    );
};

export default BestDealOfWeek;
