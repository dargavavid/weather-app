const request = require('request');

const encodeUserInput = (userInput) => {
    const address = userInput.address;
    const encodedAddress = encodeURIComponent(address);
    return encodedAddress;
};

const geocodeAddress = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUserInput(address)}`,
        json: true// Return as object.
    }, (error, response, body) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to Google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            // console.log(JSON.stringify(body, undefined, 2));
            callback('No such location in the database.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        } else {
            callback('Unknown error.');
        }
    });
};

const weatherForecast = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/027984ccbff33c2bcb2768518efc97dd/${lat},${lng}`,
        json: true// Return as object.
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, body);
        } else {
            callback('Unable to fetch weather.');
        }
    });
};

module.exports = {
    geocodeAddress, 
    weatherForecast
};