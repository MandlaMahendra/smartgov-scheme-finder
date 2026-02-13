const axios = require('axios');

async function testAuth() {
    const baseUrl = 'http://localhost:5000/api/auth';
    const testUser = {
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "password123"
    };

    try {
        console.log("1. Testing Registration...");
        const regRes = await axios.post(`${baseUrl}/register`, testUser);
        console.log("Register Response:", regRes.status, regRes.data);

        console.log("\n2. Testing Login...");
        const loginRes = await axios.post(`${baseUrl}/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log("Login Response:", loginRes.status);
        if (loginRes.data.token && loginRes.data.user) {
            console.log("PASS: Token and User received");
        } else {
            console.error("FAIL: Missing token or user data");
        }

    } catch (err) {
        console.error("Test Failed:", err.response ? err.response.data : err.message);
    }
}

testAuth();
