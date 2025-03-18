import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getFiltroPrd } from "../../../../store/filtroprd/action";
import { getFiltroCondicionPrd } from "../../../../store/filtrocondicionprd/action";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from "../../../../helpers/Constants";

const CategoriasRecomendadas = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [Imagenes, setImagenes] = useState([]);

    const selCategoria = (nombrecate) => {
        dispatch(getFiltroPrd(0));
        dispatch(getFiltroCondicionPrd(0));
        localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        localStorage.setItem("filtrociudadprd", JSON.stringify([]));
        localStorage.setItem("filtroprecioprd", JSON.stringify([]));

        let texto = nombrecate.split(" ");
        let datfind = "";
        let longdatfind = 0;
        let longmenosuno = 0;
        let cadenaExtraida = "";

        texto &&
            texto.map((palabra) => {
                longdatfind = palabra.length;
                longmenosuno = longdatfind - 1;
                cadenaExtraida = palabra.substring(
                    longmenosuno,
                    longdatfind
                );

                if (cadenaExtraida == "s" || cadenaExtraida == "S") {
                    let cadenaExtraidaDos = palabra.substring(
                        0,
                        longmenosuno
                    );
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else if (
                    cadenaExtraida == "a" ||
                    cadenaExtraida == "A" ||
                    cadenaExtraida == "o" ||
                    cadenaExtraida == "O"
                ) {
                    let cadenaExtraidaDos = palabra.substring(
                        0,
                        longmenosuno
                    );
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else datfind = datfind + " " + palabra;
            });

        localStorage.setItem("eraseplaceholder", JSON.stringify(1));
        localStorage.setItem("placeholdersearch", JSON.stringify(nombrecate));
        localStorage.setItem("inputdata", JSON.stringify(nombrecate));

        let string = `${datfind}`;
        router.push(`/search?keyword=${string}`);
    };

    useEffect(() => {
        const obtenerImagenes = async () => {
            let params = {
                recomendadas: 1
            }
            try {
                const res = await axios({
                    method: "POST",
                    url: URL_BD_MR + "215", params
                });
                //console.log("RESP REC : ", res.data)
                setImagenes(res.data.listsubcategorias);
            } catch (error) {
                console.error("Error al leer las imágenes", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerImagenes();
    }, []);
    //nombreimagen

    return (
        <div className="mainContCategoriasRecomendadas">
            <div className="titleCatRec">
                <h2 className="titleCatRecHDOS">Categorías recomendadas</h2>
            </div>
            {
                console.log("RESP REC : ", Imagenes)
            }
            <div className="CatRecomendadasBalls">
                {
                    Imagenes.length >= 1 &&
                    Imagenes && Imagenes[0].recomendadas == 1 ?
                        <div
                            className="contBall"
                            onClick={() => selCategoria(Imagenes && Imagenes[0].nombrecategoria)}>
                            <div className="BallcontBall">
                                <img
                                    src={`${URL_IMAGES_RESULTSSMS}${Imagenes && Imagenes[0].nombreimagen}`}
                                    alt=""
                                    className="ImgBall"
                                />
                            </div>
                            <div className="contBallName">
                                <p>
                                    {Imagenes[0].nombre}
                                </p>
                            </div>
                        </div>
                        :
                        null
                }

                {
                    Imagenes.length >= 2 &&
                    Imagenes && Imagenes[1].recomendadas == 1 ?
                        <div className="contBall"
                            onClick={() => selCategoria(Imagenes && Imagenes[1].nombrecategoria)}
                        >
                            <div className="BallcontBall">
                                <img
                                    src={`${URL_IMAGES_RESULTSSMS}${Imagenes && Imagenes[1].nombreimagen}`}
                                    alt=""
                                    className="ImgBall"
                                />
                            </div>
                            <div className="contBallName">
                                <p>
                                    {Imagenes[1].nombre}
                                </p>
                            </div>
                        </div>
                        :
                        null
                }

                {
                    Imagenes.length >= 3 &&
                    Imagenes && Imagenes[2].recomendadas == 1 ?
                        <div className="contBall"
                            onClick={() => selCategoria(Imagenes && Imagenes[2].nombrecategoria +
                                " " + " " + " " + " " + " " + " ")}
                        >
                            <div className="BallcontBall">
                                <img
                                    src={`${URL_IMAGES_RESULTSSMS}${Imagenes && Imagenes[2].nombreimagen}`}
                                    alt=""
                                    className="ImgBall"
                                />
                            </div>
                            <div className="contBallName">
                                <p>
                                    {Imagenes[2].nombre}
                                </p>
                            </div>
                        </div>
                        :
                        null
                }

                {
                    Imagenes.length >= 4 &&
                    Imagenes && Imagenes[3].recomendadas == 1 ?
                        <div className="contBall"
                            onClick={() => selCategoria(Imagenes && Imagenes[3].nombrecategoria)}
                        >
                            <div className="BallcontBall">
                                <img
                                    src={`${URL_IMAGES_RESULTSSMS}${Imagenes && Imagenes[3].nombreimagen}`}
                                    alt=""
                                    className="ImgBall"
                                />
                            </div>
                            <div className="contBallName">
                                <p>
                                    {Imagenes[3].nombre}
                                </p>
                            </div>
                        </div>
                        :
                        null}

                {
                    Imagenes.length >= 5 &&
                    Imagenes && Imagenes[4].recomendadas == 1 ?
                        <div className="contBall"
                            onClick={() => selCategoria(Imagenes && Imagenes[4].nombrecategoria)}
                        >
                            <div className="BallcontBall">
                                <img
                                    src={`${URL_IMAGES_RESULTSSMS}${Imagenes && Imagenes[4].nombreimagen}`}
                                    alt=""
                                    className="ImgBall"
                                />
                            </div>
                            <div className="contBallName">
                                <p>
                                    {Imagenes[4].nombre}
                                </p>
                            </div>
                        </div>
                        :
                        null
                }

                {
                    Imagenes.length >= 5 &&
                    Imagenes && Imagenes[5].recomendadas == 1 ?
                        <div className="contBall"
                            onClick={() => selCategoria(Imagenes && Imagenes[5].nombrecategoria)}
                        >
                            <div className="BallcontBall">
                                <img
                                    src={`${URL_IMAGES_RESULTSSMS}${Imagenes && Imagenes[5].nombreimagen}`}
                                    alt=""
                                    className="ImgBall"
                                />
                            </div>
                            <div className="contBallName">
                                <p>
                                    {Imagenes[5].nombre}
                                </p>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default CategoriasRecomendadas;
