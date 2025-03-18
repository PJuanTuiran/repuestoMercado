import Repository, { baseDomain, serializeQuery } from "./Repository";

export async function getTotalRecords() {
    const reponse = await Repository.get(`${baseDomain}/products/count`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
}

export async function getProductsByIds(payload) {
    const endPoint = `${baseDomain}/products?${payload}`;
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
            `${baseDomain}/products?${serializeQuery(params)}`
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

    async getProductsById(payload) {
        const reponse = await Repository.get(
            `${baseDomain}/products/${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByIds(payload) {
        const endPoint = `${baseDomain}/products?${payload}`;
        const reponse = await Repository.get(endPoint)
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

    async getProductCategories() {
        const reponse = await Repository.get(`${baseDomain}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

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
