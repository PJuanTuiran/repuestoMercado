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
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS, URL_IMAGES_MARCAS } from "../../../../helpers/Constants";

let mas = 0;
let menos = 0;
let longitud = 0;

const ElegirMarca = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [Imagenes, setImagenes] = useState(null);
    const [ImagenesDos, setImagenesDos] = useState(null);
    const [ImagenesTres, setImagenesTres] = useState(null);
    const [ImagenesCuatro, setImagenesCuatro] = useState(null);
    const [ImagenesCinco, setImagenesCinco] = useState(null);
    const [ImagenesSeis, setImagenesSeis] = useState(null);

    const [numImagenes, setNumImagenes] = useState(0);

    const [sumarClick, setSumarClick] = useState(0);
    const [restarClick, setRestarClick] = useState(0);

    const [classSig, setClassSig] = useState("BotonSig");
    const [classAnt, setClassAnt] = useState("BotonPrev");

    const [loaded, setLoaded] = useState(false);
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

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

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "213",
                });

                console.log("Imágenes xx", res.data.listimgmarcas);

                setNumImagenes(res.data.listimgmarcas.length);
                longitud = res.data.listimgmarcas.length;

                let marcasUno = [];
                let marcasDos = [];
                let marcasTres = [];
                let marcasCuatro = [];
                let marcasCinco = [];

                let marcaunica = [];
                res.data.listimgmarcas &&
                    res.data.listimgmarcas.map((row, index) => {

                        let marca = row.imagenmarca;
                        let validar;

                        validar = marcaunica.includes(marca);
                        if (!validar) {
                            //console.log("DATXX : ", compara, find)
                            marcaunica.push(marca);

                            if (marcasUno.length < 10) {
                                marcasUno.push(row);
                            } else
                                if (marcasDos.length < 10) {
                                    marcasDos.push(row);
                                } else
                                    if (marcasTres.length < 10) {
                                        marcasTres.push(row);
                                    } else
                                        if (marcasCuatro.length < 10) {
                                            marcasCuatro.push(row);
                                        } else
                                            if (marcasCinco.length < 10) {
                                                marcasCinco.push(row);
                                            }
                        }

                    });

                setImagenes(marcasUno);
                setImagenesDos(marcasDos);
                setImagenesTres(marcasTres);
                setImagenesCuatro(marcasCuatro);
                setImagenesCinco(marcasCinco);
            } catch (error) {
                console.error("Error al leer las imágenes", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerImagenes();
    }, []);

    const addClick = () => {
        mas = mas + 1;

        setSumarClick(mas);
        if (longitud > 9 && longitud <= 19 && mas == 1) {
            setClassSig("BotonSig bloquear")
        } else
            if (longitud > 20 && longitud <= 29 && mas == 2) {
                setClassSig("BotonSig bloquear")
            } else
                if (longitud > 30 && longitud <= 39 && mas == 3) {
                    setClassSig("BotonSig bloquear")
                } else
                    if (longitud > 40 && longitud <= 49 && mas == 4) {
                        setClassSig("BotonSig bloquear")
                    }
    }

    const removeClick = () => {
        if (mas > -1)
            mas = mas - 1;
        else
            if (mas == -1)
                mas = 0;

        setRestarClick(mas);
        setClassSig("BotonSig")
    }

    return (
        <div className="mainContElejirMarca">
            <div className="ContElejirMarca">
                <div ref={navigationPrevRef} className={classAnt}
                    onClick={() => removeClick()}
                >
                    <HiChevronLeft />
                </div>
                <div ref={navigationNextRef} className={classSig}
                    onClick={() => addClick()}
                >
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
                        {[Imagenes, ImagenesDos, ImagenesTres, ImagenesCuatro, ImagenesCinco].map(
                            (marcas, slideIndex) => (
                                <SwiperSlide key={slideIndex}>
                                    <div className="subContElejirMarca">
                                      
                                        {marcas && marcas.map((marca, index) => (
                                            <div>
                                                {marca.imagenmarca ?
                                                    <div
                                                        key={index}
                                                        className="contBallMarcas"
                                                        onClick={() =>
                                                            selMarca(marca.text)
                                                        }>
                                                        <div className="BallcontBallMarcas">
                                                            <img
                                                                src={`${URL_IMAGES_MARCAS}${marca.imagenmarca}`}
                                                                alt=""
                                                                className="ImgBall"
                                                            />
                                                        </div>
                                                        <div className="contBallName">
                                                            <p>{marca.text}</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                }
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
