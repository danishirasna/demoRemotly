import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
//https://reqres.in/api/unknown
export const ordersApi = createApi({
  reducerPath:"orders",
  baseQuery:fetchBaseQuery({
    baseUrl:"https://reqres.in/api"
  }),
  endpoints:(builder)=>({
    getOrders:builder.query({
      query:()=>`/unknown`
    })
  })
})

// Action creators are generated for each case reducer function
export const {useGetOrdersQuery}=ordersApi;