import React from "react";
import FlightList from "../components/FlightList.component";
import "./Homepage.css";
import SearchBar from "../components/Searchbar.component";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="text-center mt-5 title">Welcome to Aireal Booking</h1>
      <SearchBar />
      <FlightList />
    </div>
  );
};

export default HomePage;
