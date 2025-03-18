import React from "react";
import Link from "next/link";

const BreadCrumb = ({ breacrumb }) => {
    return (
        <ul className="breadcrumb box-breadcrumb">
            {breacrumb.map((item) => {
                if (!item.url) {
                    return <li key={item.id}>{item.text}</li>;
                } else {
                    return (
                        <li key={item.text}>
                            <Link href={item.url}>
                                <a>{item.text}</a>
                            </Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default BreadCrumb;
