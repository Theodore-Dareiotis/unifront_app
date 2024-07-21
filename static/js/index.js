document.querySelector('#loginForm').
    addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                credentials: 'include',
            });

            if (response.ok) {
                alert('Login succedeed.');
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    });