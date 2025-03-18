import React, { useEffect } from "react";
import { stickyHeader } from "~/utilities/common-helpers";
import FormSearchHeader from "~/components/shared/forms/FormSearchHeader";
import ModuleHeaderActions from "~/components/shared/headers/modules/ModuleHeaderActions";
import ModuleHeaderNotice from "~/components/shared/headers/modules/ModuleHeaderNotice";
import Logo from "~/components/elements/basic/Logo";
import ModuleHeaderSwichers from "~/components/shared/headers/modules/ModuleHeaderSwitcher";
import ModuleHeaderCategories from "~/components/shared/headers/modules/ModuleHeaderCategories";

const HeaderFour = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener("scroll", stickyHeader);
        }
    }, []);

    return (
        <header
            className="header--desktop header--three header--four"
            id="header-sticky">
            <ModuleHeaderNotice />
            <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <Logo />
                        <ModuleHeaderCategories />
                    </div>
                    <div className="header__center">
                        <FormSearchHeader />
                    </div>
                    <div className="header__right">
                        <ModuleHeaderSwichers />
                        <ModuleHeaderActions />
                    </div>
                </div>
            </div>
            <div className="header__bottom"></div>
        </header>
    );
};

export default HeaderFour;
