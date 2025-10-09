const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    salary: String,
    skills: [String],
    company: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Recruiter ka ID
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
