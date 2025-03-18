import React from "react";

const HomeSevenSubscribe = () => {
    return (
        <div className="ps-home__block ps-home-blog">
            <div className="container">
                <div className="ps-home__row">
                    <div className="ps-home__blog">
                        <div className="ps-blog--latset">
                            <div className="ps-blog__thumbnail">
                                <a href="#">
                                    <img
                                        src="/static/img/blog/blog13-496x262.jpg"
                                        alt="alt"
                                    />
                                </a>
                                <div className="ps-blog__badge">
                                    <span className="ps-badge__item">
                                        MEDIC
                                    </span>
                                    <span className="ps-badge__item">
                                        PHARMACY
                                    </span>
                                    <span className="ps-badge__item">SALE</span>
                                </div>
                            </div>
                            <div className="ps-blog__content">
                                <div className="ps-blog__meta">
                                    <span className="ps-blog__date">
                                        May 18, 2021
                                    </span>
                                    <a className="ps-blog__author" href="#">
                                        Alfredo Austin
                                    </a>
                                </div>
                                <a className="ps-blog__title" href="#">
                                    The latest tests of popular masks in
                                    accordance with CV2s standards
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="ps-home__newsletter">
                        <section
                            className="ps-section--newsletter"
                            style={{
                                background:
                                    "url(/static/img/newsletter-bg.jpg)",
                            }}>
                            <h3 className="ps-section__title">
                                Join our newsletter and get $20 discount!
                            </h3>
                            <p className="ps-section__text">
                                *Solo para el primer pedido.
                            </p>
                            <div className="ps-section__content">
                                <form action="do_action" method="post">
                                    <div className="ps-form--subscribe">
                                        <div className="ps-form__control">
                                            <input
                                                className="form-control ps-input"
                                                type="email"
                                                placeholder="Ingrese su Email"
                                            />
                                            <button className="ps-btn ps-btn--warning">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSevenSubscribe;
