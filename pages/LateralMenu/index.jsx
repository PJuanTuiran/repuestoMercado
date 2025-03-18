import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppMenu from "./AppMenu";

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawerPaper: {
        marginTop: 450,
        width: drawerWidth,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        background: "#D4D6E5",
        color: "#2D2E83",
    },
    content: {
        flexGrow: 1,
        height: 100,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

function index(props) {
    const { state, setState } = props;
    const router = useRouter();
    const classes = useStyles();

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    return (
        <div className="divmenulateral">
            <AppMenu/>
        </div>
    );
}

export default index;
