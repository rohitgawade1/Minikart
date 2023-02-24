import { combineReducers } from "redux";
import { CartData } from "./CartData";
import { CountPrice } from "./CountPrice";
import { MainData } from "./MainData";

export const rootReducer = combineReducers({
    MainData:MainData,
    CartData: CartData,
    CountPrice:CountPrice
})