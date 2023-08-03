import { createSlice } from  '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setProducts: (state,{payload}) => {state.products = payload},
        deleteProduct: (state, action) => {
            const productIndex = state.products.findIndex(i => action.payload === i.id)
            state.products.splice(productIndex,1)
        },
    }
})

export default productSlice.reducer;

