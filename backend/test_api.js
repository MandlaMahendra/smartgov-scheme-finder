const axios = require('axios');

async function testFilters() {
    const baseUrl = 'http://localhost:5000/api/schemes';

    try {
        console.log("Testing No Filter...");
        const res1 = await axios.get(baseUrl);
        console.log(`No Filter: Found ${res1.data.length} schemes`);

        console.log("\nTesting Gender Filter (Female)...");
        const res2 = await axios.get(`${baseUrl}?gender=Female`);
        console.log(`Gender Filter: Found ${res2.data.length} schemes`);
        if (res2.data.some(s => s.gender !== 'Female' && s.gender !== 'All')) {
            console.error("FAIL: Found non-female schemes");
        } else {
            console.log("PASS: Gender logic seems correct");
        }

        console.log("\nTesting Age Filter (25)...");
        const res3 = await axios.get(`${baseUrl}?age=25`);
        console.log(`Age Filter: Found ${res3.data.length} schemes`);

    } catch (err) {
        console.error("Test Failed:", err.message);
    }
}

testFilters();
