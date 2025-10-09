const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// ✅ Get logged-in user's profile
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).send('Server error');
    }
});

// ✅ Update logged-in user's profile
router.put('/', authMiddleware, async (req, res) => {
    try {
        const updates = req.body;

        // Don’t allow changing critical fields
        delete updates.role;
        delete updates.password;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json({ msg: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
