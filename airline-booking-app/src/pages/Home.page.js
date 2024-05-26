import React from "react";
import FlightList from "../components/FlightList.component";
import "./Homepage.css";
import SearchBar from "../components/Searchbar.component";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="bg-image p-2">
        <SearchBar />
      </div>
      <div
        className="p-5"
        style={{ color: "black", backgroundColor: "rgb(251, 251, 251)" }}
      >
        <h1
          style={{
            fontWeight: "300",
          }}
        >
          Adventure awaits in every journey. Discover your next destination with
          us
        </h1>
        <p>
          Small business in Ealing, proud to serve our community and beyond.
        </p>
        <div>
          <FlightList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;