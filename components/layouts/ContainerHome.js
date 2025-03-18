import React from "react";
import Head from "next/head";
import HeaderDefault from "~/components/shared/headers/HeaderDefault";
import FooterHome from "~/components/shared/footers/FooterHome";
import HeaderMobile from "~/components/shared/mobiles/HeaderMobile";

const ContainerHome = ({
    children,
    title = "Just a awesome website",
    header = <HeaderDefault />,
    footer = <FooterHome />,
}) => {
    let titleView;
    if (title !== undefined) {
        titleView = process.env.title + " | " + title;
    } else {
        titleView = process.env.title + " | " + process.env.titleDescription;
    }
    return (
        <div className="ps-root containerhome">
            <Head>
                <title>{titleView}</title>
            </Head>
            
            <HeaderMobile />
            {children}
            {
            //footer
            }
        </div>
    );
};

export default ContainerHome;
