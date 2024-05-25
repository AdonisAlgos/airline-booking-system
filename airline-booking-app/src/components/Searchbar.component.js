import React, { useState } from "react";
import "./Searchbar.css";

const SearchBar = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = () => {
    alert(
      `Searching flights from ${from} to ${to} departing on ${departureDate} and returning on ${returnDate}`
    );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-10 col-lg-8">
          <div className="form-group mb-4">
            <label className="custom-label">Search for flights</label>
            <input
              type="text"
              className="form-control custom-input"
              id="from"
              placeholder="Departure From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control custom-input"
              id="to"
              placeholder="Arrive To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="form-group col-6 mb-4">
              <label htmlFor="departureDate" className="custom-label">
                Departure Date
              </label>
              <input
                type="date"
                className="form-control custom-input"
                id="departureDate"
                placeholder="Departure Date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-4">
              <label htmlFor="returnDate" className="custom-label">
                Return Date
              </label>
              <input
                type="date"
                className="form-control custom-input"
                id="returnDate"
                placeholder="Return Date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>
          <button className="btn custom-button mb-4" onClick={handleSearch}>
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
