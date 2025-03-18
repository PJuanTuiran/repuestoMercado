import React, { useEffect, useState } from "react";
import ActiveLink from "~/components/elements/basic/ActiveLink";
import { Drawer } from "antd";
import { useRouter } from "next/router";
import MenuAccordion from "~/components/shared/menus/MenuAccordion";
import menu from "~/public/static/data/menu.json";
import { connect } from "react-redux";
import ModuleHeaderSwichers from "~/components/shared/headers/modules/ModuleHeaderSwitcher";
import ModuleHeaderContactNumber from "~/components/shared/headers/modules/ModuleHeaderContactNumber";
import FormSearchHeader from "~/components/shared/forms/FormSearchHeader";

const NavigationBottom = ({ ecomerce, classes, isActive = true }) => {
    const [isMenu, setIsMenu] = useState(false);
    const Router = useRouter();
    const { pathname } = Router;

    function handleOpenMenu(e) {
        e.preventDefault();
        setIsMenu(true);
    }

    function handleCloseMenu(e) {
        e.preventDefault();
        setIsMenu(false);
    }

    useEffect(() => {
        setIsMenu(false);
    }, [pathname]);

    return (
        <>
            <nav
                className={`navigation--bottom ${classes} ${
                    isActive && "active"
                }`}>
                <div className="navigation__content">
                    <a
                        className="navigation__item"
                        onClick={(e) => handleOpenMenu(e)}>
                        <i className="icon-menu"></i>
                    </a>
                    <ActiveLink activeClassName="active" href="/">
                        <a className="navigation__item">
                            <i className="icon-home2"></i>
                        </a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/my-account">
                        <a className="navigation__item">
                            <i className="icon-user"></i>
                        </a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/shop/wishlist">
                        <a className="navigation__item">
                            <i className="icon-heart"></i>
                        </a>
                    </ActiveLink>
                    <ActiveLink
                        activeClassName="active"
                        href="/shop/shopping-cart">
                        <a className="navigation__item cart">
                            <i className="icon-bag2"></i>
                            <span>
                                {ecomerce.cartItems &&
                                ecomerce.cartItems.length > 0
                                    ? ecomerce.cartItems.length
                                    : "0"}
                            </span>
                        </a>
                    </ActiveLink>
                </div>
            </nav>
            {
                /*
<Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                placement="left"
                width={400}
                onClose={(e) => handleCloseMenu(e)}
                visible={isMenu}>
                <div className="ps-drawer ps-drawer--with-menu">
                    <div className="ps-drawer__header">
                        <a
                            href="#"
                            className="ps-drawer__close"
                            onClick={(e) => handleCloseMenu(e)}>
                            <i className="icon-cross"></i>
                        </a>
                    </div>
                    <div className="ps-drawer__wrapper">
                        <div className="ps-drawer__menu">
                            <MenuAccordion
                                data={menu.main_menu_mobile}
                                classes="menu--accordion"
                            />
                        </div>
                        <div className="ps-drawer__footer">
                            <figure>
                                <FormSearchHeader />
                            </figure>
                            <figure>
                                <ModuleHeaderSwichers />
                            </figure>
                            <figure>
                                <ModuleHeaderContactNumber />
                            </figure>
                        </div>
                    </div>
                </div>
            </Drawer>
                */
            }
            
        </>
    );
};

export default connect((state) => state)(NavigationBottom);
