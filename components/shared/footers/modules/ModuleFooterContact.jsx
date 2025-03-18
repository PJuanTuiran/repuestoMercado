import React from "react";

const ModuleFooterContact = () => {
    return (
        <div className="ps-footer--contact">
            <div className="ps-footer__fax">
                <i className="icon-telephone"></i>
                 Necesita Ayuda : +57 311 2312123
                 <a
                    className="ps-footer__email"
                    href="mailto:contact@example.com">
                    {" "}
                    <i className="icon-envelope"></i>
                    info@mercadorepuesto.com{" "}
                </a>

            </div>
            <p className="ps-footer__work">
                Lunes – Viernes: 8:00-18:00 - Sábado : 8:00 – 15:00
            </p>
        </div>
    );
};

export default ModuleFooterContact;
