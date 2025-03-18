import React from "react";
import ModuleFooterTop from "~/components/shared/footers/modules/ModuleFooterTop";
import ModuleFooterAddress from "~/components/shared/footers/modules/ModuleFooterAddress";
import ModuleFooterContact from "~/components/shared/footers/modules/ModuleFooterContact";
import WidgetFooterLinks from "~/components/shared/widgets/footer/WidgetFooterLinks";
import ModuleFooterBottom from "~/components/shared/footers/modules/ModuleFooterBottom";
import FooterLinks from "~/public/static/data/footer.json";

const FooterDefault = () => {
    return (
        <footer className="ps-footer ps-footer--1">
            <div className="container">
                <div className="row ps-footer__information">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-12">
                        <ModuleFooterAddress />
                    </div>
                    <div className="col-12 col-lg-8 col-md-8 col-sm-12">
                        <ModuleFooterContact />
                    </div>
                </div>
                <ModuleFooterBottom />
            </div>
        </footer>
    );
};

export default FooterDefault;
