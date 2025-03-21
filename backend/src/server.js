const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('../config/config');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../..', 'portfolio-react/build')));

// Initialize admin password on first run
(async () => {
    const hashedPassword = await bcrypt.hash('Derrick@2', 10);
    config.credentials.password = hashedPassword;
})();

// Email transporter
const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
});

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/reset-password.html'));
});

// API routes
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (email !== config.credentials.email) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
        const isValid = await bcrypt.compare(password, config.credentials.password);
        
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '24h' });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (email !== config.credentials.email) {
        return res.status(404).json({ message: 'Email not found' });
    }

    try {
        const resetToken = jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: config.email.user,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset</p>
                <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
                <p>This link will expire in 1 hour</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Error sending reset email' });
    }
});

app.post('/api/auth/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        
        if (decoded.email !== config.credentials.email) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        config.credentials.password = hashedPassword;

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted to protected route' });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'portfolio-react/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 