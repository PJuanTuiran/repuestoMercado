import React, { useEffect, useState, useRef } from "react";
import Container from "~/components/layouts/Container";
import ShopSearch from "~/components/partials/shop/ShopSearch";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import { getCancelCondition } from "../../store/cancelcondition/action";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ModuleDetailTabsPosts from "../../components/elements/detail/modules/ModuleDetailTabsPosts";

//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";

let controlcond = false;
let holder = 0;
let valdata = 0;

const ViewStats = (props) => {
    const irA = useRef(null);
    const Router = useRouter();
    const [visitasPrd, setVisitasPrd] = useState([]);

    // Asignamos Datos al arreglo de Usuarios desde el state
    let addedtocart = useSelector((state) => state.addedtocart.addedtocart);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const cancelcondition = useSelector(
        (state) => state.cancelcondition.cancelcondition
    );

    let visitasprd = null;
    //console.log("PRODUCT : ", visitasprd);

    if (typeof window !== "undefined") {
        if (Router.query.visitasprd) {
            visitasprd = JSON.parse(Router.query.visitasprd);
        }
    }

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [visitasprd]);

    return (
        <div ref={irA}>
            <Container title="Product">
                <div className="cajaverestadisticasprd">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12}>
                            <ModuleDetailTabsPosts visitasPrd={visitasprd} />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default ViewStats;
