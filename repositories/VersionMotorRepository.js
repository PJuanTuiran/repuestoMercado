//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class VersionMotorRepository {
    async getVersionMotor(params) {
        const reponse = await Repository.post(
            `${baseDomain}/15/?${serializeQuery(params)}`
            //`${baseDomain}/15/15`, params
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

export default new VersionMotorRepository();