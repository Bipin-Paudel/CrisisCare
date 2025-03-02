import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.Jsx'
import Home from './Compontnts/Home/Home'
import About from './Compontnts/AboutServices/About'
import Login from './Compontnts/LoginRegister/Login'
import Signup from './Compontnts/LoginRegister/Signup'
import Contact from './Compontnts/Contact/Contact'
import Gethelp from './Compontnts/Help/Gethelp'
import Services from './Compontnts/AboutServices/Services'
import Donate from './Compontnts/Donation/Donate'
import Requestresource from './Compontnts/RequestResource/Requestresource'
import PrivacyPolicy from './Compontnts/PrivacyPolicy/PrivacyPolicy.jsx'
import TermsAndServices from './Compontnts/TermsService/TermsAndServices.jsx'
import Donatedirectly from './Compontnts/Donation/Donatedirectly.jsx'




const router =createBrowserRouter(
 createRoutesFromElements(
   <Route path='/' element={<Layout/>}>
   <Route  path='' element={<Home/>} />
   <Route  path='signup/' element={<Signup/>} />
   <Route  path='about/' element={<About/>} />
   <Route  path='login/' element={<Login/>} />
   <Route  path='contact/' element={<Contact/>} />
   <Route  path='gethelp/' element={<Gethelp/>} />
   <Route  path='services/' element={<Services/>} />
   <Route  path='donate/' element={<Donate/>} />
   <Route path="/donate/:requestId" element={<Donatedirectly />} />
   <Route  path='requestresource/' element={<Requestresource/>} />
   <Route path="/privacy" element={<PrivacyPolicy/>} />
   <Route path="/terms" element={<TermsAndServices/>} />
   


   </Route>

 )


)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>



    </RouterProvider>
    
  </StrictMode>,
)
