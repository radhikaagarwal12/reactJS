import React, { useEffect, useState } from "react";
import "./css/style.css";
import axios from "axios";

const Tempapp = () => {
  const [city, setCity] = useState({});
  const [coord, setCoord] = useState({});
  const [weather, setWeather] = useState("");

  const [search, setSearch] = useState("Mumbai");
  

  useEffect(() => {
    const fetchApi = async () => {
        // const url=`https://openweathermap.org/data/2.5/weather?q=${search}&appid=439d4b804bc8187953eb36d2a8c26a02`
      const response = await axios.get(`/api/description?searchId=${search}`);
      const resJson = response.data;
      console.log(resJson.data);

      setCity(resJson.main);
      setCoord(resJson.coord);
      setWeather(resJson.weather[0].description);
      //    console.log(resJson.weather[0].description);
    };

    fetchApi();
  }, [search, weather, coord]);
  return (
    <>

      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {!city ? (
          <p className="errorMsg">No Data Found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                {/* <i className="fas fa-street-view"></i> */}
                {search}
              </h2>
              
              <h1 className="temp">
                Lat : {coord.lat}          lon : {coord.lon}
              </h1>
              <h3 className="tempmin_max">Description : {weather}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Tempapp;
