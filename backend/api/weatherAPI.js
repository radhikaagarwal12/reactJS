const axios = require("axios");
const baseUrl = 
module.exports = {
  getListRates: (search) =>
    axios({
      method: "GET",
      url:`https://openweathermap.org/data/2.5/weather?q=${search}&appid=439d4b804bc8187953eb36d2a8c26a02`
,
        
      host: "www.openweathermap.org",
    }),
};
