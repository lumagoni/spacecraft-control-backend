// randomSensor.js

// Function to generate a random temperature between -50 and 50 degrees Celsius
module.exports.generateTemperature = function() {
    return Math.floor(Math.random() * (50 - (-50) + 1)) + (-50); // Random temperature between -50 and 50
};

// Function to generate a random humidity value between 0 and 100%
module.exports.generateHumidity = function() {
    return Math.floor(Math.random() * 101); // Random humidity between 0 and 100
};
