//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class ReadTypeVehicleRepository {
    async getReadTypeVehicle(params) {
        const reponse = await Repository.get(
        `${baseDomain}/25/?${serializeQuery(params)}`
            //`${baseDomain}/2/2`
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

export default new ReadTypeVehicleRepository();