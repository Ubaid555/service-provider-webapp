import "./App.css";
import { Signup } from "./Components/Signup Component/Signup";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Herosec from "./Components/Herosec/Herosec";
import ContactUs from "./Components/Contact Us/ContactUs";
import Services from "./Components/Services/Services";
import { AboutUs } from "./Components/About Us/AboutUs";
import { Login } from "./Components/Login component/Login";
import Paymentform from "./Components/Payment Form/Paymentform";
import AddCard from "./Components/Add Card/AddCard";
import NotFound from "./Components/NotFound/NotFound";
import PaymentConfirmation from "./Components/Confirmation Page/PaymentConfirmation";
import Partnerships from "./Components/Partnerships/Partnerships";
import BookingForm from "./Components/Booking Form/BookingForm";
import { PrivateComponent } from "./Components/Private Component/PrivateComponent";
import { MyServices } from "./Components/MyServices/MyServices";
import { ForgotPassword } from "./Components/Forgot Password/ForgotPassword";
import AllUsers from "./Components/All Users/AllUsers";
import AddServices from "./Components/Add Services/AddServices";
import MyBookings from "./Components/MyBookings/MyBookings";
import Dashboard from "./Components/Dashboard/Dashboard";
import ViewProfile from "./Components/ViewProfile/ViewProfile";
import ManageRequests from "./Components/ManageRequests/ManageRequests";
import Overview from "./Components/Overview/Overview";
import RescheduleBooking from "./Components/Reschedule Booking/RescheduleBooking";
import PasswordUpdate from "./Components/PasswordUpdate/PasswordUpdate";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import SeeReviews from "./Components/SeeReviews/SeeReviews";
import Chat from "./Components/Chat/Chat";
import ChatBox from "./Components/ChatBox/ChatBox";
import MessageContainer from "./Components/Messages/MessageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOverview from "./Components/Admin Dashboard/Admin Overview/AdminOverview";
import { AdminPrivateComponent } from "./Components/Admin Dashboard/Admin Private Component/AdminPrivateComponent";
import Accounts from "./Components/Admin Dashboard/Accounts/Accounts";
import AdminWithdrawHistory from "./Components/Admin Dashboard/Admin Withdraw History/AdminWithdrawHistory";
import AddNewService from "./Components/Admin Dashboard/Add New Service/AddNewService";
import AllBookings from "./Components/Admin Dashboard/All Bookings/AllBookings";
import { PublicComponent } from "./Components/Public Component/PublicComponent";
import ChatBot from "./Components/ChatBot/ChatBot";
import AccountDetailsForm from "./Components/AccountDetailsForm/AccountDetailsForm";
import WithdrawRequests from "./Components/Admin Dashboard/Withdraw Requests/WithdrawRequests";
import UserWithdrawHistory from "./Components/UserWithdrawHistory/UserWithdrawHistory";
import UpdateService from "./Components/Update Service/UpdateService";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/paymentform" element={<Paymentform />} />
            <Route path="/addcard" element={<AddCard />} />
            <Route path="/confirmation" element={<PaymentConfirmation />} />
            <Route path="/bookingform" element={<BookingForm />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/myservices" element={<MyServices />} />
            <Route path="/updateservice" element={<UpdateService />} />
            <Route path="/addservice" element={<AddServices />} />
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ViewProfile />} />
            <Route path="/managerequests" element={<ManageRequests />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/reschedulebooking" element={<RescheduleBooking />} />
            <Route path="/accountsettings" element={<PasswordUpdate />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path="/seereviews" element={<SeeReviews />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatbox" element={<ChatBox />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/messagecontainer" element={<MessageContainer />} />
            <Route path="/accountdetails" element={<AccountDetailsForm />} />
            <Route path="/userwithdrawhistory" element={<UserWithdrawHistory />}
            />
          </Route>

          <Route element={<AdminPrivateComponent />}>
            <Route path="/adminoverview" element={<AdminOverview />} />
            <Route path="/usersaccounts" element={<Accounts />} />
            <Route path="/allservices" element={<Services />} />
            <Route path="//alladminusers" element={<AllUsers />} />
            <Route path="/paymenthistory" element={<AdminWithdrawHistory />} />
            <Route path="/allbookings" element={<AllBookings />} />
            <Route path="/addnewservice" element={<AddNewService />} />
            <Route path="/withdrawrequest" element={<WithdrawRequests />} />
          </Route>

          <Route element={<PublicComponent />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" exact element={<Herosec />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
