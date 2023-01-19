// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


const { nextISSTimesForMyLocation } = require('./iss');



const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

// fetchMyIP((error, ip) => { //(error, ip ) we are actually sending an anonymous function as a callback
//   if (error) {
//     console.log("It didn\'t work!", error);
//     return;
//   }
//   console.log("It worked! Return IP:", ip);

//   fetchCoordsByIP(ip, (error, coordinate) => {
//     if (error) {
//       console.log("It didn\'t work!", error);
//       return;
//     }
//     console.log("It worked! Return coordinate:", coordinate);


//     fetchISSFlyOverTimes(coordinate, (error, flyOverTime) => {
//       if (error) {
//         console.log("It didn\'t work!", error);
//         return;
//       }
//       console.log("It worked! Return fly over time :", flyOverTime);
  
//     });

//   });

// });

