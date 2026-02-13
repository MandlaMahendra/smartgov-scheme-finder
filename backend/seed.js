require("dotenv").config();
const mongoose = require("mongoose");
const Scheme = require("./models/Scheme");

const schemes = [
    // agriculture
    {
        name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        description: "Financial support of ₹6000 per year for farmers.",
        fullDescription: "Under the PM-KISAN scheme, all landholding farmer families are provided a financial benefit of Rs.6000 per annum per family payable in three equal installments of Rs.2000 each, every four months.",
        category: "Agriculture",
        occupation: "Farmer",
        minAge: 18,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999, // No strict income limit, but landholding criteria usually applies. Kept broad for demo.
        state: "All",
        gender: "All",
        applyLink: "https://pmkisan.gov.in/",
        isActive: true
    },
    {
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        description: "Crop insurance scheme for farmers.",
        fullDescription: "PMFBY provides a comprehensive insurance cover against failure of the crop thus helping in stabilising the income of the farmers.",
        category: "Agriculture",
        occupation: "Farmer",
        minAge: 18,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999,
        state: "All",
        gender: "All",
        applyLink: "https://pmfby.gov.in/",
        isActive: true
    },
    // senior citizens
    {
        name: "Atal Pension Yojana (APY)",
        description: "Pension scheme for unorganized sector workers.",
        fullDescription: "Atal Pension Yojana is a pension scheme mainly for workers in unorganized sector like personal maids, drivers, gardeners etc. This social security scheme was introduced by the government in 2015.",
        category: "Pension",
        occupation: "Unorganized Worker",
        minAge: 18,
        maxAge: 40, // Entry age
        minIncome: 0,
        maxIncome: 99999999,
        state: "All",
        gender: "All",
        applyLink: "https://www.npscra.nsdl.co.in/scheme-details.php",
        isActive: true
    },
    {
        name: "Senior Citizen Savings Scheme (SCSS)",
        description: "Government-backed savings scheme for senior citizens.",
        fullDescription: "A government-backed savings scheme for individuals above the age of 60, offering regular income and tax benefits.",
        category: "Finance",
        occupation: "Senior Citizen",
        minAge: 60,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999,
        state: "All",
        gender: "All",
        applyLink: "https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx",
        isActive: true
    },
    // women / girls
    {
        name: "Sukanya Samriddhi Yojana",
        description: "Savings scheme for the girl child.",
        fullDescription: "A small deposit scheme for the girl child launched as a part of the 'Beti Bachao Beti Padhao' campaign.",
        category: "Child Welfare",
        occupation: "Student",
        minAge: 0,
        maxAge: 10, // Account opening age
        minIncome: 0,
        maxIncome: 99999999,
        state: "All",
        gender: "Female",
        applyLink: "https://www.india.gov.in/sukanya-samriddhi-yojna",
        isActive: true
    },
    {
        name: "Mahila Samman Savings Certificate",
        description: "Small savings scheme for women and girls.",
        fullDescription: "A one-time new small savings scheme, Mahila Samman Savings Certificate, made available for a two-year period up to March 2025.",
        category: "Finance",
        occupation: "Any",
        minAge: 0,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999,
        state: "All",
        gender: "Female",
        applyLink: "https://www.indiapost.gov.in/",
        isActive: true
    },
    // students
    {
        name: "National Scholarship Portal (NSP)",
        description: "Central portal for various government scholarships.",
        fullDescription: "NSP provides a common electronic portal for implementing various Scholarships schemes launched by Union Government, State Government and Union Territories across the country.",
        category: "Education",
        occupation: "Student",
        minAge: 5,
        maxAge: 30,
        minIncome: 0,
        maxIncome: 250000, // Usually income limit exists
        state: "All",
        gender: "All",
        applyLink: "https://scholarships.gov.in/",
        isActive: true
    },
    {
        name: "AICTE Pragati Scholarship for Girls",
        description: "Scholarship for girl students in technical education.",
        fullDescription: "Scholarship Scheme for girl students pursuing technical education. Amount of scholarship: Rs. 50,000 per annum.",
        category: "Education",
        occupation: "Student",
        minAge: 16,
        maxAge: 25,
        minIncome: 0,
        maxIncome: 800000,
        state: "All",
        gender: "Female",
        applyLink: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
        isActive: true
    },
    // Housing
    {
        name: "Pradhan Mantri Awas Yojana (Urban)",
        description: "Affordable housing for urban poor.",
        fullDescription: "PMAY-U addresses urban housing shortage among the EWS/LIG and MIG categories including the slum dwellers.",
        category: "Housing",
        occupation: "Any",
        minAge: 18,
        maxAge: 70,
        minIncome: 0,
        maxIncome: 1800000,
        state: "All",
        gender: "All",
        applyLink: "https://pmaymis.gov.in/",
        isActive: true
    },
    // Health
    {
        name: "Ayushman Bharat PM-JAY",
        description: "Health insurance cover of ₹5 Lakhs per family.",
        fullDescription: "Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world’s largest health insurance/ assurance scheme fully financed by the government.",
        category: "Health",
        occupation: "Any",
        minAge: 0,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 500000, // Roughly low income
        state: "All",
        gender: "All",
        applyLink: "https://nha.gov.in/PM-JAY",
        isActive: true
    },
    // Employment
    {
        name: "MGNREGA",
        description: "Guaranteed 100 days of wage employment in rural areas.",
        fullDescription: "Mahatma Gandhi National Rural Employment Guarantee Act guarantees 100 days of wage employment in a financial year to a rural household whose adult members volunteer to do unskilled manual work.",
        category: "Employment",
        occupation: "Unemployed",
        minAge: 18,
        maxAge: 60,
        minIncome: 0,
        maxIncome: 100000,
        state: "All",
        gender: "All",
        applyLink: "https://nrega.nic.in/",
        isActive: true
    },
    {
        name: "Prime Minister's Employment Generation Programme (PMEGP)",
        description: "Credit-linked subsidy programme for generating employment.",
        fullDescription: "PMEGP is a credit-linked subsidy programme to generate employment opportunities through establishment of micro enterprises in rural as well as urban areas.",
        category: "Business",
        occupation: "Business",
        minAge: 18,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999,
        state: "All",
        gender: "All",
        applyLink: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
        isActive: true
    },
    // State specific (Karnataka examples for local flavor)
    {
        name: "Gruha Jyothi",
        description: "Free electricity up to 200 units for households in Karnataka.",
        fullDescription: "Under this scheme, all residential households in Karnataka are provided with free electricity up to 200 units per month.",
        category: "Utility",
        occupation: "Any",
        minAge: 18,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999,
        state: "Karnataka",
        gender: "All",
        applyLink: "https://sevasindhu.karnataka.gov.in/",
        isActive: true
    },
    {
        name: "Shakti Scheme",
        description: "Free bus travel for women in Karnataka.",
        fullDescription: "Free travel for women in government buses (KSRTC, BMTC, NWKRTC, KKRTC) within Karnataka state.",
        category: "Transport",
        occupation: "Any",
        minAge: 5,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999,
        state: "Karnataka",
        gender: "Female",
        applyLink: "https://sevasindhu.karnataka.gov.in/",
        isActive: true
    },
    {
        name: "Yuva Nidhi",
        description: "Unemployment allowance for graduates and diploma holders.",
        fullDescription: "Financial assistance of ₹3000 for graduates and ₹1500 for diploma holders who are unemployed in Karnataka.",
        category: "Employment",
        occupation: "Unemployed",
        minAge: 21,
        maxAge: 35,
        minIncome: 0,
        maxIncome: 99999999,
        state: "Karnataka",
        gender: "All",
        applyLink: "https://sevasindhu.karnataka.gov.in/",
        isActive: true
    },
    // Business / Startup
    {
        name: "Startup India Seed Fund",
        description: "Financial assistance for startups for proof of concept.",
        fullDescription: "The scheme aims to provide financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization.",
        category: "Business",
        occupation: "Business",
        minAge: 18,
        maxAge: 120,
        minIncome: 0,
        maxIncome: 99999999,
        state: "All",
        gender: "All",
        applyLink: "https://seedfund.startupindia.gov.in/",
        isActive: true
    }
];

const seedDB = async () => {
    try {
        console.log("Starting seed script...");
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables!");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        // Clear existing data
        await Scheme.deleteMany({});
        console.log("Cleared existing schemes.");

        // Insert new data
        const result = await Scheme.insertMany(schemes);
        console.log(`Inserted ${result.length} new schemes successfully!`);

        await mongoose.connection.close();
        console.log("Connection closed.");
        process.exit(0);
    } catch (err) {
        console.error("FATAL ERROR seeding database:");
        console.error(err);
        if (mongoose.connection && mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
};

seedDB();
