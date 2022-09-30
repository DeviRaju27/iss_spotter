
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passes) => {
  if (error) return error;
  printPasses(passes);
});

const printPasses = function(passes) {
  for (let pass of passes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

//TEST CODES FOR EACH FUNCTION

// fetchMyIP((error, ip) => {
//   if (error) return error;
//   console.log(ip) ;
// });

// fetchCoordsByIP(ip, (error, data) => {
//  if(error) return error;
//  console.log(data) ;
//  //return data;
// })

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) return error;
//   return passTimes;
// });

