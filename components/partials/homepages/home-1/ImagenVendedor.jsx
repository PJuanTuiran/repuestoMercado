import React from "react";
import { useRouter } from "next/router";

const ImagenVendedor = () => {

    const router = useRouter();
    const registrarse = () => {
        router.push("/my-account");
    };


    return (
        <div className="mainContImgVendedor">
              <img src="https://i.postimg.cc/QMyLvxpc/6.png" alt=""  onClick={()=>registrarse()}/>
        </div>
    );
};

export default ImagenVendedor; 