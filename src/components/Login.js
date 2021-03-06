import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {useNavigate, Navigate} from 'react-router-dom';
import {Button, Container,Grid, Row,Col,Alert,Form, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const validate = (values) =>{
    let errors={};
    if(!values.password){
        errors.password="Required!";
    }else if(values.password.length<4){
        errors.password="Must be at least 5 characters"
    }
    if(!values.email){
        errors.email="required"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email="Invalid email address";  
    }
    return errors;
};

function Login(){
    let navigate = useNavigate();
    const SignupForm = () =>{
        const formik = useFormik({
            initialValues:{
                password:"",
                email:""
            },
            validate,
            onSubmit: async(values)=>{
                const data ={email:values.email, password:values.password}
                await axios.post('http://challenge-react.alkemy.org',data)
                .then(res =>{
                    if(res.data.token){
                        window.localStorage.setItem('access_token',res.data.token)
                        window.localStorage.setItem('isLogged',true)
                        console.log(res.status)
                        navigate('/Home')
                        return res.status
                    }else{
                        alert("Login failed")
                    }
                }).catch((error)=>{
                    console.log(error);
                    alert(`login failed with  ${error}`)
                })
            }
        });
        return (
            <Container >
            < Form onSubmit={formik.handleSubmit}>
           <Form.Group >
            <Form.Label   htmlFor="password" className="label">Password</Form.Label>
            <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                
                {formik.touched.password && formik.errors.password ? (
                
                  <Alert variant="danger mt-3 mb-2">
                  {formik.errors.password}
                  </Alert>
                  ):null}
                  </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="email" className="label">Email Address</Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <Alert variant="danger mt-3 mn-2">{formik.errors.email}</Alert>:null}
           </Form.Group>
           <br/>
            <Button type="submit" variant="primary" size="lg mb-3">Login</Button>
          </Form>
          </Container>
        )
    }
    //--------------------------------------------//
    if(window.localStorage.hasOwnProperty('isLogged')){
        return <Navigate to="/Home" />;
    }else{
    return(
        <Container className="App-header">
            <Card border="secondary" className="card"  align="center" variant="mt-5 ">
                <SignupForm />
            </Card>
        </Container>
          )
        }
}
export default Login;