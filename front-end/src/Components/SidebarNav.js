import React, { useState } from "react";
import { Link } from "react-router-dom";

//Component Import
import CalendarView from "./CalendarView";

//CSS Import
import "./SidebarNav.css";

const SidebarNav = ({ setDate, currentUser }) => {
  //const [userType, setUserType] = useState();
  console.log({ currentUser });

  return (
    <div className="SideBar">
      <div className="text">
        <Link to="/user-dashboard">
          <p className="header">User Dashboard</p>
          <div className="under-click"></div>
        </Link>
        {/* For a volunteer, this will display a link to their accepted request. For an elder, this will be a link to post a new request */}
        {currentUser.user_type === "Volunteer" ? (
          <Link to="/accepted-requests">
            <p>Accepted Requests</p>
            <div className="under-click"></div>
          </Link>
        ) : (
          <Link to="/requests/new">
            <p>Submit a New Request</p>
            <div className="under-click"></div>
          </Link>
        )}
        {/* This link will go to the same route for both user types, however Kalilah is doing a ternary within the route that will show all requests available to claim if the user is a volunteer, and all the requests currently submitted by the user if they are an elder */}
        <Link to="/open-requests">
          <p>Browse Requests</p>
          <div className="under-click"></div>
        </Link>
        <Link>
          <p>Achievements</p>
          <div className="under-click"></div>
        </Link>
        <Link to="/user/settings">
          <p>Settings</p>
          <div className="under-click"></div>
        </Link>
      </div>
      <div className="calender-view">
        <CalendarView setDate={setDate} />
      </div>
    </div>
  );
};

export default SidebarNav;
