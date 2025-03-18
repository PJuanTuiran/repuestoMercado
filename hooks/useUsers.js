import { useState } from "react";
import axios from "axios";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api/";

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);

    return {
        loading,
        setLoading: (payload) => {
            setLoading(payload);
        },

        //Crea usuario en Firebase
        getUsers: async (payload) => {
            setLoading(true);
            let responseData;
            let url = `${baseDomain}/4/`;

            if (payload) {
                responseData = await axios(
                    {
                        method: 'post',
                        url:url,
                        params: payload
                    })
            } else {
                console.log("Debe Enviar el Usuario y la Contraseña")
            }

            if (responseData) {

                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
            return responseData;
        },

    };
}
