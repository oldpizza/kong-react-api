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
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/users' element={<Users />} />
          <Route path='/react-kong' element={<Firstpage />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/update/:id' element={<UserUpdate />} />
          <Route path='/Addpic' element={<Addpic />} />

        </Routes>
      </div>
  );
}