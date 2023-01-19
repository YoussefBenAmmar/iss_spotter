/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {

  request (`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
  
    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
   
      if (!parsedBody.success) {
        const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
        callback(Error(message), null);
        return;
      }

    const lat = parsedBody.latitude;
    const lon = parsedBody.longitude;
    const coordinate= {
      latitude: lat,
      longitude: lon,
    };
    callback(null, coordinate)
  
  })
};



const fetchISSFlyOverTimes = function(coordinate, callback) {
  request (`https://iss-flyover.herokuapp.com/json/?lat=${coordinate.latitude}&lon=${coordinate.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }


    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const parsedBody1 = JSON.parse(body).response;

    callback(null, parsedBody1)


  })
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };




