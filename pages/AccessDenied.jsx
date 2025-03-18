import React, { useEffect } from "react";
import Link from "next/link";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";

import LatestProducts from "~/components/partials/homepages/sections/LatestProducts";

const breadcrumb = [
    {
        id: 1,
        text: "Inicio",
        url: "/",
    },
    {
        id: 2,
        text: " 404",
    },
];

function Error({}) {
    return (
        <Container title="Page not found">
            <div className="ps-page ps-page--inner ps-page--notfound">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-page__content">
                        <div className="row mb-80">
                            <div className="col-12 col-md-6 col-lg-5">
                                <img
                                    src="/static/img/logomr.png"
                                    alt="cartoon-doctor"
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-7">
                                <h1 className="ps-page__name">Mercado Repuesto</h1>
                                <h5>
                                Tu cuenta se encuentra suspenida...
                                </h5>
                                <p>
                                    Si deseas mayor información comunucate con la Administración de MR
                                </p>
                               
                            </div>
                        </div>
                        <LatestProducts />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Error;
