import React from "react";
import { LuShieldCheck } from "react-icons/lu";
import { PiHandCoinsBold } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";

const AyudaUsuarios = () => {
    
    return (
        <div className="MainAyudaUsuarios">
            <div className="SubAyudaUsuarios">

                <div className="SubAyudaUsuariosSubcont">
                    <div className="iconoContAyudaUsers">
                        <LuShieldCheck />
                    </div>
                    <div>
                        <h6>Compras 100% seguras</h6>
                        <p> Tus compras son 100% seguras. <br /> Utilizamos tecnologías avanzadas para <br /> proteger tu información.</p>
                    </div>
                </div>

                <div className="SubAyudaUsuariosSubcont">
                    <div className="iconoContAyudaUsers">
                        <PiHandCoinsBold />
                    </div>
                    <div>
                        <h6>Elige como vas a pagar</h6>
                        <p>Sabemos que cada cliente <br /> tiene preferencias diferentes. Te damos la <br /> opción de elegir tu método de pago.</p>
                    </div>
                </div>

                <div className="SubAyudaUsuariosSubcont UltSubAyudaUsuariosSubcont">
                    <div className="iconoContAyudaUsers">
                        <FaShippingFast />
                    </div>
                    <div>
                        <h6>Envios express</h6>
                        <p>¿Necesitas tu pedido lo más pronto <br /> posible? Ofrecemos envíos express <br /> para que recibas tus productos <br /> en menos de 48 horas.</p>
                    </div> 
                </div>

            </div>
        </div>
    );
};

export default AyudaUsuarios;
