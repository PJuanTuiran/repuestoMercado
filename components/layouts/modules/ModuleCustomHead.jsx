import React from "react";
import Head from "next/head";

const ModuleCustomHead = () => (
    <Head>
        <title>Mercado Repuesto - React Ecomerce Template with RESTFul API</title>
        <link rel="shortcut icon" href="/static/img/favicon.png" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content="Mymedi - Ecomerce React Template" />
        <meta name="keywords" content="react template" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,500;0,600;0,700;0,800;1,400&display=swap"
            rel="stylesheet"
        />
        <link rel="stylesheet" href="css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="css/styles.css"></link>
    </Head>
);

export default ModuleCustomHead;
