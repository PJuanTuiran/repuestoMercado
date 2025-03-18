import React from "react";
import ModuleFooterCopyright from "~/components/shared/footers/modules/ModuleFooterCopyright";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";

const ModuleFooterBottom = () => {
    const router = useRouter();

    const pagarwompi = () =>{
         router.push("/pasarelas/Wompi");
    }
    return (
        <div className="ps-footer--bottom">
            <div className="row">
                <div className="col-12 col-md-6">
                    <ModuleFooterCopyright />
                </div>
                <div className="col-12 col-md-6 text-right">
                    <Row>
                        <Col md={4}>
                            <img onClick={pagarwompi}
                                className="imagenpasareladepago"
                                src="/static/img/pasarelaspago/wompi.png"
                                alt=""
                            />
                        </Col>
                        <Col md={4}>
                            <img
                                className="payment-light"
                                src="/static/img/payment-light.png"
                                alt=""
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default ModuleFooterBottom;
