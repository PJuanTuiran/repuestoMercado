import React, { useEffect, useState } from "react";
import Logo from "~/components/elements/basic/Logo";
import { stickyHeaderModile } from "~/utilities/common-helpers";
import ModuleHeaderNotice from "~/components/shared/headers/modules/ModuleHeaderNotice";
import FormSearchHeader from "~/components/shared/forms/FormSearchHeader";
import Header from "../../elements/header/Header";

const HeaderMobile = () => {
    const [search, setSearch] = useState(false);

    function handleToggleSearch(e) {
        e.preventDefault();
        setSearch(!search);
    }

    useEffect(() => {
        if (process.browser) {
            window.addEventListener("scroll", stickyHeaderModile);
        }
    }, []);

    let searchView;
    if (search) {
        searchView = (
                <FormSearchHeader />
        );
    }

    return (
        <>
            <ModuleHeaderNotice classes="mobile-only" />
            <header
                className="header header--mobile"
                data-sticky="true"
                id="header-sticky-mobile">
                <div className="header__left">
                    <Logo />
                </div>
                <div className="header__right">
                    <a
                        className="header__search"
                        href="#"
                        onClick={(e) => handleToggleSearch(e)}>
                        <i className="icon-magnifier"></i>
                    </a>
                </div>
                {search && 
            <div className="header__searchbox">
                <Header slim />
            </div>
                
                }
            </header>
        </>
    );
};

export default HeaderMobile;
