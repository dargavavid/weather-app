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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.weatherForecast(results.latitude, results.longitude, (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage);
            }else {
                console.log(`It's ${result.currentTemperature} at some place, but it feels like ${result.apparentTemperature}`);
            }
        });
    }
});