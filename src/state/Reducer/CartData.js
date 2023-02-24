const initialState = []
export const CartData = (state= initialState, action) => {
    if(action.type === 'addToCart'){
        return state = [...state, action.payload]
    }
    else if(action.type === 'removeFromCart'){
        state.splice(state.findIndex(a => a.id === action.payload.id) , 1)
        return state = [...state]
    }
    else{
        return state;
    }
}