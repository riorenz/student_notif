const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/create', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.put('/update', studentController.updateStudentStatus);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
