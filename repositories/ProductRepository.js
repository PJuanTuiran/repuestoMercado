//import Repository, { baseDomain, serializeQuery } from "./Repository";
import Repository, { serializeQuery } from "./Repository";
//const baseDomain = "https://api.aal-estate.com/mrp/api";
const baseDomain = "https://gimcloud.com.co/mrp/api";

export async function getTotalRecords() {
    const reponse = await Repository.get(`${baseDomain}/products/count`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
}

export async function getProductsByIds(payload) {
    //console.log("CODIGO PRODUCTO 0 : ", payload);

    const endPoint = `${baseDomain}/17?${payload}`;

    const reponse = await Repository.get(endPoint)
        .then((response) => {
            return {
                items: response.data,
            };
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
}

class ProductRepository {
    async getProducts(params) {
        //console.log("PARAMS PRODUCT REPOSITORY : ", params)
        const reponse = await Repository.get(
            `${baseDomain}/17/?${serializeQuery(params)}`
        )
            .then((response) => {
                //console.log("REPONSE API 17 : ", response)
                if (response.data && response.data.length > 0) {
                    //console.log("RESPUESTA API 17 : ", response.data)
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

    async getProductsById(payload) {
        //console.log("CODIGO PRODUCTO 1 : ", payload);

        const dat = {
            idarticulo: "(" + '"' + payload + '"' + ")",
        };

        //onsole.log("CODIGO PRODUCTO 0 : ", dat);

        const reponse = await Repository.post(
            `${baseDomain}/18/?${serializeQuery(dat)}`
            //`${baseDomain}/18` //, dat
        ).then((response) => {
            return response.data;
        })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getPublicationById(payload) {
        //console.log("CODIGO PRODUCTO 1 : ", payload);

        const dat = {
            idarticulo: "(" + '"' + payload + '"' + ")",
        };

        //onsole.log("CODIGO PRODUCTO 0 : ", dat);

        const reponse = await Repository.post(
            `${baseDomain}/25/?${serializeQuery(dat)}`
            //`${baseDomain}/18` //, dat
        ).then((response) => {
            return response.data;
        })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByIds(payload) {
        console.log("DATO QUERY PRODUCTO : ", payload);
        const dat = {
            idarticulo: "(" + payload + ")",
        };
        //const endPoint = `${baseDomain}/18?${payload}`;

        console.log("CODIGO PRODUCTO 3 : ", dat);

        const reponse = await Repository.post(
            `${baseDomain}/18/`, dat
        ).then((response) => {
            return response.data;
        })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductCategories(params) {
        console.log("PARAMETROS : ", params);
        const reponse = await Repository.get(
            `${baseDomain}/1703/?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    //console.log("RESPUESTA API 1701 : ", response.data)
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

    async getProductGaraje9(params) {
        console.log("PARAMETROS : ", params);
        const reponse = await Repository.get(
            `${baseDomain}/1704/?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    //console.log("RESPUESTA API 1704 : ", response.data)
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

    async getProductGaraje5(params) {
        console.log("PARAMETROS : ", params);
        const reponse = await Repository.get(
            `${baseDomain}/1705/?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    //console.log("RESPUESTA API 1704 : ", response.data)
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

    async getProductGaraje8(params) {
        console.log("PARAMETROS : ", params);
        const reponse = await Repository.get(
            `${baseDomain}/1706/?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    //console.log("RESPUESTA API 1704 : ", response.data)
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

    async getProductGaraje7(params) {
        console.log("PARAMETROS : ", params);
        const reponse = await Repository.get(
            `${baseDomain}/1707/?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    //console.log("RESPUESTA API 1704 : ", response.data)
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

    async getProductGaraje6(params) {
        console.log("PARAMETROS : ", params);
        const reponse = await Repository.get(
            `${baseDomain}/1708/?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    //console.log("RESPUESTA API 1704 : ", response.data)
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

    /*
    async getProductCategories() {
        const reponse = await Repository.get(`${baseDomain}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    */

    async getPrductCategoryBySlug(payload) {
        const reponse = await Repository.get(
            `${baseDomain}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data[0];
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return reponse;
    }

    async getReadCategory(payload) {
        const reponse = await Repository.get(
            `${baseDomain}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data[0];
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return reponse;
    }

    async getProductsByPriceRange(payload) {
        const reponse = await Repository.get(
            `${baseDomain}/products?${serializeQuery(payload)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new ProductRepository();
