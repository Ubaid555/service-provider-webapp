import './App.css';
import { Signup } from './Components/Signup Component/Signup';
import React from 'react';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Herosec from './Components/Herosec/Herosec';
import ContactUs from './Components/Contact Us/ContactUs';
import Services from './Components/Services/Services';
import { AboutUs } from './Components/About Us/AboutUs';
import { Login } from './Components/Login component/Login';
import Paymentform from './Components/Payment Form/Paymentform';
import AddCard from './Components/Add Card/AddCard';
import NotFound from './Components/NotFound/NotFound';
import PaymentConfirmation from './Components/Confirmation Page/PaymentConfirmation';
import Partnerships from './Components/Partnerships/Partnerships';
import BookingForm from './Components/Booking Form/BookingForm';
import { PrivateComponent } from './Components/Private Component/PrivateComponent';
import { MyServices } from './Components/MyServices/MyServices';
import { ForgotPassword } from './Components/Forgot Password/ForgotPassword';
import AllUsers from './Components/All Users/AllUsers';
import AddServices from './Components/Add Services/AddServices';
import UpdateProfile from './Components/Update Service/UpdateService';
import ServiceRequests from './Components/ServiceRequests/ServiceRequests';
import MyBookings from './Components/MyBookings/MyBookings';
import Dashboard from './Components/Dashboard/Dashboard';
import ViewProfile from './Components/ViewProfile/ViewProfile';
import ManageRequests from './Components/ManageRequests/ManageRequests';
import ConfirmedBookings from './Components/ConfirmedBookings/ConfirmedBookings';
import CompletedBookings from './Components/CompletedBookings/CompletedBookings';
import Overview from './Components/Overview/Overview';
import RescheduleBooking from './Components/Reschedule Booking/RescheduleBooking';
import PasswordUpdate from './Components/PasswordUpdate/PasswordUpdate';

function App() {
  
  return (
    <>
    <BrowserRouter>
        <Routes>
           {/* Wrap the protected routes with the PrivateComponent */}
           <Route element={<PrivateComponent />}>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/paymentform' element={<Paymentform/>}/>
            <Route path='/addcard' element={<AddCard/>}/>
            <Route path='/confirmation' element={<PaymentConfirmation/>}/>
            <Route path='/bookingform' element={<BookingForm/>}/>
            <Route path='/partnerships' element={<Partnerships/>}/>
            <Route path='/myservices' element={<MyServices/>}/>
            <Route path='/addservice' element={<AddServices/>}/>
            <Route path='/allusers' element={<AllUsers/>}/>
            <Route path="/updateprofile" element={<UpdateProfile/>} />
            <Route path="/servicerequests" element={<ServiceRequests/>} />
            <Route path="/mybookings" element={<MyBookings/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<ViewProfile/>} />
            <Route path="/managerequests" element={<ManageRequests/>} />
            <Route path="/confirmedbookings" element={<ConfirmedBookings/>} />
            <Route path="/completedbookings" element={<CompletedBookings/>} />
            <Route path="/overview" element={<Overview/>} />
            <Route path="/reschedulebooking" element={<RescheduleBooking/>} />
            <Route path="/accountsettings" element={<PasswordUpdate/>} />
           </Route>

            <Route path='*' element={<NotFound />} />
            <Route path='/' exact element={<Herosec/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        </Routes>
    </BrowserRouter>
  </>
  );                        
}

export default App;