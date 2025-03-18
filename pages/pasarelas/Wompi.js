import { text } from "dom-helpers";
import React, { Suspense, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Container from "~/components/layouts/Container";
import { useRouter } from "next/router";

function Wompi(props) {
    const [showModal, setShowModal] = useState(true);
    const router = useRouter();

    const regresar = () => {
        setShowModal(false);
        router.push("/");
    }
//<input type="hidden" name="redirect-url" value="https://api.aal-estate.com/mrp/api/14" />
    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner ">
                <div className="container">
                    <Modal show={showModal}>
                        <Modal.Header className="titulopasarela" >
                            <h2>PAGAR A TRAVES DE WOMPI</h2>
                        </Modal.Header>
                        <form action="https://checkout.wompi.co/p/" method="GET">
                            <input type="hidden" name="public-key" value="pub_test_Xnmo3SoUCyyUOwkhsstfScsgLDOnfN2F" />
                            <input type="hidden" name="currency" value="COP" />
                            <input type="hidden" name="amount-in-cents" value="7890000" />
                            <input type="hidden" name="reference" value="37DNKF84S92N11" />
                            <input type="hidden" name="redirect-url" value="https://gimcloud.com.co/mrp/api/14" />
                            <input type="hidden" name="tax-in-cents:vat" value="1290000" />
                            <input type="hidden" name="tax-in-cents:consumption" value="590000" />
                            <input type="hidden" name="customer-data:email" value="williamcastrov@gmail.com" />
                            <input type="hidden" name="customer-data:full-name" value="William Castro" />
                            <input type="hidden" name="customer-data:phone-number" value="573155337803" />
                            <input type="hidden" name="customer-data:legal-id" value="79206558" />
                            <input type="hidden" name="customer-data:legal-id-type" value="CC" />
                            <input type="hidden" name="shipping-address:address-line-1" value="Cra 30 # 72 sur 02 La Doctora" />
                            <input type="hidden" name="shipping-address:country" value="CO" />
                            <input type="hidden" name="shipping-address:phone-number" value="573155337803" />
                            <input type="hidden" name="shipping-address:city" value="Sabaneta" />
                            <input type="hidden" name="shipping-address:region" value="Antioquia" />
                            <Row >
                            <Col md={2}>
                            </Col>
                            <Col md={4}>
                                <Button className="botonpasarela" size="lg" type="submit">Pagar con Wompi</Button>
                            </Col>
                            <Col md={4}>
                                <Button className="botonpasarela" onClick={regresar} size="lg">Regresar a MR</Button>
                            </Col>
                        </Row>
                    </form>
                </Modal>
            </div>
        </div>
        </Container >
    );
}

export default Wompi;