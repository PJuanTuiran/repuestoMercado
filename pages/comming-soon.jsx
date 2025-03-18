import React from "react";
import Logo from "~/components/elements/basic/Logo";
import CountDown from "~/components/elements/CountDown";

const CommingSoonScreen = () => {
    return (
        <>
            <div
                className="ps-coming ps-coming--v1"
                data-background="img/bg-comming-soon.jpg"
                style={{ background: "url(/static/img/bg-comming-soon.jpg)" }}>
                <div className="container">
                    <Logo />
                    <div className="ps-coming__content">
                        <h1 className="ps-coming__title">Coming Soon</h1>
                        <p className="ps-coming__text">Opening Soon!</p>
                        <div className="ps-countdown">
                            <div className="ps-countdown__content">
                                <CountDown
                                    time="12 31 2021, 6:00 am"
                                    format="MM DD YYYY, h:mm a"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommingSoonScreen;
