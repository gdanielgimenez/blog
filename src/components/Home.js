import React, {useEffect} from "react";
import { Navigate,useNavigate} from 'react-router-dom';
import {Button, ButtonGroup, Card,Col,Row} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import {getBlogs} from '../actions';
import { Link } from "react-router-dom";
const logOut = ()=>{
    window.localStorage.clear();
    window.location.reload();   
   }


function Home(){
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
                    <Button variant="primary" >edit</Button>{' '}
                    <Button variant="danger" >delete</Button>{' '}
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
                <Button type="Button" variant="primary" size="lg" onClick={()=>{logOut()}}>Log Out</Button>
                <Row align="center">
                { displayBlogs }
                </Row>
            </div>
        )
    }
}
export default Home;