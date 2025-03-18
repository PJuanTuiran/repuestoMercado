//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class ReadBrandRepository {
    async getReadBrand(params) {
        console.log("LEER UNA MARCA VEHICULO : ", params)
        const reponse = await Repository.post(
            `${baseDomain}/24/?${serializeQuery(params)}`
            //`${baseDomain}/8/?$`, params
            
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
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

export default new ReadBrandRepository();