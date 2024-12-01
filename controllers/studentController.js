const db = require('../db');

// Create a new student
exports.createStudent = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO students (name) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
    });
};

// Get all students
exports.getAllStudents = (req, res) => {
    db.query('SELECT * FROM students', (err, students) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(students);
    });
};

// Update student status and send a notification
exports.updateStudentStatus = (req, res) => {
    const { id, status, reason } = req.body;
    
    if (!reason && (status === 'confirmed' || status === 'rejected')) {
        return res.status(400).json({ error: 'Reason is required for confirming or rejecting a student' });
    }

    db.query('UPDATE students SET status = ? WHERE id = ?', [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Send a notification with the reason if applicable
        const notification = {
            studentId: id,
            status,
            reason,
            timestamp: new Date().toISOString()
        };

        // Mock notification sending (could be logged or saved to a database)
        console.log('Notification:', notification);

        // Respond with a success message
        res.status(200).json({ message: `Student ${status} successfully`, notification });
    });
};

// Delete a student
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Student deleted successfully' });
    });
};
