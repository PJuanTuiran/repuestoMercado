//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class ReadDatosGenerales {
    async getReadDataGeneral(params) {
        //console.log("PARAMETRO VEHICULOS BRANDS : ", params)
        const reponse = await Repository.get(
            `${baseDomain}/997/997`
        )
            .then((response) => {
                if (response.data && response.data) {
                    //console.log("DATA GENRAL : ",  response.data)
                    return response.data;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new ReadDatosGenerales();