import React, {useEffect} from "react";
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
                <Col sm={12} md={6}  lg={6}>
                <Card key={blog.id} className="m-3" sm={12} md={6} lg={4} style={{height:'175px'}}  >
                    <Card.Body>
                        <Card.Title>
                            {blog.title}
                        </Card.Title>
                    </Card.Body>
                    <ButtonGroup size="" className="mr-2">
                    <Button variant="primary" onClick={()=>{navigate(`/${blog.id}`)}}> details</Button>{'  '}
                    <Button variant="primary" onClick={()=>{handleEdit(blog.id,blog.title,blog.body)}}>edit</Button>{' '}
                    <Button variant="danger" onClick={()=>{handleDelete(blog.id)}}>delete</Button>{' '}
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
                <p>congratulations you're logged in</p>
                <Button type="Button" variant="primary" size="lg" onClick={()=>{logOut()}}>Log Out</Button>{' '}
                <Button type="Button" variant="primary" size="lg" onClick={()=>{navigate('/CreateBlog')}}>Create Blog</Button>
                
                <Row align="center">
                { displayBlogs }
                </Row>
            </div>
        )
    }
}
export default Home;