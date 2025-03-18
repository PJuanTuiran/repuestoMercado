import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import { baseUrl } from "~/repositories/Repository";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";
import { Box, Grid, Button } from "@mui/material";

let long = 5;
let itemindex = 0;

const ModuleDetailThumbnail = ({ product, vertical = true }) => {
    const [current, setCurrent] = useState(0);
    const [classArrow, setclassArrow] = useState("left-arrow");
    const [imgInit, setImgInit] = useState(0);
    const [imgEnd, setImgEnd] = useState(4);
    const length = product && product.images.length;

    if (product && product.images.length > 0) long = product && product.images.length;

    const nextSlide = (item, control) => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const nextSlideCarrusel = (item, control) => {
        setCurrent(item);
    };

    useEffect(() => {
        let imgInicia = 0;
        let imgFinal = 0;
        if(current == 0 || current == 1 || current == 2 || current == 3 || current == 4){
            imgInicia = 0;
            imgFinal = 4;
            setImgInit(imgInicia);
            setImgEnd(imgFinal);
        }else
        if(current == 5 || current == 6 || current == 7 || current == 8 || current == 9){
            imgInicia = 5;
            imgFinal = 9;
            setImgInit(imgInicia);
            setImgEnd(imgFinal);
        }
    }, [current]);


    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        let long = product && product.images.length;

        let imgInicia = 0;
        let imgFinal = 0;
        if (current <= 4) {
            imgInicia = 0;
            imgFinal = 4;
            setImgInit(imgInicia);
            setImgEnd(imgFinal);
        } else {
            imgInicia = 5;
            imgFinal = 10;
            setImgInit(imgInicia);
            setImgEnd(imgFinal);
        }
    };

    if (!Array.isArray(product && product.images) || product && product.images.length <= 0) {
        return null;
    }

    return (
        <div className="mlmenos40 mtmenos80">
            <div className="mlmenos15">
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={1} md={1} lg={1}>
                        <FaAngleLeft
                            className="right-arrow-carrosuel"
                            onClick={prevSlide}
                        />
                    </Grid>
                    <Grid item xs={9} md={9} lg={9}>
                        <div className="mt-100 ">
                            {product && product.images &&
                                product && product.images.map((slide, index) => {
                                    let image = baseUrl + slide.url;
                                    itemindex = index;
                                    return (
                                        <div>
                                            {index == current && (
                                                <img
                                                    src={image}
                                                    alt="travel image"
                                                    className="image sinborder"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1} lg={1}>
                        <FaAngleRight
                            className="left-arrow-carrosuel"
                            onClick={() => nextSlide(0, 0)}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className="slider margen">
                <FaAngleLeft className="right-arrow" onClick={prevSlide} />
                <FaAngleRight
                    className={"left-arrow"}
                    onClick={() => nextSlide(0, 0)}
                />
                <div className="mlmenos100"></div>
                {product && product.images &&
                    product && product.images.map((slide, index) => {
                        let image = baseUrl + slide.url;

                        return (
                            <div key={index}>
                                {index >= imgInit &&
                                    index <= imgEnd &&
                                    (index == current ? (
                                        <img
                                            src={image}
                                            alt="travel imageall"
                                            className="imageallmarcada"
                                            onClick={() => nextSlideCarrusel(index, 1)}
                                        />
                                    ) : (
                                        <img
                                            src={image}
                                            alt="travel imageall"
                                            className="imageall apuntador"
                                            onClick={() => nextSlideCarrusel(index, 1)}
                                        />
                                    ))}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ModuleDetailThumbnail;
