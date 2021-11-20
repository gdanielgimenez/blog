import React, {useEffect} from "react";
import { Navigate,useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const logOut = ()=>{
    window.localStorage.clear();
    window.location.reload();   
   }

function Home(){
    if(!window.localStorage.hasOwnProperty('isLogged')){
        return <Navigate to="/" />;
    }else{
        return(
            <div>
                <p>congratulations you're logged in</p>
                <Button type="Button" variant="primary" size="lg" onClick={()=>{logOut()}}>Log Out</Button>
            </div>
        )
    }
}
export default Home;