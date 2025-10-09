const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String },
    coverLetter: { type: String },
    status: { type: String, enum: ['pending', 'selected', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
