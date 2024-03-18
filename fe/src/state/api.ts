import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DropdownOption } from "components/dropdown";
import { FiltersContextType } from "contexts/filters";
import { IProduct } from "interfaces/product";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        credentials: 'include'
    }),
    reducerPath: "api",
    tagTypes: [
        "Info",
        "User",
        "Producs",
        "Performance",
    ],
    // endpoints
    endpoints: (build) => ({
        getProducts: build.mutation<IProduct[], FiltersContextType['filters']>({
            query: (body) => ({
                url: `api/list`,
                method: 'POST',
                body,
            }),
        }),
        getFeatures: build.mutation<{features: DropdownOption[], energyClasses: DropdownOption[], capacity: DropdownOption[] },null>({
            query: () => ({
                url: `api/features`,
                method: 'POST',
            }),
        })
        // postOrder: build.mutation<string,string>({
        //     query: (id) => ({
        //         url: `api/user/info/${id}`,
        //         method: 'GET'
        //     }),
        // })
    }),
});

export const {
    useGetProductsMutation,
    useGetFeaturesMutation
    // usePostOrderMutation,
} = api;