import React from "react";
import ModuleFooterTop from "~/components/shared/footers/modules/ModuleFooterTop";
import ModuleFooterAddress from "~/components/shared/footers/modules/ModuleFooterAddress";
import ModuleFooterContact from "~/components/shared/footers/modules/ModuleFooterContact";
import WidgetFooterLinks from "~/components/shared/widgets/footer/WidgetFooterLinks";
import ModuleFooterBottom from "~/components/shared/footers/modules/ModuleFooterBottom";
import FooterLinks from "~/public/static/data/footer.json";
import ModuleFooterCategories from "~/components/shared/footers/modules/ModuleFooterCategories";

const FooterTwo = ({ classes = "ps-footer--two" }) => {
    return (
        <footer className={`ps-footer ps-footer--2 ${classes}`}>
            <ModuleFooterTop />
            <div className="container">
                <div className="ps-footer__middle">
                    <ModuleFooterCategories />
                    <div className="row  ps-footer__content">
                        <div className="col-12 col-lg-6">
                            <div className="row">
                                <div className="col-6 col-md-4">
                                    <WidgetFooterLinks
                                        source={FooterLinks.information}
                                    />
                                </div>
                                <div className="col-6 col-md-4">
                                    <WidgetFooterLinks
                                        source={FooterLinks.account}
                                    />
                                </div>
                                <div className="col-6 col-md-4">
                                    <WidgetFooterLinks
                                        source={FooterLinks.store}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="row">
                                <div className="col-12 col-md-7">
                                    <ModuleFooterContact />
                                </div>
                                <div className="col-12 col-md-5">
                                    <ModuleFooterAddress />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModuleFooterBottom />
            </div>
        </footer>
    );
};

export default FooterTwo;
