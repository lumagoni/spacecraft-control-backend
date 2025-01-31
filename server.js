const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const randomSensor = require('./randomSensor');  // Import the custom NPM module

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory status data for the spacecraft
let spacecraftStatus = {
    power: 'OFF',
    speed: 0,
    fuel: 100,
    temperature: randomSensor.generateTemperature(),  // Random initial temperature
    humidity: randomSensor.generateHumidity(),  // Random initial humidity
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get current status of the spacecraft
app.get('/status', (req, res) => {
    res.json(spacecraftStatus);
});

// Action route to handle updates like speed, fuel, power, temperature, and humidity
app.post('/action', (req, res) => {
    const { action, value } = req.body;
    if (!action || value === undefined) {
        return res.status(400).send('Action or value missing');
    }
    switch (action) {
        case 'updateSpeed':
            if (isNaN(value)) return res.status(400).send('Invalid speed value');
            spacecraftStatus.speed = value;
            break;
        case 'refuel':
            if (isNaN(value)) return res.status(400).send('Invalid fuel value');
            spacecraftStatus.fuel = value;
            break;
        case 'setPower':
            spacecraftStatus.power = value;
            break;
        case 'updateTemperature':
            spacecraftStatus.temperature = randomSensor.generateTemperature();
            break;
        case 'updateHumidity':
            spacecraftStatus.humidity = randomSensor.generateHumidity();
            break;
        default:
            return res.status(400).send('Unknown action');
    }
    res.json(spacecraftStatus);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Spacecraft backend is running on http://localhost:${PORT}`);
});
