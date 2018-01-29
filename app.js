const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');

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

geocode.weatherForecast(42.3601, -71.0589, (error, result) => {
    if (error) {
        console.log(error);
    }else {
        console.log(result.currently.temperature);
    }
});

// const apiURL = `https://api.darksky.net/forecast/027984ccbff33c2bcb2768518efc97dd/${lat},${lng}`;
// 027984ccbff33c2bcb2768518efc97dd
