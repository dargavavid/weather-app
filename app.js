const request = require('request');
const yargs = require('yargs');


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

console.log(encodeUserInput(argv));

