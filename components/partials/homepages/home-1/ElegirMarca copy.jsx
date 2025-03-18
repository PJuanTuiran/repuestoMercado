import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination]);
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getFiltroPrd } from "../../../../store/filtroprd/action";
import { getFiltroCondicionPrd } from "../../../../store/filtrocondicionprd/action";

const ElegirMarca = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    const marcas = [
        { nombre: "Bmw", imagen: "/static/img/Marcas/bmw.png" },
        { nombre: "Chevrolet", imagen: "/static/img/Marcas/chevrolet.jpg" },
        { nombre: "Dodge", imagen: "/static/img/Marcas/dodge.png" },
        { nombre: "Ford", imagen: "/static/img/Marcas/ford.png" },
        { nombre: "Citroen", imagen: "/static/img/Marcas/citroen.png" },
        { nombre: "Honda", imagen: "/static/img/Marcas/honda.png" },
        { nombre: "Jeep", imagen: "/static/img/Marcas/jeep.png" },
        { nombre: "Mercedes-benz", imagen: "/static/img/Marcas/mercedes.png" },
        { nombre: "Audi", imagen: "/static/img/Marcas/audi.png" },
        { nombre: "Cupra", imagen: "/static/img/Marcas/cupra.png" },
    ];

    const marcasDos = [
        { nombre: "Acura", imagen: "/static/img/Marcas/acura.png" },
        { nombre: "Alfa romeo", imagen: "/static/img/Marcas/AlfaRomeo.png" },
        { nombre: "Bajaj", imagen: "/static/img/Marcas/bajaj.png" },
        { nombre: "Bugatti", imagen: "/static/img/Marcas/Bugatti.png" },
        { nombre: "Ducati", imagen: "/static/img/Marcas/Ducati.png" },
        { nombre: "Fiat", imagen: "/static/img/Marcas/fiat.png" },
        { nombre: "Foton", imagen: "/static/img/Marcas/foton.png" },
        {
            nombre: "Freightliner",
            imagen: "/static/img/Marcas/freightliner.png",
        },
        { nombre: "Gmc", imagen: "/static/img/Marcas/Gmc.png" },
        { nombre: "Harley", imagen: "/static/img/Marcas/HaerleyDavinson.png" },
    ];

    const marcasTres = [
        { nombre: "Hino", imagen: "/static/img/Marcas/hino.png" },
        { nombre: "Hyunday", imagen: "/static/img/Marcas/Hyunday.png" },
        { nombre: "Isuzu", imagen: "/static/img/Marcas/isuzu.png" },
        { nombre: "Kenworth", imagen: "/static/img/Marcas/kenworth.png" },
        { nombre: "Kia", imagen: "/static/img/Marcas/Kia.png" },
        { nombre: "Ktm", imagen: "/static/img/Marcas/ktm.png" },
        { nombre: "Lamborghini", imagen: "/static/img/Marcas/Lambo.png" },
        { nombre: "Mitsubishi", imagen: "/static/img/Marcas/Mitsubishi.png" },
        { nombre: "Nissan", imagen: "/static/img/Marcas/Nissan.png" },
        { nombre: "Tesla", imagen: "/static/img/Marcas/Tesla.png" },
    ];

    const marcasCuatro = [
        { nombre: "Porsche", imagen: "/static/img/Marcas/posrsche.png" },
        { nombre: "Ram", imagen: "/static/img/Marcas/Ram.png" },
        { nombre: "Renault", imagen: "/static/img/Marcas/Renault.png" },
        {
            nombre: "Royal enfield",
            imagen: "/static/img/Marcas/RoyalEnfield.png",
        },
        { nombre: "Suzuki", imagen: "/static/img/Marcas/suzuki.png" },
        { nombre: "Toyota", imagen: "/static/img/Marcas/toyota.png" },
        { nombre: "Triumph", imagen: "/static/img/Marcas/triumph.png" },
        { nombre: "Volvo", imagen: "/static/img/Marcas/Volvo.png" },
        { nombre: "Wolkswagen", imagen: "/static/img/Marcas/wolkswagen.png" },
        { nombre: "Yamaha", imagen: "/static/img/Marcas/yamaha.png" },
    ];

    useEffect(() => {
        setLoaded(true);
    }, []);

    const selMarca = (nombremarca) => {
        dispatch(getFiltroPrd(0));
        dispatch(getFiltroCondicionPrd(0));
        localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        localStorage.setItem("filtrociudadprd", JSON.stringify([]));
        localStorage.setItem("filtroprecioprd", JSON.stringify([]));
        
        let texto = nombremarca.split(" ");
        let datfind = "";
        let longdatfind = 0;
        let longmenosuno = 0;
        let cadenaExtraida = "";

        texto &&
            texto.map((palabra) => {
                longdatfind = palabra.length;
                longmenosuno = longdatfind - 1;
                cadenaExtraida = palabra.substring(longmenosuno, longdatfind);

                if (cadenaExtraida == "s" || cadenaExtraida == "S") {
                    let cadenaExtraidaDos = palabra.substring(0, longmenosuno);
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else if (
                    cadenaExtraida == "a" ||
                    cadenaExtraida == "A" ||
                    cadenaExtraida == "o" ||
                    cadenaExtraida == "O"
                ) {
                    let cadenaExtraidaDos = palabra.substring(0, longmenosuno);
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else datfind = datfind + " " + palabra;
            });

        localStorage.setItem("eraseplaceholder", JSON.stringify(1));
        localStorage.setItem("placeholdersearch", JSON.stringify(nombremarca));
        localStorage.setItem("inputdata", JSON.stringify(nombremarca));

        let string = `${datfind}`;
        router.push(`/search?keyword=${string}`);
    };

    return (
        <div className="mainContElejirMarca">
            <div className="ContElejirMarca">
                <div ref={navigationPrevRef} className="BotonPrev">
                    <HiChevronLeft />
                </div>
                <div ref={navigationNextRef} className="BotonSig">
                    <HiChevronRight />
                </div>
                {loaded && (
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}>
                        {[marcas, marcasDos, marcasTres, marcasCuatro].map(
                            (marcas, slideIndex) => (
                                <SwiperSlide key={slideIndex}>
                                    <div className="subContElejirMarca">
                                        {marcas.map((marca, index) => (
                                            <div
                                                key={index}
                                                className="contBallMarcas"
                                                onClick={() =>
                                                    selMarca(marca.nombre)
                                                }>
                                                <div className="BallcontBallMarcas">
                                                    <img
                                                        src={marca.imagen}
                                                        alt=""
                                                        className="ImgBall"
                                                    />
                                                </div>
                                                <div className="contBallName">
                                                    <p>{marca.nombre}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default ElegirMarca;
