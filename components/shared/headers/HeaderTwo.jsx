import React, { useEffect, useState } from "react";
import { stickyHeader } from "~/utilities/common-helpers";
import FormSearchHeader from "~/components/shared/forms/FormSearchHeader";
import ModuleHeaderActions from "~/components/shared/headers/modules/ModuleHeaderActions";
import Logo from "~/components/elements/basic/Logo";
import ModuleHeaderTopBar from "~/components/shared/headers/modules/ModuleHeaderTopBar";
import ModuleHeaderContactNumber from "~/components/shared/headers/modules/ModuleHeaderContactNumber";
import ModuleHeaderCategories from "~/components/shared/headers/modules/ModuleHeaderCategories";
import ModuleHeaderSupplies from "~/components/shared/headers/modules/ModuleHeaderSupplies";
import Menu from "~/components/elements/menu/Menu";
import menu from "~/public/static/data/menu.json";

const HeaderTwo = () => {
    const [showNav, setShowNav] = useState(true);

    function handleShownav(e) {
        e.preventDefault();
        if (showNav) {
            setShowNav(false);
        } else {
            setShowNav(true);
        }
    }

    function handleStickyHeader() {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        const header = document.getElementById("header-sticky");
        if (header !== null) {
            if (number >= 300) {
                header.classList.add("header--sticky");
                setShowNav(false);
            } else {
                header.classList.remove("header--sticky");
                setShowNav(true);
            }
        }
    }

    useEffect(() => {
        if (process.browser) {
            window.addEventListener("scroll", handleStickyHeader);
        }
    }, []);

    return (
        <header className="header--desktop header--two" id="header-sticky">
            <ModuleHeaderTopBar />
            <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <Logo />
                        <a
                            href="#"
                            className="header__top-toggle"
                            onClick={(e) => handleShownav(e)}>
                            <i className="fa fa-bars"></i>
                        </a>
                        <ModuleHeaderContactNumber />
                    </div>
                    <div className="header__right">
                        <FormSearchHeader />
                        <ModuleHeaderActions />
                    </div>
                </div>
            </div>
            <div className={`header__bottom ${showNav ? "active" : ""}`}>
                <nav className="navigation--single">
                    <div className="container">
                        <ModuleHeaderCategories />
                        <ModuleHeaderSupplies />
                        <div className="navigation__menu">
                            <Menu
                                source={menu.home_two_menu}
                                className="menu menu--desktop"
                            />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default HeaderTwo;
