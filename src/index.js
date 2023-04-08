import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact, { Content1, Content2, Content3 } from "./pages/Contact.js";
import Nav from "./pages/Nav";
import Form from "./pages/Form";
import ReduxSample from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route index element={<Home />} />
      <Route path="About" element={<About />} />
      <Route path="form" element={<Form />} />
      <Route path="contact" element={<Contact />}>
        <Route path="contact1" element={<Content1 />} />
        <Route path="contact2" element={<Content2 />} />
        <Route path="contact3" element={<Content3 />} />
      </Route>
      <Route path="redux" element={<ReduxSample />} />
    </Routes>
  </BrowserRouter>
);
