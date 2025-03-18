import React, { useState, useEffect } from "react";
import Head from "next/head";
import HeaderDefault from "~/components/shared/headers/HeaderDefault";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import HeaderMobile from "~/components/shared/mobiles/HeaderMobile";
import { useDispatch, useSelector } from "react-redux";

const ContainerAdmon = ({
    children,
    margen,
    title = "Mercado Repuesto",
    header = <HeaderDefault />,
    footer = <FooterDefault />,
}) => {
    let titleView;

    if (title !== undefined) {
        //titleView = process.env.title + " | " + title;
        titleView = title;
    } else {
        titleView = process.env.title + " | " + process.env.titleDescription;
    }

    const dispatch = useDispatch();
    // Lee datos generales del sistema del state

    return (
        <div className="ps-root">
            <Head>
                <title>{titleView}</title>
            </Head>
            {header}
            <HeaderMobile />
            {children}
            <div className={margen}>
                {footer}
                </div>
            {
                /*
                <HeaderMobile />
                {children}
                <div className={margen}>
                {footer}
                </div>
                */
            }
        </div>
    );
};

export default ContainerAdmon;
