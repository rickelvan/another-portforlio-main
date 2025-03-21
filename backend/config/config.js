require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    email: {
        user: process.env.EMAIL_USER || 'rick@gmail.com',
        pass: process.env.EMAIL_PASS,
        service: 'gmail'
    },
    credentials: {
        email: 'rick@gmail.com',
        password: '$2a$10$YourHashedPasswordHere' // Will be set during first run
    }
}; 