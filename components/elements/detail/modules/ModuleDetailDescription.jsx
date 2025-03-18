import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Change your description content here
const ModuleDetailDescription = ({ product }) => {
    const [urlImagen, setUrlImagen] = useState("https://api.aal-estate.com");
    const [urlImagenDos, setUrlImagenDos] = useState(
        "https://api.aal-estate.com"
    );
    const [urlImagenTres, setUrlImagenTres] = useState(
        "https://api.aal-estate.com"
    );
    // Lee variables generales MRP
    const variablesGeneralesMrp = useSelector(
        (state) => state.variablesgeneralesmrp.variablesgeneralesmrp
    );

    useEffect(() => {
        if (variablesGeneralesMrp.length > 0) {
            product && product.images &&
                product && product.images.map((item, index) => {
                    if (index == 0) {
                        setUrlImagen(
                            variablesGeneralesMrp.direccionservidor +
                                product && product.images[0].url
                        );
                    } else if (index == 1) {
                        setUrlImagenDos(
                            variablesGeneralesMrp.direccionservidor +
                                product && product.images[1].url
                        );
                    } else if (index == 2) {
                        setUrlImagenTres(
                            variablesGeneralesMrp.direccionservidor +
                                product && product.images[2].url
                        );
                    }
                });

            //setUrlImagenDos(variablesGeneralesMrp.direccionservidor+product.images[1].url);
            //setUrlImagenTres(variablesGeneralesMrp.direccionservidor+product.images[2].url);
            //console.log("INFORMACION PRODUCTO : ", product);
        } else {
            //setUrlImagen("https://api.aal-estate.com" + product.images[0].url);
            //setUrlImagenDos("https://api.aal-estate.com"+product.images[1].url);
            //setUrlImagenTres("https://api.aal-estate.com"+product.images[2].url);

            product && product.images &&
                product && product.images.map((item, index) => {
                    if (index == 0) {
                        setUrlImagen(
                            "https://api.aal-estate.com" + product && product.images[0].url
                        );
                    } else if (index == 1) {
                        setUrlImagenDos(
                            "https://api.aal-estate.com" + product && product.images[0].url
                        );
                    } else if (index == 2) {
                        setUrlImagenTres(
                            "https://api.aal-estate.com" + product && product.images[0].url
                        );
                    }
                });
        }
    }, [variablesGeneralesMrp]);

    return (
        <div className="ps-product__description ps-document">
            <div>
                <div>
                    <p className="mtmenos40 mlmenos30 ps-desc colorbase">
                        {product && product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModuleDetailDescription;
