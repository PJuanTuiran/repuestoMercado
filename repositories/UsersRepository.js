import axios from "axios";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class UsersRepository {
    async createUser(params) {
        const reponse = await Repository.post(
            `${baseDomain}/4/?${serializeQuery(params)}`
            //`${baseDomain}/4/4`, params
        )
            .then((response) => {
                console.log("RESPONSE DATA : ", response.data)
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

export default new UsersRepository();

