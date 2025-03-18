import Repository, { baseUrlProduct } from './Repository';

class CollectionRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getProductsByCollectionSlug(slug) {
        const reponse = await Repository.get(
            `${baseUrlProduct}/collections?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new CollectionRepository();
