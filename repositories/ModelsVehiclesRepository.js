//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class ModelsVehiclesRepository {
    async getModelsVehicles(params) {
        //console.log("MARCA DE VEHICULO - MODELO : ", params)
        const reponse = await Repository.post(
            `${baseDomain}/10/?${serializeQuery(params)}`
            //`${baseDomain}/10/10`, params
        )
            .then((response) => {
                //if (response.data && response.data.length > 0) {
                if (response.data) {
                    //console.log("DATOS MODELOS VEHICULOS : ", response.data)
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

export default new ModelsVehiclesRepository();