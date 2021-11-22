import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { Navigate,useNavigate} from 'react-router-dom';
import {Button, ButtonGroup, Card,Col,Row} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import {getBlogs} from '../actions';
import { deletePost } from "../api";
const logOut = ()=>{
    window.localStorage.clear();
    window.location.reload();   
   }

function Home(){
    const handleEdit= (id,title,body) =>{
        navigate(`/Edit`)
        window.localStorage.setItem("blogId",id)
        window.localStorage.setItem("blogTitle",title)
        window.localStorage.setItem("blogBody",body)
     }
    const handleDelete = async(id)=>{
        console.log("Deleted blog")
        await deletePost(id);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getBlogs())
    },[])
    let blogs =  useSelector(state =>state.setBlogs.blogs);
    console.log(blogs)
    const displayBlogs = blogs  && blogs.length ?(
        blogs.map(blog =>{
            return(
                <Col sm={12}  lg={6}>
                <Card key={blog.id} className="cardHome" >
                <Card.Header className="title">
                            {blog.title}
                        </Card.Header>
                        <Card.Body variant="d-flex">
                    
                        </Card.Body>
                                   
                    <ButtonGroup size="sm" >
                    <Button variant="outline-primary " onClick={()=>{navigate(`/${blog.id}`)}}> details</Button>{'  '}
                    <Button variant="outline-success" onClick={()=>{handleEdit(blog.id,blog.title,blog.body)}}>edit</Button>{' '}
                    <Button variant="outline-danger" onClick={()=>{handleDelete(blog.id)}}>delete</Button>{' '}
                    </ButtonGroup>
            
                </Card>
                </Col>
            )
        })
    )
    :(<p> loading... </p>)

    if(!window.localStorage.hasOwnProperty('isLogged')){
        return <Navigate to="/" />;
    }else{
        return(
            <div>
                < NavBar /> 
                <Row sm={12} lg={6} align="center">
                { displayBlogs }
                </Row>
            </div>
        )
    }
}
export default Home;