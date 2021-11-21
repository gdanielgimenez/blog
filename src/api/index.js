import axios from "axios"

const url ='https://jsonplaceholder.typicode.com/posts/?_limit=10' 

//limit answ to 10 https://jsonplaceholder.typicode.com/todos/?_limit=10 
export const getPosts = async()=>{
    await axios.get(url)
    .then( res =>{
        console.log(res.data)
        return res.data
    }).catch((error)=>{
        console.log(error)
    })
}
