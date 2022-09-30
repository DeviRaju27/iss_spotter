const request = require('request-promise-native');

const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  return request(url);
};
const fetchCoordsByIP = function(ip) {
  const parsedIp = JSON.parse(ip);
  const url = `http://ipwho.is/${parsedIp.ip}`;
  return request(url);
};

const fetchISSFlyOverTimes = function(coords) {
  const parsedCoords = JSON.parse(coords);
  const {latitude , longitude} = parsedCoords;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body)=> {
      const parsed = JSON.parse(body);
      return parsed.response;
    });
};

module.exports = { nextISSTimesForMyLocation };

