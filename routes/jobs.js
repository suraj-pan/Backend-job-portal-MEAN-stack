const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const Job = require('../models/Job');

// Create job (recruiter)
router.post('/', auth, role('recruiter'), async (req, res) => {
    try {
        const { title, description, skills, location, salary } = req.body;
        const job = new Job({
            title,
            description,
            skills: skills ? skills.split(',').map(s => s.trim()) : [],
            location,
            salary,
            recruiter: req.user.id
        });
        await job.save();
        res.json(job);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// List jobs with simple filters
router.get('/', async (req, res) => {
    try {
        const { q, location, skill, page = 1, limit = 10 } = req.query;
        const filter = { status: 'active' };
        if (q) filter.title = { $regex: q, $options: 'i' };
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (skill) filter.skills = { $in: [new RegExp(skill, 'i')] };

        const jobs = await Job.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('recruiter', 'name email');

        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
