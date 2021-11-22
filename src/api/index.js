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
export const getDetails =  async(id) =>{
    await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res =>{
        console.log(res.data)
        return res.data
    }).catch((error)=>{
        console.log(error)
    })
}
export const deletePost = async(id)=>{
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res =>{
        console.log(res)
    }).catch((error)=>{
        console.log(error)
    })

}