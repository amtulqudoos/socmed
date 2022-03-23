// import logo from './logo.svg';
import './App.css';
// React
import React, {useEffect, useState} from 'react';
// React-router-dom
import {Routes, Route, Link} from 'react-router-dom';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Add from './Add';
import View from './view';

function App() {

  const [socmedpost, changeSocMedPost] = useState([
    { username: "default", description: "Today the weather has been fantastic, it's been 18 degrees centigrade.", like: 1},
    { username: "default", description: "This is just another test post to show that it is working", like: 1}    
  ]);

  const updateList = (username, description, like) => {
    // console.log("whoopie doo");
    const listItem = {username, description, like};
    localStorage.setItem("list", JSON.stringify([...socmedpost, listItem]));
    changeSocMedPost((prevState) => [...prevState, listItem]);
  }

  useEffect(() => {
    const listContents = localStorage.getItem("list");
    changeSocMedPost(JSON.parse(listContents)||[])
  }, []);

  return (
    <div>
        <Navbar bg="light" expand="md">
          <Container>
            <Navbar.Brand href="#home">ToDo List</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/" >Home</Link>
                <Link className="nav-link" to="/view" >View todo list</Link>
                <Link className="nav-link" to="/Add">Add an item</Link>                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route index element={
              <View socmedpost = {socmedpost}/>
            }/> 
            <Route path="/Add" element={
              <Add updateList={
                (username, description, like) => 
                updateList(username, description, like)
                }/>
            }/>
            <Route path="/view" element={
              <View socmedpost = {socmedpost}/>
            }/>
            
            
          </Routes>          
        </Container>
      </div>
  );
}

export default App;
