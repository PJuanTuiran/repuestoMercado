import axios from "axios";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class ActivateUserRepository {

    async getActivateUser(params) {

        const response = await Repository.post(
            `${baseDomain}/20/?${serializeQuery(params)}`
            //`${baseDomain}/20`, params
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

export default new ActivateUserRepository();