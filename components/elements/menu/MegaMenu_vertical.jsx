import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Nav,
    NavDropdown,
    Dropdown,
    ButtonGroup,
    Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MegaMenu = ({ source, classes = "mega-menu", onlyItems = false }) => {
    const [show, setShow] = useState(true);

    let megaContentView;
    if (source) {
        megaContentView = source.megaContent.map((item) => (
            <div className="mega-menu__column" key={item.heading}>
                <div className="mega-menuvertical">
                    <Dropdown as={ButtonGroup}  id="mega-menu-basic">
                        <Button className="mega-menuvertical btn-primary" >{item.heading}</Button>

                        <Dropdown.Toggle
                            split
                            variant="success"
                            id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>
                        {item.megaItems.map((subItem) => (
                            <Dropdown.Item className="mega-menuverticalitems" href={subItem.url}>
                                {subItem.text}
                            </Dropdown.Item>
                             ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        ));
    }
    if (!onlyItems) {
        return (
            <li className="menu-item-has-children has-mega-menu">
                <Link href={source.url !== "" ? source.url : "/"}>
                    <a>
                        {source.icon && <i className={source.icon}></i>}
                        {source.text}
                    </a>
                </Link>
                <div className={classes}>
                    <div className="mega-menu__wrapper">{megaContentView}</div>
                </div>
            </li>
        );
    } else {
        return (
            <div className={classes}>
                <div>{megaContentView}</div>
            </div>
        );
    }
};
//<div className="mega-menu">{megaContentView}</div>

export default MegaMenu;
