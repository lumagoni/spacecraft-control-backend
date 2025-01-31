const API_BASE_URL = 'http://localhost:3000';

// Fetch the current status of the spacecraft
async function fetchStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/status`);
        const status = await response.json();
        // Update UI based on status
        document.getElementById('power').getElementsByTagName("span")[0].textContent = `${status.power}`;
        document.getElementById('speed').textContent = `Speed: ${status.speed}`;
        document.getElementById('fuel').textContent = `Fuel: ${status.fuel}`;
        document.getElementById('temperature').textContent = `Temperature: ${status.temperature}`;
        document.getElementById('humidity').textContent = `Humidity: ${status.humidity}`;
    } catch (error) {
        console.error('Error fetching status:', error);
    }
}

// Update the speed of the spacecraft
async function updateSpeed() {
    const speedInput = document.getElementById('speedInput').value;
    if (speedInput === "" || isNaN(speedInput)) {
        alert('Please enter a valid speed');
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'updateSpeed',
                value: parseInt(speedInput)
            })
        });
        const status = await response.json();
        document.getElementById('speed').textContent = `Speed: ${status.speed}`;
    } catch (error) {
        console.error('Error updating speed:', error);
    }
}

// Refuel the spacecraft to desired amount
async function refuel() {
    const fuelInput = document.getElementById('fuelInput').value;
    if (fuelInput === "" || isNaN(fuelInput)) {
        alert('Please enter a valid fuel amount');
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'refuel',
                value: parseInt(fuelInput)
            })
        });
        const status = await response.json();
        document.getElementById('fuel').textContent = `Fuel: ${status.fuel}`;
    } catch (error) {
        console.error('Error refueling spacecraft:', error);
    }
}

// Set the power state of the spacecraft
async function setPower() {
    const powerInput = document.getElementById('powerInput').value;
    try {
        const response = await fetch(`${API_BASE_URL}/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'setPower',
                value: powerInput
            })
        });
        const status = await response.json();
        document.getElementById('power').getElementsByTagName("span")[0].textContent = `${status.power}`;
    } catch (error) {
        console.error('Error setting power state:', error);
    }
}

// Update temperature
async function updateTemperature() {
    try {
        const response = await fetch(`${API_BASE_URL}/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'updateTemperature'
            })
        });
        const status = await response.json();
        document.getElementById('temperature').textContent = `Temperature: ${status.temperature}`;
    } catch (error) {
        console.error('Error updating temperature:', error);
    }
}

// Update humidity
async function updateHumidity() {
    try {
        const response = await fetch(`${API_BASE_URL}/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'updateHumidity'
            })
        });
        const status = await response.json();
        document.getElementById('humidity').textContent = `Humidity: ${status.humidity}`;
    } catch (error) {
        console.error('Error updating humidity:', error);
    }
}

// Fetch initial status on page load
fetchStatus();
