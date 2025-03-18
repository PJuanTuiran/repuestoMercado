import React from "react";

const Subscribe = () => {
    return (
        <section
            className="ps-section--newsletter bg--cover"
            style={{ backgroundImage: "url(/static/img/newsletter-bg.jpg)" }}>
            <h3 className="ps-section__title">
                Join our newsletter and get <br />
                $20 discount for your first order
            </h3>
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
    );
};

export default Subscribe;
