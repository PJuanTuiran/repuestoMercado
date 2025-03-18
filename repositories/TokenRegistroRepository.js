//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class TokenRegistroRepository {
    async getTokenRegistro(params) {
        console.log("TOKEN REGISTRO : ", params)
        const reponse = await Repository.post(
            `${baseDomain}/12/?${serializeQuery(params)}`
            //`${baseDomain}/12`, params
        )
            .then((response) => {
                //if (response.data && response.data.length > 0) {
                if (response.data) {
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

export default new TokenRegistroRepository();