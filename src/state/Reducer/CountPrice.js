const initialState = 0

export const CountPrice = (state=initialState, action) => {
    if(action.type === 'countPrice'){
        return state + action.payload
    }
    else if(action.type === 'subtrachCountPrice'){
        return state - action.payload
    }
    else{
        return state
    }
}