import React from "react";
import Link from "next/link";

const HomeSevenPromotion = () => {
    return (
        <section
            className="ps-promotion--home-seven bg--cover"
            style={{ background: "url(/static/img/goby-unsplash.jpg)" }}>
            <img src="/static/img/goby-unsplash.jpg" alt="" />
            <div className="ps-section__content">
                <div className="ps-banner__content">
                    <span>New</span>
                    <h3>
                        New stylish colors <br />
                        now available!
                    </h3>
                    <p>
                        Choose a color that really <br />
                        matches your personality
                    </p>
                    <Link href="/shop">
                        <a className="ps-btn">Shop now</a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeSevenPromotion;
