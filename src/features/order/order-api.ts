import { api } from "../../services/baseApi";


const orders = api.injectEndpoints({
    endpoints: (builder) => ({
        incompleteOrders: builder.query({
            query: () => ({
                url: '/transactions/incomplete-order',
                body:'',
                method:'get'
            })
        }),
    }),

});

export const {useIncompleteOrdersQuery} = orders
