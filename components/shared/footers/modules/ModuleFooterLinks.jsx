import React from "react";
import Link from "next/link";
const ModuleFooterLinks = () => {
    return (
        <>
            <div className="ps-footer--listpage ps-footer__links">
                <div className="row">
                    <div className="col-4 col-md-2">
                        <ul className="ps-footer__list">
                            <li>
                                <a href="#">About us</a>
                            </li>
                            <li>
                                <a href="#">Delivery information</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4 col-md-2">
                        <ul className="ps-footer__list">
                            <li>
                                <a href="#">Affiliate</a>
                            </li>
                            <li>
                                <a href="#">Sales</a>
                            </li>
                            <li>
                                <a href="#">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4 col-md-2">
                        <ul className="ps-footer__list">
                            <li>
                                <a href="#">Bestsellers</a>
                            </li>
                            <li>
                                <a href="#">Discount</a>
                            </li>
                            <li>
                                <a href="#">Latest products</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4 col-md-2">
                        <ul className="ps-footer__list">
                            <li>
                                <a href="#">My account</a>
                            </li>
                            <li>
                                <a href="#">My orders</a>
                            </li>
                            <li>
                                <a href="#">Returns</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4 col-md-2">
                        <ul className="ps-footer__list">
                            <li>
                                <a href="/">Shipping</a>
                            </li>
                            <li>
                                <a href="/">Wishlist</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4 col-md-2"></div>
                </div>
            </div>
        </>
    );
};

export default ModuleFooterLinks;
