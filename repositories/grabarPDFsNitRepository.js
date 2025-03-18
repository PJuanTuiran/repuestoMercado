import axios from "axios";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class grabarPDFsNitRepository{

    async getGrabarPDFsNit(params) {
        console.log("FORM DATA PDFS NIT : ", params)

        const response = await Repository.post(
            `${baseDomain}/23/?${serializeQuery(params)}`
            //`${baseDomain}/23/  `, params
        ).then((response) => {
            //console.log("VALOR DE RESPONSE EN API : ", response.data)
            if (response && response) {
                return response.data;
            } else {
                return null;
            }
        })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return response;
    }
}

export default new grabarPDFsNitRepository();