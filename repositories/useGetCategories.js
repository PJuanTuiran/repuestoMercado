import { useState } from "react";
import { GetCategoriesByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import ProductRepository from "~/repositories/ProductRepository";

export default function useGetCategories() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);

    return {
        loading,
        product,
        productItems,
        category,
        setLoading: (payload) => {
            setLoading(payload);
        },

        GetCategoriesByCollection: async (payload, pageSize = 8) => {
            setLoading(true);
            const responseData = await GetCategoriesByCollectionHelper(
                payload,
                pageSize
            );
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        GetCategories: async (payload) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await ProductRepository.GetCategories(payload);
            } else {
                const queries = {
                    _limit: 12,
                };
                responseData = await ProductRepository.GetCategories(queries);
            }

            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.GetCategoriesById(
                payload
            );
            if (responseData) {
                setProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getCategoryBySlug: async (payload) => {
            setLoading(true);
            const response = await ProductRepository.getPrductCategoryBySlug(
                payload
            );
            if (response) {
                setCategory(response);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}
