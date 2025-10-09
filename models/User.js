const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['jobseeker', 'recruiter'], default: 'jobseeker' },

    // ✅ Extra Profile Fields
    phone: { type: String },
    experience: { type: String },
    skills: [{ type: String }],
    resume: { type: String }, // file path
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
