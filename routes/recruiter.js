const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const authMiddleware = require('../middleware/auth');

// ✅ Get recruiter’s jobs
router.get('/my-jobs', authMiddleware, async (req, res) => {
    try {
        console.log(req)
        // 1️⃣ Get all jobs posted by this recruiter
        const jobs = await Job.find({ postedBy: req.user.id }).lean();

        // 2️⃣ For each job, count the number of applications
        const jobsWithApplicants = await Promise.all(
            jobs.map(async (job) => {
                const applications = await Application.find({ job: job._id })
                    .populate('applicant', 'name email resume');
                return {
                    ...job,
                    applicants: applications,
                    applicantsCount: applications.length,
                };
            })
        );

        console.log('recruiter',jobsWithApplicants)
        res.json(jobsWithApplicants);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// ✅ Get applicants for a job
router.get('/job/:id/applicants', authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.id })
            .populate('applicant', 'name email skills resume phone'); // fetch applicant details

        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// ✅ Update application status (select/reject)
router.put('/application/:id/status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        console.log("BODY:", req.body);
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('applicant', 'name email');

        res.json(application);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
