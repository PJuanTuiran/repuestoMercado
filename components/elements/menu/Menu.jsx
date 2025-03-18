import React from "react";
import Link from "next/link";
import MenuDropdown from "~/components/elements/menu/MenuDropdown";
import MegaMenu from "~/components/elements/menu/MegaMenu";
import ModuleMenuHomepages from "~/components/elements/menu/modules/ModuleMenuHomepages";

const Menu = ({ source, className }) => {
    // Views
    let menuView;
    //console.log("SOURCE : ", source)
    if (source) {
        menuView = source.map((item) => {
            if (item.subMenu) {
                return <MenuDropdown source={item} key={item.text} />;
            } else if (item.megaContent) {
                return <MegaMenu source={item} key={item.text} />;
            } else if (item.external) {
                if (item.module === "homepages") {
                    return (
                        <li
                            className="menu-item-has-children has-mega-menu"
                            key={item.module}>
                            <Link href={item.url}>
                                <a>{item.text}</a>
                            </Link>
                            <div className="mega-menu">
                                <ModuleMenuHomepages />
                            </div>
                        </li>
                    );
                }
            } else {
                return (
                    <li key={item.text}>
                        <Link href={item.url}>
                            <a>
                                {item.icon && <i className={item.icon}></i>}
                                {item.text}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
