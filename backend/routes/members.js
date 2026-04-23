const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// Set up Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST /api/members - Add a new team member
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const {
            name, rollNumber, year, degree, aboutProject,
            hobbies, certificate, internship, aboutYourAim
        } = req.body;

        const newMember = new Member({
            name,
            rollNumber,
            year,
            degree,
            aboutProject,
            hobbies,
            certificate,
            internship,
            aboutYourAim,
            image: req.file ? req.file.filename : null
        });

        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Failed to add member' });
    }
});

// GET /api/members - Get all team members
router.get('/', async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.status(200).json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Failed to fetch members' });
    }
});

// GET /api/members/:id - Get a single member's details
router.get('/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        console.error('Error fetching member:', error);
        res.status(500).json({ error: 'Failed to fetch member details' });
    }
});

module.exports = router;
