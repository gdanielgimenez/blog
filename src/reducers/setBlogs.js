import {GET_BLOGS} from '../types';

const initialState = {
    blogs:[],
    loading:true
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_BLOGS:
            return {
                ...state,
                blogs:action.payload,
                loading:false
            }
        default:
            return state
        }   
}

