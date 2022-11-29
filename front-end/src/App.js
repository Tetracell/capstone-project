import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpPage from "./Components/SignUpPage";
import { UserProvider } from "./Providers/UserProviders";

//COMPONENTS
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import LoginModal from "./Components/LoginModal";
import SeniorsPage from "./Components/SeniorsPage";
import VolunteerPage from "./Components/VolunteerPage";
import OurTeam from "./Components/OurTeam";
import UserDashboard from "./Components/UserDashboard";
import OpenRequestPage from "./Components/OpenRequestPage";
import RequestDetails from "./Components/RequestDetails";
import ProfileInfo from "./Components/ProfileInfo";


//CSS
import "./App.css";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [value,setvalue] = (new Date())

  const [date , setDate] = useState('')
  console.log(date)
  
  return (
    <div className="App">
      <UserProvider>
      <Router>
        <NavBar setModalOpen={setModalOpen} />
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <Routes>
          <Route path='/open-requests' element= {<OpenRequestPage date = {date}/>}/>
          <Route path='/user-dashboard' element={ <UserDashboard date = {date} setDate = {setDate}/> }/>
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/" element={ <Home /> } />
          <Route path="/volunteers" element={ <VolunteerPage setModalOpen={setModalOpen}/> } />
          <Route path="/seniors" element={ <SeniorsPage setModalOpen={setModalOpen} /> } />
          <Route path="/sign-up" element={<SignUpPage/>} />
          <Route path="/users/:id/settings" element={<ProfileInfo/>}/>
          <Route path="/requests/:id" element={<RequestDetails />} />
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
};

export default App;
