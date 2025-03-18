import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import { useRouter } from "next/router";

const SedanScreen = () => {
    const Router = useRouter();
    let products = "";

    return (
        <Container title="Sedan">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <h1 className="ps-page__heading">
                            Vehiculos Tipo Sedan
                        </h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar">
                           <h1>
                         
                           </h1>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SedanScreen;
