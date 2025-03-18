import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ContainerPrd from "../../components/layouts/ContainerPrd";
import ModalMensajesWishList from "../../pages/mensajes/ModalMensajesWishList";
import InfoViewPrdSingle from "~/components/shared/widgets/InfoViewPrdSingle";
import SingleProductView from "~/components/elements/detail/SingleProductView";
import WidgetShopRelatedProducts from "~/components/shared/widgets/WidgetShopRelatedProducts";
import WidgetShopPromotion from "~/components/shared/widgets/WidgetShopPromotion";
import CustomerBought from "~/components/partials/products/CustomerBought";
import useGetProducts from "~/hooks/useGetProducts";
import FooterDefault from "../../components/shared/footers/FooterDefault";

const ProductDetailPage = () => {
    const Router = useRouter();
    const { id } = Router.query;
    const { loading, product, getProductById, getPublicatById } =
        useGetProducts();
    //console.log("DATOS PRODUCTO : ", product);
    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [irInicio, setIrInicio] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    useEffect(() => {
        if (id) {
            if (id > 0) getProductById(id);
            else getPublicatById(id);
        }

        let okwishlist = JSON.parse(localStorage.getItem("itemswishlistadd"));
        if (okwishlist == "Ok") {
            localStorage.setItem("itemswishlistadd", JSON.stringify(null));
            setShowModalMensajes(true);
            setTituloMensajes("Lista de deseos");
            let texto = "Producto agregado a lista de deseo";
            setTextoMensajes(texto);
        }
    }, [id]);

    useEffect(() => {
        if (product) setNombreProducto(product.name);
        setIrInicio(true);
    }, [product]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <SingleProductView product={product} />;
    }

    const breadcrumb = [
        {
            id: 1,
            text: "Inicio",
            url: "/",
        },
        {
            id: 2,
            text: "Tienda",
            url: "/shop",
        },
        {
            id: 3,
            text: nombreProducto,
        },
    ];

    const handleClickScroll = () => {
        const element = document.getElementById("section-1");
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIrInicio(false);
    };

    useEffect(() => {
        if (irInicio) {
            handleClickScroll();
        }
    }, [irInicio]);

    return (
        <ContainerPrd title="Product">
            <div className="ps-page ps-page--product" id="section-1">
                <ModalMensajesWishList
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <div className="container">
                    <div className="ps-page__header ml-51">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-layout--with-sidebar ps-reverse">
                        <div className="ps-layout__left">
                            <InfoViewPrdSingle />
                            <div className="ml-40">
                                <WidgetShopRelatedProducts />
                            </div>
                        </div>
                        <div className="ps-layout__right">{productView}</div>
                    </div>
                </div>
            </div>
            
            <div className="margenfooterproductview">
                <FooterDefault />
            </div>
        </ContainerPrd>
    );
};

export default ProductDetailPage;
