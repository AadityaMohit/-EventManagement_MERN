import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import Navbar from "./components/Navbar";
import EventDetail from "./components/EventDetail";
import './App.css'
const App = () => (
  <Router><Navbar/>
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/events/new" element={<EventForm />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/login" element={<Auth type="login" />} />
      <Route path="/register" element={<Auth type="register" />} />
    </Routes>
  </Router>
);

export default App;
