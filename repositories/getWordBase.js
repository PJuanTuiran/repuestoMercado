import axios from "axios";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class WordBase {

    async getWordBase(params) {
        const reponse = await Repository.get(
            `${baseDomain}/37/37`
        )
            .then((response) => {
                //console.log("BASXXXX: ", response.data)
                if (response.data && response.data.listarpalabras.length > 0) {
                    return response.data.listarpalabras
                    ;
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

export default new WordBase();