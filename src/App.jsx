import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import HomeSection from "./HomeSection";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import LiveClass from "./LiveClass";
import Register from "./Register";

import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";


// ✅ Tutor imports
import TutorLayout from "./TutorLayout";
import TutorDashboard from "./TutorDashboard";
import TutorCourses from "./TutorCourses";
import TutorClasses from "./TutorClasses";
import TutorMaterials from "./TutorMaterials";



function LayoutWrapper() {

  const location = useLocation();


  const hideNavbarRoutes = [

    "/admin",

    "/student-dashboard",

    "/tutor"

  ];


  const shouldHideNavbar = hideNavbarRoutes.some(path =>
    location.pathname.startsWith(path)
  );


  return (

    <>

      {!shouldHideNavbar && <Navbar />}


      <Routes>


        <Route path="/" element={<Home />} />

<Route path="/login" element={<Login />} />

<Route path="/admin" element={<AdminDashboard />} />

<Route path="/student-dashboard" element={<StudentDashboard />} />

<Route path="/tutor" element={<TutorLayout />}>

  <Route index element={<TutorDashboard />} />

  <Route path="courses" element={<TutorCourses />} />

  <Route path="classes" element={<TutorClasses />} />

  <Route path="materials" element={<TutorMaterials />} />

  <Route path="live/:roomId" element={<LiveClass />} />

</Route>


        {/* Admin */}

        <Route path="/admin" element={<AdminDashboard />} />


        {/* Student */}

        <Route path="/student-dashboard" element={<StudentDashboard />} />



        {/* ✅ Tutor Panel (FULL SYSTEM) */}

        <Route path="/tutor" element={<TutorLayout />}>

          <Route index element={<TutorDashboard />} />

          <Route path="courses" element={<TutorCourses />} />

          <Route path="classes" element={<TutorClasses />} />

          <Route path="materials" element={<TutorMaterials />} />

        </Route>


      </Routes>

    </>

  );

}


function App() {

  return (

    <Router>

      <LayoutWrapper />

    </Router>

  );

}


export default App;