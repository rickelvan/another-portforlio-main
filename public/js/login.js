document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const forgotPassword = document.getElementById('forgotPassword');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login
                localStorage.setItem('token', data.token);
                // Redirect to the portfolio homepage
                window.location.href = '/index.html';
            } else {
                errorMessage.textContent = data.message || 'Invalid credentials';
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred. Please try again.';
            console.error('Login error:', error);
        }
    });

    forgotPassword.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        if (!email) {
            errorMessage.textContent = 'Please enter your email address';
            return;
        }

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                errorMessage.style.color = '#059669'; // Success color
                errorMessage.textContent = 'Password reset link sent to your email';
            } else {
                errorMessage.textContent = data.message || 'Failed to process request';
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred. Please try again.';
            console.error('Forgot password error:', error);
        }
    });
}); 