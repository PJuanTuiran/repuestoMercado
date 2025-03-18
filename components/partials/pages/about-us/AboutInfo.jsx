import React from "react";

const AboutInfo = () => {
    return (
        <section className="ps-about--info">
            <h2 className="ps-about__title">
                Effective and reliable <br />
                protection for your teeth
            </h2>
            <p className="ps-about__subtitle">
                The brush handle fits perfectly in the hand, is slim and
                beautifully made.
            </p>
            <div className="ps-about__extent">
                <div className="row m-0">
                    <div className="col-12 col-md-4 p-0">
                        <div className="ps-block--about">
                            <div className="ps-block__icon">
                                <img
                                    src="/static/img/icon/award-icon-2.png"
                                    alt=""
                                />
                            </div>
                            <h4 className="ps-block__title">
                                Health Certificate 2000 - <br />
                                professional care
                            </h4>
                            <div className="ps-block__subtitle">
                                The highest quality and protection for your
                                teeth
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-0">
                        <div className="ps-block--about">
                            <div className="ps-block__icon">
                                <img
                                    src="/static/img/icon/dentistry-icon-2.png"
                                    alt=""
                                />
                            </div>
                            <h4 className="ps-block__title">
                                Sonic cleaning <br />
                                and whitening power
                            </h4>
                            <div className="ps-block__subtitle">
                                At the same time, it protects and whitens
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-0">
                        <div className="ps-block--about">
                            <div className="ps-block__icon">
                                <img
                                    src="/static/img/icon/toothbrush-icon-2.png"
                                    alt=""
                                />
                            </div>
                            <h4 className="ps-block__title">
                                3 types <br />
                                of cleaning tips
                            </h4>
                            <div className="ps-block__subtitle">
                                Round, rectangular and super-wide
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutInfo;
