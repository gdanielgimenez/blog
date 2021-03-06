import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import NavBar from "./NavBar";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, Navigate} from 'react-router-dom';
import {Button, Container,Card,Alert,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getBlog } from '../actions';
const validate = (values) =>{
    let errors={};
    if(!values.title){
        errors.title="Required!";
    }else if(values.title.length<5){
        errors.title="title must be at least 5 characters long"
    }
    if(!values.body){
        errors.body="required"
    }else if(values.body.length<10){
      errors.body="body content must be at least 10 characters long";  
    }
    return errors;
};
    //useEffect will bring the data from patch request or details request

function Edit(){
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getBlog(localStorage.getItem("blogId")))
    },[])
    let blog =  useSelector(state =>state.editBlogs.blog)
    let navigate = useNavigate();
    const EditForm = () =>{
        const formik = useFormik({
            initialValues:{
                title:blog.title,
                body:blog.body,
                id:localStorage.getItem("blogId")
            },
            validate,
            onSubmit: async(values)=>{
                const data ={title:values.title, body:values.body,id:values.id}
                await axios.put(`https://jsonplaceholder.typicode.com/posts/${data.id}`,data)
                .then(res =>{
                    console.log(res.data)
                    alert('post updated')
                    navigate('/Home')

                }).catch((error)=>{
                    console.log(error);
                    alert(`update failed with  ${error}`)
                })
            }
        });
        return (
            <Container rows={3} variant="center">
          <Form onSubmit={formik.handleSubmit}>
           <Form.Group >
            <Form.Label   htmlFor="title">title</Form.Label>
            <Form.Control
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                />
                
                {formik.touched.title && formik.errors.title ? (
                
                  <Alert variant="danger mt-3 mb-2">
                  {formik.errors.title}
                  </Alert>
                  ):null}
                  </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="body" >Body</Form.Label>
            <Form.Control
              id="body"
              name="body"
              type="text"
              className="textarea"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
            />
            {formik.touched.body && formik.errors.body ? <Alert variant="danger mt-3 mn-2">{formik.errors.body}</Alert>:null}
           </Form.Group>
           <br/>
            <Button type="submit" variant="success mb-3" size="lg">update</Button>{' '}
          </Form>
          </Container>
        )
    }
    //--------------------------------------------//
    if(!window.localStorage.hasOwnProperty('isLogged')){
        return <Navigate to="/" />;
    }else{
    return(
        <div>
            <NavBar/>
            <div className="App-header">
            <Card border="primary" className="cardEdit"  align="center" variant="mt-5 ">
                <EditForm />
            </Card>
            </div>
        </div>
          )
        }
}
export default Edit;