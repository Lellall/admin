import { createSlice } from "@reduxjs/toolkit"
import { Shops } from "./typings"
import { useSelector } from "react-redux"

const initialState: Shops = {
  category: null,
  id: "",
  name: "",
  logoUrl: "",
  status: "",
}

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShop: (state, { payload: data }) => {
      state = data
      return state
    },
    clearSelectedShop: () => {},
  },
})

export const { setShop, clearSelectedShop } = shopSlice.actions
export const useShopSlice = () => useSelector((state: { shop: Shops }) => state.shop)
