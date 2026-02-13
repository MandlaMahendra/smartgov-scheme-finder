const Scheme = require("../models/Scheme");

/*
-----------------------------------------------------
GET ALL SCHEMES
-----------------------------------------------------
*/
exports.getSchemes = async (req, res) => {
  try {
    const { age, gender, income, occupation, state, category } = req.query;

    let query = { isActive: true };

    if (age) {
      query.minAge = { $lte: Number(age) };
      query.maxAge = { $gte: Number(age) };
    }

    if (gender && gender !== "All") {
      query.gender = { $in: [gender, "All"] };
    }

    if (income) {
      query.minIncome = { $lte: Number(income) };
      query.maxIncome = { $gte: Number(income) };
    }

    if (occupation) {
      // Case-insensitive partial match
      query.occupation = { $regex: occupation, $options: "i" };
    }

    if (state && state !== "All") {
      query.state = { $regex: state, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const schemes = await Scheme.find(query).sort({ createdAt: -1 });
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
-----------------------------------------------------
ADD NEW SCHEME
-----------------------------------------------------
*/
exports.addScheme = async (req, res) => {
  try {
    const { name, category, description, incomeLimit, minAge, state } =
      req.body;

    const scheme = new Scheme({
      name,
      category,
      description,
      incomeLimit,
      minAge,
      state,
    });

    await scheme.save();

    res.status(201).json({
      message: "Scheme added successfully",
      scheme,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
-----------------------------------------------------
AI MATCHING / ELIGIBILITY ENGINE
-----------------------------------------------------
*/
exports.matchSchemes = async (req, res) => {
  try {
    const { age, income, occupation, state, gender } = req.body;

    // Fetch all active schemes
    const schemes = await Scheme.find({ isActive: true });

    const eligibleSchemes = schemes.filter(scheme => {
      // STRICT FILTERING

      // 1. Age Check (if provided)
      if (age) {
        if (scheme.minAge > 0 && Number(age) < scheme.minAge) return false;
        if (scheme.maxAge < 120 && Number(age) > scheme.maxAge) return false;
      }

      // 2. Income Check (if provided)
      if (income) {
        if (scheme.maxIncome < 99999999 && Number(income) > scheme.maxIncome) return false;
      }

      // 3. Gender Check (if provided)
      if (gender && gender !== "All") {
        if (scheme.gender !== "All" && scheme.gender !== gender) return false;
      }

      // 4. State Check (Optional - prioritize strictness if needed, currently permissive for Central schemes)
      // If scheme is state-specific, user must match state.
      if (scheme.state !== "All" && state) {
        if (scheme.state.toLowerCase() !== state.toLowerCase()) return false;
      }

      return true;
    }).map(scheme => {
      // SCORING (For sorting relevance)
      let score = 0;

      // Occupation Match (High Priority)
      if (occupation && scheme.occupation) {
        if (scheme.occupation.toLowerCase().includes(occupation.toLowerCase())) {
          score += 50;
        } else if (scheme.category.toLowerCase().includes(occupation.toLowerCase())) {
          score += 30; // Partial match via category
        }
      }

      // State Priority
      if (scheme.state !== "All" && state && scheme.state.toLowerCase() === state.toLowerCase()) {
        score += 40;
      }

      // Income Priority (Lower income gets higher priority for low-income schemes)
      if (income && scheme.maxIncome < 500000) {
        score += 20;
      }

      // Age Priority (Specific age groups get priority)
      if (age && (scheme.minAge > 18 || scheme.maxAge < 60)) {
        score += 10;
      }

      return { ...scheme._doc, score };
    });

    // Sort by highest score
    eligibleSchemes.sort((a, b) => b.score - a.score);

    res.json(eligibleSchemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
