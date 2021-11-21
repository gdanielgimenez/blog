import axios from "axios"
import { GET_BLOGS,BLOG_ERROR } from "../types"


export const getBlogs = () => async dispatch =>{
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/?_limit=10`)
        dispatch( {
            type:GET_BLOGS,
            payload:res.data
    })
}
    catch(e){
        dispatch( {
            type:BLOG_ERROR,
            payload:console.log(e),
        })
    }
}