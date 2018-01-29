const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
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

// geocode.geocodeAddress(argv.a, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });

weather.weatherForecast(42.3601, -71.0589, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    }else {
        console.log(`It's ${result.currentTemperature} at some place, but it feels like ${result.apparentTemperature}`);
    }
});

// const apiURL = `https://api.darksky.net/forecast/027984ccbff33c2bcb2768518efc97dd/${lat},${lng}`;
// 027984ccbff33c2bcb2768518efc97dd
