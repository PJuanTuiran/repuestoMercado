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

    const selCategoria = (data) => {
        console.log("CATEGO : ", data);

        localStorage.setItem("ctrlposicionprd", JSON.stringify(data.codigoposicion));
        localStorage.setItem("posicionprd", JSON.stringify(data.codigoposicion));
        localStorage.setItem("esgenerico", JSON.stringify(false));

        let subcategenericos = JSON.parse(localStorage.getItem("subcategenericos"));

        subcategenericos &&
            subcategenericos.map((row, ind) => {
                if (data.codigocategoria == row.codigocategoria) {
                    localStorage.setItem(
                        "codigogenerico",
                        JSON.stringify(row.value * -1)
                    );
                }
            });

        let string = data.nombre.toLowerCase();
        router.push(`/search?keyword=${string}`);
        return
        /*
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
                */

        //let string = `${datfind}`;
        //router.push(`/search?keyword=${string}`);
    };

    useEffect(() => {
        //subcategrecomendadas
        let subcategrecomendadas = JSON.parse(localStorage.getItem("subcategrecomendadas"));
        setImagenes(subcategrecomendadas);
    }, []);


    /*
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
    */
    //nombreimagen

    return (
        <div className="mainContCategoriasRecomendadas">
            <div className="titleCatRec">
                <h2 className="titleCatRecHDOS">Categorías recomendadas</h2>
            </div>

            <div className="CatRecomendadasBalls">

                {Imagenes && Imagenes.map((categ, index) => (
                    <div>
                        <div
                            className="contBall"
                            onClick={() => selCategoria(categ)}>
                            <div className="BallcontBall">
                                <img
                                    src={`${URL_IMAGES_RESULTSSMS}${categ.nombreimagen}`}
                                    alt=""
                                    className="ImgBall"
                                />
                            </div>
                            <div className="textcatremondada">
                                {categ.nombre}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CategoriasRecomendadas;
