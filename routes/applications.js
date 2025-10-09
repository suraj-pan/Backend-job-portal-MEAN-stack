const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); // multer instance
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); // optional
// Apply to job
router.post('/:jobId/apply', auth, upload.single('resume'), async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        // Use uploaded resume if sent, else user's saved resume
        const resumeUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.resumeUrl || req.user.resumeUrl);

        const application = new Application({
            job: job._id,
            applicant: req.user.id,
            resumeUrl,
            coverLetter: req.body.coverLetter || ''
        });
        await application.save();

        // (Optional) Notify recruiter by email
        const recruiter = await User.findById(job.recruiter);
        if (recruiter && recruiter.email) {
            await sendEmail({
                to: recruiter.email,
                subject: `New application for ${job.title}`,
                text: `You have a new applicant. Check dashboard to view details.`
            }).catch(err => console.warn('Email failed', err));
        }

        res.json({ msg: 'Application submitted', application });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// ✅ Get logged-in user's applications
router.get('/my', auth, async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id })
            .populate('job', 'title location salary'); // include job details
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
