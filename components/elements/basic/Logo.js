import React from "react";
import Link from "next/link";

const Logo = ({ url = "/", type = "default" }) => {
    if (type == "white") {
        return (
            <Link href={url}>
                <a className="ps-logo">
                    <img src="/static/img/logo-white.png" alt="logo" />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href={url}>
                <a className="logomr">
                    <img src="/static/img/logomr.png" alt="logo" />
                </a>
            </Link>
        );
    }
};

export default Logo;
