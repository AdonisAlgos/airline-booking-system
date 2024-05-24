import React from "react";
import { getFlights } from "../apis/flights.api";
import "./Homepage.css";

const HomePage = () => {

useEffect(() => {
  const [flights, setFlights] = useState([]);

  getFlights()
    .then((response) => {
      setPizzas(response.data);
    })
    .catch((error) => {
      console.error("Error fetching pizzas:", error);
    });
}, []);

  return (
    <div className="homepage">
      <div className=""></div>
    </div>
  );
};

export default HomePage;
