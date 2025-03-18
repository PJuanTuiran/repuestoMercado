import React from "react";

const HomeSixDelivery = () => {
    return (
        <>
            <div
                className="ps-delivery ps-home-delivery bg--cover"
                style={{
                    background:
                        "url(/static/img/promotion/banner-delivery-2.jpg)",
                }}>
                <div className="container">
                    <div className="ps-delivery__content">
                        <div className="ps-delivery__text">
                            <i className="icon-shield-check"></i>
                            <strong>100% Secure delivery </strong>without
                            contacting the courier
                        </div>
                        <a className="ps-delivery__more" href="#">
                            More
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSixDelivery;
