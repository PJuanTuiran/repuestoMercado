import React from "react";
import { calculateAmount } from "~/utilities/ecomerce-helpers";
import Link from "next/link";

const ModuleEcomerceCartSummary = ({ cartItems }) => {
    // view
    let totalView;

    if (cartItems) {
        if (cartItems && cartItems.length > 0) {
            totalView = calculateAmount(cartItems);
        } else {
            totalView = "0.00";
        }
    }

    return (
        <div className="ps-block--cart-summary">
            <div className="ps-block__header">
                <h4>Valor total en el carrito</h4>
            </div>
            <div className="ps-block__content">
                <div className="ps-block__records">
                    <p>
                        <span>Subtotal</span>
                        <strong>${totalView}</strong>
                    </p>
                     
                    <p>   
                        <span>
                        Transporte: Ingrese su dirección para ver las opciones de envío.{" "}
                        </span>
                    </p>
                    <p className="total">
                        <span>Total</span>
                        <strong>${totalView}</strong>
                    </p>
                </div>
                <div className="ps-block__bottom">
                    <Link href="/shop/checkout">
                        <a className="ps-btn ps-btn--orange">
                            Ir a Pagar
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModuleEcomerceCartSummary;
