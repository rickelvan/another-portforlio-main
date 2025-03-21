document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    
    if (!token) {
        // If no token, redirect to login
        window.location.href = '/login';
        return;
    }

    // Verify token with server
    fetch('/api/protected', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
    })
    .catch(error => {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        window.location.href = '/login';
    });
}); 