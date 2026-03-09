const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const port = 5001;

// Database setup
const adapter = new FileSync('db.json');
const db = low(adapter);

// Initial state
const initialClassesData = [
    { id: 1, name: 'Powerlifting Fundamentals', cat: 'Strength', image: '/images/classes/powerlifting.png', intensity: 'High', duration: '60 min', trainer: 'Marcus Reid', totalSlots: 12, slots: 12, color: '#f97316' },
    { id: 2, name: 'HIIT Inferno', cat: 'HIIT', image: '/images/classes/hiit-inferno.png', intensity: 'Max', duration: '45 min', trainer: 'Priya Sharma', totalSlots: 20, slots: 20, color: '#ef4444' },
    { id: 3, name: 'Spin & Burn', cat: 'Cardio', image: '/images/classes/spin-burn.png', intensity: 'Med', duration: '50 min', trainer: 'Jake Torres', totalSlots: 18, slots: 18, color: '#06b6d4' },
    { id: 4, name: 'Combat Fitness Boxing', cat: 'Boxing', image: '/images/classes/boxing.png', intensity: 'High', duration: '60 min', trainer: 'Alicia Vang', totalSlots: 10, slots: 10, color: '#8b5cf6' },
    { id: 5, name: 'Vinyasa Flow Yoga', cat: 'Yoga', image: '/images/classes/yoga-flow.png', intensity: 'Low', duration: '75 min', trainer: 'Meena Rao', totalSlots: 15, slots: 15, color: '#10b981' },
    { id: 6, name: 'Bodyweight Beast', cat: 'HIIT', image: '/images/classes/bodyweight.png', intensity: 'Max', duration: '40 min', trainer: 'Chris Kim', totalSlots: 25, slots: 25, color: '#f97316' },
    { id: 7, name: 'Olympic Weightlifting', cat: 'Strength', image: '/images/classes/olympic-lifting.png', intensity: 'High', duration: '90 min', trainer: 'Marcus Reid', totalSlots: 8, slots: 8, color: '#fbbf24' },
    { id: 8, name: 'Treadmill Intervals', cat: 'Cardio', image: '/images/classes/treadmill.png', intensity: 'Med', duration: '45 min', trainer: 'Jake Torres', totalSlots: 22, slots: 22, color: '#06b6d4' },
    { id: 9, name: 'Restorative Yoga', cat: 'Yoga', image: '/images/classes/restorative-yoga.png', intensity: 'Low', duration: '60 min', trainer: 'Meena Rao', totalSlots: 15, slots: 15, color: '#10b981' },
];

db.defaults({ classes: initialClassesData, bookings: [], leads: [] }).write();

app.use(cors());
app.use(bodyParser.json());

// Get all classes
app.get('/api/classes', (req, res) => {
    const classes = db.get('classes').value();
    res.json(classes);
});

// Book a class
app.post('/api/book', (req, res) => {
    const { classId, user } = req.body;

    const classToBook = db.get('classes').find({ id: classId }).value();

    if (!classToBook) {
        return res.status(404).json({ error: 'Class not found' });
    }

    if (classToBook.slots <= 0) {
        return res.status(400).json({ error: 'Class is full' });
    }

    // Update class slots
    db.get('classes')
        .find({ id: classId })
        .assign({ slots: classToBook.slots - 1 })
        .write();

    // Save booking
    const newBooking = {
        id: Date.now(),
        classId,
        className: classToBook.name,
        trainer: classToBook.trainer,
        user,
        timestamp: new Date().toISOString(),
    };

    db.get('bookings').push(newBooking).write();

    res.json({ success: true, booking: newBooking, updatedClasses: db.get('classes').value() });
});

// Handle contact form leads
app.post('/api/contact', (req, res) => {
    const { name, email, phone, plan, message } = req.body;

    const newLead = {
        id: Date.now(),
        name,
        email,
        phone,
        plan: plan || 'N/A',
        message: message || '',
        timestamp: new Date().toISOString(),
    };

    db.get('leads').push(newLead).write();

    res.json({ success: true, leadId: newLead.id });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'fake-jwt-token-for-demo' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// Get admin stats (bookings and leads)
app.get('/api/admin/data', (req, res) => {
    // In a real app, verify the token here
    const bookings = db.get('bookings').value();
    const leads = db.get('leads').value();
    const classes = db.get('classes').value();
    res.json({ bookings, leads, classes });
});

// Reset slots for a class
app.post('/api/admin/reset-slots', (req, res) => {
    const { classId } = req.body;
    const cls = db.get('classes').find({ id: classId }).value();
    if (cls) {
        db.get('classes')
            .find({ id: classId })
            .assign({ slots: cls.totalSlots })
            .write();
        res.json({ success: true, updatedClasses: db.get('classes').value() });
    } else {
        res.status(404).json({ error: 'Class not found' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
