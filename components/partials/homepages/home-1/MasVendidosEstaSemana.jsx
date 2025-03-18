import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { HiChevronLeft } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";
import { RiSettings5Fill } from "react-icons/ri";
import axios from 'axios';
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../../helpers/Constants";
import { useRouter } from "next/router";
import { Grid, } from '@mui/material';


const MasVendidosEstaSemana = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    useEffect(() => {
        setLoaded(true);
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "17",
            })
                .then((res) => {
                    // Selecciona 10 productos aleatorios de la respuesta
                    const randomProducts = res.data.sort(() => 0.5 - Math.random()).slice(0, 10);
                    setProducts(randomProducts);
                    setLoaded(true);
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del producto", error);
                });
        };

        fetchProducts();
    }, []);

    const addItemHistoryPrd = async (product) => {
        let datauser = JSON.parse(localStorage.getItem("datauser"));

        let params = {
            idproducto: product.id,
            usuario: datauser.uid,
            compatible: product.compatible,
        };

        //console.log("PARMASSS: ", params)
        //return

        await axios({
            method: "post",
            url: URL_BD_MR + "87",
            params,
        })
            .then((res) => {

                console.log("EROR R RLEER : ", res.data);

                if (res.data > 0) {
                    console.log("LEER : ", res.data);
                } else console.log("ERROR : ", res.data);
            })
            .catch(function (error) {
                console.log("ERROR : ", res.data);
                return;
            });
    };

    return (
        <div className="mainProductosMasVendidos">
            <Grid container style={{ width: '100%' }}>
                <Grid item xs={6} style={{ padding: 0, marginTop: '2rem' }} />
                <Grid item xs={6} style={{ padding: 0, height: '60px' }} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <div className="TitleMasvendidos">
                        <p>Productos mas vendidos esta semana</p>
                    </div>
                </Grid>
                <div className="mainMasVendidos">
                    <div ref={navigationPrevRef} className="my-custom-prev-button"><HiChevronLeft /></div>
                    <div ref={navigationNextRef} className="my-custom-next-button"><HiChevronRight /></div>
                    <div className="SubMainMasVendidos">
                        {loaded ? (
                            <Swiper
                                slidesPerView={5}
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}
                            >
                                {products.map((product, index) => (
                                    <SwiperSlide key={index} style={{ borderRight: '0.5px solid rgba(128, 128, 128, 0.1)' }}>
                                        <div className="SlideSwiper"
                                            onClick={() => addItemHistoryPrd(product)}
                                        >
                                            <div className="SlideSwiperImgDescuento">
                                                <div className="subSlideSwiperImgDescuento">
                                                    <img src={`${URL_IMAGES_RESULTS}${product?.images[0]?.name}`} alt="" onClick={() => router.push(`/product/${product?.id}`)} />
                                                    <div className="circleDescuento">-22%</div>
                                                </div>

                                            </div>
                                            <div className="SlideSwiperPrecioyTexto">
                                                <div className="NombreProductoSwiper">
                                                    <p onClick={() => router.push(`/product/${product?.id}`)}>{product?.name}</p>
                                                </div>
                                                <div className="precio2ProductoSwiper">
                                                    <p>${product?.sale_price.toLocaleString('en-US')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : null}
                    </div>
                </div>
            </Grid>
        </div>


    );
};

export default MasVendidosEstaSemana;
