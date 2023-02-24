const initialState = [];
export const MainData = (state= initialState, action) => {
    if(action.type === 'AddMainData'){
        return state = action.payload;
    }
    else if(action.type === 'ascending'){
        return state = [...action.payload]
    }
    else if(action.type === 'descending'){
        return state = [...action.payload]
    }
    else if(action.type === 'filterData'){
        return state = [...action.payload]
    }
    else{
        return state;
    }
}