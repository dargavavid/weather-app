const request = require('request');

const weatherForecast = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/027984ccbff33c2bcb2768518efc97dd/${lat},${lng}`,
        json: true// Return as object.
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                currentTemperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.');
        }
    });
};

module.exports = {
    weatherForecast
};