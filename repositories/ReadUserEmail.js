//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class ReadUserEmai {
    async getReadUsersEmail(params) {
        //console.log("USUARIOS : ", params)
        const reponse = await Repository.post(
            `${baseDomain}/21/?${serializeQuery(params)}`
            //`${baseDomain}/21`, params
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

export default new ReadUserEmai();