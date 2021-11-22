import {Navbar,Nav, Container,} from 'react-bootstrap';

function NavBar(){
    const logOut = ()=>{
        window.localStorage.clear();
        window.location.reload();   
       }
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Blog</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="#features"></Nav.Link>
                        <Nav.Link href="/CreateBlog">Create</Nav.Link>
                        <Nav.Link onClick={()=>{logOut()}}>Logout</Nav.Link>
                        
                    </Nav>
            </Container>
        </Navbar>

    )
}
  export default NavBar;