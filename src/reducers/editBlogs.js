import {EDIT_BLOG} from '../types';

const initialState = {
    blog:[],
    loading:true
}

export default function(state=initialState, action){
    switch(action.type){
        case EDIT_BLOG:
            return {
                ...state,
                blog:action.payload,
                loading:false
            }
        default:
            return state
        }   
}
