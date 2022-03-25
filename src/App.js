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
// icons import
import { FaHome, FaPenNib, FaBell, FaUser } from "react-icons/fa";
// import components
import Add from './Add';
import AddUser from './AddUser';
import View from './view';

function App() {

  const [socmedpost, changeSocMedPost] = useState([
    { username: "default", description: "Today the weather has been fantastic, it's been 18 degrees centigrade.", like: 1},
    { username: "default", description: "This is just another test post to show that it is working", like: 1}    
  ]);

  const [userdetails, changeUserDetails] = useState([
    { username: "keiron", fullname: "keiron goodwin", image: false},
    { username: "amatul", fullname: "amatul qudoos", image: false}
  ]);

  const updateList = (username, description, like) => {    
    const listItem = {username, description, like};
    localStorage.setItem("list", JSON.stringify([...socmedpost, listItem]));
    changeSocMedPost((prevState) => [...prevState, listItem]);
  }

  const updateUser = (username, fullname, image) => {
    const userItem = {username, fullname, image};
    localStorage.setItem("users", JSON.stringify([...userdetails, userItem]));
    changeUserDetails((prevState) => [...prevState, userItem]);
  }

  const updateLikes = (likeIndex) => {
    const newState = socmedpost.map((current, index) => { 
      if(index === likeIndex) { 
        return {username: current.username , description: current.description, like: current.like += 1}
      } else {
        return {username: current.username , description: current.description, like: current.like }
      }
    });
    changeSocMedPost(newState);
    localStorage.setItem("list", JSON.stringify(newState));
  }

  useEffect(() => {
    const listContents = localStorage.getItem("list");
    changeSocMedPost(JSON.parse(listContents)||[]);
    const userContents = localStorage.getItem("users");
    changeUserDetails(JSON.parse(userContents)||[]);
  }, []);

  return (    
    <div>
        <Navbar bg="success" expand="md">
          <Container>
            <Navbar.Brand href="#home">SocMed</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/" ><FaHome/></Link>
                <Link className="nav-link" to="/view" ><FaBell/></Link>
                <Link className="nav-link" to="/Add"><FaPenNib/></Link>
                <Link className="nav-link" to="/AddUser"><FaUser/></Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route index element={
              <View socmedpost = {socmedpost} userdetails={userdetails} updateLikes={(index) => updateLikes(index)} />
            }/> 
            <Route path="/Add" element={
              <Add updateList={
                (username, description, like) => 
                updateList(username, description, like)
                }/>
            }/>
            <Route path="/AddUser" element={
              <AddUser updateUser={
                (username, fullname, image) => 
                updateUser(username, fullname, image)
                }/>
            }/>
            <Route path="/view" element={
              <View socmedpost={socmedpost} userdetails={userdetails} updateLikes={(index) => updateLikes(index)}/>
            }/>                      
          </Routes>  
        </Container>
      </div>
  );
}

export default App;
