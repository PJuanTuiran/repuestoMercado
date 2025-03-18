import React from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import Shop from "~/components/partials/shop/Shop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import FormContact from "~/components/shared/forms/FormContact";
const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },
    {
        id: 2,
        text: "Shop",
        url: "/shop",
    },
    {
        id: 3,
        text: " Face Masks - protective",
    },
];

const ContactUsScreen = () => {
    return (
        <Container title="Contact Us">
            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-contact">
                            <div className="row">
                                <div className="col-12 col-lg-4">
                                    <div className="ps-contact__info">
                                        <h2 className="ps-contact__title">
                                            How can we help you?
                                        </h2>
                                        <p className="ps-contact__text">
                                            We are at your disposal 7 days a
                                            week!
                                        </p>
                                        <h3 className="ps-contact__fax">
                                            0020 500 – MYMEDI – 000
                                        </h3>
                                        <div className="ps-contact__work">
                                            Monday – Friday: 9:00-20:00
                                            <br />
                                            Saturday: 11:00 – 15:00
                                        </div>
                                        <div className="ps-contact__email">
                                            <a href="mailto:contact@example.com">
                                                contact@example.com
                                            </a>
                                        </div>
                                        <ul className="ps-social">
                                            <li>
                                                <a
                                                    className="ps-social__link facebook"
                                                    href="#">
                                                    <i className="fa fa-facebook">
                                                        {" "}
                                                    </i>
                                                    <span className="ps-tooltip">
                                                        Facebook
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="ps-social__link instagram"
                                                    href="#">
                                                    <i className="fa fa-instagram"></i>
                                                    <span className="ps-tooltip">
                                                        Instagram
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="ps-social__link youtube"
                                                    href="#">
                                                    <i className="fa fa-youtube-play"></i>
                                                    <span className="ps-tooltip">
                                                        Youtube
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="ps-social__link pinterest"
                                                    href="#">
                                                    <i className="fa fa-pinterest-p"></i>
                                                    <span className="ps-tooltip">
                                                        Pinterest
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="ps-social__link linkedin"
                                                    href="#">
                                                    <i className="fa fa-linkedin"></i>
                                                    <span className="ps-tooltip">
                                                        Linkedin
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <div className="ps-contact__map">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.822845645748!2d-97.1301607845029!3d32.770434891627616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7dcf27b929d9%3A0xc63407d6f47753b9!2s1487%20Rocky%20Canyon%20Rd%2C%20Arlington%2C%20TX%2076012%2C%20USA!5e0!3m2!1sen!2s!4v1616124426616!5m2!1sen!2s"
                                            width="600"
                                            height="450"
                                            allowFullScreen=""
                                            loading="lazy"></iframe>
                                    </div>
                                </div>
                            </div>
                            <FormContact />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContactUsScreen;
