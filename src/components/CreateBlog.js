import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import NavBar from "./NavBar";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, Navigate} from 'react-router-dom';
import {Button, Container,Grid, Row,Col,Alert,Form, Card} from 'react-bootstrap';
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

function CreateBlog(){
    const dispatch = useDispatch();
    let blogs =  useSelector(state =>state.setBlogs.blogs)
    
    let navigate = useNavigate();
    const CreateForm = () =>{
        const formik = useFormik({
            initialValues:{
                title:"",
                body:"",
                id:""
            },
            validate,
            onSubmit: async(values)=>{
                const data ={title:values.title, body:values.body,id:blogs.length+1}
                await axios.post(`https://jsonplaceholder.typicode.com/posts`,data)
                .then(res =>{
                    console.log(res.data)
                    alert('post created!')
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
            <Form.Label htmlFor="body">body</Form.Label>
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
            <Button type="submit" variant="primary" size="lg mb-3">Submit</Button>{' '}
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
            <NavBar />
            <div className="App-header">
              <Card className="CardEdit" align="center" variant="mt-5 ">  
                <CreateForm />
                </Card>
            </div>
        </div>
          )
        }
}
export default CreateBlog;