import React from "react";
import { Routes, Route } from "react-router-dom";

import NavbarIndex from './NavbarIndex'
import Login from "./login"
import Register from "./UserCreate"
import Users from './Users'
import UserCreate from "./UserCreate"
import UserUpdate from "./UserUpdate"
import Firstpage from "./firstpage"
import Addpic from "./addpic"


export default function AppIndex() {
  return (
      <div> 
        <NavbarIndex />
        <Routes>
          <Route path='/react-kong/login' element={<Login />} />
          <Route path='/react-kong/register' element={<Register />} />
          <Route path='/react-kong/users' element={<Users />} />
          <Route path='/react-kong/react-kong' element={<Firstpage />} />
          <Route path='/react-kong/create' element={<UserCreate />} />
          <Route path='/react-kong/update/:id' element={<UserUpdate />} />
          <Route path='/react-kong/Addpic' element={<Addpic />} />

        </Routes>
      </div>
  );
}