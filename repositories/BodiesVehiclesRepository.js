//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class BodiesVehiclesRepository {
    async getBodiesVehicles(params) {
        const reponse = await Repository.post(
            `${baseDomain}/11/?${serializeQuery(params)}`
            //`${baseDomain}/11/`//, params
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

export default new BodiesVehiclesRepository();