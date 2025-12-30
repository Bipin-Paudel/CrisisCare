import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout.jsx";

// Pages
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

import Contact from "./components/Contact.jsx";
import Gethelp from "./components/Gethelp.jsx";

import Donate from "./components/Donate.jsx";
import Donatedirectly from "./components/Donatedirectly.jsx";

import Requestresource from "./components/Requestresource.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsAndServices from "./components/TermsAndServices.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />

      <Route path="contact" element={<Contact />} />
      <Route path="gethelp" element={<Gethelp />} />

      <Route path="donate" element={<Donate />} />
      <Route path="donate/:requestId" element={<Donatedirectly />} />

      <Route path="requestresource" element={<Requestresource />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route path="terms" element={<TermsAndServices />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
