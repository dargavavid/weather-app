const request = require('request');

const encodeUserInput = (userInput) => {
    const address = userInput.address;
    const encodedAddress = encodeURIComponent(address);
    return encodedAddress;
};

const geocodeAddress = (address) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUserInput(address)}`,
        json: true// Return as object.
    }, (error, response, body) => {
        if (error) {
            console.log(`Something went wrong: ${error}`);
        } else if (body.status === 'ZERO_RESULTS') {
            // console.log(JSON.stringify(body, undefined, 2));
            console.log('No such location in the database.');
        } else if (body.status === 'OK') {
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat} || Longitude: ${body.results[0].geometry.location.lng}`);
        } else {
            console.log('Unknown error.');
        }
    });
}

module.exports = {
    geocodeAddress
};