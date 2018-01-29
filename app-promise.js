const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            describe: 'Address to fetch weather for',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodeUserInput = (userInput) => {
    const address = userInput.address;
    const encodedAddress = encodeURIComponent(address);
    return encodedAddress;
};

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUserInput(argv.address)}&key=AIzaSyB272yf7oIMjlXPJqgSFMIwC3NyTWl6h68`;

axios.get(geocodeUrl)
.then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/027984ccbff33c2bcb2768518efc97dd/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
})
.then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
})
.catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});