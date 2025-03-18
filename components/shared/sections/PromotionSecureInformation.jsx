import React from "react";
import { baseUrl } from "~/repositories/Repository";
import FooterDefault from "~/components/shared/footers/FooterDefault";

const PromotionSecureInformation = () => {
    return (
        <div>
            {/*
 <div className="containerentregasseguras mb-20">
                <div className="textocolor ps-delivery__text">
                    <i className="icon-shield-check"></i>
                    <span>
                        <strong className="textocolor ">
                            Entregas 100% seguras, seguimiento en línea del estado del pedido.
                        </strong>
                    </span>
                </div>
                <a className="textocolor colordelfondo  ps-delivery__more" href="#">
                    Mas información
                </a>
            </div>
                */}
            <div className="containerfooterdefault">
                <FooterDefault />
            </div>
        </div>
    );
};

export default PromotionSecureInformation;
