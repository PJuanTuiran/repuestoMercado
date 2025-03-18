import React from "react";
import Link from "next/link";

const ModuleDetailMeta = () => (
    <div className="ps-product__specification">
        <p>
            <strong>Tags: </strong>
            <Link href="/shop">
                <a>Thermometer</a>
            </Link>
            <Link href="/shop">
                <a>Health</a>
            </Link>
        </p>
        <p>
            <strong>SKU: </strong>
            <span>AU110876</span>
        </p>
    </div>
);

export default ModuleDetailMeta;
