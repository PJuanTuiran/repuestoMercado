/*
 * used for home-5
 * */

import React from "react";
import ModuleFooterTop from "~/components/shared/footers/modules/ModuleFooterTop";
import ModuleFooterCategories from "~/components/shared/footers/modules/ModuleFooterCategories";
import ModuleFooterContact from "~/components/shared/footers/modules/ModuleFooterContact";
import ModuleFooterAddress from "~/components/shared/footers/modules/ModuleFooterAddress";
import ModuleFooterNewLetter from "~/components/shared/footers/modules/ModuleFooterNewLetter";
import ModuleFooterLinks from "~/components/shared/footers/modules/ModuleFooterLinks";
import ModuleFooterBottom from "~/components/shared/footers/modules/ModuleFooterBottom";

const FooterFour = () => {
    return (
        <>
            <footer className="ps-footer ps-footer--5">
                <ModuleFooterTop />
                <div className="container">
                    <div className="ps-footer__middle">
                        <ModuleFooterCategories />
                        <div className="row ps-footer__box">
                            <div className="col-12 col-md-4">
                                <ModuleFooterContact />
                            </div>
                            <div className="col-12 col-md-4">
                                <ModuleFooterAddress />
                            </div>
                            <div className="col-12 col-md-4">
                                <ModuleFooterNewLetter />
                            </div>
                        </div>
                        <ModuleFooterLinks />
                    </div>
                    <ModuleFooterBottom />
                </div>
            </footer>
        </>
    );
};

export default FooterFour;
