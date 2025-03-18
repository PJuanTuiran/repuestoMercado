import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { getDataWishList } from "../../store/datawishlist/action";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";

function RefreshWishlist(props) {
    const {setRefresh} = props;
    const dispatch = useDispatch();
    const [itemsListWish, setItemsListWish] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let numberitemswishlist = useSelector(
        (state) => state.wishlist.datawishlist
    );

    useEffect(() => {
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "54",
                params,
            })
                .then((res) => {
                    setItemsListWish(res.data.listaritemdeseos);
                    dispatch(getDataWishList(res.data.listaritemdeseos.length));
                    setRefresh(false);
                })
                .catch(function (error) {
                    console.log("Error leyendo datos lista deseos");
                });
        };
        leerItems();
    }, [numberitemswishlist, isLoading, datosusuarios]);
    // view

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 500);
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <div className="ps-page ps-page--inner">
            {isLoading ? <LoadingSearchResult /> : null}
        </div>
    );
}

export default RefreshWishlist;
