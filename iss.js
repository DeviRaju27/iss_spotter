const request = require('request');

const fetchMyIP = function(callback) {
  const urlForMyIp = 'https://api.ipify.org?format=json';
  request(urlForMyIp, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) return callback(error, null);
    return callback(null, body);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const urlForGeo = 'http://ipwho.is/';
  request(urlForGeo, (error, response, body) => {
    if (error) return error;
    const parsed = JSON.parse(body);
    let { latitude, longitude } = parsed;
    if (response.statusCode !== 200) return callback(error, null);
    return callback(null, { latitude, longitude });
   
  });
};

//let example = { latitude: '49.27670', longitude: '-123.13000' }
const fetchISSFlyOverTimes = function(coords, callback) {
  const urlForISS = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(urlForISS, (error, response, body) => {
    if (error) return error;
    const parsedIss = JSON.parse(body);
    if (response.statusCode !== 200)  return callback(error, null);
    return callback(null, parsedIss.response);
   
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) return error;
    fetchCoordsByIP(ip, (error, coords) =>{
      if (error) return error;
      fetchISSFlyOverTimes(coords,(error, passes) =>{
        if (error) return error;
        return callback(null, passes);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };




