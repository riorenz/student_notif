const db = require('../db');

exports.getNotifications = (req, res) => {
    const { userId } = req.query;
    db.query('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, notifications) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(notifications);
    });
};
