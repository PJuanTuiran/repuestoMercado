import React from "react";
import ActiveLink from "~/components/elements/basic/ActiveLink";
import Logo from "~/components/elements/basic/Logo";
import Link from "next/link";

const ModuleFooterAddress = () => {
    return (
        <div className="ps-footer--address">
          
            <div className="ps-footer__title">Our store</div>
            <p> Ingresar Dirección </p>
            <ul className="ps-social">
                <li>
                    <a className="ps-social__link facebook" href="#">
                        <i className="fa fa-facebook"> </i>
                        <span className="ps-tooltip">Facebook</span>
                    </a>
                </li>
                <li>
                    <a className="ps-social__link instagram" href="#">
                        <i className="fa fa-instagram"></i>
                        <span className="ps-tooltip">Instagram</span>
                    </a>
                </li>
                <li>
                    <a className="ps-social__link youtube" href="#">
                        <i className="fa fa-youtube-play"></i>
                        <span className="ps-tooltip">Youtube</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ModuleFooterAddress;
