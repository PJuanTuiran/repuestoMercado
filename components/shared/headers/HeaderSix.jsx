import React, { useEffect } from "react";
import { stickyHeader } from "~/utilities/common-helpers";
import FormSearchHeader from "~/components/shared/forms/FormSearchHeader";
import ModuleHeaderActions from "~/components/shared/headers/modules/ModuleHeaderActions";
import ModuleHeaderNotice from "~/components/shared/headers/modules/ModuleHeaderNotice";
import Logo from "~/components/elements/basic/Logo";
import ModuleHeaderSwichers from "~/components/shared/headers/modules/ModuleHeaderSwitcher";
import ModuleHeaderTopBar from "~/components/shared/headers/modules/ModuleHeaderTopBar";
import ModuleHeaderCategories from "~/components/shared/headers/modules/ModuleHeaderCategories";
import ModuleHeaderSupplies from "~/components/shared/headers/modules/ModuleHeaderSupplies";
import Menu from "~/components/elements/menu/Menu";
import menu from "~/public/static/data/menu.json";

const HeaderThree = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener("scroll", stickyHeader);
        }
    }, []);

    return (
        <header className="header--desktop header--six" id="header-sticky">
            <ModuleHeaderTopBar />
            <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <Logo />

                        <nav className="navigation--single">
                            <ModuleHeaderCategories />
                            <ModuleHeaderSupplies />
                            <Menu
                                source={menu.home_six_menu}
                                className="menu menu--desktop"
                            />
                        </nav>
                    </div>

                    <div className="header__right">
                        <ModuleHeaderActions search={true} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderThree;
